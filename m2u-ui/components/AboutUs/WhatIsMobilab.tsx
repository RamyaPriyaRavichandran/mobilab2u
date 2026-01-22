import React from 'react'
import Image from 'next/image'

export default function WhatIsMobilab() {
  return (
    <div className="flex justify-center py-12 px-4 bg-brand-50">
      <div className="flex flex-col lg:flex-row max-w-6xl w-full space-y-8 lg:space-y-6 lg:space-x-8">
        <div className="lg:w-2/3 flex flex-col justify-center text-left">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Mobilab2u.com?</h2>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            Mobilab2u.com is an on-demand service that matches registered healthcare partners with patients who need
            time-sensitive medical tests, medical advice, and counseling support without traveling to hospitals, labs,
            or clinics.
          </p>
        </div>
        <div className="lg:w-1/3 flex justify-center lg:justify-start mr-20">
          <div className="flex items-center justify-center w-[200px] h-[200px] rounded-full ml-20 bg-white shadow-lg">
            <Image
              src="/svgs/logo.svg"
              alt="hospital"
              width={400}
              height={100}
              className="h-36 w-32 text-brand-500 ml-2"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
