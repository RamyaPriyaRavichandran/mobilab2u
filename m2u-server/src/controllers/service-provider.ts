import type { FastifyReply, FastifyRequest } from 'fastify'
import serviceProviderModel from '../models/service.provider.model'
import type { ReviewServiceProviderBodySchema } from '../types/review_service_provider_body'
import { getAllSPAndGP } from '../mongo-queries/service-provider'
import { ACTIONS, ROLES, SUBJECTS } from '../lib/permissions'
import errorMessage from '../constants/error-messages'
import successMessage from '../constants/success-messages'
import { FRONTEND_URL, NODE_ENV } from '../plugins/env'
import bcrypt from 'bcrypt'

import {
  APPROVAL_STATUS,
  HSP_STATUS,
  models,
  OTP_AUTH_OPTIONS,
  PACKAGE_TYPE,
  PAYMENT_STATUS,
  PAYMENT_TYPE,
  ROLES_TO_STRING,
} from '../constants'
import gpPartnerModel from '../models/gp.partner.model'
import packageModel from '../models/package.model'
import { createPaymentLink } from './payment'
import { AdminUpdateHSPAndGPProfileSchema } from '../types/admin_update_hsp_gp_profile'
import { UpdateUserProfileSchema } from '../types/update_user_profile'
import {
  dateAfter30Days,
  getDaysDifferenceFromToday,
  getMinutesDiffBetweenTwoDates,
} from '../utils'
import otpModel from '../models/otp.model'
import documentModel from '../models/document.model'
import errorsMessage from '../constants/error-messages'
import paymentModel from '../models/payment.model'
import { EMAIL_CONTENTS } from '../constants/email-contents'
const serviceProviderDocument = [
  'mQdocOne',
  'mQdocTwo',
  'mQdocThree',
  'mQdocFour',
  'passportSizePhoto',
  'myKad',
]

export const getServiceProviders = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  req.requireAccess(ACTIONS.VIEW_ALL, SUBJECTS.ServiceProvider)
  const serviceProvider = await serviceProviderModel.aggregate(getAllSPAndGP)
  return reply.send(serviceProvider)
}

export const getGPPartners = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  req.requireAccess(ACTIONS.VIEW_ALL, SUBJECTS.ServiceProvider)
  const gpPartners = await gpPartnerModel.aggregate(getAllSPAndGP)
  return reply.send(gpPartners)
}

export const getServiceProviderById = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) => {
  req.requireAccess(ACTIONS.VIEW, SUBJECTS.ServiceProvider)
  if (!req.params.id) {
    return reply.notFound(errorMessage.SERVICE_PROVIDER_ID_NOT_FOUND)
  }
  const serviceProvider = await serviceProviderModel
    .findById({
      _id: req.params.id,
    })
    .populate(serviceProviderDocument)
  const gpPartner = await gpPartnerModel.findById({ _id: req.params.id })
  const data = serviceProvider || gpPartner
  reply.send(data)
}

export const getServiceProviderByUserId = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) => {
  req.requireAccess(ACTIONS.VIEW, SUBJECTS.User)
  const currentUserModel = models[req.user.userRole]
  let serviceProvider
  if (req.user.userRole === ROLES.SERVICE_PROVIDER) {
    serviceProvider = await currentUserModel
      .findById({
        _id: req.user._id,
      })
      .populate(serviceProviderDocument)
  } else if (req.user.userRole === ROLES.GP_PARTNER) {
    serviceProvider = await currentUserModel
      .findById({
        _id: req.user._id,
      })
      .populate([...serviceProviderDocument, 'eSign'])
  }

  reply.send(serviceProvider)
}

export const reviewServiceProvider = async (
  req: FastifyRequest<{
    Body: ReviewServiceProviderBodySchema
    Params: { id: string }
  }>,
  reply: FastifyReply,
) => {
  req.requireAccess(ACTIONS.REVIEW, SUBJECTS.ServiceProvider)
  if (!req.params.id) {
    return reply.notFound(errorMessage.SERVICE_PROVIDER_ID_NOT_FOUND)
  }
  const approvalStatus: Record<string, string> = {
    APPROVED: 'Approved',
    DECLINED: 'Declined',
  }
  const userServiceProvider = await serviceProviderModel.findById({
    _id: req.params.id,
  })

  const gpPartner = await gpPartnerModel.findById({ _id: req.params.id })
  if (!userServiceProvider?._id && !gpPartner?._id) {
    return reply.notFound(errorMessage.SERVICE_PROVIDER_NOT_FOUND)
  }
  const userRole = gpPartner?.userRole || userServiceProvider?.userRole
  const CurrentUserModel = models[userRole]
  const updataField: any = {
    adminApprovalStatus: req.body.adminApprovalStatus,
  }
  if (
    req.body.adminApprovalStatus === APPROVAL_STATUS.APPROVED &&
    userRole === ROLES.SERVICE_PROVIDER
  ) {
    updataField.activeStatus = HSP_STATUS.ACTIVE
  }
  const updatedUser = await CurrentUserModel.findOneAndUpdate(
    { _id: req.params.id },
    updataField,
    { new: true },
  )

  const packages = await packageModel.findOne({
    serviceType: PACKAGE_TYPE.SERVICE_PROVIDER_KIT_FEES,
  })
  const template: Record<string, string> = {
    SERVICE_PROVIDER: 'approve-service-provider',
    GP_PARTNER: 'approve-gp-partner',
  }

  const subjectStatus: Record<string, string> = {
    APPROVED:
      'Welcome to Mobilab2u – We are excited to Have You Join Our Telemedicine Team! - Mobilab2u',
    DECLINED:
      'Unfortunately, We Cannot Proceed your registration at This Tim - Mobilab2u',
  }

  const templateStatus: Record<string, string> = {
    APPROVED: template[updatedUser.userRole],
    DECLINED: 'decline-service-provider',
  }

  const mailPayload = {
    to: updatedUser.email,
    data: {
      name: updatedUser.name,
      frontEndUrl: `${FRONTEND_URL}/registration`,
      price: packages.price,
      discountPrice: packages.price - packages.offerPrice,
      offerPrice: packages.offerPrice,
    },
    subject: subjectStatus[updatedUser.adminApprovalStatus],
    template: templateStatus[updatedUser.adminApprovalStatus],
  }

  await req.sendMail(mailPayload)

  return reply.send({
    message: `User registration ${approvalStatus[updatedUser.adminApprovalStatus]}`,
    updatedUser,
  })
}

export const createServiceProviderPayment = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  req.requireAccess(ACTIONS.PAY_SERVICE_PROVIDER_FEE, SUBJECTS.Payment)

  const serviceProvider = await serviceProviderModel.findById({
    _id: req.user._id,
  })

  if (!serviceProvider) {
    return reply.notFound(errorMessage.SERVICE_PROVIDER_NOT_FOUND)
  }
  if (serviceProvider.adminApprovalStatus !== APPROVAL_STATUS.APPROVED) {
    return reply.unauthorized(errorMessage.ADMIN_APPROVAL_PENDING)
  }

  const plan = await packageModel.findOne({
    serviceType: PACKAGE_TYPE.SERVICE_PROVIDER_KIT_FEES,
  })
  if (!plan) {
    return reply.notFound(errorMessage.PLAN_NOT_FOUND)
  }

  if (plan.offerPrice === 0) {
    await serviceProviderModel.findOneAndUpdate(
      { _id: req.user._id },
      {
        paymentStatus: PAYMENT_STATUS.PAID,
        paidKitfeesPrice: plan.offerPrice,
        actualKitFeesPrice: plan.price,
      },
    )
    await paymentModel.create({
      planId: plan._id,
      userId: req.user._id,
      amount: plan.offerPrice,
      sessionId: 'free-plan',
      userRole: ROLES.SERVICE_PROVIDER,
      paymentType: PAYMENT_TYPE.SERVICE_PROVIDER_KIT_FEES,
      paymentDate: new Date(),
      paymentStatus: PAYMENT_STATUS.PAID,
    })
    return reply.send({
      message: 'Payment successful, no fees required for this plan.',
    })
  } else {
    const metadata = {
      userRole: ROLES.SERVICE_PROVIDER,
      paymentType: PAYMENT_TYPE.SERVICE_PROVIDER_KIT_FEES,
      actualKitFeesPrice: plan.price,
      paymentUserId: `${req.user._id}`,
      serviceProviderId: `${serviceProvider._id}`,
      planId: `${plan._id}`,
      feesType: plan.feesType,
      userName: `${req.user.name}`,
    }
    const planDetails = {
      feesName: plan.name,
      feesDetail: plan.description,
      price: plan.offerPrice,
    }
    const session = await createPaymentLink(
      req.user.email,
      metadata,
      planDetails,
      {
        message: successMessage.SERVICE_PROVIDER_KIT_FEES_SUCCESS,
        redirect: `/registration`,
        redirectType: PACKAGE_TYPE.SERVICE_PROVIDER_KIT_FEES,
      },
    )
    return reply.send({
      stripeURL: session.url,
    })
  }
}

export const adminUpdateHSPProfile = async (
  req: FastifyRequest<{
    Body: AdminUpdateHSPAndGPProfileSchema
  }>,
  reply: FastifyReply,
) => {
  req.requireAccess(ACTIONS.UPDATE, SUBJECTS.ServiceProvider)
  const CurrentUserModel = models[req.body.userRole]
  const user = await CurrentUserModel.findById(req.body.userId)
  if (!user) {
    return reply.notFound(errorMessage.USER_NOT_FOUND)
  }
  const updateFields = {
    $set: {
      name: req.body.name,
      city: req.body.city,
      state: req.body.state,
      postCode: req.body.postCode,
      address: req.body.address,
      phone: req.body.phone,
    },
  }
  await CurrentUserModel.findByIdAndUpdate(user, updateFields)

  return reply.send({ message: successMessage.USER_PROFILE_UPDATE_SUCCESS })
}
export const adminUpdateGPProfile = async (
  req: FastifyRequest<{
    Body: AdminUpdateHSPAndGPProfileSchema
  }>,
  reply: FastifyReply,
) => {
  req.requireAccess(ACTIONS.UPDATE, SUBJECTS.ServiceProvider)
  const CurrentUserModel = models[req.body.userRole]
  const user = await CurrentUserModel.findById(req.body.userId)
  if (!user) {
    return reply.notFound(errorMessage.USER_NOT_FOUND)
  }
  const updateFields = {
    $set: {
      name: req.body.name,
      city: req.body.city,
      state: req.body.state,
      postCode: req.body.postCode,
      address: req.body.address,
      phone: req.body.phone,
    },
  }
  await CurrentUserModel.findByIdAndUpdate(user, updateFields)

  return reply.send({ message: successMessage.USER_PROFILE_UPDATE_SUCCESS })
}

export const preValidationUserProfileUpdate = async (
  req: FastifyRequest<{
    Body: UpdateUserProfileSchema
  }>,
  reply: FastifyReply,
) => {
  const CurrentUserModel = models[req.user.userRole]
  const user = await CurrentUserModel.findById(req.user._id)
  if (!user) {
    return reply.notFound(errorMessage.USER_NOT_FOUND)
  }
  if (req.user.userRole === ROLES.GP_PARTNER) {
    if (!user.eSign && !req.body.isESign) {
      return reply.notFound(errorMessage.SELECT_E_SIGN)
    }
  }
  if (user.activeStatus === HSP_STATUS.DE_ACTIVE) {
    return reply.badRequest(errorMessage.HSP_DE_ACTIVE)
  }
  if (!req.body.isVerifiedPhoneNumber) {
    if (
      user.lastVerifiedDate &&
      getDaysDifferenceFromToday(user.lastVerifiedDate, NODE_ENV) < -30
    ) {
      return reply.badRequest(
        `You've reached the monthly limit for phone number updates. Try again after ${dateAfter30Days(user.lastVerifiedDate, NODE_ENV)}.`,
      )
    }
    const OTP = await otpModel.findOne({
      number: `${req.body.phone}`,
      userRole: req.user.userRole,
      type: OTP_AUTH_OPTIONS.UPDATE,
    })

    if (!req.body.otp || !OTP) {
      return reply.notFound(errorsMessage.VERIFY_PHONE)
    }
    if (
      getMinutesDiffBetweenTwoDates(new Date(OTP.currentDate), NODE_ENV) > 5
    ) {
      return reply.notFound(errorsMessage.PHONE_VERIFICATION_CODE_EXPIRED)
    }
    const isValidOtp = await bcrypt.compareSync(req.body.otp, OTP?.otp)
    if (!isValidOtp) {
      return reply.unauthorized(errorsMessage.PHONE_VERIFICATION_CODE_NOT_MATCH)
    }
    await otpModel.deleteOne({ otp: OTP?.otp })
  }
}

const getRemovableDocs = (data: any, body: any) => {
  let removableLocalDocs = []
  let removableDocs = []
  if (data?.passportSizePhoto?._id && body?.passportSizePhoto?._id) {
    removableLocalDocs.push(data.passportSizePhoto._id)
    removableDocs.push(data.passportSizePhoto.originalFileName)
  }
  if (data?.eSign?._id && body.eSign?._id) {
    removableLocalDocs.push(data.eSign._id)
    removableDocs.push(data.eSign.originalFileName)
  }
  return {
    removableLocalDocs,
    removableDocs,
  }
}

export const userUpdateOurGPProfile = async (
  req: FastifyRequest<{
    Body: UpdateUserProfileSchema & {
      passportSizePhoto: {
        _id: string
      }
      eSign: {
        _id: string
      }
    }
  }>,
  reply: FastifyReply,
) => {
  const CurrentUserModel = models[req.user.userRole]

  const user = await CurrentUserModel.findById(req.user._id).populate([
    'passportSizePhoto',
    'eSign',
  ])
  if (!user) {
    return reply.notFound(errorMessage.USER_NOT_FOUND)
  }
  console.log('reder')
  const updateFields = {
    $set: {
      name: req.body.name,
      phone: req.body.phone,
      gender: req.body.gender,
      medicalQualification: req.body.medicalQualification,
      other: req.body.other,
      city: req.body.city,
      state: req.body.state,
      address: req.body.address,
      postCode: req.body.postCode,
      lat: req.body.lat,
      lng: req.body.lng,
      language: req.body.language,
      nricNumber: req.body.nricNumber,
      idProof: req.body.idProof,
      passportNumber: req.body.passportNumber,
      lastVerifiedDate: req.body.otp ? new Date() : user.lastVerifiedDate,
      isVerifiedPhoneNumber: true,
      phoneOtpCount: 0,
      passportSizePhoto: req.body.passportSizePhoto?._id
        ? req.body.passportSizePhoto?._id
        : user.passportSizePhoto._id,
      eSign: req?.body?.eSign?._id ? req?.body?.eSign?._id : user?.eSign?._id,
    },
  }
  await otpModel.deleteOne({
    number: `${req.body.phone}`,
    userRole: req.user.userRole,
    type: OTP_AUTH_OPTIONS.UPDATE,
  })
  await CurrentUserModel.findByIdAndUpdate(req.user._id, updateFields)
  const { removableLocalDocs, removableDocs } = getRemovableDocs(user, req.body)
  if (removableLocalDocs.length > 0) {
    await req.deleteFileFromS3Bucket(removableDocs)
    await documentModel.deleteMany({ _id: { $in: removableLocalDocs } })
  }
  return reply.send({
    message: successMessage.USER_PROFILE_UPDATE_SUCCESS,
  })
}

export const userUpdateOurHSPProfile = async (
  req: FastifyRequest<{
    Body: UpdateUserProfileSchema & {
      passportSizePhoto: {
        _id: string
      }
      eSign: {
        _id: string
      }
    }
  }>,
  reply: FastifyReply,
) => {
  const CurrentUserModel = models[req.user.userRole]
  const user = await CurrentUserModel.findById(req.user._id).populate([
    'passportSizePhoto',
  ])
  if (!user) {
    return reply.notFound(errorMessage.USER_NOT_FOUND)
  }
  const updateFields = {
    $set: {
      name: req.body.name,
      phone: req.body.phone,
      gender: req.body.gender,
      medicalQualification: req.body.medicalQualification,
      other: req.body.other,
      city: req.body.city,
      state: req.body.state,
      address: req.body.address,
      postCode: req.body.postCode,
      lat: req.body.lat,
      lng: req.body.lng,
      language: req.body.language,
      nricNumber: req.body.nricNumber,
      idProof: req.body.idProof,
      passportNumber: req.body.passportNumber,
      lastVerifiedDate: req.body.otp ? new Date() : user.lastVerifiedDate,
      isVerifiedPhoneNumber: true,
      phoneOtpCount: 0,
      passportSizePhoto: req.body.passportSizePhoto?._id
        ? req.body.passportSizePhoto?._id
        : user.passportSizePhoto._id,
    },
  }
  await otpModel.deleteOne({
    number: `${req.body.phone}`,
    userRole: req.user.userRole,
    type: OTP_AUTH_OPTIONS.UPDATE,
  })
  await CurrentUserModel.findByIdAndUpdate(req.user._id, updateFields)
  const { removableLocalDocs, removableDocs } = getRemovableDocs(user, req.body)
  if (removableLocalDocs.length > 0) {
    await req.deleteFileFromS3Bucket(removableDocs)
    await documentModel.deleteMany({ _id: { $in: removableLocalDocs } })
  }
  return reply.send({
    message: successMessage.USER_PROFILE_UPDATE_SUCCESS,
  })
}

export const reviewHSPOrGP = async (
  req: FastifyRequest<{
    Body: {
      userId: string
      status: HSP_STATUS.ACTIVE | HSP_STATUS.DE_ACTIVE
      note: string
      userRole: string
    }
  }>,
  reply: FastifyReply,
) => {
  req.requireAccess(ACTIONS.REVIEW, SUBJECTS.ServiceProvider)
  if (!req.body.userId) {
    return reply.notFound(errorMessage.USER_ID_NOT_FOUND)
  }
  const CurrentUserModel = models[req.body.userRole]
  const user = await CurrentUserModel.findById({ _id: req.body.userId })
  if (!user) {
    return reply.notFound(errorMessage.USER_NOT_FOUND)
  }
  if (user.adminApprovalStatus !== APPROVAL_STATUS.APPROVED) {
    return reply.unauthorized(errorMessage.ADMIN_APPROVAL_PENDING)
  }
  const reviewedHSPOrGP = await CurrentUserModel.findByIdAndUpdate(
    { _id: req.body.userId },
    { activeStatus: req.body.status, deactivateNote: req.body.note || '' },
    { new: true },
  )

  const HSP_STATUS_TO_STRING: Record<string, string> = {
    ACTIVE: 'Activated',
    DE_ACTIVE: 'De-Activated',
  }
  const mailPayload = {
    to: reviewedHSPOrGP.email,
    data: {
      status: HSP_STATUS_TO_STRING[reviewedHSPOrGP.activeStatus],
      name: reviewedHSPOrGP.name,
      userRole: ROLES_TO_STRING[reviewedHSPOrGP.userRole],
      declineNote:
        req.body.status === HSP_STATUS.DE_ACTIVE
          ? `<div><b>Note : </b><p>${req.body.note}</p></div>`
          : '',
    },
    ...EMAIL_CONTENTS.REVIEW_HSP_OR_GP,
  }

  await req.sendMail(mailPayload)
  return reply.send({
    message: `User ${HSP_STATUS_TO_STRING[req.body.status]} successfully`,
    reviewedHSPOrGP,
  })
}

export const getHspKitFeesDetail = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const packages = await packageModel.findOne({
    serviceType: PACKAGE_TYPE.SERVICE_PROVIDER_KIT_FEES,
  })
  reply.send(packages)
}
