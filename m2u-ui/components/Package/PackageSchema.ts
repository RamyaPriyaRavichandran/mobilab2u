import { INPUT_MEMBERS, INPUT_PLAN_NAME, INPUT_REQUIRED } from '@/utils/constents'
import * as Yup from 'yup'
export const packageSchema = Yup.object().shape({
  name: Yup.string().required(INPUT_PLAN_NAME),

  serviceType: Yup.string().required(INPUT_REQUIRED),
  type: Yup.string().when('serviceType', {
    is: 'TEST',
    then: () => Yup.string().required(INPUT_REQUIRED),
  }),
  members: Yup.number().when('type', {
    is: 'FAMILY',
    then: () => Yup.number().required(INPUT_REQUIRED).min(2, INPUT_MEMBERS),
  }),
  duration: Yup.string().when('serviceType', {
    is: 'TEST',
    then: () => Yup.string().required(INPUT_REQUIRED),
  }),
  price: Yup.number().required(INPUT_REQUIRED),
  offerPrice: Yup.number().required(INPUT_REQUIRED),
  labShare: Yup.number().when('serviceType', {
    is: 'TEST',
    then: () => Yup.number().required(INPUT_REQUIRED),
  }),
  hspShare: Yup.number().when('serviceType', {
    is: 'TEST',
    then: () => Yup.number().required(INPUT_REQUIRED),
  }),
  gpShare: Yup.number().when('serviceType', {
    is: 'APPOINTMENT',
    then: () => Yup.number().required(INPUT_REQUIRED),
  }),
  customerShare: Yup.number().when('serviceType', {
    is: (val: string) => ['APPOINTMENT', 'TEST'].includes(val),
    then: () => Yup.number().required(INPUT_REQUIRED),
  }),
  mobilabShare: Yup.number().when('serviceType', {
    is: (val: string) => ['APPOINTMENT', 'TEST'].includes(val),
    then: () => Yup.number().required(INPUT_REQUIRED),
  }),
  description: Yup.string().required(INPUT_REQUIRED),
  image: Yup.mixed()
    .required('Image is required')
    .test('fileType', 'Only JPG/PNG images are allowed', (value) => {
      return value && ['image/jpeg', 'image/png'].includes((value as File).type)
    }),
})
