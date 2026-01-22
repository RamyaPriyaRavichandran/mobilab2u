import mongoose, { Schema, model } from 'mongoose'

const adminSchema = new Schema(
  {
    name: {
      type: String,
    },
    userRole: {
      type: String,
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
    },
  },
  {
    timestamps: true,
  },
)

adminSchema.index({
  email: 1,
  phone: 1,
  nricNumber: 1,
  postCode: 1,
})
export default mongoose.models.Admin || model('Admin', adminSchema, 'admins')
