import GPDashboard from '@/components/GPDashboard/index'
import { Metadata } from 'next'
import React from 'react'
export const metadata: Metadata = {
  title: 'MobiLab2u Customer',
  description: 'MobiLab2u Services',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  icons: {
    icon: '/assets/images/mobilab2u-favicon.png',
  },
}
export default function page() {
  return (
    <div>
      <GPDashboard />
    </div>
  )
}
