'use client'

import type React from 'react'
import { useState } from 'react'
import { Formik, Form } from 'formik'
import TextInput from '@/components/common/Input/TextInput'
import NumberInput from '@/components/common/Input/NumberInput'
import { GET_CUSTOMER_USER_DATA, CUSTOMER_UPDATE_PROFILE, PHONE_OTP } from '@/lib/endpoints'
import useSWR from 'swr'
import Image from 'next/image'
import { fetcher, mutater } from '@/lib/fetchers'
import { usePopup } from '@/lib/contexts/PopupContext'
import useSWRMutation from 'swr/mutation'
import { Shield, Edit3, X, User, Camera } from 'lucide-react'
import SelectInput from '../common/Input/SelectInput'
import { idProof, INPUT_REQUIRED } from '@/utils/constents'
import city from '@/utils/constents/stateCity.json'
import { Customer, CustomerUpdateProfileFormValues, FormValuesProps } from './CustomerInterface'

import * as Yup from 'yup'
import MyAutocomplete from '../Authentication/MyAutoComplete'
import { getMinutesDiffBetweenTwoDates } from '@/utils/functions'

export const CustomerUpdateProfileSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Phone must contain only digits')
    .min(8, 'Phone must be at least 8 digits')
    .max(15, 'Phone must be at most 15 digits')
    .required('Phone is required'),
  email: Yup.string().email('Invalid email').nullable(),
  dateOfBirth: Yup.date().typeError('Invalid date format').required('Date of Birth is required'),
  otp: Yup.string().nullable(),
  primaryAddress: Yup.object().shape({
    address: Yup.string().required('Primary address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    postCode: Yup.string()
      .matches(/^[0-9]{5}$/, 'Post code must be exactly 5 digits')
      .required('Post code is required'),
  }),

  secondaryAddress: Yup.array().of(
    Yup.object().shape({
      city: Yup.string().required(INPUT_REQUIRED),
      state: Yup.string().required(INPUT_REQUIRED),
      address: Yup.string().required(INPUT_REQUIRED),
      postCode: Yup.string()
        .required(INPUT_REQUIRED)
        .matches(/^[0-9]{5}$/, 'Post code must be exactly 5 digits'),
    })
  ),

  idProof: Yup.string().required('ID Proof type is required'),
  nricNumber: Yup.string().when('idProof', {
    is: 'NRIC_NUMBER',
    then: (schema) => schema.required('NRIC Number is required').matches(/^[0-9]{12}$/, 'NRIC must be 12 digits'),
    otherwise: (schema) => schema.nullable(),
  }),

  passportNumber: Yup.string().when('idProof', {
    is: 'PASSPORT_NUMBER',
    then: (schema) => schema.required('Passport Number is required'),
    otherwise: (schema) => schema.nullable(),
  }),

  isOtpSended: Yup.boolean().default(false),
})

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

export default function CustomerProfile() {
  const [otpSent, setOtpSent] = useState(false)
  const [canChangePhoneNumber, setCanChangePhoneNumber] = useState(true)
  const [passportSizePhoto, setPassportSizePhoto] = useState<File | null>(null)
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null)
  const [otpCountdown, setOtpCountdown] = useState(0)
  const path = `${GET_CUSTOMER_USER_DATA}`

  const { data: getIndividualCustomer = {} as Customer, mutate } = useSWR(path, fetcher<Customer>(), {
    onSuccess(data) {
      if (data.isVerifiedPhoneNumber && !data.phoneOtpCount) {
        setCanChangePhoneNumber(!data.isVerifiedPhoneNumber)
      }
      setOtpCountdown(data.phoneOtpCount || 0)
    },
  })

  const { showSuccess, showError } = usePopup()

  const { trigger: updateProfile, isMutating } = useSWRMutation(
    CUSTOMER_UPDATE_PROFILE,
    mutater<any, { message: string }>('PUT', true),
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
                      className="w-full h-full object-cover"
                    />
                  ) : getIndividualCustomer?.passportSizePhoto?.s3URL ? (
                    <Image
                      width={200}
                      height={200}
                      src={getIndividualCustomer.passportSizePhoto.s3URL || '/placeholder.svg'}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                      <User className="w-12 h-12 text-slate-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                    <span className="ml-2 text-white text-sm font-medium">
                      {profileImagePreview || getIndividualCustomer?.passportSizePhoto?.s3URL ? 'Change' : 'Upload'}
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
              {getIndividualCustomer?.name || 'Complete Your Profile'}
            </h1>
            <p className="text-slate-600 text-sm">Keep your information up to date for the best experience</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
              <Edit3 className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-800">Personal Information</h2>
              <p className="text-sm text-slate-600">Update your personal details below</p>
            </div>
          </div>

          <Formik
            enableReinitialize
            initialValues={
              {
                name: getIndividualCustomer?.name || '',
                phone: getIndividualCustomer?.phone || '',
                email: getIndividualCustomer?.email || '',
                primaryAddress: {
                  lat: getIndividualCustomer?.primaryAddress?.lat || 0,
                  lng: getIndividualCustomer?.primaryAddress?.lng || 0,
                  address: getIndividualCustomer?.primaryAddress?.address || getIndividualCustomer.address || '',
                  city: getIndividualCustomer?.primaryAddress?.city || getIndividualCustomer.city || '',
                  state: getIndividualCustomer?.primaryAddress?.state || getIndividualCustomer.state || '',
                  postCode: getIndividualCustomer?.primaryAddress?.postCode || getIndividualCustomer.postCode || '',
                },
                secondaryAddress:
                  (getIndividualCustomer.secondaryAddress?.length ?? 0) > 0
                    ? getIndividualCustomer.secondaryAddress!.map((address) => ({
                        city: address.city,
                        state: address.state,
                        address: address.address,
                        postCode: address.postCode,
                        lat: address.lat || 0,
                        lng: address.lng || 0,
                        _id: address._id,
                      }))
                    : [],
                dateOfBirth: getIndividualCustomer?.dateOfBirth?.slice(0, 10) || '',
                nricNumber: getIndividualCustomer?.nricNumber || '',
                idProof: getIndividualCustomer?.nricNumber ? 'NRIC_NUMBER' : 'PASSPORT_NUMBER',
                passportNumber: getIndividualCustomer?.passportNumber || '',
                otp: '',
                isVerifiedPhoneNumber: getIndividualCustomer?.isVerifiedPhoneNumber || false,
                isOtpSended: false,
                phoneOtpEnteredDate: getIndividualCustomer?.phoneOtpEnteredDate || '',
              } as CustomerUpdateProfileFormValues
            }
            validationSchema={CustomerUpdateProfileSchema}
            onSubmit={(values: CustomerUpdateProfileFormValues) => {
              values.nricNumber = String(values.nricNumber)
              values.primaryAddress.postCode = String(values.primaryAddress.postCode)

              const formData = new FormData()
              formData.append('data', JSON.stringify(values))

              if (passportSizePhoto) {
                formData.append('passportSizePhoto', passportSizePhoto)
              }

              updateProfile(formData)
            }}
          >
            {({ values, setFieldValue }) => (
              <FormValues
                otpCountdown={otpCountdown}
                setOtpCountdown={setOtpCountdown}
                canChangePhoneNumber={canChangePhoneNumber}
                setCanChangePhoneNumber={setCanChangePhoneNumber}
                values={values}
                data={getIndividualCustomer}
                setOtpSent={setOtpSent}
                otpSent={otpSent}
                setFieldValue={setFieldValue}
                isMutating={isMutating}
                mutate={mutate}
              />
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

function FormValues({
  values,
  data,
  otpCountdown,
  setOtpCountdown,
  setOtpSent,
  otpSent,
  isMutating,
  canChangePhoneNumber,
  setCanChangePhoneNumber,
  setFieldValue,
  mutate,
}: FormValuesProps) {
  const stateValue = values?.primaryAddress.state
  const cityOptions: any = city.filter((cities: any) => cities[stateValue])
  const cityMain = cityOptions[0]?.[stateValue]
  const { showSuccess, showError } = usePopup()

  const { trigger: sendOtp, isMutating: isOtpSending } = useSWRMutation(
    PHONE_OTP,
    mutater<{ phone: string }, { message: string; countLeft: number }>('POST'),
    {
      onSuccess: ({ data }) => {
        const { message = '', countLeft } = data
        showSuccess(message)
        setCanChangePhoneNumber(true)
        setOtpCountdown(countLeft)
        setOtpSent(true)
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
    getMinutesDiffBetweenTwoDates(values?.phoneOtpEnteredDate, process.env.NODE_ENV) >= 60 ? '3' : otpCountdown

  const otpLimitReached = 'OTP Limit Reached'
  return (
    <Form className="space-y-8">
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TextInput
            name="name"
            label="Full Name"
            inputstyle="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
          />
          <TextInput
            disabled={true}
            name="email"
            label="Email"
            inputstyle="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
          />
          <TextInput
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            inputstyle="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
          />
        </div>

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

      <div className="space-y-6">
        <div className="border-t border-slate-200 pt-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Personal Information</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="border-t border-slate-200 pt-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            Primary Address
          </h3>

          <div className="bg-slate-50 border border-slate-200 rounded-xl shadow-sm p-6 space-y-6">
            <div className="mt-3">
              <MyAutocomplete
                setFieldValue={setFieldValue}
                fieldPrefix="primaryAddress"
                placeholder="Enter customer address"
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TextInput label="State" name="primaryAddress.state" />
              <TextInput label="City" name="primaryAddress.city" />
            </div>

            <TextInput
              name="primaryAddress.address"
              label="Street Address"
              inputstyle="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />

            <div className="max-w-xs">
              <NumberInput
                name="primaryAddress.postCode"
                label="Postal Code"
                inputstyle="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="border-t border-slate-200 pt-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            Secondary Addresses
          </h3>
          <div className="space-y-6">
            {values.secondaryAddress.map((data, index) => (
              <div
                key={index}
                className="relative bg-white border border-slate-200 rounded-xl shadow-sm p-6 transition hover:shadow-md"
              >
                <div className="absolute right-4 top-4 flex gap-2">
                  {data._id && (
                    <button
                      type="button"
                      onClick={() =>
                        setFieldValue('primaryAddress', {
                          address: data.address || '',
                          city: data.city || '',
                          state: data.state || '',
                          postCode: data.postCode || '',
                        })
                      }
                      className="text-xs px-3 py-1 border border-red-500 text-red-500 rounded-lg hover:bg-red-50"
                    >
                      Set as Primary
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      const newAddresses = [...values.secondaryAddress]
                      newAddresses.splice(index, 1)
                      setFieldValue('secondaryAddress', newAddresses)
                    }}
                    className="p-1 rounded-full border border-slate-300 text-slate-500 hover:text-red-600 hover:border-red-400"
                  >
                    <X size={16} />
                  </button>
                </div>

                <h4 className="text-sm font-medium text-slate-700 mb-4">Secondary Address {index + 1}</h4>
                <div className="mt-3">
                  <MyAutocomplete
                    setFieldValue={setFieldValue}
                    fieldPrefix={`secondaryAddress.${index}`}
                    placeholder="Enter customer address"
                  />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <TextInput label="State" name={`secondaryAddress.${index}.state`} />
                  <TextInput label="City" name={`secondaryAddress.${index}.city`} />

                  <div className="lg:col-span-2">
                    <TextInput
                      name={`secondaryAddress.${index}.address`}
                      label="Street Address"
                      inputstyle="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <NumberInput
                    name={`secondaryAddress.${index}.postCode`}
                    label="Postal Code"
                    inputstyle="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            ))}

            {values.secondaryAddress.length < 5 && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() =>
                    setFieldValue('secondaryAddress', [
                      ...values.secondaryAddress,
                      { address: '', city: '', state: '', postCode: '' },
                    ])
                  }
                  className="px-4 py-2 text-sm font-medium border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition"
                >
                  + Add Another Address
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

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
            'Save Profile Changes'
          )}
        </button>
      </div>
    </Form>
  )
}
