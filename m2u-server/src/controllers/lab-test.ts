import { FastifyReply, FastifyRequest } from "fastify";
import { ACTIONS, ROLES, SUBJECTS } from "../lib/permissions";
import serviceProviderModel from "../models/service.provider.model";
import walletModel from "../models/wallet.model";
import {
  CUSTOMER_LAB_TEST_STATUS,
  CUSTOMER_LAB_TEST_STATUS_OPTIONS,
  CUSTOMER_TEST_VALID_TRANSACTIONS,
  HSP_STATUS,
  NEW,
  OTP_AUTH_OPTIONS,
  PACKAGE_OPTION,
  PACKAGE_TYPE,
  PAYMENT_STATUS,
  PAYMENT_TYPE,
  QUEUE_OPTIONS,
  QUEUE_TYPE,
} from "../constants";
import labTestModel from "../models/lab.test.model";
import followupLabTestModel from "../models/followup.lab.test.model";
import {
  getAdminWalletDetail,
  getUserWalletDetail,
  getWalletHistoryData,
} from "../lib/functions";
import customerTestDeclineModel from "../models/customer.test.decline.model";
import labModel from "../models/lab.model";
import {
  countByDateAndMonthAndYear,
  dbOptions,
  getDbUpdateObject,
  getPackageDetail,
} from "../mongo-queries";
import {
  customerTestRequests,
  getAllCustomerTestRequest,
  getServiceProviderAssignedAllCustomerTestRequest,
} from "../mongo-queries/lab-test";
import { LabTestReportBodySchema } from "../types/lab_test_reports_body";
import AppointmentModel from "../models/appointment.model";
import doctorFollowupAppointmentModel from "../models/followup.appointment.model";
import AppointmentPrescriptionModel from "../models/appointment.prescription.model";
import {
  ADMIN_INFO_EMAIL,
  ADMIN_INFO_PHONE,
  FRONTEND_URL,
  NODE_ENV,
  REDIS_DB,
} from "../plugins/env";
import customerModel from "../models/customer.model";
import successMessage from "../constants/success-messages";
import { createPaymentLink, MetaData } from "./payment";
import packageModel from "../models/package.model";
import errorMessage from "../constants/error-messages";
import { generateOTP, ObjectId, sliceDate } from "../utils";
import walletHistoryModel from "../models/wallet.history.model";
import Queue from "bull";
import otpModel from "../models/otp.model";
import { LabTest } from "../types/lab_test";
import errorsMessage from "../constants/error-messages";
import bcrypt from "bcrypt";
import { Package } from "../types/package";
import { lookupDataFromCollection, unionWith } from "mongo-aggregation-utils";
import { CreateCustomerTestSchema } from "../types/create_customer_test_body";
import appointmentPrescriptionModel from "../models/appointment.prescription.model";
import { EMAIL_CONTENTS } from "../constants/email-contents";
import { WHATSAPP_TEMPLATES } from "../constants/whatsapp-templates";
import { sendMail } from "../lib/nodemailer";
import { sendWhatsappMessage } from "../lib/sendWhatsappMessage";
const remainderPub = new Queue(QUEUE_TYPE.REMAINDER_QUEUE, REDIS_DB);
const populatingTestDetail = [
  { path: "reports", strictPopulate: false },
  { path: "payment", strictPopulate: false },
  { path: "approvedServiceProvider", strictPopulate: false },
  { path: "submittedLab", strictPopulate: false },
  { path: "customer", strictPopulate: false },
  { path: "appointment", strictPopulate: false },
];

interface Body {
  status: string;
  declineNote: string;
  testId: string;
  labId: string;
  otp: string;
  reason: string;
}
export const reviewCustomerTest = async (
  req: FastifyRequest<{
    Body: Body;
  }>,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.REVIEW, SUBJECTS.Test);
  let isFollowupTest = false;
  const serviceProvider = await serviceProviderModel.findById({
    _id: req.user._id,
  });
  if (serviceProvider && serviceProvider.userRole === ROLES.SERVICE_PROVIDER) {
    if (serviceProvider.activeStatus === HSP_STATUS.DE_ACTIVE) {
      return reply.badRequest(
        `${errorMessage.HSP_DE_ACTIVE} .you cant approve customer blood test`
      );
    }
    if (!serviceProvider) {
      return reply.notFound(errorMessage.SERVICE_PROVIDER_NOT_FOUND);
    }

    if (serviceProvider.paymentStatus === PAYMENT_STATUS.PENDING) {
      return reply.badRequest(errorMessage.SERVICE_PROVIDER_PAYMENT_ERROR);
    }
  }

  let labTestData = (await labTestModel
    .findById({ _id: req.body.testId })
    .populate([
      "customer",
      "approvedServiceProvider",
      "submittedLab",
    ])) as LabTest;

  if (!labTestData) {
    isFollowupTest = true;
    labTestData = (await followupLabTestModel
      .findById({
        _id: req.body.testId,
      })
      .populate([
        "customer",
        "approvedServiceProvider",
        "submittedLab",
      ])) as LabTest;
  }
  if (!labTestData) {
    return reply.notFound(errorMessage.CUSTOMER_TEST_REQUEST_NOT_FOUND);
  }

  if (!labTestData.payment._id) {
    return reply.notFound(errorMessage.PAYMENT_NOT_FOUND);
  }

  const existingPackage = labTestData.packages as unknown as Package;
  const [packages] = await packageModel.aggregate([
    unionWith("customPackages"),
    {
      $match: {
        _id: ObjectId(existingPackage._id),
      },
    },
  ]);
  const lastStatusTransaction =
    labTestData.statusTransaction[labTestData.statusTransaction.length - 1];
  const lastStatus = lastStatusTransaction?.status;
  if (
    !CUSTOMER_TEST_VALID_TRANSACTIONS[lastStatus]?.includes(req.body.status)
  ) {
    return reply.badRequest(
      `Invalid status transaction ${lastStatus.toString()} to ${req.body.status.toString()}`
    );
  }

  switch (req.body.status) {
    case CUSTOMER_LAB_TEST_STATUS.SERVICE_PROVIDER_APPROVED:
      await isHSPApproved(
        labTestData,
        reply,
        serviceProvider,
        isFollowupTest,
        req,
        packages,
        serviceProvider
      );
      break;

    case CUSTOMER_LAB_TEST_STATUS.DECLINED:
      await isHSPDeclined(
        serviceProvider,
        labTestData,
        isFollowupTest,
        req,
        reply
      );
      break;

    case CUSTOMER_LAB_TEST_STATUS.LAB_ASSIGNED:
      await isHSPLabAssigned(
        labTestData,
        serviceProvider._id,
        reply,
        isFollowupTest,
        req,
        packages
      );
      break;

    case CUSTOMER_LAB_TEST_STATUS.SAMPLE_COLLECTED:
      await isHSPSampleCollected(
        labTestData,
        serviceProvider._id,
        req,
        reply,
        isFollowupTest
      );
      break;

    case CUSTOMER_LAB_TEST_STATUS.SAMPLE_RE_COLLECTED:
      await isHSPSampleCollected(
        labTestData,
        serviceProvider._id,
        req,
        reply,
        isFollowupTest,
        true
      );
      break;

    case CUSTOMER_LAB_TEST_STATUS.SAMPLE_SUBMITTED_TO_LAB:
      await isHSPSampleSubmittedToLab(
        labTestData,
        serviceProvider._id,
        req,
        reply,
        isFollowupTest
      );
      break;

    case CUSTOMER_LAB_TEST_STATUS.RE_COLLECTED_SAMPLE_SUBMITTED_TO_LAB:
      await isHSPSampleSubmittedToLab(
        labTestData,
        serviceProvider._id,
        req,
        reply,
        isFollowupTest,
        true
      );
      break;

    case CUSTOMER_LAB_TEST_STATUS.NEED_SAMPLE_RE_COLLECTION:
      await isSampleReCollectionRequired(
        labTestData,
        packages,
        isFollowupTest,
        req,
        reply
      );
      break;
  }

  return reply.send({
    message: `Customer test ${CUSTOMER_LAB_TEST_STATUS_OPTIONS[req.body.status]}`,
  });
};

const isHSPApproved = async (
  labTestData: LabTest,
  reply: FastifyReply,
  hsp: { _id: string; name: string },
  isFollowupTest: any,
  req: FastifyRequest<{ Body: Body }>,
  packages: {
    name: string;
  },
  serviceProvider: {
    name: string;
    phone: number;
    email: string;
  }
) => {
  if (!req.body.status) {
    return reply.notFound(errorMessage.SELECT_APPROVE_OR_DECLINE);
  }
  if (labTestData?.approvedServiceProvider?._id) {
    return reply.conflict(errorMessage.SERVICE_PROVIDER_APPROVED);
  }
  const updateFields = {
    $set: {
      approvedServiceProvider: hsp._id,
      spApprovedDate: new Date(),
      statusTransaction: [
        ...labTestData.statusTransaction,
        {
          status: CUSTOMER_LAB_TEST_STATUS.SERVICE_PROVIDER_APPROVED,
          date: new Date(),
        },
      ],
    },
  };
  const { encryptedOTP, OTP } = await generateOTP();
  await otpModel.create({
    number: `${labTestData.customer.phone}`,
    email: `${labTestData.customer.email}`,
    userRole: ROLES.CUSTOMER,
    otp: encryptedOTP,
    originalOTP: OTP,
    testId: labTestData._id,
    type: OTP_AUTH_OPTIONS.CUSTOMER_OTP_FROM_HSP,
    currentDate: new Date(),
  });
  const currentDate = sliceDate();
  const customerAppointmentDate = sliceDate(
    labTestData.customerAppointmentDate
  );
  const emailPayload = {
    to: labTestData.customer.email,
    data: {
      testName: packages.name,
      serviceProviderName: req.user.name,
      OTP: OTP,
      orderId: labTestData._id,
      approvalDate: currentDate,
    },
    ...EMAIL_CONTENTS.TEST_APPROVED_CUSTOMER,
  };
  const hspEmailPayload = {
    to: serviceProvider.email,
    data: {
      testName: packages.name,
      appointmentDate: customerAppointmentDate,
      appointmentTime: labTestData.customerAppointmentTime,
      serviceProviderName: serviceProvider.name,
      orderId: labTestData._id,
      approvalDate: currentDate,
    },
    ...EMAIL_CONTENTS.TEST_APPROVED_HSP,
  };
  const adminEmailPayload = {
    to: ADMIN_INFO_EMAIL,
    data: {
      testName: packages.name,
      appointmentDate: customerAppointmentDate,
      appointmentTime: labTestData.customerAppointmentTime,
      serviceProviderName: serviceProvider.name,
      orderId: labTestData._id,
      approvalDate: currentDate,
      time: labTestData.customerAppointmentTime,
    },
    ...EMAIL_CONTENTS.TEST_APPROVAL_HSP_ADMIN_NOTIFICATION,
  };
  const testLink = `${FRONTEND_URL}/customer-tests?id=${labTestData._id}`;
  const messageData = JSON.stringify({
    cname: labTestData.customer.name,
    hspname: hsp.name,
    link: testLink,
    vname: "OTP",
    vvalue: OTP,
  });
  const hspMessageData = JSON.stringify({
    cname: labTestData.customer.name,
    hspname: req.user.name,
    link: testLink,
    date: customerAppointmentDate,
    time: labTestData.customerAppointmentTime,
  });
  const adminMessageData = JSON.stringify({
    cname: labTestData.customer.name,
    pname: packages.name,
    hspname: req.user.name,
    link: `${FRONTEND_URL}/purchased-packages/${labTestData._id}`,
    date: customerAppointmentDate,
    time: labTestData.customerAppointmentTime,
    orderid: labTestData._id,
  });

  await Promise.allSettled([
    req.sendWhatsappMessage(
      labTestData.customer?.phone,
      WHATSAPP_TEMPLATES.CUSTOMER_TEST_APPROVAL,
      messageData
    ),
    req.sendWhatsappMessage(
      serviceProvider.phone,
      WHATSAPP_TEMPLATES.BLOOD_TEST_APPROVAL_HSP,
      hspMessageData
    ),
    req.sendWhatsappMessage(
      Number(ADMIN_INFO_PHONE),
      WHATSAPP_TEMPLATES.HSP_APPROVAL_TEST_ADMIN_NOTIFICATION,
      adminMessageData
    ),
    req.sendMail(hspEmailPayload),
    req.sendMail(emailPayload),
    req.sendMail(adminEmailPayload),
  ]);
  const promise = [
    !isFollowupTest &&
      labTestModel.findOneAndUpdate({ _id: req.body.testId }, updateFields, {
        new: true,
      }),
    isFollowupTest &&
      followupLabTestModel.findOneAndUpdate(
        { _id: req.body.testId },
        updateFields,
        { new: true }
      ),
  ];
  await Promise.allSettled(promise);
};

const isHSPDeclined = async (
  serviceProvider: { _id: string },
  labTestData: { declinedServiceProviders: string[] },
  isFollowupTest: boolean,
  req: FastifyRequest<{ Body: { testId: string; declineNote: string } }>,
  reply: FastifyReply
) => {
  if (!req.body.declineNote) {
    return reply.notFound(errorMessage.DECLINE_NOTE_REQUIRED);
  }
  await customerTestDeclineModel.create({
    serviceProvider: serviceProvider._id,
    declineNote: req.body.declineNote,
    customerTest: req.body.testId,
  });
  const declinedServiceProviders = [
    serviceProvider._id,
    ...labTestData.declinedServiceProviders,
  ];
  const promise = [
    !isFollowupTest &&
      labTestModel.findOneAndUpdate(
        { _id: req.body.testId },
        { declinedServiceProviders: declinedServiceProviders },
        { new: true }
      ),
    isFollowupTest &&
      followupLabTestModel.findOneAndUpdate(
        { _id: req.body.testId },
        { declinedServiceProviders: declinedServiceProviders },
        { new: true }
      ),
  ];
  await Promise.allSettled(promise);
};

const isHSPSampleCollected = async (
  labTestData: LabTest,
  hspId: string,
  req: FastifyRequest<{ Body: Body }>,
  reply: FastifyReply,
  isFollowupTest: boolean,
  isRecollection = false
) => {
  if (`${labTestData.approvedServiceProvider._id}` !== `${hspId}`) {
    return reply.notFound(errorMessage.SERVICE_PROVIDER_APPROVED);
  }
  const OTP = await otpModel.findOne({
    type: OTP_AUTH_OPTIONS.CUSTOMER_OTP_FROM_HSP,
    testId: labTestData._id,
  });
  if (!req.body.otp) {
    return reply.notFound(errorMessage.ENTER_CUSTOMER_OTP);
  }
  if (req.body.otp && req.body.otp.length !== 6) {
    return reply.badRequest(errorMessage.OTP_MUST_BE_SIX_DIGIT);
  }
  const isValidOtp = await bcrypt.compare(req.body.otp, OTP?.otp);
  if (!isValidOtp) {
    return reply.unauthorized(errorsMessage.VERIFICATION_CODE_NOT_MATCH);
  }
  await otpModel.findOneAndDelete({
    type: OTP_AUTH_OPTIONS.CUSTOMER_OTP_FROM_HSP,
    testId: labTestData._id,
  });
  const status: any = {
    statusTransaction: [
      ...labTestData.statusTransaction,
      {
        status: isRecollection
          ? CUSTOMER_LAB_TEST_STATUS.SAMPLE_RE_COLLECTED
          : CUSTOMER_LAB_TEST_STATUS.SAMPLE_COLLECTED,
        date: new Date(),
      },
    ],
  };
  if (isRecollection) {
    status.sampleReCollectedDate = new Date();
  } else {
    status.sampleCollectedDate = new Date();
  }
  const sampleCollectedDate = sliceDate();
  const sampleCollectedTime = new Date().toLocaleTimeString();

  const mailBody = {
    hspName: labTestData.approvedServiceProvider.name,
    customerName: labTestData.customer.name,
    packageName: labTestData.packages.name,
    date: sampleCollectedDate,
    time: sampleCollectedTime,
    orderId: labTestData._id,
  };

  await Promise.allSettled([
    req.sendMail({
      to: labTestData.customer.email,
      ...EMAIL_CONTENTS.HSP_SAMPLE_COLLECTED_CUSTOMER,
      data: mailBody,
    }),
    req.sendMail({
      to: labTestData.approvedServiceProvider.email,
      ...EMAIL_CONTENTS.HSP_SAMPLE_COLLECTED_HSP,
      data: mailBody,
    }),
    req.sendMail({
      to: ADMIN_INFO_EMAIL,
      ...EMAIL_CONTENTS.HSP_SAMPLE_COLLECTED_ADMIN,
      data: mailBody,
    }),
  ]);
  const promises = [
    !isFollowupTest &&
      labTestModel.findOneAndUpdate({ _id: req.body.testId }, status, {
        new: true,
      }),
    isFollowupTest &&
      followupLabTestModel.findOneAndUpdate({ _id: req.body.testId }, status, {
        new: true,
      }),
  ];
  await Promise.allSettled(promises);
};

const isHSPSampleSubmittedToLab = async (
  labTestData: LabTest,
  hspId: string,
  req: FastifyRequest<{ Body: Body }>,
  reply: FastifyReply,
  isFollowupTest: boolean,
  reSubmit = false
) => {
  if (`${labTestData.approvedServiceProvider._id}` !== `${hspId}`) {
    return reply.notFound(errorMessage.SERVICE_PROVIDER_APPROVED);
  }
  const OTP = await otpModel.findOne({
    type: OTP_AUTH_OPTIONS.LAB_OTP_FROM_HSP,
    testId: labTestData._id,
  });
  if (!req.body.otp) {
    return reply.notFound(errorMessage.ENTER_LAB_OTP);
  }
  if (req.body.otp && req.body.otp.length !== 6) {
    return reply.badRequest(errorMessage.OTP_MUST_BE_SIX_DIGIT);
  }
  const isValidOtp = await bcrypt.compare(req.body.otp, OTP?.otp);
  if (!isValidOtp) {
    return reply.unauthorized(errorsMessage.VERIFICATION_CODE_NOT_MATCH);
  }
  await otpModel.findOneAndDelete({
    type: OTP_AUTH_OPTIONS.LAB_OTP_FROM_HSP,
    testId: labTestData._id,
  });
  const status: any = {
    statusTransaction: [
      ...labTestData.statusTransaction,
      {
        status: reSubmit
          ? CUSTOMER_LAB_TEST_STATUS.RE_COLLECTED_SAMPLE_SUBMITTED_TO_LAB
          : CUSTOMER_LAB_TEST_STATUS.SAMPLE_SUBMITTED_TO_LAB,
        date: new Date(),
      },
    ],
  };
  if (reSubmit) {
    status.reCollectedSampleSubmittedDate = new Date();
  } else {
    status.sampleSubmittedDate = new Date();
  }

  const mailBody = {
    hspName: labTestData.approvedServiceProvider.name,
    customerName: labTestData.customer.name,
    packageName: labTestData.packages.name,
    date: sliceDate(),
    time: new Date().toLocaleTimeString(),
    orderId: labTestData._id,
  };

  await Promise.allSettled([
    req.sendMail({
      to: labTestData.customer.email,
      ...EMAIL_CONTENTS.SAMPLE_SUBMITTED_LAB_CUSTOMER,
      data: mailBody,
    }),
    req.sendMail({
      to: labTestData.approvedServiceProvider.email,
      ...EMAIL_CONTENTS.SAMPLE_SUBMITTED_LAB_HSP,
      data: mailBody,
    }),
    req.sendMail({
      to: ADMIN_INFO_EMAIL,
      ...EMAIL_CONTENTS.SAMPLE_SUBMITTED_LAB_ADMIN,
      data: mailBody,
    }),
  ]);
  const promises = [
    !isFollowupTest &&
      labTestModel.findOneAndUpdate({ _id: req.body.testId }, status, {
        new: true,
      }),
    isFollowupTest &&
      followupLabTestModel.findOneAndUpdate({ _id: req.body.testId }, status, {
        new: true,
      }),
  ];
  await Promise.allSettled(promises);
};

const isHSPLabAssigned = async (
  labTestData: LabTest,
  hspId: string,
  reply: FastifyReply,
  isFollowupTest: boolean,
  req: FastifyRequest<{ Body: Body }>,
  packages: { name: string }
) => {
  if (!req.body.labId) {
    return reply.notFound(errorMessage.LAB_ID_REQUIRED);
  }
  const labDetail = await labModel.findById({ _id: req.body.labId });

  if (!labDetail) {
    return reply.notFound(errorMessage.LAB_DETAIL_NOT_FOUND);
  }
  if (`${labTestData.approvedServiceProvider._id}` !== `${hspId}`) {
    return reply.notFound(errorMessage.SERVICE_PROVIDER_APPROVED);
  }

  const { encryptedOTP, OTP } = await generateOTP();
  await otpModel.create({
    number: `${labDetail.phone}`,
    email: `${labDetail.email}`,
    userRole: ROLES.LAB_USER,
    otp: encryptedOTP,
    originalOTP: OTP,
    type: OTP_AUTH_OPTIONS.LAB_OTP_FROM_HSP,
    testId: labTestData._id,
    currentDate: new Date(),
  });
  const emailPayload = {
    to: labDetail.email,
    data: {
      labName: labDetail.name,
      testName: packages.name,
      orderId: labTestData._id,
      serviceProviderName: req.user.name,
      customerName: labTestData.customer.name,
      OTP: OTP,
      approvalDate: sliceDate(),
    },
    ...EMAIL_CONTENTS.TEST_LAB_ASSIGNED,
  };

  const adminEmailPayload = {
    to: ADMIN_INFO_EMAIL,
    data: {
      labName: labDetail.name,
      testName: packages.name,
      orderId: labTestData._id,
      serviceProviderName: req.user.name,
      customerName: labTestData.customer.name,
      date: sliceDate(),
      time: new Date().toLocaleTimeString(),
    },
    ...EMAIL_CONTENTS.HSP_ASSIGN_LAB_ADMIN,
  };
  const updateFields = {
    statusTransaction: [
      ...labTestData.statusTransaction,
      {
        status: CUSTOMER_LAB_TEST_STATUS.LAB_ASSIGNED,
        date: new Date(),
      },
    ],
    labAssignedDate: new Date(),
    submittedLab: req.body.labId,
  };
  const promise = [
    !isFollowupTest &&
      labTestModel.findOneAndUpdate({ _id: req.body.testId }, updateFields, {
        new: true,
      }),
    isFollowupTest &&
      followupLabTestModel.findOneAndUpdate(
        { _id: req.body.testId },
        updateFields,
        { new: true }
      ),
    req.sendMail(emailPayload),
    req.sendMail(adminEmailPayload),
  ];
  await Promise.allSettled(promise);
};

const isSampleReCollectionRequired = async (
  labTestData: LabTest,
  packages: { name: string },
  isFollowupTest: boolean,
  req: FastifyRequest<{ Body: { reason: string } }>,
  reply: FastifyReply
) => {
  if (!req.body.reason) {
    return reply.notFound(errorMessage.LAB_REASON_REQUIRED);
  }
  if (`${req.user._id}` !== `${labTestData.submittedLab._id}`) {
    return reply.badRequest(errorMessage.NOT_A_VALID_LAB);
  }

  const updateFields = {
    statusTransaction: [
      ...labTestData.statusTransaction,
      {
        status: CUSTOMER_LAB_TEST_STATUS.NEED_SAMPLE_RE_COLLECTION,
        date: new Date(),
      },
    ],
    sampleRecollectionReason: req.body.reason,
    sampleRecollectionIssuedDate: new Date(),
  };

  const emailBody = {
    customerName: labTestData.customer.name,
    orderId: labTestData._id,
    testName: packages.name,
    labName: labTestData.submittedLab.name,
    sampleCollectedDate: labTestData.sampleCollectedDate,
    hspName: labTestData.approvedServiceProvider.name,
    labReason: req.body.reason,
    date: sliceDate(),
    time: new Date().toLocaleTimeString(),
  };
  const adminEmailData = {
    to: ADMIN_INFO_EMAIL,
    data: {
      ...emailBody,
      link: `${FRONTEND_URL}/purchased-packages/${labTestData._id}`,
    },
    ...EMAIL_CONTENTS.TEST_SAMPLE_RE_COLLECTION_REQUIRED_ADMIN(
      labTestData.submittedLab.name
    ),
  };

  const cusEmailData = {
    to: labTestData.customer.email,
    data: {
      ...emailBody,
      link: `${FRONTEND_URL}/my-tests/${labTestData._id}`,
    },
    ...EMAIL_CONTENTS.TEST_SAMPLE_RE_COLLECTION_REQUIRED_CUSTOMER,
  };
  const hspEmailData = {
    to: labTestData.approvedServiceProvider.email,
    data: {
      ...emailBody,
      link: `${FRONTEND_URL}/customer-tests?id=${labTestData._id}`,
    },
    ...EMAIL_CONTENTS.TEST_SAMPLE_RE_COLLECTION_REQUIRED_HSP,
  };
  const labEmailData = {
    to: req.user.email,
    data: {
      customerName: labTestData.customer.name,
      orderId: labTestData._id,
      testName: packages.name,
      sampleCollectedDate: labTestData.sampleCollectedDate,
      hspName: labTestData.approvedServiceProvider.name,
      labReason: req.body.reason,
      link: `${FRONTEND_URL}/customer-tests?id=${labTestData._id}`,
    },
    ...EMAIL_CONTENTS.SAMPLE_RE_COLLECTION_REQUIRED_LAB,
  };

  const messageData = {
    labname: req.user.name,
    cname: labTestData.customer.name,
    testid: `${labTestData._id}`,
    hspname: labTestData.approvedServiceProvider.name,
    reason: req.body.reason,
    link: `${FRONTEND_URL}/purchased-packages/${labTestData._id}`,
  };

  const promise = [
    !isFollowupTest &&
      labTestModel.findOneAndUpdate({ _id: labTestData._id }, updateFields, {
        new: true,
      }),
    isFollowupTest &&
      followupLabTestModel.findOneAndUpdate(
        { _id: labTestData._id },
        updateFields,
        { new: true }
      ),
    req.sendMail(adminEmailData),
    req.sendMail(cusEmailData),
    req.sendMail(hspEmailData),
    req.sendMail(labEmailData),
    req.sendWhatsappMessage(
      Number(ADMIN_INFO_PHONE),
      WHATSAPP_TEMPLATES.SAMPLE_RECOLLECTION_NOTIFICATION_FOR_ADMIN,
      JSON.stringify(messageData)
    ),
  ];
  await Promise.allSettled(promise);
};

export const getLabTestCounts = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const testCompleted = {
    $elemMatch: { status: CUSTOMER_LAB_TEST_STATUS.TEST_COMPLETED },
  };
  let match: any = {
    statusTransaction: testCompleted,
  };
  if (req.user.userRole === ROLES.CUSTOMER) {
    match.customer = req.user._id;
  }
  if (req.user.userRole === ROLES.SERVICE_PROVIDER) {
    match.approvedServiceProvider = req.user._id;
  }
  if (req.user.userRole === ROLES.LAB_USER) {
    match.submittedLab = req.user._id;
  }
  if (req.user.userRole === ROLES.GP_PARTNER) {
    return 0;
  }
  const result = await labTestModel.aggregate(
    countByDateAndMonthAndYear("followupLabTests", match)
  );
  return reply.send(result[0]);
};

export const getSpCustomerTestRequests = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.VIEW_ALL, SUBJECTS.Test);
  const serviceProvider = await serviceProviderModel.findById({
    _id: req.user._id,
  });
  if (!serviceProvider) {
    return reply.notFound(errorMessage.SERVICE_PROVIDER_NOT_FOUND);
  }
  const labTest = await labTestModel.aggregate(
    getAllCustomerTestRequest(serviceProvider._id, serviceProvider.postCode)
  );
  return reply.send(labTest);
};

export const getLabCustomerTestRequests = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.VIEW_ALL, SUBJECTS.Test);
  const lab = await labModel.findById({ _id: req.user._id });
  if (!lab) {
    return reply.notFound(errorMessage.LAB_DETAIL_NOT_FOUND);
  }
  const labTest = await labTestModel.aggregate(
    getServiceProviderAssignedAllCustomerTestRequest(lab._id)
  );
  return reply.send(labTest);
};

export const getLabTestData = async (
  req: FastifyRequest<{ Params: { testId: string } }>,
  reply: FastifyReply
) => {
  if (!req.params.testId) {
    return reply.notFound(errorMessage.CUSTOMER_TEST_ID_NOT_FOUND);
  }

  req.requireAccess(ACTIONS.VIEW, SUBJECTS.Test);
  let labTest = await labTestModel
    .findById({ _id: req.params.testId })
    .populate([
      "reports",
      "payment",
      "approvedServiceProvider",
      "submittedLab",
      "customer",
    ]);
  if (!labTest) {
    labTest = await followupLabTestModel
      .findById({
        _id: req.params.testId,
      })
      .populate([
        "reports",
        "payment",
        "approvedServiceProvider",
        "submittedLab",
        "customer",
        "appointment",
      ]);
  }
  return reply.send(labTest);
};

export const uploadReportsValidationCheck = async (
  req: FastifyRequest<{
    Params: { testId: string };
    Body: LabTestReportBodySchema;
  }>,
  reply: FastifyReply
) => {
  const lab = await labModel.findById({ _id: req.user._id });
  if (!lab) {
    return reply.notFound(errorMessage.LAB_DETAIL_NOT_FOUND);
  }
  if (!req.params.testId) {
    return reply.notFound(errorMessage.CUSTOMER_TEST_ID_NOT_FOUND);
  }
  let customerTest = await labTestModel.findOne({
    _id: req.params.testId,
    submittedLab: lab._id,
  });
  if (!customerTest) {
    customerTest = await followupLabTestModel.findOne({
      _id: req.params.testId,
      submittedLab: lab._id,
    });
  }
  if (!customerTest) {
    return reply.notFound(errorMessage.CUSTOMER_TEST_REQUEST_NOT_FOUND);
  }
  const lastStatusTransaction =
    customerTest.statusTransaction[customerTest.statusTransaction.length - 1];
  const lastStatus = lastStatusTransaction?.status;
  if (
    !CUSTOMER_TEST_VALID_TRANSACTIONS[lastStatus]?.includes(
      CUSTOMER_LAB_TEST_STATUS.TEST_COMPLETED
    )
  ) {
    return reply.badRequest(
      `Invalid status transaction ${lastStatus.toString()} to ${CUSTOMER_LAB_TEST_STATUS.TEST_COMPLETED.toLowerCase()}`
    );
  }
};

export const uploadReportForTest = async (
  req: FastifyRequest<{
    Params: { testId: string };
    Body: LabTestReportBodySchema;
  }>,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.UPLOAD_TEST_REPORTS, SUBJECTS.Test);
  let isFollowupTest = false;
  let appointment = undefined;
  let appointmentPrescription;

  let testMain = await labTestModel
    .findById({
      _id: req.params.testId,
    })
    .populate(["customer", "approvedServiceProvider"]);

  if (!testMain) {
    isFollowupTest = true;
    testMain = await followupLabTestModel
      .findById({
        _id: req.params.testId,
      })
      .populate(["customer", "approvedServiceProvider"]);
  }
  if (!testMain) {
    return reply.notFound(errorMessage.CUSTOMER_TEST_REQUEST_NOT_FOUND);
  }

  if (isFollowupTest) {
    appointment = await AppointmentModel.findById({
      _id: testMain.appointment,
    });
    if (!appointment) {
      appointment = await doctorFollowupAppointmentModel.findById({
        _id: testMain.appointment,
      });
    }
    if (appointment) {
      appointmentPrescription = await AppointmentPrescriptionModel.findOne({
        appointment: appointment._id,
      });
      appointmentPrescription = appointmentPrescription.followUpAppointmentDate;
    }
  }
  const reportsDocsArr = Object.entries(req.body).map(
    ([key, value]: any) => value?._id
  );

  const [
    { value: labWallet },
    { value: spWallet },
    { value: userWallet },
    { value: adminWallet },
  ]: any = await Promise.allSettled([
    walletModel.findOne({
      userId: req.user._id,
      userRole: ROLES.LAB_USER,
    }),
    walletModel.findOne({
      userId: testMain.approvedServiceProvider,
      userRole: ROLES.SERVICE_PROVIDER,
    }),
    walletModel.findOne({
      userId: testMain.customer._id,
      userRole: ROLES.CUSTOMER,
    }),
    walletModel.findOne({ userRole: ROLES.SUPER_ADMIN }),
  ]);
  const labWalletData = getUserWalletDetail(
    req.user._id,
    labWallet,
    testMain?.packages?.labShare,
    ROLES.LAB_USER
  );
  const getSpWalletData = getUserWalletDetail(
    testMain.approvedServiceProvider,
    spWallet,
    testMain?.packages?.hspShare,
    ROLES.SERVICE_PROVIDER
  );
  const userWalletData = getUserWalletDetail(
    testMain.customer._id,
    userWallet,
    testMain?.packages?.customerShare,
    ROLES.CUSTOMER
  );
  let adminShare;
  if (testMain.referredDoctor) {
    adminShare = testMain?.packages.mobilabShare;
  } else {
    adminShare = testMain?.packages.mobilabShare + testMain?.packages.gpShare;
  }
  const adminWalletData = getAdminWalletDetail(adminWallet, adminShare);

  const WalletHistory = [
    getWalletHistoryData(
      req.user._id,
      ROLES.LAB_USER,
      testMain?.packages.labShare,
      labWallet?.walletBalance,
      PACKAGE_TYPE.TEST,
      testMain._id
    ),
    getWalletHistoryData(
      testMain.approvedServiceProvider,
      ROLES.SERVICE_PROVIDER,
      testMain?.packages.hspShare,
      spWallet?.walletBalance,
      PACKAGE_TYPE.TEST,
      testMain._id
    ),
    getWalletHistoryData(
      testMain.customer,
      ROLES.CUSTOMER,
      testMain?.packages.customerShare,
      userWallet?.walletBalance,
      PACKAGE_TYPE.TEST,
      testMain._id
    ),
    getWalletHistoryData(
      null,
      ROLES.SUPER_ADMIN,
      adminShare,
      adminWallet?.walletBalance,
      PACKAGE_TYPE.TEST,
      testMain._id
    ),
  ];
  const bulkWalletUpdate = [
    getDbUpdateObject(
      { userId: req.user._id, userRole: req.user.userRole },
      labWalletData
    ),
    getDbUpdateObject({ userId: testMain.customer._id }, userWalletData),
    getDbUpdateObject(
      {
        userId: testMain.approvedServiceProvider,
        userRole: ROLES.SERVICE_PROVIDER,
      },
      getSpWalletData
    ),
    getDbUpdateObject({ userRole: ROLES.SUPER_ADMIN }, adminWalletData),
  ];
  if (testMain.referredDoctor) {
    const gpWalletDetail = await walletModel.findOne({
      userId: testMain.referredDoctor,
      userRole: ROLES.GP_PARTNER,
    });
    const gpShare = getUserWalletDetail(
      testMain.referredDoctor,
      gpWalletDetail,
      testMain?.packages.gpShare,
      ROLES.GP_PARTNER
    );
    WalletHistory.push(
      getWalletHistoryData(
        testMain.referredDoctor,
        ROLES.GP_PARTNER,
        testMain.packages.gpShare,
        gpWalletDetail?.walletBalance,
        PACKAGE_TYPE.TEST,
        testMain._id
      )
    );
    bulkWalletUpdate.push(
      getDbUpdateObject(
        { userRole: ROLES.GP_PARTNER, userId: testMain.referredDoctor },
        gpShare
      )
    );
  }
  const fieldUpdates = {
    $set: {
      reports: reportsDocsArr.map((r) => r),
      statusTransaction: [
        ...testMain.statusTransaction,
        { status: CUSTOMER_LAB_TEST_STATUS.TEST_COMPLETED, date: new Date() },
      ],
      reportSubmittedDate: new Date(),
    },
  };
  const followupAppointmentDetail = {
    appointmentDate: sliceDate(appointmentPrescription),
    appointmentId: appointment?._id,
    purchaseUrl: `${FRONTEND_URL}/appointments/followup/${appointment?._id}`,
  };
  const customerPayload = {
    to: testMain?.customer.email,
    data: {
      name: testMain?.customer.name,
      orderId: testMain._id,
      text: "Your test report is uploaded on Mobilab2u portal",
      followupAppointmentDetail: JSON.parse(
        JSON.stringify(followupAppointmentDetail)
      ),
    },
    ...EMAIL_CONTENTS.TEST_REPORT_ADDED_CUSTOMER,
  };
  const hspPayload = {
    to: testMain?.approvedServiceProvider.email,
    data: {
      hspName: testMain?.approvedServiceProvider.name,
      orderId: testMain._id,
      testName: testMain?.packages.name,
    },
    ...EMAIL_CONTENTS.TEST_REPORT_ADDED_HSP,
  };
  const adminPayload = {
    to: ADMIN_INFO_EMAIL,
    data: {
      customerName: testMain?.customer.name,
      orderId: testMain._id,
      packageName: testMain?.packages.name,
      labName: testMain?.approvedServiceProvider.name,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    },
    ...EMAIL_CONTENTS.TEST_REPORT_ADDED_ADMIN,
  };
  await Promise.allSettled([
    req.sendWhatsappMessage(
      testMain?.customer?.phone,
      WHATSAPP_TEMPLATES.UPLOAD_TEST_REPORT,
      JSON.stringify({
        cname: testMain?.customer.name,
        link: `${FRONTEND_URL}/customer-tests?id=${testMain._id}`,
      })
    ),
    req.sendMail(adminPayload),
    req.sendMail(customerPayload),
    req.sendMail(hspPayload),
  ]);
  const [{ value: updatedLabTest }]: any = await Promise.allSettled([
    !isFollowupTest
      ? labTestModel.findByIdAndUpdate({ _id: testMain._id }, fieldUpdates, {
          new: true,
        })
      : followupLabTestModel.findByIdAndUpdate(
          { _id: testMain._id },
          fieldUpdates,
          { new: true }
        ),
    walletModel.bulkWrite(bulkWalletUpdate),
    walletHistoryModel.insertMany(WalletHistory),
  ]);

  return reply.send({ message: "Reports updated", updatedLabTest });
};

export const getCustomerLabTestDetails = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.VIEW_ALL, SUBJECTS.Test);
  const customer = await customerModel.findById({ _id: req.user._id });
  const labTests = await labTestModel.aggregate(
    customerTestRequests(customer._id)
  );
  reply.send(labTests);
};

export const getTestByCustomerId = async (
  req: FastifyRequest<{ Params: { customerId: string } }>,
  reply: FastifyReply
) => {
  if (!req.params.customerId) {
    return reply.notFound(errorMessage.CUSTOMER_ID_NOT_FOUND);
  }
  const labTests = await labTestModel.aggregate([
    unionWith("followupLabTests"),
    ...lookupDataFromCollection("documentStorage", "reports:all"),
    {
      $match: {
        customer: ObjectId(req.params.customerId),
        "statusTransaction.status": {
          $eq: CUSTOMER_LAB_TEST_STATUS.TEST_COMPLETED,
        },
      },
    },
    {
      $sort: { createdAt: -1 },
    },
  ]);
  return reply.send(labTests);
};

export const createCustomerTestPayment = async (
  req: FastifyRequest<{
    Body: CreateCustomerTestSchema;
  }>,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.PAY_LAB_TEST_PAYMENT, SUBJECTS.Payment);
  const customer = await customerModel.findById({ _id: req.user._id });
  if (!customer) {
    return reply.notFound(errorMessage.USER_NOT_FOUND);
  }
  const [{ value: hsp }, { value: lab }]: any = await Promise.allSettled([
    serviceProviderModel.findOne({
      postCode: req.body.customerAddress.postCode,
    }),
    labModel.findOne({ postCode: req.body.customerAddress.postCode }),
  ]);
  if (!hsp) {
    return reply.notFound(errorMessage.AREA_HSP_NOT_FOUND);
  }
  if (!lab) {
    return reply.notFound(errorMessage.AREA_LABS_NOT_FOUND);
  }
  if (!req.body.packageId) {
    return reply.notFound(errorMessage.PLAN_ID_NOT_FOUND);
  }

  const [packageDetail] = await packageModel.aggregate(
    getPackageDetail(req.body.packageId)
  );
  if (!packageDetail) {
    return reply.notFound(errorMessage.PLAN_NOT_FOUND);
  }
  if (
    packageDetail.type === PACKAGE_OPTION.FAMILY &&
    !req.body.members?.length
  ) {
    return reply.notFound(errorMessage.MEMBERS_DETAIL_NOT_FOUND);
  }

  if (
    packageDetail.type === PACKAGE_OPTION.FAMILY &&
    (req.body.members?.length ?? 0) > packageDetail.members
  ) {
    return reply.notFound(errorMessage.MEMBERS_LIMIT_EXCEEDED);
  }
  delete packageDetail.document;
  delete packageDetail.image;
  const bodyData = {
    customer: customer._id,
    packages: packageDetail,
    members:
      packageDetail.type === PACKAGE_OPTION.FAMILY ? req.body.members : [],
    statusTransaction: [
      {
        status: CUSTOMER_LAB_TEST_STATUS.PROCESSING,
        date: new Date(),
      },
    ],
    customerAppointmentDate: req.body.customerAppointmentDate,
    customerAppointmentTime: req.body.customerAppointmentTime,
    customerAddress: req.body.customerAddress,
  };
  let address = [];
  if (req.body.addressType === NEW) {
    if (customer.secondaryAddress.length < 5) {
      address = [...customer.secondaryAddress, req.body.customerAddress];
    } else {
      address = [customer.secondaryAddress.pop(), req.body.customerAddress];
    }
    await customerModel.findByIdAndUpdate(req.user._id, {
      $set: {
        secondaryAddress: address,
      },
    });
  }
  const labTest = await labTestModel.create(bodyData);
  const metadata = {
    testId: `${labTest._id}`,
    paymentUserId: `${customer._id}`,
    planId: `${packageDetail._id}`,
    serviceType: packageDetail.serviceType,
    userName: `${req.user.name}`,
    userRole: ROLES.CUSTOMER,
    paymentType: PAYMENT_TYPE.TEST_FEES,
  };
  const planDetails = {
    feesName: packageDetail.name,
    feesDetail: packageDetail.description,
    price: packageDetail.offerPrice,
  };

  const session = await createPaymentLink(
    req.user.email,
    metadata,
    planDetails,
    {
      message: successMessage.PAYMENT_SUCCESS_FOR_BLOOD_TEST,
      redirect: "/customer-tests",
      redirectType: PACKAGE_TYPE.TEST,
    }
  );
  return reply.send({
    stripeURL: session.url,
  });
};

export const reGenerateTestPayment = async (
  req: FastifyRequest<{
    Body: { testId: string };
  }>,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.PAY_LAB_TEST_PAYMENT, SUBJECTS.Payment);
  if (!req.body.testId) {
    return reply.notFound(errorMessage.CUSTOMER_TEST_ID_NOT_FOUND);
  }
  let isFollowupTest = false;

  let labTestDetail = await labTestModel
    .findById({ _id: ObjectId(req.body.testId) })
    .populate(populatingTestDetail);

  if (!labTestDetail) {
    isFollowupTest = true;
    labTestDetail = await followupLabTestModel
      .findById({
        _id: ObjectId(req.body.testId),
      })
      .populate(populatingTestDetail);
  }
  const [packageDetail] = await packageModel.aggregate(
    getPackageDetail(labTestDetail.packages._id)
  );

  const metadata = {
    testId: `${labTestDetail._id}`,
    paymentUserId: `${labTestDetail.customer._id}`,
    planId: `${packageDetail._id}`,
    serviceType: labTestDetail.packages.serviceType,
    userName: `${req.user.name}`,
    userRole: ROLES.CUSTOMER,
    paymentType: isFollowupTest
      ? PAYMENT_TYPE.FOLLOWUP_TEST_FEES
      : PAYMENT_TYPE.TEST_FEES,
  };
  const planDetails = {
    feesName: packageDetail.name,
    feesDetail: packageDetail.description,
    price: packageDetail.offerPrice,
  };
  if (isFollowupTest) {
    await followupLabTestModel.findOneAndUpdate(
      {
        _id: ObjectId(req.body.testId),
      },
      { packages: packageDetail }
    );
  } else {
    await labTestModel.findOneAndUpdate(
      {
        _id: ObjectId(req.body.testId),
      },
      { packages: packageDetail }
    );
  }
  const session = await createPaymentLink(
    req.user.email,
    metadata,
    planDetails,
    {
      message: successMessage.PAYMENT_SUCCESS_FOR_BLOOD_TEST,
      redirect: "/customer-tests",
      redirectType: PACKAGE_TYPE.TEST,
    }
  );
  return reply.send({
    stripeURL: session.url,
  });
};

export const createCustomerFollowupTestPayment = async (
  req: FastifyRequest<{
    Body: CreateCustomerTestSchema;
  }>,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.PAY_LAB_TEST_PAYMENT, SUBJECTS.Payment);
  const customer = await customerModel.findById({ _id: req.user._id });
  if (!customer) {
    return reply.notFound(errorMessage.USER_NOT_FOUND);
  }
  const [{ value: hsp }, { value: lab }]: any = await Promise.allSettled([
    serviceProviderModel.findOne({
      postCode: req.body.customerAddress.postCode,
    }),
    labModel.findOne({ postCode: req.body.customerAddress.postCode }),
  ]);
  if (!hsp) {
    return reply.notFound(errorMessage.AREA_HSP_NOT_FOUND);
  }
  if (!lab) {
    return reply.notFound(errorMessage.AREA_LABS_NOT_FOUND);
  }
  if (!req.body.packageId) {
    return reply.notFound(errorMessage.PLAN_ID_NOT_FOUND);
  }
  let appointment = await AppointmentModel.findById({
    _id: req.body.appointmentId,
  });
  if (!appointment) {
    appointment = await doctorFollowupAppointmentModel.findById({
      _id: req.body.appointmentId,
    });
  }

  if (!appointment) {
    return reply.notFound(errorMessage.APPOINTMENT_DETAIL_NOT_FOUND);
  }

  const [packageDetail] = await packageModel.aggregate(
    getPackageDetail(req.body.packageId)
  );
  if (!packageDetail) {
    return reply.notFound(errorMessage.PLAN_NOT_FOUND);
  }
  if (!req.body.referredDoctor) {
    return reply.notFound(errorMessage.REFERRAL_DOCTOR_IS_REQUIRED);
  }
  if (
    packageDetail.type === PACKAGE_OPTION.FAMILY &&
    !req.body.members?.length
  ) {
    return reply.notFound(errorMessage.MEMBERS_DETAIL_NOT_FOUND);
  }
  if (
    packageDetail.type === PACKAGE_OPTION.FAMILY &&
    (req.body.members?.length ?? 0) > packageDetail.members
  ) {
    return reply.notFound(errorMessage.MEMBERS_LIMIT_EXCEEDED);
  }
  delete packageDetail.document;
  delete packageDetail.image;
  const bodyData = {
    customer: customer._id,
    appointment: appointment._id,
    packages: packageDetail,
    members:
      packageDetail.type === PACKAGE_OPTION.FAMILY ? req.body.members : [],
    statusTransaction: [
      {
        status: CUSTOMER_LAB_TEST_STATUS.PROCESSING,
        date: new Date(),
      },
    ],
    customerAppointmentDate: req.body.customerAppointmentDate,
    customerAppointmentTime: req.body.customerAppointmentTime,
    customerAddress: {
      city: req.body.customerAddress.city,
      state: req.body.customerAddress.state,
      address: req.body.customerAddress.address,
      postCode: req.body.customerAddress.postCode,
    },
    referredDoctor: req.body.referredDoctor,
  };
  let address = [];
  if (req.body.addressType === NEW) {
    if (customer.secondaryAddress.length < 5) {
      address = [...customer.secondaryAddress, req.body.customerAddress];
    } else {
      address = [customer.secondaryAddress.pop(), req.body.customerAddress];
    }
    await customerModel.findByIdAndUpdate(req.user._id, {
      $set: {
        secondaryAddress: address,
      },
    });
  }
  const labTest = await followupLabTestModel.create(bodyData);
  const metadata = {
    testId: `${labTest._id}`,
    paymentUserId: `${customer._id}`,
    planId: `${packageDetail._id}`,
    serviceType: packageDetail.serviceType,
    userName: `${req.user.name}`,
    userRole: ROLES.CUSTOMER,
    paymentType: PAYMENT_TYPE.FOLLOWUP_TEST_FEES,
  };
  const planDetails = {
    feesName: packageDetail.name,
    feesDetail: packageDetail.description,
    price: packageDetail.offerPrice,
  };

  const session = await createPaymentLink(
    req.user.email,
    metadata,
    planDetails,
    {
      message: successMessage.PAYMENT_SUCCESS_FOR_BLOOD_TEST,
      redirect: "/customer-tests",
      redirectType: PACKAGE_TYPE.TEST,
    }
  );
  return reply.send({
    stripeURL: session.url,
  });
};

export const customerTestFeesSuccess = async (
  metadata: MetaData,
  payment: { _id: string }
) => {
  const promises = [
    labTestModel.findByIdAndUpdate(
      { _id: metadata.testId },
      { payment: payment._id },
      { new: true }
    ),
    customerModel.findById({ _id: metadata.paymentUserId }),
  ];
  const [{ value: testData = {} }, { value: customer = {} }]: any =
    await Promise.allSettled(promises);
  const hsp = await serviceProviderModel.find({
    postCode: {
      $in: [testData.customerAddress?.postCode],
    },
  });

  const emailBody = {
    customerName: customer.name,
    testName: testData.packages.name,
    orderId: testData._id,
    date: sliceDate(testData.customerAppointmentDate),
    time: testData.customerAppointmentTime,
    link: `${FRONTEND_URL}/customer-tests?id=${testData._id}`,
    testLink: `${FRONTEND_URL}/purchased-packages/${testData._id}`,
  };
  const whatsappBody = {
    cname: customer.name,
    pname: testData.packages.name,
    orderid: testData._id,
    date: sliceDate(testData.customerAppointmentDate),
    time: testData.customerAppointmentTime,
    link: `${FRONTEND_URL}/purchased-packages/${testData._id}`,
  };

  const customerMailPayload = {
    to: customer.email,
    data: emailBody,
    ...EMAIL_CONTENTS.TEST_BOOK_SUCCESS_CUSTOMER,
  };

  const adminMailPayload = {
    to: ADMIN_INFO_EMAIL,
    data: emailBody,
    ...EMAIL_CONTENTS.TEST_BOOK_SUCCESS_ADMIN,
  };

  await Promise.allSettled([
    sendMail(customerMailPayload),
    sendMail(adminMailPayload),
    sendWhatsappMessage(
      customer.phone,
      WHATSAPP_TEMPLATES.NEW_TEST_NOTIFICATION_ADMIN,
      JSON.stringify(whatsappBody)
    ),
  ]);

  if (NODE_ENV !== "local" && Array.isArray(hsp) && hsp.length > 0) {
    const promises = hsp.flatMap((hsp) => [
      remainderPub.add({
        queue: QUEUE_OPTIONS.WHATSAPP,
        to: hsp.phone,
        template: WHATSAPP_TEMPLATES.NEW_TEST_NOTIFICATION_FOR_HSP,
        variables: JSON.stringify({
          hspname: hsp.name,
          cname: customer.name,
          pname: testData.packages.name,
          link: `${FRONTEND_URL}/customer-tests?id=${testData._id}`,
          date: sliceDate(testData.customerAppointmentDate),
          time: testData.customerAppointmentTime,
        }),
      }),

      remainderPub.add({
        queue: QUEUE_OPTIONS.EMAIL,
        to: hsp.email,
        data: {
          text: `${customer.name} customer purchased ${testData.packages.name}. Please approve and take blood sample`,
          name: `${hsp.name} Health Service Provider`,
          appURL: `${FRONTEND_URL}/customer-tests?id=${testData._id}`,
        },
        ...EMAIL_CONTENTS.TEST_ADDED_HSP,
      }),
    ]);
    await Promise.allSettled(promises);
  }
};

export const customerFollowupTestFeesSuccess = async (
  metadata: MetaData,
  payment: { _id: string }
) => {
  const [{ value: testData = {} }, { value: customer = {} }]: any =
    await Promise.allSettled([
      followupLabTestModel.findByIdAndUpdate(
        { _id: metadata.testId },
        { payment: payment._id },
        { new: true }
      ),
      customerModel.findById({ _id: metadata.paymentUserId }),
    ]);
  const hsp = await serviceProviderModel.find({
    postCode: {
      $in: testData.customerAddress.postCode,
    },
  });
  await appointmentPrescriptionModel.findOneAndUpdate(
    { appointment: testData.appointment },
    {
      $set: {
        "followupTest.isTestPurchased": true,
      },
    },
    {
      new: true,
    }
  );

  const emailBody = {
    customerName: customer.name,
    testName: testData.packages.name,
    orderId: testData._id,
    date: sliceDate(testData.customerAppointmentDate),
    time: testData.customerAppointmentTime,
    link: `${FRONTEND_URL}/customer-tests?id=${testData._id}`,
    testLink: `${FRONTEND_URL}/purchased-packages/${testData._id}`,
  };
  const whatsappBody = {
    cname: customer.name,
    pname: testData.packages.name,
    orderid: testData._id,
    date: sliceDate(testData.customerAppointmentDate),
    time: testData.customerAppointmentTime,
    link: `${FRONTEND_URL}/purchased-packages/${testData._id}`,
  };

  const customerMailPayload = {
    to: customer.email,
    data: emailBody,
    ...EMAIL_CONTENTS.TEST_BOOK_SUCCESS_CUSTOMER,
  };

  const adminMailPayload = {
    to: ADMIN_INFO_EMAIL,
    data: emailBody,
    ...EMAIL_CONTENTS.TEST_BOOK_SUCCESS_ADMIN,
  };

  await Promise.allSettled([
    sendMail(customerMailPayload),
    sendMail(adminMailPayload),
    sendWhatsappMessage(
      customer.phone,
      WHATSAPP_TEMPLATES.NEW_TEST_NOTIFICATION_ADMIN,
      JSON.stringify(whatsappBody)
    ),
  ]);

  if (NODE_ENV !== "local" && Array.isArray(hsp) && hsp.length > 0) {
    const promises = hsp.flatMap((hsp) => [
      remainderPub.add({
        queue: QUEUE_OPTIONS.WHATSAPP,
        to: hsp.phone,
        template: WHATSAPP_TEMPLATES.NEW_TEST_NOTIFICATION_FOR_HSP,
        variables: JSON.stringify({
          hspname: hsp.name,
          cname: customer.name,
          pname: testData?.packages?.name,
          link: `${FRONTEND_URL}/customer-tests?id=${testData._id}`,
          date: sliceDate(testData.customerAppointmentDate),
          time: testData.customerAppointmentTime,
        }),
      }),

      remainderPub.add({
        queue: QUEUE_OPTIONS.EMAIL,
        to: hsp.email,
        data: {
          text: `${customer.name} customer purchased ${testData.packages.name}. Please approve and take blood sample`,
          name: `${hsp.name} Health Service Provider`,
          appURL: `${FRONTEND_URL}/customer-tests`,
        },
        ...EMAIL_CONTENTS.TEST_ADDED_HSP,
      }),
    ]);
    await Promise.allSettled(promises);
  }
};

export const getFinishedLabTest = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const testCompleted = {
    $elemMatch: { status: CUSTOMER_LAB_TEST_STATUS.TEST_COMPLETED },
  };
  let match: any = {
    statusTransaction: testCompleted,
  };

  if (req.user.userRole === ROLES.CUSTOMER) {
    match.customer = req.user._id;
  }

  if (req.user.userRole === ROLES.SERVICE_PROVIDER) {
    match.approvedServiceProvider = req.user._id;
  }

  if (req.user.userRole === ROLES.SUPER_ADMIN) {
  }
  if (req.user.userRole === ROLES.LAB_USER) {
    match.submittedLab = req.user._id;
  }
  if (req.user.userRole === ROLES.GP_PARTNER) {
    return 0;
  }
  const labTests = await labTestModel.aggregate([
    unionWith("followupLabTests"),
    {
      $match: match,
    },
  ]);
  return reply.send(labTests.length);
};

export const testCancellationByAdmin = async (
  req: FastifyRequest<{ Body: { cancellationReason: string; testId: string } }>,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.CANCELLATION, SUBJECTS.Test);
  if (!req.body.testId) {
    return reply.badRequest(errorMessage.LAB_TEST_ID_NOT_FOUND);
  }
  if (!req.body.cancellationReason) {
    return reply.notFound(errorMessage.CANCELLATION_REASON_REQUIRED);
  }

  let folowupLabTest;
  let labTest = await labTestModel
    .findById(req.body.testId)
    .populate(["customer", "approvedServiceProvider", "submittedLab"]);
  if (!labTest) {
    folowupLabTest = true;
    labTest = await followupLabTestModel
      .findById(req.body.testId)
      .populate(["customer", "approvedServiceProvider", "submittedLab"]);
  }

  if (!labTest) {
    return reply.notFound(errorMessage.LAB_TEST_NOT_FOUND);
  }
  if (
    labTest.statusTransaction[labTest.statusTransaction.length - 1] ===
    CUSTOMER_LAB_TEST_STATUS.CANCELLED
  ) {
    return reply.badRequest(errorMessage.LAB_TEST_CANCELLED);
  }

  const updateFIelds = {
    $set: {
      statusTransaction: [
        ...labTest.statusTransaction,
        {
          status: CUSTOMER_LAB_TEST_STATUS.CANCELLED,
          date: new Date(),
        },
      ],
      cancellationReason: req.body.cancellationReason,
    },
  };
  labTest.statusTransaction = [
    ...labTest.statusTransaction,
    {
      status: CUSTOMER_LAB_TEST_STATUS.CANCELLED,
      date: new Date(),
    },
  ];
  if (folowupLabTest) {
    await followupLabTestModel.findByIdAndUpdate(labTest._id, updateFIelds);
  } else {
    await labTestModel.findByIdAndUpdate(labTest._id, updateFIelds);
  }
  const userWallet = await walletModel.findOne({
    userId: labTest.customer?._id,
    userRole: ROLES.CUSTOMER,
  });
  await walletHistoryModel.create(
    getWalletHistoryData(
      labTest.customer?._id,
      ROLES.CUSTOMER,
      labTest?.packages.offerPrice,
      userWallet?.walletBalance,
      PACKAGE_TYPE.TEST_CANCELLATION,
      labTest._id
    )
  );

  const userWalletData = getUserWalletDetail(
    labTest.customer?._id,
    userWallet,
    labTest?.packages?.offerPrice,
    ROLES.CUSTOMER
  );
  await walletModel.findOneAndUpdate(
    { userId: labTest.customer?._id, userRole: ROLES.CUSTOMER },
    userWalletData,
    dbOptions
  );
  await req.sendMail({
    to: labTest.customer?.email,
    ...EMAIL_CONTENTS.TEST_CANCELLATION_CUSTOMER,
    data: {
      customerName: labTest.customer?.name,
    },
  });
  await req.sendMail({
    to: ADMIN_INFO_EMAIL,
    ...EMAIL_CONTENTS.TEST_CANCEL_ADMIN,
    data: {
      customerName: labTest.customer?.name,
      packageName: labTest.packages.name,
      reason: req.body.cancellationReason,
      date: sliceDate(labTest.customerAppointmentDate),
      time: labTest.customerAppointmentTime,
      orderId: labTest._id,
    },
  });
  if (labTest.approvedServiceProvider) {
    await req.sendMail({
      to: labTest.approvedServiceProvider.email,
      ...EMAIL_CONTENTS.TEST_CANCELLATION_HSP,
      data: {
        hspName: labTest.approvedServiceProvider.name,
        customerName: labTest.customer?.name,
      },
    });
  }
  if (labTest.submittedLab) {
    await req.sendMail({
      to: labTest.submittedLab.email,
      ...EMAIL_CONTENTS.TEST_CANCELLATION_LAB,
      data: {
        labName: labTest.submittedLab.name,
        customerName: labTest.customer?.name,
      },
    });
  }
  return reply.send({
    message: successMessage.LAB_TEST_CANCELLED_SUCCESS,
  });
};

export const sampleRecollectionApproval = async (
  req: FastifyRequest<{
    Body: {
      customerAppointmentDate: string;
      customerAppointmentTime: string;
      testId: string;
    };
  }>,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.SAMPLE_RECOLLECTION_APPROVAL, SUBJECTS.Test);
  if (!req.body.testId) {
    return reply.notFound(errorMessage.LAB_TEST_ID_NOT_FOUND);
  }
  if (!req.body.customerAppointmentDate) {
    return reply.notFound(errorMessage.CUSTOMER_APPOINTMENT_DATE_REQUIRED);
  }
  if (!req.body.customerAppointmentTime) {
    return reply.notFound(errorMessage.CUSTOMER_APPOINTMENT_TIME_REQUIRED);
  }
  let isFollowupTest;
  let labTestData = (await labTestModel
    .findById({ _id: req.body.testId })
    .populate([
      "customer",
      "approvedServiceProvider",
      "submittedLab",
    ])) as LabTest;

  if (!labTestData) {
    isFollowupTest = true;
    labTestData = (await followupLabTestModel
      .findById({
        _id: req.body.testId,
      })
      .populate([
        "customer",
        "approvedServiceProvider",
        "submittedLab",
      ])) as LabTest;
  }
  const lastStatusTransaction =
    labTestData.statusTransaction[labTestData.statusTransaction.length - 1];
  const lastStatus = lastStatusTransaction?.status;
  if (
    !CUSTOMER_TEST_VALID_TRANSACTIONS[lastStatus]?.includes(
      CUSTOMER_LAB_TEST_STATUS.SAMPLE_RE_COLLECTION_APPROVED
    )
  ) {
    return reply.badRequest(
      `Invalid status transaction ${lastStatus.toString()} to ${CUSTOMER_LAB_TEST_STATUS.SAMPLE_RE_COLLECTION_APPROVED.toString()}`
    );
  }
  const { encryptedOTP, OTP } = await generateOTP();
  const { encryptedOTP: cusEnOTP, OTP: cusOTP } = await generateOTP();
  await otpModel.create({
    number: `${labTestData.submittedLab.phone}`,
    email: `${labTestData.submittedLab.email}`,
    userRole: ROLES.LAB_USER,
    otp: encryptedOTP,
    originalOTP: OTP,
    type: OTP_AUTH_OPTIONS.LAB_OTP_FROM_HSP,
    testId: labTestData._id,
    currentDate: new Date(),
  });
  await otpModel.create({
    number: `${labTestData.customer.phone}`,
    email: `${labTestData.customer.email}`,
    userRole: ROLES.CUSTOMER,
    otp: cusEnOTP,
    originalOTP: cusOTP,
    type: OTP_AUTH_OPTIONS.CUSTOMER_OTP_FROM_HSP,
    testId: labTestData._id,
    currentDate: new Date(),
  });
  const updateFields = {
    statusTransaction: [
      ...labTestData.statusTransaction,
      {
        status: CUSTOMER_LAB_TEST_STATUS.SAMPLE_RE_COLLECTION_APPROVED,
        date: new Date(),
      },
    ],
    customerAppointmentDate: req.body.customerAppointmentDate,
    customerAppointmentTime: req.body.customerAppointmentTime,
    sampleRecollectionIssuedDate: new Date(),
  };

  const cusEmailData = {
    to: labTestData.customer.email,
    data: {
      customerName: labTestData.customer.name,
      testName: labTestData.packages.name,
      hspName: labTestData.approvedServiceProvider.name,
      OTP: cusOTP,
      orderId: labTestData._id,
      appointmentDate: sliceDate(req.body.customerAppointmentDate),
      appointmentTime: req.body.customerAppointmentTime,
    },
    ...EMAIL_CONTENTS.TEST_SAMPLE_RE_COLLECTION_APPROVAL_CUSTOMER,
  };
  const hspEmailData = {
    to: labTestData.approvedServiceProvider.email,
    data: {
      customerName: labTestData.customer.name,
      orderId: labTestData._id,
      testName: labTestData.packages.name,
      customerPhone: labTestData.customer.phone,
      labReason: labTestData.sampleRecollectionReason,
      hspName: labTestData.approvedServiceProvider.name,
      appointmentDate: sliceDate(req.body.customerAppointmentDate),
      appointmentTime: req.body.customerAppointmentTime,
      link: `${FRONTEND_URL}/customer-tests?id=${labTestData._id}`,
    },
    ...EMAIL_CONTENTS.TEST_SAMPLE_RE_COLLECTION_APPROVAL_HSP,
  };
  const labEmailData = {
    to: labTestData.submittedLab.email,
    data: {
      customerName: labTestData.customer.name,
      labName: labTestData.submittedLab.name,
      orderId: labTestData._id,
      testName: labTestData.packages.name,
      labReason: labTestData.sampleRecollectionReason,
      OTP: OTP,
    },
    ...EMAIL_CONTENTS.TEST_SAMPLE_RE_COLLECTION_APPROVAL_LAB,
  };

  const adminEmail = {
    to: ADMIN_INFO_EMAIL,
    data: {
      customerName: labTestData.customer.name,
      labName: labTestData.submittedLab.name,
      orderId: labTestData._id,
      testName: labTestData.packages.name,
      reason: labTestData.sampleRecollectionReason,
      link: `${FRONTEND_URL}/purchased-packages/${labTestData._id}`,
      date: sliceDate(),
      time: new Date().toLocaleDateString(),
    },
    ...EMAIL_CONTENTS.SAMPLE_RE_COLLECTION_APPROVAL_ADMIN,
  };
  const cusWhatsapp = JSON.stringify({
    cname: labTestData.customer.name,
    reason: labTestData.sampleRecollectionReason,
    hspname: labTestData.approvedServiceProvider.name,
    vlabel: "OTP",
    vvalue: cusOTP,
    link: `${FRONTEND_URL}/customer-tests?id=${labTestData._id}`,
  });

  const hspWhatsapp = JSON.stringify({
    hspname: labTestData.approvedServiceProvider.name,
    cname: labTestData.customer.name,
    ccontact: `${labTestData.customer.phone}`,
    testname: labTestData.packages.name,
    testid: `${labTestData._id}`,
    reason: labTestData.sampleRecollectionReason,
    link: `${FRONTEND_URL}/customer-tests?id=${labTestData._id}`,
  });

  await Promise.allSettled([
    req.sendMail(cusEmailData),
    req.sendMail(hspEmailData),
    req.sendMail(labEmailData),
    req.sendMail(adminEmail),
    req.sendWhatsappMessage(
      labTestData.customer.phone,
      WHATSAPP_TEMPLATES.SAMPLE_RE_COLLECTION_CUSTOMER,
      cusWhatsapp
    ),
    req.sendWhatsappMessage(
      labTestData.approvedServiceProvider.phone,
      WHATSAPP_TEMPLATES.SAMPLE_RE_COLLECTION_HSP,
      hspWhatsapp
    ),
  ]);

  await Promise.allSettled([
    !isFollowupTest &&
      labTestModel.findOneAndUpdate({ _id: labTestData._id }, updateFields, {
        new: true,
      }),
    isFollowupTest &&
      followupLabTestModel.findOneAndUpdate(
        { _id: labTestData._id },
        updateFields,
        { new: true }
      ),
  ]);
  return reply.send({
    message: successMessage.SAMPLE_RE_COLLECTION_APPROVAL_SUCCESS,
  });
};

export const orderDateAndTimeRescheduleByAdmin = async (
  req: FastifyRequest<{
    Body: {
      customerAppointmentDate: string;
      customerAppointmentTime: string;
      testId: string;
    };
  }>,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.RESCHEDULE, SUBJECTS.Test);
  if (!req.body.testId) {
    return reply.notFound(errorMessage.LAB_TEST_ID_NOT_FOUND);
  }
  if (!req.body.customerAppointmentDate) {
    return reply.notFound(errorMessage.CUSTOMER_APPOINTMENT_DATE_REQUIRED);
  }
  if (!req.body.customerAppointmentTime) {
    return reply.notFound(errorMessage.CUSTOMER_APPOINTMENT_TIME_REQUIRED);
  }
  let isFollowupTest;
  let labTestData = (await labTestModel
    .findById({ _id: req.body.testId })
    .populate([
      "customer",
      "approvedServiceProvider",
      "submittedLab",
    ])) as LabTest;

  if (!labTestData) {
    isFollowupTest = true;
    labTestData = (await followupLabTestModel
      .findById({
        _id: req.body.testId,
      })
      .populate([
        "customer",
        "approvedServiceProvider",
        "submittedLab",
      ])) as LabTest;
  }

  const lastStatusTransaction =
    labTestData.statusTransaction[labTestData.statusTransaction.length - 1];
  const lastStatus = lastStatusTransaction?.status;
  if (lastStatus === CUSTOMER_LAB_TEST_STATUS.TEST_COMPLETED) {
    return reply.badRequest(errorMessage.BLOOD_TEST_ALREADY_COMPLETED);
  }

  const updateFields = {
    customerAppointmentDate: req.body.customerAppointmentDate,
    customerAppointmentTime: req.body.customerAppointmentTime,
    isDateAndTimeChanged: true,
    dateAndTimeChangedDate: new Date(),
  };
  const hsp = await serviceProviderModel.find({
    postCode: labTestData.customerAddress.postCode,
  });
  const apppointmentDate = sliceDate(req.body.customerAppointmentDate);
  const cusEmailData = {
    to: labTestData.customer.email,
    data: {
      userName: `${labTestData.customer.name} Customer`,
      text: `We wanted to let you know that your medical test has been
          rescheduled.`,
      orderId: labTestData._id,
      testName: labTestData.packages.name,
      newDate: apppointmentDate,
      newTime: req.body.customerAppointmentTime,
      link: `${FRONTEND_URL}/customer-tests?id=${labTestData._id}`,
    },
    ...EMAIL_CONTENTS.TEST_TIME_CHANGED,
  };

  await req.sendMail(cusEmailData);

  if (labTestData.statusTransaction.length >= 2) {
    const hspEmailData = {
      to: labTestData.approvedServiceProvider.email,
      data: {
        userName: `${labTestData.approvedServiceProvider.name} Health Service provider`,
        text: `We wanted to let you know that you approved blood test has been
          rescheduled by customer.`,
        testName: labTestData.packages.name,
        newDate: apppointmentDate,
        newTime: req.body.customerAppointmentTime,
        orderId: labTestData._id,
        link: `${FRONTEND_URL}/customer-tests?id=${labTestData._id}`,
      },
      ...EMAIL_CONTENTS.TEST_TIME_CHANGED,
    };
    await req.sendMail(hspEmailData);
  } else if (NODE_ENV !== "local") {
    const promises = hsp.flatMap((hsp) => [
      remainderPub.add({
        queue: QUEUE_OPTIONS.WHATSAPP,
        to: hsp.phone,
        template: WHATSAPP_TEMPLATES.NEW_TEST_NOTIFICATION_FOR_HSP,
        variables: JSON.stringify({
          hspname: hsp.name,
          cname: labTestData.customer.name,
          pname: labTestData?.packages?.name,
          link: `${FRONTEND_URL}/customer-tests?id=${labTestData._id}`,
          date: apppointmentDate,
          time: req.body.customerAppointmentTime,
        }),
      }),

      remainderPub.add({
        queue: QUEUE_OPTIONS.EMAIL,
        to: hsp.email,
        data: {
          text: `${labTestData.customer.name} customer purchased ${labTestData.packages.name}. Please approve and take blood sample`,
          name: `${hsp.name} Health Service Provider`,
          appURL: `${FRONTEND_URL}/customer-tests`,
        },
        ...EMAIL_CONTENTS.TEST_TIME_CHANGED,
      }),
    ]);
    await Promise.allSettled(promises);
  }
  await Promise.allSettled([
    !isFollowupTest &&
      labTestModel.findOneAndUpdate({ _id: labTestData._id }, updateFields, {
        new: true,
      }),
    isFollowupTest &&
      followupLabTestModel.findOneAndUpdate(
        { _id: labTestData._id },
        updateFields,
        { new: true }
      ),
  ]);
  return reply.send({
    message: successMessage.CUSTOMER_TEST_RESCHEDULE_SUCCESS,
  });
};
