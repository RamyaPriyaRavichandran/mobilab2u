import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function RegisterationSuccess() {
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <div className="flex justify-center ">
          <Image
            src="/svgs/logo-m2u.svg"
            width={192}
            height={144}
            priority
            alt="Your Company"
            className="md:h-36 md:w-48 w-32 h-24"
          />
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Registration completed successfully
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          “Your Registration is under review process. Once approved, you will receive an email”
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-brand-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            Go back home
          </Link>
          <a href="/contact-us" className="text-sm font-semibold text-gray-900">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  )
}
