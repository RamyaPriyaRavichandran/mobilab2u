import { BASIC_STATUS } from '@/utils/constents'
import { Dispatch, SetStateAction } from 'react'

export interface ServiceProviderBasics {
  gender: string
  _id: string
  createdAt: string
  activeStatus: string
  adminApprovalStatus: string
  others: string
  userRole: string
  medicalQualification: string
  name: string
  language: string
  email: string
  phone: string
  postCode: string
  deactivateNote: string
  nricNumber: string
  passportNumber: string
  address: string
  other: string
  payment?: {
    paymentDate: string
    amount: number
  }
  mQdocOne: Array<{
    s3URL: string
  }>
  mQdocTwo: Array<{
    s3URL: string
  }>
  mQdocThree: Array<{
    s3URL: string
  }>
  mQdocFour: Array<{
    s3URL: string
  }>
  passportSizePhoto: Array<{
    s3URL: string
  }>
  myKad: Array<{
    s3URL: string
  }>
  eSign: Array<{
    s3URL: string
  }>
}

export interface StateInterface {
  popup: boolean
  mode: 'view' | 'edit' | null
  data: any
}

export interface UpdateProfileData {
  name: string
  phone: number | string
  city: string
  state: string
  address: string
  userId: string
  userRole: string
  postCode: string
}

export interface FormValuesProps {
  otpCountdown: number
  setOtpCountdown: React.Dispatch<React.SetStateAction<number>>
  values: any
  mutate: () => void
  data: any
  setOtpSent: React.Dispatch<React.SetStateAction<boolean>>
  otpSent: boolean
  isMutating: boolean
  canChangePhoneNumber: boolean
  setCanChangePhoneNumber: React.Dispatch<React.SetStateAction<boolean>>
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

export interface HSPDetailInterface {
  setForm: Dispatch<SetStateAction<StateInterface>>
  hspMutating: boolean
  isMutating: boolean
  form: { data: ServiceProviderBasics }
  reviewServiceProvider: ({ adminApprovalStatus }: { adminApprovalStatus: string }) => void
  reviewHSP: (values: {
    status: BASIC_STATUS.ACTIVE | BASIC_STATUS.DE_ACTIVE
    userId: string
    note?: string
    userRole: string
  }) => void
}

export interface EditFormInterface {
  setShowPopup: (val: boolean) => void
  initialData: UpdateProfileData
  mutate: () => void
  setForm: React.Dispatch<React.SetStateAction<any>>
}

export interface TableData {
  row: {
    index: number
    original: {
      _id: string
      adminApprovalStatus: string
      userRole: number
      activeStatus: string
      nricNumber: string
      passportNumber: string
    }
  }
}
