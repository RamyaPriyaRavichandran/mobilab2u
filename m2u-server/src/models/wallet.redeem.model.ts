import mongoose from 'mongoose'
import { WalletWithdrawal } from '../types/wallet_withdrawal'
const { Schema, model, Types } = mongoose

const walletRedeemSchema = new Schema<WalletWithdrawal>(
  {
    userRole: {
      type: String,
      required: true,
    },
    wallet: {
      type: Types.ObjectId,
      required: true,
      ref: 'UserWallet',
    },
    name: {
      type: String,
    },
    userId: {
      type: Types.ObjectId,
      required: true,
    },
    withdrawAmount: {
      type: Number,
    },
    walletBalance: {
      type: Number,
    },
    status: {
      type: String,
    },
    createdDate: {
      type: Date,
    },
    approvedDate: {
      type: Date,
    },
    declineNote: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

walletRedeemSchema.index({ userId: 1, userRole: 1, status: 1 })

export default mongoose.models.WalletRedeem ||
  model<WalletWithdrawal>('WalletRedeem', walletRedeemSchema, 'walletRedeems')
