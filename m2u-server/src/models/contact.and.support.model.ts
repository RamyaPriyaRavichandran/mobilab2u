import mongoose, { Schema, model } from 'mongoose'
import { Contact } from '../types/contact'

const contactAndSupportSchema = new Schema<Contact>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    location: {
      type: String,
    },
    phone: {
      type: String,
    },
    subject: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

contactAndSupportSchema.index({
  email: 1,
})
export default mongoose.models.ContactAndSupport ||
  model<Contact>(
    'ContactAndSupport',
    contactAndSupportSchema,
    'contactAndSupports',
  )
