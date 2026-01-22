import mongoose, { model, Schema } from 'mongoose'

const permsSchema = new Schema({
  subject: { type: String, required: true },
  actions: [Schema.Types.Mixed],
})

const permissionSchema = new Schema(
  {
    roleId: {
      type: String,
      required: true,
    },
    perms: [permsSchema],
  },
  {
    timestamps: true,
  },
)
permissionSchema.index({ roleId: 1 })

export default mongoose.models.Permission ||
  model('Permission', permissionSchema, 'permissions')
