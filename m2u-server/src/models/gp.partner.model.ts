import mongoose from 'mongoose'
import { Schema, Types, model } from 'mongoose'
import type { ServiceProvider } from '../types/service.provider'

export const gpPartnerSchema = new Schema<ServiceProvider>(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
    },
    gender: {
      type: String,
      required: true,
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
      reqyired: true,
    },
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
    idProof: {
      type: String,
      enum: ['PASSPORT_NUMBER', 'NRIC_NUMBER'],
    },
    passportNumber: {
      type: String,
    },
    userRole: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
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
      default: 'ACTIVE',
    },
    deactivateNote: {
      type: String,
    },
    paymentStatus: {
      type: String,
      enum: ['PENDING', 'PAID', 'NOT_PAID'],
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    isVerifiedPhoneNumber: {
      type: Boolean,
      default: false,
    },
    lastVerifiedDate: {
      type: Date,
      default: null,
    },
    password: {
      type: String,
      // required: true,
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
    language: {
      type: String,
      required: true,
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
    registerNumber: {
      type: String,
      required: true,
    },
    eSign: {
      type: Types.ObjectId,
      ref: 'DocumentStorage',
    },
  },
  {
    timestamps: true,
  },
)

gpPartnerSchema.index({ email: 1 })

export default mongoose.models.GPPartner ||
  model<ServiceProvider>('GPPartner', gpPartnerSchema, 'gpPartners')
