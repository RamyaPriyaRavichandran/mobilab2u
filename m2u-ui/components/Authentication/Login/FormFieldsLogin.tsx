import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '@/lib/contexts/AuthContext'
import TextInput from '@/components/common/Input/TextInput'
import PasswordInput from '@/components/common/Input/PasswordInput'
import Link from 'next/link'
import { CUSTOMER_REGISTER, FORGOT_PASS, SP_REGISTER } from '@/utils/constents/routes'
import { LoginFormInterface } from '../AuthenticationInterface'
import {
  INPUT_EMAIL_ERROR,
  INPUT_INVALID_EMAIL_ERROR,
  INPUT_PASSWORD_REQUIRED,
  INPUT_ROLE_REQUIRED,
  userType,
} from '@/utils/constents'
import { useSearchParams } from 'next/navigation'
import SelectInput from '@/components/common/Input/SelectInput'

export default function FormFieldsLogin() {
  const { login } = useAuth()
  const searchParams = useSearchParams()
  const [showOptions, setShowOptions] = useState(false)

  const loginSchema = Yup.object().shape({
    email: Yup.string().email(INPUT_INVALID_EMAIL_ERROR).required(INPUT_EMAIL_ERROR),
    password: Yup.string().required(INPUT_PASSWORD_REQUIRED),
    userRole: Yup.string().required(INPUT_ROLE_REQUIRED),
  })

  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
          userRole: '',
          loginRedirect: searchParams.get('redirect') ? true : false,
        }}
        validationSchema={loginSchema}
        onSubmit={(values: LoginFormInterface, { setSubmitting }) => {
          login(values)
          setSubmitting(false)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="space-y-6">
              <SelectInput name="userRole" label="Role" options={userType} />

              <TextInput name="email" label="Email address" id="email" type="email" inputstyle="pl-2 " />

              <PasswordInput name="password" label="Password" id="password" />
            </div>
            <div className="relative flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 mb-4 mt-4">
              <div className="relative text-sm text-gray-600">
                Not a member?
                <button
                  type="button"
                  onClick={() => setShowOptions(!showOptions)}
                  className="ml-1 font-semibold text-red-500 hover:text-red-600 focus:outline-none transition-colors"
                >
                  Register
                </button>
                {showOptions && (
                  <div className="absolute left-0 mt-3 w-56 bg-white rounded-xl shadow-2xl ring-1 ring-black/5 z-50 animate-fade-in-up">
                    <Link
                      href={CUSTOMER_REGISTER}
                      className="block px-5 py-3 text-sm text-gray-800 hover:bg-gray-50 hover:text-black transition-colors rounded-t-xl"
                      onClick={() => setShowOptions(false)}
                    >
                      Register as Customer
                    </Link>
                    <Link
                      href={SP_REGISTER}
                      onClick={() => setShowOptions(false)}
                      className="block px-5 py-3 text-sm text-gray-800 hover:bg-gray-50 hover:text-black transition-colors rounded-b-xl"
                    >
                      Register as HSP/GP
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href={FORGOT_PASS}
                className="text-sm font-semibold text-red-500 hover:text-red-600 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-brand-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              disabled={isSubmitting}
            >
              <a>Sign in</a>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
