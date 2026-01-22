import FollowUpBooking from '@/components/Appointments/UserAppointments/FollowUpBooking'
import CanCheck from '@/components/common/CanCheck'
import { ACTIONS, SUBJECTS } from '@/utils/constents/permission'

import React from 'react'

export default function page() {
  return (
    <CanCheck I={ACTIONS.CREATE} a={SUBJECTS.Appointment}>
      <FollowUpBooking />
    </CanCheck>
  )
}
