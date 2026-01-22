'use client'

import React, { Dispatch, SetStateAction } from 'react'
import { Formik, Form, FieldArray } from 'formik'
import * as Yup from 'yup'
import useSWR from 'swr'
import TextInput from '@/components/common/Input/TextInput'
import SelectInput from '@/components/common/Input/SelectInput'
import DashLoader from '@/components/common/DashLoader'
import { language, INPUT_REQUIRED } from '@/utils/constents'
import { GET_AVAILABLE_TIME_SLOTS } from '@/lib/endpoints'
import { fetcher } from '@/lib/fetchers'
import { DoctorPackageInterface } from '../CustomerInterface'
import { DoctorAvailability } from './interface'
import UploadInput from '@/components/common/Input/UploadInput'

const doctorBookingSchema = Yup.object().shape({
  appointmentDate: Yup.date().required(INPUT_REQUIRED),
  startTime: Yup.string().required(INPUT_REQUIRED),
  endTime: Yup.string().required(INPUT_REQUIRED),
  slotId: Yup.string().required(INPUT_REQUIRED),
  doctorLanguage: Yup.string().required(INPUT_REQUIRED),
})

export default function DoctorBooking({
  selectedPackage,
  isMutating,
  setPopup,
  payDoctorFees,
}: DoctorPackageInterface) {
  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-[640px] ">
        <h3 className="text-xl font-bold text-center text-gray-700 mb-6">Doctor Appointment Booking</h3>
        <div className="rounded-xl p-6 mb-8 shadow-lg bg-white space-y-6">
          <DoctorBookingFormFields
            isMutating={isMutating}
            payDoctorFees={payDoctorFees}
            setPopup={setPopup}
            selectedPackage={selectedPackage}
          />
        </div>
      </div>
    </div>
  )
}

function DoctorBookingFormFields({ selectedPackage, isMutating, setPopup, payDoctorFees }: DoctorPackageInterface) {
  const SubmitForm = (values: any) => {
    const formData = new FormData()

    const { medicalRecords, ...rest } = values
    formData.append('data', JSON.stringify(rest))

    const docSuffix = ['One', 'Two', 'Three']

    medicalRecords.forEach((record: any, index: number) => {
      const suffix = docSuffix[index]
      if (record.document) {
        formData.append(`document${suffix}`, record.document)
      }
    })

    payDoctorFees(formData)
  }

  return (
    <Formik
      initialValues={{
        packageId: '',
        appointmentDate: '',
        startTime: '',
        endTime: '',
        slotId: '',
        doctorLanguage: '',
        nameOne: '',
        nameTwo: '',
        nameThree: '',
        medicalRecords: [],
      }}
      validationSchema={doctorBookingSchema}
      onSubmit={(values, { setSubmitting }) => {
        values.packageId = selectedPackage._id
        SubmitForm(values)
        setSubmitting(false)
      }}
    >
      {({ values, setFieldValue }) => (
        <FormFields setFieldValue={setFieldValue} values={values} setPopup={setPopup} isMutating={isMutating} />
      )}
    </Formik>
  )
}

function FormFields({
  setPopup,
  isMutating,
  values,
  setFieldValue,
}: {
  setPopup: Dispatch<SetStateAction<{ popup: boolean; package: object }>>
  isMutating: boolean
  values: any
  setFieldValue: (field: string, value: any) => void
}) {
  const isEmpty = !values.appointmentDate || !values.doctorLanguage
  const { data = [] } = useSWR(
    !isEmpty ? `${GET_AVAILABLE_TIME_SLOTS}?date=${values.appointmentDate}&language=${values.doctorLanguage}` : null,
    fetcher<Array<DoctorAvailability>>()
  )
  const currentDate = new Date()
  const nextDate = new Date(currentDate)
  nextDate.setDate(currentDate.getDate() + 1)
  const nextDateString = nextDate.toISOString().split('T')[0]

  const sortData = data.sort((a, b) => {
    const parseTime = (time: string): number => {
      const [hours, minutes] = time.match(/\d+/g)!.map(Number)
      const isPM = time.includes('PM')
      return (isPM && hours !== 12 ? hours + 12 : hours === 12 && !isPM ? 0 : hours) * 60 + minutes
    }
    return parseTime(a.startTime) - parseTime(b.startTime)
  })
  const docSuffix = ['One', 'Two', 'Three']

  return (
    <Form className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput type="date" minStartDate={nextDateString} label="Appointment Date" name="appointmentDate" />
        <SelectInput enableInitialSelect label="Language" name="doctorLanguage" options={language} />
      </div>

      {!isEmpty && (
        <div>
          <p className="font-medium text-gray-700 mb-2">Available Time Slots</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {data.length > 0 ? (
              sortData.map((item) => (
                <button
                  key={item.slotId}
                  type="button"
                  onClick={() => {
                    setFieldValue('slotId', item.slotId)
                    setFieldValue('startTime', item.startTime)
                    setFieldValue('endTime', item.endTime)
                  }}
                  className={`px-3 py-2 text-sm rounded-md border text-center transition-all duration-150 ${
                    values.slotId === item.slotId
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-gray-50 hover:bg-blue-50 border-gray-300 text-gray-700'
                  }`}
                >
                  {item.startTime} - {item.endTime}
                </button>
              ))
            ) : (
              <p className="col-span-3 text-sm text-gray-500">No time slots available</p>
            )}
          </div>
        </div>
      )}

      {values.slotId && (
        <div>
          <h4 className="text-center font-medium text-gray-700 text-base mb-4">Upload Prior Medical Records, if any</h4>
          <FieldArray name="medicalRecords">
            {({ push, remove }) => (
              <div className="space-y-6">
                {values.medicalRecords.length > 0 && (
                  <>
                    {values.medicalRecords.map((record: any, index: number) => (
                      <div
                        key={index}
                        className="relative border border-gray-300 rounded-2xl p-6 pt-4 bg-white/70 backdrop-blur-sm shadow-md transition hover:shadow-lg space-y-4"
                      >
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="absolute top-4 right-4 text-xs text-red-600 font-semibold hover:underline transition-all"
                        >
                          Remove
                        </button>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <TextInput label={`Document Name ${index + 1}`} name={`name${docSuffix[index]}`} />
                          <UploadInput
                            name={`medicalRecords[${index}].document`}
                            label={`Upload File ${index + 1}`}
                            fileLimit={1}
                            fileSize={2}
                          />
                        </div>

                        <p className="text-xs text-gray-500">
                          Max 1 file per upload, up to 2MB. Formats: PDF, JPG, PNG.
                        </p>
                      </div>
                    ))}
                  </>
                )}

                {values.medicalRecords.length < 3 && (
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => push({ name: '', document: null })}
                      className="text-red-600 hover:underline text-sm font-medium"
                    >
                      + Add Medical Record
                    </button>
                  </div>
                )}
              </div>
            )}
          </FieldArray>
        </div>
      )}

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={() => setPopup({ popup: false, package: {} })}
          className="px-5 py-2 border border-red-500 text-red-500 rounded-md hover:bg-blue-50"
        >
          Close
        </button>
        <button
          type="submit"
          disabled={isMutating}
          className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center justify-center"
        >
          {isMutating ? <DashLoader color="white" /> : 'Book'}
        </button>
      </div>
    </Form>
  )
}
