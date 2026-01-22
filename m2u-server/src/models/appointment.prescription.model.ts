import mongoose, { Schema, model, Types } from 'mongoose'
import { AppointmentPrescription } from '../types/doctor_prescription'

const appointmentPrescriptionSchema = new Schema<AppointmentPrescription>(
  {
    appointment: {
      type: Types.ObjectId,
      required: true,
      ref: 'Appointment',
    },
    isFollowupAppointmentBooked: {
      type: Boolean,
    },
    followupTest: {
      name: {
        type: String,
      },
      description: {
        type: String,
      },
      testDetail: {
        type: Schema.Types.Mixed,
      },
      isTestPurchased: {
        type: Boolean,
      },
    },
    followUpAppointmentDate: {
      type: Date,
    },
    status: {
      type: String,
      default: 'PENDING',
    },
    referral: {
      complaint: {
        type: String,
      },
      findings: {
        type: String,
      },
      investigation: {
        type: String,
      },
      management: {
        type: String,
      },
      doctor: {
        type: Types.ObjectId,
        ref: 'GPPartner',
      },
    },
    medicine: {
      type: Types.ObjectId,
      ref: 'Medicine',
    },
  },
  {
    timestamps: true,
  },
)

appointmentPrescriptionSchema.index({ appointment: 1, status: 1 })

export default mongoose.models.AppointmentPrescription ||
  model<AppointmentPrescription>(
    'AppointmentPrescription',
    appointmentPrescriptionSchema,
    'appointmentPrescriptions',
  )
