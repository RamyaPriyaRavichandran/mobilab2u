import mongoose from 'mongoose'
import { type ObjectId, Schema, Types, model } from 'mongoose'

interface Roles {
  _id?: ObjectId
  roleId: string
  roleName: string
  roleLabel: string
  createdBy: ObjectId
  updatedBy: ObjectId
}

export const roleSchema = new Schema<Roles>(
  {
    roleId: {
      type: String,
      required: true,
    },
    roleName: {
      type: String,
      required: true,
    },
    roleLabel: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Types.ObjectId,
    },
    updatedBy: {
      type: Types.ObjectId,
    },
  },
  {
    timestamps: true,
  },
)

roleSchema.index({ roleId: 1 })

export default mongoose.models.Role || model<Roles>('Role', roleSchema, 'roles')
