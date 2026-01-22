import mongoose, { Schema, model } from 'mongoose'

const citySchema = new Schema(
  {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.City || model('City', citySchema, 'city')
