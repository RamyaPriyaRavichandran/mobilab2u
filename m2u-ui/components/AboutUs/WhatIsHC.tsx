import React from 'react'
import Image from 'next/image'

export default function WhatIsMobilab() {
  return (
    <div className="flex justify-center py-12 px-4 bg-brand-50 ">
      <div className="flex flex-col lg:flex-row max-w-6xl w-full space-y-8 lg:space-y-6 lg:space-x-8">
        <div className="lg:w-2/3 flex flex-col justify-center text-left">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How does it work for healthcare professionals?</h2>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            Upon registration, your qualifications will be verified to ensure you are qualified for tests or
            sample-taking at patient’s homes.
          </p>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            After registration, you will make a one-time payment for a medical test kit and starter kit.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Once activated, you can accept requests for tests or consultations based on your location, offering
            on-demand services tailored to patient’s needs.
          </p>
        </div>
        <div className="lg:w-1/3 flex justify-center lg:justify-start mr-20">
          <div className="flex items-center justify-center w-[200px] h-[200px] rounded-full  ml-20 bg-white shadow-lg ">
            <Image src="/svgs/steth.svg" alt="hospital" width={400} height={400} className="w-30 h-32 text-brand-500" />
          </div>
        </div>
      </div>
    </div>
  )
}
