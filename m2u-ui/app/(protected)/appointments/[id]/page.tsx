import React from 'react'
import UserAppointment from '@/components/Appointments/UserAppointments'
import CanCheck from '@/components/common/CanCheck'
import { ACTIONS, SUBJECTS } from '@/utils/constents/permission'
export default function page() {
  return (
    <CanCheck I={ACTIONS.CREATE} a={SUBJECTS.Appointment}>
      <UserAppointment />
    </CanCheck>
  )
}
