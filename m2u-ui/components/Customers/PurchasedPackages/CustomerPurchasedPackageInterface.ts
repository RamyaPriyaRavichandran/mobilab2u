export interface CustomerPurchasedPackageInterface {
  customer: {
    name: string
    phone: number
    gender: string
    email: string
    postCode: number
    nricNumber: string
    address: string
    state: string
    city: string
  }
  payment: {
    paymentStatus: string
  }
  members: []
  packages: {
    type: string
    members: number
    name: string
    serviceType: string
    offerPrice: number
    hspShare: number
    labShare: number
    mobilabShare: number
    customerShare: number
    gpShare: number
  }
  approvedServiceProvider: {
    name: string
    phone: string
    email: string
    address: string
    postCode: number
    state: string
    city: string
    _id: string
    userRole: string
  }
  approvedGpPartner: {
    name: string
    phone: string
    email: string
    address: string
    postCode: number
    state: string
    city: string
    _id: string
    userRole: string
  }
  spApprovedDate: string
  sampleCollectedDate: string
  statusTransaction: { status: string; date: string }[]
  sampleSubmittedDate: string
  reports: []
  submittedLab: {
    name: string
    organization: string
    phone: string
    postCode: number
    city: string
    state: string
    address: string
  }
  customerAppointmentDate: string
  customerAppointmentTime: string
  reportSubmittedDate: string
  customerAddress: string
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
  currentStatus: string
  OTP: {
    originalOTP: string
  }
}
