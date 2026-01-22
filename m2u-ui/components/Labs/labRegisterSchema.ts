import {
  INPUT_ADDRESS_ERROR,
  INPUT_CITY_ERROR,
  INPUT_CONFIRM_PASSWORD_REQUIRED,
  INPUT_GENDER_ERROR,
  INPUT_INVALID_EMAIL_ERROR,
  INPUT_NAME,
  INPUT_NAME_ERROR,
  INPUT_ORGANIZATION_ERROR,
  INPUT_PASSWORD_REQUIRED,
  INPUT_PHONE_NUMBER,
  INPUT_PHONE_NUMBER_MAX,
  INPUT_PHONE_NUMBER_MIN,
  INPUT_POSTCODE_ERROR,
  INPUT_POSTCODE_MAX_ERROR,
  INPUT_POSTCODE_MIN_ERROR,
  INPUT_STATE_ERROR,
  INPUT_VERIFY_ERROR,
  MAX_50_CHAR,
  MIN_8_CHAR,
  PASSWORD_MATCH,
} from '@/utils/constents'
import * as Yup from 'yup'
export const labregisterSchema = Yup.object().shape({
  name: Yup.string().required(INPUT_NAME),
  email: Yup.string().email(INPUT_INVALID_EMAIL_ERROR).required(INPUT_VERIFY_ERROR),
  phone: Yup.string().min(10, INPUT_PHONE_NUMBER_MIN).max(11, INPUT_PHONE_NUMBER_MAX).required(INPUT_PHONE_NUMBER),
  organization: Yup.string().required(INPUT_ORGANIZATION_ERROR),
  postCode: Yup.string()
    .min(5, INPUT_POSTCODE_MIN_ERROR)
    .max(5, INPUT_POSTCODE_MAX_ERROR)
    .required(INPUT_POSTCODE_ERROR),
  address: Yup.string().required(INPUT_ADDRESS_ERROR),
  city: Yup.string().required(INPUT_CITY_ERROR),
  state: Yup.string().required(INPUT_STATE_ERROR),
  password: Yup.string().min(8, MIN_8_CHAR).max(50, MAX_50_CHAR).required(INPUT_PASSWORD_REQUIRED),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], PASSWORD_MATCH)
    .required(INPUT_CONFIRM_PASSWORD_REQUIRED),
})
