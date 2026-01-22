'use client'

import type React from 'react'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { initAOS, initSmoothScroll, initSplitting, initSwiper } from './animations'

export default function CustomerRegister() {
  const [showCodeInput, setShowCodeInput] = useState(false)
  const [idProofType, setIdProofType] = useState('nric')

  useEffect(() => {
    // Initialize animations
    initAOS()
    initSmoothScroll()
    initSplitting()
    initSwiper()
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted')
  }

  const handleVerifyClick = () => {
    setShowCodeInput(true)
  }

  return (
    <main>
      <section className="flex md:min-h-screen w-full bg-[#fef1e7]">
        <div className="flex flex-col md:flex-row w-full">
          {/* Left: Signup Form Section */}
          <div className="w-full md:max-w-md bg-white p-6 xl:p-8 flex flex-col justify-center h-auto rounded-xl shadow-md border border-gray-200 md:max-h-fit md:m-auto lg:max-w-none lg:mx-0 xl:rounded-none lg:shadow-none lg:border-0 xl:w-2/3 2xl:w-2/3 lg:w-1/2 lg:h-full lg:max-h-full">
            {/* Logo */}
            <div className="flex justify-center lg:mb-0 xl:mb-2" data-aos="fade-down">
              <Image
                src="/assets/images/svg/mobilab2u-icon.svg"
                alt="Signup Icon"
                width={96}
                height={96}
                className="w-24 h-24"
              />
            </div>

            <h2
              className="text-[18px] sm:text-lg lg:text-xl xl:text-2xl font-semibold text-center mb-4"
              data-aos="fade-up"
            >
              Signup
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5" data-aos="fade-up" data-aos-delay="100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative mt-1">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="fea icon-sm icons"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </span>
                    <input
                      id="name"
                      type="text"
                      placeholder="Name"
                      className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none placeholder-gray-400 text-sm focus:ring-1 focus:ring-red-600"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative mt-1">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h3 mb-0"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </span>
                    <input
                      id="mobile"
                      type="tel"
                      placeholder="Mobile Number"
                      className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none placeholder-gray-400 text-sm focus:ring-1 focus:ring-red-600"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Date of Birth */}
                <div>
                  <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <div className="relative mt-1">
                    <input
                      id="dob"
                      type="date"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-600 placeholder-gray-400 text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        defaultChecked
                        className="text-red-600 focus:ring-red-600 border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">Male</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        className="text-red-600 focus:ring-red-600 border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">Female</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="other"
                        className="text-red-600 focus:ring-red-600 border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">Other</span>
                    </label>
                  </div>
                </div>
              </div>

              <div id="email-section" className="flex flex-col space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Your Email <span className="text-red-500">*</span>
                </label>

                <div className="relative flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
                  <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="fea icon-sm icons"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </span>
                    <input
                      id="email"
                      type="email"
                      placeholder="Email"
                      className="w-full pl-10 pr-24 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-600 placeholder-gray-400 text-sm"
                      required
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleVerifyClick}
                    className="bg-red-600 text-white px-3 py-2 rounded-md text-sm hover:bg-red-700"
                  >
                    {showCodeInput ? 'Resend' : 'Verify'}
                  </button>

                  <input
                    id="code"
                    type="text"
                    placeholder="Code"
                    maxLength={6}
                    className={`w-full sm:w-28 pl-2 pr-2 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-600 placeholder-gray-400 text-sm ${
                      showCodeInput ? '' : 'hidden'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID Proof <span className="text-red-500">*</span>
                </label>

                <div className="!mt-1 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="id-type"
                        value="nric"
                        checked={idProofType === 'nric'}
                        onChange={(e) => setIdProofType(e.target.value)}
                        className="text-red-600 focus:ring-red-500 border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">NRIC</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="id-type"
                        value="passport"
                        checked={idProofType === 'passport'}
                        onChange={(e) => setIdProofType(e.target.value)}
                        className="text-red-600 focus:ring-red-500 border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">Passport</span>
                    </label>
                  </div>

                  <input
                    id="id-input"
                    type="text"
                    placeholder={idProofType === 'nric' ? 'Enter NRIC Number' : 'Enter Passport Number'}
                    className="flex-1 pl-3 pr-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-600 placeholder-gray-400 text-sm"
                    required
                  />
                </div>
              </div>

              {/* Address Field */}
              <div className="mt-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address <span className="text-red-500">*</span>
                </label>

                <div className="relative mt-1">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="fea icon-sm icons"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 1 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </span>
                  <input
                    id="address"
                    type="text"
                    placeholder="Enter your address"
                    className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-600 placeholder-gray-400 text-sm"
                    required
                  />
                </div>
              </div>

              {/* 🏙️ New Location Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mt-4">
                {/* Autocomplete */}
                <div className="col-span-1 sm:col-span-2 lg:col-span-6">
                  {/* Replace with your real Autocomplete component */}
                  <div className="relative">
                    <label htmlFor="autocomplete" className="block text-sm font-medium text-gray-700">
                      Search Address / Area
                    </label>
                    <input
                      id="autocomplete"
                      type="text"
                      placeholder="Start typing your area..."
                      className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-600 placeholder-gray-400 text-sm"
                    />
                  </div>
                </div>

                {/* State */}
                <div className="col-span-1 sm:col-span-1 lg:col-span-2">
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    id="state"
                    type="text"
                    placeholder="State"
                    className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-600 placeholder-gray-400 text-sm"
                  />
                </div>

                {/* City */}
                <div className="col-span-1 sm:col-span-1 lg:col-span-2">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    placeholder="City"
                    className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-600 placeholder-gray-400 text-sm"
                  />
                </div>

                {/* Post Code */}
                <div className="col-span-1 sm:col-span-2 lg:col-span-2">
                  <label htmlFor="postCode" className="block text-sm font-medium text-gray-700">
                    Post Code
                  </label>
                  <input
                    id="postCode"
                    type="text"
                    placeholder="Post Code"
                    pattern="\d{0,5}"
                    className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-600 placeholder-gray-400 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative mt-1">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="fea icon-sm icons"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                      </svg>
                    </span>
                    <input
                      id="password"
                      type="password"
                      placeholder="Password"
                      className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-600 placeholder-gray-400 text-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative mt-1">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="fea icon-sm icons"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                      </svg>
                    </span>
                    <input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm Password"
                      className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-600 placeholder-gray-400 text-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address <span className="text-red-500">*</span>
                </label>

                <div className="relative mt-1">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="fea icon-sm icons"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 1 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </span>

                  <input
                    id="address"
                    type="text"
                    placeholder="Enter your address"
                    className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-600 placeholder-gray-400 text-sm"
                    required
                  />
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-center">
                <input id="terms" type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" required />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  I Accept{' '}
                  <Link href="#" className="text-red-600 hover:underline">
                    Terms And Condition
                  </Link>
                </label>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-md font-medium hover:bg-red-700 transition-colors"
              >
                Register
              </button>
            </form>

            {/* Already have account */}
            <p className="mt-6 text-center text-sm text-gray-600" data-aos="fade-up" data-aos-delay="300">
              Already have an account?{' '}
              <Link href="#" className="text-red-600 font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          {/* Right: Full Background Image Section */}
          <div
            className="hidden xl:flex w-full xl:w-2/3 lg:w-1/2 bg-cover bg-center hidden lg:block"
            style={{ backgroundImage: "url('/assets/images/register/register-mobilab2u.webp')" }}
            data-aos="fade-left"
            data-aos-delay="400"
          />
        </div>
      </section>
    </main>
  )
}
