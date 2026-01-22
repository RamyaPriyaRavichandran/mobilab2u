import { CUSTOMER_LAB_TEST_STATUS } from '@/utils/constents'
import { Dispatch, SetStateAction } from 'react'
import { CustomerAddress } from './CustomerPackages/interface'

export interface FamilyMember {
  name: string
  age: string
  phone: string
}
export interface PackageDetailInterface {
  id: string
  name: string
  type: string
  serviceType: string
  description: string
  reportTime: string
  testCount: string
  price: number
  members: number
  offerPrice: number
  document: {
    s3URL: string
    localURL: string
  }
}

interface PayConsultationFees {
  packageId: string
  appointmentDate: string
  startTime: string
  endTime: string
  doctorLanguage: string
  nameOne?: string
  documentOne?: File
  nameTwo?: string
  documentTwo?: File
  nameThree?: string
  documentThree?: File
}

export interface DoctorPackageInterface {
  isMutating: boolean
  selectedPackage: any | { _id: string; members: number }
  setPopup: Dispatch<SetStateAction<{ package: any; popup: boolean }>>
  payDoctorFees: (values: FormData) => void
}
export interface FamilyPackageInterface {
  isMutating: boolean
  selectedPackage: any | { _id: string; members: number }
  setPopup: Dispatch<SetStateAction<{ package: any; popup: boolean }>>
  payTestFees: (values: {
    packageId: string
    customerAppointmentDate: string
    customerAppointmentTime: string
    customerAddress: CustomerAddress
    members: { name: string; age: number; gender: string }[]
  }) => void
}

export interface IndividualPackageInterface {
  selectedPackage: { _id: string }
  isMutating: boolean
  payTestFees: (values: {
    packageId: string
    customerAppointmentDate: string
    customerAppointmentTime: string
    customerAddress: string
    members: []
  }) => void
  setPopup: Dispatch<SetStateAction<{ popup: boolean; package: {} }>>
}

export interface PopupPackageInterface {
  selectedPackage: any | { _id: string; members: number }
  isMutating: boolean
  feesMutating: boolean
  setPopup: Dispatch<SetStateAction<{ popup: boolean; package: {} }>>
  payTestFees: (values: {
    packageId: string
    customerAppointmentDate: string
    customerAppointmentTime: string
    customerAddress: CustomerAddress
    members: { name: string; age: number; gender: string }[]
  }) => void
  payDoctorFees: (values: FormData) => void
}

interface test {
  _id: string
  status: string
}

export interface testState {
  popup: boolean
  test: any
}

export interface SPReviewValues {
  declineNote: string
  status: string
  testId: string
  labId: string
  otp?: string
}

export interface LabReviewValues {
  status: string
  reason: string
  reportDocs: any
  testId: string
}

export interface SpReviewInterface {
  isMutating: boolean
  testError: string
  test: {
    popup: boolean
    test: {
      _id: string
      statusTransaction: {
        status: string
        date: number
      }[]
    }
  }
  roles: string
  setTest: Dispatch<
    SetStateAction<{
      popup: boolean
      test: {
        _id: string
        statusTransaction?: {
          status: string
          date: number
        }[]
      }
    }>
  >
  reviewTest: (values: { declineNote: string; status: string; testId: string; labId: string }) => void
}

export interface LabReviewInterface {
  testError: string
  submitReports: (reportDocs: File[] | any) => void
  test: {
    popup: boolean
    test: {
      _id: string
      statusTransaction?: {
        status: string
        date: number
      }[]
      members: []
      packages: {
        members?: number
      }
    }
  }
  postMutating: boolean
  roles: string
  setTest: Dispatch<
    SetStateAction<{
      popup: boolean
      test: {
        _id: string
        statusTransaction?: {
          status: string
          date: number
        }[]
      }
    }>
  >
  reviewTest: (values: { status: string; reason: string }) => void
}

export interface TableOriginalInterface {
  _id: string
  statusTransaction: { status: string; date: string }[]
  declinedServiceProviders: string
  submittedLab: {
    name: string
    state: string
    city: string
    postCode: number
  }
  packages: {
    members: number
    offerPrice: number
  }
  currentStatus: string
  reports: []
  payment: {
    paymentStatus: string
  }
}
export interface TableInterface {
  row: {
    index: number
    original: TableOriginalInterface
  }
}

export interface ReviewPopupInterface {
  test: any
  setTest: Dispatch<any>
  isMutating?: boolean
  postMutating?: boolean
  testError: string
  submitReports: (reportDocs: File[] | any) => void

  reviewTest: (values: { declineNote?: string; status: string; testId?: string; labId?: string }) => void
}

export interface CustomerUpdateProfileFormValues {
  name: string
  phone: string
  email: string
  primaryAddress: Address
  secondaryAddress: Address[]
  dateOfBirth: string // ISO date string (YYYY-MM-DD)
  nricNumber: string
  idProof: 'NRIC_NUMBER' | 'PASSPORT_NUMBER' // only 2 possible values
  passportNumber: string
  otp: string
  isOtpSended: boolean
  phoneOtpEnteredDate: string
}

export interface FormValuesProps {
  values: CustomerUpdateProfileFormValues
  otpCountdown: number
  setOtpCountdown: React.Dispatch<React.SetStateAction<number>>
  data: any
  mutate: () => void
  setOtpSent: React.Dispatch<React.SetStateAction<boolean>>
  otpSent: boolean
  isMutating: boolean
  canChangePhoneNumber: boolean
  setCanChangePhoneNumber: React.Dispatch<React.SetStateAction<boolean>>
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

export interface Address {
  address: string
  city: string
  state: string
  postCode: string
  lat: number
  lng: number
  _id?: string
}

export interface Customer {
  userId: string
  name: string
  email: string
  phone: number
  primaryAddress: Address
  address: string
  city: string
  state: string
  postCode: string
  country: string
  secondaryAddress: Address[]
  gender: string
  idProof: string
  phoneOtpCount: number
  dateOfBirth: string
  nricNumber: string
  isVerifiedPhoneNumber: Boolean
  lastVerifiedDate: Date
  phoneOtpEnteredDate: string
  registrationNumber: number
  passportNumber: string
  userRole: string
  proofIdType: 'PASSPORT_NUMBER' | 'NRIC_NUMBER'
  password: String
  lat: number
  lng: number
  _id: string
  passportSizePhoto?: { s3URL?: string } | null
}
