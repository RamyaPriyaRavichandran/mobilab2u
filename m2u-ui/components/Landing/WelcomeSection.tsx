import React from 'react'
import Link from 'next/link'
import SparklesText from '../Animation/SparklesText'
import { ABOUT_US, CUSTOMER_REGISTER, SP_REGISTER } from '@/utils/constents/routes'

function WelcomeSection() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-30 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-40"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#991b1b] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
      <section className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-28 -mb-11">
        <div className="relative sm:mb-4 flex justify-center">
          <div className="relative rounded-full px-6 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 w-full max-w-[300px] sm:max-w-[300px] mx-auto sm:mx-0 flex justify-center">
            Partner registration{' '}
            <Link href={SP_REGISTER} className="font-semibold text-brand-600 ml-2">
              <span aria-hidden="true" className="absolute inset-0" />
              Register here <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center items-center rounded-full px-6 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 w-full max-w-[320px] sm:max-w-[270px] mx-auto mb-4 mt-4 ">
          User registration{' '}
          <Link href={CUSTOMER_REGISTER} className="font-semibold text-brand-600 ml-2">
            <span aria-hidden="true" className="absolute inset-0" />
            Click here <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <SparklesText
          text="Welcome to Mobilab2u.com"
          className="text-4xl font-bold text-gray-900 sm:text-6xl text-center"
        />
        <div className="text-center">
          <p className="mt-4 text-md leading-8 text-gray-600">
            Welcome to Mobilab2u, a new on-demand healthcare service platform that aims to medical convenience to the
            doorstep of individuals while helping healthcare professionals supplement their income.
          </p>
          <div className="mt-8 flex items-center justify-center gap-x-6">
            <Link
              href={SP_REGISTER}
              className="rounded-md bg-brand-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              Register
            </Link>
            <Link href={ABOUT_US} className="text-sm font-semibold leading-6 text-gray-900">
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#991b1b] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
    </>
  )
}

export default WelcomeSection
