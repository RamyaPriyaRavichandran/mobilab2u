import mongoose, { ObjectId, Schema, model } from 'mongoose'

interface ForgotPassword {
  email: string
  passwordResetToken: string
  userId: ObjectId
  userRole: string
}

const forgotPasswordSchema = new Schema<ForgotPassword>(
  {
    email: {
      type: String,
      required: true,
    },
    passwordResetToken: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userRole: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.ForgotPassword ||
  model<ForgotPassword>(
    'ForgotPassword',
    forgotPasswordSchema,
    'forgotPassword',
  )
