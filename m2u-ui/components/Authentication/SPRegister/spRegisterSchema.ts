import {
  INPUT_ADDRESS_ERROR,
  INPUT_CITY_ERROR,
  INPUT_CONFIRM_PASSWORD_REQUIRED,
  INPUT_EMAIL_CODE_ERROR,
  INPUT_ESIGN_ERROR,
  INPUT_GENDER_ERROR,
  INPUT_ID_REQUIRED,
  INPUT_INVALID_EMAIL_ERROR,
  INPUT_MAX_4_FILE,
  INPUT_MEDICAL_QUALIFICATION,
  INPUT_MIN_2_FILE,
  INPUT_MYKAD_DOCUMNET,
  INPUT_NAME_ERROR,
  INPUT_NRIC,
  INPUT_NRIC_Max_ERROR,
  INPUT_NRIC_MIN_ERROR,
  INPUT_OTP_ERROR,
  INPUT_PASSPORT,
  INPUT_PASSPORT_MAX,
  INPUT_PASSPORT_MIN,
  INPUT_PASSPORTSIZEPHOTO_ERROR,
  INPUT_PASSWORD_REQUIRED,
  INPUT_PHONE_NUMBER,
  INPUT_PHONE_NUMBER_MAX,
  INPUT_PHONE_NUMBER_MIN,
  INPUT_POSTCODE_ERROR,
  INPUT_POSTCODE_MAX_ERROR,
  INPUT_POSTCODE_MIN_ERROR,
  INPUT_REQUIRED,
  INPUT_RGISTER_NUMBER_ERROR,
  INPUT_STATE_ERROR,
  INPUT_VERIFY_ERROR,
  MAX_50_CHAR,
  MIN_8_CHAR,
  PASSWORD_MATCH,
} from '@/utils/constents'
import * as Yup from 'yup'
export const registerSchema = Yup.object().shape({
  roles: Yup.string().required(INPUT_REQUIRED),
  userName: Yup.string().required(INPUT_NAME_ERROR),
  email: Yup.string().email(INPUT_INVALID_EMAIL_ERROR).required(INPUT_VERIFY_ERROR),
  gender: Yup.string().required(INPUT_GENDER_ERROR),
  phone: Yup.string().min(10, INPUT_PHONE_NUMBER_MIN).max(11, INPUT_PHONE_NUMBER_MAX).required(INPUT_PHONE_NUMBER),
  postCode: Yup.string()
    .min(5, INPUT_POSTCODE_MIN_ERROR)
    .max(5, INPUT_POSTCODE_MAX_ERROR)
    .required(INPUT_POSTCODE_ERROR),
  address: Yup.string().required(INPUT_ADDRESS_ERROR),
  address2: Yup.string().required(INPUT_ADDRESS_ERROR),
  city: Yup.string().required(INPUT_CITY_ERROR),
  state: Yup.string().required(INPUT_STATE_ERROR),

  medicalQualification: Yup.string().required(INPUT_MEDICAL_QUALIFICATION),
  idProof: Yup.string().required(INPUT_ID_REQUIRED),
  passportNumber: Yup.string().when('idProof', {
    is: 'PASSPORT_NUMBER',
    then: () => Yup.string().required(INPUT_PASSPORT).min(6, INPUT_PASSPORT_MIN).max(9, INPUT_PASSPORT_MAX),
  }),
  nricNumber: Yup.string().when('idProof', {
    is: 'NRIC_NUMBER',
    then: () => Yup.string().min(12, INPUT_NRIC_MIN_ERROR).max(12, INPUT_NRIC_Max_ERROR).required(INPUT_NRIC),
  }),
  supportingDocs: Yup.array().min(2, INPUT_MIN_2_FILE).required(INPUT_REQUIRED).max(4, INPUT_MAX_4_FILE),
  other: Yup.string().when('medicalQualification', {
    is: 'OTHERS',
    then: () => Yup.string().required(INPUT_REQUIRED),
  }),
  language: Yup.string().when('roles', {
    is: 'GP_PARTNER',
    then: () => Yup.string().required(INPUT_REQUIRED),
  }),
  passportSizePhoto: Yup.mixed().required(INPUT_PASSPORTSIZEPHOTO_ERROR),
  eSign: Yup.string().when('roles', {
    is: 'GP_PARTNER',
    then: () => Yup.mixed().required(INPUT_ESIGN_ERROR),
  }),
  registerNumber: Yup.string().when('roles', {
    is: 'GP_PARTNER',
    then: () => Yup.mixed().required(INPUT_RGISTER_NUMBER_ERROR),
  }),
  myKad: Yup.mixed().required(INPUT_MYKAD_DOCUMNET),
  password: Yup.string().min(8, MIN_8_CHAR).max(50, MAX_50_CHAR).required(INPUT_PASSWORD_REQUIRED),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], PASSWORD_MATCH)
    .required(INPUT_CONFIRM_PASSWORD_REQUIRED),
  rememberMe: Yup.bool().oneOf([true], INPUT_REQUIRED),
  emailCode: Yup.string().when('otp', {
    is: (value: boolean) => value === true,
    then: () => Yup.string().min(6, INPUT_OTP_ERROR).max(6, INPUT_OTP_ERROR).required(INPUT_EMAIL_CODE_ERROR),
  }),
})
