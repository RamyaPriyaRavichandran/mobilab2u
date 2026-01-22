import mongoose, { Schema, model, Types } from 'mongoose'
import { Appointment } from '../types/appointment'
import { APPOINTMENT_TYPE, CUSTOMER_CONSULTATION_STATUS } from '../constants'

const appointmentSchema = new Schema<Appointment>(
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
      enum: [APPOINTMENT_TYPE.NORMAL_APPOINTMENT],
      default: APPOINTMENT_TYPE.NORMAL_APPOINTMENT,
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
            ref: 'DoctorAvailability',
          },
        },
      ],
      default: [],
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
    isBooked: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: CUSTOMER_CONSULTATION_STATUS.PENDING,
      enum: CUSTOMER_CONSULTATION_STATUS,
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

appointmentSchema.index({ approvedDoctor: 1 })
appointmentSchema.index({ customerAppointmentTimeSlotReAllocated: 1 })
appointmentSchema.index({ redirection: 1 })
appointmentSchema.index({ appointmentDate: 1 })
appointmentSchema.index({ doctorLanguage: 1 })
appointmentSchema.index({
  'selectedTimeSlot.startTime': 1,
  'selectedTimeSlot.endTime': 1,
  'selectedTimeSlot.slotId': 1,
})
appointmentSchema.index({ type: 1 })
appointmentSchema.index({ isBooked: 1 })
appointmentSchema.index({ status: 1 })
appointmentSchema.index({ customer: 1 })

export default mongoose.models.Appointment ||
  model<Appointment>('Appointment', appointmentSchema, 'appointments')
