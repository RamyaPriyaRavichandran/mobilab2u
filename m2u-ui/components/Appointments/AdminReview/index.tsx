'use client'

import { useState } from 'react'
import { useSearchParams, useParams, useRouter } from 'next/navigation'
import { fetcher, mutater } from '@/lib/fetchers'
import useSWR from 'swr'
import {
  APPOINTMENT_RE_ALLOCATION,
  APPROVE_DOCTOR_PRESCRIPTION,
  CANCEL_APPOINTMENT,
  CREATE_CUSTOM_PACKAGE,
  GET_APPOINTMENT_PRESCRIPTION,
  GET_CUSTOMER_APPOINTMENT,
  UPDATE_MEDICINE_PRICE,
} from '@/lib/endpoints'
import { usePopup } from '@/lib/contexts/PopupContext'
import useSWRMutation from 'swr/mutation'
import { CONSULTATION_DONE, CANCEL_APPOINTMENT_TEXT } from '@/utils/constents'
import CustomerPurchasedPackages from '../CustomerPurchasedPackages'
import { useAlert } from '@/lib/contexts/AlertContext'
import type { DoctorAppointment, MedicineDetail, PrescriptionDetail } from '../types'
import AppointmentDetail from '../AppointmentDetail'
import Medicine from '../Medicine'
import ReferalLetter from '../Referral/ReferralLetter'
import CustomPackage from './CustomPackage'
import DashLoader from '@/components/common/DashLoader'
import { Calendar, FileText, FilePlus2, FileCheck2, CheckCircle2, User, Package, ShieldCheck } from 'lucide-react'
import ReallocationForm from './ReAllocationForm'

export default function AdminReview() {
  const router = useSearchParams()
  const { id } = useParams()
  const customer = router.get('customer')
  const payment = router.get('payment')

  const { showAlert } = useAlert()
  const [showReallocationForm, setShowReallocationForm] = useState(false)
  const [showPrescription, setShowPrescription] = useState(false)
  const [showReferralForm, setShowReferralForm] = useState(false)
  const [showTestForm, setShowTestForm] = useState(false)
  const [params, setParams] = useState(!!payment)
  const Router = useRouter()

  const {
    data: appointmentDetails = {} as DoctorAppointment,
    mutate,
    isLoading,
  } = useSWR(`${GET_CUSTOMER_APPOINTMENT}/${id}`, fetcher<DoctorAppointment>())
  const { data: prescription = {} as PrescriptionDetail, mutate: prescriptionMutate } = useSWR(
    `${GET_APPOINTMENT_PRESCRIPTION}/${id}`,
    fetcher<PrescriptionDetail>(),
    {
      onSuccess() {
        if (params) {
          setShowPrescription(true)
        }
      },
    }
  )
  console.log('appointmentDetails', appointmentDetails)
  const { showSuccess, showError } = usePopup()
  const { trigger, isMutating: approveLoading } = useSWRMutation(
    `${APPROVE_DOCTOR_PRESCRIPTION}/${id}`,
    mutater<any, { message: string }>('POST'),
    {
      onSuccess: ({ data: { message = '' } }) => {
        showSuccess(message)
        prescriptionMutate()
        mutate()
      },
      onError(err) {
        showError(err.response.data.message)
      },
      throwOnError: false,
    }
  )

  const { trigger: submitForm, isMutating } = useSWRMutation(
    `${CREATE_CUSTOM_PACKAGE}/${id}`,
    mutater<FormData, { message: string }>('POST', true),
    {
      onSuccess: ({ data: { message = '' } }) => {
        showSuccess(message)
        setShowTestForm(false)
        prescriptionMutate()
        mutate()
      },
      onError(err) {
        showError(err.response.data.message)
      },
      throwOnError: false,
    }
  )

  const { trigger: updateMedicinePrice, isMutating: priceMutating } = useSWRMutation(
    `${UPDATE_MEDICINE_PRICE}/${id}`,
    mutater<MedicineDetail, { message: string }>('POST'),
    {
      onSuccess: ({ data: { message = '' } }) => {
        showSuccess(message)
        setShowPrescription(false)
        mutate()
        prescriptionMutate()
      },
      onError(err) {
        showError(err.response.data.message)
      },
      throwOnError: false,
    }
  )

  const { trigger: cancelAppointment, isMutating: cancelAppointmentMutating } = useSWRMutation(
    `${CANCEL_APPOINTMENT}/${id}`,
    mutater<any, { message: string }>('POST'),
    {
      onSuccess: ({ data: { message = '' } }) => {
        showSuccess(message)
        mutate()
      },
      onError(err) {
        showError(err.response.data.message)
      },
      throwOnError: false,
    }
  )

  const { trigger: reallocationTrigger, isMutating: reallocating } = useSWRMutation(
    `${APPOINTMENT_RE_ALLOCATION}/${id}`,
    mutater<any, { message: string }>('POST'),
    {
      onSuccess: ({ data: { message = '' } }) => {
        showSuccess(message)
      },
      onError: ({ response: { data: { message = '' } = {} } }) => {
        showError(message)
      },
      throwOnError: false,
    }
  )

  function createCustomPackage(values: { name: string; description: string; document: string; image: string }) {
    const formData = new FormData()
    formData.append('data', JSON.stringify(values))
    formData.append('document', values.document)
    formData.append('image', values.image)
    return submitForm(formData)
  }

  const consultationStatusVerify =
    appointmentDetails?.status === 'DOCTOR_CONSULTATION_DONE' || appointmentDetails?.status === 'COMPLETED'

  const getStatusBadgeClass = () => {
    if (appointmentDetails.status === 'DOCTOR_CONSULTATION_DONE' || appointmentDetails.status === 'COMPLETED') {
      return 'bg-green-100 text-green-800 border-green-300'
    } else if (appointmentDetails.status === 'APPROVED') {
      return 'bg-blue-100 text-blue-800 border-blue-300'
    } else if (appointmentDetails.status === 'PENDING') {
      return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    } else if (appointmentDetails.status === 'CANCELLED') {
      return 'bg-red-100 text-red-800 border-red-300'
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
  const appoinmentCancel = ['CANCELLED', 'DOCTOR_CONSULTATION_DONE', 'COMPLETED']
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 mb-6">
          <ShieldCheck className="h-6 w-6 text-teal-600" />
          <h1 className="text-2xl font-bold text-gray-900">Admin Review</h1>
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
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeClass()}`}
                        >
                          {appointmentDetails.status?.replace(/_/g, ' ')}
                        </span>

                        {/* {prescription?.status && (
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPrescriptionStatusBadgeClass()}`}
                          >
                            Prescription: {prescription.status.replace(/_/g, ' ')}
                          </span>
                        )} */}

                        {appointmentDetails.appointmentDate && (
                          <div className="flex items-center text-sm text-gray-500">
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

                  <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                    {consultationStatusVerify && prescription?.medicine?._id && (
                      <button
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200"
                        onClick={() => setShowPrescription(true)}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        View Prescription
                      </button>
                    )}

                    {consultationStatusVerify && prescription?.referral?.complaint && (
                      <button
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                        onClick={() => setShowReferralForm(true)}
                      >
                        <FilePlus2 className="h-4 w-4 mr-2" />
                        View Referral
                      </button>
                    )}

                    {consultationStatusVerify && prescription?.followupTest?.name && (
                      <button
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        onClick={() => setShowTestForm(true)}
                      >
                        <FileCheck2 className="h-4 w-4 mr-2" />
                        View Test
                      </button>
                    )}

                    {consultationStatusVerify && prescription?.status !== 'ADMIN_APPROVED' && prescription && (
                      <button
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                        disabled={approveLoading}
                        onClick={() => showAlert(CONSULTATION_DONE, trigger)}
                      >
                        {approveLoading ? (
                          <DashLoader color="white" size="small" />
                        ) : (
                          <>
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Approve
                          </>
                        )}
                      </button>
                    )}

                    {appointmentDetails.status == 'APPROVED' && (
                      <button
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
                        onClick={() => Router.push(`/appointments/reallocation/${appointmentDetails?._id}`)}
                      >
                        Re-Allocation
                      </button>
                    )}

                    {showReallocationForm && <ReallocationForm appointmentId={appointmentDetails?._id} />}

                    {!appoinmentCancel.includes(appointmentDetails.status) && (
                      <button
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-500 hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors duration-200"
                        disabled={cancelAppointmentMutating}
                        onClick={() => showAlert(CANCEL_APPOINTMENT_TEXT, () => cancelAppointment())}
                      >
                        {cancelAppointmentMutating ? <DashLoader color="white" size="small" /> : 'Cancel Appointment'}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="px-6 py-5">
                <AppointmentDetail
                  appointmentDetails={appointmentDetails || {}}
                  prescription={prescription || {}}
                  isAppointmentDone={appointmentDetails?.status === 'DONE'}
                  isLoading={isLoading}
                />
              </div>
            </div>

            <div className=" bg-white shadow-lg rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Splitting Share Details</h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Package Price</p>
                  <span className="font-medium text-gray-900">₹{appointmentDetails.packages?.offerPrice}</span>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Mobilab Share</p>
                  <span className="font-medium text-green-600">₹{appointmentDetails.packages?.mobilabShare}</span>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Doctor Share</p>
                  <span className="font-medium text-blue-600">₹{appointmentDetails.packages?.gpShare}</span>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Customer Share</p>
                  <span className="font-medium text-purple-600">₹{appointmentDetails.packages?.customerShare}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md mt-4">
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
          isMutating={priceMutating}
          trigger={updateMedicinePrice}
          prescriptionDetails={prescription || {}}
          onClose={() => {
            setShowPrescription(false)
            setParams(false)
          }}
          appointmentDetails={appointmentDetails || {}}
        />
      )}

      {showReferralForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="">
            <div className="p-6">
              {/* <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Referral Letter</h2>
                <button
                  onClick={() => setShowReferralForm(false)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div> */}
              <ReferalLetter
                doctorSign={appointmentDetails.approvedDoctor?.eSign?.s3URL}
                isEdit={false}
                onClose={() => setShowReferralForm(false)}
                referalData={prescription.referral}
              />
              {/* <div className="mt-6 flex justify-end">
                <button
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-teal-600 bg-white border-teal-600 hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200"
                  onClick={() => setShowReferralForm(false)}
                >
                  Close
                </button>
              </div> */}
            </div>
          </div>
        </div>
      )}

      {showTestForm && (
        <CustomPackage
          isMutating={isMutating}
          onClose={() => setShowTestForm(false)}
          testData={prescription?.followupTest.testDetail || prescription?.followupTest || {}}
          createCustomPackage={createCustomPackage}
        />
      )}
    </div>
  )
}
