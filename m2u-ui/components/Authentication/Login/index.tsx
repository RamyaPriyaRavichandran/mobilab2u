'use client'
import Image from 'next/image'
import { useAuth } from '@/lib/contexts/AuthContext'
import { useEffect, useState } from 'react'
import SparklesText from '../../Animation/SparklesText'
import FormFieldsLogin from './FormFieldsLogin'
import { useAlert } from '@/lib/contexts/AlertContext'
import { PROTECTED_LOGIN_MESSAGE } from '@/utils/constents'
import { DASHBOARD } from '@/utils/constents/routes'

export default function Login() {
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

  if (!hasMounted) return null // Prevent hydration mismatch

  return (
    <div className="min-h-screen">
      <div className="md:flex min-h-full">
        <div className="md:my-32 my-20 justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <SparklesText
                className="mt-2 md:mt-4 text-3xl sm:text-5xl font-bold leading-9 tracking-tight text-gray-900 flex justify-center md:justify-start"
                text="Login"
              />
            </div>

            <div className="md:mt-2 mt-4">
              <FormFieldsLogin />
            </div>
          </div>
        </div>
        <div className=" hidden w-0 flex-1 lg:block ">
          <Image
            src="/svgs/login-illus.svg"
            alt="Login Illustration"
            className="min-h-[100vh] w-full object-cover"
            width={2050}
            height={1000}
            priority
          />
        </div>
      </div>
    </div>
  )
}
