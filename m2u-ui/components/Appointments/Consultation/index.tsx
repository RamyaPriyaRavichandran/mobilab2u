'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useSearchParams, useParams, useRouter } from 'next/navigation'
import { fetcher, mutater } from '@/lib/fetchers'
import useSWR from 'swr'
import {
  ADD_APPOINTMENT_MEDICINE,
  GET_APPOINTMENT_PRESCRIPTION,
  GET_CUSTOMER_APPOINTMENT,
  MARK_AS_CONSULTATION_COMPLETED,
  DOCTOR_CONFIRMATION,
} from '@/lib/endpoints'
import { usePopup } from '@/lib/contexts/PopupContext'
import useSWRMutation from 'swr/mutation'
import type { DoctorAppointment, MedicineDetail, PrescriptionDetail } from '../types'
import {
  APPOINTMENT_STATUS,
  CONSULTATION_DONE,
  DOCTOR_CONFIRMATION_TEXT,
  DOCTOR_CONSULTATION_WAITING_TEXT,
} from '@/utils/constents'
import { useAlert } from '@/lib/contexts/AlertContext'
import AppointmentDetail from '../AppointmentDetail'
import CustomerPurchasedPackages from '../CustomerPurchasedPackages'
import Medicine from '../Medicine'
import ReferralForm from '../Referral'
import TestForm from './TestFormModel'
import DashLoader from '@/components/common/DashLoader'
import { Calendar, ClipboardList, FileText, FilePlus2, FileCheck2, CheckCircle2, User, Package } from 'lucide-react'
import { getTimeDiffBetweenCurrentTimeAndAppTime } from '@/utils/functions'
import LittleLoader from '@/components/common/LittleLoader'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { getHourDiffFromNow } from '@/components/common/diffhourschatGpt'

type ConfirmationState = {
  popup: boolean
  message: string
  function: (() => void) | null
}

export default function Consultation() {
  const router = useSearchParams()
  const routeRouter = useRouter()
  const { id } = useParams()
  const { showAlert } = useAlert()
  const customer = router.get('customer')
  const { showSuccess, showError } = usePopup()

  const [showPrescription, setShowPrescription] = useState(false)
  const [showReferralForm, setShowReferralForm] = useState(false)
  const [showTestForm, setShowTestForm] = useState(false)
  const [confirmation, setConfirmation] = useState<ConfirmationState>({
    popup: false,
    message: '',
    function: null,
  })

  const {
    data: appointmentDetails = {} as DoctorAppointment,
    mutate: appointmentMutate,
    isLoading,
  } = useSWR(`${GET_CUSTOMER_APPOINTMENT}/${id}`, fetcher<DoctorAppointment>())
  const { data: prescription = {} as PrescriptionDetail, mutate } = useSWR(
    `${GET_APPOINTMENT_PRESCRIPTION}/${id}`,
    fetcher<PrescriptionDetail>()
  )

  // console.log('Appointment Details:', appointmentDetails)
  const { trigger: addAppointmentMedicine, isMutating } = useSWRMutation(
    `${ADD_APPOINTMENT_MEDICINE}/${id}`,
    mutater<MedicineDetail, { message: string }>('POST'),
    {
      onSuccess: ({ data: { message = '' } }) => {
        showSuccess(message)
        mutate()
        setShowPrescription(false)
      },
      onError: ({ response: { data: { message = '' } = {} } }) => {
        showError(message)
      },
      throwOnError: false,
    }
  )

  const { trigger } = useSWRMutation(
    `${MARK_AS_CONSULTATION_COMPLETED}/${id}`,
    mutater<any, { message: string }>('POST'),
    {
      onSuccess: ({ data: { message = '' } }) => {
        showSuccess(message)
        mutate()
        appointmentMutate()
      },
      onError: ({ response: { data: { message = '' } = {} } }) => {
        showError(message)
      },
      throwOnError: false,
    }
  )

  const { trigger: doctorConfirmationTrigger, isMutating: confirmationLoading } = useSWRMutation(
    `${DOCTOR_CONFIRMATION}/${id}`,
    mutater<any, { message: string }>('POST'),
    {
      onSuccess: ({ data: { message = '' } }) => {
        showSuccess(message)
        appointmentMutate()
        setConfirmation({
          popup: false,
          message: '',
          function: null,
        })
      },
      onError: ({ response: { data: { message = '' } = {} } }) => {
        setConfirmation({
          popup: true,
          function: null,
          message: message,
        })
      },
      throwOnError: false,
    }
  )
  const appointmentAlert = () => {
    if (appointmentDetails.status === APPOINTMENT_STATUS.APPROVED) {
      const appointmentDate = appointmentDetails.appointmentDate
      const slotTime = appointmentDetails?.selectedTimeSlot

      // Map NODE_ENV to only allowed values for getHourDiffFromNow
      const diffHours = getHourDiffFromNow(appointmentDate, slotTime, process.env.NEXT_PUBLIC_NODE_ENV)
      if (diffHours !== null && diffHours <= 1 && diffHours > 0) {
        setConfirmation({
          popup: true,
          message: DOCTOR_CONFIRMATION_TEXT,
          function: doctorConfirmationTrigger,
        })
      } else {
        setConfirmation({
          popup: true,
          message: DOCTOR_CONSULTATION_WAITING_TEXT,
          function: null,
        })
      }
    }
  }

  useEffect(() => {
    appointmentAlert()
  }, [appointmentDetails._id])

  const status =
    appointmentDetails.status === APPOINTMENT_STATUS.DOCTOR_CONSULTATION_DONE ||
    appointmentDetails.status === APPOINTMENT_STATUS.COMPLETED

  const referalVisible =
    appointmentDetails.status === APPOINTMENT_STATUS.DOCTOR_CONFIRMED || prescription?.referral?.complaint
  const followupTestVisible =
    appointmentDetails.status === APPOINTMENT_STATUS.DOCTOR_CONFIRMED || prescription?.followupTest?.name
  const prescriptionVisible = !!status && prescription?.medicine?._id ? true : false

  const currentDate =
    process.env.NODE_ENV === 'test'
      ? new Date()
      : new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kuala_Lumpur' }))
  const currentDateValue = currentDate.toISOString().slice(0, 10)
  const appointmentDate = appointmentDetails?.appointmentDate?.slice(0, 10)
  const isAppointmentDatePassed = currentDateValue === appointmentDate
  const isAppointmentDone = status || isAppointmentDatePassed

  const getStatusBadgeClass = () => {
    if (
      appointmentDetails.status === APPOINTMENT_STATUS.DOCTOR_CONSULTATION_DONE ||
      appointmentDetails.status === APPOINTMENT_STATUS.COMPLETED
    ) {
      return 'bg-green-100 text-green-800 border-green-300'
    } else if (appointmentDetails.status === 'APPROVED') {
      return 'bg-blue-100 text-blue-800 border-blue-300'
    } else if (appointmentDetails.status === 'PENDING') {
      return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    } else if (appointmentDetails.status === 'DOCTOR_CONFIRMED') {
      return 'bg-cyan-100 text-cyan-800 border-cyan-300'
    } else {
      return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 mb-6">
          <ClipboardList className="h-6 w-6 text-teal-600" />
          <h1 className="text-2xl font-bold text-gray-900">Patient Consultation</h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <DashLoader size="large" />
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6 transition-all duration-200 hover:shadow-md">
              <div className="border-b border-gray-100">
                <div className="px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
                        <User className="h-5 w-5 text-teal-600" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Consultation Details</h2>
                      <div className="flex items-center mt-1">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeClass()}`}
                        >
                          {appointmentDetails.status?.replace(/_/g, ' ')}
                        </span>
                        {appointmentDetails.appointmentDate && (
                          <div className="flex items-center ml-3 text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(appointmentDetails.appointmentDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {isAppointmentDone && (
                    <div className="mt-4 md:mt-0 flex flex-wrap gap-2 items-center justify-end">
                      {prescriptionVisible ||
                      (appointmentDetails.status !== 'DOCTOR_CONSULTATION_DONE' &&
                        appointmentDetails.status !== 'COMPLETED') ? (
                        <button
                          className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200"
                          onClick={() => setShowPrescription(true)}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          {prescription?.medicine?._id ? 'View Prescription' : 'Add Prescription'}
                        </button>
                      ) : null}

                      {referalVisible && (
                        <button
                          className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                          onClick={() => setShowReferralForm(true)}
                        >
                          <FilePlus2 className="h-4 w-4 mr-2" />
                          {prescription?.referral?.complaint ? 'View Referral' : 'Add Referral'}
                        </button>
                      )}

                      {followupTestVisible && (
                        <button
                          className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                          onClick={() => setShowTestForm(true)}
                        >
                          <FileCheck2 className="h-4 w-4 mr-2" />
                          {prescription?.followupTest?.name ? 'View Test' : 'Add Test'}
                        </button>
                      )}

                      {!status && (
                        <button
                          className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                          onClick={() => showAlert(CONSULTATION_DONE, trigger)}
                          disabled={isMutating}
                        >
                          {isMutating ? (
                            <DashLoader color="white" size="small" />
                          ) : (
                            <>
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Complete Consultation
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="px-6 py-5">
                <AppointmentDetail
                  isLoading={isLoading}
                  appointmentDetails={appointmentDetails}
                  prescription={prescription}
                  isAppointmentDone={isAppointmentDone}
                  isAppointmentDatePassed={isAppointmentDatePassed}
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md">
              <div className="px-6 py-5 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Package className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Medical Records</h2>
                </div>
              </div>
              <div className="px-6 py-5">
                <CustomerPurchasedPackages customerId={appointmentDetails?.customer?._id} />
              </div>
            </div>
          </>
        )}
      </div>

      {showPrescription && (
        <Medicine
          appointmentDetails={appointmentDetails}
          isMutating={isMutating}
          trigger={addAppointmentMedicine}
          prescriptionDetails={prescription || {}}
          onClose={() => setShowPrescription(false)}
        />
      )}

      {showReferralForm && (
        <ReferralForm
          mutate={mutate}
          doctorName={appointmentDetails.approvedDoctor.name}
          doctorSign={appointmentDetails.approvedDoctor?.eSign?.s3URL}
          referralFormData={prescription?.referral}
          onClose={() => setShowReferralForm(false)}
        />
      )}

      {showTestForm && (
        <TestForm
          mutate={mutate}
          followUpTest={prescription?.followupTest || {}}
          onClose={() => setShowTestForm(false)}
        />
      )}
      {confirmation.popup && (
        <ConfirmAppt
          confirmationLoading={confirmationLoading}
          setConfirmation={setConfirmation}
          confirmation={confirmation}
          onConfirm={confirmation.function ?? undefined}
          routeRouter={routeRouter}
        />
      )}
    </div>
  )
}

interface ConfirmApptProps {
  setConfirmation: Dispatch<SetStateAction<ConfirmationState>>
  confirmation: ConfirmationState
  onConfirm?: () => void
  confirmationLoading: boolean
  routeRouter: AppRouterInstance
}

function ConfirmAppt({ setConfirmation, confirmation, onConfirm, confirmationLoading, routeRouter }: ConfirmApptProps) {
  return (
    <Dialog
      open={confirmation.popup}
      onClose={() => setConfirmation({ popup: false, message: '', function: null })}
      className="relative z-50"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{confirmation.message}</p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              {onConfirm && (
                <button
                  disabled={confirmationLoading}
                  type="button"
                  onClick={() => {
                    onConfirm()
                    setConfirmation((ps) => ({
                      ...ps,
                      message: 'Please Wait...',
                    }))
                  }}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  {confirmationLoading ? <DashLoader /> : 'Yes'}
                </button>
              )}
              <button
                type="button"
                data-autofocus
                onClick={() => {
                  routeRouter.back()
                }}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Back
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
