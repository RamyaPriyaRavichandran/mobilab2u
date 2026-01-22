import { FastifyReply, FastifyRequest } from 'fastify'
import { ACTIONS, SUBJECTS } from '../lib/permissions'
import customerModel from '../models/customer.model'
import LabTestModel from '../models/lab.test.model'
import errorsMessage from '../constants/error-messages'
import { CustomerUpdateProfileSchema } from '../types/customer_user_profile_update'
import successMessage from '../constants/success-messages'
import otpModel from '../models/otp.model'
import bcrypt from 'bcrypt'
import {
  dateAfter30Days,
  getDaysDifferenceFromToday,
  getMinutesDiffBetweenTwoDates,
} from '../utils'
import { OTP_AUTH_OPTIONS } from '../constants'
import { lookupDataFromCollection, unionWith } from 'mongo-aggregation-utils'
import { isExistData, isPaid } from '../mongo-queries'
import { NODE_ENV } from '../plugins/env'
import documentModel from '../models/document.model'

export const getAllCustomers = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  req.requireAccess(ACTIONS.VIEW_ALL, SUBJECTS.Customer)
  const customers = await customerModel.find({})
  reply.send(customers)
}

export const getCustomerByUserId = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  req.requireAccess(ACTIONS.VIEW, SUBJECTS.Customer)
  const customers = await customerModel
    .findById({ _id: req.user._id })
    .populate(['userId', 'passportSizePhoto'])
  reply.send(customers)
}

export const getCustomerById = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) => {
  if (!req.params.id) {
    return reply.notFound(errorsMessage.CUSTOMER_ID_NOT_FOUND)
  }
  req.requireAccess(ACTIONS.VIEW, SUBJECTS.Customer)
  const customers = await customerModel.findById({ _id: req.params.id })
  reply.send(customers)
}

export const getCustomerSubscribedPlans = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  req.requireAccess(ACTIONS.ADMIN_VIEW, SUBJECTS.Test)
  const labTests = await LabTestModel.aggregate([
    unionWith('followupLabTests'),
    ...lookupDataFromCollection('documentStorage', 'reports:all'),
    ...lookupDataFromCollection('serviceProviders', 'approvedServiceProvider'),
    ...lookupDataFromCollection('labs', 'submittedLab'),
    ...lookupDataFromCollection('appointments', 'appointment'),
    ...lookupDataFromCollection(
      'followupAppointments',
      'appointment',
      'followupAppointment',
    ),
    ...lookupDataFromCollection('customers', 'customer'),
    ...lookupDataFromCollection('payments', 'payment', '', isPaid),
    {
      $match: {
        payment: isExistData,
      },
    },
    {
      $sort: {
        createdAt: -1 as -1,
      },
    },
  ])
  return reply.send(labTests)
}

const getRemovableDocs = (data: any, body: any) => {
  const removableDocs = []
  const removableLocalDocs = []
  if (data?.passportSizePhoto?._id && body?.passportSizePhoto?._id) {
    removableDocs.push(data.passportSizePhoto.originalFileName)
    removableLocalDocs.push(data.passportSizePhoto._id)
  }
  return { removableDocs, removableLocalDocs }
}

export const userUpdateProfile = async (
  req: FastifyRequest<{ Body: CustomerUpdateProfileSchema }>,
  reply: FastifyReply,
) => {
  const user = await customerModel
    .findById(req.user._id)
    .populate('passportSizePhoto')
  if (!user) {
    return reply.notFound(errorsMessage.USER_NOT_FOUND)
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
    if (!req.body.otp) {
      return reply.badRequest(errorsMessage.VERIFY_YOUR_PHONE_NUMBER)
    }
    const OTP = await otpModel.findOne({
      number: `${req.body.phone}`,
      userRole: req.user.userRole,
      type: OTP_AUTH_OPTIONS.UPDATE,
    })
    if (!req.body.otp || !OTP) {
      return reply.notFound(errorsMessage.OTP_NOT_FOUND)
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

  const updateFields = {
    $set: {
      name: req.body.name,
      phone: req.body.phone,
      gender: req.body.gender,
      dateOfBirth: req.body.dateOfBirth,
      primaryAddress: {
        city: req.body.primaryAddress.city,
        state: req.body.primaryAddress.state,
        address: req.body.primaryAddress.address,
        postCode: req.body.primaryAddress.postCode,
        lat: req.body.primaryAddress.lat,
        lng: req.body.primaryAddress.lng,
        location: [req.body.primaryAddress.lng, req.body.primaryAddress.lat],
      },
      secondaryAddress:
        (req.body.secondaryAddress?.length ?? 0) > 0
          ? req.body.secondaryAddress!.map((address) => ({
              city: address.city,
              state: address.state,
              address: address.address,
              postCode: address.postCode,
              lat: address.lat,
              lng: address.lng,
              location: [address.lng, address.lat],
            }))
          : undefined,
      idProof: req.body.idProof,
      passportSizePhoto:
        req?.body?.passportSizePhoto?._id || user?.passportSizePhoto?._id,
      passportNumber: req.body.passportNumber,
      nricNumber: req.body.nricNumber,
      lastVerifiedDate: req.body.otp ? new Date() : user.lastVerifiedDate,
      isVerifiedPhoneNumber: true,
      phoneOtpCount: 0,
    },
  }
  const { removableDocs, removableLocalDocs } = getRemovableDocs(user, req.body)
  if (removableDocs.length > 0) {
    await req.deleteFileFromS3Bucket(removableDocs)
    await documentModel.deleteMany({ _id: { $in: removableLocalDocs } })
  }
  await customerModel.findByIdAndUpdate(user._id, updateFields)
  return reply.send({
    message: successMessage.USER_PROFILE_UPDATE_SUCCESS,
  })
}

export const getCustomerAddress = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  req.requireAccess(ACTIONS.VIEW, SUBJECTS.Customer)
  const customer = await customerModel.findById(req.user._id, {
    primaryAddress: 1,
    secondaryAddress: 1,
  })
  const address = [
    {
      type: 'primary',
      state: customer.primaryAddress.state,
      city: customer.primaryAddress.city,
      address: customer.primaryAddress.address,
      postCode: customer.primaryAddress.postCode,
    },
    ...customer.secondaryAddress,
  ]
  return reply.send(address)
}
