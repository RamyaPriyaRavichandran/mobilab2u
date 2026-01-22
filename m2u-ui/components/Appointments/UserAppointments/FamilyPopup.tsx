import React, { useRef } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { motion } from 'framer-motion'
import {
  CUSTOMER_ADDRESS_REQUIRED,
  INPUT_POSTCODE_ERROR,
  INPUT_POSTCODE_MIN_ERROR,
  INPUT_REQUIRED,
  labTestTimeSlots,
  state,
} from '@/utils/constents'
import TextAreaInput from '@/components/common/Input/TextAreaInput'
import DateInput from '@/components/common/Input/DateInput'
import { useOnClickOutside } from 'usehooks-ts'
import DashLoader from '@/components/common/DashLoader'
import SelectInput from '@/components/common/Input/SelectInput'
import useSWR from 'swr'
import { GET_CUSTOMER_ADDRESS } from '@/lib/endpoints'
import { CustomerAddress } from '@/components/Customers/CustomerPackages/interface'
import { fetcher } from '@/lib/fetchers'
import { city } from '@/utils/constents/constantsCity'
import TextInput from '@/components/common/Input/TextInput'

export default function FamilyPackage({
  appointmentId,
  setpurchaseFollowupTest,
  payFollowupTestFees,
  packageId,
  isMutating,
  referredDoctor,
}: any) {
  const testBookingSchema = Yup.object().shape({
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
  const modalRef = useRef<HTMLDivElement>(null)
  console.log('packageId', packageId)
  const handleClose = () => setpurchaseFollowupTest({ popup: false, package: {} })
  const { data, isLoading } = useSWR(GET_CUSTOMER_ADDRESS, fetcher<Array<CustomerAddress>>(), {})

  useOnClickOutside(modalRef, handleClose)

  return (
    <div className=" fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 scroll-auto">
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="p-10 rounded bg-white max-h-[90vh] overflow-y-auto w-full max-w-4xl"
      >
        <h2 className="font-semibold text-center text-lg underline">Followup-Test</h2>
        <Formik
          initialValues={{
            appointmentId: appointmentId,
            packageId: packageId,
            referredDoctor: referredDoctor || '',
            customerAppointmentDate: ' ',
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
          validationSchema={testBookingSchema}
          onSubmit={(values, { setSubmitting }) => {
            payFollowupTestFees(values)
            setSubmitting(false)
          }}
        >
          {({ values, setFieldValue, errors }) => {
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
                        <p className="text-red-500 text-sm mb-2">Please select an address</p>
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
                        }}
                      >
                        + Add New Address
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Add New Address</h2>
                    <TextAreaInput name="customerAddress.address" label="Customer Address" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                      <TextInput name="customerAddress.postCode" label="Post Code" />
                      <SelectInput name="customerAddress.state" options={state} label="State" />
                      <SelectInput options={cityMain} name="customerAddress.city" label="City" />
                    </div>
                    <button
                      type="button"
                      className="text-red-500 border border-red-500 px-5 py-2 rounded-lg mt-5 hover:bg-red-50 transition"
                      onClick={() => {
                        setFieldValue('addressType', 'OLD')
                        setFieldValue('customerAddress', {
                          state: '',
                          city: '',
                          address: '',
                          postCode: '',
                        })
                      }}
                    >
                      Select Old Address
                    </button>
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
      </motion.div>
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
