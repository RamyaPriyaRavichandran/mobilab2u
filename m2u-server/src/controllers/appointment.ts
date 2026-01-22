import { AggregatedAppointment, FastifyReply, FastifyRequest } from "fastify";
import appointmentModel from "../models/appointment.model";
import successMessage from "../constants/success-messages";
import gpPartnerModel from "../models/gp.partner.model";
import {
  getAllAppointmentDetails,
  getAppointments,
  getCompletedAppointmentDetails,
  getDoctorAvailabilityForQueueing,
  getDoctorsAvailabilityTimeSlot,
  getDoctorsAvailabilityTimeSlotByDetail,
  getExistingAppointments,
  getFollowupTimeSlots,
  getPurchasedMedicinesQuery,
  getUserAppointmentsByUserId,
} from "../mongo-queries/appointment";
import customerModel from "../models/customer.model";
import {
  getAdminWalletDetail,
  getUserWalletDetail,
  getWalletHistoryData,
  splitTimeTo20Mins,
} from "../lib/functions";
import { ACTIONS, ROLES, SUBJECTS } from "../lib/permissions";
import { generateZoomMeeting } from "../lib/createMeeting";
import appointmentPrescriptionModel from "../models/appointment.prescription.model";
import { AddPrescriptionSchema } from "../types/add_prescription_body";
import medicineModel from "../models/medicine.model";
import customPackagesModel from "../models/custom.packages.model";
import {
  ADMIN_INFO_EMAIL,
  FRONTEND_URL,
  NODE_ENV,
  REDIS_DB,
} from "../plugins/env";
import {
  APPOINTMENT_TYPE,
  APPROVAL_STATUS,
  CREATE_CUSTOM_PACKAGE,
  CUSTOMER_CONSULTATION_STATUS,
  HSP_STATUS,
  PACKAGE_TYPE,
  PAYMENT_TYPE,
  QUEUE_OPTIONS,
  QUEUE_TYPE,
} from "../constants";
import followupAppointmentModel from "../models/followup.appointment.model";
import walletModel from "../models/wallet.model";
import { Customer } from "../types/customer";
import { ServiceProvider } from "../types/service.provider";
import {
  countByDateAndMonthAndYear,
  dbOptions,
  getDbUpdateObject,
  getPackageDetail,
  isExistData,
} from "../mongo-queries";
import errorMessage from "../constants/error-messages";
import { createPaymentLink, MetaData } from "./payment";
import { BookAppointmentSchema } from "../types/book_appointment_body";
import packageModel from "../models/package.model";
import { BookFollowupAppointmentSchema } from "../types/book_followup_appointment_body";
import doctorAvailabilityModel from "../models/doctor.availability.model";
import redirectionModel from "../models/redirection.model";
import {
  getDaysDifferenceFromToday,
  getHourDiffFromNow,
  isObjectId,
  ObjectId,
  sliceDate,
} from "../utils";
import { sendMail } from "../lib/nodemailer";
import { UpdateMedicinePriceSchema } from "../types/update_medicine_price_body";
import { CreateCustomPackageSchema } from "../types/create_custom_package_body";
import { Package } from "../types/package";
import { lookupDataFromCollection, unionWith } from "mongo-aggregation-utils";
import { CustomerAppointmentTimeSlotReallocationSchema } from "../types/customer_appointment_time-slot_re_allocation";
import { ReferralSchema } from "../types/add_referral_body";
import { EMAIL_CONTENTS } from "../constants/email-contents";
import {
  getCurrentTime,
  getTimeDiff,
} from "../utils/time-conversion-functions";
import Queue from "bull";
import walletHistoryModel from "../models/wallet.history.model";
import { WHATSAPP_TEMPLATES } from "../constants/whatsapp-templates";
const remainderPub = new Queue(QUEUE_TYPE.REMAINDER_QUEUE, REDIS_DB);
const {
  APPROVED,
  DOCTOR_CONSULTATION_DONE,
  COMPLETED,
  ADMIN_APPROVED,
  CANCELLED,
  DOCTOR_CONFIRMED,
} = CUSTOMER_CONSULTATION_STATUS;
const populatedAppointmentData = [
  "customer",
  "medicalRecords.document",
  {
    path: "approvedDoctor",
    populate: {
      path: "eSign",
      model: "DocumentStorage",
    },
  },
  "payment",
];

export const bookAppointmentValidationCheck = async (
  req: FastifyRequest<{ Body: BookAppointmentSchema }>,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.CREATE, SUBJECTS.Appointment);

  const customer = await customerModel.findById({ _id: req.user._id });
  if (!customer?._id) {
    return reply.notFound(errorMessage.CUSTOMER_NOT_FOUND);
  }
  if (!req.body.packageId) {
    return reply.notFound(errorMessage.PLAN_ID_NOT_FOUND);
  }

  const packages = await packageModel.findById({ _id: req.body.packageId });
  if (!packages?._id) {
    return reply.notFound(errorMessage.PLAN_NOT_FOUND);
  }
  const filterableDate =
    req.body.appointmentDate.length === 10
      ? req.body.appointmentDate
      : req.body.appointmentDate.slice(0, 10);

  const [doctorAvailability] = await doctorAvailabilityModel.aggregate(
    getDoctorsAvailabilityTimeSlotByDetail(
      {
        formattedDate: filterableDate,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
      },
      req.body.doctorLanguage as string
    )
  );
  const currentDate = sliceDate();
  const appointmentDate = sliceDate(req.body.appointmentDate);

  if (!doctorAvailability) {
    return reply.notFound(errorMessage.DOCTOR_AVAILABILITY_NOT_FOUND);
  }
  if (currentDate >= appointmentDate) {
    return reply.badRequest(errorMessage.APPOINTMENT_DATE_EXPIRED);
  }
  const { hourDiff, totalMinutes } = getTimeDiff(
    doctorAvailability.startTime,
    getCurrentTime(NODE_ENV)
  );

  if (currentDate >= appointmentDate && hourDiff >= 0 && totalMinutes <= 0) {
    return reply.notAcceptable(errorMessage.TIME_SLOT_EXPIRED);
  }

  const [existingAppointment] = await appointmentModel.aggregate(
    getExistingAppointments(
      req.body.startTime,
      req.body.endTime,
      new Date(filterableDate),
      req.user._id
    )
  );

  if (!!existingAppointment) {
    return reply.conflict(errorMessage.USER_APPOINTMENT_ALREADY_EXIST);
  }
};

export const bookAppointment = async (
  req: FastifyRequest<{ Body: BookAppointmentSchema }>,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.CREATE, SUBJECTS.Appointment);

  const customer = await customerModel.findById({ _id: req.user._id });

  const packages = await packageModel.findById({ _id: req.body.packageId });

  const redirection = await redirectionModel.create({
    name: PAYMENT_TYPE.APPOINTMENT_FEES,
  });
  const medicalRecords = [];
  if (req.body.documentOne) {
    medicalRecords.push({
      document: req.body.documentOne._id,
      name: req.body.nameOne,
    });
  }
  if (req.body.documentTwo) {
    medicalRecords.push({
      document: req.body.documentTwo._id,
      name: req.body.nameTwo,
    });
  }
  if (req.body.documentThree) {
    medicalRecords.push({
      document: req.body.documentThree._id,
      name: req.body.nameThree,
    });
  }
  const timeSlot = {
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  };
  const dbData: {
    redirection: string;
    appointmentDate: string;
    doctorLanguage: string;
    timeSlot: { startTime: string; endTime: string };
    medicalRecords: { document: unknown; name?: string }[];
  } = {
    redirection: redirection._id,
    appointmentDate: req.body.appointmentDate,
    doctorLanguage: req.body.doctorLanguage,
    timeSlot: timeSlot,
    medicalRecords: [],
  };
  if (medicalRecords.length > 0) {
    dbData.medicalRecords = medicalRecords.filter(
      (r) => r.document !== undefined
    );
  }
  const metaData = {
    paymentUserId: `${req.user._id}`,
    planId: `${packages._id}`,
    serviceType: packages.serviceType,
    userName: `${req.user.name}`,
    userRole: ROLES.CUSTOMER,
    paymentType: PAYMENT_TYPE.APPOINTMENT_FEES,
    dbData: JSON.stringify(dbData),
  };
  const planDetail = {
    feesName: packages.name,
    feesDetail: packages.description || "Appointment fees",
    price: packages.offerPrice,
  };
  const session = await createPaymentLink(
    customer.email as string,
    metaData,
    planDetail,
    {
      message: successMessage.PAYMENT_SUCCESS_FOR_DOCTOR_APPOINTMENT,
      redirect: `/appointments`,
      redirectLatest: redirection._id,
      redirectType: PACKAGE_TYPE.APPOINTMENT,
    }
  );
  return reply.send({ stripeURL: session.url });
};

export const reviewAppointment = async (
  req: FastifyRequest<{ Body: { appointmentId: string } }>,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.REVIEW, SUBJECTS.Appointment);
  const doctor = await gpPartnerModel.findById({
    _id: req.user._id,
    adminApprovalStatus: APPROVAL_STATUS.APPROVED,
    activeStatus: HSP_STATUS.ACTIVE,
  });
  if (!doctor) {
    return reply.notFound(errorMessage.DOCTOR_NOT_FOUND);
  }
  if (!doctor.eSign) {
    return reply.notFound(errorMessage.UPDATE_E_SIGN);
  }
  let isFollowupAppointment = false;
  let appointment = await appointmentModel
    .findById({
      _id: req.body.appointmentId,
    })
    .populate(populatedAppointmentData);
  if (!appointment) {
    isFollowupAppointment = true;
    appointment = await followupAppointmentModel
      .findById({
        _id: req.body.appointmentId,
      })
      .populate(populatedAppointmentData);
  }
  if (!appointment._id) {
    return reply.notFound(errorMessage.APPOINTMENT_DETAIL_NOT_FOUND);
  }

  const { totalMinutes } = getTimeDiff(
    appointment.selectedTimeSlot.startTime,
    getCurrentTime(NODE_ENV)
  );
  const currentDate = sliceDate();
  const appointmentDate = sliceDate(appointment.appointmentDate);
  if (currentDate >= appointmentDate && totalMinutes <= 0) {
    return reply.notAcceptable(errorMessage.TIME_SLOT_EXPIRED);
  }
  const [existingApprovedAppointment] = await appointmentModel.aggregate([
    unionWith("followupAppointments"),
    {
      $match: {
        doctor: req.user._id,
        appointmentDate: appointment.appointmentDate,
        status: APPROVED,
        "selectedTimeSlot.startTime": appointment.selectedTimeSlot.startTime,
        "selectedTimeSlot.endTime": appointment.selectedTimeSlot.endTime,
        "selectedTimeSlot.slotId": appointment.selectedTimeSlot.endTime,

        isBooked: true,
      },
    },
  ]);
  if (!!existingApprovedAppointment) {
    return reply.conflict(errorMessage.APPROVED_APPOINTMENT_ALREADY_EXIST);
  }

  const searchField = (doctor?: any) => {
    return {
      appointmentDate: appointment?.appointmentDate,
      isBooked: false,
      status: CUSTOMER_CONSULTATION_STATUS.PENDING,
      "selectedTimeSlot.startTime": appointment?.timeSlot?.startTime,
      "selectedTimeSlot.endTime": appointment?.timeSlot?.endTime,
      doctor: doctor || null,
    };
  };

  const fDoctorFAppointmentExistWithAppointmentCred =
    await followupAppointmentModel
      .findOne(searchField(doctor._id))
      .populate(["customer", "approvedDoctor"]);

  const rDoctorFAppointmentExistWithAppointmentCred =
    await followupAppointmentModel.findOne(searchField()).populate("customer");

  const mainAppointment = fDoctorFAppointmentExistWithAppointmentCred?._id
    ? fDoctorFAppointmentExistWithAppointmentCred
    : rDoctorFAppointmentExistWithAppointmentCred?._id
      ? rDoctorFAppointmentExistWithAppointmentCred
      : appointment;

  if (!mainAppointment) {
    return reply.notFound(errorMessage.APPOINTMENT_DETAIL_NOT_FOUND);
  }

  const doctorTimeSlot = await doctorAvailabilityModel.findOne({
    date: mainAppointment.appointmentDate,
    startTime: mainAppointment.selectedTimeSlot.startTime,
    endTime: mainAppointment.selectedTimeSlot.endTime,
    isBooked: false,
    doctor: req.user._id,
  });
  if (!doctorTimeSlot?._id) {
    return reply.notFound(errorMessage.DOCTOR_AVAILABILITY_NOT_FOUND);
  }

  const updateFields = {
    $set: {
      isBooked: true,
      approvedDoctor: doctor._id,
      selectedTimeSlot: {
        startTime: mainAppointment.selectedTimeSlot.startTime,
        endTime: mainAppointment.selectedTimeSlot.endTime,
        slotId: doctorTimeSlot._id,
      },
      status: APPROVED,
    },
  };

  if (
    fDoctorFAppointmentExistWithAppointmentCred?._id ||
    isFollowupAppointment ||
    rDoctorFAppointmentExistWithAppointmentCred?._id
  ) {
    await followupAppointmentModel.findByIdAndUpdate(
      { _id: mainAppointment._id },
      updateFields,
      { new: true }
    );
  } else
    await appointmentModel.findByIdAndUpdate(
      { _id: mainAppointment._id },
      updateFields,
      { new: true }
    );

  await doctorAvailabilityModel.findByIdAndUpdate(
    { _id: doctorTimeSlot._id },
    { isBooked: true },
    { new: true }
  );
  const mainAppointmentDate = sliceDate(mainAppointment.appointmentDate);
  const messageData = {
    cname: mainAppointment.customer?.name,
    doctorname: doctor.name,
    date: `${mainAppointmentDate}`,
    time: `${mainAppointment.selectedTimeSlot?.startTime} - ${mainAppointment.selectedTimeSlot.endTime}`,
    link: `${FRONTEND_URL}/appointments/${mainAppointment._id}`,
  };
  const customerMailPayload = {
    to: mainAppointment?.customer?.email,
    data: {
      startTime: mainAppointment.selectedTimeSlot.startTime,
      endTime: mainAppointment.selectedTimeSlot.endTime,
      date: mainAppointmentDate,
    },
    ...EMAIL_CONTENTS.APPOINTMENT_APPROVAL_CUSTOMER,
  };
  const doctorMailPayload = {
    to: doctor.email,
    data: {
      startTime: mainAppointment.selectedTimeSlot.startTime,
      endTime: mainAppointment.selectedTimeSlot.endTime,
      date: mainAppointment.appointmentDate,
    },
    ...EMAIL_CONTENTS.APPOINTMENT_APPROVAL_DOCTOR,
  };

  await Promise.allSettled([
    req.sendMail(customerMailPayload),
    req.sendMail(doctorMailPayload),
    req.sendWhatsappMessage(
      mainAppointment.customer?.phone,
      WHATSAPP_TEMPLATES.CUSTOMER_APPOINTMENT_APPROVAL_CUSTOMER,
      JSON.stringify(messageData)
    ),
  ]);

  return reply.send({
    message: successMessage.DOCTOR_CONSULTATION_APPROVED,
  });
};

export const getAppointmentsByCustomerId = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.VIEW_ALL, SUBJECTS.Appointment);
  const customer = await customerModel.findById({ _id: req.user._id });
  if (!customer) {
    return reply.notFound(errorMessage.USER_NOT_FOUND);
  }
  const appointment = await appointmentModel.aggregate(
    getUserAppointmentsByUserId({
      $match: {
        customer: ObjectId(req.user._id),
        payment: isExistData,
      },
    })
  );

  return reply.send(appointment);
};

export const getCustomerCompletedAppointments = async (
  req: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.VIEW_ALL, SUBJECTS.Appointment);
  if (!isObjectId(req.params.id)) {
    return reply.notFound(errorMessage.NOT_A_VALID_OBJECT_ID);
  }
  const customer = await customerModel.findById({ _id: req.params.id });
  if (!customer) {
    return reply.notFound(errorMessage.USER_NOT_FOUND);
  }
  const appointment = await appointmentModel.aggregate(
    getUserAppointmentsByUserId({
      $match: {
        customer: ObjectId(customer._id),
        status: CUSTOMER_CONSULTATION_STATUS.COMPLETED,
        payment: { $exists: true, $ne: null },
      },
    })
  );

  return reply.send(appointment);
};

export const addAvailability = async (
  req: FastifyRequest<{ Body: { availability: [] } }>,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.CREATE, SUBJECTS.AppointmentAvailability);
  const doctor = await gpPartnerModel.findOne({
    _id: req.user._id,
    adminApprovalStatus: APPROVAL_STATUS.APPROVED,
  });
  if (!doctor) {
    return reply.notFound(errorMessage.DOCTOR_NOT_FOUND);
  }
  if (doctor.language.length <= 0) {
    return reply.notFound(errorMessage.LANGUAGE_IS_REQUIRED);
  }
  const newTimeSlots = req.body.availability.filter(
    (t: { _id: string }) => t._id === undefined || t._id === null
  );
  const splitTime = splitTimeTo20Mins(newTimeSlots, req.user._id);
  await doctorAvailabilityModel.insertMany(splitTime);

  return reply.send({ message: successMessage.DOCTOR_AVAILABILITY_ADDED });
};

export const getAvailableDoctorsTimeSlotForBooking = async (
  req: FastifyRequest<{ Querystring: { date: string; language: string } }>,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.VIEW_ALL, SUBJECTS.AppointmentAvailability);

  if (req.user.userRole !== ROLES.SUPER_ADMIN) {
    const customer = await customerModel.findById(req.user._id);
    if (!customer) return reply.notFound(errorMessage.CUSTOMER_NOT_FOUND);
  }

  const filterableDate =
    req.query.date.length === 10 ? req.query.date : req.query.date.slice(0, 10);

  const availableSlots = await doctorAvailabilityModel.aggregate(
    getDoctorsAvailabilityTimeSlot(filterableDate, req.query.language)
  );

  return reply.send(availableSlots);
};

export const getDoctorTimeSlot = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.VIEW_ALL, SUBJECTS.AppointmentAvailability);
  const timeSLot = await doctorAvailabilityModel.find({ doctor: req.user._id });
  reply.send(timeSLot);
};

export const getCustomerAppointmentsByDoctorAvailability = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.VIEW_ALL, SUBJECTS.Appointment);
  const doctor = await gpPartnerModel.findById({ _id: req.user._id });
  if (!doctor) {
    return reply.notFound(errorMessage.DOCTOR_NOT_FOUND);
  }
  const appointment = await appointmentModel.aggregate(
    getAppointments(doctor._id, doctor.language)
  );
  reply.send(appointment);
};

export const getCustomerAppointment = async (
  req: FastifyRequest<{ Params: { appointmentId: string } }>,
  reply: FastifyReply
) => {
  let appointment = await appointmentModel
    .findById({ _id: req.params.appointmentId })
    .populate(populatedAppointmentData);

  if (!appointment) {
    appointment = await followupAppointmentModel
      .findById({ _id: req.params.appointmentId })
      .populate(populatedAppointmentData);
  }
  if (!appointment) {
    return reply.send({});
  }
  if (appointment) {
    await redirectionModel.deleteOne({ _id: appointment.redirection });
  }
  return reply.send(appointment);
};

export const appointmentValidationCheck = async (
  req: FastifyRequest<{
    Params: { appointmentId: string };
  }>,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.CREATE, SUBJECTS.AppointmentPrescription);
  if (!req.params.appointmentId) {
    return reply.notFound(errorMessage.APPOINTMENT_ID_NOT_FOUND);
  }
  let isFollowupAppointment = false;
  let appointment = await appointmentModel
    .findById({
      _id: req.params.appointmentId,
      doctor: req.user._id,
    })
    .populate(populatedAppointmentData);
  if (!appointment) {
    isFollowupAppointment = true;
    appointment = await followupAppointmentModel
      .findById({
        _id: req.params.appointmentId,
        doctor: req.user._id,
      })
      .populate(populatedAppointmentData);
  }
  if (!appointment._id) {
    return reply.notFound(errorMessage.APPOINTMENT_DETAIL_NOT_FOUND);
  }

  req.appointment = appointment;
  req.isFollowupAppointment = isFollowupAppointment;
  if (sliceDate(req.appointment.appointmentDate) > sliceDate()) {
    return reply.badRequest(errorMessage.APPOINTMENT_DATE_NOT_EXCEEDED);
  }
};

export const addAppointmentPrescription = async (
  req: FastifyRequest<{
    Params: { appointmentId: string };
    Body: AddPrescriptionSchema;
  }>,
  reply: FastifyReply
) => {
  const doctor = req.appointment.approvedDoctor as unknown as ServiceProvider;
  const customer = req.appointment.customer as unknown as Customer;
  const medicine = await medicineModel.create({
    doctor: doctor._id,
    appointment: req.appointment._id,
    customer: customer._id,
    symptoms: req.body.symptoms,
    comorbidities: req.body.comorbidities,
    diagnosis: req.body.diagnosis,
    allergies: req.body.allergies,
    weight: req.body.weight,
    height: req.body.height,
    bloodPressure: req.body.bloodPressure,
    temperature: req.body.temperature,
    heartRate: req.body.heartRate,
    spO2: req.body.spO2,
    cbg: req.body.cbg,
    medicalHistory: req.body.medicalHistory,
    virtualAssessment: req.body.virtualAssessment,
    advice: req.body.advice,
    followupDate: req.body.followupDate,
    medicine: req.body.medicine,
  });

  await appointmentPrescriptionModel.findOneAndUpdate(
    { appointment: req.appointment._id },
    { medicine: medicine._id, followUpAppointmentDate: req.body.followupDate },
    dbOptions
  );

  return reply.send({
    message: successMessage.CONSULTATION_MEDICINE_ADDED,
    medicine,
  });
};

export const addAppointmentReferral = async (
  req: FastifyRequest<{
    Params: { appointmentId: string };
    Body: ReferralSchema;
  }>,
  reply: FastifyReply
) => {
  const doctor = req.appointment.approvedDoctor as unknown as ServiceProvider;

  const fieldUpdates = {
    $set: {
      referral: {
        complaint: req.body.complaint,
        findings: req.body.findings,
        investigation: req.body.investigation,
        management: req.body.management,
        doctor: doctor._id,
      },
    },
  };
  await appointmentPrescriptionModel.findOneAndUpdate(
    { appointment: req.appointment._id },
    fieldUpdates,
    dbOptions
  );

  return reply.send({ message: successMessage.CONSULTATION_REFERRAL_ADDED });
};

export const addAppointmentTest = async (
  req: FastifyRequest<{
    Params: { appointmentId: string };
    Body: { name: string; description: string };
  }>,
  reply: FastifyReply
) => {
  if (!req.body.name || !req.body.description!) {
    return reply.notFound(errorMessage.ADD_APPOINTMENT_TEST_ERROR);
  }
  const fieldUpdates = {
    $set: {
      followupTest: {
        name: req.body.name,
        description: req.body.description,
      },
    },
  };
  await appointmentPrescriptionModel.findOneAndUpdate(
    { appointment: req.appointment._id },
    fieldUpdates,
    dbOptions
  );

  return reply.send({ message: successMessage.CONSULTATION_TEST_ADDED });
};

export const getAppointmentPrescription = async (
  req: FastifyRequest<{
    Params: { appointmentId: string };
  }>,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.VIEW, SUBJECTS.AppointmentPrescription);
  let appointment = await appointmentModel
    .findById({
      _id: req.params.appointmentId,
      status: DOCTOR_CONSULTATION_DONE,
    })
    .populate(populatedAppointmentData);
  if (!appointment) {
    appointment = await followupAppointmentModel
      .findById({
        _id: req.params.appointmentId,
        status: DOCTOR_CONSULTATION_DONE,
      })
      .populate(populatedAppointmentData);
  }
  if (!appointment._id) {
    return reply.notFound(errorMessage.APPOINTMENT_DETAIL_NOT_FOUND);
  }
  req.requireAccess(ACTIONS.VIEW, SUBJECTS.AppointmentPrescription);

  const getMedicine = await appointmentPrescriptionModel
    .findOne({ appointment: appointment._id })
    .populate([
      {
        path: "medicine",
        populate: {
          path: "payment",
          model: "Payment",
        },
      },
      "appointment",
      "referral.doctor",
    ]);

  const payloadData = {
    appointment: appointment,
    createdAt: getMedicine?.createdAt,
    followUpAppointmentDate: getMedicine?.followUpAppointmentDate,
    followupTest: {
      name: getMedicine?.followupTest.name,
      description: getMedicine?.followupTest.description,
      testDetail: getMedicine?.followupTest?.testDetail,
    },
    medicine: getMedicine?.medicine,
    referral: getMedicine?.referral,
    status: getMedicine?.status,
    _id: getMedicine?._id,
    updatedAt: getMedicine?.updatedAt,
  };

  return reply.send(payloadData);
};

export const markAsConsultationCompleted = async (
  req: FastifyRequest<{
    Params: { appointmentId: string };
  }>,
  reply: FastifyReply
) => {
  const appointmentPrescription = await appointmentPrescriptionModel.findOne({
    appointment: req.appointment._id,
  });
  if (!appointmentPrescription?.medicine) {
    return reply.notAcceptable(errorMessage.DOCTOR_PRESCRIPTION_NOT_FOUND);
  }
  if (req.isFollowupAppointment) {
    await followupAppointmentModel.findByIdAndUpdate(
      { _id: req.appointment._id },
      { status: DOCTOR_CONSULTATION_DONE }
    );
  }
  await appointmentModel.findByIdAndUpdate(
    { _id: req.appointment._id },
    { status: DOCTOR_CONSULTATION_DONE }
  );
  return reply.send({ message: successMessage.DOCTOR_CONSULTATION_SUCCESS });
};

export const updateMedicinePrice = async (
  req: FastifyRequest<{
    Params: { appointmentId: string };
    Body: UpdateMedicinePriceSchema;
  }>,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.UPDATE, SUBJECTS.AppointmentPrescription);
  let appointment = await appointmentModel.findById({
    _id: req.params.appointmentId,
    status: DOCTOR_CONSULTATION_DONE,
  });
  if (!appointment) {
    appointment = await followupAppointmentModel.findById({
      _id: req.params.appointmentId,
      status: DOCTOR_CONSULTATION_DONE,
    });
  }

  if (!appointment._id) {
    return reply.notFound(errorMessage.APPOINTMENT_DETAIL_NOT_FOUND);
  }
  const medicine = await medicineModel.findById({ _id: req.body.medicineId });

  if (!medicine) {
    return reply.notFound(errorMessage.MEDICINE_DETAIL_NOT_FOUND);
  }

  const medicineDetail = {
    $set: {
      medicine: req.body.medicine,
      price: req.body.price,
      deliveryCharge: req.body.deliveryCharge,
      status: APPROVAL_STATUS.APPROVED,
    },
  };

  await medicineModel.findByIdAndUpdate({ _id: medicine._id }, medicineDetail);
  return reply.send({ message: successMessage.MEDICINE_PRICE_UPDATED });
};

export const appointmentValidationCheckByAdmin = async (
  req: FastifyRequest<{
    Params: { appointmentId: string };
  }>,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.UPDATE, SUBJECTS.AppointmentPrescription);
  let isFollowupAppointment = false;
  let appointment = await appointmentModel
    .findById({
      _id: req.params.appointmentId,
      status: DOCTOR_CONSULTATION_DONE,
    })
    .populate(populatedAppointmentData);
  if (!appointment) {
    isFollowupAppointment = true;
    appointment = await followupAppointmentModel
      .findById({
        _id: req.params.appointmentId,
        status: DOCTOR_CONSULTATION_DONE,
      })
      .populate(populatedAppointmentData);
  }
  if (!appointment._id) {
    return reply.notFound(errorMessage.APPOINTMENT_DETAIL_NOT_FOUND);
  }
  req.appointment = appointment;
  req.isFollowupAppointment = isFollowupAppointment;
  if (sliceDate(req.appointment.appointmentDate) > sliceDate()) {
    return reply.badRequest(errorMessage.APPOINTMENT_DATE_NOT_EXCEEDED);
  }
};

export const createCustomPackage = async (
  req: FastifyRequest<{
    Params: { appointmentId: string };
    Body: CreateCustomPackageSchema;
  }>,
  reply: FastifyReply
) => {
  const appointmentPrescription = await appointmentPrescriptionModel.findOne({
    appointment: req.appointment._id,
  });

  if (!appointmentPrescription.followupTest.name) {
    return reply.notFound(errorMessage.TEST_DETAIL_NOT_FOUND);
  }
  if (req.body.selectedPackage === CREATE_CUSTOM_PACKAGE) {
    const body = {
      name: req.body.name,
      appointment: req.appointment._id,
      description: req.body.description,
      type: req.body.type,
      members: req.body.members,
      serviceType: PACKAGE_TYPE.TEST,
      price: req.body.price,
      labShare: req.body.labShare,
      gpShare: req.body.gpShare,
      testCount: req.body.testCount,
      hspShare: req.body.hspShare,
      duration: req.body.duration,
      fastingHour: req.body.fastingHour,
      customerShare: req.body.customerShare,
      mobilabShare: req.body.mobilabShare,
      offerPrice: req.body.offerPrice,
      document: req.body.document?._id,
      image: req.body.image?._id,
    };
    const customPackage = await customPackagesModel.create(body);

    const field = {
      $set: {
        followupTest: {
          testDetail: customPackage,
          name: req.body.name,
          description: req.body.description,
        },
      },
    };
    await appointmentPrescriptionModel.findOneAndUpdate(
      { appointment: req.appointment._id },
      field,
      { new: true }
    );
  } else {
    if (!isObjectId(req.body.selectedPackage)) {
      return reply.notFound(errorMessage.SELECTED_PACKAGE_NOT_AN_OBJECT_ID);
    }
    const [packages]: any = await packageModel.aggregate([
      unionWith("customPackages"),
      ...lookupDataFromCollection("documentStorage", "document"),
      ...lookupDataFromCollection("documentStorage", "image"),
      {
        $match: {
          _id: ObjectId(req.body.selectedPackage),
        },
      },
    ]);

    if (!packages) {
      return reply.notFound(errorMessage.PLAN_NOT_FOUND);
    }
    const field = {
      $set: {
        followupTest: {
          testDetail: packages,
          name: req.body.packageName,
          description: req.body.packageDescription,
        },
      },
    };

    await appointmentPrescriptionModel.findOneAndUpdate(
      { appointment: req.appointment._id },
      field,
      { new: true }
    );
  }

  return reply.send({ message: successMessage.CUSTOM_TEST_PACKAGE_CREATE });
};

export const reviewAppointmentConsultation = async (
  req: FastifyRequest<{
    Params: { appointmentId: string };
  }>,
  reply: FastifyReply
) => {
  const prescription = await appointmentPrescriptionModel
    .findOne({ appointment: req.appointment._id })
    .populate(["medicine"]);
  let test;
  if (prescription.followupTest.name) {
    [test] = await packageModel.aggregate([
      unionWith("customPackages"),
      {
        $match: {
          _id: prescription?.followupTest?.testDetail?._id,
        },
      },
    ]);
  }
  if (
    prescription?.medicine?._id &&
    prescription?.medicine?.status !== APPROVAL_STATUS.APPROVED
  ) {
    return reply.notFound(errorMessage.APPROVE_MEDICINE);
  }
  if (prescription?.followupTest?.name && !test?._id) {
    return reply.notFound(errorMessage.CREATE_A_CUSTOM_PACKAGE);
  }

  const doctor = req.appointment.approvedDoctor as unknown as ServiceProvider;

  const customer = req.appointment.customer as unknown as Customer;
  const [
    { value: gpWallet },
    { value: userWallet },
    { value: adminWallet },
  ]: any = await Promise.allSettled([
    walletModel.findOne({
      userId: doctor._id,
      userRole: ROLES.GP_PARTNER,
    }),
    walletModel.findOne({
      userId: req.appointment.customer,
      userRole: ROLES.CUSTOMER,
    }),
    walletModel.findOne({ userRole: ROLES.SUPER_ADMIN }),
  ]);

  const packages = req.appointment.packages as unknown as Package;

  const gpWalletDetail = getUserWalletDetail(
    doctor._id,
    gpWallet,
    packages.gpShare || 0,
    ROLES.GP_PARTNER
  );

  const userWalletDetail = getUserWalletDetail(
    customer._id,
    userWallet,
    packages.customerShare,
    ROLES.CUSTOMER
  );

  const adminWalletDetail = getAdminWalletDetail(
    adminWallet,
    packages.mobilabShare
  );

  const walletHistory = [
    getWalletHistoryData(
      doctor._id,
      ROLES.GP_PARTNER,
      packages.gpShare || 0,
      gpWallet?.walletBalance,
      PACKAGE_TYPE.APPOINTMENT,
      req.appointment._id
    ),
    getWalletHistoryData(
      null,
      ROLES.SUPER_ADMIN,
      packages.mobilabShare,
      adminWallet?.walletBalance,
      PACKAGE_TYPE.APPOINTMENT,
      req.appointment._id
    ),
    getWalletHistoryData(
      customer._id,
      ROLES.CUSTOMER,
      packages.customerShare,
      userWallet?.walletBalance,
      PACKAGE_TYPE.APPOINTMENT,
      req.appointment._id
    ),
  ];

  await Promise.allSettled([
    walletModel.bulkWrite([
      getDbUpdateObject(
        { userId: doctor._id, userRole: ROLES.GP_PARTNER },
        gpWalletDetail
      ),
      getDbUpdateObject(
        { userId: customer._id, userRole: ROLES.CUSTOMER },
        userWalletDetail
      ),
      getDbUpdateObject({ userRole: ROLES.SUPER_ADMIN }, adminWalletDetail),
    ]),
    walletHistoryModel.insertMany(walletHistory),
  ]);

  const promises = [
    !req.isFollowupAppointment &&
      appointmentModel.findByIdAndUpdate(
        { _id: req.appointment._id },
        { status: COMPLETED }
      ),
    req.isFollowupAppointment &&
      followupAppointmentModel.findByIdAndUpdate(
        { _id: req.appointment._id },
        { status: COMPLETED }
      ),
    appointmentPrescriptionModel.findOneAndUpdate(
      { appointment: req.appointment._id },
      { status: ADMIN_APPROVED }
    ),
    req.sendWhatsappMessage(
      customer.phone,
      WHATSAPP_TEMPLATES.APPOINTMENT_ADMIN_APPROVAL_COMPLETED,
      JSON.stringify({
        cname: customer.name,
        link: `${FRONTEND_URL}/appointments/${req.appointment._id}`,
      })
    ),
  ];

  await Promise.allSettled(promises);
  const actualPrice =
    prescription.followupTest.price - prescription.followupTest.offerPrice;
  const followupTestDetail = {
    name: prescription.followupTest?.testDetail?.name,
    imageURL: prescription.followupTest?.testDetail?.image,
    serviceType: prescription.followupTest?.testDetail?.serviceType,
    offer: (actualPrice / prescription.followupTest?.price) * 100,
    options: [
      { type: prescription.followupTest?.testDetail?.type },
      { type: prescription.followupTest?.testDetail?.fastingHour },
      { type: prescription.followupTest?.testDetail?.duration },
    ],
  };
  const mailPayload = {
    to: customer.email as unknown as string,
    data: {
      name: customer?.name,
      medicineDetail:
        prescription?.medicine?.medicine?.length > 0
          ? JSON.parse(JSON.stringify(prescription?.medicine?.medicine))
          : undefined,
      followUpAppointmentDate: prescription?.followUpAppointmentDate,
      followupTestDetail: prescription?.followupTest?.testDetail?._id
        ? JSON.parse(JSON.stringify(followupTestDetail))
        : undefined,
      purchaseUrl: `${FRONTEND_URL}/appointments/${req.appointment._id}`,
      appointmentBookingUrl: `${FRONTEND_URL}/appointments/followup/${req.appointment._id}`,
    },
    ...EMAIL_CONTENTS.APPOINTMENT_COMPLETE_CUSTOMER,
  };
  await req.sendMail(mailPayload);

  return reply.send({ message: "Appointment prescription approved" });
};

export const getAppointmentCounts = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  let match: any = {
    status: CUSTOMER_CONSULTATION_STATUS.COMPLETED,
  };

  if (req.user.userRole === ROLES.CUSTOMER) {
    match.customer = req.user._id;
  }
  if (req.user.userRole === ROLES.GP_PARTNER) {
    match.approvedDoctor = req.user._id;
  }

  if (req.user.userRole === ROLES.SERVICE_PROVIDER) {
    return 0;
  }

  const result = await appointmentModel.aggregate(
    countByDateAndMonthAndYear("followupAppointments", {
      match,
    })
  );
  return reply.send(result[0]);
};

export const getAppointmentCountByUser = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const userId = req.user.userRole !== ROLES.SUPER_ADMIN && req.user._id;
  const result = await appointmentModel.aggregate(
    countByDateAndMonthAndYear("followupAppointments", userId)
  );
  return reply.send(result[0]);
};

export const getAllAppointmentBookings = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.VIEW_ALL, SUBJECTS.Appointment);

  const appointments = await appointmentModel.aggregate(
    getAllAppointmentDetails
  );

  return reply.send(appointments);
};

export const buyMedicine = async (
  req: FastifyRequest<{
    Params: { appId: string };
    Body: { medicineId: string };
  }>,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.BUY, SUBJECTS.AppointmentPrescription);

  if (!req.body.medicineId) {
    return reply.notFound(errorMessage.MEDICINE_ID_IS_REQUIRED);
  }
  const customer = await customerModel.findById({ _id: req.user._id });
  let appointment = await appointmentModel.findById({
    _id: req.params.appId,
  });
  if (!appointment) {
    appointment = await followupAppointmentModel.findById({
      _id: req.params.appId,
    });
  }
  if (!appointment) {
    return reply.notFound(errorMessage.APPOINTMENT_DETAIL_NOT_FOUND);
  }
  const medicine = await medicineModel.findById({ _id: req.body.medicineId });

  if (medicine?.medicine?.length <= 0) {
    return reply.notFound(errorMessage.CONSULTATION_MEDICINE_DETAIL_NOT_FOUND);
  }
  const metaData = {
    paymentUserId: `${customer._id}`,
    userName: `${req.user.name}`,
    userRole: ROLES.CUSTOMER,
    paymentType: PAYMENT_TYPE.MEDICINE_FEES,
    appointmentId: `${appointment._id}`,
    medicineId: `${medicine._id}`,
  };
  const planDetail = {
    feesName: "Medicine fees",
    feesDetail: `Appointment Medicine buy via Mobilab2u. Medicine price RM${medicine.price} and delivery charge RM${medicine.deliveryCharge}, total RM${medicine.price + medicine.deliveryCharge}`,
    price: medicine.price + medicine.deliveryCharge,
  };
  const session = await createPaymentLink(
    customer.email as string,
    metaData,
    planDetail,
    {
      message: successMessage.PAYMENT_SUCCESS_FOR_APPOINTMENT_MEDICINE,
      redirect: `/appointments/${appointment._id}`,
    }
  );
  return reply.send({ stripeURL: session.url });
};

export const getFollowupAppointmentTimeSlotByAppointmentId = async (
  req: FastifyRequest<{ Params: { appointmentId: string } }>,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.VIEW_ALL, SUBJECTS.AppointmentAvailability);
  let [appointment]: AggregatedAppointment[] = await appointmentModel.aggregate(
    getCompletedAppointmentDetails(req.params.appointmentId)
  );
  if (!appointment) {
    return reply.notFound(errorMessage.APPOINTMENT_DETAIL_NOT_FOUND);
  }
  const match = {
    date: appointment.prescription.followUpAppointmentDate,
    doctor: appointment.approvedDoctor._id,
    isBooked: false,
  };

  const doctorAvailability = await doctorAvailabilityModel.aggregate(
    getFollowupTimeSlots(match)
  );

  return reply.send({ appointment, doctorAvailability });
};

export const getAppointmentApprovedDoctorTimeSlotByAppointmentId = async (
  req: FastifyRequest<{
    Params: { appointmentId: string };
    Querystring: { date: string };
  }>,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.VIEW_ALL, SUBJECTS.AppointmentAvailability);
  let [appointment]: AggregatedAppointment[] = await appointmentModel.aggregate(
    [
      unionWith("followupAppointments"),
      {
        $match: {
          _id: ObjectId(req.params.appointmentId),
        },
      },
      ...lookupDataFromCollection("customers", "customer"),
      ...lookupDataFromCollection("payments", "payment"),
    ]
  );
  if (!appointment) {
    return reply.notFound(errorMessage.APPOINTMENT_DETAIL_NOT_FOUND);
  }
  const currentDate = sliceDate();
  let doctorAvailability;
  if (appointment.status === APPROVED) {
    const doctor = await gpPartnerModel.findById(appointment.approvedDoctor);
    const match = {
      formattedDate: req.query.date || currentDate,
      doctor: doctor._id,
      isBooked: false,
    };
    doctorAvailability = await doctorAvailabilityModel.aggregate(
      getFollowupTimeSlots(match)
    );
  } else {
    doctorAvailability = await doctorAvailabilityModel.aggregate(
      getDoctorsAvailabilityTimeSlot(
        req.query.date || currentDate,
        appointment.doctorLanguage
      )
    );
  }

  return reply.send({ appointment, doctorAvailability });
};

export const bookFollowupDoctorFollowupAppointmentValidationCheck = async (
  req: FastifyRequest<{ Body: BookFollowupAppointmentSchema }>,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.CREATE, SUBJECTS.Appointment);
  const customer = await customerModel.findById({ _id: req.user._id });
  if (!customer) {
    return reply.notFound(errorMessage.CUSTOMER_NOT_FOUND);
  }

  const [appointment]: AggregatedAppointment[] =
    await appointmentModel.aggregate(
      getCompletedAppointmentDetails(req.body.appointmentId)
    );
  if (!appointment._id) {
    return reply.notFound(errorMessage.APPOINTMENT_DETAIL_NOT_FOUND);
  }

  const [existingAppointment] = await appointmentModel.aggregate(
    getExistingAppointments(
      req.body.startTime,
      req.body.endTime,
      appointment.prescription.followUpAppointmentDate,
      req.user._id
    )
  );

  if (existingAppointment?._id) {
    return reply.conflict(errorMessage.USER_APPOINTMENT_ALREADY_EXIST);
  }

  const filterData = {
    date: appointment.prescription.followUpAppointmentDate,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    isBooked: false,
    _id: ObjectId(req.body.slotId),
    doctor: appointment.approvedDoctor._id,
  };
  const [followupDoctorAvailability] = await doctorAvailabilityModel.aggregate(
    getFollowupTimeSlots(filterData)
  );
  if (!followupDoctorAvailability) {
    return reply.notFound(errorMessage.DOCTOR_AVAILABILITY_NOT_FOUND);
  }
  const currentDate = sliceDate();
  const followupDate = sliceDate(
    appointment.prescription.followUpAppointmentDate
  );
  if (currentDate >= followupDate) {
    return reply.badRequest(errorMessage.APPOINTMENT_DATE_EXPIRED);
  }
  const { totalMinutes } = getTimeDiff(
    followupDoctorAvailability.startTime,
    getCurrentTime(NODE_ENV)
  );
  if (currentDate >= followupDate && totalMinutes <= 0) {
    return reply.notAcceptable(errorMessage.TIME_SLOT_EXPIRED);
  }
  const packages = await packageModel.findOne({
    serviceType: PACKAGE_TYPE.APPOINTMENT,
  });

  if (!packages) {
    return reply.notFound(errorMessage.PLAN_NOT_FOUND);
  }
};

export const bookFollowupDoctorFollowupAppointment = async (
  req: FastifyRequest<{ Body: BookFollowupAppointmentSchema }>,
  reply: FastifyReply
) => {
  const customer = await customerModel.findById({ _id: req.user._id });

  const packages = await packageModel.findOne({
    serviceType: PACKAGE_TYPE.APPOINTMENT,
  });
  const redirection = await redirectionModel.create({
    name: PAYMENT_TYPE.APPOINTMENT_FEES,
  });

  let [appointment]: AggregatedAppointment[] = await appointmentModel.aggregate(
    getCompletedAppointmentDetails(req.body.appointmentId)
  );
  const medicalRecords = [];
  if (req.body.documentOne) {
    medicalRecords.push({
      document: req.body.documentOne._id,
      name: req.body.nameOne,
    });
  }
  if (req.body.documentTwo) {
    medicalRecords.push({
      document: req.body.documentTwo._id,
      name: req.body.nameTwo,
    });
  }
  if (req.body.documentThree) {
    medicalRecords.push({
      document: req.body.documentThree._id,
      name: req.body.nameThree,
    });
  }
  const filterData = {
    date: appointment.prescription.followUpAppointmentDate,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    isBooked: false,
    _id: ObjectId(req.body.slotId),
    doctor: appointment.approvedDoctor._id,
  };
  const [followupDoctorAvailability] = await doctorAvailabilityModel.aggregate(
    getFollowupTimeSlots(filterData)
  );
  const metaData: any = {
    redirection: `${redirection._id}`,
    paymentUserId: `${req.user._id}`,
    planId: `${packages._id}`,
    serviceType: packages.serviceType,
    userName: `${req.user.name}`,
    userRole: ROLES.CUSTOMER,
    appointmentId: `${appointment._id}`,
    timeSlotId: `${followupDoctorAvailability.slotId}`,
    paymentType: PAYMENT_TYPE.FOLLOWUP_DOCTOR_FOLLOWUP_APPOINTMENT_FEES,
  };
  if (medicalRecords.length > 0) {
    metaData.medicalRecords = JSON.stringify(medicalRecords);
  }
  const planDetail = {
    feesName: packages.name,
    feesDetail: packages.description,
    price: packages.offerPrice,
  };
  const session = await createPaymentLink(
    customer.email as string,
    metaData,
    planDetail,
    {
      message: successMessage.PAYMENT_SUCCESS_FOR_DOCTOR_APPOINTMENT,
      redirect: "/appointments",
      redirectLatest: redirection._id,
      redirectType: PACKAGE_TYPE.APPOINTMENT,
    }
  );
  return reply.send({ stripeURL: session.url });
};

export const bookRandomDoctorFollowupAppointmentValidationCheck = async (
  req: FastifyRequest<{ Body: BookFollowupAppointmentSchema }>,
  reply: FastifyReply
) => {
  const customer = await customerModel.findById({ _id: req.user._id });
  if (!customer) {
    return reply.notFound(errorMessage.CUSTOMER_NOT_FOUND);
  }

  let [appointment]: AggregatedAppointment[] = await appointmentModel.aggregate(
    getCompletedAppointmentDetails(req.body.appointmentId)
  );

  if (!appointment._id) {
    return reply.notFound(errorMessage.APPOINTMENT_DETAIL_NOT_FOUND);
  }

  const [existingAppointment] = await appointmentModel.aggregate(
    getExistingAppointments(
      req.body.startTime,
      req.body.endTime,
      appointment.prescription.followUpAppointmentDate,
      req.user._id
    )
  );

  if (!!existingAppointment) {
    return reply.conflict(errorMessage.USER_APPOINTMENT_ALREADY_EXIST);
  }
  const modelFollowupDate =
    appointment.prescription.followUpAppointmentDate.toISOString();

  const filterableDate =
    modelFollowupDate.length === 10
      ? modelFollowupDate
      : modelFollowupDate.slice(0, 10);

  const [randomDoctorAvailability] = await doctorAvailabilityModel.aggregate(
    getDoctorsAvailabilityTimeSlotByDetail(
      {
        formattedDate: filterableDate,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
      },
      req.body.doctorLanguage as string
    )
  );
  if (!randomDoctorAvailability) {
    return reply.notFound(errorMessage.DOCTOR_AVAILABILITY_NOT_FOUND);
  }
  const currentDate = sliceDate();
  const followupDate = sliceDate(filterableDate);
  if (currentDate >= followupDate) {
    return reply.badRequest(errorMessage.APPOINTMENT_DATE_EXPIRED);
  }
  const { totalMinutes } = getTimeDiff(
    randomDoctorAvailability.startTime,
    getCurrentTime(NODE_ENV)
  );
  if (currentDate >= followupDate && totalMinutes <= 0) {
    return reply.notAcceptable(errorMessage.TIME_SLOT_EXPIRED);
  }
  const packages = await packageModel.findOne({
    serviceType: PACKAGE_TYPE.APPOINTMENT,
  });
  if (!packages) {
    return reply.notFound(errorMessage.PLAN_NOT_FOUND);
  }
};

export const bookRandomDoctorFollowupAppointment = async (
  req: FastifyRequest<{ Body: BookFollowupAppointmentSchema }>,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.CREATE, SUBJECTS.Appointment);
  const customer = await customerModel.findById({ _id: req.user._id });
  const packages = await packageModel.findOne({
    serviceType: PACKAGE_TYPE.APPOINTMENT,
  });
  let [appointment]: AggregatedAppointment[] = await appointmentModel.aggregate(
    getCompletedAppointmentDetails(req.body.appointmentId)
  );
  const redirection = await redirectionModel.create({
    name: PAYMENT_TYPE.APPOINTMENT_FEES,
  });
  const modelFollowupDate =
    appointment.prescription.followUpAppointmentDate.toISOString();

  const filterableDate =
    modelFollowupDate.length === 10
      ? modelFollowupDate
      : modelFollowupDate.slice(0, 10);

  const [randomDoctorAvailability] = await doctorAvailabilityModel.aggregate(
    getDoctorsAvailabilityTimeSlotByDetail(
      {
        formattedDate: filterableDate,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
      },
      req.body.doctorLanguage as string
    )
  );
  const medicalRecords = [];
  if (req.body.documentOne) {
    medicalRecords.push({
      document: req.body.documentOne._id,
      name: req.body.nameOne,
    });
  }
  if (req.body.documentTwo) {
    medicalRecords.push({
      document: req.body.documentTwo._id,
      name: req.body.nameTwo,
    });
  }
  if (req.body.documentThree) {
    medicalRecords.push({
      document: req.body.documentThree._id,
      name: req.body.nameThree,
    });
  }

  const metaData: any = {
    redirection: `${redirection._id}`,
    paymentUserId: `${customer._id}`,
    planId: `${packages._id}`,
    serviceType: packages.serviceType,
    userName: `${customer.name}`,
    userRole: ROLES.CUSTOMER,
    appointmentId: `${appointment._id}`,
    timeSlotId: `${randomDoctorAvailability?.slotId}`,
    paymentType: PAYMENT_TYPE.RANDOM_DOCTOR_FOLLOWUP_APPOINTMENT_FEES,
  };
  if (medicalRecords.length > 0) {
    metaData.medicalRecords = JSON.stringify(medicalRecords);
  }
  const planDetail = {
    feesName: packages.name,
    feesDetail: packages.description,
    price: packages.offerPrice,
  };
  const session = await createPaymentLink(
    customer.email as string,
    metaData,
    planDetail,
    {
      message: successMessage.PAYMENT_SUCCESS_FOR_DOCTOR_APPOINTMENT,
      redirect: "/appointments",
      redirectLatest: redirection._id,
      redirectType: PACKAGE_TYPE.APPOINTMENT,
    }
  );
  return reply.send({ stripeURL: session.url });
};

export const getPurchasedMedicines = async (
  req: FastifyRequest<{ Body: BookFollowupAppointmentSchema }>,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.VIEW_ALL, SUBJECTS.Medicine);
  const medicines = await medicineModel.aggregate(getPurchasedMedicinesQuery);
  return reply.send(medicines);
};

export const getAppointmentByRedirectionId = async (
  req: FastifyRequest<{ Params: { redirectId: string } }>,
  reply: FastifyReply
) => {
  if (!req.params.redirectId) {
    return reply.notFound(errorMessage.REDIRECT_ID_NOT_FOUND);
  }
  const [appointment] = await appointmentModel.aggregate([
    unionWith("followupAppointments"),
    {
      $match: {
        redirection: ObjectId(req.params.redirectId),
      },
    },
  ]);

  return reply.send(appointment);
};

export const customerAppointmentFeesSuccess = async (
  metadata: MetaData,
  payment: { _id: string }
) => {
  const dbData = JSON.parse(metadata.dbData);
  const [packages] = await packageModel.aggregate(
    getPackageDetail(metadata.planId)
  );
  delete packages.document;
  delete packages.image;
  const appointmentPayload = {
    appointmentDate: dbData.appointmentDate,
    doctorLanguage: dbData.doctorLanguage,
    selectedTimeSlot: dbData.timeSlot,
    packages: packages,
    type: APPOINTMENT_TYPE.NORMAL_APPOINTMENT,
    customer: metadata.paymentUserId,
    payment: payment._id,
    redirection: dbData.redirection,
    medicalRecords: [],
  };
  if (dbData.medicalRecords?.length > 0) {
    appointmentPayload.medicalRecords = dbData.medicalRecords;
  }
  const createdAppointment = await appointmentModel.create(appointmentPayload);
  const filterableDate =
    createdAppointment.appointmentDate.length === 10
      ? createdAppointment.appointmentDate
      : sliceDate(createdAppointment.appointmentDate);
  const availability = await doctorAvailabilityModel.aggregate(
    getDoctorAvailabilityForQueueing(
      {
        formattedDate: filterableDate,
        startTime: createdAppointment.selectedTimeSlot.startTime,
        endTime: createdAppointment.selectedTimeSlot.endTime,
        isBooked: false,
      },
      createdAppointment.doctorLanguage
    )
  );
  const adminPayload = {
    customerName: createdAppointment.customer.name,
    date: sliceDate(createdAppointment.appointmentDate),
    time: createdAppointment.selectedTimeSlot.startTime,
    orderId: payment._id,
    link: `${FRONTEND_URL}/appointments?appointmentId=${createdAppointment._id}`,
  };
  await sendMail({
    to: ADMIN_INFO_EMAIL,
    ...EMAIL_CONTENTS.APPOINTMENT_ADDED_ADMIN,
    data: adminPayload,
  });
  if (
    NODE_ENV !== "local" &&
    Array.isArray(availability) &&
    availability.length > 0
  ) {
    await Promise.allSettled(
      availability.map((av: any) =>
        remainderPub.add({
          queue: QUEUE_OPTIONS.EMAIL,
          to: av.doctor.email,
          data: {
            name: av.doctor.name,
            text: `Consultation appointment added for ${sliceDate(av?.date)} date, please approve the consultation`,
            date: sliceDate(av.date),
            sTime: av.startTime,
            eTime: av.endTime,
            appURL: `${FRONTEND_URL}/appointments?appointmentId=${createdAppointment._id}`,
          },
          ...EMAIL_CONTENTS.APPOINTMENT_ADDED_GP,
        })
      )
    );
  }
};

export const customerFollowupDoctorAppointmentSuccess = async (
  metadata: {
    appointmentId: string;
    timeSlotId: string;
    planId: string;
    paymentUserId: string;
    redirection: string;
    medicalRecords: string;
  },
  payment: { _id: string }
) => {
  let [appointment]: AggregatedAppointment[] = await appointmentModel.aggregate(
    getCompletedAppointmentDetails(metadata.appointmentId)
  );
  const [packages] = await packageModel.aggregate(
    getPackageDetail(metadata.planId)
  );
  delete packages.document;
  delete packages.image;
  const doctorAvailability = await doctorAvailabilityModel.findById({
    _id: metadata.timeSlotId,
    isBooked: false,
  });
  await appointmentPrescriptionModel.findOneAndUpdate(
    { appointment: appointment._id },
    { isFollowupAppointmentBooked: true }
  );
  const appointmentPayload = {
    appointmentDate: appointment.prescription.followUpAppointmentDate,
    appointment: appointment.appointment || appointment._id,
    doctorLanguage: appointment.approvedDoctor.language,
    type: APPOINTMENT_TYPE.FOLLOWUP_DOCTOR_FOLLOWUP_APPOINTMENT,
    selectedTimeSlot: {
      startTime: doctorAvailability.startTime,
      endTime: doctorAvailability.endTime,
    },
    redirection: metadata.redirection,
    status: CUSTOMER_CONSULTATION_STATUS.PENDING,
    packages: packages,
    customer: metadata.paymentUserId,
    payment: payment._id,
    isBooked: false,
    approvedDoctor: appointment.approvedDoctor._id,
    medicalRecords: [],
  };
  if (metadata?.medicalRecords?.length > 0) {
    appointmentPayload.medicalRecords = JSON.parse(metadata.medicalRecords);
  }

  const createdAppointment =
    await followupAppointmentModel.create(appointmentPayload);
  const mailPayload = {
    to: appointment?.approvedDoctor.email,
    data: {
      name: appointment?.approvedDoctor.name,
      text: `Follow appointment consultation added for ${sliceDate(doctorAvailability?.date)} date, please approve the consultation`,
      date: sliceDate(doctorAvailability?.date),
      sTime: doctorAvailability.startTime,
      eTime: doctorAvailability.endTime,
      appURL: `${FRONTEND_URL}/appointments?appointmentId=${createdAppointment._id}`,
    },
    ...EMAIL_CONTENTS.CUSTOMER_FOLLOW_UP_APPOINTMENT_SUCCESS_DOCTOR,
  };
  await sendMail(mailPayload);
  const adminPayload = {
    customerName: createdAppointment.customer.name,
    date: sliceDate(createdAppointment.appointmentDate),
    time: createdAppointment.selectedTimeSlot.startTime,
    orderId: payment._id,
    link: `${FRONTEND_URL}/appointments?appointmentId=${createdAppointment._id}`,
  };
  await sendMail({
    to: ADMIN_INFO_EMAIL,
    ...EMAIL_CONTENTS.APPOINTMENT_ADDED_ADMIN,
    data: adminPayload,
  });
};

export const customerRandomDoctorFollowupAppointmentSuccess = async (
  metadata: {
    appointmentId: string;
    timeSlotId: string;
    planId: string;
    paymentUserId: string;
    redirection: string;
    medicalRecords: [];
  },
  payment: { _id: string }
) => {
  let [appointment]: AggregatedAppointment[] = await appointmentModel.aggregate(
    getCompletedAppointmentDetails(metadata.appointmentId)
  );
  const [packages] = await packageModel.aggregate(
    getPackageDetail(metadata.planId)
  );
  delete packages.document;
  delete packages.image;
  const doctorAvailability = await doctorAvailabilityModel
    .findById({
      _id: metadata.timeSlotId,
    })
    .populate("doctor");

  const appointmentPayload: any = {
    appointmentDate: appointment.prescription.followUpAppointmentDate,
    appointment: appointment.appointment || appointment._id,
    doctorLanguage: doctorAvailability.doctor.language,
    type: APPOINTMENT_TYPE.RANDOM_DOCTOR_FOLLOWUP_APPOINTMENT,
    selectedTimeSlot: {
      startTime: doctorAvailability.startTime,
      endTime: doctorAvailability.endTime,
    },
    redirection: metadata.redirection,
    status: CUSTOMER_CONSULTATION_STATUS.PENDING,
    packages: packages,
    customer: metadata.paymentUserId,
    payment: payment._id,
    isBooked: false,
    medicalRecords: [],
  };
  if (metadata?.medicalRecords?.length) {
    appointmentPayload.medicalRecords = metadata.medicalRecords;
  }

  const createdAppointment =
    await followupAppointmentModel.create(appointmentPayload);
  await appointmentPrescriptionModel.findOneAndUpdate(
    { appointment: appointment._id },
    { isFollowupAppointmentBooked: true }
  );
  const randomDoctorAvailability = await doctorAvailabilityModel.aggregate(
    getDoctorAvailabilityForQueueing(
      {
        formattedDate: doctorAvailability.date,
        startTime: doctorAvailability.startTime,
        endTime: doctorAvailability.endTime,
        isBooked: false,
      },
      createdAppointment.doctorLanguage
    )
  );
  const adminPayload = {
    customerName: createdAppointment.customer.name,
    date: sliceDate(createdAppointment.appointmentDate),
    time: createdAppointment.selectedTimeSlot.startTime,
    orderId: payment._id,
    link: `${FRONTEND_URL}/appointments?appointmentId=${createdAppointment._id}`,
  };
  await sendMail({
    to: ADMIN_INFO_EMAIL,
    ...EMAIL_CONTENTS.APPOINTMENT_ADDED_ADMIN,
    data: adminPayload,
  });
  if (
    NODE_ENV !== "local" &&
    Array.isArray(randomDoctorAvailability) &&
    randomDoctorAvailability.length > 0
  ) {
    await Promise.allSettled(
      randomDoctorAvailability.map((av: any) =>
        remainderPub.add({
          queue: QUEUE_OPTIONS.EMAIL,
          to: av.doctor.email,
          data: {
            name: av.doctor.name,
            text: `Follow appointment consultation added for ${doctorAvailability?.date?.toISOString().slice(0, 10)} date, please approve the consultation`,
            date: av.date.toISOString().slice(0, 10),
            sTime: av.startTime,
            eTime: av.endTime,
            appURL: `${FRONTEND_URL}/appointments?appointmentId=${createdAppointment._id}`,
          },
          ...EMAIL_CONTENTS.CUSTOMER_RANDOM_DOCTOR_FOLLOW_UP_SUCCESS_DOCTOR,
        })
      )
    );
  }
};

export const appointmentCancellation = async (
  req: FastifyRequest<{ Params: { appointmentId: string } }>,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.CANCELLATION, SUBJECTS.Appointment);
  let isFollowupAppointment;
  let appointment;
  if (!isObjectId(req.params.appointmentId)) {
    return reply.notFound(errorMessage.NOT_A_VALID_OBJECT_ID);
  }
  appointment = await appointmentModel
    .findById(req.params.appointmentId)
    .populate(["customer", "approvedDoctor"]);
  if (!appointment) {
    isFollowupAppointment = true;
    appointment = await followupAppointmentModel.findById(
      req.params.appointmentId
    );
  }

  if (!appointment) {
    return reply.notFound(errorMessage.APPOINTMENT_DETAIL_NOT_FOUND);
  }
  if (appointment.status === CANCELLED) {
    return reply.badRequest(errorMessage.APPOINTMENT_CANCELLED);
  }
  const userWallet = await walletModel.findOne({
    userId: appointment.customer,
    userRole: ROLES.CUSTOMER,
  });
  const userWalletDetail = getUserWalletDetail(
    appointment.customer,
    userWallet,
    appointment.packages.offerPrice,
    ROLES.CUSTOMER
  );

  const wallet = getWalletHistoryData(
    appointment.customer,
    ROLES.CUSTOMER,
    appointment.packages.offerPrice,
    userWallet?.walletBalance,
    PACKAGE_TYPE.APPOINTMENT_CANCELLATION,
    appointment._id
  );
  const emailPayload = {
    doctorName: appointment?.approvedDoctor?.name,
    customerName: appointment?.customer?.name,
    url: `${FRONTEND_URL}/appointments/${appointment._id}`,
  };

  await Promise.allSettled([
    req.sendMail({
      to: appointment?.approvedDoctor?.email,
      ...EMAIL_CONTENTS.APPOINTMENT_CANCELLATION_DOCTOR,
      data: emailPayload,
    }),
    req.sendMail({
      to: appointment?.customer?.email,
      ...EMAIL_CONTENTS.APPOINTMENT_CANCELLATION_CUSTOMER,
      data: emailPayload,
    }),
    doctorAvailabilityModel.findOneAndUpdate(
      { _id: appointment.selectedTimeSlot.slotId },
      { isBooked: false }
    ),
    walletModel.findOneAndUpdate(
      { userId: appointment.customer, userRole: ROLES.CUSTOMER },
      userWalletDetail,
      dbOptions
    ),
    walletHistoryModel.create(wallet),
    isFollowupAppointment &&
      followupAppointmentModel.findByIdAndUpdate(req.params.appointmentId, {
        status: CANCELLED,
      }),
    !isFollowupAppointment &&
      appointmentModel.findByIdAndUpdate(req.params.appointmentId, {
        status: CANCELLED,
      }),
  ]);
  return reply.send({
    message: successMessage.APPOINTMENT_CANCELLED,
  });
};

export const confirmAppointment = async (
  req: FastifyRequest<{ Params: { appointmentId: string } }>,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.CONFIRMATION, SUBJECTS.Appointment);
  if (!isObjectId(req.params.appointmentId)) {
    return reply.notFound(errorMessage.APPOINTMENT_ID_NOT_FOUND);
  }
  const doctor = await gpPartnerModel.findById(req.user._id);
  if (!doctor) {
    return reply.notFound(errorMessage.DOCTOR_NOT_FOUND);
  }
  let isFollowupAppointment = false;
  let appointment = await appointmentModel
    .findById({
      _id: req.params.appointmentId,
      approvedDoctor: doctor._id,
      status: APPROVED,
    })
    .populate(populatedAppointmentData);
  if (!appointment) {
    isFollowupAppointment = true;
    appointment = await followupAppointmentModel
      .findById({
        _id: req.params.appointmentId,
        status: APPROVED,
      })
      .populate(populatedAppointmentData);
  }
  if (!appointment._id) {
    return reply.notFound(errorMessage.APPOINTMENT_DETAIL_NOT_FOUND);
  }
  const currentDate = sliceDate();
  const appointmentDate = sliceDate(appointment.appointmentDate);
  if (currentDate > appointmentDate) {
    return reply.badRequest(errorMessage.APPOINTMENT_DATE_EXPIRED);
  }
  if (appointmentDate > currentDate) {
    return reply.notAcceptable(errorMessage.APPOINTMENT_DATE_NOT_EXCEEDED);
  }
  const currentTime = getCurrentTime(NODE_ENV);
  const { totalMinutes, hourDiff } = getTimeDiff(
    appointment.selectedTimeSlot.startTime,
    currentTime
  );

  if (currentDate === appointmentDate && totalMinutes > 60) {
    return reply.notAcceptable(errorMessage.APPOINTMENT_TIME_NOT_EXCEEDED);
  }

  if (appointmentDate === currentDate && totalMinutes > 60 && hourDiff !== -1) {
    return reply.notAcceptable(errorMessage.APPOINTMENT_TIME_NOT_EXCEEDED);
  }
  const timeSlot = {
    startTime: appointment.selectedTimeSlot.startTime,
    endTime: appointment.selectedTimeSlot.endTime,
    date: appointment.appointmentDate,
  };
  const data = [appointment.customer.email, doctor.email];

  const zoomMeeting = await generateZoomMeeting(timeSlot, data);

  const updateFields = {
    $set: {
      status: DOCTOR_CONFIRMED,
      meeting: {
        link: zoomMeeting.join_url,
        id: zoomMeeting.id,
        uuid: zoomMeeting.uuid,
        password: zoomMeeting.password,
        startLink: zoomMeeting.start_url,
      },
    },
  };
  if (isFollowupAppointment) {
    await followupAppointmentModel.findByIdAndUpdate(
      appointment._id,
      updateFields
    );
  } else {
    await appointmentModel.findByIdAndUpdate(appointment._id, updateFields);
  }
  const messageData = {
    cname: appointment.customer?.name,
    doctorname: doctor.name,
    date: `${appointmentDate}`,
    time: `${appointment.selectedTimeSlot?.startTime} - ${appointment.selectedTimeSlot.endTime}`,
    link: `${FRONTEND_URL}/appointments/${appointment._id}`,
    joinurl: `${zoomMeeting.join_url}`,
    meetingid: `${zoomMeeting.id}`,
    plabel: "Password",
    pvalue: `${zoomMeeting.password}`,
  };
  const customerMailPayload = {
    to: appointment?.customer?.email,
    data: {
      customerName: appointment.customer?.name,
      doctorName: doctor.name,
      startTime: appointment.selectedTimeSlot.startTime,
      endTime: appointment.selectedTimeSlot.endTime,
      date: appointmentDate,
      joinUrl: zoomMeeting.join_url,
      meetingId: zoomMeeting.id,
      password: zoomMeeting.password,
    },
    ...EMAIL_CONTENTS.APPOINTMENT_CONFIRMATION_CUSTOMER(doctor.name),
  };
  const doctorMailPayload = {
    to: doctor.email,
    data: {
      doctorName: doctor.name,
      startTime: appointment.selectedTimeSlot.startTime,
      endTime: appointment.selectedTimeSlot.endTime,
      date: appointmentDate,
      startUrl: zoomMeeting.start_url,
      meetingId: zoomMeeting.id,
      password: zoomMeeting.password,
    },
    ...EMAIL_CONTENTS.APPOINTMENT_CONFIRMATION_DOCTOR(
      sliceDate(appointment.appointmentDate)
    ),
  };

  await Promise.allSettled([
    req.sendMail(customerMailPayload),
    req.sendMail(doctorMailPayload),
    req.sendWhatsappMessage(
      appointment.customer?.phone,
      WHATSAPP_TEMPLATES.APPOINTMENT_CONFIRMATION_CUSTOMER,
      JSON.stringify(messageData)
    ),
  ]);

  return reply.send({ message: successMessage.APPOINTMENT_CONFIRMED });
};

export const appointmentTimeSlotReAllocation = async (
  req: FastifyRequest<{
    Params: { appointmentId: string };
    Body: {
      slotId: string;
      startTime: string;
      endTime: string;
      doctorId: string;
    };
  }>,
  reply: FastifyReply
) => {
  req.requireAccess(
    ACTIONS.TIME_SLOT_RE_ALLOCATION_ADMIN,
    SUBJECTS.Appointment
  );
  if (!isObjectId(req.params.appointmentId)) {
    return reply.notFound(errorMessage.APPOINTMENT_ID_NOT_FOUND);
  }
  const [appointment] = await appointmentModel.aggregate([
    unionWith("followupAppointments"),
    {
      $match: {
        _id: ObjectId(req.params.appointmentId),
      },
    },
    ...lookupDataFromCollection("customers", "customer"),
  ]);
  if (!appointment) {
    return reply.notFound(errorMessage.APPOINTMENT_DETAIL_NOT_FOUND);
  }

  const doctorAvailability = await doctorAvailabilityModel
    .findOne({
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      isBooked: false,
      doctor: req.body.doctorId,
    })
    .populate("doctor");

  const currentTime = getCurrentTime(NODE_ENV);
  const { totalMinutes, hourDiff } = getTimeDiff(
    doctorAvailability.startTime,
    currentTime
  );

  if (getDaysDifferenceFromToday(doctorAvailability.date, NODE_ENV) < 0) {
    return reply.notAcceptable(errorMessage.PLEASE_SELECT_FUTURE_DATE);
  }
  const currentDate = sliceDate();
  const doctorAvailabilityDate = sliceDate(doctorAvailability.date);

  if (currentDate >= doctorAvailabilityDate) {
    return reply.badRequest(errorMessage.APPOINTMENT_DATE_EXPIRED);
  }
  if (
    currentDate >= doctorAvailabilityDate &&
    hourDiff >= 0 &&
    totalMinutes < 60
  ) {
    return reply.notAcceptable(errorMessage.PLEASE_SELECT_FUTURE_TIME);
  }

  let status = APPROVED;
  if (currentDate === doctorAvailabilityDate && totalMinutes <= 60) {
    status = DOCTOR_CONFIRMED;
  }
  let meeting: any = {};
  if (status === DOCTOR_CONFIRMED) {
    const timeSlot = {
      startTime: doctorAvailability.startTime,
      endTime: doctorAvailability.endTime,
      date: doctorAvailability.date,
    };
    const data = [appointment.customer.email, doctorAvailability.doctor.email];
    const generatedMeeting = await generateZoomMeeting(timeSlot, data);
    meeting = {
      link: generatedMeeting.join_url,
      id: generatedMeeting.id,
      uuid: generatedMeeting.uuid,
      password: generatedMeeting.password,
      startLink: generatedMeeting.start_url,
    };
  }

  const updateFields = {
    $set: {
      approvedDoctor: doctorAvailability.doctor._id,
      assignedDoctors: [
        ...appointment.assignedDoctors,
        appointment.approvedDoctor,
      ],
      status: status,
      meeting,
      appointmentDate: doctorAvailability.date,
      doctorLanguage: doctorAvailability.doctor.language,
      selectedTimeSlot: {
        startTime: doctorAvailability.startTime,
        endTime: doctorAvailability.endTime,
        slotId: doctorAvailability.slotId,
      },
      selectedTimeSlots: [
        ...appointment.selectedTimeSlots,
        {
          ...appointment.selectedTimeSlot,
          date: appointment.appointmentDate,
        },
      ],
    },
  };
  await doctorAvailabilityModel.bulkWrite([
    getDbUpdateObject({ _id: doctorAvailability._id }, { isBooked: true }),
    getDbUpdateObject(
      { _id: appointment.selectedTimeSlot.slotId },
      { isBooked: false }
    ),
  ]);

  const payloads = {
    doctorName: doctorAvailability.doctor.name,
    customerName: appointment.customer.name,
    newDate: doctorAvailability.date,
    startTime: doctorAvailability.startTime,
    endTime: doctorAvailability.endTime,
    appointmentLink: `${FRONTEND_URL}/appointments/${appointment._id}`,
    text: "",
  };
  if (status === DOCTOR_CONFIRMED) {
    payloads.text = `
  <div class="meta">
        <p><strong>Meeting link:</strong> <a href="${meeting.link}" target="_blank" rel="noopener">${meeting.link}</a></p>
        <p><strong>Meeting ID:</strong> <span class="mono">${meeting.id}</span></p>
        <p><strong>Meeting password:</strong> <span class="mono">${meeting.password}</span></p>
  </div>
`;
  }
  const customerEmail = {
    to: appointment.customer.email,
    ...EMAIL_CONTENTS.ADMIN_APPOINTMENT_TIME_SLOT_RE_ALLOCATION_CUSTOMER,
    data: payloads,
  };

  const doctorEmail = {
    to: doctorAvailability.doctor.email,
    ...EMAIL_CONTENTS.ADMIN_APPOINTMENT_TIME_SLOT_RE_ALLOCATION_DOCTOR,
    data: payloads,
  };
  await Promise.allSettled([
    appointment.type === APPOINTMENT_TYPE.NORMAL_APPOINTMENT
      ? appointmentModel.findByIdAndUpdate(appointment._id, updateFields)
      : followupAppointmentModel.findByIdAndUpdate(
          appointment._id,
          updateFields
        ),
    req.sendMail(customerEmail),
    req.sendMail(doctorEmail),
  ]);

  return reply.send({
    message: successMessage.TIME_SLOT_RE_ALLOCATION_SUCCESS,
  });
};

export const customerAppointmentTimeSlotReAllocation = async (
  req: FastifyRequest<{
    Params: { appointmentId: string };
    Body: CustomerAppointmentTimeSlotReallocationSchema;
  }>,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.TIME_SLOT_RE_ALLOCATION, SUBJECTS.Appointment);

  const { appointmentId } = req.params;
  const { slotId, doctorLanguage } = req.body;

  if (!isObjectId(appointmentId)) {
    return reply.notFound(errorMessage.APPOINTMENT_ID_NOT_FOUND);
  }

  const [appointment] = await appointmentModel.aggregate([
    unionWith("followupAppointments"),
    {
      $match: {
        _id: ObjectId(appointmentId),
        status: {
          $in: [
            CUSTOMER_CONSULTATION_STATUS.APPROVED,
            CUSTOMER_CONSULTATION_STATUS.PENDING,
          ],
        },
      },
    },
    ...lookupDataFromCollection("gpPartners", "approvedDoctor"),
    ...lookupDataFromCollection("customers", "customer"),
  ]);

  if (!appointment) {
    return reply.notFound(errorMessage.APPOINTMENT_DETAIL_NOT_FOUND);
  }

  if (
    getHourDiffFromNow(
      appointment.appointmentDate,
      appointment.selectedTimeSlot.startTime,
      NODE_ENV
    ) < 48
  ) {
    return reply.notAcceptable(
      errorMessage.APPOINTMENT_RESCHEDULING_TIME_EXCEEDED
    );
  }

  if (appointment.customerAppointmentTimeSlotReAllocated) {
    return reply.notAcceptable(
      errorMessage.APPOINTMENT_TIME_SLOT_RE_ALLOCATION_ALREADY_DONE
    );
  }

  const getDoctorAvailability = async () => {
    if (appointment.status === APPROVED) {
      return await doctorAvailabilityModel.aggregate(
        getFollowupTimeSlots({
          doctor: appointment.approvedDoctor._id,
          _id: ObjectId(slotId),
        })
      );
    }
    return await doctorAvailabilityModel.aggregate(
      getDoctorsAvailabilityTimeSlotByDetail(
        {
          _id: ObjectId(slotId),
        },
        doctorLanguage
      )
    );
  };

  const [doctorAvailability] = await getDoctorAvailability();
  if (!doctorAvailability) {
    return reply.notFound(errorMessage.DOCTOR_AVAILABILITY_NOT_FOUND);
  }

  const baseSlot = {
    startTime: doctorAvailability.startTime,
    endTime: doctorAvailability.endTime,
  };

  const selectedTimeSlots = [
    ...appointment.selectedTimeSlots,
    {
      ...appointment.selectedTimeSlot,
      date: appointment.appointmentDate,
    },
  ];

  const baseUpdateFields = {
    customerAppointmentTimeSlotReAllocated: true,
    appointmentDate: doctorAvailability.date,
    selectedTimeSlots,
    doctorLanguage: doctorLanguage || appointment.doctorLanguage,
  };

  const updateFields = (() => {
    if (appointment.status === APPROVED) {
      return {
        $set: {
          ...baseUpdateFields,
          selectedTimeSlot: {
            ...baseSlot,
            slotId: doctorAvailability.slotId,
          },
          assignedDoctors: [
            ...appointment.assignedDoctors,
            appointment.approvedDoctor,
          ],
        },
      };
    }

    return {
      $set: {
        ...baseUpdateFields,
        selectedTimeSlot: baseSlot,
      },
    };
  })();

  if (appointment.status === APPROVED) {
    await doctorAvailabilityModel.bulkWrite([
      getDbUpdateObject({ _id: doctorAvailability.slotId }, { isBooked: true }),
      getDbUpdateObject(
        { _id: appointment.selectedTimeSlot.slotId },
        { isBooked: false }
      ),
    ]);
  }

  const emailBaseData = {
    _id: appointment._id,
    appointmentDate: doctorAvailability.date,
    customerName: appointment.customer.name,
    newDate: doctorAvailability.date,
    startTime: doctorAvailability.startTime,
    endTime: doctorAvailability.endTime,
    appointmentLink: `${FRONTEND_URL}/appointments/${appointment._id}`,
  };

  const doctorEmailBaseData = {
    ...emailBaseData,
    doctorName: appointment?.approvedDoctor?.name,
    appointmentLink: `${FRONTEND_URL}/appointments?appointmentId=${appointment._id}`,
  };

  const sendEmail = async (
    to: string,
    subject: string,
    template: string,
    data: any
  ) => {
    await req.sendMail({ to, subject, template, data });
  };

  if (appointment.status === APPROVED) {
    await sendEmail(
      appointment.customer.email,
      EMAIL_CONTENTS.CUSTOMER_APPOINTMENT_TIME_SLOT_RE_ALLOCATION_CUSTOMER
        .subject,
      EMAIL_CONTENTS.CUSTOMER_APPOINTMENT_TIME_SLOT_RE_ALLOCATION_CUSTOMER
        .template,
      { ...emailBaseData, doctorName: appointment.approvedDoctor.name }
    );
    await sendEmail(
      appointment.approvedDoctor.email,
      EMAIL_CONTENTS.CUSTOMER_APPOINTMENT_TIME_SLOT_RE_ALLOCATION_DOCTOR
        .subject,
      EMAIL_CONTENTS.CUSTOMER_APPOINTMENT_TIME_SLOT_RE_ALLOCATION_DOCTOR
        .template,
      { ...doctorEmailBaseData }
    );
  } else {
    const filterableDate =
      doctorEmailBaseData.appointmentDate.length === 10
        ? doctorEmailBaseData.appointmentDate
        : sliceDate(doctorEmailBaseData.appointmentDate);

    const availability = await doctorAvailabilityModel.aggregate(
      getDoctorAvailabilityForQueueing(
        {
          date: filterableDate,
          startTime: doctorEmailBaseData.startTime,
          endTime: doctorEmailBaseData.endTime,
          isBooked: false,
        },
        doctorLanguage
      )
    );

    if (Array.isArray(availability) && availability.length > 0) {
      await Promise.allSettled(
        availability.map((av: any) =>
          remainderPub.add({
            queue: QUEUE_OPTIONS.EMAIL,
            to: av.doctor.email,
            data: {
              name: av.doctor.name,
              text: `Consultation appointment added for ${av?.date?.toISOString().slice(0, 10)} date, please approve the consultation`,
              date: av.date,
              sTime: av.startTime,
              eTime: av.endTime,
              appURL: `${FRONTEND_URL}/appointments?appointmentId=${doctorEmailBaseData._id}`,
            },
            ...EMAIL_CONTENTS.PENDING_CUSTOMER_APPOINTMENT_TIME_SLOT_RE_ALLOCATION_DOCTOR,
          })
        )
      );
    }

    await sendEmail(
      appointment.customer.email,
      EMAIL_CONTENTS
        .PENDING_CUSTOMER_APPOINTMENT_TIME_SLOT_RE_ALLOCATION_CUSTOMER.subject,
      EMAIL_CONTENTS
        .PENDING_CUSTOMER_APPOINTMENT_TIME_SLOT_RE_ALLOCATION_CUSTOMER.template,
      emailBaseData
    );
  }

  const targetModel =
    appointment.type === APPOINTMENT_TYPE.NORMAL_APPOINTMENT
      ? appointmentModel
      : followupAppointmentModel;

  await targetModel.findByIdAndUpdate(appointment._id, updateFields);

  return reply.send({
    message: successMessage.TIME_SLOT_RE_ALLOCATION_SUCCESS,
  });
};

export const getAvailableDoctorsBySlotData = async (
  req: FastifyRequest<{
    Querystring: {
      startTime: string;
      endTime: string;
      date: string;
    };
  }>,
  reply: FastifyReply
) => {
  if (!req.query.startTime || !req.query.endTime || !req.query.date) {
    return reply.notFound(errorMessage.MISSING_REQUIRED_FIELDS);
  }
  const availableDoctors = await doctorAvailabilityModel
    .find({
      startTime: req.query.startTime,
      endTime: req.query.endTime,
      date: new Date(req.query.date),
    })
    .populate("doctor");
  return reply.send(availableDoctors);
};
