import React from 'react'
import Labs from '@/components/Labs/index'
import CanCheck from '@/components/common/CanCheck'
import { ACTIONS, SUBJECTS } from '@/utils/constents/permission'

export default function LabPage() {
  return (
    <CanCheck I={ACTIONS.VIEW_ALL} a={SUBJECTS.Lab}>
      <Labs />
    </CanCheck>
  )
}
