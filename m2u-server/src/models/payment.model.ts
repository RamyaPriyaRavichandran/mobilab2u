import mongoose, { Types } from 'mongoose'
import { Payment } from '../types/payment'
const { Schema, model } = mongoose

const paymentSchema = new Schema<Payment>(
  {
    sessionId: {
      type: String,
      required: true,
    },
    paymentDate: {
      type: Date,
    },
    planId: {
      type: Types.ObjectId,
    },
    amount: {
      type: Number,
    },
    userId: {
      type: Types.ObjectId,
      required: true,
    },
    userRole: {
      type: String,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
    paymentType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

paymentSchema.index({ userRole: 1, paymentType: 1, userId: 1 })
paymentSchema.index({ paymentStatus: 1 })

export default mongoose.models.Payment ||
  model<Payment>('Payment', paymentSchema, 'payments')
