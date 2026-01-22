'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/contexts/AuthContext'
import { useAlert } from '@/lib/contexts/AlertContext'
import { PROTECTED_LOGIN_MESSAGE } from '@/utils/constents'
import { DASHBOARD } from '@/utils/constents/routes'
import FormFieldsLogin from './FormFieldsLogin'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const { loggedIn, logout, justLoggedIn = false, setJustLoggedIn } = useAuth()
  const { showAlert } = useAlert()
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    if (loggedIn && hasMounted) {
      if (!justLoggedIn) {
        showAlert(PROTECTED_LOGIN_MESSAGE, logout, DASHBOARD)
      }
      setJustLoggedIn(false)
    }
  }, [loggedIn, hasMounted])

  if (!hasMounted) return null

  return (
    <section className="flex items-center justify-center min-h-screen bg-[#fef1e7] py-8">
      <div className="w-full mx-auto flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden max-w-[94%] sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl ">
        <div className="w-full md:w-1/2 border-r border-gray-300">
          <div className="bg-[#dc2626] text-center py-8">
            <div onClick={() => router.push('/')} className="cursor-pointer">
              <Image
                src="/assets/images/mobilab2u/mobilab2u-login-logo.svg"
                alt="Logo"
                width={200}
                height={80}
                className="mx-auto mb-4 w-40 h-auto max-h-20 object-contain"
                priority
              />
            </div>

            <h2 className="text-white font-bold md:text-xl sm:text-[18px]">Let&apos;s Get Started</h2>
            <p className="text-white sm:text-sm sm:text-[14px]">Login to continue to MobiLab2u.</p>
          </div>

          <div className="p-8">
            <FormFieldsLogin />
          </div>
        </div>

        <div className="hidden md:flex w-full md:w-1/2 items-center justify-center bg-white p-6">
          <Image
            src="/assets/images/mobilab2u/tablet-login.svg"
            alt="Login illustration"
            width={600}
            height={400}
            className="max-w-full h-auto object-contain"
            priority
          />
        </div>
      </div>
    </section>
  )
}
