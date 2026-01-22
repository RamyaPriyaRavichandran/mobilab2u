import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { DASHBOARD } from '@/utils/constents/routes'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetchers'
import { GET_APPOINTMENT_BY_REDIRECTION_ID } from '@/lib/endpoints'
import TextLoading from '../common/TextLoading'

export default function Success() {
  const router = useSearchParams()
  const redirect = router.get('redirect') || ''
  const message = router.get('message') || ''
  const redirectLatest = router.get('redirectLatest') || ''
  const redirectType = router.get('redirectType') || undefined

  const { data: appointment, isLoading = false } = useSWR(
    redirectType === 'APPOINTMENT' ? `${GET_APPOINTMENT_BY_REDIRECTION_ID}/${redirectLatest}` : null,
    fetcher<{ _id: string }>()
  )
  const redirectOption: any = {
    APPOINTMENT: `${redirect}/${appointment?._id}`,
    TEST: redirect || '',
    SERVICE_PROVIDER_KIT_FEES: redirect,
    undefined: DASHBOARD,
    null: DASHBOARD,
    MEDICINE: redirect || '',
  }

  return (
    <div className="flex flex-col items-center justify-center my-2">
      <div className="relative border rounded-xl shadow-lg bg-white w-[400px] h-[550px] flex flex-col items-center">
        <div className="flex justify-center">
          <Image src="/images/success.jpeg" width={300} height={300} priority alt="Success" className="w-auto h-auto" />
        </div>
        <h1 className="text-2xl font-semibold text-green-500 text-center mb-6">
          {isLoading ? <TextLoading paddingX="px-[100px] py-1" /> : 'Successful Payment!'}{' '}
        </h1>
        {message && (
          <p className="text-md text-gray-500 text-center mb-5">
            {isLoading ? <TextLoading paddingX="px-[110px] py-1" /> : message?.replaceAll('-', ' ')}
          </p>
        )}
        <p className="text-md text-gray-500 text-center mb-5">
          {isLoading ? <TextLoading paddingX="px-[110px] py-1" /> : 'Thank you for shopping!'}
        </p>
        <Link aria-disabled={isLoading} href={redirectOption[redirectType as any] || ''}>
          <button className="px-4 py-2 text-white font-semibold bg-green-500 rounded-full flex items-center">
            {isLoading ? <TextLoading /> : ' Go to Page'}
          </button>
        </Link>
      </div>
    </div>
  )
}
