'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { initAOS, initSmoothScroll, initSplitting, initSwiper } from './animations'

export default function DoctorNurseHomeVisit() {
  const [openServiceIndex, setOpenServiceIndex] = useState<number | null>(null)
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0)

  useEffect(() => {
    initAOS()
    initSmoothScroll()
    initSplitting()
    initSwiper()
  }, [])

  const toggleService = (index: number) => {
    setOpenServiceIndex(openServiceIndex === index ? null : index)
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
            Book 24/7 Doctor & Nurses Home Visit Services in Malaysia
          </h1>

          <ul className="flex flex-wrap justify-center gap-0 text-sm text-black font-semibold mt-[24px]">
            <li className="flex items-center gap-1">
              <Image src="/assets/images/svg/home.svg" alt="Home Icon" width={16} height={16} className="w-4 h-4" />
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
            <li className="text-gray-500">Doctor & Nurse Home Visit</li>
          </ul>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-[url('/assets/images/bg/shape-06.webp')] bg-no-repeat bg-cover bg-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-8 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-left">
            <h2
              className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#1d1d1f] mb-6 splt-txt text-center lg:text-left"
              data-splitting
              data-aos="fade-in"
            >
              Top <em className="text-red-600">Home Visit Doctors & Nurses</em> at Your Doorstep in Malaysia
            </h2>
            <p className="text-[14px] sm:text-base text-gray-600 mb-[1.5rem] sm:mb-10 text-justify sm:text-left">
              Designed to deliver vital healthcare right to your doorstep, MobiLab2u provides dependable Doctor and
              Nurse Home Visit services all across Malaysia. Our licensed medical professionals make sure you get safe
              and customized care in the convenience of your house, whether you need a general check-up,
              <Link href="/home-chronic-wound-care" className="text-red-600" title="Chronic Wound Care Treatment">
                {' '}
                chronic disease management{' '}
              </Link>{' '}
              wound treatment, or post-hospitalization follow-up. For seniors, busy professionals, or anyone looking for
              excellent treatment without having to go to a clinic, our services fit their demands thanks to flexible
              scheduling and professional care.
            </p>

            <p className="text-[14px] sm:text-base text-gray-600 mb-[1.5rem] sm:mb-10 text-justify sm:text-left">
              The MobiLab2u app makes it simple to arrange a home visit. Simply choose your service, find a time
              appropriate for your schedule, and a qualified doctor or nurse will be on the way. To provide you and your
              family comfort and peace of mind, our team is taught to address a variety of medical needs.{' '}
              <Link href="/services" title="Contact Home Healthcare Services" className="text-red-600">
                Book your doctor & nurse home visit service
              </Link>{' '}
              and receive reliable home care whenever, wherever in Malaysia.
            </p>

            <p className="text-[14px] sm:text-base mt-4 mb-0">Expert patient-focused care through:</p>

            <ul className="space-y-2 mt-5">
              <li className="flex items-start gap-2">
                <span className="mt-1 min-w-4 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-[14px] sm:text-base font-semibold text-[#001e2b]">
                  Evaluation of physical health (vital sign assessment, etc.)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 min-w-4 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-[14px] sm:text-base font-semibold text-[#001e2b]">
                  Medical history examination, prescription, and management of chronic conditions
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 min-w-4 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-[14px] sm:text-base font-semibold text-[#001e2b]">
                  Wound care, including dressing and follow-up visits post-operatively
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 min-w-4 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-[14px] sm:text-base font-semibold text-[#001e2b]">
                  Mobility, nutrition, and general well-being
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 min-w-4 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-[14px] sm:text-base font-semibold text-[#001e2b]">
                  Approachable, qualified doctors and nurses are available to support
                </span>
              </li>
            </ul>
          </div>

          <div className="flex justify-center" data-aos="fade-right">
            <Image
              src="/assets/images/services/home-visit-doctors-nurses.webp"
              alt="Top Home Visit Doctors & Nurses At Your Doorstep In Malaysia"
              width={580}
              height={500}
              className="rounded-2xl w-full max-w-sm sm:max-w-md md:max-w-[580px] md:h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto py-12 px-4 overflow-hidden">
        <h3
          className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-6 sm:mb-12 text-center splt-txt"
          data-splitting
          data-aos="fade-in"
        >
          Doctor & Nurse Home Visit <em className="text-red-600">for Common Illnesses</em> in Malaysia
        </h3>

        <div className="bg-[#fef1e7] p-6 rounded-2xl shadow">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Service 1 */}
            <div>
              <div className="mt-4">
                <button
                  onClick={() => toggleService(0)}
                  className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                      <Image
                        src="/assets/images/svg/home-doctor-visit.svg"
                        alt=""
                        width={40}
                        height={40}
                        className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                      />
                    </div>
                    <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                      General Health Concerns
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${openServiceIndex === 0 ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {openServiceIndex === 0 && (
                  <div className="bg-white p-4 mt-2 rounded-2xl shadow text-sm text-gray-700">
                    <p className="text-gray-600 mb-5">
                      Comprehensive care for common illnesses and minor health issues.
                    </p>
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
                        Fever, cold, flu symptoms
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
                        Headaches, migraines
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
                        Stomach aches or food poisoning
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
                        Skin rashes or minor infections
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
                        Dehydration or fatigue
                      </li>
                    </ul>
                    <div className="mt-6">
                      <Link
                        href="/"
                        className="inline-block px-6 py-2 text-white bg-black rounded-md font-semibold hover:bg-red-600 transition"
                      >
                        Book now
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Service 2 */}
            <div>
              <div className="mt-4">
                <button
                  onClick={() => toggleService(1)}
                  className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                      <Image
                        src="/assets/images/svg/chronic-obstructive.svg"
                        alt=""
                        width={40}
                        height={40}
                        className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                      />
                    </div>
                    <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                      Chronic Disease Monitoring
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${openServiceIndex === 1 ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {openServiceIndex === 1 && (
                  <div className="bg-white p-4 mt-2 rounded-2xl shadow text-sm text-gray-700">
                    <p className="text-gray-600 mb-5">
                      Ongoing support to manage long-term health conditions effectively.
                    </p>
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
                        Diabetes care and glucose checks
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
                        Blood pressure and heart condition management
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
                        High cholesterol reviews
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
                        Asthma or COPD check-ins
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
                        Thyroid monitoring (Hypo/Hyperthyroidism)
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

            {/* Service 3 */}
            <div>
              <div className="mt-4">
                <button
                  onClick={() => toggleService(2)}
                  className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                      <Image
                        src="/assets/images/svg/pressure-ulcer-patient.svg"
                        alt=""
                        width={40}
                        height={40}
                        className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                      />
                    </div>
                    <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                      Post-Hospitalisation & Elderly Care
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${openServiceIndex === 2 ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {openServiceIndex === 2 && (
                  <div className="bg-white p-4 mt-2 rounded-2xl shadow text-sm text-gray-700">
                    <p className="text-gray-600 mb-5">
                      Assistance and monitoring to ensure safe recovery and daily living.
                    </p>
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
                        Medication setup and monitoring
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
                        Catheter or tube care
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
                        Monitoring post-surgery recovery
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
                        Early dementia or mobility support
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
                        Nutrition advice and safety assessments
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

            {/* Service 4 */}
            <div>
              <div className="mt-2">
                <button
                  onClick={() => toggleService(3)}
                  className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                      <Image
                        src="/assets/images/svg/wound-care.svg"
                        alt=""
                        width={40}
                        height={40}
                        className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                      />
                    </div>
                    <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                      Wound Care & Nursing Services
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${openServiceIndex === 3 ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {openServiceIndex === 3 && (
                  <div className="bg-white p-4 mt-2 rounded-2xl shadow text-sm text-gray-700">
                    <p className="text-gray-600 mb-4">
                      Professional care for wound management and medical procedures at home.
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
                        Wound cleaning and dressing changes
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
                        Bed sore care and prevention
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
                        Suture or staple removal
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
                        Injection or IV administration
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
                        Tube and stoma care
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

            {/* Service 5 */}
            <div>
              <div className="mt-2">
                <button
                  onClick={() => toggleService(4)}
                  className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                      <Image
                        src="/assets/images/svg/woman-care.svg"
                        alt=""
                        width={40}
                        height={40}
                        className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                      />
                    </div>
                    <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                      Women&apos;s Health
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${openServiceIndex === 4 ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {openServiceIndex === 4 && (
                  <div className="bg-white p-4 mt-2 rounded-2xl shadow text-sm text-gray-700">
                    <p className="text-gray-600 mb-4">
                      Support and guidance for all stages of a woman&apos;s health journey.
                    </p>
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
                        Prenatal and postnatal check-ins
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
                        Birth control consultations
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
                        Breastfeeding support
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
                        Menopause advice
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

            {/* Service 6 */}
            <div>
              <div className="mt-2">
                <button
                  onClick={() => toggleService(5)}
                  className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                      <Image
                        src="/assets/images/svg/children-care.svg"
                        alt=""
                        width={40}
                        height={40}
                        className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                      />
                    </div>
                    <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                      Children&apos;s Health (Non-Emergency)
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${openServiceIndex === 5 ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {openServiceIndex === 5 && (
                  <div className="bg-white p-4 mt-2 rounded-2xl shadow text-sm text-gray-700">
                    <p className="text-gray-600 mb-4">
                      Routine care and monitoring for children&apos;s growth and common illnesses.
                    </p>
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
                        Fever and common infections
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
                        Rashes and allergies
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
                        Vaccination support
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
                        Growth and development checkups
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
          </div>
        </div>
      </section>

      {/* How to Book Section */}
      <section className="relative py-8 px-4 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-5 text-center">
          How to <em className="text-red-600">Doctor or Nurse Home Visit</em> Book with MobiLab2u
        </h2>

        <p className="text-center mb-5">Our home visit process is simple, safe, and convenient:</p>

        <div className="relative flex flex-col lg:flex-row max-w-7xl mx-auto gap-6 lg:gap-10">
          <div className="w-full lg:w-1/2">
            <div className="lg:sticky lg:top-40 flex justify-center items-start">
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                <Image
                  src="/assets/images/services/nurse-home-visit-book-mobilab2u.svg"
                  alt="Doctor or Nurse Home Visit"
                  width={448}
                  height={299}
                  className="w-full h-auto object-contain"
                  data-aos="fade-right"
                />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2" data-aos="fade-up">
            {[
              {
                icon: 'nurse-visit.svg',
                title: 'Choose Your Service',
                description: 'Select "Doctor Visit" or "Nurse Visit" through our app or website.',
                step: '01',
              },
              {
                icon: 'date-time.svg',
                title: 'Pick a Date & Time',
                description: 'Choose a time slot that fits your schedule.',
                step: '02',
              },
              {
                icon: 'confirm-your-booking.svg',
                title: 'Confirm Your Booking',
                description: "Receive confirmation with the provider's name and credentials.",
                step: '03',
              },
              {
                icon: 'doorstep-doctor.svg',
                title: 'Get Care at Your Doorstep',
                description: 'Our healthcare professional arrives with all the tools needed.',
                step: '04',
              },
              {
                icon: 'personalized-treatment.svg',
                title: 'Receive Personalized Treatment',
                description: 'Our doctors and nurses give a full assessment and care based on your needs.',
                step: '05',
              },
              {
                icon: 'access-records.svg',
                title: 'Access Records & Follow-Up Easily',
                description:
                  'View your prescriptions and reports, and book follow-up visits in your MobiLab2u account.',
                step: '06',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative z-10 card bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-lg transition p-6 overflow-hidden mb-8"
              >
                <div className="flex items-start gap-5 relative z-10">
                  <Image
                    src={`/assets/images/svg/${item.icon}`}
                    alt="icon"
                    width={48}
                    height={48}
                    className="shrink-0 w-12 sm:w-12"
                  />
                  <div>
                    <h4 className="text-[16px] sm:text-xl font-semibold text-gray-900">{item.title}</h4>
                    <p className="mt-2 text-gray-600 text-[14px] sm:text-base text-justify sm:text-left">
                      {item.description}
                    </p>
                  </div>
                </div>
                <span className="absolute bottom-4 right-6 text-[5rem] font-bold text-gray-100 opacity-70 pointer-events-none leading-none z-0">
                  {item.step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Measures Section */}
      <section className="py-4 sm:py-12 overflow-hidden">
        <h3
          className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 sm:mb-12 mb-6 text-center splt-txt"
          data-splitting
          data-aos="fade-in"
        >
          Safety Measures<em className="text-red-600"> for Doctor & Nurse Home Visits </em> in Malaysia
        </h3>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up">
          <div className="bg-[#fef1e7] rounded-2xl p-6">
            <h4 className="text-base sm:text-xl font-semibold text-gray-800 mb-4">Licensed, Verified Professionals</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>MOH-registered doctors and nurses</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Identity verified before every visit</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Clinical oversight by our in-house medical team</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#fef1e7] rounded-2xl p-6">
            <h4 className="text-base sm:text-xl font-semibold text-gray-800 mb-4">Hygiene & Safety Protocols</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>PPE and sanitized equipment for every visit</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Temperature and health screening for all staff</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Strict adherence to the Ministry of Health safety guidelines</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#fef1e7] rounded-2xl p-6">
            <h4 className="text-base sm:text-xl font-semibold text-gray-800 mb-4">Integrated Medical Support</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Linked with our lab testing and teleconsultation team</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>On-the-spot prescriptions and follow-up planning</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Referral and specialist coordination if needed</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Who Needs Section */}
      <section className="py-4 sm:py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-[7rem] px-4">
          <div className="flex-1" data-aos="fade-right">
            <h3
              className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 sm:mb-12 mb-6 text-center splt-txt"
              data-splitting
              data-aos="fade-in"
            >
              Who Needs <em className="text-red-600"> Doctor or Nurse Home Visit Services </em> In Malaysia?
            </h3>
            <p className="mb-6 max-w-md">Our home visit service is ideal for:</p>

            <div className="bg-[#fef1e7] border border-gray-200 rounded-lg p-6">
              <ul className="space-y-4">
                {[
                  'Elderly individuals who struggle with travel to a hospital or clinic',
                  'Patients recovering from surgery or recent hospital discharge',
                  'People handling illnesses including asthma, high blood pressure, or diabetes',
                  'Any person requiring routine care like tube checks, injections, or wound cleaning',
                  'Busy employees searching for quick and simple medical care at home',
                  'Parents with little children who need mild disease care or checkups',
                  'Those displaying first indications of memory loss or having mobility issues',
                  'Anybody who wants personalized, private attention in their own home',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    </div>
                    <p className="text-[14px] sm:text-base text-gray-700">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex-1 w-full" data-aos="fade-left">
            <Image
              src="/assets/images/services/benefits-doctor-nurse-home-visit-services.webp"
              alt="Healthcare illustration"
              width={500}
              height={600}
              className="max-w-full rounded-2xl object-cover shadow-lg mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Why MobiLab2u Section */}
      <section className="bg-[#fef1e7] py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <h3
            className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 text-center splt-txt"
            data-splitting
            data-aos="fade-in"
          >
            Why MobiLab2u For <em className="text-red-600">Doctors & Nurses At Home </em> in Malaysia?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up">
            <div className="bg-white p-6 sm:p-[2.5rem] rounded-2xl shadow-sm">
              <Image
                src="/assets/images/svg/qualified-doctors.svg"
                alt=""
                width={48}
                height={48}
                className="w-12 h-12 mb-[1.5rem] filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
              />
              <h4 className="text-[16px] sm:text-xl font-semibold text-black mb-2">Trusted Medical Professionals</h4>
              <p className="text-gray-600">
                All doctors and nurses are licensed, experienced, and registered with the Ministry of Health in
                Malaysia.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-[2.5rem] rounded-2xl shadow-sm">
              <Image
                src="/assets/images/svg/booking-flexible.svg"
                alt=""
                width={48}
                height={48}
                className="w-12 h-12 mb-[1.5rem] filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
              />
              <h4 className="text-[16px] sm:text-xl font-semibold text-black mb-2">
                Convenient Booking & Flexible Hours
              </h4>
              <p className="text-gray-600">
                No waiting rooms or travel needed. Pick your time through our app or website, and we&apos;ll bring care
                to your doorstep.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-[2.5rem] rounded-2xl shadow-sm">
              <Image
                src="/assets/images/svg/safe-private.svg"
                alt=""
                width={48}
                height={48}
                className="w-12 h-12 mb-[1.5rem] filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
              />
              <h4 className="text-[16px] sm:text-xl font-semibold text-black mb-2">Private, Safe & Respectful</h4>
              <p className="text-gray-600">
                Receive quality care in your own space with complete attention to your safety, comfort, and personal
                privacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Areas Section */}
      <section className="py-8 md:py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h3 className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#0d1623] mb-8 sm:mb-12">
            Service Areas for <em className="text-red-600"> Doctor & Nurse Home </em> Visits
          </h3>

          <div className="flex flex-wrap justify-center gap-4" data-aos="fade-up">
            {[
              'Johor Bahru',
              'Kuala Lumpur',
              'Klang Valley',
              'Penang (island and mainland)',
              'Melaka',
              'Negeri Sembilan',
              'Perak',
            ].map((area, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-2 py-2 pl-6 pr-6 border border-gray-300 rounded-full hover:shadow transition"
              >
                <Image src="/assets/images/svg/location.svg" alt={area} width={24} height={24} className="w-6 h-6" />
                <span className="text-sm font-medium text-[#0d1623]">{area}</span>
              </div>
            ))}
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
            Book Home <em className="text-red-600">Visit with a Doctor or Nurse</em> Today With MobiLab2u
          </h3>

          <p className="text-sm md:text-lg text-gray-600 mb-10">
            You don&apos;t need to leave home to receive high-quality medical care. Let a certified doctor or nurse come
            to you, wherever you are in Malaysia. Book now for safe, personalized, and professional care.
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
            FAQs on Our <em className="text-red-600"> Doctor & Nurse Home Visit </em> Services In Malaysia
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4" data-aos="fade-right">
          <div className="col-span-12 space-y-6">
            {[
              {
                question: 'How do I arrange a doctor or nurse home visit?',
                answer: 'Just book through our MobiLab2u app or website by choosing the service, date, and time.',
              },
              {
                question: 'What kind of issues can be treated in a home visit?',
                answer:
                  'We handle a wide range of general health concerns, chronic conditions, post-surgery care, and elderly care needs during home visits.',
              },
              {
                question: 'Is it safe to have medical treatment at my home?',
                answer: 'Yes. Our professionals maintain rigorous safety and hygiene protocols.',
              },
              {
                question: 'Will I be prescribed or referred to at a home visit?',
                answer: 'Yes. Prescribing and referring are allowed during a home visit by doctors.',
              },
              {
                question: 'Are your healthcare professionals registered in Malaysia?',
                answer: 'Completely. All of our professionals are fully validated and licensed by the MOH.',
              },
              {
                question: 'Can I schedule a visit for a family member?',
                answer: 'Yes, you may book visits on behalf of a relative, parent, or child.',
              },
              {
                question: 'Is the service available on weekends or holidays?',
                answer: 'We are available Monday through Saturday, with flexible scheduling every day of the week.',
              },
              {
                question: 'What happens during a typical home visit?',
                answer:
                  'It might include an evaluation, a check of your vital signs, treatment, or follow-up guidance depending on your needs.',
              },
              {
                question: 'Will I receive a medical report or summary after I visit?',
                answer: 'Yes, all information will be stored securely in your MobiLab2u account.',
              },
              {
                question: 'Is the service offered in my city?',
                answer:
                  'We are currently active in KL, Klang Valley, Penang, Johor Bahru, Melaka, Negeri Sembilan, and Perak.',
              },
            ].map((faq, index) => (
              <div key={index} className="border rounded-lg shadow-sm p-4 sm:p-6">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(index)}>
                  <h4 className="text-[16px] sm:text-lg font-semibold">{faq.question}</h4>
                  <span className="text-gray-500 text-xl">{openFaqIndex === index ? '✖' : '＋'}</span>
                </div>
                {openFaqIndex === index && (
                  <div className="mt-4 text-[14px] sm:text-[15px] text-gray-700">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-[#fef1e7] h-[370px] min-h-[300px] sm:min-h-[380px] md:min-h-[400px] lg:min-h-[370px] xl:min-h-[400px] py-6 pb-24 md:pb-10 flex md:items-center justify-center px-2 md:px-4 relative overflow-hidden">
        <Image
          src="/assets/images/mobilab2u/home-healthcare-application.svg"
          alt="Access Healthcare Services Anytime With Mobile App Malaysia"
          title="Access Healthcare Services Anytime With Mobile App Malaysia"
          width={392}
          height={280}
          className="absolute left-0 bottom-0 max-h-24 max-h-[38%] md:max-h-[43%] lg:max-h-[60%] xl:max-h-[70%] object-contain z-10"
        />

        <Image
          src="/assets/images/mobilab2u/medicine-delivery.svg"
          alt="Fast Prescription Medicine Delivery Services In Malaysia"
          title="Fast Prescription Medicine Delivery Services In Malaysia"
          width={308}
          height={280}
          className="absolute right-0 bottom-0 max-h-24 max-h-[40%] md:max-h-[45%] lg:max-h-[62%] xl:max-h-[70%] object-contain z-10"
        />

        <div className="text-center max-w-3xl z-20 md:mt-0">
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

          <div className="mt-6 flex flex-row flex-wrap justify-center gap-2 md:gap-4">
            <Link
              href="/services"
              className="relative overflow-hidden bg-red-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-md font-semibold shadow group text-sm md:text-base"
            >
              Explore Services
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              <span className="absolute top-0 left-[-75%] w-[50%] h-full bg-white opacity-10 rotate-12 group-hover:animate-shine"></span>
            </Link>

            <a
              href="tel:+60125412990"
              className="border border-gray-300 hover:border-black text-black px-4 py-2 md:px-6 md:py-3 rounded-md font-semibold bg-white shadow text-sm md:text-base"
            >
              Talk to an Expert
            </a>
          </div>
        </div>

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
        <a href="https://wa.me/+60125412990?text=How we can help you?" target="_blank" rel="noopener noreferrer">
          <Image
            src="/assets/images/svg/whatsapp.gif"
            alt="WhatsApp"
            title="Chat with us"
            width={45}
            height={45}
            className="w-[45px] h-[45px] drop-shadow-md hover:scale-110 transition-transform duration-300"
          />
        </a>

        <a href="tel:+60125412990" target="_blank" rel="noopener noreferrer">
          <Image
            src="/assets/images/phone-icon.gif"
            alt="phone"
            title="Chat with us"
            width={45}
            height={45}
            className="w-[45px] h-[45px] drop-shadow-md hover:scale-110 transition-transform duration-300 lg:hidden mt-2"
          />
        </a>
      </div>
    </main>
  )
}
