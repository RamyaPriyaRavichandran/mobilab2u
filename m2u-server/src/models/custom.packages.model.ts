import mongoose, { Types } from 'mongoose'
import { Package } from '../types/package'
import { PACKAGE_TYPE } from '../constants'
const { Schema, model } = mongoose

const customPackageSchema = new Schema<Package>({
  appointment: {
    type: Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: Types.ObjectId,
    ref: 'DocumentStorage',
  },
  type: {
    type: String,
    required: true,
    default: 'INDIVIDUAL',
  },
  testCount: {
    type: Number,
  },
  members: {
    type: Number,
  },
  duration: {
    type: String,
  },
  fastingHour: {
    type: String,
  },
  serviceType: {
    type: String,
    required: true,
    default: PACKAGE_TYPE.TEST,
  },
  price: {
    type: Number,
    required: true,
  },
  hspShare: {
    type: Number,
    required: true,
  },
  labShare: {
    type: Number,
    required: true,
  },
  gpShare: {
    type: Number,
    required: true,
  },
  customerShare: {
    type: Number,
    required: true,
  },
  mobilabShare: {
    type: Number,
    required: true,
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

customPackageSchema.index({ appointment: 1 })
customPackageSchema.index({ type: 1 })

export default mongoose.models.CustomPackage ||
  model<Package>('CustomPackage', customPackageSchema, 'customPackages')
