import CanCheck from '@/components/common/CanCheck'
import TestList from '@/components/Customers/Orders'
import { ACTIONS, SUBJECTS } from '@/utils/constents/permission'
import React from 'react'

export default function page() {
  return (
    <CanCheck I={ACTIONS.VIEW_ALL} a={SUBJECTS.Test}>
      <TestList />
    </CanCheck>
  )
}
