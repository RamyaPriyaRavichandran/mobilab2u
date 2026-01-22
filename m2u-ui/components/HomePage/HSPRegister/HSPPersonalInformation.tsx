'use client'

import type React from 'react'

import { Field, ErrorMessage } from 'formik'

import StyledInput, {
  UserIcon,
  PhoneIcon,
  EmailIcon,
  KeyIcon,
  MapIcon,
  EyeIcon,
  EyeSlashIcon,
} from '../CustomerRegister/StyleInput'

import { gender, language, qualification } from '@/utils/constents'
import MyAutocomplete from '@/components/Authentication/MyAutoComplete'
import { useState } from 'react'
import UploadInput from '@/components/common/Input/UploadInput'
import MultiFileUpload from '@/components/common/Input/MultiFileUpload'
import LittleLoader from '@/components/common/LittleLoader'
import { HSPPersonalInformationProps } from './HSPAuthenticationInterface'
import StyledSelect from '../GPPartnarRegister/StyledSelect'

const MedicalIcon = () => (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="fea icon-sm icons"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22 12l-10 6-10-6 10-6 10 6z"></path>
    <path d="M12 18v4"></path>
    <path d="M6 22h12"></path>
  </svg>
)

export default function HSPPersonalInformation({
  values,
  setFieldValue,
  handleSendOtp,
  verifyClicked,
  otp,
  setOtp,
  otpMutating,
  email,
}: HSPPersonalInformationProps) {
  const [idType, setIdType] = useState<'nric' | 'passport'>('nric')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <>
      {/* Name and Phone Number */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StyledInput name="userName" placeholder="Full Name (As Per NRIC/Passport)" icon={<UserIcon />} />
        <StyledInput name="phone" type="tel" placeholder="Phone Number" icon={<PhoneIcon />} />
      </div>

      {/* Email with Verify Button */}
      <div className="relative flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
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
            className="w-full pl-10 pr-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-brand-700 placeholder-gray-400 text-sm"
          />
        </div>

        {/* Verify Button */}
        <button
          type="button"
          onClick={handleSendOtp}
          disabled={otpMutating}
          className={`px-3 py-2 rounded-md text-sm text-white ${
            values.email === '' ? 'bg-gray-300' : 'bg-red-600 hover:bg-red-700'
          } disabled:bg-gray-300`}
        >
          {otpMutating ? (
            <LittleLoader />
          ) : values.email === '' ? (
            'Verify'
          ) : values.email === email && otp ? (
            'Resend'
          ) : (
            'Verify'
          )}
        </button>

        {/* Inline Verification Input (hidden initially) */}
        {verifyClicked && (
          <Field
            id="emailCode"
            name="emailCode"
            type="text"
            placeholder="Code"
            maxLength={6}
            className="w-full sm:w-28 pl-2 pr-2 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-0 placeholder-gray-400 text-sm  focus:border-brand-700  "
          />
        )}
      </div>
      <ErrorMessage name="emailCode" component="div" className="text-red-500 text-xs mt-1" />

      {/* Gender and Medical Qualification */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StyledSelect name="gender" options={gender} icon={<UserIcon />} />
        <StyledSelect name="medicalQualification" options={qualification} icon={<MedicalIcon />} />
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
      <div className="col-span-6">
        <MyAutocomplete setFieldValue={setFieldValue} />
      </div>

      {/* Address Fields */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <StyledInput name="address" placeholder="Address One" icon={<MapIcon />} />
        </div>

        <div className="flex-1">
          <StyledInput name="address2" placeholder="Address Two" icon={<MapIcon />} />
        </div>
      </div>

      {/* State and City */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StyledInput name="state" placeholder="State" icon={<MapIcon />} />
        <StyledInput name="city" placeholder="City" icon={<MapIcon />} />
      </div>
      {/*Post Code */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StyledInput name="postCode" placeholder="Post Code" icon={<MapIcon />} />
      </div>

      {/* File Uploads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <UploadInput label="MyKad" name="myKad" id="myKad" />
        <UploadInput label="Passport size photo" name="passportSizePhoto" setFieldValue={setFieldValue} />
      </div>

      {/* Supporting Documents */}
      <div className="flex-1">
        <MultiFileUpload fileLimit={4} label="Supporting Documents" name="supportingDocs" />
      </div>

      {/* Password Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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

      {/* Terms and Conditions */}
      <div className="flex items-center gap-2">
        <Field
          type="checkbox"
          name="rememberMe"
          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
        />
        <label className="text-gray-600 text-[12px] md:text-sm">I agree to the Terms and Privacy Policy</label>
        <ErrorMessage name="rememberMe" component="div" className="text-red-500 text-xs mt-1" />
      </div>
    </>
  )
}
