'use client'

import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '@/lib/contexts/AuthContext'
import Link from 'next/link'
import { CUSTOMER_REGISTER, FORGOT_PASS, REGISTER_COMMON, SP_REGISTER } from '@/utils/constents/routes'
import { LoginFormInterface } from '../Authentication/AuthenticationInterface'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import {
  INPUT_EMAIL_ERROR,
  INPUT_INVALID_EMAIL_ERROR,
  INPUT_PASSWORD_REQUIRED,
  INPUT_ROLE_REQUIRED,
  userType,
} from '@/utils/constents'
import { useSearchParams } from 'next/navigation'
import { KeyIcon, User } from 'lucide-react'

export default function FormFieldsLogin() {
  const { login } = useAuth()
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)

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
        {({ values, errors, touched, handleChange, isSubmitting }) => (
          <Form className="space-y-5">
            {/* Role */}
            <div>
              <label htmlFor="userRole" className="block text-sm font-medium text-gray-700 mb-1">
                Role <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="userRole"
                  name="userRole"
                  value={values.userRole}
                  onChange={handleChange}
                  className="
    w-full
    pl-3 pr-10 py-2
    border-2 border-gray-300
    rounded-md
    text-sm text-gray-700
    bg-white
    shadow-sm
    focus:outline-none
    focus:ring-0
    focus:border-red-600
    transition-all duration-300
    appearance-none
    [-webkit-appearance:none]
    [-moz-appearance:none]
  "
                >
                  <option value="">Select your role</option>
                  {userType.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>

                {/* Minimal custom arrow icon */}
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="h-4 w-4 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
              {errors.userRole && touched.userRole && <p className="text-red-500 text-sm mt-1">{errors.userRole}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Your Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <User className="h-5 w-5 text-black" />
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full pl-10 pr-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-red-600 placeholder-gray-400 text-sm"
                />
              </div>
              {errors.email && touched.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <KeyIcon className="h-5 w-5 text-black" />
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full pl-10 pr-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-red-600 placeholder-gray-400 text-sm"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-gray-600"
                >
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              {/* <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="form-checkbox text-red-600" />
                Remember me
              </label> */}
              <Link href={FORGOT_PASS} className="hover:text-red-600 font-semibold">
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#fef1e7] text-black py-2 rounded-md font-medium transition"
              disabled={isSubmitting}
            >
              Login
            </button>

            {/* Register Links */}
            <div className="mt-6 text-center text-sm text-gray-600">
              Don’t have an account?
              <div className="mt-4 grid grid-cols-2 gap-4">
                <Link
                  href={CUSTOMER_REGISTER}
                  className="p-4 border rounded-lg hover:bg-red-50 hover:border-red-500 transition text-center"
                >
                  <p className="font-semibold text-red-600">Customer</p>
                  <p className="text-xs text-gray-500">Sign up for personal use</p>
                </Link>
                <Link href={REGISTER_COMMON} className="p-4 border rounded-lg hover:bg-gray-100 transition text-center">
                  <p className="font-semibold text-gray-700">HSP / GP</p>
                  <p className="text-xs text-gray-500">Sign up as a provider</p>
                </Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
