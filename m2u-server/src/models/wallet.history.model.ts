import mongoose from 'mongoose'
import { WalletHistory } from '../types/wallet_history'
import { PACKAGE_TYPE } from '../constants'
const { Schema, model, Types } = mongoose

const walletHistorySchema = new Schema<WalletHistory>(
  {
    userRole: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: PACKAGE_TYPE,
    },
    status: {
      type: String,
    },
    userId: {
      type: Types.ObjectId,
    },
    earningAmount: {
      type: Number,
    },
    debitedAmount: {
      type: Number,
    },
    createdDate: {
      type: Date,
    },
    walletBalance: {
      type: Number,
    },
    orderId: {
      type: Types.ObjectId,
    },
  },
  {
    timestamps: true,
  },
)

walletHistorySchema.index({ userId: 1, type: 1, status: 1 })

export default mongoose.models.WalletHistory ||
  model<WalletHistory>('WalletHistory', walletHistorySchema, 'walletHistory')
