import React from 'react'
import CanCheck from '@/components/common/CanCheck'
import Packages from '@/components/Package'
import { ACTIONS, SUBJECTS } from '@/utils/constents/permission'

export default function LabPage() {
  return (
    <CanCheck I={ACTIONS.CREATE} a={SUBJECTS.Package}>
      <Packages />
    </CanCheck>
  )
}
