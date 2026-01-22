import mongoose, { Schema, model, Types } from 'mongoose'
import { PURCHASED_MEDICINE_STATUS } from '../constants'
import { MedicineOrder } from '../types/medcine_order'

const medicineOrderSchema = new Schema<MedicineOrder>(
  {
    customer: {
      type: Types.ObjectId,
      required: true,
      ref: 'Customer',
    },
    payment: {
      type: Types.ObjectId,
      ref: 'Payment',
    },
    medicine: {
      type: Types.ObjectId,
      ref: 'Medicine',
    },
    price: {
      type: Number,
    },
    statusTransaction: {
      type: [
        {
          status: {
            type: String,
            enum: PURCHASED_MEDICINE_STATUS,
          },
          date: {
            type: Date,
          },
        },
      ],
      default: [
        {
          status: PURCHASED_MEDICINE_STATUS.PURCHASED,
          date: new Date(),
        },
      ],
    },
  },
  {
    timestamps: true,
  },
)
medicineOrderSchema.index({ customer: 1 })

export default mongoose.models.MedicineOrder ||
  model<MedicineOrder>('MedicineOrder', medicineOrderSchema, 'medicineOrders')
