import PurchasedMedicines from '@/components/Appointments/UserAppointments/PurchasedMedicines'
import CanCheck from '@/components/common/CanCheck'
import { ACTIONS, SUBJECTS } from '@/utils/constents/permission'
import React from 'react'

export default function page() {
  return (
    <CanCheck a={SUBJECTS.AppointmentPrescription} I={ACTIONS.APPROVE}>
      <PurchasedMedicines />
    </CanCheck>
  )
}
