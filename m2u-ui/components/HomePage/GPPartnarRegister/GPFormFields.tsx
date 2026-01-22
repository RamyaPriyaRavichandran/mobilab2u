'use client'

import { Form } from 'formik'
import { useState } from 'react'
import useSWRMutation from 'swr/mutation'

import { mutater } from '@/lib/fetchers'
import type { GPFormFieldsProps } from './GPAuthenticationInterface'
import GPPersonalInformation from './GPPersonalInformation'
import { OTP } from '@/lib/endpoints'
import DashLoader from '@/components/common/DashLoader'
import { INPUT_INVALID_EMAIL_ERROR } from '@/utils/constents'

export default function GPFormFields({
  values,
  setFieldValue,
  isValid,
  email,
  otp,
  showError,
  setEmail,
  postMutating,
  showSuccess,
  setOtp,
}: GPFormFieldsProps) {
  const [verifyClicked, setVerifyClicked] = useState(false)

  const { trigger: sendOtp, isMutating: otpMutating } = useSWRMutation(
    OTP,
    mutater<{ email: string; userRole: string }, { message: string }>('POST'),
    {
      onSuccess: ({ data: { message = '' } = {} }) => {
        showSuccess(message)
        setOtp(true)
        setVerifyClicked(true)
      },
      onError: ({ response: { data: { message = '' } = {} } }) => {
        showError(message)
      },
      throwOnError: false,
    }
  )

  const handleSendOtp = () => {
    if (values.email === '') {
      return showError(INPUT_INVALID_EMAIL_ERROR)
    }
    sendOtp({
      email: values.email,
      userRole: values.roles,
    })
    setEmail(values.email)
    setFieldValue('otp', true)
  }

  return (
    <Form className="space-y-4">
      <GPPersonalInformation
        email={email}
        values={values}
        setFieldValue={setFieldValue}
        handleSendOtp={handleSendOtp}
        verifyClicked={verifyClicked}
        otp={otp}
        setOtp={setOtp}
        otpMutating={otpMutating}
      />

      <button
        disabled={postMutating}
        type="submit"
        className={`${values.email === '' || values.emailCode === '' ? 'bg-gray-300' : 'bg-brand-700 hover:bg-brand-600'}  flex w-full justify-center rounded-md  px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 disabled:bg-gray-300 `}
      >
        {postMutating ? <DashLoader color="Red" /> : 'Register as GP Partner'}
      </button>
    </Form>
  )
}
