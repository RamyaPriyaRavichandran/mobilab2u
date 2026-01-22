import ResetPassword from '@/components/Authentication/ResetPassword'
import CanCheck from '@/components/common/CanCheck'
import { ACTIONS, SUBJECTS } from '@/utils/constents/permission'
import React from 'react'

export default function page() {
  return (
    <CanCheck I={ACTIONS.VIEW} a={SUBJECTS.User}>
      <ResetPassword />
    </CanCheck>
  )
}
