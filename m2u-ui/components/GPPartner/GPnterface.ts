import { BASIC_STATUS } from '@/utils/constents'
import { Dispatch, SetStateAction } from 'react'

export interface GPBasics {
  gender: string
  _id: string
  createdAt: string
  activeStatus: string
  adminApprovalStatus: string
  others: string
  registerNumber: string
  userRole: string
  medicalQualification: string
  name: string
  language: string
  email: string
  phone: string
  deactivateNote: string
  nricNumber: string
  passportNumber: string
  address: string
  other: string
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
export interface UpdateProfileData {
  name: string
  phone: number | string
  city: string
  state: string
  address: string
  userId: string
  userRole: string
  postCode: number | string
}

export interface StateInterface {
  popup: boolean
  mode: 'view' | 'edit' | null
  data: any
}
export interface FormValuesProps {
  values: any
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
  eSign: File | null
  setESign: React.Dispatch<React.SetStateAction<File | null>>
  handleESignUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  eSignPreview?: string | null
}

export interface GPDetail {
  setForm: Dispatch<SetStateAction<StateInterface>>
  hspMutating: boolean
  isMutating: boolean
  form: { data: GPBasics }
  reviewGPPartner: ({ adminApprovalStatus }: { adminApprovalStatus: string }) => void
  reviewGP: (values: {
    status: BASIC_STATUS.ACTIVE | BASIC_STATUS.DE_ACTIVE
    userId: string
    userRole: 'GP_PARTNER'
    note?: string
  }) => void
}
