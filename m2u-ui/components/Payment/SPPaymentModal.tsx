'use client'

import type React from 'react'
import { SPTable } from './SPTable'
import DashLoader from '../common/DashLoader'
import { GET_HSP_PLAN_DETAIL } from '@/lib/endpoints'
import { fetcher } from '@/lib/fetchers'
import useSWR from 'swr'
import { CheckCircle2, AlertCircle } from 'lucide-react'

interface Payment {
  MakePayment: () => void
  showMore: boolean
  setShowMore: React.Dispatch<React.SetStateAction<boolean>>
  isMutating: boolean
}

interface PlanDetail {
  price: number
  offerPrice: number
}

export default function SPPaymentModal({ MakePayment, showMore, setShowMore, isMutating }: Payment) {
  const { data = { price: 0, offerPrice: 0 }, isLoading } = useSWR(GET_HSP_PLAN_DETAIL, fetcher<PlanDetail>())
  const discount = data.price - data.offerPrice
  const hasDiscount = discount > 0

  return (
    <div className="flex items-center justify-center bg-gray-100/50 p-6 min-h-[500px]">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="text-center p-6 pb-2">
          <h1 className="text-3xl font-bold text-gray-800">Registration/Enrollment Fee</h1>
          <p className="text-lg text-gray-600 mt-1">Kindly make a payment of the amount below!</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Service Provider Package */}
          <div className="bg-gray-50 border border-gray-100 rounded-lg overflow-hidden">
            <div className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">SERVICE PROVIDER PACKAGE</h2>
                <span className="px-3 py-1 text-xs font-medium bg-cyan-50 text-cyan-700 border border-cyan-200 rounded-full">
                  Premiums
                </span>
              </div>
            </div>
            <div className="p-4">
              <SPTable showMore={showMore} setShowMore={setShowMore} />

              <div className="flex items-start gap-2 mt-4 text-sm text-gray-600 bg-amber-50 p-3 rounded-md border border-amber-100">
                <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <p>
                  <strong>NOTE:</strong> Together we may add new medical norms along with this.
                </p>
              </div>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="bg-white rounded-lg border border-gray-100 p-4 space-y-2">
            <div className="flex justify-between items-center text-gray-700">
              <span className="font-medium">ENROLLMENT PRICE</span>
              <span>RM {data.price}</span>
            </div>

            {hasDiscount && (
              <div className="flex justify-between items-center text-green-600">
                <span className="font-medium">SPECIAL DISCOUNT</span>
                <span>- RM {discount}</span>
              </div>
            )}

            {hasDiscount && <div className="h-px w-full bg-gray-200 my-2"></div>}

            <div className="flex justify-between items-center font-semibold text-gray-800">
              <span>PAYABLE AMOUNT</span>
              <span>RM {data.offerPrice}</span>
            </div>
          </div>

          {/* Total Amount */}
          <div className="flex items-center justify-center gap-2 py-2">
            <CheckCircle2 className="h-5 w-5 text-cyan-500" />
            <p className="text-xl font-bold text-cyan-600">Total Amount: RM {data.offerPrice}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center pb-8 px-6">
          <button
            disabled={isMutating}
            onClick={() => MakePayment()}
            className={`
              bg-cyan-500 hover:bg-cyan-600 text-white py-4 px-8 
              rounded-full text-lg font-medium transition-all duration-300 
              shadow-md hover:shadow-lg flex items-center justify-center
              min-w-[180px] disabled:opacity-70 disabled:cursor-not-allowed
            `}
          >
            {isMutating ? <DashLoader color="white" /> : data.offerPrice === 0 ? 'Continue' : 'Pay Now'}
          </button>
        </div>
      </div>
    </div>
  )
}
