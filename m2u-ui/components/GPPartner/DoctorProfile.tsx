'use client'

import type React from 'react'
import { useState } from 'react'
import { Formik, Form } from 'formik'
import TextInput from '@/components/common/Input/TextInput'
import NumberInput from '@/components/common/Input/NumberInput'
import { GET_HSP_USER_DATA, UPDATE_SP_PROFILE, PHONE_OTP } from '@/lib/endpoints'
import useSWR from 'swr'
import { fetcher, mutater } from '@/lib/fetchers'
import { usePopup } from '@/lib/contexts/PopupContext'
import useSWRMutation from 'swr/mutation'
import { Camera, User, Shield, Edit3, FileText, Upload, Stethoscope, UserCheck } from 'lucide-react'
import Image from 'next/image'
import SelectInput from '../common/Input/SelectInput'
import { idProof, language, qualification } from '@/utils/constents'
import city from '@/utils/constents/stateCity.json'
import { FormValuesProps } from './GPnterface'
import { getMinutesDiffBetweenTwoDates } from '@/utils/functions'

function getDifferenceBetweenTwoDates(startDate: Date): number {
  const date1 = new Date(startDate)
  const date2 = new Date()
  const diffInMs = date2.getTime() - date1.getTime()
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24)
  return Math.floor(diffInDays)
}

function dateAfter30Days(date: Date): string {
  const futureDate = new Date(date)
  futureDate.setDate(futureDate.getDate() + 30)
  return futureDate.toISOString().split('T')[0]
}

export default function DoctorProfile() {
  const [otpSent, setOtpSent] = useState(false)
  const [otpCountdown, setOtpCountdown] = useState(0)
  const [passportSizePhoto, setPassportSizePhoto] = useState<File | null>(null)
  const [eSign, setESign] = useState<File | null>(null)
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null)
  const [eSignPreview, setESignPreview] = useState<string | null>(null)
  const path = `${GET_HSP_USER_DATA}`
  const [canChangePhoneNumber, setCanChangePhoneNumber] = useState(true)

  const { data: getIndividualGP = {}, mutate } = useSWR(path, fetcher<any>(), {
    onSuccess(data) {
      if (data.isVerifiedPhoneNumber && !data.phoneOtpCount) {
        setCanChangePhoneNumber(!data.isVerifiedPhoneNumber)
      }
      setOtpCountdown(data.phoneOtpCount || 0)
    },
  })

  const { showSuccess, showError } = usePopup()

  const { trigger: updateProfile, isMutating } = useSWRMutation(
    UPDATE_SP_PROFILE,
    mutater<FormData, { message: string }>('PUT', true),
    {
      onSuccess: ({ data: { message = '' } }) => {
        showSuccess(message)
        mutate()
        setOtpSent(false)
      },
      onError: ({ response: { data: { message = '' } = {} } }) => {
        showError(message)
      },
      throwOnError: false,
    }
  )

  const handleSubmit = (values: any) => {
    const formData = new FormData()
    const payload = {
      ...values,
      isESign: !!eSign,
    }
    formData.append('data', JSON.stringify(payload))
    if (passportSizePhoto) formData.append('passportSizePhoto', passportSizePhoto)
    if (eSign) formData.append('eSign', eSign)
    updateProfile(formData)
  }

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      setPassportSizePhoto(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  function handleESignUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      setESign(file)
      // Create preview for image files
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setESignPreview(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        // For non-image files (like PDFs), clear the preview
        setESignPreview(null)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden mb-8">
          <div className="relative">
            {/* Background Pattern */}
            <div className="h-32 bg-gradient-to-r from-red-500 via-red-600 to-red-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/5"></div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
              <div className="absolute -bottom-2 -left-4 w-16 h-16 bg-white/10 rounded-full"></div>
              {/* Medical Icon */}
              <div className="absolute top-4 right-4">
                <Stethoscope className="w-8 h-8 text-white/30" />
              </div>
            </div>

            {/* Profile Image */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16">
              <label htmlFor="profile-image" className="group cursor-pointer">
                <div className="relative w-32 aspect-square rounded-full bg-white border-4 border-white shadow-xl overflow-hidden transition-all duration-300 group-hover:shadow-2xl">
                  {profileImagePreview ? (
                    <Image
                      width={200}
                      height={200}
                      src={profileImagePreview || '/placeholder.svg'}
                      alt="Profile Preview"
                      className="w-full h-full object-cover transition-all duration-500 ease-in-out"
                    />
                  ) : passportSizePhoto ? (
                    <Image
                      width={200}
                      height={200}
                      src={URL.createObjectURL(passportSizePhoto) || '/placeholder.svg'}
                      alt="Profile Preview"
                      className="w-full h-full object-cover transition-all duration-500 ease-in-out"
                    />
                  ) : getIndividualGP?.passportSizePhoto?.s3URL ? (
                    <Image
                      width={200}
                      height={200}
                      src={getIndividualGP.passportSizePhoto.s3URL || '/placeholder.svg'}
                      alt="Profile"
                      className="w-full h-full object-cover transition-all duration-500 ease-in-out"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                      <User className="w-12 h-12 text-slate-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                    <span className="ml-2 text-white text-sm font-medium">
                      {profileImagePreview || passportSizePhoto || getIndividualGP?.passportSizePhoto?.s3URL
                        ? 'Change'
                        : 'Upload'}
                    </span>
                  </div>
                </div>
                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-20 pb-8 px-8 text-center">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">
              {getIndividualGP?.name ? `Dr. ${getIndividualGP.name}` : 'Complete Your Doctor Profile'}
            </h1>
            <p className="text-slate-600 text-sm">Manage your medical practice information and credentials</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
              <Edit3 className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-800">Medical Professional Information</h2>
              <p className="text-sm text-slate-600">Update your professional details and credentials</p>
            </div>
          </div>

          <Formik
            enableReinitialize
            initialValues={{
              name: getIndividualGP?.name || '',
              phone: getIndividualGP?.phone || '',
              city: getIndividualGP?.city || '',
              email: getIndividualGP?.email || '',
              state: getIndividualGP?.state || '',
              language: getIndividualGP?.language || '',
              address: getIndividualGP?.address || '',
              medicalQualification: getIndividualGP?.medicalQualification || '',
              postCode: getIndividualGP?.postCode || '',
              nricNumber: getIndividualGP?.nricNumber || '',
              idProof: getIndividualGP?.nricNumber ? 'NRIC_NUMBER' : 'PASSPORT_NUMBER',
              passportNumber: getIndividualGP?.passportNumber || '',
              otp: '',
              other: getIndividualGP.other || '',
              isOtpSended: false,
              isVerifiedPhoneNumber: getIndividualGP?.isVerifiedPhoneNumber || false,
              phoneOtpEnteredDate: getIndividualGP.phoneOtpEnteredDate || '',
            }}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <FormValues
                otpCountdown={otpCountdown}
                setOtpCountdown={setOtpCountdown}
                canChangePhoneNumber={canChangePhoneNumber}
                setCanChangePhoneNumber={setCanChangePhoneNumber}
                values={values}
                data={getIndividualGP}
                setOtpSent={setOtpSent}
                otpSent={otpSent}
                setFieldValue={setFieldValue}
                isMutating={isMutating}
                setESign={setESign}
                eSign={eSign}
                mutate={mutate}
                handleESignUpload={handleESignUpload}
                eSignPreview={eSignPreview}
              />
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

function FormValues({
  otpCountdown,
  setOtpCountdown,
  values,
  data,
  setOtpSent,
  otpSent,
  isMutating,
  canChangePhoneNumber,
  setCanChangePhoneNumber,
  setFieldValue,
  eSign,
  mutate,
  handleESignUpload,
  eSignPreview,
}: FormValuesProps) {
  const stateValue = values?.state
  const cityOptions: any = city.filter((cities: any) => cities[stateValue])
  const cityMain = cityOptions[0]?.[stateValue]
  const { showSuccess, showError } = usePopup()
  const { trigger: sendOtp, isMutating: isOtpSending } = useSWRMutation(
    PHONE_OTP,
    mutater<{ phone: string }, { message: string; countLeft: number }>('POST'),
    {
      onSuccess: ({ data }) => {
        showSuccess(data.message || 'OTP Sent!')
        setOtpSent(true)
        setCanChangePhoneNumber(true)
        setOtpCountdown(data.countLeft || 0)
        setFieldValue('isOtpSended', true)
        mutate()
      },
      onError: ({ response: { data: { message = '' } = {} } }) => {
        showError(message)
      },
      throwOnError: false,
    }
  )
  const otpCountText =
    getMinutesDiffBetweenTwoDates(values?.phoneOtpEnteredDate, process.env.NODE_ENV) >= 60 ? 3 : otpCountdown

  const otpLimitReached = 'OTP Limit Reached'
  return (
    <Form className="space-y-8">
      {/* Basic Information Section */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <TextInput
              name="name"
              label="Full Name"
              inputstyle="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div className="space-y-2">
            <TextInput
              label="Email"
              name="email"
              disabled={true}
              inputstyle="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Phone Verification Section */}
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-slate-800">Phone Verification</h3>
            {data.isVerifiedPhoneNumber && !canChangePhoneNumber && (
              <span className="ml-auto px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Verified
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
            <div className="lg:col-span-2">
              <NumberInput
                name="phone"
                label="Phone Number"
                inputstyle="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                disabled={data.isVerifiedPhoneNumber && !canChangePhoneNumber}
              />
            </div>
            <div>
              {canChangePhoneNumber ? (
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        values?.phoneOtpEnteredDate &&
                        getMinutesDiffBetweenTwoDates(values?.phoneOtpEnteredDate, process.env.NODE_ENV) < 60 &&
                        otpCountdown === 0
                      ) {
                        showError('OTP limit exceeded. Please try again after 1 hour of time')
                        return
                      }
                      if (!values.phone) {
                        showError('Phone number required for OTP!')
                      } else sendOtp({ phone: String(values.phone) })
                    }}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-1.5 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                    disabled={isOtpSending || !values.phone}
                  >
                    {isOtpSending
                      ? 'Sending...'
                      : otpSent
                        ? `${otpCountText === 0 ? otpLimitReached : `Resend OTP (${otpCountText})`}`
                        : `${otpCountText === 0 ? otpLimitReached : `Send OTP (${otpCountText})`}`}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    if (data.isVerifiedPhoneNumber) {
                      const diff = getDifferenceBetweenTwoDates(data.lastVerifiedDate)
                      if (diff > 30) {
                        setCanChangePhoneNumber(true)
                        setFieldValue('isVerifiedPhoneNumber', false)
                      } else {
                        showError(
                          `You've reached the monthly limit. Try again after ${dateAfter30Days(
                            data.lastVerifiedDate
                          )} or contact admin.`
                        )
                      }
                    } else {
                      setCanChangePhoneNumber(true)
                      setFieldValue('isVerifiedPhoneNumber', false)
                    }
                  }}
                  className="w-full bg-slate-600 hover:bg-slate-700 text-white font-semibold py-1.5 px-6 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                  disabled={isOtpSending || !values.phone}
                >
                  Edit Number
                </button>
              )}
            </div>
          </div>

          {otpSent && (
            <div className="mt-4">
              <TextInput
                name="otp"
                label="Enter OTP Code"
                inputstyle="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter the 6-digit code sent to your phone"
              />
            </div>
          )}
        </div>
      </div>

      {/* Professional Information Section */}
      <div className="space-y-6">
        <div className="border-t border-slate-200 pt-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <UserCheck className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Professional Details</h3>
              <p className="text-sm text-slate-600">Your medical practice and specialization information</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SelectInput
              disabled={true}
              inputstyle="w-full px-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
              label="Medical Qualification"
              name="medicalQualification"
              options={qualification}
            />
            {values.medicalQualification === 'OTHERS' && (
              <TextInput
                disabled={true}
                name="other"
                label="Others"
                inputstyle="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
              />
            )}
            <SelectInput
              label="ID Proof"
              name="idProof"
              options={idProof}
              disabled={true}
              inputstyle="w-full px-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
            />
            <TextInput
              name={values.nricNumber ? 'nricNumber' : 'passportNumber'}
              disabled={true}
              label={values.nricNumber ? 'NRIC Number' : 'Passport Number'}
              inputstyle="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
            />
            <SelectInput
              name="language"
              options={language}
              disabled={values.language ? true : false}
              label="Language"
              inputstyle="w-full px-4  border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Address Information Section */}
      <div className="space-y-6">
        <div className="border-t border-slate-200 pt-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Practice Address</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* <SelectInput disabled={true} label="State" name="state" options={state} />
            <SelectInput disabled={true} label="City" name="city" options={cityMain || []} /> */}
            <TextInput disabled={true} label="State" name="state" />
            <TextInput disabled={true} label="City" name="city" />
            <div className="lg:col-span-2">
              <TextInput
                disabled={true}
                name="address"
                label="Practice Address"
                inputstyle="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <NumberInput
              disabled={true}
              name="postCode"
              label="Postal Code"
              inputstyle="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Digital Signature Section */}
      <div className="space-y-6">
        <div className="border-t border-slate-200 pt-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Digital Signature</h3>
              <p className="text-sm text-slate-600">Upload your digital signature for medical documents</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 px-4 py-3 border border-slate-300 rounded-lg bg-white text-slate-700">
                {eSign
                  ? eSign.name
                  : data?.eSign?.originalName
                    ? data.eSign.originalName
                    : 'No signature file uploaded'}
              </div>
              <label htmlFor="eSign" className="cursor-pointer">
                <div className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                  <Upload className="w-4 h-4" />
                  <span>{eSign ? 'Change' : 'Upload'}</span>
                </div>
                <input
                  type="file"
                  id="eSign"
                  name="eSign"
                  accept="image/*,.pdf"
                  onChange={handleESignUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* E-Signature Preview */}
            {eSignPreview && (
              <div className="mt-4">
                <div className="border-t border-slate-200 pt-4">
                  <h4 className="text-sm font-medium text-slate-700 mb-3">Signature Preview:</h4>
                  <div className="bg-white rounded-lg border border-slate-200 p-4 max-w-md">
                    <Image
                      width={400}
                      height={200}
                      src={eSignPreview || '/placeholder.svg'}
                      alt="Digital Signature Preview"
                      className="max-w-full h-auto max-h-32 object-contain mx-auto"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Existing signature from server */}
            {!eSignPreview && data?.eSign?.s3URL && (
              <div className="mt-4">
                <div className="border-t border-slate-200 pt-4">
                  <h4 className="text-sm font-medium text-slate-700 mb-3">Current Signature:</h4>
                  <div className="bg-white rounded-lg border border-slate-200 p-4 max-w-md">
                    <Image
                      width={400}
                      height={200}
                      src={data.eSign.s3URL || '/placeholder.svg'}
                      alt="Current Digital Signature"
                      className="max-w-full h-auto max-h-32 object-contain mx-auto"
                    />
                  </div>
                </div>
              </div>
            )}

            <p className="text-xs text-slate-500">Supported formats: PNG, JPG, PDF (Max 10MB)</p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="border-t border-slate-200 pt-8">
        <button
          type="submit"
          disabled={isMutating}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          {isMutating ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Saving Changes...
            </div>
          ) : (
            'Save Doctor Profile'
          )}
        </button>
      </div>
    </Form>
  )
}
