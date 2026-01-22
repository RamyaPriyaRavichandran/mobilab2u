'use client'
import useSWR from 'swr'
import { GET_CUSTOMER_PLANS, PAY_CUSTOMER_TEST_FEES, PAY_DOCTOR_CONSULTATION_FEES } from '@/lib/endpoints'
import { fetcher, mutater } from '@/lib/fetchers'
import React, { useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { NOT_LOGGED_IN_ERROR } from '@/utils/constents'

import PageLoaderSVG from '@/components/common/PageLoaderSVG'
import { useAlert } from '@/lib/contexts/AlertContext'
import { useRouter } from 'next/navigation'
import { SP_LOGIN } from '@/utils/constents/routes'
import { useAuth } from '@/lib/contexts/AuthContext'
import GreenTickSVG from '@/components/common/SVG/GreenTickSVG'
import Image from 'next/image'
import InstructionPopup from './InstructionPopup'
import NoDataAvailable from '@/components/common/Nodate'
import type { Package } from './interface'
import { useSearchParams } from 'next/navigation'
import PopupPackage from './PopupPackage'

export default function Packages() {
  const { loggedIn } = useAuth()
  const [instruction, setInstruction] = useState({ popup: false, description: '' })
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { data = [], isLoading } = useSWR(GET_CUSTOMER_PLANS, fetcher<Array<Package>>())
  const Router = useRouter()
  const searchParams = useSearchParams()
  const serviceType = searchParams.get('serviceType')
  const service = serviceType?.toUpperCase()

  console.log('serviceType', service)
  const { trigger: payDoctorFees, isMutating: feesMutating } = useSWRMutation(
    PAY_DOCTOR_CONSULTATION_FEES,
    mutater<FormData, { stripeURL: string }>('POST', true),
    {
      onSuccess: ({ data }) => {
        window.location.href = data.stripeURL
      },
      onError: ({ response: { data: { message = '' } = {} } }) => {
        setErrorMessage(message || 'An error occurred while processing payment')
      },
      throwOnError: false,
    }
  )
  const { trigger: payTestFees, isMutating } = useSWRMutation(
    PAY_CUSTOMER_TEST_FEES,
    mutater<
      {
        packageId: string
        customerAppointmentDate: string
        customerAppointmentTime: string
        customerAddress: {
          city: string
          state: string
          postCode: string
          address: string
        }
        members: { name: string; age: number; gender: string }[]
      },
      { stripeURL: string }
    >('POST'),
    {
      onSuccess: ({ data }) => {
        window.location.href = data.stripeURL
      },
      onError: ({ response: { data: { message = '' } = {} } }) => {
        setErrorMessage(message || 'An error occurred while processing payment')
      },
      throwOnError: false,
    }
  )

  const [popup, setPopup] = useState({
    popup: false,
    package: {},
  })
  const { showAlert } = useAlert()

  const loginNavigation = () => {
    Router.push(`${SP_LOGIN}?redirect=packages`)
  }
  console.log('Packages', data)
  const filteredData = React.useMemo(() => {
    if (!serviceType) return data
    return data.filter((pkg) => pkg.serviceType === service)
  }, [data, serviceType])

  const handleClosePopup = () => {
    setPopup({ popup: false, package: {} })
    setErrorMessage('')
  }
  console.log('filteredData', filteredData)
  return (
    <div className="text-center min-h-screen p-6">
      <h1 className="text-3xl font-extrabold bg-gradient-to-r from-brand-400 to-brand-600 text-transparent bg-clip-text mb-10">
        Choose Your Package
      </h1>
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <PageLoaderSVG />
          </div>
        ) : data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {filteredData.map((detail: Package, idx) => (
              <div
                key={idx}
                className="p-6 bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Title and Price Section */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold  text-gray-900 mb-2">{detail.name}</h3>
                </div>
                {/* Card Layout */}
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* Left: Image Section */}
                  <div className="relative w-full md:w-auto">
                    <Image
                      width={200}
                      height={200}
                      src={detail.image?.s3URL || '/images/default-package.jpeg'}
                      alt="Package"
                      className="h-48 w-48 object-cover rounded-xl border-2 border-gray-100"
                    />
                    <div className="absolute top-2 right-2 bg-brand-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                      {detail.serviceType}
                    </div>
                  </div>

                  {/* Right: Package Details */}
                  <div className="flex-1 w-full">
                    {/* Features List */}
                    <div className="bg-gray-50 min-h-[170px] max-h-[190px] overflow-y-scroll p-4 rounded-lg shadow-inner">
                      <ul className="space-y-3 text-sm text-gray-700">
                        {detail.type && (
                          <li className="flex space-x-2 items-center">
                            <GreenTickSVG />
                            <p>{detail.type}</p>
                          </li>
                        )}
                        {detail.testCount && (
                          <li className="flex space-x-2 items-center">
                            <GreenTickSVG />
                            <p className="font-bold">Test Count :</p>
                            <p>{detail.testCount}</p>
                          </li>
                        )}
                        {detail.duration && (
                          <li className="flex space-x-2 items-center">
                            <GreenTickSVG />
                            <p className="font-bold">Duration (Hours):</p>
                            <p>{detail.duration}</p>
                          </li>
                        )}
                        {detail.fastingHour && (
                          <li className="flex space-x-2 items-center">
                            <GreenTickSVG />
                            <p className="font-bold">Fasting Hour :</p>
                            <p>{detail.fastingHour}</p>
                          </li>
                        )}

                        {/* View Details */}
                        {detail?.document && (
                          <li className="flex space-x-2 items-center">
                            <GreenTickSVG />
                            <a
                              href={detail?.document?.s3URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-brand-500 font-medium underline hover:text-brand-600"
                            >
                              View Details
                            </a>
                          </li>
                        )}

                        {/* View Details */}
                        {detail.description && (
                          <li className="flex space-x-2 items-center">
                            <GreenTickSVG />
                            <div
                              onClick={() => setInstruction({ popup: true, description: detail.description })}
                              className="text-brand-500 font-medium hover:cursor-pointer underline hover:text-brand-600"
                            >
                              Special Instruction
                            </div>
                          </li>
                        )}

                        {/* Home Service */}
                        <li className="flex items-center">
                          <svg
                            className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                          </svg>
                          <span>Available at Home</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Discount Section */}
                <div className="flex justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <p className="text-3xl font-extrabold text-brand-600">RM {detail.offerPrice}</p>
                    {detail.price > detail.offerPrice && (
                      <p className="text-sm text-gray-500 line-through">RM {detail.price}</p>
                    )}
                  </div>

                  {detail.price > detail.offerPrice && (
                    <div className="bg-green-500 text-white text-xs mt-2 font-bold px-3 h-[22px] py-1 rounded-full shadow-md">
                      {Math.round(((detail.price - detail.offerPrice) / detail.price) * 100)}% OFF
                    </div>
                  )}
                </div>

                {/* Buy Now Button */}
                <button
                  onClick={() => {
                    if (loggedIn) {
                      setPopup({ popup: true, package: detail })
                      setErrorMessage('') // Clear any previous errors
                    } else {
                      showAlert(NOT_LOGGED_IN_ERROR, loginNavigation)
                    }
                  }}
                  className="w-full mt-6 py-3 bg-gradient-to-r from-brand-300 to-brand-400 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:from-brand-50 hover:to-gray-50 hover:text-brand-500 hover:border hover:border-brand-500 transition-all duration-300"
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        ) : (
          <NoDataAvailable />
        )}
      </div>
      {popup.popup && loggedIn && (
        <div className="min-h-screen absolute inset-0 flex items-center justify-center z-50 overflow-y-auto bg-opacity-50">
          <PopupPackage
            feesMutating={feesMutating}
            isMutating={isMutating}
            payTestFees={payTestFees}
            payDoctorFees={payDoctorFees}
            setPopup={handleClosePopup}
            selectedPackage={popup.package}
            errorMessage={errorMessage}
            clearError={() => setErrorMessage('')}
          />
        </div>
      )}
      <div>{instruction.popup && <InstructionPopup setInstruction={setInstruction} instruction={instruction} />}</div>
    </div>
  )
}
