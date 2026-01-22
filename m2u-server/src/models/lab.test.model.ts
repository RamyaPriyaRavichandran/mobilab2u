import mongoose from 'mongoose'
import { Schema, Types, model } from 'mongoose'
import { LabTest, Members } from '../types/lab_test'
import { CUSTOMER_LAB_TEST_STATUS } from '../constants'

const memberSchema = new Schema<Members>({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
})

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

export const labTestSchema = new Schema<LabTest>(
  {
    customer: {
      type: Types.ObjectId,
      ref: 'Customer',
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
    members: {
      type: [memberSchema],
      default: [],
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
    sampleRecollectionReason: {
      type: String,
    },
    cancellationReason: {
      type: String,
    },
    approvedServiceProvider: {
      type: Types.ObjectId,
      ref: 'ServiceProvider',
    },
    declinedServiceProviders: {
      type: [Types.ObjectId],
      ref: 'ServiceProvider',
    },
    spApprovedDate: {
      type: Date,
    },
    sampleCollectedDate: {
      type: Date,
    },
    customerAppointmentDate: {
      type: Date,
    },
    customerAppointmentTime: {
      type: String,
    },
    customerAddress: {
      type: customerAddress,
      required: true,
    },
    labAssignedDate: {
      type: Date,
    },
    sampleSubmittedDate: {
      type: Date,
    },
    sampleReCollectedDate: {
      type: Date,
    },
    reCollectedSampleSubmittedDate: {
      type: Date,
    },
    sampleRecollectionIssuedDate: {
      type: Date,
    },
    submittedLab: {
      type: Types.ObjectId,
      ref: 'Lab',
    },
    reportSubmittedDate: {
      type: Date,
    },
    dateAndTimeChangedDate: {
      type: Date,
    },
    isDateAndTimeChanged: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

labTestSchema.index({ customer: 1 })
labTestSchema.index({ approvedServiceProvider: 1, statusTransaction: 1 })
labTestSchema.index({ submittedLab: 1, statusTransaction: 1 })
labTestSchema.index({ referredDoctor: 1, statusTransaction: 1 })

export default mongoose.models.LabTest ||
  model<LabTest>('LabTest', labTestSchema, 'labTests')
