import mongoose from 'mongoose'
import { Schema, Types, model } from 'mongoose'
import { CustomerTestDecline } from '../types/lab_test'

export const customerTestDeclineSchema = new Schema<CustomerTestDecline>(
  {
    serviceProvider: {
      type: Types.ObjectId,
      ref: 'ServiceProvider',
    },
    declineNote: {
      type: String,
    },
    customerTest: {
      type: Types.ObjectId,
      ref: 'CustomerTest',
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.CustomerTestDecline ||
  model<CustomerTestDecline>(
    'CustomerTestDecline',
    customerTestDeclineSchema,
    'customerTestDeclines',
  )
