import mongoose, { ObjectId } from 'mongoose'
import { Schema, Types, model } from 'mongoose'

interface RefreshToken {
  userId: ObjectId
  refreshTokens: [string]
  userRole: string
}

export const refreshTokenSchema = new Schema<RefreshToken>(
  {
    userId: {
      type: Types.ObjectId,
    },

    userRole: {
      type: String,
    },
    refreshTokens: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
)

refreshTokenSchema.index({ userId: 1, userRole: 1 })

export default mongoose.models.RefreshToken ||
  model<RefreshToken>('RefreshToken', refreshTokenSchema, 'refreshTokens')
