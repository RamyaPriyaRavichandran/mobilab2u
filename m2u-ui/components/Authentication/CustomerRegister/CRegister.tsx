'use client'
import { Formik } from 'formik'
import { usePopup } from '@/lib/contexts/PopupContext'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useSWRMutation from 'swr/mutation'
import { REGISTER_C } from '@/lib/endpoints'
import { mutater } from '@/lib/fetchers'
import SparklesText from '../../Animation/SparklesText'
import { SP_LOGIN } from '@/utils/constents/routes'
import { CustomerRegisterInterface } from '../AuthenticationInterface'
import FormFields from './FormFields'
import { CRegisterSchema } from './CRegisterSchema'
import { INPUT_VERIFY_ERROR } from '@/utils/constents'

export default function CRegister() {
  const { showSuccess, showError } = usePopup()
  const Router = useRouter()
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState(false)

  const SubmitForm = (values: CustomerRegisterInterface) => {
    return RegisterFeilds(values)
  }

  const { trigger: RegisterFeilds, isMutating: postMutating } = useSWRMutation(
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
    <div className="min-h-screen">
      <div className="flex justify-center">
        <div className="md:w-[65%] w-[375px] sm:w-full">
          <div className="mx-auto md:px-5 px-10 pb-6 my-2">
            <SparklesText text="User Registration" className="text-2xl sm:text-5xl mb-10" />
            <div className="mt-4">
              <div>
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
                    idProof: '',
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
