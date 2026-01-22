'use client'
import React from 'react'
import Image from 'next/image'

export default function AdminDashboard() {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-0 sm:py-0 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Image
              src="/svgs/logo-m2u.svg"
              width={192}
              height={144}
              priority
              alt="Your Company"
              className="md:h-36 md:w-48 w-32 h-24"
            />
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Welcome to Mobilab2u.com</h1>
          <p className="mt-6 text-base leading-7 text-gray-600 max-w-3xl">
            The skills of medical practitioners have become an invaluable asset during the ongoing Covid-19 pandemic.
            With Mobilab2U, such practitioners can put their skills to good use while using it as a means to supplement
            their incomes.
          </p>
        </div>
      </main>
    </>
  )
}
