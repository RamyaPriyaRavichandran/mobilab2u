import { ObjectId } from "mongoose"

export interface ServiceProvider {
    _id: ObjectId
    userId: Types.ObjectId
    adminApprovalStatus: string
    paymentStatus: string
    activeStatus: string
    name: string,
    email: string,
    phoneOtpCount: number,
    emailOtpCount: number,
    phoneOtpEnteredDate: Date,
    emailOtpEnteredDate: Date,
    userRole: string,
    country: string,
    nricNumber: string,
    language: String,
    idProof: string,
    passportNumber: string,
    city: string,
    state: string,
    deactivateNote: string,
    country: string,
    password: string,
    address2: string,
    phone: number,
    lat: number,
    lng: number,
    location: number[],
    postCode: string,
    paidKitfeesPrice: number,
    actualKitFeesPrice: number,
    isVerifiedPhoneNumber: Boolean,
    lastVerifiedDate: Date,
    gender: string,
    address: string,
    medicalQualification: string,
    other?: string,
    mQdocOne: Types.ObjectId,
    mQdocTwo: Types.ObjectId,
    mQdocThree: Types.ObjectId,
    registerNumber: string,
    eSign: Types.ObjectId,
    mQdocFour: Types.ObjectId,
    passportSizePhoto: Types.ObjectId,
    myKad: Types.ObjectId,
}
