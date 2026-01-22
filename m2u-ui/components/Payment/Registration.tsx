'use client'
import React, { useState } from 'react'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { fetcher } from '@/lib/fetchers'
import { usePopup } from '@/lib/contexts/PopupContext'
import { GET_SERVICE_PROVIDER, SERVICE_PROVIDER_FEES } from '@/lib/endpoints'
import PaymentSectionSuccess from './PaymentSectionSuccess'
import SPPaymentModal from './SPPaymentModal'
import PageLoaderSVG from '../common/PageLoaderSVG'
import { mutate } from 'swr'

export default function Registration() {
  const { showError, showSuccess } = usePopup()
  const [showMore, setShowMore] = useState(false)

  const { data, isLoading, mutate } = useSWR(
    GET_SERVICE_PROVIDER,
    fetcher<{ paymentStatus: string | undefined; userRole: string }>()
  )

  const { trigger: MakePayment, isMutating } = useSWRMutation(
    SERVICE_PROVIDER_FEES,
    fetcher<{ stripeURL: string; message: string }>(),
    {
      onSuccess: (data) => {
        if (data.message) {
          showSuccess(data.message)
        } else {
          window.location.href = data.stripeURL
        }
        mutate()
      },
      onError: ({ response: { data: { message = '' } = {} } }) => {
        showError(message)
      },
      throwOnError: false,
    }
  )

  if (isLoading) {
    return <PageLoaderSVG />
  } else if (data?.paymentStatus === 'PAID') {
    return <PaymentSectionSuccess />
  } else {
    return (
      <SPPaymentModal showMore={showMore} setShowMore={setShowMore} MakePayment={MakePayment} isMutating={isMutating} />
    )
  }
}
