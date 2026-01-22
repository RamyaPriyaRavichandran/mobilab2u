import mongoose, { Schema, model, Types } from 'mongoose'
import { Medicine } from '../types/medicine'
import appointment from '../routes/appointment'

const medicineSchema = new Schema<Medicine>(
  {
    customer: {
      type: Types.ObjectId,
      required: true,
      ref: 'Customer',
    },
    symptoms: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
    },
    status: {
      type: String,
    },
    height: {
      type: String,
    },
    bloodPressure: {
      type: String,
    },
    temperature: {
      type: String,
    },
    heartRate: {
      type: String,
    },
    spO2: {
      type: String,
    },
    cbg: {
      type: String,
    },
    medicalHistory: {
      type: String,
    },
    virtualAssessment: {
      type: String,
    },
    comorbidities: {
      type: String,
      required: true,
    },
    diagnosis: {
      type: String,
      required: true,
    },
    allergies: {
      type: String,
      required: true,
    },
    appointment: {
      type: Types.ObjectId,
    },
    advice: {
      type: String,
    },
    payment: {
      type: Types.ObjectId,
      ref: 'Payment',
    },
    price: {
      type: Number,
    },
    deliveryCharge: {
      type: Number,
    },
    medicine: {
      type: [
        {
          name: {
            type: String,
          },
          dosage: {
            type: String,
          },
          frequency: {
            type: String,
          },
          route: {
            type: String,
          },
          beforeOrAfterFood: {
            type: String,
          },
          duration: {
            type: String,
          },
          price: {
            type: Number,
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
)
medicineSchema.index({ customer: 1 })
medicineSchema.index({ appointment: 1 })
medicineSchema.index({ status: 1 })

export default mongoose.models.Medicine ||
  model<Medicine>('Medicine', medicineSchema, 'medicines')
