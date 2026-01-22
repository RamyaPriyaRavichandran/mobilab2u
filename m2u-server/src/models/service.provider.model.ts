import mongoose from 'mongoose'
import { Schema, Types, model } from 'mongoose'
import type { ServiceProvider } from '../types/service.provider'

export const serviceProviderSchema = new Schema<ServiceProvider>(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
    },
    gender: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    postCode: {
      type: String,
      required: true,
    },
    nricNumber: {
      type: String,
    },
    country: {
      type: String,
      required: true,
    },
    passportNumber: {
      type: String,
    },
    idProof: {
      type: String,
      enum: ['PASSPORT_NUMBER', 'NRIC_NUMBER'],
    },
    userRole: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    adminApprovalStatus: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'DECLINED'],
      required: true,
    },
    activeStatus: {
      type: String,
      enum: ['ACTIVE', 'DE_ACTIVE'],
    },
    paymentStatus: {
      type: String,
      enum: ['PENDING', 'PAID', 'NOT_PAID'],
      required: true,
    },
    paidKitfeesPrice: {
      type: Number,
    },
    actualKitFeesPrice: {
      type: Number,
    },
    isVerifiedPhoneNumber: {
      type: Boolean,
      default: false,
    },
    lastVerifiedDate: {
      type: Date,
      default: null,
    },
    emailOtpCount: {
      type: Number,
      default: 2,
    },
    phoneOtpCount: {
      type: Number,
      default: 0,
    },
    emailOtpEnteredDate: {
      type: Date,
    },
    phoneOtpEnteredDate: {
      type: Date,
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    city: {
      type: String,
    },
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
    state: {
      type: String,
    },
    deactivateNote: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
      required: true,
    },
    medicalQualification: {
      type: String,
      required: true,
      enum: ['DOCTOR', 'PARADEMIC', 'NURSES', 'OTHERS'],
    },
    other: {
      type: String,
    },
    mQdocOne: {
      type: Types.ObjectId,
      ref: 'DocumentStorage',
    },
    mQdocTwo: {
      type: Types.ObjectId,
      ref: 'DocumentStorage',
    },
    mQdocThree: {
      type: Types.ObjectId,
      ref: 'DocumentStorage',
    },
    mQdocFour: {
      type: Types.ObjectId,
      ref: 'DocumentStorage',
    },
    passportSizePhoto: {
      type: Types.ObjectId,
      ref: 'DocumentStorage',
    },
    myKad: {
      type: Types.ObjectId,
      ref: 'DocumentStorage',
    },
  },
  {
    timestamps: true,
  },
)

serviceProviderSchema.index({ email: 1 })
serviceProviderSchema.index({ postCode: 1 })

export default mongoose.models.ServiceProvider ||
  model<ServiceProvider>(
    'ServiceProvider',
    serviceProviderSchema,
    'serviceProviders',
  )
