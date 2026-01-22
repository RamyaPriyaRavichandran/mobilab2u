import { ObjectId } from "mongoose";

export interface Medicine {
  doctor: ObjectId;
  appointment: ObjectId;
  payment: ObjectId;
  customer: ObjectId;
  symptoms: String;
  status: String;
  comorbidities: String;
  diagnosis: String;
  price: Number;
  deliveryCharge: Number;
  weight: string;
  height: string;
  allergies: String;
  bloodPressure: string;
  temperature: string;
  heartRate: string;
  spO2: string;
  cbg: string;
  medicalHistory: string;
  virtualAssessment: string;
  advice: String;
  followupDate: String;
  medicine: [
    {
      name: String;
      dosage: String;
      frequency: String;
      route: String;
      beforeOrAfterFood: String;
      duration: String;
    },
  ];
}
