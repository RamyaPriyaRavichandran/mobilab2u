'use client'
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import { useAuth } from '@/lib/contexts/AuthContext'
import Image from 'next/image'
import { DASHBOARD, RESET_PASSWORD } from '@/utils/constents/routes'
import MenuBarSVG from './SVG/MenuBarSVG'
import { useRouter } from 'next/navigation'
import { useAlert } from '@/lib/contexts/AlertContext'
import { LOGOUT_CONFIRM_MESSAGE, userType } from '@/utils/constents'
import { useOnClickOutside } from 'usehooks-ts'
import { motion } from 'framer-motion'
import { findFromOptions } from '@/utils/functions'
import { fetcher } from '@/lib/fetchers'
import useSWR from 'swr'
import { USER_DETAIL } from '@/lib/endpoints'

export default function Header({
  setSidebarOpen,
  sidebarOpen,
}: {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>
  sidebarOpen: boolean
}) {
  const { logout, user } = useAuth()
  const [popup, setPopup] = useState(false)
  const modalRef = useRef(null)
  const handleClickOutside = () => {
    setPopup(false)
  }
  useOnClickOutside(modalRef, handleClickOutside)

  const { data: userInfo } = useSWR(
    user && !['SUPER_ADMIN', 'LAB_USER'].includes(user.userRole) && USER_DETAIL,
    fetcher<{
      name: string
      userRole: string
      passportSizePhoto: {
        s3URL: string
      }
    }>()
  )
  const userDetail = userInfo || user
  return (
    <div className="bg-white">
      <div className={`flex  ${userDetail ? 'justify-between' : 'justify-end'} rounded-md justify-end`}>
        {userDetail && (
          <div
            onClick={() => {
              setSidebarOpen(!sidebarOpen)
            }}
            className="cursor-pointer pt-[1.2rem]"
          >
            <MenuBarSVG />
          </div>
        )}

        {userDetail && (
          <div ref={modalRef}>
            <div className="hover:cursor-pointer py-3 rounded-md ">
              <div className="flex items-center" onClick={() => setPopup((prev) => !prev)}>
                <div className="flex justify-center">
                  <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-200">
                    <Image
                      src={userDetail?.passportSizePhoto?.s3URL || '/images/default-avatar.png'}
                      alt="User Avatar"
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{userDetail.name}</p>
                </div>
              </div>
            </div>
            {popup && (
              <motion.div
                initial={{ x: '10%' }}
                animate={{ x: 10 }}
                exit={{ x: '10%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 50 }}
              >
                <ProfilePopup userDetail={userDetail} setPopup={setPopup} popup={popup} />
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export function ProfilePopup({
  setPopup,
  popup,
  userDetail,
}: {
  setPopup: Dispatch<SetStateAction<boolean>>
  popup: boolean
  userDetail: { name: string; passportSizePhoto: { s3URL: string }; userRole: string; paymentStatus?: string }
}) {
  const Router = useRouter()
  const { logout } = useAuth()
  const { showAlert } = useAlert()

  return (
    <motion.section
      initial={{ opacity: 0, y: -10, scale: 0.98 }}
      animate={{ opacity: popup ? 1 : 0, y: popup ? 0 : -10, scale: popup ? 1 : 0.98 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`absolute z-50 bg-white w-[210px] border border-gray-100 right-0 px-0 py-3 rounded-2xl shadow-lg ring-1 ring-gray-200/30 backdrop-blur-sm ${
        popup ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center space-y-3 px-4">
        {/* Avatar */}
        <div className="inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-200">
          <Image
            src={userDetail?.passportSizePhoto?.s3URL || '/images/default-avatar.png'}
            alt="User Avatar"
            width={32}
            height={32}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Role */}
        <p className="text-sm text-gray-600 font-semibold tracking-wide">
          {findFromOptions(userType, userDetail?.userRole)}
        </p>

        <hr className="w-full border-t border-gray-200" />

        {/* Menu items */}
        <div className="w-full space-y-1">
          <div
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer"
            onClick={() => {
              if (userDetail.userRole === 'CUSTOMER') {
                Router.push('/dashboard/customer')
              } else if (userDetail.userRole === 'GP_PARTNER') {
                Router.push('/dashboard/gpdashboard')
              } else if (userDetail.userRole === 'SERVICE_PROVIDER') {
                if (userDetail?.paymentStatus === 'PAID') {
                  Router.push('/dashboard/spdashboard')
                } else {
                  Router.push('/registration')
                }
              } else {
                Router.push('/dashboard')
              }

              setPopup(false)
            }}
          >
            <Image src="/images/website.png" width={20} height={20} alt="Go to Portal" />
            <p className="text-sm font-medium">Go to Portal</p>
          </div>

          <div
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer"
            onClick={() => {
              Router.push(RESET_PASSWORD)
              setPopup(false)
            }}
          >
            <Image src="/svgs/reset-password-icon.svg" width={20} height={20} alt="Reset Password" />
            <p className="text-sm font-medium">Reset Password</p>
          </div>

          <div
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer"
            onClick={() => {
              showAlert(LOGOUT_CONFIRM_MESSAGE, logout)
              setPopup(false)
            }}
          >
            <Image src="/images/logout.png" width={18} height={18} alt="Logout" />
            <p className="text-sm font-medium">Logout</p>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
