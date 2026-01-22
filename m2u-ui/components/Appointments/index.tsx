'use client'
import PageLoaderSVG from '@/components/common/PageLoaderSVG'
import Table from '@/components/common/Tables'
import { useAuth } from '@/lib/contexts/AuthContext'
import { usePopup } from '@/lib/contexts/PopupContext'
import {
  APPROVE_APPOINTMENT_BOOKINGS,
  GET_ALL_CUSTOMER_APPOINTMENTS,
  GET_CONSULTATION_BOOKINGS,
  GET_CUSTOMER_APPOINTMENT,
  GET_CUSTOMER_APPOINTMENTS,
} from '@/lib/endpoints'
import { fetcher, mutater } from '@/lib/fetchers'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { adminTableHeader, customertableHeader, doctorTableHeader } from './tablecoloms'
import NoDataAvailable from '../common/Nodate'

import { useAlert } from '@/lib/contexts/AlertContext'
import { DoctorAppointment } from './types'
import { APPOINTMENT_APPROVE_MESSAGE, USER_ROLES } from '@/utils/constents'
import { useSearchParams } from 'next/navigation'
export default function Index() {
  const { user = {} } = useAuth()
  const FETCH_DATA: Record<string, string> = {
    GP_PARTNER: GET_CONSULTATION_BOOKINGS,
    CUSTOMER: GET_CUSTOMER_APPOINTMENTS,
    SUPER_ADMIN: GET_ALL_CUSTOMER_APPOINTMENTS,
  }
  const { showAlert } = useAlert()
  const router = useRouter()
  const [appointmentId, setAppointmentId] = useState('')
  const searchParams = useSearchParams()
  const queryAppointmentId = searchParams.get('appointmentId') || ''
  const { data = [], isLoading, mutate } = useSWR(FETCH_DATA[user.userRole], fetcher<Array<any>>())

  const shouldFetchAppointment = user.userRole === USER_ROLES.GP_PARTNER && Boolean(queryAppointmentId)
  const endpoint = shouldFetchAppointment ? `${GET_CUSTOMER_APPOINTMENT}/${queryAppointmentId}` : null

  useSWR(endpoint, fetcher<DoctorAppointment>(), {
    onSuccess(data) {
      if (data) {
        setAppointmentId(data._id)
        showAlert(APPOINTMENT_APPROVE_MESSAGE, () => approveAppointment({ appointmentId: data._id }))
      }
    },
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  })

  const { showError, showSuccess } = usePopup()
  const { trigger: approveAppointment, isMutating } = useSWRMutation(
    APPROVE_APPOINTMENT_BOOKINGS,
    mutater<{ appointmentId: string }, { message: string }>('POST'),
    {
      onSuccess(data) {
        showSuccess(data.data.message)
        mutate()
      },
      onError(err) {
        showError(err.response.data.message)
      },
      throwOnError: false,
    }
  )

  const tableHeaders: Record<string, any> = {
    GP_PARTNER: doctorTableHeader(
      isMutating,
      approveAppointment,
      router,
      user._id,
      showAlert,
      setAppointmentId,
      appointmentId
    ),
    CUSTOMER: customertableHeader(router),
    SUPER_ADMIN: adminTableHeader(router),
  }
  return (
    <div className="p-3">
      {isLoading ? (
        <PageLoaderSVG />
      ) : data.length > 0 ? (
        <Table tableName="Appointments" columns={tableHeaders[user.userRole]} data={data} />
      ) : (
        <div>
          <p className="font-semibold text-3xl ">Appointments</p>
          <NoDataAvailable />
        </div>
      )}
    </div>
  )
}
