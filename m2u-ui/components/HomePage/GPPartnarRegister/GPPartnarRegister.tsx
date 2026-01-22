'use client'

import { Formik } from 'formik'
import { usePopup } from '@/lib/contexts/PopupContext'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useSWRMutation from 'swr/mutation'
import { REGISTER_SP } from '@/lib/endpoints'
import { mutater } from '@/lib/fetchers'

import { INPUT_VERIFY_ERROR } from '@/utils/constents'
import { GPRegisterInterface } from './GPAuthenticationInterface'
import { gpRegisterSchema } from './gpRegisterSchema'
import GPFormFields from './GPFormFields'
import { SP_REGISTER_SUCCESS } from '@/utils/constents/routes'

export default function GPPartner() {
  const { showSuccess, showError } = usePopup()
  const Router = useRouter()
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState<boolean>(false)
  const FILE_NAMES = ['mQdocOne', 'mQdocTwo', 'mQdocThree', 'mQdocFour']

  const SubmitForm = (values: GPRegisterInterface) => {
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_50%_50%,_rgb(247_247_247)_50%,_rgb(242_220_204_/21%)_53.333%,_rgb(255_255_255_/43%)_40%,_rgba(242,220,204,0.2)_66.666%,_rgb(255_244_236_/30%)_0%,_rgb(242_220_204_/63%)_99.999%)]">
      <div className="flex justify-center p-4">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-6 text-center">
            <h1 className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-red-600 mb-3">
              Be a GP Partner
            </h1>
          </div>

          <Formik
            initialValues={{
              roles: 'GP_PARTNER',
              userName: '',
              gender: '',
              email: '',
              emailCode: '',
              otp: '',
              phone: '',
              lat: 12345,
              lng: 6789,
              registerNumber: '',
              language: '',
              medicalQualification: '',
              idProof: 'NRIC_NUMBER',
              passportNumber: '',
              nricNumber: '',
              postCode: '',
              address: '',
              address2: '',
              state: '',
              city: '',
              myKad: '',
              eSign: '',
              passportSizePhoto: '',
              supportingDocs: [],
              password: '',
              confirmPassword: '',
              rememberMe: false,
            }}
            validationSchema={gpRegisterSchema}
            onSubmit={(values: GPRegisterInterface, { setSubmitting }) => {
              if (!values.otp || values.emailCode === '') {
                showError(INPUT_VERIFY_ERROR)
              } else SubmitForm(values)
              setSubmitting(false)
            }}
          >
            {({ values, setFieldValue, isValid }) => {
              console.log('emailcode', values.emailCode)
              return (
                <GPFormFields
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
              )
            }}
          </Formik>

          <p className="mt-5 text-sm leading-6 text-gray-500 flex justify-center">
            Already have an account?
            <Link href="/user/login" className="ml-1 font-semibold text-red-600 hover:text-red-700">
              Sign-in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
