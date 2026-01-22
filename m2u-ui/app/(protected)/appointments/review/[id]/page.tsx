import CanCheck from '@/components/common/CanCheck'
import ConsultationAdminReview from '@/components/Appointments/AdminReview'
import { ACTIONS, SUBJECTS } from '@/utils/constents/permission'
import React from 'react'

export default function page() {
  return (
    <CanCheck I={ACTIONS.APPROVE} a={SUBJECTS.AppointmentPrescription}>
      <ConsultationAdminReview />
    </CanCheck>
  )
}
