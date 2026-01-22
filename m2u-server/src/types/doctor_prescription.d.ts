import { Mixed, ObjectId } from "mongoose";

export interface AppointmentPrescription {
  doctor: ObjectId;
  appointment: ObjectId;
  isFollowupAppointmentBooked: boolean;
  followupTest: {
    name: String;
    description: String;
    testDetail: Mixed;
    isTestPurchased: boolean;
  };
  referral: {
    complaint: String;
    findings: String;
    investigation: String;
    management: String;
    doctor: ObjectId;
  };
  followUpAppointmentDate: Date;
  payment: ObjectId;
  customer: ObjectId;
  status: String;
  medicine: ObjectId;
}
