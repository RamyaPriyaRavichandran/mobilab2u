import mongoose from 'mongoose'
import { Schema, Types, model } from 'mongoose'
import { CUSTOMER_LAB_TEST_STATUS } from '../constants'
import { LabTest } from '../types/lab_test'

const customerAddress = new Schema({
  address: {
    type: String,
    required: true,
  },
  postCode: {
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
})

export const FollowupLabTestschema = new Schema<LabTest>(
  {
    customer: {
      type: Types.ObjectId,
      ref: 'Customer',
    },
    appointment: {
      type: Types.ObjectId,
      ref: 'Appointment',
    },
    packages: {
      type: Schema.Types.Mixed,
    },
    payment: {
      type: Types.ObjectId,
      ref: 'Payment',
    },
    reports: {
      type: [Types.ObjectId],
      ref: 'DocumentStorage',
    },
    statusTransaction: {
      type: [
        {
          status: {
            type: String,
            required: true,
            enum: CUSTOMER_LAB_TEST_STATUS,
          },
          date: {
            type: Date,
            required: true,
          },
        },
      ],
      default: [
        {
          status: CUSTOMER_LAB_TEST_STATUS.PROCESSING,
          date: new Date(),
        },
      ],
    },
    approvedServiceProvider: {
      type: Types.ObjectId,
      ref: 'ServiceProvider',
    },
    declinedServiceProviders: {
      type: [Types.ObjectId],
      ref: 'ServiceProvider',
    },
    isDateAndTimeChanged: {
      type: Boolean,
      default: false,
    },
    dateAndTimeChangedDate: {
      type: Date,
    },
    spApprovedDate: {
      type: Date,
    },
    sampleCollectedDate: {
      type: Date,
    },
    sampleRecollectionReason: {
      type: String,
    },
    cancellationReason: {
      type: String,
    },
    labAssignedDate: {
      type: Date,
    },
    customerAddress: {
      type: customerAddress,
      required: true,
    },
    customerAppointmentDate: {
      type: Date,
    },
    customerAppointmentTime: {
      type: String,
    },
    sampleSubmittedDate: {
      type: Date,
    },
    submittedLab: {
      type: Types.ObjectId,
      ref: 'Lab',
    },
    reportSubmittedDate: {
      type: Date,
    },
    referredDoctor: {
      type: Types.ObjectId,
      ref: 'GPPartner',
    },
  },
  {
    timestamps: true,
  },
)

FollowupLabTestschema.index({ customer: 1 })
FollowupLabTestschema.index({
  approvedServiceProvider: 1,
  statusTransaction: 1,
})
FollowupLabTestschema.index({ submittedLab: 1, statusTransaction: 1 })
FollowupLabTestschema.index({ referredDoctor: 1, statusTransaction: 1 })

export default mongoose.models.FollowupLabTest ||
  model<LabTest>('FollowupLabTest', FollowupLabTestschema, 'followupLabTests')
