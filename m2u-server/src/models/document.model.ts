import mongoose from 'mongoose'
import type { DocumentStorage } from '../types/common'
const { Schema, model, Types } = mongoose

const DocumentStorageSchema = new Schema<DocumentStorage>({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
  },
  originalFileName: {
    type: String,
  },
  encoding: {
    type: String,
  },
  mimeType: {
    type: String,
  },
  localURL: {
    type: String,
  },
  s3URL: {
    type: String,
  },
  key: {
    type: String,
  },
  eTag: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: Types.ObjectId,
    ref: 'User',
  },
  updatedBy: {
    type: Types.ObjectId,
    ref: 'User',
  },
})

export default mongoose.models.DocumentStorage ||
  model<DocumentStorage>(
    'DocumentStorage',
    DocumentStorageSchema,
    'documentStorage',
  )
