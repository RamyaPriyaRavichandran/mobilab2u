import mongoose, { Types } from 'mongoose'
import { Otp } from '../types/otp'
import { OTP_AUTH_OPTIONS } from '../constants'
const { Schema, model } = mongoose
const otpSchema = new Schema<Otp>(
  {
    number: {
      type: String,
    },
    email: {
      type: String,
    },
    otp: {
      type: String,
      required: true,
    },
    originalOTP: {
      type: String,
    },
    testId: {
      type: Types.ObjectId,
    },
    userRole: {
      type: String,
      required: true,
    },
    otpCount: {
      type: Number,
    },
    currentDate: {
      type: Date,
    },
    type: {
      type: String,
      enum: [
        OTP_AUTH_OPTIONS.REGISTER,
        OTP_AUTH_OPTIONS.WALLET_REDEEM,
        OTP_AUTH_OPTIONS.UPDATE,
        OTP_AUTH_OPTIONS.CUSTOMER_OTP_FROM_HSP,
        OTP_AUTH_OPTIONS.LAB_OTP_FROM_HSP,
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

otpSchema.index({ number: 1, type: 1, userRole: 1 })
otpSchema.index({ email: 1, type: 1, userRole: 1 })
otpSchema.index({ email: 1, type: 1, userRole: 1, testId: 1 })

export default mongoose.models.Otp || model<Otp>('Otp', otpSchema, 'otp')
