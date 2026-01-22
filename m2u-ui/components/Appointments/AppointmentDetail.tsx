'use client'

import { findFromOptions } from '@/utils'
import { APPOINTMENT_STATUS, gender, language, serviceProviderApprovalStatus } from '@/utils/constents'
import { sliceDate } from '@/utils/functions'
import {
  Calendar,
  Clock,
  User,
  Phone,
  CreditCard,
  UserCheck,
  Globe,
  CheckCircle2,
  Video,
  CalendarClock,
} from 'lucide-react'
import type { DoctorAppointment, PrescriptionDetail } from './types'
import AppointmentDetailLoading from './AppointmentDetailLoading'

export default function AppointmentDetail({
  appointmentDetails,
  prescription,
  isAppointmentDone,
  isLoading,
  isFollowupDate,
  isAppointmentDatePassed,
}: {
  appointmentDetails: DoctorAppointment
  prescription?: PrescriptionDetail
  isAppointmentDone: boolean
  isLoading: boolean
  isFollowupDate?: any
  isAppointmentDatePassed?: any
}) {
  if (isLoading) {
    return <AppointmentDetailLoading />
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case APPOINTMENT_STATUS.APPROVED:
        return 'bg-green-100 text-green-800'
      case APPOINTMENT_STATUS.PENDING:
        return 'bg-yellow-100 text-yellow-800'
      case APPOINTMENT_STATUS.REJECTED:
        return 'bg-red-100 text-red-800'
      case APPOINTMENT_STATUS.COMPLETED:
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Appointment Information */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-xl font-bold">Appointment Information</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{sliceDate(appointmentDetails?.appointmentDate)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium">
                    {appointmentDetails?.selectedTimeSlot?.startTime} - {appointmentDetails?.selectedTimeSlot?.endTime}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointmentDetails?.status)}`}
                  >
                    {findFromOptions(serviceProviderApprovalStatus, appointmentDetails?.status) || '-'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Payment Status</p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${appointmentDetails?.payment?.paymentStatus === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                  >
                    {appointmentDetails?.payment?.paymentStatus ? 'Paid' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CalendarClock className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Appointment Type</p>
                  <p className="font-medium">
                    {appointmentDetails.appointment ? 'Followup Appointment' : 'Normal Appointment'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Followup Date</p>
                  <p className="font-medium">
                    {prescription?.followUpAppointmentDate ? sliceDate(prescription?.followUpAppointmentDate) : '-'}
                  </p>
                </div>
              </div>

              {appointmentDetails?.status === APPOINTMENT_STATUS.DOCTOR_CONFIRMED &&
                isAppointmentDatePassed &&
                appointmentDetails?.meeting?.link && (
                  <div className="mt-4">
                    <button
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-green-500 text-green-600 rounded-md hover:bg-green-50 transition-colors"
                      onClick={() => window.open(appointmentDetails?.meeting?.link, '_blank')}
                    >
                      <Video className="h-4 w-4" />
                      Join Zoom Meeting
                    </button>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Information */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4">
            <h3 className="text-xl font-bold">Customer Information</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{appointmentDetails?.customer?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{appointmentDetails?.customer?.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-medium">{findFromOptions(gender, appointmentDetails?.customer?.gender)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Information */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4">
            <h3 className="text-xl font-bold">Doctor Information</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Doctor Name</p>
                <p className="font-medium">{appointmentDetails?.approvedDoctor?.name || '-'}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Language</p>
                <p className="font-medium">{findFromOptions(language, appointmentDetails?.doctorLanguage)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          If you want to re-schedule appointment, contact admin at <span className="font-medium">+60-12 541 2990</span>
        </p>
      </div>
    </div>
  )
}
