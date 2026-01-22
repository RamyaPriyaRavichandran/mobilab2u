import React, { Suspense } from 'react'
import Packages from '@/components/Customers/CustomerPackages'
import AlertProvider from '@/lib/contexts/AlertContext'

export default function page() {
  return (
    <AlertProvider>
      <Suspense fallback={<div>Loading…</div>}>
        <Packages />
      </Suspense>
    </AlertProvider>
  )
}
