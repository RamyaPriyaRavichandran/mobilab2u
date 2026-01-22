import mongoose, { Schema, model } from 'mongoose'

interface Counter {
  counterType: string
  incrementNumber: number
  userRole: string
}

export const counterSchema = new Schema<Counter>(
  {
    counterType: {
      type: String,
      required: true,
      enum: ['CUSTOMER_REGISTRATION_NUMBER'],
    },
    incrementNumber: {
      type: Number,
      required: true,
      default: 10000001,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Counter ||
  model<Counter>('Counter', counterSchema, 'counters')
