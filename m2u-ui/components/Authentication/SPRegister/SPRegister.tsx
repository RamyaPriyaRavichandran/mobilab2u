'use client'
import { Formik } from 'formik'
import { usePopup } from '@/lib/contexts/PopupContext'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useSWRMutation from 'swr/mutation'
import { REGISTER_SP } from '@/lib/endpoints'
import { mutater } from '@/lib/fetchers'
import SparklesText from '../../Animation/SparklesText'
import { SP_LOGIN, SP_REGISTER_SUCCESS } from '@/utils/constents/routes'
import { RegisterInterface } from '../AuthenticationInterface'
import FormFields from './FormFIelds'
import { registerSchema } from './spRegisterSchema'
import { INPUT_VERIFY_ERROR } from '@/utils/constents'

export default function SPRegister() {
  const { showSuccess, showError } = usePopup()
  const Router = useRouter()
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState<boolean>(false)
  const FILE_NAMES = ['mQdocOne', 'mQdocTwo', 'mQdocThree', 'mQdocFour']

  const SubmitForm = (values: RegisterInterface) => {
    const formData = new FormData()
    formData.append('data', JSON.stringify(values))
    values.supportingDocs.map((file, idx: number) => formData.append(FILE_NAMES[idx], file))
    formData.append('passportSizePhoto', values.passportSizePhoto)
    formData.append('myKad', values.myKad)
    formData.append('eSign', values.eSign)
    return post(formData)
  }

  const { trigger: post, isMutating: postMutating } = useSWRMutation(
    REGISTER_SP,
    mutater<FormData, { message: string }>('POST', true),
    {
      onSuccess: ({ data: { message = '' } = {} }) => {
        showSuccess(message)
        Router.push(SP_REGISTER_SUCCESS)
      },
      onError: ({ response: { data: { message = '' } = {} } }) => {
        showError(message)
      },
      throwOnError: false,
    }
  )

  return (
    <div className="min-h-screen">
      <div className="flex justify-center ">
        <div className="md:w-[65%] w-[375px] sm:w-full">
          <div className="mx-auto md:px-5 px-10 pb-6 my-2">
            <SparklesText text="Partner Registration" className="text-2xl sm:text-5xl mb-10" />
            <div className="mt-4">
              <div>
                <Formik
                  initialValues={{
                    roles: '',
                    userName: '',
                    gender: '',
                    email: '',
                    emailCode: '',
                    otp: '',
                    lat: 12345,
                    lng: 6789,
                    address: '',
                    address2: '',
                    supportingDocs: [],
                    city: '',
                    state: '',
                    postCode: '',
                    phone: '',
                    language: '',
                    medicalQualification: '',
                    other: '',
                    mQdocOne: '',
                    mQdocTwo: '',
                    mQdocThree: '',
                    mQdocFour: '',
                    passportSizePhoto: '',
                    eSign: '',
                    registerNumber: '',
                    myKad: '',
                    password: '',
                    confirmPassword: '',
                    rememberMe: false,
                    idProof: 'NRIC_NUMBER',
                    nricNumber: '',
                    passportNumber: '',
                  }}
                  validationSchema={registerSchema}
                  onSubmit={(values: RegisterInterface, { setSubmitting }) => {
                    if (!values.otp || values.emailCode === '') {
                      showError(INPUT_VERIFY_ERROR)
                    } else SubmitForm(values)
                    setSubmitting(false)
                  }}
                >
                  {({ values, setFieldValue, isValid }) => (
                    <FormFields
                      values={values}
                      setFieldValue={setFieldValue}
                      isValid={isValid}
                      email={email}
                      otp={otp}
                      showError={showError}
                      setEmail={setEmail}
                      postMutating={postMutating}
                      showSuccess={showSuccess}
                      setOtp={setOtp}
                    />
                  )}
                </Formik>
              </div>
              <p className="mt-5 text-sm leading-6 text-gray-500 flex justify-center">
                Already have an account?
                <Link href={SP_LOGIN} className="ml-1 font-semibold text-brand-600 hover:text-brand-700">
                  Sign-in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
