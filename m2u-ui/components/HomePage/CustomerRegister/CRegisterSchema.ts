import { DOB_REQUIRED, MIN_AGE } from '@/utils/constents'
import * as Yup from 'yup'

export const CRegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),

  gender: Yup.string()
    .oneOf(['MALE', 'FEMALE', 'OTHER'], 'Please select a valid gender')
    .required('Gender is required'),

  email: Yup.string().email('Invalid email address').required('Email is required'),

  dateOfBirth: Yup.date()
    .required(DOB_REQUIRED)
    .max(
      new Date(new Date().setFullYear(new Date().getFullYear() - MIN_AGE)),
      `You must be at least ${MIN_AGE} years old`
    ),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),

  idProof: Yup.string().required('ID proof type is required'),

  nricNumber: Yup.string().when('idProof', {
    is: (val: string) => val === 'NRIC_NUMBER' || val === '',
    then: (schema) => schema.required('NRIC number is required'),
    otherwise: (schema) => schema.notRequired(),
  }),

  passportNumber: Yup.string().when('idProof', {
    is: 'PASSPORT_NUMBER',
    then: (schema) => schema.required('Passport number is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  state: Yup.string()
    .min(2, 'State must be at least 2 characters')
    .max(50, 'State must be less than 50 characters')
    .required('State is required'),

  city: Yup.string()
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must be less than 50 characters')
    .required('City is required'),

  address: Yup.string()
    .min(5, 'Address must be at least 5 characters long')
    .max(150, 'Address must be less than 150 characters')
    .required('Address is required'),

  postCode: Yup.string()
    .matches(/^[0-9]{5}$/, 'Post code must be 5 digits')
    .required('Post code is required'),

  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),

  emailCode: Yup.string().when('otp', {
    is: true,
    then: (schema) => schema.required('Email and Code is required'),
    otherwise: (schema) => schema.notRequired(),
  }),

  rememberMe: Yup.bool()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions'),
})
