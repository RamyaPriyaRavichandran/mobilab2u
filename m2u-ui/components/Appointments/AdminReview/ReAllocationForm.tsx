'use client'
import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import useSWR from 'swr'
import { INPUT_REQUIRED, language } from '@/utils/constents'
import {
  GET_AVAILABLE_TIME_SLOTS,
  APPOINTMENT_RE_ALLOCATION,
  GET_CUSTOMER_APPOINTMENT_DOCTOR_DETAIL_ADMIN,
} from '@/lib/endpoints'
import { fetcher, mutater } from '@/lib/fetchers'
import TextInput from '@/components/common/Input/TextInput'
import SelectInput from '@/components/common/Input/SelectInput'
import DashLoader from '@/components/common/DashLoader'
import { DoctorAvailability } from '@/components/Customers/CustomerPackages/interface'
import { useParams, useRouter } from 'next/navigation'
import useSWRMutation from 'swr/mutation'
import { usePopup } from '@/lib/contexts/PopupContext'
import { Calendar, Clock, User, ChevronRight, CheckCircle } from 'lucide-react'

const schema = Yup.object().shape({
  appointmentDate: Yup.date().required(INPUT_REQUIRED),
  startTime: Yup.string().required(INPUT_REQUIRED),
  endTime: Yup.string().required(INPUT_REQUIRED),
  slotId: Yup.string().required(INPUT_REQUIRED),
  doctorLanguage: Yup.string().required(INPUT_REQUIRED),
})

export default function ReallocationForm({ appointmentId }: { appointmentId: string }) {
  const { id } = useParams()
  const { showSuccess, showError } = usePopup()
  const router = useRouter()

  const { trigger, isMutating } = useSWRMutation(
    `${APPOINTMENT_RE_ALLOCATION}/${id}`,
    mutater<any, { message: string }>('POST'),
    {
      onSuccess: ({ data }) => {
        showSuccess(data?.message || 'Updated')
        router.back()
      },
      onError: ({ response }) => {
        showError(response?.data?.message || 'Something went wrong')
      },
      throwOnError: false,
    }
  )

  const todayString = new Date().toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Re-Allocate Appointment</h1>
          <p className="text-gray-600">Select a new date, time, and doctor for your appointment</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <Formik
            initialValues={{
              appointmentDate: '',
              startTime: '',
              endTime: '',
              slotId: '',
              doctorLanguage: '',
              doctorId: '',
            }}
            validationSchema={schema}
            onSubmit={(values) => trigger(values)}
          >
            {({ values, setFieldValue }) => (
              <FormFields setFieldValue={setFieldValue} values={values} isMutating={isMutating} router={router} />
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

function FormFields({ setFieldValue, values, isMutating, router }: any) {
  const currentDate = new Date()
  const nextDate = new Date(currentDate)
  nextDate.setDate(currentDate.getDate() + 1)
  const nextDateString = nextDate.toISOString().split('T')[0]
  const isEmpty = !values.appointmentDate || !values.doctorLanguage

  const { data = [] } = useSWR(
    !isEmpty ? `${GET_AVAILABLE_TIME_SLOTS}?date=${values.appointmentDate}&language=${values.doctorLanguage}` : null,
    fetcher<Array<DoctorAvailability>>()
  )

  const isStep1Complete = values.appointmentDate && values.doctorLanguage
  const isStep2Complete = values.slotId && values.startTime && values.endTime
  const isStep3Complete = values.doctorId

  return (
    <Form className="p-8">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-10">
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-2 ${isStep1Complete ? 'text-green-600' : 'text-blue-600'}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                isStep1Complete ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
              }`}
            >
              {isStep1Complete ? <CheckCircle className="w-5 h-5" /> : '1'}
            </div>
            <span className="font-medium">Date & Language</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <div
            className={`flex items-center space-x-2 ${
              isStep2Complete ? 'text-green-600' : isStep1Complete ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                isStep2Complete
                  ? 'bg-green-100 text-green-600'
                  : isStep1Complete
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-400'
              }`}
            >
              {isStep2Complete ? <CheckCircle className="w-5 h-5" /> : '2'}
            </div>
            <span className="font-medium">Time Slot</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <div
            className={`flex items-center space-x-2 ${
              isStep3Complete ? 'text-green-600' : isStep2Complete ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                isStep3Complete
                  ? 'bg-green-100 text-green-600'
                  : isStep2Complete
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-400'
              }`}
            >
              {isStep3Complete ? <CheckCircle className="w-5 h-5" /> : '3'}
            </div>
            <span className="font-medium">Select Doctor</span>
          </div>
        </div>
      </div>

      {/* Step 1: Date and Language Selection */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Calendar className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Step 1: Choose Date & Language</h3>
        </div>
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Appointment Date</label>
              <TextInput
                name="appointmentDate"
                type="date"
                minStartDate={nextDateString}
                label=""
                inputstyle="w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Preferred Language</label>
              <SelectInput name="doctorLanguage" label="" options={language} enableInitialSelect className="w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Step 2: Time Slot Selection */}
      {!isEmpty && (
        <TimeSlotPicker
          data={data}
          date={values.appointmentDate}
          lang={values.doctorLanguage}
          selectedSlotId={values.slotId}
          selectedDoctorId={values.doctorId}
          values={values}
          onSelect={(slot: DoctorAvailability) => {
            setFieldValue('slotId', slot.slotId)
            setFieldValue('startTime', slot.startTime)
            setFieldValue('endTime', slot.endTime)
          }}
          onSelectDoctor={(doctor: any) => {
            setFieldValue('doctorId', doctor)
          }}
        />
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-4 pt-8 border-t border-gray-100 mt-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 text-gray-700 font-medium transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isMutating || !values.slotId || !values.doctorId}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all duration-200 flex items-center justify-center min-w-[140px]"
        >
          {isMutating ? <DashLoader color="white" /> : 'Confirm Reallocation'}
        </button>
      </div>
    </Form>
  )
}

function TimeSlotPicker({
  date,
  lang,
  selectedSlotId,
  onSelect,
  data,
  values,
  onSelectDoctor,
  selectedDoctorId,
}: {
  date: string
  lang: string
  selectedSlotId: string
  selectedDoctorId: string
  onSelect: (slot: DoctorAvailability) => void
  data: any[]
  values: any
  onSelectDoctor: any
}) {
  const isEmptyDoctor = !values.startTime || !values.endTime
  const sorted = data.sort((a, b) => {
    const parseTime = (time: string): number => {
      const [hours, minutes] = time.match(/\d+/g)!.map(Number)
      const isPM = time.includes('PM')
      return (isPM && hours !== 12 ? hours + 12 : hours === 12 && !isPM ? 0 : hours) * 60 + minutes
    }
    return parseTime(a.startTime) - parseTime(b.startTime)
  })

  const { data: doctorDetail = [] } = useSWR(
    !isEmptyDoctor
      ? `${GET_CUSTOMER_APPOINTMENT_DOCTOR_DETAIL_ADMIN}?date=${date}&startTime=${values.startTime}&endTime=${values.endTime}`
      : null,
    fetcher<Array<DoctorAvailability>>()
  )

  return (
    <div className="space-y-8">
      {/* Step 2: Time Slots */}
      <div>
        <div className="flex items-center mb-4">
          <Clock className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Step 2: Select Time Slot</h3>
        </div>
        <div className="bg-gray-50 rounded-xl p-6">
          {sorted.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {sorted.map((slot) => (
                <button
                  key={slot.slotId}
                  type="button"
                  onClick={() => onSelect(slot)}
                  className={`px-4 py-3 text-sm rounded-xl border-2 text-center font-medium transition-all duration-200 ${
                    selectedSlotId === slot.slotId
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg transform scale-105'
                      : 'bg-white hover:bg-blue-50 border-gray-200 hover:border-blue-300 text-gray-700 hover:shadow-md'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <Clock className="w-4 h-4" />
                    <span>{slot.startTime}</span>
                    <span className="text-xs opacity-75">to {slot.endTime}</span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No time slots available for the selected date and language</p>
            </div>
          )}
        </div>
      </div>

      {/* Step 3: Doctor Selection */}
      {!isEmptyDoctor && (
        <div>
          <div className="flex items-center mb-4">
            <User className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Step 3: Choose Your Doctor</h3>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            {doctorDetail.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doctorDetail.map((doc: any) => (
                  <button
                    type="button"
                    key={doc._id}
                    onClick={() => onSelectDoctor(doc?.doctor?._id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      selectedDoctorId === doc?.doctor?._id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg transform scale-105'
                        : 'bg-white hover:bg-blue-50 border-gray-200 hover:border-blue-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          selectedDoctorId === doc?.doctor?._id ? 'bg-blue-500' : 'bg-blue-100'
                        }`}
                      >
                        <User
                          className={`w-5 h-5 ${
                            selectedDoctorId === doc?.doctor?._id ? 'text-white' : 'text-blue-600'
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-base truncate">{doc.doctor.name}</p>
                        <p
                          className={`text-sm mt-1 ${
                            selectedDoctorId === doc?.doctor?._id ? 'text-blue-100' : 'text-gray-600'
                          }`}
                        >
                          {doc.doctor.medicalQualification}
                        </p>
                        <p
                          className={`text-sm mt-1 ${
                            selectedDoctorId === doc?.doctor?._id ? 'text-blue-200' : 'text-gray-500'
                          }`}
                        >
                          Language: {doc.doctor.language}
                        </p>
                      </div>
                      {selectedDoctorId === doc?.doctor?._id && (
                        <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No doctors available for the selected time slot</p>
                <p className="text-sm text-gray-400 mt-1">Please choose a different time slot</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
