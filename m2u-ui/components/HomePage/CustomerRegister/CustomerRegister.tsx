'use client'

import { Formik } from 'formik'
import { usePopup } from '@/lib/contexts/PopupContext'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useSWRMutation from 'swr/mutation'
import { REGISTER_C } from '@/lib/endpoints'
import { mutater } from '@/lib/fetchers'
import { SP_LOGIN } from '@/utils/constents/routes'
import type { CustomerRegisterInterface } from './AuthenticationInterface'
import FormFields from './FormFields'
import { CRegisterSchema } from './CRegisterSchema'
import { INPUT_VERIFY_ERROR } from '@/utils/constents'

export default function CustomerRegister() {
  const { showSuccess, showError } = usePopup()
  const Router = useRouter()
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState(false)

  const SubmitForm = (values: CustomerRegisterInterface) => {
    return RegisterFields(values)
  }

  const { trigger: RegisterFields, isMutating: postMutating } = useSWRMutation(
    REGISTER_C,
    mutater<CustomerRegisterInterface, { message: string }>('POST'),
    {
      onSuccess: ({ data: { message = '' } = {} }) => {
        showSuccess(message)
        Router.push(SP_LOGIN)
      },
      onError: ({ response: { data: { message = '' } = {} } }) => {
        showError(message)
      },
      throwOnError: false,
    }
  )

  return (
    <main>
      <section className="flex md:min-h-screen w-full bg-[#fef1e7]">
        <div className="flex flex-col md:flex-row w-full">
          {/* Left: Signup Form Section */}
          <div className="w-full md:max-w-md lg:max-w-full bg-white p-6 xl:p-8 flex flex-col justify-center h-auto rounded-xl shadow-md border border-gray-200 md:max-h-fit md:m-auto lg:mx-0 xl:rounded-none lg:shadow-none lg:border-0 xl:w-2/3 2xl:w-2/3 lg:w-1/2 lg:h-full lg:max-h-full">
            {/* Logo */}
            <div className="flex justify-center lg:mb-0 xl:mb-2">
              <img src="/assets/images/svg/mobilab2u-icon.svg" alt="Signup Icon" className="w-24 h-24" />
            </div>

            <h2 className="text-[18px] sm:text-lg lg:text-xl xl:text-2xl font-semibold text-center mb-4">Signup</h2>

            {/* Formik Form */}
            <div className="mt-4">
              <Formik
                initialValues={{
                  name: '',
                  gender: '',
                  email: '',
                  dateOfBirth: '',
                  otp: '',
                  address: '',
                  city: '',
                  lat: 12345,
                  lng: 67890,
                  state: '',
                  postCode: '',
                  phone: '',
                  password: '',
                  idProof: 'NRIC_NUMBER',
                  emailCode: '',
                  rememberMe: false,
                  nricNumber: '',
                  confirmPassword: '',
                  passportNumber: '',
                }}
                enableReinitialize
                validationSchema={CRegisterSchema}
                onSubmit={(values: CustomerRegisterInterface, { setSubmitting }) => {
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

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href={SP_LOGIN} className="text-red-600 font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          {/* Right: Full Background Image Section */}
          <div
            className="hidden xl:flex w-full xl:w-2/3 lg:w-1/2 bg-cover bg-center lg:block"
            style={{ backgroundImage: "url('/assets/images/register/register-mobilab2u.webp')" }}
          />
        </div>
      </section>
    </main>
  )
}
