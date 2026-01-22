import mongoose, { Schema, model } from 'mongoose'

const redirectionSchema = new Schema<{ _id: string; name: string }>({
  name: {
    type: String,
  },
})

export default mongoose.models.Redirection ||
  model<{ _id: string; name: string }>(
    'Redirection',
    redirectionSchema,
    'redirections',
  )
