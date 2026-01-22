import CanCheck from '@/components/common/CanCheck'
import Consultation from '@/components/Appointments/Consultation'
import { ACTIONS, SUBJECTS } from '@/utils/constents/permission'
import React from 'react'

export default function Page() {
  return (
    <CanCheck I={ACTIONS.VIEW} a={SUBJECTS.Appointment}>
      <Consultation />
    </CanCheck>
  )
}
