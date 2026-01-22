'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import ReallocationForm from '@/components/Appointments/AdminReview/ReAllocationForm'

export default function ReallocationIndex() {
  const { id } = useParams()

  return <ReallocationForm appointmentId={id as string} />
}
