import mongoose, { Schema, model, Types } from 'mongoose'
import { DoctorAvailability } from '../types/doctor_availability'

const doctorAvailabilitySchema = new Schema<DoctorAvailability>(
  {
    doctor: {
      type: Types.ObjectId,
      required: true,
      ref: 'GPPartner',
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

doctorAvailabilitySchema.index({ doctor: 1 })
doctorAvailabilitySchema.index({ isBooked: 1 })
doctorAvailabilitySchema.index({ date: 1, startTime: 1, endTime: 1 })
export default mongoose.models.DoctorAvailability ||
  model<DoctorAvailability>(
    'DoctorAvailability',
    doctorAvailabilitySchema,
    'doctorAvailabilities',
  )
