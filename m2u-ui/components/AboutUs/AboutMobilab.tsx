import React from 'react'
import Image from 'next/image'

export default function WhatIsMobilab() {
  return (
    <div className="flex justify-center py-12 px-4">
      <div className="flex flex-col lg:flex-row-reverse max-w-6xl w-full space-y-8  lg:space-x-8 lg:space-y-20">
        <div className="lg:w-2/3 flex flex-col justify-center text-left">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Mobilab2u</h2>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            Mobilab2u was founded as Mobile Healthcare Enterprise in 2021 by a group of doctors, insurance industry
            leaders, and lawyers to address healthcare gaps exposed by the Covid-19 pandemic.
          </p>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            The pandemic revealed the need for services connecting professionals with patients for home-based tests,
            consultations, and simple treatments.
          </p>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            Mobilab2u provides affordable medical test packages and consultations delivered to patients homes, offering
            additional income opportunities for medical professionals.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            We partner exclusively with accredited healthcare professionals, from doctors to counselors, across the
            healthcare supply chain.
          </p>
        </div>
        <div className="lg:w-1/3 flex justify-center lg:justify-start">
          <div className="flex items-center justify-center -mt-12">
            <Image
              src="/svgs/logo-bg-red.svg"
              alt="hospital"
              width={400}
              height={400}
              className="w-52 h-72 text-brand-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
