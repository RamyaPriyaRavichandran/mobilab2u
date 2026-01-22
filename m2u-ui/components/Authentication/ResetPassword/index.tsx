import Image from 'next/image'
import SparklesText from '../../Animation/SparklesText'
import FormFieldsResetPassword from './FormFieldsResetPassword'
export default function ResetPassword() {
  return (
    <>
      <div className=" min-h-screen">
        <div className="flex flex-1">
          <div className=" flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96 mt-6">
              <div>
                <SparklesText
                  className="mt-2 md:mt-4 text-xl sm:text-4xl font-bold leading-9 tracking-tight text-gray-900 flex justify-center md:justify-start"
                  text="Reset Password"
                />
                <p className="mt-8 text-sm leading-6 text-gray-500">Change your new password and confirm.</p>
              </div>

              <div className="mt-4">
                <FormFieldsResetPassword />
              </div>
            </div>
          </div>
          <div className=" hidden w-0 flex-1 lg:block">
            <Image
              src="/images/reset-password.png"
              alt=""
              className=" min-h-[100vh] w-full object-cover"
              width={6240}
              height={4160}
            />
          </div>
        </div>
      </div>
    </>
  )
}
