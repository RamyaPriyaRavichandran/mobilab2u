import mongoose from 'mongoose'
import { Schema, Types, model } from 'mongoose'
import { Lab } from '../types/lab'

export const labSchema = new Schema<Lab>(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    organization: {
      type: String,
      required: true,
    },
    userRole: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
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
    postCode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Lab || model<Lab>('Lab', labSchema, 'labs')
