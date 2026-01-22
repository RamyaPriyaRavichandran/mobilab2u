'use client'
import { useState } from 'react'
import * as Yup from 'yup'
import SelectInput from '@/components/common/Input/SelectInput'
import TextInput from '@/components/common/Input/TextInput'
import {
  BOOK_FOLLOWUP_DOCTOR_APPOINTMENT,
  BOOK_RANDOM_DOCTOR_FOLLOWUP_APPOINTMENT,
  GET_AVAILABLE_TIME_SLOTS,
  GET_FOLLOWUP_APPOINTMENT_AVAILABILITY,
} from '@/lib/endpoints'
import { fetcher, mutater } from '@/lib/fetchers'
import { INPUT_REQUIRED, language } from '@/utils/constents'
import { FieldArray, Form, Formik } from 'formik'
import { useParams, useRouter } from 'next/navigation'
import useSWR from 'swr'
import { DoctorAppointment, PrescriptionDetail, TimeSlot, User } from '../types'
import { PackageDetailInterface } from '@/components/Customers/CustomerInterface'
import { usePopup } from '@/lib/contexts/PopupContext'
import useSWRMutation from 'swr/mutation'
import DashLoader from '@/components/common/DashLoader'
import { useAlert } from '@/lib/contexts/AlertContext'
import UploadInput from '@/components/common/Input/UploadInput'

export interface DoctorAvailability {
  slotId: string
  _id: string
  date: string
  startTime: string
  endTime: string
}

interface AppointmentDetails {
  _id: string
  prescription: PrescriptionDetail
  approvedDoctor: User
  customer: User
  package: PackageDetailInterface
  appointment: DoctorAppointment
  timeSlot: TimeSlot
}
interface GetFollowupAppointmentAvailablity {
  appointment: AppointmentDetails
  DoctorAvailability: DoctorAvailability[]
}

interface PostFollowupAppointment {
  appointmentDate: string
  startTime: string
  endTime: string
  doctorLanguage: string
  appointmentId: string
  nameOne: string
  nameTwo: string
  nameThree: string
  medicalRecords: any
}

export default function FollowUpBooking() {
  const followupBookingSchema = Yup.object().shape({
    startTime: Yup.string().required(INPUT_REQUIRED),
    endTime: Yup.string().required(INPUT_REQUIRED),
  })
  const [showModal, setShowModal] = useState(true)
  const { id } = useParams()
  const router = useRouter()
  const { showAlert } = useAlert()
  const { showError } = usePopup()
  const {
    data: {
      appointment = {} as AppointmentDetails,
      DoctorAvailability = [] as DoctorAvailability[],
    } = {} as GetFollowupAppointmentAvailablity,
  } = useSWR(`${GET_FOLLOWUP_APPOINTMENT_AVAILABILITY}/${id}`, fetcher<GetFollowupAppointmentAvailablity>(), {
    revalidateOnFocus: false,
    onSuccess: (data) => {
      if (data.DoctorAvailability.length > 0) {
        showAlert(
          'Thanks for choosing MobiLab . The Follow of Doctor slot Availability there',
          () => setShowModal(false),
          `/appointments/${id}`
        )
      } else {
        showAlert(
          'The Previous doctor time slots not available for the follow-up Date. Please select another doctor for same date and language.',
          () => setShowModal(false),
          `/appointments/${id}`
        )
      }
    },
  })

  const isEmpty =
    !appointment?.prescription?.followUpAppointmentDate?.slice(0, 10) && !appointment?.approvedDoctor?.language

  const { data: randomAvailablity = [] } = useSWR(
    DoctorAvailability.length === 0 && !isEmpty
      ? `${GET_AVAILABLE_TIME_SLOTS}?date=${appointment?.prescription?.followUpAppointmentDate?.slice(0, 10)}&language=${appointment?.approvedDoctor?.language}`
      : null,
    fetcher<Array<DoctorAvailability>>()
  )
  const SubmitFormFollowup = (values: any) => {
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

    payFollowupDoctorFees(formData)
  }

  const SubmitRandomDoctor = (values: any) => {
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

    payRandomDoctorFees(formData)
  }
  const { trigger: payFollowupDoctorFees, isMutating: feesMutating } = useSWRMutation(
    BOOK_FOLLOWUP_DOCTOR_APPOINTMENT,
    mutater<FormData, { stripeURL: string }>('POST', true),
    {
      onSuccess: ({ data }) => {
        window.location.href = data.stripeURL
      },
      onError: ({ response: { data: { message = '' } = {} } }) => {
        showError(message)
      },
      throwOnError: false,
    }
  )
  const { trigger: payRandomDoctorFees, isMutating: randomFeesMutating } = useSWRMutation(
    BOOK_RANDOM_DOCTOR_FOLLOWUP_APPOINTMENT,
    mutater<FormData, { stripeURL: string }>('POST', true),
    {
      onSuccess: ({ data }) => {
        window.location.href = data.stripeURL
      },
      onError: ({ response: { data: { message = '' } = {} } }) => {
        showError(message)
      },
      throwOnError: false,
    }
  )

  return (
    <div className="p-4">
      <div className="bg-brand-50 max-w-[800px] mx-auto rounded-lg p-5 mb-8 shadow-md">
        <h3 className="text-xl font-extrabold text-center text-gray-800 mb-6 text-gradient bg-clip-text">
          Doctor Appointment Booking
        </h3>

        <Formik
          initialValues={{
            appointmentDate: appointment?.prescription?.followUpAppointmentDate?.slice(0, 10) || '',
            startTime: '',
            endTime: '',
            slotId: '',
            appointmentId: appointment._id,
            doctorLanguage: appointment?.approvedDoctor?.language || '',
            nameOne: '',
            nameTwo: '',
            nameThree: '',
            medicalRecords: [],
          }}
          enableReinitialize
          validationSchema={followupBookingSchema}
          onSubmit={(values, { setSubmitting }) => {
            if (DoctorAvailability.length > 0) {
              SubmitFormFollowup(values)
            } else if (randomAvailablity.length > 0) {
              SubmitRandomDoctor(values)
            }
            setSubmitting(false)
          }}
        >
          {({ values, setFieldValue, errors }) => {
            return (
              <FormFields
                isEmpty={isEmpty}
                errors={errors}
                randomAvailablity={randomAvailablity}
                feesMutating={feesMutating}
                randomFeesMutating={randomFeesMutating}
                DoctorAvailability={DoctorAvailability}
                setFieldValue={setFieldValue}
                values={values}
                router={router}
              />
            )
          }}
        </Formik>
      </div>
    </div>
  )
}

function FormFields({
  values,
  setFieldValue,
  DoctorAvailability,
  feesMutating,
  router,
  randomAvailablity,
  isEmpty,
  randomFeesMutating,
  errors,
}: {
  values: any
  errors: any
  isEmpty: boolean
  setFieldValue: (field: string, value: string) => void
  DoctorAvailability: DoctorAvailability[]
  feesMutating: boolean
  randomFeesMutating: boolean
  randomAvailablity: DoctorAvailability[]
  router: any
}) {
  const availablityMain = DoctorAvailability.length > 0 ? DoctorAvailability : randomAvailablity

  const currentDate = new Date()
  const nextDate = new Date(currentDate)
  nextDate.setDate(currentDate.getDate() + 1)

  const nextDateString = nextDate.toISOString().split('T')[0]
  const sortData = availablityMain.sort((a, b) => {
    const parseTime = (time: string): number => {
      const [hours, minutes] = time.match(/\d+/g)!.map(Number)
      const isPM = time.includes('PM')
      return (isPM && hours !== 12 ? hours + 12 : hours === 12 && !isPM ? 0 : hours) * 60 + minutes
    }
    return parseTime(a.startTime) - parseTime(b.startTime)
  })
  const docSuffix = ['One', 'Two', 'Three']
  return (
    <div>
      <Form>
        <div>
          <div className="md:grid md:grid-cols-2 md:gap-5 text-left">
            <TextInput
              disabled={true}
              minStartDate={nextDateString}
              type="date"
              label="Appointment Date"
              name="appointmentDate"
            />
            <SelectInput
              disabled={true}
              enableInitialSelect={true}
              label="Language"
              name="doctorLanguage"
              options={language}
            />
            <div className="md:col-span-2 relative">
              <p>Available time slots:</p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-2">
                {availablityMain.length > 0 ? (
                  sortData.map((item) => (
                    <button
                      key={item.slotId}
                      type="button"
                      onClick={() => {
                        setFieldValue('slotId', item.slotId)
                        setFieldValue('startTime', item.startTime)
                        setFieldValue('endTime', item.endTime)
                      }}
                      className={`px-4 py-1 text-sm rounded-lg border transition-colors ${values.slotId === item.slotId ? 'bg-blue-600 text-white' : 'bg-white  text-gray-700'}`}
                    >
                      {item.startTime} - {item.endTime}
                    </button>
                  ))
                ) : (
                  <p className="col-span-4">
                    {isEmpty ? 'Please select date and language' : 'Time slot not found for given date'}
                  </p>
                )}
              </div>
              {errors.startTime === 'Required' && errors.endTime === 'Required' && (
                <p className="text-red-500 -bottom-7 absolute">Please select time slots</p>
              )}
            </div>
          </div>
          {values.slotId && (
            <div>
              <h4 className="text-center font-medium text-gray-700 text-base mb-4">
                Upload Prior Medical Records, if any
              </h4>
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
                          className="text-blue-600 hover:underline text-sm font-medium"
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

          <div className="flex justify-end mt-8 space-x-3">
            <button
              onClick={() => router.push(`/appointments/${values.appointmentId}`)}
              type="button"
              className="bg-white text-brand-500 hover:text-brand-600 border-[2px] border-brand-500 px-4 py-1 rounded-md mr-2"
            >
              Back
            </button>
            <button
              disabled={feesMutating || randomFeesMutating}
              type="submit"
              className="bg-white text-green-500 hover:text-green-600 border-[2px] border-green-500 px-3 rounded-md py-1"
            >
              {feesMutating || randomFeesMutating ? 'Loading...' : 'Book Followup'}
            </button>
          </div>
        </div>
      </Form>
    </div>
  )
}
