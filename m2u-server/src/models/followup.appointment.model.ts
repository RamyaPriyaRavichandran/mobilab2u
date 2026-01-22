import mongoose, { Schema, model, Types } from 'mongoose'
import { Appointment } from '../types/appointment'
import { APPOINTMENT_TYPE } from '../constants'

const followupAppointmentSchema = new Schema<Appointment>(
  {
    approvedDoctor: {
      type: Types.ObjectId,
      ref: 'GPPartner',
    },
    assignedDoctors: {
      type: [Types.ObjectId],
      ref: 'GPPartner',
    },
    customerAppointmentTimeSlotReAllocated: {
      type: Boolean,
      default: false,
    },
    appointment: {
      type: Types.ObjectId,
      ref: 'Appointment',
    },
    redirection: {
      type: Types.ObjectId,
      ref: 'Redirection',
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    doctorLanguage: {
      type: String,
    },
    medicalRecords: {
      type: [
        {
          document: {
            type: Types.ObjectId,
            ref: 'DocumentStorage',
          },
          name: {
            type: String,
          },
        },
      ],
      default: [],
    },
    selectedTimeSlot: {
      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
      slotId: {
        type: Types.ObjectId,
        ref: 'DoctorAvailability',
      },
    },
    type: {
      type: String,
      enum: [
        APPOINTMENT_TYPE.FOLLOWUP_DOCTOR_FOLLOWUP_APPOINTMENT,
        APPOINTMENT_TYPE.RANDOM_DOCTOR_FOLLOWUP_APPOINTMENT,
      ],
      required: true,
    },
    selectedTimeSlots: {
      type: [
        {
          date: {
            type: Date,
          },
          startTime: {
            type: String,
          },
          endTime: {
            type: String,
          },
          slotId: {
            type: Types.ObjectId,
            ref: 'DoctorAvailablity',
          },
        },
      ],
      default: [],
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: 'PENDING',
    },
    meeting: {
      link: {
        type: String,
      },
      startLink: {
        type: String,
      },
      id: {
        type: Number,
      },
      uuid: {
        type: String,
      },
      password: {
        type: String,
      },
    },
    payment: {
      type: Types.ObjectId,
      ref: 'Payment',
    },
    customer: {
      type: Types.ObjectId,
      ref: 'Customer',
    },
    packages: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  },
)

followupAppointmentSchema.index({ approvedDoctor: 1 })
followupAppointmentSchema.index({ customerAppointmentTimeSlotReAllocated: 1 })
followupAppointmentSchema.index({ redirection: 1 })
followupAppointmentSchema.index({ appointmentDate: 1 })
followupAppointmentSchema.index({ doctorLanguage: 1 })
followupAppointmentSchema.index({
  'selectedTimeSlot.startTime': 1,
  'selectedTimeSlot.endTime': 1,
  'selectedTimeSlot.slotId': 1,
})
followupAppointmentSchema.index({ type: 1 })
followupAppointmentSchema.index({ isBooked: 1 })
followupAppointmentSchema.index({ status: 1 })
followupAppointmentSchema.index({ customer: 1 })
followupAppointmentSchema.index({ packages: 1 })
export default mongoose.models.FollowupAppointment ||
  model<Appointment>(
    'FollowupAppointment',
    followupAppointmentSchema,
    'followupAppointments',
  )
