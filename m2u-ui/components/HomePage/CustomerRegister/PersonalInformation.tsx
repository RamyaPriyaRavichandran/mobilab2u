'use client'

import type { PersonalCustomerInterface } from './AuthenticationInterface'
import LittleLoader from '@/components/common/LittleLoader'
import { useState } from 'react'
import StyledInput, { UserIcon, PhoneIcon, EmailIcon, KeyIcon, EyeSlashIcon, EyeIcon } from './StyleInput'
import StyledRadioGroup from './StyleRadioGroup'
import MyAutocomplete from '@/components/Authentication/MyAutoComplete'
import { ErrorMessage, Field } from 'formik'

export default function PersonalInformation({
  EmailVerification,
  isMutating,
  values,
  otp,
  email,
  setFieldValue,
}: PersonalCustomerInterface) {
  const [idType, setIdType] = useState<'nric' | 'passport'>('nric')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="space-y-6">
      {/* Name and Mobile Number */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StyledInput
          label="Full Name (As per NRIC/Passport)"
          name="name"
          type="text"
          placeholder="Name"
          icon={<UserIcon />}
        />
        <StyledInput
          label="Mobile Number"
          name="phone"
          type="tel"
          placeholder="Mobile Number"
          icon={<PhoneIcon />}
          maxLength={10}
          pattern="[0-9]{10}"
        />
      </div>

      {/* Date of Birth and Gender */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StyledInput label="Date of Birth" name="dateOfBirth" type="date" />
        <StyledRadioGroup
          label="Gender"
          name="gender"
          options={[
            { label: 'Male', value: 'MALE' },
            { label: 'Female', value: 'FEMALE' },
            { label: 'Other', value: 'OTHER' },
          ]}
        />
      </div>
      {/* Email with Verify Button and Inline Code */}
      <div className="w-full">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Your Email <span className="text-red-500">*</span>
        </label>

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:gap-2 gap-2">
          {/* Email Input with icon */}
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <EmailIcon />
            </span>
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-3 py-2  border-gray-300 rounded-md focus:outline-none focus:ring-0 border-2 focus:border-brand-700 placeholder-gray-400 text-sm"
            />
          </div>

          {/* Verify Button */}
          <button
            type="button"
            onClick={() => EmailVerification()}
            disabled={isMutating}
            className={`px-3 py-2 rounded-md text-sm text-white ${
              values.email === '' ? 'bg-gray-300' : 'bg-red-600 hover:bg-red-700'
            } disabled:bg-gray-300`}
          >
            {isMutating ? (
              <LittleLoader />
            ) : values.email === '' ? (
              'Verify'
            ) : values.email === email && otp ? (
              'Resend'
            ) : (
              'Verify'
            )}
          </button>

          {/* Inline Verification Input */}
          {otp && (
            <Field
              id="emailCode"
              name="emailCode"
              type="text"
              placeholder="Code"
              maxLength={6}
              className="w-full sm:w-28 pl-2 pr-2 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-0 placeholder-gray-400 text-sm focus:border-brand-700"
            />
          )}
        </div>

        <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
        <ErrorMessage name="emailCode" component="div" className="text-red-500 text-xs mt-1" />
      </div>

      {/* ID Proof Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ID Proof <span className="text-red-500">*</span>
        </label>

        {/* Radio buttons + Input */}
        <div className="!mt-1 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
          {/* Radio buttons container */}
          <div className="flex space-x-4">
            {/* NRIC Radio */}
            <label className="flex items-center">
              <Field
                type="radio"
                name="idProof"
                value="NRIC_NUMBER"
                className="text-red-600 focus:ring-red-500 border-gray-300"
                onClick={() => {
                  setIdType('nric')
                  setFieldValue('passportNumber', '')
                }}
              />
              <span className="ml-2 text-gray-700">NRIC</span>
            </label>

            {/* Passport Radio */}
            <label className="flex items-center">
              <Field
                type="radio"
                name="idProof"
                value="PASSPORT_NUMBER"
                className="text-red-600 focus:ring-red-500 border-gray-300"
                onClick={() => {
                  setIdType('passport')
                  setFieldValue('nricNumber', '')
                }}
              />
              <span className="ml-2 text-gray-700">Passport</span>
            </label>
          </div>

          {/* Input field */}
          <Field
            id="id-input"
            name={idType === 'nric' ? 'nricNumber' : 'passportNumber'}
            type="text"
            placeholder={idType === 'nric' ? 'Enter NRIC Number' : 'Enter Passport Number'}
            className="flex-1 pl-3 pr-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-0 placeholder-gray-400 text-sm  focus:border-brand-700"
          />
        </div>
        <ErrorMessage name="idProof" component="div" className="text-red-500 text-xs mt-1" />
        {idType === 'nric' && <ErrorMessage name="nricNumber" component="div" className="text-red-500 text-xs mt-1" />}
        {idType === 'passport' && (
          <ErrorMessage name="passportNumber" component="div" className="text-red-500 text-xs mt-1" />
        )}
      </div>

      {/* Address Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mt-4">
        <div className="col-span-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search Address <span className="text-red-500">*</span>
          </label>
          <div className="relative w-full">
            <MyAutocomplete setFieldValue={setFieldValue} />
          </div>
        </div>

        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
          <StyledInput label="State" name="state" placeholder="State" />
        </div>

        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
          <StyledInput label="City" name="city" placeholder="City" />
        </div>

        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
          <StyledInput label="Post Code" name="postCode" placeholder="Post Code" maxLength={5} />
        </div>

        <div className="col-span-6">
          <StyledInput label="Address" name="address" placeholder="Enter your full address" />
        </div>
      </div>

      {/* Passwords */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <StyledInput
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          icon={<KeyIcon />}
          rightIcon={showPassword ? <EyeSlashIcon /> : <EyeIcon />}
          onRightIconClick={() => setShowPassword(!showPassword)}
        />
        <StyledInput
          label="Confirm Password"
          name="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm Password"
          icon={<KeyIcon />}
          rightIcon={showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
          onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
        />
      </div>
    </div>
  )
}
