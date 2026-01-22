import mongoose from 'mongoose'
import type { User } from '../types/user'
const { Schema, model, Types } = mongoose

const userSchema = new Schema<User>(
  {
    userName: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      required: true,
      ref: 'Roles',
    },
    phone: {
      type: Number,
    },
    nricNumber: {
      type: Number,
    },
    email: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    address2: {
      type: String,
    },
    postCode: {
      type: Number,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    refreshTokens: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
    createdBy: {
      type: Types.ObjectId,
    },
    updatedBy: {
      type: Types.ObjectId,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.User || model<User>('User', userSchema, 'users')
