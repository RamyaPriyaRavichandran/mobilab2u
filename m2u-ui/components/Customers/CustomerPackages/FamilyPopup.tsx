'use client'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import TextInput from '@/components/common/Input/TextInput'
import NumberInput from '@/components/common/Input/NumberInput'
import SelectInput from '@/components/common/Input/SelectInput'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {
  CUSTOMER_ADDRESS_REQUIRED,
  gender,
  INPUT_POSTCODE_ERROR,
  INPUT_POSTCODE_MIN_ERROR,
  INPUT_REQUIRED,
  labTestTimeSlots,
} from '@/utils/constents'
import { TrashIcon } from '@heroicons/react/24/outline'
import type { FamilyPackageInterface } from '../CustomerInterface'
import TextAreaInput from '@/components/common/Input/TextAreaInput'
import DashLoader from '@/components/common/DashLoader'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetchers'
import { GET_CUSTOMER_ADDRESS } from '@/lib/endpoints'
import city from '@/utils/constents/stateCity.json'
import MyAutocomplete from '@/components/Authentication/MyAutoComplete'
import { useState } from 'react'

export default function FamilyPackage({
  selectedPackage,
  isMutating,
  setPopup,
  clearError,
  errorMessage,
  payTestFees,
}: FamilyPackageInterface & { errorMessage?: string; clearError?: () => void }) {
  const [isNewAddressConfirmed, setIsNewAddressConfirmed] = useState(false)

  const individualTestBookingSchema = Yup.object().shape({
    customerAppointmentDate: Yup.date().required(INPUT_REQUIRED),
    customerAppointmentTime: Yup.string().required(INPUT_REQUIRED),
    addressType: Yup.string().required(INPUT_REQUIRED),
    customerAddress: Yup.object()
      .shape({
        city: Yup.string().required(INPUT_REQUIRED),
        state: Yup.string().required(INPUT_REQUIRED),
        address: Yup.string().required(INPUT_REQUIRED),
        postCode: Yup.string()
          .matches(/^[0-9]{5}$/, INPUT_POSTCODE_MIN_ERROR)
          .required(INPUT_POSTCODE_ERROR),
      })
      .required(CUSTOMER_ADDRESS_REQUIRED),
  })

  const handleClose = () => setPopup({ popup: false, package: {} })
  const { data, isLoading } = useSWR(GET_CUSTOMER_ADDRESS, fetcher<Array<CustomerAddress>>(), {})

  return (
    <div className="mt-5">
      <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
        <Formik
          initialValues={{
            members:
              selectedPackage.type === 'FAMILY'
                ? [{ name: '', age: 0, gender: '', address: { city: '', state: '', postCode: '' } }]
                : [],
            packageId: '',
            customerAppointmentDate: '',
            customerAppointmentTime: '',
            addressType: 'OLD',
            customerAddress: {
              city: '',
              state: '',
              postCode: '',
              address: '',
              idx: '',
            },
          }}
          validationSchema={individualTestBookingSchema}
          onSubmit={(values, { setSubmitting }) => {
            values.packageId = selectedPackage._id
            payTestFees(values)
            setSubmitting(false)
          }}
        >
          {({ values, setFieldValue, errors }) => {
            const handleAddMember = () => {
              if (values.members.length < 5) {
                const members = [
                  ...values.members,
                  { name: '', age: 0, gender: '', address: { city: '', state: '', postCode: '' } },
                ]
                setFieldValue('members', members)
              }
            }
            const handleRemoveMember = (index: number) => {
              if (values.members.length > 1) {
                const members = [...values.members]
                members.splice(index, 1)
                setFieldValue('members', members)
              }
            }

            const handleConfirmNewAddress = () => {
              const { address, city, state, postCode } = values.customerAddress
              if (address && city && state && postCode && postCode.match(/^[0-9]{5}$/)) {
                setIsNewAddressConfirmed(true)
              }
            }

            const handleEditAddress = () => {
              setIsNewAddressConfirmed(false)
            }

            const currentDate = new Date()
            const nextDate = new Date(currentDate)
            nextDate.setDate(currentDate.getDate() + 1)
            const nextDateString = nextDate.toISOString().split('T')[0]
            const stateValue = values?.customerAddress.state
            const cityOptions: any = city.filter((cities: any) => cities[stateValue])
            const cityMain = cityOptions[0]?.[stateValue]

            return (
              <Form className="space-y-8 text-left">
                <div className="grid md:grid-cols-2 gap-6">
                  <TextInput
                    minStartDate={nextDateString}
                    type="date"
                    label="Customer Appointment Date"
                    name="customerAppointmentDate"
                  />
                  <SelectInput
                    label="Customer Appointment Time"
                    name="customerAppointmentTime"
                    options={labTestTimeSlots}
                  />
                </div>

                {values.addressType === 'OLD' ? (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Select Saved Address</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {Array.isArray(data) &&
                        data.length > 0 &&
                        data.map((add: CustomerAddress, idx: number | string) => (
                          <CustomerAddressCards
                            className={`cursor-pointer hover:border-red-400 ${
                              idx === values.customerAddress.idx ? 'border-red-500 shadow-md' : ''
                            }`}
                            onClick={() => setFieldValue('customerAddress', { idx: idx, ...add })}
                            key={idx}
                            customerAddress={add}
                          />
                        ))}
                    </div>
                    {values.customerAddress.address && <CustomerAddressCard customerAddress={values.customerAddress} />}
                    <div className="text-right mt-6">
                      {errors.customerAddress?.postCode && (
                        <p className="text-red-500 text-sm mb-2 mr-6">Please select an address</p>
                      )}
                      <button
                        type="button"
                        className="bg-white border border-red-500 text-red-500 py-2 px-5 rounded-lg shadow hover:bg-red-50 transition"
                        onClick={() => {
                          setFieldValue('addressType', 'NEW')
                          setFieldValue('customerAddress', {
                            state: '',
                            city: '',
                            address: '',
                            postCode: '',
                          })
                          setIsNewAddressConfirmed(false)
                        }}
                      >
                        + Add New Address
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Add New Address</h2>
                    {!isNewAddressConfirmed ? (
                      <>
                        <TextAreaInput name="customerAddress.address" label="Customer Address" />
                        <div className="mt-3">
                          <MyAutocomplete
                            setFieldValue={setFieldValue}
                            fieldPrefix="customerAddress"
                            placeholder="Enter customer address"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                          <TextInput name="customerAddress.postCode" label="Post Code" />
                          <TextInput label="State" name="customerAddress.state" />
                          <TextInput label="City" name="customerAddress.city" />
                        </div>
                        <div className="flex justify-between mt-5">
                          <button
                            type="button"
                            className="text-red-500 border border-red-500 px-5 py-2 rounded-lg hover:bg-red-50 transition"
                            onClick={() => {
                              setFieldValue('addressType', 'OLD')
                              setFieldValue('customerAddress', {
                                state: '',
                                city: '',
                                address: '',
                                postCode: '',
                              })
                              setIsNewAddressConfirmed(false)
                            }}
                          >
                            Select Old Address
                          </button>
                          <button
                            type="button"
                            className="bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-600 transition disabled:opacity-50"
                            onClick={handleConfirmNewAddress}
                            disabled={
                              !values.customerAddress.address ||
                              !values.customerAddress.city ||
                              !values.customerAddress.state ||
                              !values.customerAddress.postCode ||
                              !values.customerAddress.postCode.match(/^[0-9]{5}$/)
                            }
                          >
                            Confirm Address
                          </button>
                        </div>
                      </>
                    ) : (
                      <div>
                        <CustomerAddressCard customerAddress={values.customerAddress} />
                        <div className="flex justify-between mt-5">
                          <button
                            type="button"
                            className="text-red-500 border border-red-500 px-5 py-2 rounded-lg hover:bg-red-50 transition"
                            onClick={() => {
                              setFieldValue('addressType', 'OLD')
                              setFieldValue('customerAddress', {
                                state: '',
                                city: '',
                                address: '',
                                postCode: '',
                              })
                              setIsNewAddressConfirmed(false)
                            }}
                          >
                            Select Old Address
                          </button>
                          <button
                            type="button"
                            className="bg-white border border-red-500 text-red-500 px-5 py-2 rounded-lg hover:bg-red-50 transition"
                            onClick={handleEditAddress}
                          >
                            Edit Address
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {selectedPackage.type === 'FAMILY' && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Add Family Members</h2>
                    <div className="space-y-6">
                      {values.members.map((_, idx) => (
                        <div
                          key={idx}
                          className="relative p-4 border border-gray-200 rounded-lg bg-gray-50 hover:shadow transition"
                        >
                          <div className="grid md:grid-cols-3 gap-4">
                            <TextInput label="Name" placeholder="Enter Name" name={`members.${idx}.name`} />
                            <NumberInput
                              label="Age"
                              placeholder="Enter Age"
                              name={`members.${idx}.age`}
                              regex={/^(1[0-2]\d|[1-9]?\d)$/}
                            />
                            <SelectInput label="Gender" options={gender} name={`members.${idx}.gender`} />
                          </div>
                          <button
                            type="button"
                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow"
                            onClick={() => handleRemoveMember(idx)}
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    {selectedPackage.members !== values.members.length && (
                      <div className="mt-6 flex justify-end">
                        <button
                          type="button"
                          className="bg-white text-red-500 border border-red-500 px-6 py-2 rounded-lg shadow hover:bg-red-50 transition"
                          onClick={handleAddMember}
                        >
                          + Add Family Member
                        </button>
                      </div>
                    )}
                  </div>
                )}
                {errorMessage && (
                  <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <p className="text-sm mt-0.5 text-red-700">{errorMessage}</p>
                      </div>
                    </div>
                    {clearError && (
                      <button
                        onClick={clearError}
                        className="text-red-400 hover:text-red-600 transition-colors"
                        aria-label="Close error"
                      >
                        <XMarkIcon className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                )}

                <div className="flex justify-end mt-10 space-x-4">
                  <button
                    type="button"
                    className="bg-white text-gray-500 border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  <button
                    disabled={isMutating}
                    type="submit"
                    className="bg-red-500 text-white px-8 py-2 rounded-lg shadow hover:bg-red-600 transition disabled:opacity-70"
                  >
                    {isMutating ? <DashLoader color="white" /> : 'Purchase'}
                  </button>
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}

function CustomerAddressCard({ customerAddress }: { customerAddress: CustomerAddress }) {
  if (!customerAddress) return null
  const { city, state, postCode, address, type } = customerAddress

  return (
    <div className="mt-6 p-5 bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800">Selected Address</h3>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            type === 'primary'
              ? 'bg-blue-100 text-blue-700 border border-blue-200'
              : 'bg-gray-100 text-gray-600 border border-gray-200'
          }`}
        >
          {type === 'primary' ? 'Primary' : 'Secondary'}
        </span>
      </div>
      <div className="space-y-2 text-left">
        <p className="text-sm text-gray-700">{address}</p>
        <p className="text-sm text-gray-600">
          {city}, {state} {postCode}
        </p>
      </div>
    </div>
  )
}

interface CustomerAddress {
  city: string
  state: string
  postCode: string
  address: string
  type?: string
}

function CustomerAddressCards({
  customerAddress,
  onClick,
  className,
}: {
  customerAddress: CustomerAddress | undefined
  onClick: () => void
  className: string
}) {
  if (!customerAddress) return null

  const { city, state, postCode, type } = customerAddress

  return (
    <div
      onClick={onClick}
      className={`p-5 rounded-xl border bg-gray-50 shadow-sm transition hover:shadow-md ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800">Address</h3>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            type === 'primary'
              ? 'bg-blue-100 text-blue-700 border border-blue-200'
              : 'bg-gray-100 text-gray-600 border border-gray-200'
          }`}
        >
          {type === 'primary' ? 'Primary' : 'Secondary'}
        </span>
      </div>
      <div className="text-sm text-gray-600">
        {city}, {state} {postCode}
      </div>
    </div>
  )
}
