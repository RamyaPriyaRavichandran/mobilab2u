import useSWRMutation from 'swr/mutation'
import { CustomerFormFields } from '../AuthenticationInterface'
import { OTP } from '@/lib/endpoints'
import { mutater } from '@/lib/fetchers'
import { Form } from 'formik'
import CheckboxInput from '@/components/common/Input/CheckboxInput'
import city from '@/utils/constents/stateCity.json'
import PersonalInformation from './PersonalInformation'
import { INPUT_INVALID_EMAIL_ERROR } from '@/utils/constents'
import { useState } from 'react'
import DashLoader from '@/components/common/DashLoader'

export default function FormFields({
  values,
  postMutating,
  email,
  otp,
  setOtp,
  setFieldValue,
  isValid,
  showError,
  showSuccess,
  setEmail,
}: CustomerFormFields) {
  const [form, setForm] = useState(false)
  const { trigger: sendOtp, isMutating } = useSWRMutation(
    OTP,
    mutater<{ email: string; userRole: string }, { message: string }>('POST'),
    {
      onSuccess: ({ data: { message = '' } = {} }) => {
        showSuccess(message)
        setOtp(true)
        setFieldValue('otp', true)
      },
      onError: ({ response: { data: { message = '' } = {} } }) => {
        showError(message)
      },
      throwOnError: false,
    }
  )

  function EmailVerification() {
    if (values.email === '') {
      return showError(INPUT_INVALID_EMAIL_ERROR)
    }
    sendOtp({
      email: values.email,
      userRole: 'CUSTOMER',
    })
    setEmail(values.email)
  }

  return (
    <Form>
      <PersonalInformation
        otp={otp}
        email={email}
        EmailVerification={EmailVerification}
        values={values}
        isMutating={isMutating}
        setFieldValue={setFieldValue}
      />
      <p className="mt-5 text-gray-400 text-sm">Passwords must be 8 characters long.</p>
      <div className="flex justify-center my-10">
        <CheckboxInput name="rememberMe" label="" />
        <a href="/docs/M2U-Terms.pdf" target="blank" className="mt-2 text-brand-700 mr-2 underline-offset-2 underline">
          Terms and privacy policy
        </a>
      </div>

      <div className="mt-5">
        <button
          disabled={postMutating}
          type="submit"
          className={`${
            values.email === '' || values.emailCode === '' ? 'bg-gray-300' : 'bg-brand-700 hover:bg-brand-600'
          }  flex w-[250px] md:w-[400px] mx-auto justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 disabled:bg-gray-300 `}
        >
          {postMutating ? <DashLoader /> : 'Register Here'}
        </button>
      </div>
    </Form>
  )
}
