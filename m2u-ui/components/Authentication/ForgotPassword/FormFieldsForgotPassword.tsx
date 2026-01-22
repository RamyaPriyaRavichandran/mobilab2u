import TextInput from '@/components/common/Input/TextInput'
import { usePopup } from '@/lib/contexts/PopupContext'
import { FORGOT_PASSWORD } from '@/lib/endpoints'
import { mutater } from '@/lib/fetchers'
import { HOME, REGISTER_COMMON } from '@/utils/constents/routes'
import { Form, Formik } from 'formik'
import Link from 'next/link'
import React from 'react'
import * as Yup from 'yup'
import useSWRMutation from 'swr/mutation'
import { useRouter } from 'next/navigation'
import { INPUT_EMAIL_ERROR, INPUT_INVALID_EMAIL_ERROR, INPUT_ROLE_REQUIRED, userType } from '@/utils/constents'
import SelectInput from '@/components/common/Input/SelectInput'

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email(INPUT_INVALID_EMAIL_ERROR).required(INPUT_EMAIL_ERROR),
  userRole: Yup.string().required(INPUT_ROLE_REQUIRED),
})

export default function FormFieldsForgotPassword() {
  const { showSuccess, showError } = usePopup()
  const Router = useRouter()
  const { trigger: postForgotPassword, isMutating } = useSWRMutation(
    FORGOT_PASSWORD,
    mutater<{ email: string; userRole: string }, { message: string }>('POST'),
    {
      onSuccess: ({ data: { message = '' } = {} }) => {
        showSuccess(message)
        Router.push(HOME)
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
        initialValues={{ email: '', userRole: '' }}
        validationSchema={forgotPasswordSchema}
        onSubmit={(values: { email: string; userRole: string }, { setSubmitting }) => {
          postForgotPassword(values)
          setSubmitting(false)
        }}
      >
        {() => (
          <Form>
            <div className="space-y-6">
              <div>
                <div className="mt-2">
                  <SelectInput
                    name="userRole"
                    options={userType}
                    label="Role"
                    inputstyle="w-full px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-red-700 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div className="mt-4">
                  <TextInput name="email" id="email" label="Email address" type="email" />
                </div>
              </div>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Not a member?
                <Link href={REGISTER_COMMON} className="font-semibold text-brand-700 hover:text-brand-700">
                  Sign-up
                </Link>
              </p>

              <div>
                <button
                  disabled={isMutating}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-brand-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                >
                  Send
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
