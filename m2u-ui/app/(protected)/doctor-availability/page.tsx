import CanCheck from '@/components/common/CanCheck'
import DoctorAvailabilityCalender from '@/components/GPPartner/DoctorAvailability'
import { ACTIONS, SUBJECTS } from '@/utils/constents/permission'
import React from 'react'

export default function page() {
  return (
    <CanCheck I={ACTIONS.CREATE} a={SUBJECTS.AppointmentAvailability}>
      <DoctorAvailabilityCalender />
    </CanCheck>
  )
}
