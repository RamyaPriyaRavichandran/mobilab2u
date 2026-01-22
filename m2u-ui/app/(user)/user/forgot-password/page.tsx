import ForgotPassword from '@/components/Authentication/ForgotPassword'
import PageLoaderSVG from '@/components/common/PageLoaderSVG'
import React, { Suspense } from 'react'

export default function page() {
  return (
    <Suspense fallback={<PageLoaderSVG />}>
      <ForgotPassword />
    </Suspense>
  )
}
