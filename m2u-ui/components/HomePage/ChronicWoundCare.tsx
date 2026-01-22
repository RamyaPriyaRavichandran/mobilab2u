'use client'

import { useEffect, useState } from 'react'
import { initAOS, initSmoothScroll, initSplitting, initSwiper } from './animations'
import Link from 'next/link'
import Image from 'next/image'

export default function ChronicWoundCare() {
  const [openPackageIndex, setOpenPackageIndex] = useState<number | null>(null)
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0)

  useEffect(() => {
    // Initialize animations
    initAOS()
    initSmoothScroll()
    initSplitting()
    initSwiper()
  }, [])

  const togglePackage = (index: number) => {
    setOpenPackageIndex(openPackageIndex === index ? null : index)
  }

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index)
  }

  return (
    <main>
      {/* Breadcrumb Section */}
      <section className="bg-[#fef1e7] pt-8 pb-16 md:pt-[3rem] md:pb-[6rem]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-[20px] md:text-3xl font-bold text-black mb-2">
            Professional Chronic Wound Management at Home in Malaysia
          </h1>

          <ul className="flex flex-wrap justify-center gap-0 text-sm text-black font-semibold mt-[24px]">
            <li className="flex items-center gap-1">
              <Image
                src="/assets/images/svg/home.svg"
                alt=""
                title=""
                width="16"
                height="16"
                loading="lazy"
                className="w-4 h-4 pt-[]"
              />
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span className="ml-[5px]">›</span>
              <i className="flaticon flaticon-next inline-block relative top-[2.5px] mx-[5px]"></i>
            </li>
            <li>
              <Link href="/services" className="hover:underline">
                Services
              </Link>
              <span className="ml-[10px]">›</span>
              <i className="flaticon flaticon-next inline-block relative top-[2.5px] mx-[5px]"></i>
            </li>
            <li>
              <Link href="/services/home-care-services" className="hover:underline">
                Home Care Services
              </Link>
              <span className="ml-[10px]">›</span>
              <i className="flaticon flaticon-next inline-block relative top-[2.5px] mx-[5px]"></i>
            </li>
            <li className="text-gray-500">Chronic Wound Care Treatment</li>
          </ul>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-[url('/assets/images/bg/shape-06.webp')] bg-no-repeat bg-cover bg-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-8 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div data-aos="fade-left">
            <h2
              className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#1d1d1f] mb-6 splt-txt text-center sm:text-left"
              data-splitting
              data-aos="fade-in"
            >
              Trusted <em className="text-red-600">Chronic Wound Care Treatment</em> at Home in Malaysia
            </h2>
            <p className="text-[14px] sm:text-base text-gray-600 mb-[1.5rem] sm:mb-10 text-justify sm:text-left">
              Chronic wounds can be painful and slow to heal, affecting your daily life. At MobiLab2u, we bring skilled
              and caring wound care to your home. Wounds that don&apos;t heal quickly need regular attention and
              professional care, which we provide safely and comfortably.
            </p>

            <p className="text-[14px] sm:text-base text-gray-600 mb-[1.5rem] sm:mb-10 text-justify sm:text-left">
              Our{' '}
              <Link href="doctor-nurse-home-visit.html" className="text-red-600" title="Doctor & Nurse Home Visit">
                {' '}
                wound care team{' '}
              </Link>{' '}
              visits your home to check and treat your wounds. We also look at your overall health, including issues
              like diabetes or poor blood circulation, and create a care plan to help your wound heal and prevent
              problems. Going to a clinic can be hard, especially if you have trouble moving. We make it easier by
              giving reliable wound care at home, helping you recover without the stress of travel.
            </p>

            <p className="text-[14px] sm:text-base mt-4 mb-0">Why patients and families trust us:</p>

            <ul className="space-y-2 mt-5">
              <li className="flex items-start gap-2">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-[14px] sm:text-base font-semibold text-[#001e2b]">
                  Expert wound care by experienced professionals
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-[14px] sm:text-base font-semibold text-[#001e2b]">
                  Personalised treatment for your specific condition
                </span>
              </li>

              <li className="flex items-start gap-2">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-[14px] sm:text-base font-semibold text-[#001e2b]">
                  No travel needed; care comes to your home
                </span>
              </li>

              <li className="flex items-start gap-2">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-base font-semibold text-[#001e2b]">
                  Holistic support for your overall well-being
                </span>
              </li>
            </ul>

            <p className="text-[14px] sm:text-base mt-5">
              This is care designed around your needs, your space, and your life.
            </p>
          </div>

          {/* Image */}
          <div className="flex justify-center" data-aos="fade-right">
            <Image
              src="/assets/images/services/trusted-chronic-wound-care-treatment-home-malaysia.webp"
              alt="Receive trusted chronic wound care treatment at home in Malaysia with medical support and healing"
              title="Trusted Chronic Wound Care Treatment At Home In Malaysia"
              width="580"
              height="500"
              loading="lazy"
              className="rounded-2xl w-full max-w-sm sm:max-w-md md:max-w-[580px] md:h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Wound Care Packages Section */}
      <section className="max-w-7xl mx-auto py-8 md:py-12 px-4 overflow-hidden">
        <h3
          className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-12 text-center splt-txt"
          data-splitting
          data-aos="fade-in"
        >
          Complete <em className="text-red-600">Chronic Wound Care Packages </em> at Home in Malaysia
        </h3>

        <div className="bg-[#fef1e7] p-6 rounded-2xl shadow">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Package 1 */}
            <div>
              <div className="mt-4">
                <button
                  onClick={() => togglePackage(0)}
                  className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                      <Image
                        src="/assets/images/svg/wound-assessment-management.svg"
                        alt="Wound Assessment And Customized Care Plan In Malaysia"
                        title="Wound Assessment And Customized Care Plan In Malaysia"
                        width="40"
                        height="40"
                        loading="lazy"
                        className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                      />
                    </div>
                    <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                      Wound Assessment & Management – Customised Care Plan
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                      openPackageIndex === 0 ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {openPackageIndex === 0 && (
                  <div className="bg-white p-4 mt-2 rounded-2xl shadow text-sm text-gray-700">
                    <p className="text-gray-600 mb-5">Perfect for initial evaluation and follow-up care.</p>
                    <p className="mb-3 font-semibold text-gray-800">
                      <strong>Includes:</strong>
                    </p>
                    <div>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-2">
                          <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          Thorough Wound Assessment
                        </li>

                        <li className="flex items-center gap-2">
                          <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          Wound Cleaning
                        </li>

                        <li className="flex items-center gap-2">
                          <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          Choosing and Applying Advanced Dressings
                        </li>

                        <li className="flex items-center gap-2">
                          <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          Monitoring and Managing Infections
                        </li>

                        <li className="flex items-center gap-2">
                          <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          Patient and Caregiver Education
                        </li>
                      </ul>
                    </div>

                    {/* <div className="mt-6">
                      <Link
                        href="/"
                        className="inline-block px-6 py-2 text-white bg-black rounded-md font-semibold hover:bg-red-600 transition"
                      >
                        Book now
                      </Link>
                    </div> */}
                  </div>
                )}
              </div>
            </div>

            {/* Package 2 */}
            <div>
              <div className="mt-4">
                <button
                  onClick={() => togglePackage(1)}
                  className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                      <Image
                        src="/assets/images/svg/diabetic-ulcer-patient.svg"
                        alt="Specialized Diabetic Ulcer Wound Care At Home Malaysia"
                        title="Specialized Diabetic Ulcer Wound Care At Home Malaysia"
                        width="40"
                        height="40"
                        loading="lazy"
                        className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                      />
                    </div>
                    <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                      Diabetic Ulcer Care—Specialized Treatment for Diabetic Wounds
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                      openPackageIndex === 1 ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {openPackageIndex === 1 && (
                  <div className="bg-white p-4 mt-2 rounded-2xl shadow text-sm text-gray-700">
                    <p className="text-gray-600 mb-5">Focused care for those with diabetic foot ulcers.</p>
                    <p className="mb-3 font-semibold text-gray-800">
                      <strong>Includes:</strong>
                    </p>

                    <div>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-2">
                          <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          All services from Wound Assessment and Management
                        </li>

                        <li className="flex items-center gap-2">
                          <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          Pressure Offloading Techniques
                        </li>

                        <li className="flex items-center gap-2">
                          <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          Blood Glucose Checks
                        </li>

                        <li className="flex items-center gap-2">
                          <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          Foot Care Tips and Education
                        </li>
                      </ul>
                    </div>

                    {/* <div className="mt-6">
                      <Link
                        href="/"
                        className="inline-block px-6 py-2 text-white bg-black rounded-md font-semibold hover:bg-red-600 transition"
                      >
                        Book now
                      </Link>
                    </div> */}
                  </div>
                )}
              </div>
            </div>

            {/* Package 3 */}
            <div>
              <div className="mt-4">
                <button
                  onClick={() => togglePackage(2)}
                  className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                      <Image
                        src="/assets/images/svg/pressure-ulcer-patient.svg"
                        alt="Pressure Ulcer And Bedsore Treatment At Home In Malaysia"
                        title="Pressure Ulcer And Bedsore Treatment At Home In Malaysia"
                        width="40"
                        height="40"
                        loading="lazy"
                        className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                      />
                    </div>
                    <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                      Pressure Ulcer (Bedsore) Management – Targeted Support for Immobility Wounds
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                      openPackageIndex === 2 ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {openPackageIndex === 2 && (
                  <div className="bg-white p-4 mt-2 rounded-2xl shadow text-sm text-gray-700">
                    <p className="text-gray-600 mb-5">Designed for wounds caused by prolonged sitting or lying down.</p>
                    <p className="mb-3 font-semibold text-gray-800">
                      <strong>Includes:</strong>
                    </p>
                    <div>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-2">
                          <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          All services from Wound Assessment and Management
                        </li>

                        <li className="flex items-center gap-2">
                          <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          Repositioning Strategies
                        </li>

                        <li className="flex items-center gap-2">
                          <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          Nutrition Support
                        </li>

                        <li className="flex items-center gap-2">
                          <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          Personalised Pressure Relief Methods
                        </li>
                      </ul>
                    </div>
                    {/* <div className="mt-6">
                      <Link
                        href="/"
                        className="inline-block px-6 py-2 text-white bg-black rounded-md font-semibold hover:bg-red-600 transition"
                      >
                        Book now
                      </Link>
                    </div> */}
                  </div>
                )}
              </div>
            </div>

            {/* Package 4 */}
            <div>
              <div className="mt-2">
                <button
                  onClick={() => togglePackage(3)}
                  className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                      <Image
                        src="/assets/images/svg/venous-ulcer-patient.svg"
                        alt="Venous Ulcer Therapy And Home Treatment Across Malaysia"
                        title="Venous Ulcer Therapy And Home Treatment Across Malaysia"
                        width="40"
                        height="40"
                        loading="lazy"
                        className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                      />
                    </div>
                    <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                      Venous Ulcer Therapy – Care for Circulation-Related Wounds
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                      openPackageIndex === 3 ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {openPackageIndex === 3 && (
                  <div className="bg-white p-4 mt-2 rounded-2xl shadow text-sm text-gray-700">
                    <p className="text-gray-600 mb-4">For ulcers caused by poor vein circulation.</p>

                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        All services from Wound Assessment and Management
                      </li>

                      <li className="flex items-center gap-2">
                        <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        Compression Therapy (Multi-Layered)
                      </li>

                      <li className="flex items-center gap-2">
                        <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        Elevation and Light Exercise Recommendations
                      </li>

                      <li className="flex items-center gap-2">
                        <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        Swelling Management Techniques
                      </li>
                    </ul>

                    {/* <div className="mt-6">
                      <Link
                        href="/"
                        className="inline-block px-6 py-2 text-white bg-black rounded-md font-semibold hover:bg-red-600 transition"
                      >
                        Book now
                      </Link>
                    </div> */}
                  </div>
                )}
              </div>
            </div>

            {/* Package 5 */}
            <div>
              <div className="mt-2">
                <button
                  onClick={() => togglePackage(4)}
                  className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)] relative">
                      <Image
                        src="/assets/images/svg/post-surgery-patient.svg"
                        alt=""
                        width={40} // Tailwind w-10 = 2.5rem = 40px
                        height={40}
                        className="filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                      />
                    </div>

                    <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                      Post-Surgical Wound Care – Recovery Support for Surgical Incisions
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                      openPackageIndex === 4 ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {openPackageIndex === 4 && (
                  <div className="bg-white p-4 mt-2 rounded-2xl shadow text-sm text-gray-700">
                    <p className="text-gray-600 mb-4">For wounds that haven&apos;t healed properly after surgery.</p>
                    <p className="mb-3 font-semibold text-gray-800">
                      <strong>Includes:</strong>
                    </p>

                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        All services from Wound Assessment and Management
                      </li>

                      <li className="flex items-center gap-2">
                        <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        Removal of Stitches or Staples (if required)
                      </li>

                      <li className="flex items-center gap-2">
                        <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        Following Post-Op Guidelines
                      </li>

                      <li className="flex items-center gap-2">
                        <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        Infection Prevention
                      </li>
                    </ul>

                    {/* <div className="mt-6">
                      <Link
                        href="#"
                        className="inline-block px-6 py-2 text-white bg-black rounded-md font-semibold hover:bg-red-600 transition"
                      >
                        Book now
                      </Link>
                    </div> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-8 px-4 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-5 text-center">
          How Our <em className="text-red-600">At-Home Wound Care Works </em>Across Malaysia?
        </h2>
        <div className="relative flex flex-col lg:flex-row max-w-7xl mx-auto gap-6 lg:gap-10">
          {/* Left Image Section */}
          <div className="w-full lg:w-1/2">
            <div className="lg:sticky lg:top-40 flex justify-center items-start" data-aos="fade-right">
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                <Image
                  src="/assets/images/services/wound-care-works-across-malaysia.svg"
                  alt="At-home wound care services across Malaysia with professional treatment and reliable support."
                  title="At Home Wound Care Services Available Across Malaysia"
                  width="512"
                  height="341"
                  loading="lazy"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Cards Section */}
          <div className="w-full lg:w-1/2" data-aos="fade-up">
            {/* Card 1 */}
            <div
              className="relative z-10 card bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-lg transition p-6 overflow-hidden mb-8"
              data-step="01"
            >
              <div className="flex items-start gap-5 relative z-10">
                <Image
                  src="/assets/images/svg/schedule-visit.svg"
                  alt="Schedule Wound Care Treatment At Home In Malaysia"
                  title="Schedule Wound Care Treatment At Home In Malaysia"
                  width="40"
                  height="40"
                  loading="lazy"
                  className="shrink-0 w-12 sm:w-12"
                />
                <div>
                  <h4 className="text-[16px] sm:text-xl font-semibold text-gray-900">Schedule a Visit</h4>
                  <p className="mt-2 text-gray-600 text-[14px] sm:text-base text-justify sm:text-left">
                    Pick your service and book a time online or by phone via MobiLab2u. We offer flexible appointments.
                  </p>
                </div>
              </div>
              <span className="absolute bottom-4 right-6 text-[5rem] font-bold text-gray-100 opacity-70 pointer-events-none leading-none z-0">
                01
              </span>
            </div>

            {/* Card 2 */}
            <div
              className="relative z-10 card bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-lg transition p-6 overflow-hidden mb-8"
              data-step="02"
            >
              <div className="flex items-start gap-5 relative z-10">
                <Image
                  src="/assets/images/svg/initial-evaluation.svg"
                  alt="Initial Wound Evaluation By Specialists At Home In Malaysia"
                  title="Initial Wound Evaluation By Specialists At Home In Malaysia"
                  width="40"
                  height="40"
                  loading="lazy"
                  className="shrink-0 w-16 sm:w-14"
                />
                <div>
                  <h4 className="text-[16px] sm:text-xl font-semibold text-gray-900">Initial Evaluation</h4>
                  <p className="mt-2 text-gray-600 text-[14px] sm:text-base text-justify sm:text-left">
                    A wound care specialist visits your home and does a full check-up of the wound and your general
                    health.
                  </p>
                </div>
              </div>
              <span className="absolute bottom-4 right-6 text-[5rem] font-bold text-gray-100 opacity-70 pointer-events-none leading-none z-0">
                02
              </span>
            </div>

            {/* Card 3 */}
            <div
              className="relative z-10 card bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-lg transition p-6 overflow-hidden mb-8"
              data-step="03"
            >
              <div className="flex items-start gap-5 relative z-10">
                <Image
                  src="/assets/images/svg/care-plans.svg"
                  alt="Wound Care Plans Designed For Patients Living In Malaysia"
                  title="Wound Care Plans Designed For Patients Living In Malaysia"
                  width="40"
                  height="40"
                  loading="lazy"
                  className="shrink-0 w-16 sm:w-14"
                />
                <div>
                  <h4 className="text-[16px] sm:text-xl font-semibold text-gray-900">Care Plan Setup</h4>
                  <p className="mt-2 text-gray-600 text-[14px] sm:text-base text-justify sm:text-left">
                    We develop a plan just for you, including what kind of care, how often, and what to expect.
                  </p>
                </div>
              </div>
              <span className="absolute bottom-4 right-6 text-[5rem] font-bold text-gray-100 opacity-70 pointer-events-none leading-none z-0">
                03
              </span>
            </div>

            {/* Card 4 */}
            <div
              className="relative z-10 card bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-lg transition p-6 overflow-hidden mb-8"
              data-step="04"
            >
              <div className="flex items-start gap-5 relative z-10">
                <Image
                  src="/assets/images/svg/treatment-home.svg"
                  alt="Professional Sterile Wound Treatment at Home Across Malaysia"
                  title="Professional Sterile Wound Treatment at Home Across Malaysia"
                  width="40"
                  height="40"
                  loading="lazy"
                  className="shrink-0 w-16 sm:w-14"
                />
                <div>
                  <h4 className="text-[16px] sm:text-xl font-semibold text-gray-900">Sterile Treatment at Home</h4>
                  <p className="mt-2 text-gray-600 text-[14px] sm:text-base text-justify sm:text-left">
                    All treatments are done using fresh, sterile equipment under strict hygiene standards.
                  </p>
                </div>
              </div>
              <span className="absolute bottom-4 right-6 text-[5rem] font-bold text-gray-100 opacity-70 pointer-events-none leading-none z-0">
                04
              </span>
            </div>

            {/* Card 5 */}
            <div
              className="relative z-10 card bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-lg transition p-6 overflow-hidden mb-8"
              data-step="05"
            >
              <div className="flex items-start gap-5 relative z-10">
                <Image
                  src="/assets/images/svg/tracking-your-healing.svg"
                  alt="Tracking Healing Progress With  Wound Care Support Malaysia"
                  title="Tracking Healing Progress With  Wound Care Support Malaysia"
                  width="40"
                  height="40"
                  loading="lazy"
                  className="shrink-0 w-16 sm:w-14"
                />
                <div>
                  <h4 className="text-[16px] sm:text-xl font-semibold text-gray-900">Tracking Your Healing</h4>
                  <p className="mt-2 text-gray-600 text-[14px] sm:text-base text-justify sm:text-left">
                    We document every step of progress and adjust the plan as your wound heals.
                  </p>
                </div>
              </div>
              <span className="absolute bottom-4 right-6 text-[5rem] font-bold text-gray-100 opacity-70 pointer-events-none leading-none z-0">
                05
              </span>
            </div>

            {/* Card 6 */}
            <div
              className="relative z-10 card bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-lg transition p-6 overflow-hidden mb-8"
              data-step="06"
            >
              <div className="flex items-start gap-5 relative z-10">
                <Image
                  src="/assets/images/svg/caregiver-care.svg"
                  alt="Caregiver Training & Daily Guidance for Home Care, Malaysia"
                  title="Caregiver Training & Daily Guidance for Home Care, Malaysia"
                  width="40"
                  height="40"
                  loading="lazy"
                  className="shrink-0 w-16 sm:w-14"
                />
                <div>
                  <h4 className="text-[16px] sm:text-xl font-semibold text-gray-900">Caregiver Updates</h4>
                  <p className="mt-2 text-gray-600 text-[14px] sm:text-base text-justify sm:text-left">
                    If someone is helping care for you, we guide and train them too, so you feel supported every day.
                  </p>
                </div>
              </div>
              <span className="absolute bottom-4 right-6 text-[5rem] font-bold text-gray-100 opacity-70 pointer-events-none leading-none z-0">
                06
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Protocols Section */}
      <section className="py-4 sm:py-12 overflow-hidden">
        <h3
          className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-6 sm:mb-12 text-center splt-txt"
          data-splitting
          data-aos="fade-in"
        >
          <em className="text-red-600">Safety Protocols</em> for Wound Care & Patient Handling
        </h3>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up">
          {/* Card 1 */}
          <div className="bg-[#fef1e7] rounded-2xl p-6">
            <h4 className="text-base sm:text-xl font-semibold text-gray-800 mb-4">Medical Safety First</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>All care is delivered by trained, certified professionals</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Single-use sterile tools only</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>We follow international wound care best practices.</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Strict infection control at every step</span>
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="bg-[#fef1e7] rounded-2xl p-6">
            <h4 className="text-base sm:text-xl font-semibold text-gray-800 mb-4">
              For Diagnostic Needs (if required):
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Safe, sealed transport of supplies</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Barcoded sample tracking</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Fast dispatch of samples</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Partner labs are ISO 15189-accredited</span>
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-[#fef1e7] rounded-2xl p-6">
            <h4 className="text-base sm:text-xl font-semibold text-gray-800 mb-4">Patient Rights & Data Security </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Digital Consent and Verification</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Data Privacy and Confidentiality </span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Regular Internal Audits</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Who Benefits Section */}
      <section className="py-8 sm:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-[7rem] px-4">
          {/* Left Content */}
          <div className="flex-1" data-aos="fade-right">
            <h3
              className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#1d1d1f] mb-6 text-center sm:text-left splt-txt"
              data-splitting
              data-aos="fade-in"
            >
              Who Benefits From At-Home<em className="text-red-600"> Chronic Wound Care</em> In Malaysia?
            </h3>
            <p className="text-[14px] sm:text-base text-justify mb-6">
              This service is ideal for people who need professional care but prefer or require home-based support,
              including:
            </p>

            {/* Feature List */}
            <div className="bg-[#fef1e7] border border-gray-200 rounded-lg p-6">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  </div>
                  <p className="text-[14px] sm:text-base text-gray-700">
                    Elderly patients who have trouble getting to clinics
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  </div>
                  <p className="text-[14px] sm:text-base text-gray-700">Diabetic patients dealing with foot ulcers</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  </div>
                  <p className="text-[14px] sm:text-base text-gray-700">
                    Bedridden or immobile patients with pressure sores require home care.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  </div>
                  <p className="text-[14px] sm:text-base text-gray-700">Those healing after surgery</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  </div>
                  <p className="text-[14px] sm:text-base text-gray-700">
                    Families or caregivers looking for expert help
                  </p>
                </li>
              </ul>
            </div>

            <p className="mt-6  text-[14px] text-justify sm:text-base sm:text-left">
              Whether it&apos;s a complex wound or daily dressing changes, our team is here to help you heal at your own
              pace, in your own space.
            </p>
          </div>

          <div className="flex-1 w-full" data-aos="fade-left">
            <Image
              src="/assets/images/services/benefits-from-chronic-wound-are-malaysia.webp"
              alt="Patients with diabetic ulcers, pressure sores, venous ulcers, and benefit from home care in Malaysia"
              title="Patients Benefiting From At Home Chronic Wound Care Malaysia"
              width="500"
              height="600"
              loading="lazy"
              className=" max-w-full rounded-2xl object-cover shadow-lg mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Why Choose MobiLab2u Section */}
      <section className="bg-[#fef1e7] py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <h3
            className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 text-center splt-txt"
            data-splitting
            data-aos="fade-in"
          >
            Why Choose <em className="text-red-600">MobiLab2u</em> For Chronic Wound Care in Malaysia?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up">
            {/* Card 1 */}
            <div className="bg-white p-6 sm:p-[2.5rem] rounded-2xl shadow-sm">
              <Image
                src="/assets/images/svg/qualified-doctors.svg"
                alt="Qualified Wound Care Professionals Serving Patients Malaysia"
                title="Qualified Wound Care Professionals Serving Patients Malaysia"
                width="48"
                height="48"
                loading="lazy"
                className="w-12 h-12 mb-[1.5rem] filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
              />
              <h4 className="text-[16px] sm:text-xl font-semibold text-black mb-2">Qualified Professionals</h4>
              <p className="text-[14px] text-justify sm:text-base sm:text-left">
                Our nurses and wound specialists are trained in advanced wound care techniques and certified by the
                Ministry of Health.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 sm:p-[2.5rem] rounded-2xl shadow-sm">
              <Image
                src="/assets/images/svg/licenced-collection-medicine.svg"
                alt="Safe Wound Care Services Delivered At Home Malaysia"
                title="Safe Wound Care Services Delivered At Home Malaysia"
                width="48"
                height="48"
                loading="lazy"
                className="w-12 h-12 mb-[1.5rem] filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
              />
              <h4 className="text-[16px] sm:text-xl font-semibold text-black mb-2">Clean, Safe Care Every Time</h4>
              <p className="text-[14px] text-justify sm:text-base sm:text-left">
                We never compromise on hygiene. Every piece of equipment is sterile, and every step is by the book.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 sm:p-[2.5rem] rounded-2xl shadow-sm">
              <Image
                src="/assets/images/svg/nation-wide-access.svg"
                alt="At Home Wound Care Services Available Across Malaysia"
                title="At Home Wound Care Services Available Across Malaysia"
                width="48"
                height="48"
                loading="lazy"
                className="w-12 h-12 mb-[1.5rem] filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
              />
              <h4 className="text-[16px] sm:text-xl font-semibold text-black mb-2">We Come to You</h4>
              <p className="text-[14px] text-justify sm:text-base sm:text-left">
                No long travel times or waiting rooms. We&apos;re already serving many major cities and expanding fast.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Areas Section */}
      <section className="py-8 md:py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h3 className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#0d1623] mb-8 sm:mb-12">
            Areas We Cover for <em className="text-red-600"> Quality Healthcare Services </em> in Malaysia
          </h3>

          <div className="flex flex-wrap justify-center gap-4" data-aos="fade-up">
            <div className="flex items-center gap-3 px-2 py-2 pl-6 pr-6 border border-gray-300 rounded-full hover:shadow transition">
              <Image
                src="/assets/images/svg/location.svg"
                alt=""
                title=""
                width="24"
                height="24"
                loading="lazy"
                className="md:w-6 md:h-6 w-3 h-3"
              />
              <span className="md:text-sm text-[12px] font-medium text-[#0d1623]">Selangor</span>
            </div>

            <div className="flex items-center gap-3 px-2 py-2 pl-6 pr-6 border border-gray-300 rounded-full hover:shadow transition">
              <Image
                src="/assets/images/svg/location.svg"
                alt=""
                title=""
                width="24"
                height="24"
                loading="lazy"
                className="md:w-6 md:h-6 w-3 h-3"
              />
              <span className="md:text-sm text-[12px] font-medium text-[#0d1623]">Kuala Lumpur</span>
            </div>

            <div className="flex items-center gap-3 px-2 py-2 pl-6 pr-6 border border-gray-300 rounded-full hover:shadow transition">
              <Image
                src="/assets/images/svg/location.svg"
                alt=""
                title=""
                width="24"
                height="24"
                loading="lazy"
                className="md:w-6 md:h-6 w-3 h-3"
              />
              <span className="md:text-sm text-[12px] font-medium text-[#0d1623]">Johor Bahru</span>
            </div>

            <div className="flex items-center gap-3 px-2 py-2 pl-6 pr-6 border border-gray-300 rounded-full hover:shadow transition">
              <Image
                src="/assets/images/svg/location.svg"
                alt=""
                title=""
                width="24"
                height="24"
                loading="lazy"
                className="md:w-6 md:h-6 w-3 h-3"
              />
              <span className="md:text-sm text-[12px] font-medium text-[#0d1623]">Penang (Island and Mainland)</span>
            </div>

            <div className="flex items-center gap-3 px-2 py-2 pl-6 pr-6 border border-gray-300 rounded-full hover:shadow transition">
              <Image
                src="/assets/images/svg/location.svg"
                alt=""
                title=""
                width="24"
                height="24"
                loading="lazy"
                className="md:w-6 md:h-6 w-3 h-3"
              />
              <span className="md:text-sm text-[12px] font-medium text-[#0d1623]">Melaka</span>
            </div>

            <div className="flex items-center gap-3 px-2 py-2 pl-6 pr-6 border border-gray-300 rounded-full hover:shadow transition">
              <Image
                src="/assets/images/svg/location.svg"
                alt=""
                title=""
                width="24"
                height="24"
                loading="lazy"
                className="md:w-6 md:h-6 w-3 h-3"
              />
              <span className="md:text-sm text-[12px] font-medium text-[#0d1623]">Negeri Sembilan</span>
            </div>

            <div className="flex items-center gap-3 px-2 py-2 pl-6 pr-6 border border-gray-300 rounded-full hover:shadow transition">
              <Image
                src="/assets/images/svg/location.svg"
                alt=""
                title=""
                width="24"
                height="24"
                loading="lazy"
                className="md:w-6 md:h-6 w-3 h-3"
              />
              <span className="md:text-sm text-[12px] font-medium text-[#0d1623]">Kedah</span>
            </div>

            <div className="flex items-center gap-3 px-2 py-2 pl-6 pr-6 border border-gray-300 rounded-full hover:shadow transition">
              <Image
                src="/assets/images/svg/location.svg"
                alt=""
                title=""
                width="24"
                height="24"
                loading="lazy"
                className="md:w-6 md:h-6 w-3 h-3"
              />
              <span className="md:text-sm text-[12px] font-medium text-[#0d1623]">Kelantan</span>
            </div>

            <div className="flex items-center gap-3 px-2 py-2 pl-6 pr-6 border border-gray-300 rounded-full hover:shadow transition">
              <Image
                src="/assets/images/svg/location.svg"
                alt=""
                title=""
                width="24"
                height="24"
                loading="lazy"
                className="md:w-6 md:h-6 w-3 h-3"
              />
              <span className="md:text-sm text-[12px] font-medium text-[#0d1623]">Perak</span>
            </div>

            <div className="flex items-center gap-3 px-2 py-2 pl-6 pr-6 border border-gray-300 rounded-full hover:shadow transition">
              <Image
                src="/assets/images/svg/location.svg"
                alt=""
                title=""
                width="24"
                height="24"
                loading="lazy"
                className="md:w-6 md:h-6 w-3 h-3"
              />
              <span className="md:text-sm text-[12px] font-medium text-[#0d1623]">Perlis</span>
            </div>

            <div className="flex items-center gap-3 px-2 py-2 pl-6 pr-6 border border-gray-300 rounded-full hover:shadow transition">
              <Image
                src="/assets/images/svg/location.svg"
                alt=""
                title=""
                width="24"
                height="24"
                loading="lazy"
                className="md:w-6 md:h-6 w-3 h-3"
              />
              <span className="md:text-sm text-[12px] font-medium text-[#0d1623]">Sabah</span>
            </div>

            <div className="flex items-center gap-3 px-2 py-2 pl-6 pr-6 border border-gray-300 rounded-full hover:shadow transition">
              <Image
                src="/assets/images/svg/location.svg"
                alt=""
                title=""
                width="24"
                height="24"
                loading="lazy"
                className="md:w-6 md:h-6 w-3 h-3"
              />
              <span className="md:text-sm text-[12px] font-medium text-[#0d1623]">Sarawak</span>
            </div>

            <div className="flex items-center gap-3 px-2 py-2 pl-6 pr-6 border border-gray-300 rounded-full hover:shadow transition">
              <Image
                src="/assets/images/svg/location.svg"
                alt=""
                title=""
                width="24"
                height="24"
                loading="lazy"
                className="md:w-6 md:h-6 w-3 h-3"
              />
              <span className="md:text-sm text-[12px] font-medium text-[#0d1623]">Terengganu</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#fef1e7] py-8 md:py-16 px-6 md:px-10 rounded-2xl text-center max-w-7xl mx-auto overflow-hidden">
        <div className="max-w-5xl mx-auto" data-aos="fade-up">
          <h3
            className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-6 splt-txt"
            data-splitting
            data-aos="fade-in"
          >
            Take the <em className="text-red-600">First Step Toward</em> Healing Today with MobiLab2u
          </h3>

          <p className="text-sm md:text-lg text-gray-600 mb-10">
            A chronic wound shouldn&apos;t hold you back from living comfortably. Let our expert team support your
            recovery from the place you know best, home. Schedule a visit today and take the first step toward safer,
            faster healing.
          </p>

          <div className="flex flex-row justify-center items-center gap-2 flex-wrap sm:flex-nowrap">
            <Link
              href="/user/register"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:shadow transition text-[#0d1623] font-medium bg-white text-sm sm:text-base"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.752 11.168l-5.197-3.027A1 1 0 008 9.027v5.946a1 1 0 001.555.832l5.197-3.027a1 1 0 000-1.664z"
                />
              </svg>
              Register
            </Link>

            {/* <Link
              href="/"
              className="flex-1 sm:flex-none px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-black transition text-sm sm:text-base text-center"
            >
              Book Now
            </Link> */}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 py-8 sm:py-16 overflow-hidden">
        <div className="w-full text-center">
          <span className="bg-[#dc2626] text-white text-sm font-semibold px-5 py-2 rounded-full inline-block mb-4">
            FAQ
          </span>
          <h3
            className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-6 splt-txt"
            data-splitting
            data-aos="fade-in"
          >
            Common Questions About <em className="text-red-600"> At-Home Wound Care </em> in Malaysia
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4" data-aos="fade-right">
          <div className="col-span-12 space-y-6">
            {/* FAQ Item 1 */}
            <div className="border rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(0)}>
                <h4 className="text-[16px] sm:text-lg font-semibold">Is the care done at home really sterile?</h4>
                <span className="text-gray-500 text-xl">{openFaqIndex === 0 ? '✖' : '＋'}</span>
              </div>
              {openFaqIndex === 0 && (
                <div className="mt-4 text-[14px] sm:text-[15px] text-gray-700">
                  Absolutely. We utilize only sterile, single-use instruments and adhere to hospital-level sanitization
                  protocols at each visit.
                </div>
              )}
            </div>

            {/* FAQ Item 2 */}
            <div className="border rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(1)}>
                <h4 className="text-[16px] sm:text-lg font-semibold">How is the care plan developed?</h4>
                <span className="text-gray-500 text-xl">{openFaqIndex === 1 ? '✖' : '＋'}</span>
              </div>
              {openFaqIndex === 1 && (
                <div className="mt-4 text-[14px] sm:text-[15px] text-gray-700">
                  We see your wound in person and then create a care plan that is tailored to your needs (i.e., what
                  dressings to use, treatment frequency, next steps, etc.).
                </div>
              )}
            </div>

            {/* FAQ Item 3 */}
            <div className="border rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(2)}>
                <h4 className="text-[16px] sm:text-lg font-semibold">Do you offer any diagnostics?</h4>
                <span className="text-gray-500 text-xl">{openFaqIndex === 2 ? '✖' : '＋'}</span>
              </div>
              {openFaqIndex === 2 && (
                <div className="mt-4 text-[14px] sm:text-[15px] text-gray-700">
                  Yes, if necessary. We can{' '}
                  <Link
                    href="home-blood-sample-collection.html"
                    className="text-red-600"
                    title="Home Blood Sample Collection"
                  >
                    collect blood samples{' '}
                  </Link>{' '}
                  or even conduct tests at home to see if you have signs of infection or uncontrolled blood sugar.
                </div>
              )}
            </div>

            {/* FAQ Item 4 */}
            <div className="border rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(3)}>
                <h4 className="text-[16px] sm:text-lg font-semibold">What if I have diabetes?</h4>
                <span className="text-gray-500 text-xl">{openFaqIndex === 3 ? '✖' : '＋'}</span>
              </div>
              {openFaqIndex === 3 && (
                <div className="mt-4 text-[14px] sm:text-[15px] text-gray-700">
                  No problem. We consider that in your treatment and follow up as needed with your primary doctor to
                  assure a well-rounded care plan.
                </div>
              )}
            </div>

            {/* FAQ Item 5 */}
            <div className="border rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(4)}>
                <h4 className="text-[16px] sm:text-lg font-semibold">Can my caregiver be trained to help?</h4>
                <span className="text-gray-500 text-xl">{openFaqIndex === 4 ? '✖' : '＋'}</span>
              </div>
              {openFaqIndex === 4 && (
                <div className="mt-4 text-[14px] sm:text-[15px] text-gray-700">
                  For sure. We want to include and empower caregivers. Our team will provide hands-on training and
                  instruction.
                </div>
              )}
            </div>

            {/* FAQ Item 6 */}
            <div className="border rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(5)}>
                <h4 className="text-[16px] sm:text-lg font-semibold">How will I know if the wound is healing?</h4>
                <span className="text-gray-500 text-xl">{openFaqIndex === 5 ? '✖' : '＋'}</span>
              </div>
              {openFaqIndex === 5 && (
                <div className="mt-4 text-[14px] sm:text-[15px] text-gray-700">
                  We will monitor healing through photographs, notes, and measurements, and assure you (and your
                  caregiver) are kept in the loop.
                </div>
              )}
            </div>

            {/* FAQ Item 7 */}
            <div className="border rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(6)}>
                <h4 className="text-[16px] sm:text-lg font-semibold">Is this service expensive?</h4>
                <span className="text-gray-500 text-xl">{openFaqIndex === 6 ? '✖' : '＋'}</span>
              </div>
              {openFaqIndex === 6 && (
                <div className="mt-4 text-[14px] sm:text-[15px] text-gray-700">
                  In a lot of cases, it&apos;s less expensive than several clinic visits. You save on transportation and
                  avoid complications by providing consistent care. Pricing is always transparent.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section with Decorative Elements */}
      <section className="bg-[#fef1e7] h-[370px] min-h-[300px] sm:min-h-[380px] md:min-h-[400px]  lg:min-h-[370px] xl:min-h-[400px] py-6 pb-24 md:pb-10 flex md:items-center justify-center px-2 md:px-4 relative overflow-hidden">
        {/* Left Illustration */}
        <Image
          src="/assets/images/mobilab2u/home-healthcare-application.svg"
          alt="Access Healthcare Services Anytime With Mobile App Malaysia"
          title="Access Healthcare Services Anytime With Mobile App Malaysia"
          className="absolute left-0 bottom-0  max-h-24 max-h-[38%] md:max-h-[43%] lg:max-h-[60%] xl:max-h-[70%] object-contain z-10"
          width="392"
          height="280"
          loading="lazy"
        />

        {/* Right Illustration */}
        <Image
          src="/assets/images/mobilab2u/medicine-delivery.svg"
          alt="Fast Prescription Medicine Delivery Services In Malaysia"
          title="Fast Prescription Medicine Delivery Services In Malaysia"
          className="absolute right-0 bottom-0 max-h-24 max-h-[40%] md:max-h-[45%] lg:max-h-[62%] xl:max-h-[70%] object-contain z-10"
          width="308"
          height="280"
          loading="lazy"
        />

        {/* Center Content */}
        <div className="text-center max-w-3xl z-20 md:mt-0 ">
          <h3
            className="font-secondary text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-[1.3] md:leading-[1.3] lg:leading-[1.3] xl:leading-[1.3] font-semibold text-black splt-txt"
            data-splitting
            data-aos="fade-in"
          >
            Access Healthcare <br />
            Anytime, Anywhere <br />
            <em className="text-[#dc2626]">with MobiLab2u</em>
          </h3>

          <p className="mt-4 text-base md:text-lg text-gray-600">Try MobiLab2u today.</p>

          {/* Buttons */}
          <div className="mt-6 flex flex-row flex-wrap justify-center gap-2 md:gap-4">
            <Link
              href="/services"
              className="relative overflow-hidden bg-red-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-md font-semibold shadow group text-sm md:text-base"
            >
              Explore Services
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              <span className="absolute top-0 left-[-75%] w-[50%] h-full bg-white opacity-10 rotate-12 group-hover:animate-shine"></span>
            </Link>

            <Link
              href="tel:+60125412990"
              className="border border-gray-300 hover:border-black text-black px-4 py-2 md:px-6 md:py-3 rounded-md font-semibold bg-white shadow text-sm md:text-base"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>

        {/* Decorative SVG Star (replaces star1.svg) */}
        <div className="absolute left-[2%] top-[20%] md:left-[24%] lg:left-[27%] md:top-[40%] rotate-45 z-0">
          <svg width="48" height="54" viewBox="0 0 193 216" fill="none">
            <g clipPath="url(#clip0_26_34468)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M55.3 109.9C54.2 109.7 53.3 109.6 52.6 109.3C47.1 106.4 41.7 103.4 36.2 100.7C29.4667 97.4333 22.4333 95.1333 15.1 93.8C10.3 92.9 5.49999 91.9 0.899992 91C-0.200008 89.5 1.69999 88.3 0.699992 87C1.99999 86.1 3.19999 86.3 4.49999 86.5C6.69999 87 8.99999 87.5 11.2 88C15 88.8 18.8 89 22.6 88.7C28.9 88.2 35.2 87.7 41.5 86.9C46.1 86.3 50.6 85.2 54.8 83C56.8 82 58.9 81.4 60.9 80.4C62.3 79.6 63.6 78.6 65 77.8C70.6 74.7 75.8 71.1 80.4 66.5C86 61 90.3 54.4999 95 48.2999C100.3 41.1999 102.7 32.9 104.7 24.5C106.3 17.5 108.3 10.6 109 3.39995C109.1 2.49995 109.5 1.69995 109.8 0.799951C110.333 0.799951 110.867 0.766618 111.4 0.699951C111.5 0.999951 111.7 1.29995 111.7 1.49995C111.5 4.09995 111.2 6.69995 111.2 9.29995C111.2 14.9 111.3 20.5 111.3 26.1C111.3 32.5 111.4 38.9 111.4 45.4C111.3 51.5 112.4 57.3 114.8 62.9C115.3 64.1 115.7 65.4 115.9 66.7C116.5 70.5 118.3 73.7 120.9 76.5C123.1 78.8 125 81.2 127.2 83.5C129.9 86.5 133.3 88.6 136.8 90.4C139.8 91.9333 142.7 93.5666 145.5 95.3C149.3 97.6 153.5 98.9 157.8 100C161.7 100.9 165.7 101.8 169.6 102.9C173.7 104 177.8 104.3 181.9 104.7C185.2 105.1 188.5 105.5 192.3 105.9C191.7 106.5 191.4 107 191.2 107C183.4 107.2 175.5 107.3 167.8 107.7C163.5 108 159.3 108.6 155.2 109.4C150.3 110.3 145.4 111.4 140.7 112.7C135.5 114.1 130.4 115.9 125.4 117.7C120.5 119.4 116.5 122.5 112.5 125.9C109.2 128.9 107.6 133 105 136.4C101.4 141 99.7 146.6 98.2 152.2C95.7 161.7 93.2 171.3 91.1 180.9C89 190.7 87.4 200.6 86.7 210.6C86.6 211.8 86.1 212.9 85.7 214.1C85.5 214.4 85 214.7 84.7 214.9C83.8 214.2 83 213.5 82.3 212.8C81.3 212 81.1 210.9 81.2 209.7C81.4 202.8 81.8 195.9 82 189C82.1 183.9 82.4 178.7 82.1 173.6C81.7 167.5 80.9 161.4 79.9 155.4C79.3 151.7 78 148 76.9 144.4C75.6 139.8 73.4 135.6 71.7 131.3C70.7 128.7 68.9 126.5 68.1 123.9C67.9 123.5 67.4 123.3 67.1 123C66.8 122.7 66.4 122.5 66.2 122.2C64.7 118.2 60.9 116.2 58.6 112.8C58.4 112.5 57.8 112.4 57.4 112.2C56.4 111.6 55.2 111.2 55.3 109.9Z"
                fill="#100F12"
              />
            </g>
            <defs>
              <clipPath id="clip0_26_34468">
                <rect width="193" height="215" fill="white" transform="translate(0 0.5)" />
              </clipPath>
            </defs>
          </svg>
        </div>

        {/* Decorative SVG replacing star2.svg */}
        <div className="absolute right-4 top-[7rem] sm:right-[25%] md:right-[20%] lg:right-[26%] sm:top-[13rem] rotate-45 scale-100 opacity-100 z-0 w-10 h-10 sm:w-auto sm:h-auto">
          <svg width="42" height="42" viewBox="0 0 193 216" fill="none" className="w-full h-full">
            <g clipPath="url(#clip0_26_34468)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M55.3 109.9C54.2 109.7 53.3 109.6 52.6 109.3C47.1 106.4 41.7 103.4 36.2 100.7C29.4667 97.4333 22.4333 95.1333 15.1 93.8C10.3 92.9 5.49999 91.9 0.899992 91C-0.200008 89.5 1.69999 88.3 0.699992 87C1.99999 86.1 3.19999 86.3 4.49999 86.5C6.69999 87 8.99999 87.5 11.2 88C15 88.8 18.8 89 22.6 88.7C28.9 88.2 35.2 87.7 41.5 86.9C46.1 86.3 50.6 85.2 54.8 83C56.8 82 58.9 81.4 60.9 80.4C62.3 79.6 63.6 78.6 65 77.8C70.6 74.7 75.8 71.1 80.4 66.5C86 61 90.3 54.4999 95 48.2999C100.3 41.1999 102.7 32.9 104.7 24.5C106.3 17.5 108.3 10.6 109 3.39995C109.1 2.49995 109.5 1.69995 109.8 0.799951C110.333 0.799951 110.867 0.766618 111.4 0.699951C111.5 0.999951 111.7 1.29995 111.7 1.49995C111.5 4.09995 111.2 6.69995 111.2 9.29995C111.2 14.9 111.3 20.5 111.3 26.1C111.3 32.5 111.4 38.9 111.4 45.4C111.3 51.5 112.4 57.3 114.8 62.9C115.3 64.1 115.7 65.4 115.9 66.7C116.5 70.5 118.3 73.7 120.9 76.5C123.1 78.8 125 81.2 127.2 83.5C129.9 86.5 133.3 88.6 136.8 90.4C139.8 91.9333 142.7 93.5666 145.5 95.3C149.3 97.6 153.5 98.9 157.8 100C161.7 100.9 165.7 101.8 169.6 102.9C173.7 104 177.8 104.3 181.9 104.7C185.2 105.1 188.5 105.5 192.3 105.9C191.7 106.5 191.4 107 191.2 107C183.4 107.2 175.5 107.3 167.8 107.7C163.5 108 159.3 108.6 155.2 109.4C150.3 110.3 145.4 111.4 140.7 112.7C135.5 114.1 130.4 115.9 125.4 117.7C120.5 119.4 116.5 122.5 112.5 125.9C109.2 128.9 107.6 133 105 136.4C101.4 141 99.7 146.6 98.2 152.2C95.7 161.7 93.2 171.3 91.1 180.9C89 190.7 87.4 200.6 86.7 210.6C86.6 211.8 86.1 212.9 85.7 214.1C85.5 214.4 85 214.7 84.7 214.9C83.8 214.2 83 213.5 82.3 212.8C81.3 212 81.1 210.9 81.2 209.7C81.4 202.8 81.8 195.9 82 189C82.1 183.9 82.4 178.7 82.1 173.6C81.7 167.5 80.9 161.4 79.9 155.4C79.3 151.7 78 148 76.9 144.4C75.6 139.8 73.4 135.6 71.7 131.3C70.7 128.7 68.9 126.5 68.1 123.9C67.9 123.5 67.4 123.3 67.1 123C66.8 122.7 66.4 122.5 66.2 122.2C64.7 118.2 60.9 116.2 58.6 112.8C58.4 112.5 57.8 112.4 57.4 112.2C56.4 111.6 55.2 111.2 55.3 109.9Z"
                fill="#100F12"
              />
            </g>
            <defs>
              <clipPath id="clip0_26_34468">
                <rect width="193" height="215" fill="white" transform="translate(0 0.5)" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </section>

      {/* WhatsApp & Phone Fixed Buttons */}
      <div className="fixed right-1 sm:right-4 transform -translate-y-1/2 z-50 top-1/2 transform -translate-y-1/2 z-50">
        <Link href="https://wa.me/+60125412990?text=How we can help you?" target="_blank" rel="noopener noreferrer">
          <Image
            src="/assets/images/svg/whatsapp.gif"
            alt="Chat with us on WhatsApp"
            title="Chat with us"
            width={45}
            height={45}
            className="drop-shadow-md hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        </Link>

        <Link href="tel:+60125412990" target="_blank" rel="noopener noreferrer">
          <Image
            src="/assets/images/phone-icon.gif"
            alt="Call us"
            title="Call us"
            width={45}
            height={45}
            className="drop-shadow-md hover:scale-110 transition-transform duration-300 cursor-pointer mt-2 lg:hidden"
            loading="lazy"
            onClick={() => window.open('tel:+911234567890')}
          />
        </Link>
      </div>
    </main>
  )
}
