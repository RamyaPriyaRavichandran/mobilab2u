import React from 'react'
import CanCheck from '@/components/common/CanCheck'
import AdminDashboard from '@/components/AdminDashboard'
import { ACTIONS, SUBJECTS } from '@/utils/constents/permission'

export default function DashboardPage() {
  return (
    <CanCheck I={ACTIONS.VIEW} a={SUBJECTS.User}>
      <AdminDashboard />
    </CanCheck>
  )
}
