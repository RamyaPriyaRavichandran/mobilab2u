import React from 'react'
import Customer from '@/components/Customers/CustomerTable'
import CanCheck from '@/components/common/CanCheck'
import { ACTIONS, SUBJECTS } from '@/utils/constents/permission'

export default function LabPage() {
  return (
    <CanCheck I={ACTIONS.VIEW_ALL} a={SUBJECTS.Customer}>
      <Customer />
    </CanCheck>
  )
}
