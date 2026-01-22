import Login from '@/components/HomePage/LoginNew'
import PageLoaderSVG from '@/components/common/PageLoaderSVG'
import React, { Suspense } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MobiLab2u',
  description: 'MobiLab2u Services',
  robots: 'noindex,nofollow',
  viewport: { width: 'device-width', initialScale: 1 },
  icons: { icon: '/assets/images/mobilab2u-favicon.png' },
}

export default function page() {
  return (
    <Suspense fallback={<PageLoaderSVG />}>
      <Login />
    </Suspense>
  )
}
