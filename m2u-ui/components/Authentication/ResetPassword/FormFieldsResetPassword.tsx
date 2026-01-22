'use client'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { ResetpasswordInterface } from '../AuthenticationInterface'
import { useRouter } from 'next/navigation'
import { usePopup } from '@/lib/contexts/PopupContext'
import useSWRMutation from 'swr/mutation'
import { RESET_PASSWORD } from '@/lib/endpoints'
import { mutater } from '@/lib/fetchers'
import { SP_LOGIN } from '@/utils/constents/routes'
import PasswordInput from '@/components/common/Input/PasswordInput'
import {
  CURRENT_PASSWORD_ERROR,
  INPUT_CONFIRM_PASSWORD_REQUIRED,
  INPUT_PASSWORD_REQUIRED,
  MAX_50_CHAR,
  MIN_8_CHAR,
  PASSWORD_MATCH,
} from '@/utils/constents'

export default function FormFieldsResetPassword() {
  const resetPasswordSchema = Yup.object().shape({
    currentPassword: Yup.string().required(CURRENT_PASSWORD_ERROR),
    password: Yup.string().min(8, MIN_8_CHAR).max(50, MAX_50_CHAR).required(INPUT_PASSWORD_REQUIRED),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], PASSWORD_MATCH)
      .required(INPUT_CONFIRM_PASSWORD_REQUIRED),
  })

  const Router = useRouter()
  const { showSuccess, showError } = usePopup()
  const { trigger: resetPassword, isMutating } = useSWRMutation(
    RESET_PASSWORD,
    mutater<{ password: string; currentPassword: string }, { message: string }>('POST'),
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
    <div>
      <Formik
        initialValues={{
          currentPassword: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={resetPasswordSchema}
        onSubmit={(values: ResetpasswordInterface, { setSubmitting }) => {
          resetPassword(values)
          setSubmitting(false)
        }}
      >
        {() => (
          <Form>
            <div className="space-y-6">
              <div className="mt-2">
                <PasswordInput name="currentPassword" label="Current Password" />
              </div>
              <div className="mt-2">
                <PasswordInput name="password" label="Password" />
              </div>

              <div className="mt-2">
                <PasswordInput name="confirmPassword" label="Confirm Password" />
              </div>

              <div className="">
                <button
                  disabled={isMutating}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-brand-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                >
                  Submit
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
