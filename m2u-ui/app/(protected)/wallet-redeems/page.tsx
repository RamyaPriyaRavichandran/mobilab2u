import CanCheck from '@/components/common/CanCheck'
import WalletRedeemRequest from '@/components/Wallet/WalletRedeemRequest'
import { ACTIONS, SUBJECTS } from '@/utils/constents/permission'
import React from 'react'

export default function page() {
  return (
    <CanCheck I={ACTIONS.REVIEW} a={SUBJECTS.Wallet}>
      <WalletRedeemRequest />
    </CanCheck>
  )
}
