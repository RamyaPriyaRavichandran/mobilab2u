'use client'

import { useState } from 'react'
import { Shield, CreditCard, Info } from 'lucide-react'
import { SPTable } from './SPTable'
import { GET_HSP_USER_DATA } from '@/lib/endpoints'
import { fetcher } from '@/lib/fetchers'
import type { Package } from '../Customers/CustomerPackages/interface'
import useSWR from 'swr'

export default function PaymentSuccess() {
  const [showMore, setShowMore] = useState(false)
  // const { data = [], isLoading } = useSWR(GET_CUSTOMER_PLANS, fetcher<Array<Package>>())
  const { data = { paidKitfeesPrice: 0 }, isLoading } = useSWR(GET_HSP_USER_DATA, fetcher<any>())
  const discount = data?.actualKitFeesPrice - data?.paidKitfeesPrice
  const paidFees = data?.paidKitfeesPrice || 0
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 p-2 rounded-full">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold">Registration Successful!</h1>
          </div>

          <hr className="border-gray-300 mb-6" />

          {/* Payment Summary */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">ENROLMENT PRICE</span>
              <span className="font-medium">RM {data?.actualKitFeesPrice}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">SPECIAL DISCOUNTS</span>
                <span className="font-medium text-green-600">- RM {discount}</span>
              </div>
            )}

            {discount > 0 && <hr className="border-gray-200 my-2" />}

            <hr className="border-gray-200 my-2" />
            <div className="flex justify-between items-center">
              <span className="font-semibold">PAYABLE AMOUNT</span>
              <span className="font-bold">RM {paidFees}</span>
            </div>
          </div>

          {/* Payment Status */}
          <div className="flex items-center mb-6">
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-md border border-green-200">
              <CreditCard className="h-4 w-4" />
              <span className="font-medium">Purchased </span>
            </div>
          </div>

          {/* Service Provider Package */}
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-4">SERVICE PROVIDER PACKAGE</h2>
            <SPTable showMore={showMore} setShowMore={setShowMore} />
          </div>

          {/* Information Section */}
          <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
            <Info className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
            <p className="text-gray-700">
              Thank you! Your registration and kit payment were successful. Please wait for your kit to arrive. Our team
              will keep you updated with the latest information.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
