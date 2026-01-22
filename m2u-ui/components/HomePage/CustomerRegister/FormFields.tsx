import useSWRMutation from 'swr/mutation'
import type { CustomerFormFields } from './AuthenticationInterface'
import { OTP } from '@/lib/endpoints'
import { mutater } from '@/lib/fetchers'
import { Form, Field, ErrorMessage } from 'formik'
import PersonalInformation from './PersonalInformation'
import { INPUT_INVALID_EMAIL_ERROR } from '@/utils/constents'
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
    <Form className="space-y-5">
      <PersonalInformation
        otp={otp}
        email={email}
        EmailVerification={EmailVerification}
        values={values}
        isMutating={isMutating}
        setFieldValue={setFieldValue}
      />
      <div>
        <div className="flex items-center">
          <Field
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            className="w-4 h-4 text-blue-600 border-gray-300 rounded"
          />

          <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">
            I Accept{' '}
            <a href="/docs/M2U-Terms.pdf" target="_blank" className="text-red-600 hover:underline" rel="noreferrer">
              Terms And Condition
            </a>
          </label>
        </div>
        <ErrorMessage name="rememberMe" component="div" className="text-red-500 text-xs mt-1" />
      </div>

      <button
        disabled={postMutating}
        type="submit"
        className="w-full bg-red-600 text-white py-3 rounded-md font-medium hover:bg-red-700 disabled:bg-gray-300 transition-colors"
      >
        {postMutating ? <DashLoader /> : 'Register'}
      </button>
    </Form>
  )
}
