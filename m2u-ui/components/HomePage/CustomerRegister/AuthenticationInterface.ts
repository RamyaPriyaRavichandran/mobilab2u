export interface CustomerRegisterInterface {
  name: string
  gender: string
  email: string
  dateOfBirth: string
  otp: string | boolean
  address: string
  city: string
  lat: number
  lng: number
  state: string
  postCode: string
  phone: string
  password: string
  idProof: string
  emailCode: string
  rememberMe: boolean
  nricNumber: string
  confirmPassword: string
  passportNumber: string
}

export interface CustomerFormFields {
  values: CustomerRegisterInterface
  postMutating: boolean
  email: string
  otp: boolean
  setOtp: (value: boolean) => void
  setFieldValue: (field: string, value: any) => void
  isValid: boolean
  showError: (message: string) => void
  showSuccess: (message: string) => void
  setEmail: (email: string) => void
}

export interface PersonalCustomerInterface {
  EmailVerification: () => void
  isMutating: boolean
  values: CustomerRegisterInterface
  otp: boolean
  isValid?: boolean
  email: string
  setFieldValue: (field: string, value: any) => void
}
