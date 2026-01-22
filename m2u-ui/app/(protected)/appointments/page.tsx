import React from 'react'
import Appointment from '@/components/Appointments'
import CanCheck from '@/components/common/CanCheck'
import { ACTIONS, SUBJECTS } from '@/utils/constents/permission'
export default function page() {
  return (
    <div>
      <CanCheck I={ACTIONS.VIEW_ALL} a={SUBJECTS.Appointment}>
        <Appointment />
      </CanCheck>
    </div>
  )
}
