import mongoose, { Types } from 'mongoose'
import { Package } from '../types/package'
import { PACKAGE_TYPE } from '../constants'
const { Schema, model } = mongoose
const { TEST, APPOINTMENT, FOLLOWUP_APPOINTMENT, SERVICE_PROVIDER_KIT_FEES } =
  PACKAGE_TYPE
const packageSchema = new Schema<Package>({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: Types.ObjectId,
    ref: 'DocumentStorage',
  },
  testCount: {
    type: Number,
  },
  gpShare: {
    type: Number,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
  },
  members: {
    type: Number,
  },
  serviceType: {
    type: String,
    enum: [SERVICE_PROVIDER_KIT_FEES, TEST, APPOINTMENT, FOLLOWUP_APPOINTMENT],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  hspShare: {
    type: Number,
  },
  labShare: {
    type: Number,
  },
  customerShare: {
    type: Number,
  },
  duration: {
    type: String,
  },
  fastingHour: {
    type: String,
  },
  mobilabShare: {
    type: Number,
  },
  offerPrice: {
    type: Number,
    required: true,
  },
  document: {
    type: Types.ObjectId,
    ref: 'DocumentStorage',
  },
})

export default mongoose.models.Package ||
  model<Package>('Package', packageSchema, 'packages')
