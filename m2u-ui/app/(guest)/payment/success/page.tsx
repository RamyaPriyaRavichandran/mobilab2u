'use client'
import React, { Suspense } from 'react'
import Success from '@/components/Payment/Success'
import PageLoaderSVG from '@/components/common/PageLoaderSVG'

export default function SuccessPage() {
  return (
    <Suspense fallback={<PageLoaderSVG />}>
      <Success />
    </Suspense>
  )
}
