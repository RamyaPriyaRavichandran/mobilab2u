import * as Yup from 'yup'

export const hspRegisterSchema = Yup.object().shape({
  userName: Yup.string().required('Full name is required'),
  gender: Yup.string().required('Gender is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  emailCode: Yup.string().required('Email verification code is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10,15}$/, 'Phone number must be 10-15 digits')
    .required('Phone number is required'),
  medicalQualification: Yup.string().required('Medical qualification is required'),
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
  postCode: Yup.string().required('Post code is required'),
  address: Yup.string().required('Address is required'),
  address2: Yup.string().required('Address 2 is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),

  myKad: Yup.mixed().required('MyKad is required'),
  passportSizePhoto: Yup.mixed().required('Passport size photo is required'),
  supportingDocs: Yup.array()
    .min(2, 'Minimum 2 supporting documents required')
    .max(4, 'Maximum 4 supporting documents allowed')
    .required('Supporting documents are required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  rememberMe: Yup.boolean().oneOf([true], 'You must agree to the terms and privacy policy'),
})
