import { ObjectId, Types } from "mongoose";

interface Address {
  address: string;
  city: string;
  state: string;
  postCode: string;
  country: string;
  lat: number,
  lng: number,
  location: [number]
}

export interface Customer {
  userId: ObjectId;
  passportSizePhoto: ObjectId;
  name: string;
  email: string;
  country: string;
  phone: number;
  emailOtpCount: number;
  phoneOtpCount: number;
  phoneOtpEnteredDate: Date,
  emailOtpEnteredDate: Date,
  primaryAddress: Address;
  secondaryAddress: Address[];
  gender: string;
  idProof: string;
  dateOfBirth: Date;
  nricNumber: string;
  isVerifiedPhoneNumber: Boolean;
  lastVerifiedDate: Date;
  currentDate: Date;
  registrationNumber: number;
  passportNumber: string;
  userRole: string;
  proofIdType: "PASSPORT_NUMBER" | "NRIC_NUMBER";
  password: String;
  lat: number;
  lng: number;
  _id: ObjectId;
}
