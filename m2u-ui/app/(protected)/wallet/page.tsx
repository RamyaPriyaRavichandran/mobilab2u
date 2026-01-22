import CanCheck from '@/components/common/CanCheck'
import Wallet from '@/components/Wallet'
import { ACTIONS, SUBJECTS } from '@/utils/constents/permission'
import React from 'react'

export default function page() {
  return (
    <CanCheck I={ACTIONS.VIEW} a={SUBJECTS.User}>
      <Wallet />
    </CanCheck>
  )
}
