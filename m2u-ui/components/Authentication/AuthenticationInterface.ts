export interface ChangepasswordInterface {
  password: string
  confirmPassword?: string
  passwordResetToken: string | null
}

export interface ResetpasswordInterface {
  currentPassword: string
  password: string
  confirmPassword?: string
}
export interface RegisterInterface {
  roles: string
  userName: string
  email: string
  emailCode: string
  otp: string
  postCode: string
  address: string
  address2: string
  state: string
  city: string
  nricNumber: string
  medicalQualification: string
  idProof: string
  passportNumber: string
  supportingDocs: Array<File>
  other: string
  mQdocOne: File | string
  mQdocTwo: File | string
  mQdocThree: File | string
  mQdocFour: File | string
  eSign: File | string
  registerNumber: string
  passportSizePhoto: File | string
  myKad: File | string
  phone: string
  password: string
  confirmPassword: unknown | string
  rememberMe: unknown | boolean
}
export interface FormFieldsInterface {
  values: RegisterInterface
  postMutating: boolean
  email: string
  otp: boolean
  setOtp: React.Dispatch<React.SetStateAction<boolean>>
  isValid: boolean
  setFieldValue: (field: string, value: boolean, shouldValidate?: boolean) => void
  setEmail: React.Dispatch<React.SetStateAction<string>>
  showError: (message: string) => void
  showSuccess: (message: string) => void
}

export interface PersonalInformationInterface {
  EmailVerification: Function
  isMutating: boolean
  values: RegisterInterface
  email: string
  otp: boolean
  setFieldValue: (field: string, value: boolean, shouldValidate?: boolean) => void
}
export interface PersonalCustomerInterface {
  EmailVerification: Function
  isMutating: boolean
  values: CustomerRegisterInterface
  email: string
  otp: boolean
  setFieldValue: (field: string, value: boolean, shouldValidate?: boolean) => void
}
export interface CustomerRegisterInterface {
  name: string
  email: string
  gender: string
  dateOfBirth: string
  address: string
  idProof: string
  lat: number
  emailCode: string
  confirmPassword: string
  phone: string
  state: string
  city: string
  postCode: string
  nricNumber: string
  otp: string
  lng: number
  password: string
}
export interface CustomerFormFields {
  values: CustomerRegisterInterface
  postMutating: boolean
  email: string
  otp: boolean
  setOtp: React.Dispatch<React.SetStateAction<boolean>>
  isValid: boolean
  setFieldValue: (field: string, value: boolean, shouldValidate?: boolean) => void
  setEmail: React.Dispatch<React.SetStateAction<string>>
  showError: (message: string) => void
  showSuccess: (message: string) => void
}
export interface LoginFormInterface {
  email: string
  password: string
  userRole: string
}
