import {
  DOB_REQUIRED,
  INPUT_ADDRESS_ERROR,
  INPUT_CITY_ERROR,
  INPUT_CONFIRM_PASSWORD_REQUIRED,
  INPUT_EMAIL_CODE_ERROR,
  INPUT_GENDER_ERROR,
  INPUT_IDPROOF_ERROR,
  INPUT_INVALID_EMAIL_ERROR,
  INPUT_NAME_ERROR,
  INPUT_NRIC,
  INPUT_NRIC_Max_ERROR,
  INPUT_NRIC_MIN_ERROR,
  INPUT_OTP_ERROR,
  INPUT_PASSPORT,
  INPUT_PASSPORT_MAX,
  INPUT_PASSPORT_MIN,
  INPUT_PASSWORD_REQUIRED,
  INPUT_PHONE_NUMBER,
  INPUT_PHONE_NUMBER_MAX,
  INPUT_PHONE_NUMBER_MIN,
  INPUT_POSTCODE_ERROR,
  INPUT_POSTCODE_MAX_ERROR,
  INPUT_POSTCODE_MIN_ERROR,
  INPUT_REQUIRED,
  INPUT_STATE_ERROR,
  INPUT_VERIFY_ERROR,
  MAX_50_CHAR,
  MIN_8_CHAR,
  MIN_AGE,
  PASSWORD_MATCH,
} from '@/utils/constents'
import * as Yup from 'yup'

export const CRegisterSchema = Yup.object().shape({
  name: Yup.string().required(INPUT_NAME_ERROR),
  email: Yup.string().email(INPUT_INVALID_EMAIL_ERROR).required(INPUT_VERIFY_ERROR),
  gender: Yup.string().required(INPUT_GENDER_ERROR),
  idProof: Yup.string().required(INPUT_IDPROOF_ERROR),
  address: Yup.string().required(INPUT_ADDRESS_ERROR),
  lat: Yup.number().required(INPUT_REQUIRED),
  lng: Yup.number().required(INPUT_REQUIRED),
  password: Yup.string().min(8, MIN_8_CHAR).max(50, MAX_50_CHAR).required(INPUT_PASSWORD_REQUIRED),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], PASSWORD_MATCH)
    .required(INPUT_CONFIRM_PASSWORD_REQUIRED),
  city: Yup.string().required(INPUT_CITY_ERROR),
  state: Yup.string().required(INPUT_STATE_ERROR),
  dateOfBirth: Yup.date()
    .required(DOB_REQUIRED)
    .max(
      new Date(new Date().setFullYear(new Date().getFullYear() - MIN_AGE)),
      `You must be at least ${MIN_AGE} years old`
    ),
  passportNumber: Yup.string().when('idProof', {
    is: 'PASSPORT_NUMBER',
    then: () => Yup.string().required(INPUT_PASSPORT).min(6, INPUT_PASSPORT_MIN).max(9, INPUT_PASSPORT_MAX),
  }),
  nricNumber: Yup.string().when('idProof', {
    is: 'NRIC_NUMBER',
    then: () => Yup.string().min(12, INPUT_NRIC_MIN_ERROR).max(12, INPUT_NRIC_Max_ERROR).required(INPUT_NRIC),
  }),
  phone: Yup.string().min(10, INPUT_PHONE_NUMBER_MIN).max(11, INPUT_PHONE_NUMBER_MAX).required(INPUT_PHONE_NUMBER),
  postCode: Yup.string()
    .min(5, INPUT_POSTCODE_MIN_ERROR)
    .max(5, INPUT_POSTCODE_MAX_ERROR)
    .required(INPUT_POSTCODE_ERROR),

  rememberMe: Yup.bool().oneOf([true], INPUT_REQUIRED),
  emailCode: Yup.string().when('otp', {
    is: (value: boolean) => value === true,
    then: () => Yup.string().min(6, INPUT_OTP_ERROR).max(6, INPUT_OTP_ERROR).required(INPUT_EMAIL_CODE_ERROR),
  }),
})
