import React from 'react'
import CanCheck from '@/components/common/CanCheck'
import Registration from '@/components/Payment/Registration'
import { ACTIONS, SUBJECTS } from '@/utils/constents/permission'

export default function DashboardPage() {
  return (
    <CanCheck I={ACTIONS.PAY_SERVICE_PROVIDER_FEE} a={SUBJECTS.Payment}>
      <Registration />
    </CanCheck>
  )
}
