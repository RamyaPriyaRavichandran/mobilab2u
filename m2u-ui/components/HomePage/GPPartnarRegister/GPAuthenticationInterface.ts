export interface GPRegisterInterface {
  roles: string
  userName: string
  gender: string
  email: string
  emailCode: string
  otp: string
  phone: string
  language: string
  idProof: string
  registerNumber: string
  passportNumber: string
  medicalQualification: string
  nricNumber: string
  postCode: string
  address: string
  address2: string
  state: string
  city: string
  myKad: string | File
  eSign: string | File
  passportSizePhoto: string | File
  supportingDocs: File[]
  password: string
  confirmPassword: string
  rememberMe: boolean
}

export interface GPFormFieldsProps {
  values: GPRegisterInterface
  setFieldValue: (field: string, value: any) => void
  isValid: boolean
  email: string
  otp: boolean
  showError: (message: string) => void
  setEmail: (email: string) => void
  postMutating: boolean
  showSuccess: (message: string) => void
  setOtp: (otp: boolean) => void
}

export interface GPPersonalInformationProps {
  values: GPRegisterInterface
  setFieldValue: (field: string, value: any) => void
  handleSendOtp: () => void
  verifyClicked: boolean
  otp: boolean
  email: string
  setOtp: (otp: boolean) => void
  otpMutating: boolean
}
