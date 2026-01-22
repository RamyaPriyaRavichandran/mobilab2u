'use client'
import Image from 'next/image'
import FormFieldsForgotPassword from './FormFieldsForgotPassword'
import SparklesText from '@/components/Animation/SparklesText'
import { useSearchParams } from 'next/navigation'
import FormFieldsChangePassword from './FormFieldsChangePassword'

export default function ForgotPassword() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  return (
    <div className=" min-h-screen ">
      <div className="flex flex-1">
        <div className=" flex flex-1 flex-col justify-center px-4 py-12 md:py-8 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96 ">
            <SparklesText
              className="mt-2 md:mt-4 text-xl sm:text-4xl font-bold leading-9 tracking-tight text-gray-900 flex justify-center md:justify-start"
              text={token ? 'Change Password' : 'Forgot Password'}
            />
            <p className="mt-8 text-sm leading-6 text-gray-500">
              {token
                ? 'Enter your new password and confirm.'
                : 'Enter your registered email and we will send you a password reset link.'}
            </p>

            <div className="mt-6">
              {!token ? <FormFieldsForgotPassword /> : <FormFieldsChangePassword token={token} />}

              <div className="mt-10">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <Image
            src="/images/reset-password-1.png"
            alt=""
            className=" min-h-[100vh] w-full object-cover "
            width={6000}
            height={4000}
          />
        </div>
      </div>
    </div>
  )
}
