import mongoose from 'mongoose'
import { Wallet } from '../types/wallet'
const { Schema, model, Types } = mongoose

const userWalletSchema = new Schema<Wallet>(
  {
    userRole: {
      type: String,
      required: true,
    },
    userId: {
      type: Types.ObjectId,
    },
    walletBalance: {
      type: Number,
    },
    totalEarnings: {
      type: Number,
    },
    withDrawedAmount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
)

userWalletSchema.index({ userId: 1, userRole: 1 })

export default mongoose.models.UserWallet ||
  model<Wallet>('UserWallet', userWalletSchema, 'userWallets')
