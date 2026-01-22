import { Mixed } from "mongoose";

export interface Members {
  name: String;
  age: Number;
  gender: String;
}
export interface LabTest {
  _id: ObjectId;
  customer: ObjectId;
  referredDoctor: ObjectId;
  packages: Package;
  appointment: ObjectId;
  payment: ObjectId;
  reports: [ObjectId];
  members: [Members];
  statusTransaction: {
    status: CUSTOMER_LAB_TEST_STATUS;
    date: Date;
  }[];
  customerAddress: {
    address: string;
    city: string;
    state: string;
    postCode: string;
  };
  isDateAndTimeChanged: boolean;
  customerAppointmentDate: Date;
  dateAndTimeChangedDate: Date;
  customerAppointmentTime: string;
  customerAddress: string;
  sampleRecollectionReason: string;
  cancellationReason: string;
  approvedServiceProvider: ObjectId;
  declinedServiceProviders: [ObjectId];
  spApprovedDate: Date;
  sampleReCollectedDate: Date;
  reCollectedSampleSubmittedDate: Date;
  sampleRecollectionIssuedDate: Date;
  sampleCollectedDate: Date;
  sampleSubmittedDate: Date;
  labAssignedDate: Date;
  reportSubmittedDate: Date;
  submittedLab: ObjectId;
}

export interface CustomerTestDecline {
  serviceProvider: ObjectId;
  declineNote: string;
  customerTest: ObjectId;
}
