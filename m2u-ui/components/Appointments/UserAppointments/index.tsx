'use client'

import { useState } from 'react'
import { useSearchParams, useParams, useRouter } from 'next/navigation'
import { fetcher, mutater } from '@/lib/fetchers'
import useSWR from 'swr'
import {
  GET_APPOINTMENT_PRESCRIPTION,
  GET_CUSTOMER_APPOINTMENT,
  PAY_FOLLOWUP_CUSTOMER_TEST_FEES,
} from '@/lib/endpoints'
import AppointmentDetail from '../AppointmentDetail'
import type { DoctorAppointment, PrescriptionDetail } from '../types'
import MedicineDetail from '../Medicine/Detail'
import ReferralLetter from '../Referral/ReferralLetter'
import CustomPackage from './CustomPackage'
import FamilyPackage from './FamilyPopup'
import useSWRMutation from 'swr/mutation'
import { usePopup } from '@/lib/contexts/PopupContext'
import { BASIC_STATUS } from '@/utils/constents'
import LittleLoader from '@/components/common/LittleLoader'
import { Calendar, FileText, FilePlus2, FileCheck2, User, ArrowRight, Eye } from 'lucide-react'
import { getHourDiffFromNow } from '@/components/common/diffhourschatGpt'

export default function ConsultationAdminReview() {
  const [purchaseFollowupTest, setpurchaseFollowupTest] = useState({ popup: false, appoinmentId: '' })
  const router = useSearchParams()
  const { id } = useParams()
  const { showError, showSuccess } = usePopup()
  const customer = router.get('customer')

  const [showPrescription, setShowPrescription] = useState(false)
  const [showReferralForm, setShowReferralForm] = useState(false)
  const [showTestForm, setShowTestForm] = useState(false)

  const { data: appointmentDetail = {} as DoctorAppointment, isLoading } = useSWR(
    `${GET_CUSTOMER_APPOINTMENT}/${id}`,
    fetcher<DoctorAppointment>()
  )
  const { data: prescription = {} as PrescriptionDetail } = useSWR(
    `${GET_APPOINTMENT_PRESCRIPTION}/${id}`,
    fetcher<PrescriptionDetail>()
  )

  const { trigger: payFollowupTestFees, isMutating } = useSWRMutation(
    PAY_FOLLOWUP_CUSTOMER_TEST_FEES,
    mutater<
      {
        appointmentId: string
        customerAppointmentDate: string
        customerAppointmentTime: string
        customerAddress: string
        referredDoctor: string
      },
      { stripeURL: string }
    >('POST'),
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
  const prescriptionButtonEnabled =
    prescription?.medicine?.status === BASIC_STATUS.APPROVED ||
    prescription?.medicine?.status === BASIC_STATUS.PURCHASED
  const appointmentDateforDiff = appointmentDetail?.appointmentDate
  const slotTime = appointmentDetail?.selectedTimeSlot
  const diffHours = getHourDiffFromNow(appointmentDateforDiff, slotTime, process.env.NEXT_PUBLIC_NODE_ENV)
  const canReschedule = (diffHours as any) > 48 && !appointmentDetail.customerAppointmentTimeSlotReAllocated

  const currentDate = new Date()
  const currentDateValue = currentDate.toISOString().slice(0, 10)
  const appointmentDate = appointmentDetail?.appointmentDate?.slice(0, 10)
  const isAppointmentDatePassed = currentDateValue === appointmentDate
  const presentDate = new Date().toISOString().slice(0, 10)
  const isFollowupDate = prescription?.followUpAppointmentDate?.slice(0, 10) > presentDate
  const Router = useRouter()

  const getStatusBadgeClass = () => {
    if (appointmentDetail.status === 'DOCTOR_CONSULTATION_DONE' || appointmentDetail.status === 'COMPLETED') {
      return 'bg-green-100 text-green-800 border-green-300'
    } else if (appointmentDetail.status === 'APPROVED') {
      return 'bg-blue-100 text-blue-800 border-blue-300'
    } else if (appointmentDetail.status === 'PENDING') {
      return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    } else {
      return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getPrescriptionStatusBadgeClass = () => {
    if (prescription?.status === 'ADMIN_APPROVED') {
      return 'bg-green-100 text-green-800 border-green-300'
    } else if (prescription?.status === 'PENDING') {
      return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    } else {
      return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          <div className="flex items-center space-x-2 mb-6">
            <Eye className="h-6 w-6 text-teal-600" />
            <h1 className="text-2xl font-bold text-gray-900">Appointment Details</h1>
          </div>
          {canReschedule && (
            <div className="flex items-center space-x-2 mb-6 border border-brand-200 font-normal text-brand-500 rounded-lg px-4 py-2 bg-white shadow-sm">
              <button onClick={() => Router.push(`/appointments/reshedule/${id}`)}>Re-Schedule Appointment</button>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <LittleLoader />
          </div>
        ) : (
          <div
            className="bg-white rounded-x
          l shadow-sm border border-gray-100 overflow-hidden mb-6 transition-all duration-200 hover:shadow-md"
          >
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
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeClass()}`}
                      >
                        {appointmentDetail.status?.replace(/_/g, ' ')}
                      </span>

                      {/* {prescription?.status && (
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPrescriptionStatusBadgeClass()}`}
                        >
                          Prescription: {prescription.status.replace(/_/g, ' ')}
                        </span>
                      )} */}

                      {appointmentDetail.appointmentDate && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(appointmentDetail.appointmentDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {prescription?.status === 'ADMIN_APPROVED' && (
                  <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                    {prescription?.followUpAppointmentDate && isFollowupDate && (
                      <button
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200"
                        onClick={() => Router.push(`/appointments/followup/${appointmentDetail?._id}`)}
                      >
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Follow-Up
                      </button>
                    )}

                    {prescriptionButtonEnabled && (
                      <button
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                        onClick={() => setShowPrescription(true)}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        View Prescription
                      </button>
                    )}

                    {prescription?.referral?.complaint && (
                      <button
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                        onClick={() => setShowReferralForm(true)}
                      >
                        <FilePlus2 className="h-4 w-4 mr-2" />
                        View Referral
                      </button>
                    )}

                    {prescription?.followupTest?.testDetail?._id && (
                      <button
                        disabled={isMutating}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => setShowTestForm(true)}
                      >
                        {isMutating ? (
                          <LittleLoader />
                        ) : (
                          <>
                            <FileCheck2 className="h-4 w-4 mr-2" />
                            View Test
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
                isFollowupDate={isFollowupDate}
                prescription={prescription}
                appointmentDetails={appointmentDetail}
                isAppointmentDone={appointmentDetail?.status === 'DONE' || appointmentDetail?.status === 'APPROVED'}
                isLoading={isLoading}
                isAppointmentDatePassed={isAppointmentDatePassed}
              />
            </div>
          </div>
        )}
      </div>

      {showPrescription && (
        <MedicineDetail
          isEdit={false}
          appointmentDetails={appointmentDetail}
          medicine={prescription?.medicine || {}}
          onClose={() => setShowPrescription(false)}
          followupDate={prescription?.followUpAppointmentDate}
        />
      )}

      {showReferralForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Referral Letter</h2>
                <button
                  onClick={() => setShowReferralForm(false)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <ReferralLetter
                doctorSign={appointmentDetail.approvedDoctor?.eSign?.s3URL}
                isEdit={false}
                onClose={() => setShowReferralForm(false)}
                referralData={prescription?.referral || {}}
                appointmentDate={appointmentDetail?.appointmentDate}
              />
              <div className="mt-6 flex justify-end">
                <button
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-teal-600 bg-white border-teal-600 hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200"
                  onClick={() => setShowReferralForm(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showTestForm && (
        <CustomPackage
          onClose={() => setShowTestForm(false)}
          testData={prescription?.followupTest.testDetail}
          setpurchaseFollowupTest={setpurchaseFollowupTest}
          purchaseFollowupTest={purchaseFollowupTest}
          appointmentId={appointmentDetail._id}
        />
      )}

      {purchaseFollowupTest.popup && (
        <FamilyPackage
          referredDoctor={appointmentDetail?.approvedDoctor}
          packageId={prescription?.followupTest?.testDetail?._id}
          payFollowupTestFees={payFollowupTestFees}
          appointmentId={appointmentDetail._id}
          setpurchaseFollowupTest={setpurchaseFollowupTest}
          isMutating={isMutating}
        />
      )}
    </div>
  )
}
