import mongoose from 'mongoose'
import { Schema, Types, model } from 'mongoose'
import { Address, Customer } from '../types/customer'

const addressSchema = new Schema<Address>({
  address: {
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
  postCode: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
  },
  lng: {
    type: Number,
  },
  location: {
    type: [Number],
  },
})

export const customerSchema = new Schema<Customer>(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
    },
    passportSizePhoto: {
      type: Types.ObjectId,
      ref: 'DocumentStorage',
    },
    emailOtpCount: {
      type: Number,
      default: 2,
    },
    phoneOtpCount: {
      type: Number,
      default: 2,
    },
    emailOtpEnteredDate: {
      type: Date,
    },
    phoneOtpEnteredDate: {
      type: Date,
    },
    registrationNumber: {
      type: Number,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
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
    },
    gender: {
      type: String,
      required: true,
    },
    nricNumber: {
      type: String,
    },
    idProof: {
      type: String,
      enum: ['PASSPORT_NUMBER', 'NRIC_NUMBER'],
    },
    passportNumber: {
      type: String,
    },
    primaryAddress: {
      type: addressSchema,
    },
    secondaryAddress: {
      type: [addressSchema],
    },
    userRole: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)
customerSchema.index({ 'primaryAddress.location': '2dsphere' })

export default mongoose.models.Customer ||
  model<Customer>('Customer', customerSchema, 'customers')
