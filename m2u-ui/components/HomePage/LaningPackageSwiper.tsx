import { GET_CUSTOMER_PLANS, PAY_CUSTOMER_TEST_FEES, PAY_DOCTOR_CONSULTATION_FEES } from '@/lib/endpoints'
import { fetcher, mutater } from '@/lib/fetchers'
import React, { useState } from 'react'
import useSWR from 'swr'
import { Package } from '../Customers/CustomerPackages/interface'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/lib/contexts/AuthContext'
import { usePopup } from '@/lib/contexts/PopupContext'
import { useAlert } from '@/lib/contexts/AlertContext'
import { SP_LOGIN } from '@/utils/constents/routes'
import { NOT_LOGGED_IN_ERROR } from '@/utils/constents'
import PopupPackage from '../Customers/CustomerPackages/PopupPackage'
import useSWRMutation from 'swr/mutation'

export default function LaningPackageSwiper() {
  const [popup, setPopup] = useState({
    popup: false,
    package: {},
  })
  const { loggedIn } = useAuth()
  const { showError } = usePopup()
  const { showAlert } = useAlert()
  const { data = [], isLoading } = useSWR(GET_CUSTOMER_PLANS, fetcher<Array<Package>>())
  const Router = useRouter()
  const bloodTests = data.filter((item) => item.serviceType === 'TEST')
  const { trigger: payDoctorFees, isMutating: feesMutating } = useSWRMutation(
    PAY_DOCTOR_CONSULTATION_FEES,
    mutater<FormData, { stripeURL: string }>('POST', true),
    {
      onSuccess: ({ data }) => {
        window.location.href = data.stripeURL
      },
      onError: ({ response: { data: { message = '' } = {} } }) => {
        showError(message)
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
        showError(message)
      },
      throwOnError: false,
    }
  )

  const loginNavigation = () => {
    Router.push(`${SP_LOGIN}?redirect=packages`)
  }
  return (
    <div className="mt-6 sm:mt-10 px-2 sm:px-4 international">
      <div className="max-w-[64rem] mx-auto">
        <div className="swiper breadcrumbswiper relative pb-10">
          <div className="swiper-wrapper">
            {bloodTests.map((card, index) => (
              <div key={index} className="swiper-slide h-auto flex justify-center !mx-[0.6rem] sm:!mx-[1rem]">
                <div
                  onClick={() => {
                    if (loggedIn) {
                      setPopup({ popup: true, package: card })
                    } else {
                      showAlert(NOT_LOGGED_IN_ERROR, loginNavigation, '/')
                    }
                  }}
                  className="card h-[150px] sm:h-[160px] w-[150px] sm:w-[180px] p-[1.1rem] sm:p-[1.3rem] rounded-2xl bg-white flex flex-col justify-center items-center text-center transition-all duration-300 hover:shadow-md"
                >
                  <div className="icon mb-3 rounded-full flex justify-center items-center sm:h-[70px]">
                    <Image
                      src={card.image?.s3URL || '/images/default-package.jpeg'}
                      alt={card.name}
                      className="w-[50px] h-[50px] object-contain"
                      width={200}
                      height={200}
                    />
                  </div>
                  <h4 className="text-[12px] sm:text-[15px] font-medium text-black leading-[1.3] text-center">
                    {card.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          {/* Swiper pagination */}
          <div className="justify-center flex ml-32">
            <div className="swiper-pagination !static mt-3 sm:mt-4"></div>
          </div>
          {popup.popup && loggedIn && (
            <PopupPackage
              feesMutating={feesMutating}
              isMutating={isMutating}
              payTestFees={payTestFees}
              payDoctorFees={payDoctorFees}
              setPopup={setPopup}
              selectedPackage={popup.package}
            />
          )}
        </div>
      </div>
    </div>
  )
}
