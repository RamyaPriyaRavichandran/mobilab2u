import { CustomerAddress } from '../CustomerPackages/interface'

export interface Customer {
  name: string
  phone: number
  gender: string
  email: string
  postCode: number
  nricNumber: string
  primaryAddress: {
    address: string
    state: string
    city: string
    postCode: string
  }
}

export interface Package {
  type: string
  members?: number
  name: string
  serviceType: string
  offerPrice: number
}

export interface ServiceProvider {
  name: string
  phone: string
  email: string
  address: string
  postCode: number
  state: string
  city: string
  userRole: string
  _id: string
}

export interface LabDetail {
  name: string
  phone: string
  organization: string
  address: string
  city: string
  state: string
  postCode: number
  sampleRecollectionReason: string
}
export interface CustomerTestDetailsInterface {
  customer: Customer
  payment: {
    paymentStatus: string
  }
  currentStatus: string
  packages?: Package
  approvedServiceProvider: ServiceProvider
  approvedGpPartner: ServiceProvider
  spApprovedDate: string
  sampleCollectedDate: string
  sampleSubmittedDate: string
  members: []
  reports: []
  submittedLab: LabDetail
  customerAppointmentDate: string
  customerAppointmentTime: string
  reportSubmittedDate: string
  customerAddress: CustomerAddress
  gender: string
  createdAt: string
  adminApprovalStatus: string
  others: string
  medicalQualification: string
  name: string
  email: string
  phone: string
  nricNumber: string
  address: string
  other: string
  statusTransaction: { status: string; date: string }[]
  OTP: {
    originalOTP: string
  }
  cancellationReason?: string
}
