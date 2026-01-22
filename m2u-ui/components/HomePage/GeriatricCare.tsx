'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { initAOS, initSmoothScroll, initSplitting, initSwiper } from './animations'

export default function GeriatricCare() {
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
          <h1 className="text-[19px] md:text-3xl font-bold text-black mb-2">
            Geriatric Support for Seniors at Home in Malaysia
          </h1>

          <ul className="flex flex-wrap justify-center gap-0 text-sm text-black font-semibold mt-[24px]">
            <li className="flex items-center gap-1">
              <Image src="/assets/images/svg/home.svg" alt="" width={16} height={16} className="w-4 h-4" />
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
              <span className="ml-[5px]">›</span>
              <i className="flaticon flaticon-next inline-block relative top-[2.5px] mx-[5px]"></i>
            </li>
            <li className="text-gray-500">Geriatric Support</li>
          </ul>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-[url('/assets/images/bg/shape-06.webp')] bg-no-repeat bg-cover bg-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-8 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <h2
              className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#1d1d1f] mb-6 splt-txt text-center lg:text-left"
              data-splitting
              data-aos="fade-in"
            >
              Elderly Care <em className="text-red-600"> at Home with </em> Trained Caretakers in Malaysia
            </h2>
            <p className="text-[14px] sm:text-base text-gray-600 mb-[1.5rem] sm:mb-10 text-justify sm:text-left">
              MobiLab2u is committed to improving the lives of Malaysian elderly citizens by providing the finest
              package of{' '}
              <Link href="/home-nursing-care-services" className="text-red-600" title="Home Care Services">
                home care services.
              </Link>{' '}
              We acknowledge that the medical requirements of individuals change with age, with increased necessity for
              monitoring and expert attention. Our goal is to provide friendly, professional health care right at your
              doorstep to make it as easy and hassle-free as possible for elderly people and their carers.
            </p>

            <p className="text-[14px] sm:text-base text-gray-600 mb-[1.5rem] sm:mb-10 text-justify sm:text-left">
              Our services include routine health checkups to medication management, addressing individual needs so that
              elderly can remain comfortable and dignified at home. Our ethos is built on trust and respect,
              prioritizing one need per visit.{' '}
              <Link
                href="/contact-home-healthcare-services"
                className="text-red-600"
                title="Contact Home Healthcare Services"
              >
                {' '}
                Home Geriatric Visit Booking{' '}
              </Link>{' '}
              is easy online or by phone with MobiLab2u, with minimal delay. Each service is provided with care, safely,
              and at an affordable rate, maintaining independence while delivering necessary care.
            </p>

            <p className="text-[14px] sm:text-base mt-4 mb-0">Enjoy the comfort of our service, made for seniors:</p>

            <ul className="space-y-2 mt-5">
              <li className="flex items-start gap-2">
                <span className="mt-1 min-w-4 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-[14px] sm:text-base font-semibold text-[#001e2b]">
                  Personalised medical care for the elderly needs
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 min-w-4 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-[14px] sm:text-base font-semibold text-[#001e2b]">
                  Experienced, compassionate geriatric doctors
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 min-w-4 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-[14px] sm:text-base font-semibold text-[#001e2b]">
                  Comfort and privacy with home-based services
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 min-w-4 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-[14px] sm:text-base font-semibold text-[#001e2b]">
                  All-in-one support, from diagnosis to medication
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 min-w-4 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-[14px] sm:text-base font-semibold text-[#001e2b]">
                  Elderly health is prioritized with a service that is not only dependable but also respectful
                </span>
              </li>
            </ul>
          </div>

          <div className="flex justify-center" data-aos="fade-left">
            <Image
              src="/assets/images/services/elderly-care-home-trained-caretakers-malaysia.webp"
              alt="Receive personalized elderly care at home in Malaysia with trained caretakers for safety, & support"
              title="Elderly Care At Home With Trained Caretakers In Malaysia"
              width={592}
              height={540}
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto py-8 md:py-12 px-4 overflow-hidden">
        <h3
          className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-12 text-center splt-txt"
          data-splitting
          data-aos="fade-in"
        >
          At-Home <em className="text-red-600"> Healthcare Services </em> For Seniors In Malaysia
        </h3>

        <div className="bg-[#fef1e7] p-6 rounded-2xl shadow">
          <div className="grid md:grid-cols-2 gap-6" data-aos="fade-up">
            {/* Service 1 */}
            <div>
              <button
                onClick={() => toggleService(0)}
                className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                    <Image
                      src="/assets/images/svg/geriatric-health.svg"
                      alt="Geriatric Health Screening Services At Home In Malaysia"
                      title="Geriatric Health Screening Services At Home In Malaysia"
                      width={40}
                      height={40}
                      className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                    />
                  </div>
                  <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                    Geriatric Health Screening
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
                    Personalized lab panels are designed to detect and manage common age-related illnesses.
                  </p>

                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Full Blood Count (FBC)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Lipid Profile (Cholesterol & Triglycerides)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Liver Function Test (LFT)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Kidney Function Test (KFT)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Electrolytes (Sodium, Potassium, Chloride)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Thyroid Stimulating Hormone (TSH)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Tumor Markers (PSA, CA 15-3)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Urinalysis for infection or kidney disease
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      ECG referrals for heart rhythm monitoring
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

            {/* Service 2 */}
            <div>
              <button
                onClick={() => toggleService(1)}
                className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                    <Image
                      src="/assets/images/svg/door-step-delivery.svg"
                      alt="Elderly Patient Medicines Home Delivery in Malaysia"
                      title="Elderly Patient Medicines Home Delivery in Malaysia"
                      width={40}
                      height={40}
                      className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                    />
                  </div>
                  <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                    Medication Delivery & Management
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
                    Effortless access to long-term medications, managed with professional oversight.
                  </p>

                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Doorstep delivery of prescribed medications
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Cold-chain logistics for temperature-sensitive drugs
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Strict pharmacist review and approval
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Timely reminders for repeat prescriptions
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Identity and consent verification at delivery
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

            {/* Service 3 */}
            <div>
              <button
                onClick={() => toggleService(2)}
                className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                    <Image
                      src="/assets/images/svg/chronic.svg"
                      alt="Chronic Disease Monitoring For Seniors At Home, Malaysia"
                      title="Chronic Disease Monitoring For Seniors At Home, Malaysia"
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
                    Integrated support for those managing multiple chronic conditions at home.
                  </p>

                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Diabetes monitoring (Glucose, HbA1c, insulin profile)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Blood pressure tracking & hypertension care
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Lipid and cardiac health checks
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Thyroid panel (TSH, T3, T4)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Renal profile for CKD management
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Anaemia and nutrition-related diagnostics
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

            {/* Service 4 */}
            <div>
              <button
                onClick={() => toggleService(3)}
                className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                    <Image
                      src="/assets/images/svg/wellness-care.svg"
                      alt="Preventive And Wellness Care Services At Home, Malaysia"
                      title="Preventive And Wellness Care Services At Home, Malaysia"
                      width={40}
                      height={40}
                      className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                    />
                  </div>
                  <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                    Preventive & Wellness Care
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
                    Stay ahead of illness with proactive testing and tailored wellness evaluations.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Vitamin D and B12 screening
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Bone density (DEXA scan referrals available)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Arthritis and inflammation screening
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Frailty risk evaluation and fall prevention
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Sleep quality and cognitive function assessments
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Immunity checks (CRP, ESR, Ferritin)
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

            {/* Service 5 */}
            <div>
              <button
                onClick={() => toggleService(4)}
                className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                    <Image
                      src="/assets/images/svg/post-hospitalisation.svg"
                      alt="Post Hospitalisation Support Services At Home, Malaysia"
                      title="Post Hospitalisation Support Services At Home, Malaysia"
                      width={40}
                      height={40}
                      className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                    />
                  </div>
                  <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                    Post-Hospitalisation Support
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
                    For seniors recently discharged from surgery or hospital admission.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Wound inspection and dressing changes
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Medication reconciliation and counselling
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Vital monitoring and follow-up testing
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Readmission prevention planning
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

            {/* Service 6 */}
            <div>
              <button
                onClick={() => toggleService(5)}
                className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                    <Image
                      src="/assets/images/svg/mental-health.svg"
                      alt="Cognitive And Mental Health Screening At Home, Malaysia"
                      title="Cognitive And Mental Health Screening At Home, Malaysia"
                      width={40}
                      height={40}
                      className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                    />
                  </div>
                  <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                    Cognitive & Mental Health Screening
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
                  <p className="text-gray-600 mb-4">Early detection tools for memory, mood, and neurological health.</p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Dementia and memory screening
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Depression and anxiety assessments
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Neurological health questionnaires
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Coordination with geriatric psychiatrists if required
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

            {/* Service 7 */}
            <div>
              <button
                onClick={() => toggleService(6)}
                className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                    <Image
                      src="/assets/images/svg/old-people.svg"
                      alt="Nutritional & Functional Assessments For Seniors At Home"
                      title="Nutritional & Functional Assessments For Seniors At Home"
                      width={40}
                      height={40}
                      className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                    />
                  </div>
                  <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                    Nutritional & Functional Assessments
                  </span>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${openServiceIndex === 6 ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openServiceIndex === 6 && (
                <div className="bg-white p-4 mt-2 rounded-2xl shadow text-sm text-gray-700">
                  <p className="text-gray-600 mb-4">Supporting strength, independence, and longevity at home.</p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Diet analysis and malnutrition screening
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Sarcopenia and muscle strength evaluations
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Physical mobility assessments (via physiotherapy partners)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Oral health referrals when needed
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
      </section>

      {/* How It Works Section */}
      <section className="relative py-8 px-4 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-5 text-center">
          How Our At-Home <em className="text-red-600"> Geriatric Support </em> Works?
        </h2>

        <div className="relative flex flex-col lg:flex-row max-w-7xl mx-auto gap-6 lg:gap-10">
          {/* Left Image Section */}
          <div className="w-full lg:w-1/2">
            <div className="lg:sticky lg:top-40 flex justify-center items-start">
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                <Image
                  src="/assets/images/services/home-geriatric-support-works.svg"
                  alt="Professional at-home care services for seniors to maintain health, independence, across Malaysia"
                  title="At-home Geriatric Support Services For Seniors In Malaysia"
                  width={512}
                  height={341}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Cards Section */}
          <div className="w-full lg:w-1/2">
            {/* Card 1 */}
            <div className="relative z-10 card bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-lg transition p-6 overflow-hidden mb-8">
              <div className="flex items-start gap-5 relative z-10">
                <Image
                  src="/assets/images/svg/home-visits.svg"
                  alt="Schedule Home Visits For Elderly Care & Services, Malaysia"
                  title="Schedule Home Visits For Elderly Care & Services, Malaysia"
                  width={56}
                  height={56}
                  className="shrink-0 w-12 sm:w-12"
                />
                <div>
                  <h3 className="text-[16px] sm:text-xl font-semibold text-gray-900">Schedule a Home Visit</h3>
                  <p className="mt-2 text-gray-600 text-[14px] sm:text-base text-justify sm:text-left">
                    Book your preferred service online or by phone, with flexible timing to suit seniors&apos; routines.
                  </p>
                </div>
              </div>
              <span className="absolute bottom-4 right-6 text-[5rem] font-bold text-gray-100 opacity-70 pointer-events-none leading-none z-0">
                01
              </span>
            </div>

            {/* Card 2 */}
            <div className="relative z-10 card bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-lg transition p-6 overflow-hidden mb-8">
              <div className="flex items-start gap-5 relative z-10">
                <Image
                  src="/assets/images/svg/health-guidelines.svg"
                  alt="Receive Pre-visit Instructions From Home in Malaysia"
                  title="Receive Pre-visit Instructions From Home in Malaysia"
                  width={56}
                  height={56}
                  className="shrink-0 w-16 sm:w-14"
                />
                <div>
                  <h3 className="text-[16px] sm:text-xl font-semibold text-gray-900">Receive Pre-Visit Instructions</h3>
                  <p className="mt-2 text-gray-600 text-[14px] sm:text-base text-justify sm:text-left">
                    Clear guidance is provided ahead of time, such as fasting or medication reminders, if clinically
                    required.
                  </p>
                </div>
              </div>
              <span className="absolute bottom-4 right-6 text-[5rem] font-bold text-gray-100 opacity-70 pointer-events-none leading-none z-0">
                02
              </span>
            </div>

            {/* Card 3 */}
            <div className="relative z-10 card bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-lg transition p-6 overflow-hidden mb-8">
              <div className="flex items-start gap-5 relative z-10">
                <Image
                  src="/assets/images/svg/clinician-home-visit.svg"
                  alt="Clinician Home Visits For Seniors Care Across Malaysia"
                  title="Clinician Home Visits For Seniors Care Across Malaysia"
                  width={56}
                  height={56}
                  className="shrink-0 w-16 sm:w-14"
                />
                <div>
                  <h3 className="text-[16px] sm:text-xl font-semibold text-gray-900">Clinician Home Visit</h3>
                  <p className="mt-2 text-gray-600 text-[14px] sm:text-base text-justify sm:text-left">
                    A licensed medical professional arrives on time, confirms identity, and performs care with full
                    clinical hygiene.
                  </p>
                </div>
              </div>
              <span className="absolute bottom-4 right-6 text-[5rem] font-bold text-gray-100 opacity-70 pointer-events-none leading-none z-0">
                03
              </span>
            </div>

            {/* Card 4 */}
            <div className="relative z-10 card bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-lg transition p-6 overflow-hidden mb-8">
              <div className="flex items-start gap-5 relative z-10">
                <Image
                  src="/assets/images/svg/blood-test-collection.svg"
                  alt="Secure Home Sample Collection And Reports Handling Malaysia"
                  title="Secure Home Sample Collection And Reports Handling Malaysia"
                  width={56}
                  height={56}
                  className="shrink-0 w-16 sm:w-14"
                />
                <div>
                  <h3 className="text-[16px] sm:text-xl font-semibold text-gray-900">Secure Sample & Data Handling</h3>
                  <p className="mt-2 text-gray-600 text-[14px] sm:text-base text-justify sm:text-left">
                    If tests are involved, samples are safely packed and tracked; all personal data is encrypted and
                    PDPA-compliant.
                  </p>
                </div>
              </div>
              <span className="absolute bottom-4 right-6 text-[5rem] font-bold text-gray-100 opacity-70 pointer-events-none leading-none z-0">
                04
              </span>
            </div>

            {/* Card 5 */}
            <div className="relative z-10 card bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-lg transition p-6 overflow-hidden mb-8">
              <div className="flex items-start gap-5 relative z-10">
                <Image
                  src="/assets/images/svg/follow-up.svg"
                  alt="Results & Follow-up For At-home Geriatric Care, Malaysia"
                  title="Results & Follow-up For At-home Geriatric Care, Malaysia"
                  width={56}
                  height={56}
                  className="shrink-0 w-16 sm:w-14"
                />
                <div>
                  <h3 className="text-[16px] sm:text-xl font-semibold text-gray-900">Results & Follow-Up</h3>
                  <p className="mt-2 text-gray-600 text-[14px] sm:text-base text-justify sm:text-left">
                    Test results or care updates are shared digitally within 24–48 hours, with follow-up support if
                    needed.
                  </p>
                </div>
              </div>
              <span className="absolute bottom-4 right-6 text-[5rem] font-bold text-gray-100 opacity-70 pointer-events-none leading-none z-0">
                05
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Clinical Integrity Section */}
      <section className="py-4 sm:py-12 overflow-hidden">
        <h3
          className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-6 sm:mb-12 text-center splt-txt"
          data-splitting
          data-aos="fade-in"
        >
          Our Commitment to<em className="text-red-600"> Safety & Clinical </em> Integrity
        </h3>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up">
          {/* Card 1 */}
          <div className="bg-[#fef1e7] rounded-2xl p-6">
            <h4 className="text-[16px] sm:text-xl font-semibold text-gray-900">
              Clinical Oversight & Professional Standards
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Services performed by licensed healthcare providers</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Adheres to MMC and Ministry of Health guidelines</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Supervised diagnostics and medication management</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Continuous clinical review for quality assurance</span>
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="bg-[#fef1e7] rounded-2xl p-6">
            <h4 className="text-[16px] sm:text-xl font-semibold text-gray-900">Safe In-Home Service Delivery</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Sterile, single-use equipment for every procedure</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Patient ID and digital consent verified onsite</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Strict infection control and hygiene protocols</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Trained professionals equipped for home environments</span>
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-[#fef1e7] rounded-2xl p-6">
            <h4 className="text-[16px] sm:text-xl font-semibold text-gray-900">Data Privacy & Secure Communication</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Patient data is encrypted and securely stored</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Compliance with PDPA 2010 standards</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Secure platforms are used for test results and updates</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Routine audits to maintain system integrity</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Who Benefits Section */}
      <section className="py-8 sm:py-16 overflow-hidden">
        <div
          className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-[2rem] px-4"
          data-aos="fade-up"
        >
          {/* Left Content */}
          <div className="flex-1">
            <h3
              className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-6 sm:mb-12 text-center splt-txt"
              data-splitting
              data-aos="fade-in"
            >
              Who Benefits From <em className="text-red-600"> Our Geriatric Support </em> Services in Malaysia?
            </h3>

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
                    Elderly with connectivity disadvantage, single older, or a limited mobility situation
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
                  <p className="text-[14px] sm:text-base text-gray-700">
                    Elderly patients who are bedridden or post-surgery/rehab
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
                  <p className="text-[14px] sm:text-base text-gray-700">
                    The elderly with chronic age-related conditions
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
                  <p className="text-[14px] sm:text-base text-gray-700">
                    Family caregivers of at-risk elderly in home care
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
                  <p className="text-[14px] sm:text-base text-gray-700">
                    Elderly patients with dementia or cognitive decline
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
                  <p className="text-[14px] sm:text-base text-gray-700">
                    Elderly residing in assisted living or retirement homes
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
                  <p className="text-[14px] sm:text-base text-gray-700">
                    The elderly with transportation or mobility challenges
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  </div>
                  <p className="text-[14px] sm:text-base text-gray-700">
                    Geriatric patients requiring regular medication
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
                  <p className="text-[14px] sm:text-base text-gray-700">
                    Ageing individuals undergoing routine screenings
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
                  <p className="text-[14px] sm:text-base text-gray-700">Telehealth providers coordinating elder care</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 w-full">
            <Image
              src="/assets/images/services/geriatric-support-services-malaysia.webp"
              alt="Older adults and their families receive at-home geriatric care in Malaysia for safety and well-being"
              title="Seniors & Families Benefiting From Geriatric Support Malaysia"
              width={500}
              height={600}
              className="md:max-w-[500px] object-cover shadow-lg mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Why Trust MobiLab2u Section */}
      <section className="bg-[#fef1e7] py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6" data-aos="fade-up">
          <h3
            className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 text-center splt-txt"
            data-splitting
            data-aos="fade-in"
          >
            Why Trust <em className="text-red-600">MobiLab2u</em> for Geriatric Care in Malaysia?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-6 sm:p-[2.5rem] rounded-2xl shadow-sm">
              <Image
                src="/assets/images/svg/experienced-staff.svg"
                alt="Licensed & Experienced Staff For Senior Care In Malaysia"
                title="Licensed & Experienced Staff For Senior Care In Malaysia"
                width={48}
                height={48}
                className="w-12 h-12 mb-[1.5rem] filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
              />
              <h4 className="text-[16px] sm:text-xl font-semibold text-black mb-2">Licensed & Experienced Staff</h4>
              <p className="text-[14px] text-justify sm:text-base sm:text-left">
                Registered Nurses (RNs), Licensed Practical Nurses (LPNs), and doctors. All hold an annual practicing
                certificate from MOH Malaysia. They have applied training and experience in geriatric care so as to be
                gentle and professional.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 sm:p-[2.5rem] rounded-2xl shadow-sm">
              <Image
                src="/assets/images/svg/lab-testing.svg"
                alt="Secure Sample Handling And Lab Testing Services, Malaysia"
                title="Secure Sample Handling And Lab Testing Services, Malaysia"
                width={48}
                height={48}
                className="w-12 h-12 mb-[1.5rem] filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
              />
              <h4 className="text-[16px] sm:text-xl font-semibold text-black mb-2">
                Secure Sample Handling & Logistics
              </h4>
              <p className="text-[14px] text-justify sm:text-base sm:text-left">
                Every step from collection to lab testing is temperature-controlled, sealed, and monitored in real time.
                This keeps the samples intact and returns reliable results.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 sm:p-[2.5rem] rounded-2xl shadow-sm">
              <Image
                src="/assets/images/svg/coverage.svg"
                alt="Nationwide Geriatric Support Services Across Malaysia"
                title="Nationwide Geriatric Support Services Across Malaysia"
                width={48}
                height={48}
                className="w-12 h-12 mb-[1.5rem] filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
              />
              <h4 className="text-[16px] sm:text-xl font-semibold text-black mb-2">National Coverage</h4>
              <p className="text-[14px] text-justify sm:text-base sm:text-left">
                We service all major cities in Malaysia with expanded coverage, so we can better serve communities and
                provide much-needed supportive services to seniors wherever they are.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Areas Section */}
      <section className="py-8 md:py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center px-4" data-aos="fade-up">
          <h3 className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#0d1623] mb-8 sm:mb-12">
            Areas We Cover for <em className="text-red-600"> Quality Healthcare Services </em>in Malaysia
          </h3>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-3 px-2 py-2 pl-6 pr-6 border border-gray-300 rounded-full hover:shadow transition">
              <Image
                src="/assets/images/svg/location.svg"
                alt=""
                width={24}
                height={24}
                className="md:w-6 md:h-6 w-3 h-3"
              />
              <span className="md:text-sm text-[12px] font-medium text-[#0d1623]">Selangor</span>
            </div>

            <div className="flex items-center gap-3 px-2 py-2 pl-6 pr-6 border border-gray-300 rounded-full hover:shadow transition">
              <Image
                src="/assets/images/svg/location.svg"
                alt=""
                width={24}
                height={24}
                className="md:w-6 md:h-6 w-3 h-3"
              />
              <span className="md:text-sm text-[12px] font-medium text-[#0d1623]">Kuala Lumpur</span>
            </div>

            <div className="flex items-center gap-3 px-2 py-2 pl-6 pr-6 border border-gray-300 rounded-full hover:shadow transition">
              <Image
                src="/assets/images/svg/location.svg"
                alt=""
                width={24}
                height={24}
                className="md:w-6 md:h-6 w-3 h-3"
              />
              <span className="md:text-sm text-[12px] font-medium text-[#0d1623]">Johor Bahru</span>
            </div>

            <div className="flex items-center gap-3 px-2 py-2 pl-6 pr-6 border border-gray-300 rounded-full hover:shadow transition">
              <Image
                src="/assets/images/svg/location.svg"
                alt=""
                width={24}
                height={24}
                className="md:w-6 md:h-6 w-3 h-3"
              />
              <span className="md:text-sm text-[12px] font-medium text-[#0d1623]">Penang</span>
            </div>

            <div className="flex items-center gap-3 px-2 py-2 pl-6 pr-6 border border-gray-300 rounded-full hover:shadow transition">
              <Image
                src="/assets/images/svg/location.svg"
                alt=""
                width={24}
                height={24}
                className="md:w-6 md:h-6 w-3 h-3"
              />
              <span className="md:text-sm text-[12px] font-medium text-[#0d1623]">Perak</span>
            </div>

            <div className="flex items-center gap-3 px-2 py-2 pl-6 pr-6 border border-gray-300 rounded-full hover:shadow transition">
              <Image
                src="/assets/images/svg/location.svg"
                alt=""
                width={24}
                height={24}
                className="md:w-6 md:h-6 w-3 h-3"
              />
              <span className="md:text-sm text-[12px] font-medium text-[#0d1623]">Pahang</span>
            </div>

            <div className="flex items-center gap-3 px-2 py-2 pl-6 pr-6 border border-gray-300 rounded-full hover:shadow transition">
              <Image
                src="/assets/images/svg/location.svg"
                alt=""
                width={24}
                height={24}
                className="md:w-6 md:h-6 w-3 h-3"
              />
              <span className="md:text-sm text-[12px] font-medium text-[#0d1623]">Melaka</span>
            </div>

            <div className="flex items-center gap-3 px-2 py-2 pl-6 pr-6 border border-gray-300 rounded-full hover:shadow transition">
              <Image
                src="/assets/images/svg/location.svg"
                alt=""
                width={24}
                height={24}
                className="md:w-6 md:h-6 w-3 h-3"
              />
              <span className="md:text-sm text-[12px] font-medium text-[#0d1623]">Negeri Sembilan</span>
            </div>

            <div className="flex items-center gap-3 px-2 py-2 pl-6 pr-6 border border-gray-300 rounded-full hover:shadow transition">
              <Image
                src="/assets/images/svg/location.svg"
                alt=""
                width={24}
                height={24}
                className="md:w-6 md:h-6 w-3 h-3"
              />
              <span className="md:text-sm text-[12px] font-medium text-[#0d1623]">Kedah</span>
            </div>

            <div className="flex items-center gap-3 px-2 py-2 pl-6 pr-6 border border-gray-300 rounded-full hover:shadow transition">
              <Image
                src="/assets/images/svg/location.svg"
                alt=""
                width={24}
                height={24}
                className="md:w-6 md:h-6 w-3 h-3"
              />
              <span className="md:text-sm text-[12px] font-medium text-[#0d1623]">Kuantan</span>
            </div>

            <div className="flex items-center gap-3 px-2 py-2 pl-6 pr-6 border border-gray-300 rounded-full hover:shadow transition">
              <Image
                src="/assets/images/svg/location.svg"
                alt=""
                width={24}
                height={24}
                className="md:w-6 md:h-6 w-3 h-3"
              />
              <span className="md:text-sm text-[12px] font-medium text-[#0d1623]">Sabah</span>
            </div>

            <div className="flex items-center gap-3 px-2 py-2 pl-6 pr-6 border border-gray-300 rounded-full hover:shadow transition">
              <Image
                src="/assets/images/svg/location.svg"
                alt=""
                width={24}
                height={24}
                className="md:w-6 md:h-6 w-3 h-3"
              />
              <span className="md:text-sm text-[12px] font-medium text-[#0d1623]">Sarawak</span>
            </div>

            <div className="flex items-center gap-1 md-gap-3 md:px-6 md:py-2 py-1 px-2 border border-gray-300 rounded-full hover:shadow transition">
              <Image
                src="/assets/images/svg/location.svg"
                alt=""
                width={24}
                height={24}
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
            Give The Best <em className="text-red-600">Care For Your</em> Loved Ones Today With MobiLab2u
          </h3>

          <p className="text-sm md:text-lg text-gray-600 mb-10">
            With MobiLab2u, you can ensure your senior loved ones receive the care they need without leaving the comfort
            of home. Schedule your appointment today and take control of your health.
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
            Common Questions <em className="text-red-600"> About Geriatric Home </em> Care in Malaysia
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full">
          <div className="col-span-12 space-y-6">
            {/* FAQ Item 1 */}
            <div className="border rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(0)}>
                <h4 className="text-[16px] sm:text-lg font-semibold">
                  Which medical professionals will come to my home?
                </h4>
                <span className="text-gray-500 text-xl">{openFaqIndex === 0 ? '✖' : '＋'}</span>
              </div>
              {openFaqIndex === 0 && (
                <div className="mt-4 text-[15px] text-gray-700">
                  Only certified and trained personnel, including phlebotomists or{' '}
                  <Link href="/doctor-nurse-home-visit" className="text-red-600" title="Doctor & Nurse Home Visit">
                    {' '}
                    certified nurses,{' '}
                  </Link>{' '}
                  or doctors who hold a valid annual practicing certificate with MOH Malaysia, will visit your home. Our
                  qualified professionals are trained and experienced in looking after the elderly so that treatment can
                  be gentle and respectful.
                </div>
              )}
            </div>

            {/* FAQ Item 2 */}
            <div className="border rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(1)}>
                <h4 className="text-[16px] sm:text-lg font-semibold">
                  Is my home a suitable place to have medical procedures performed?
                </h4>
                <span className="text-gray-500 text-xl">{openFaqIndex === 1 ? '✖' : '＋'}</span>
              </div>
              {openFaqIndex === 1 && (
                <div className="mt-4 text-[15px] text-gray-700">
                  Yes. We follow very stringent infection control protocols, use single-use sterile instruments, and
                  apply hospital-grade sanitation protocols on each visit. The safety and welfare of our geriatric
                  patients are a top concern with us.
                </div>
              )}
            </div>

            {/* FAQ Item 3 */}
            <div className="border rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(2)}>
                <h4 className="text-[16px] sm:text-lg font-semibold">
                  How do you ensure the accuracy of the test results?
                </h4>
                <span className="text-gray-500 text-xl">{openFaqIndex === 2 ? '✖' : '＋'}</span>
              </div>
              {openFaqIndex === 2 && (
                <div className="mt-4 text-[15px] text-gray-700">
                  Ultimately, all samples collected are forwarded to ISO 15189-certified laboratories. The labs have a
                  process for control and validation. Each sample is treated with care and accuracy so that you and your
                  doctor can trust the results.
                </div>
              )}
            </div>

            {/* FAQ Item 4 */}
            <div className="border rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(3)}>
                <h4 className="text-[16px] sm:text-lg font-semibold">Will you ship prescription medication?</h4>
                <span className="text-gray-500 text-xl">{openFaqIndex === 3 ? '✖' : '＋'}</span>
              </div>
              {openFaqIndex === 3 && (
                <div className="mt-4 text-[15px] text-gray-700">
                  Our{' '}
                  <Link
                    href="/prescription-medicine-home-delivery"
                    className="text-red-600"
                    title="home delivery pharmacy service"
                  >
                    {' '}
                    home delivery pharmacy service{' '}
                  </Link>{' '}
                  is designed with the older adult and their caregivers in mind to help them easily fill their
                  prescriptions. We provide safe, traceable delivery of medication, pharmacist review, and proper
                  handling for temperature-controlled medication.
                </div>
              )}
            </div>

            {/* FAQ Item 5 */}
            <div className="border rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(4)}>
                <h4 className="text-[16px] sm:text-lg font-semibold">What do I need to have ready for a home visit?</h4>
                <span className="text-gray-500 text-xl">{openFaqIndex === 4 ? '✖' : '＋'}</span>
              </div>
              {openFaqIndex === 4 && (
                <div className="mt-4 text-[15px] text-gray-700">
                  It&apos;s simple. Once you&apos;ve scheduled a service, we&apos;ll give you particular pre-service
                  instructions. For instance, some tests require patients to fast. Just make sure the patient is
                  comfortable and well-hydrated when our medical professional comes.
                </div>
              )}
            </div>

            {/* FAQ Item 6 */}
            <div className="border rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(5)}>
                <h4 className="text-[16px] sm:text-lg font-semibold">
                  What if an elderly patient takes multiple medications or has a complex medical history?
                </h4>
                <span className="text-gray-500 text-xl">{openFaqIndex === 5 ? '✖' : '＋'}</span>
              </div>
              {openFaqIndex === 5 && (
                <div className="mt-4 text-[15px] text-gray-700">
                  For safety purposes, we always advise you to consult your main physician first. We also have a
                  teleconsultation service to guide you on the most appropriate test or secure an expert opinion before
                  a home visit.
                </div>
              )}
            </div>

            {/* FAQ Item 7 */}
            <div className="border rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(6)}>
                <h4 className="text-[16px] sm:text-lg font-semibold">How do I get the test results?</h4>
                <span className="text-gray-500 text-xl">{openFaqIndex === 6 ? '✖' : '＋'}</span>
              </div>
              {openFaqIndex === 6 && (
                <div className="mt-4 text-[15px] text-gray-700">
                  Reports of diagnostic tests are usually sent electronically through a secure email link or our
                  application within 24–48 hours. Hard copies can also be provided.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-[#fef1e7] h-[370px] min-h-[300px] sm:min-h-[380px] md:min-h-[400px] lg:min-h-[370px] xl:min-h-[400px] py-6 pb-24 md:pb-10 flex md:items-center justify-center px-2 md:px-4 relative overflow-hidden">
        {/* Left Illustration */}
        <Image
          src="/assets/images/mobilab2u/home-healthcare-application.svg"
          alt="Access Healthcare Services Anytime With Mobile App Malaysia"
          title="Access Healthcare Services Anytime With Mobile App Malaysia"
          width={392}
          height={280}
          className="absolute left-0 bottom-0 max-h-24 max-h-[38%] md:max-h-[43%] lg:max-h-[60%] xl:max-h-[70%] object-contain z-10"
        />

        {/* Right Illustration */}
        <Image
          src="/assets/images/mobilab2u/medicine-delivery.svg"
          alt="Fast Prescription Medicine Delivery Services In Malaysia"
          title="Fast Prescription Medicine Delivery Services In Malaysia"
          width={308}
          height={280}
          className="absolute right-0 bottom-0 max-h-24 max-h-[40%] md:max-h-[45%] lg:max-h-[62%] xl:max-h-[70%] object-contain z-10"
        />

        {/* Center Content */}
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

            <a
              href="tel:+60125412990"
              className="border border-gray-300 hover:border-black text-black px-4 py-2 md:px-6 md:py-3 rounded-md font-semibold bg-white shadow text-sm md:text-base"
            >
              Talk to an Expert
            </a>
          </div>
        </div>

        {/* Decorative SVG Star 1 */}
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

        {/* Decorative SVG Star 2 */}
        <div className="absolute right-4 top-[7rem] sm:right-[25%] md:right-[20%] lg:right-[26%] sm:top-[13rem] rotate-45 scale-100 opacity-100 z-0 w-10 h-10 sm:w-auto sm:h-auto">
          <svg width="42" height="42" viewBox="0 0 193 216" fill="none" className="w-full h-full">
            <g clipPath="url(#clip0_26_34468_2)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M55.3 109.9C54.2 109.7 53.3 109.6 52.6 109.3C47.1 106.4 41.7 103.4 36.2 100.7C29.4667 97.4333 22.4333 95.1333 15.1 93.8C10.3 92.9 5.49999 91.9 0.899992 91C-0.200008 89.5 1.69999 88.3 0.699992 87C1.99999 86.1 3.19999 86.3 4.49999 86.5C6.69999 87 8.99999 87.5 11.2 88C15 88.8 18.8 89 22.6 88.7C28.9 88.2 35.2 87.7 41.5 86.9C46.1 86.3 50.6 85.2 54.8 83C56.8 82 58.9 81.4 60.9 80.4C62.3 79.6 63.6 78.6 65 77.8C70.6 74.7 75.8 71.1 80.4 66.5C86 61 90.3 54.4999 95 48.2999C100.3 41.1999 102.7 32.9 104.7 24.5C106.3 17.5 108.3 10.6 109 3.39995C109.1 2.49995 109.5 1.69995 109.8 0.799951C110.333 0.799951 110.867 0.766618 111.4 0.699951C111.5 0.999951 111.7 1.29995 111.7 1.49995C111.5 4.09995 111.2 6.69995 111.2 9.29995C111.2 14.9 111.3 20.5 111.3 26.1C111.3 32.5 111.4 38.9 111.4 45.4C111.3 51.5 112.4 57.3 114.8 62.9C115.3 64.1 115.7 65.4 115.9 66.7C116.5 70.5 118.3 73.7 120.9 76.5C123.1 78.8 125 81.2 127.2 83.5C129.9 86.5 133.3 88.6 136.8 90.4C139.8 91.9333 142.7 93.5666 145.5 95.3C149.3 97.6 153.5 98.9 157.8 100C161.7 100.9 165.7 101.8 169.6 102.9C173.7 104 177.8 104.3 181.9 104.7C185.2 105.1 188.5 105.5 192.3 105.9C191.7 106.5 191.4 107 191.2 107C183.4 107.2 175.5 107.3 167.8 107.7C163.5 108 159.3 108.6 155.2 109.4C150.3 110.3 145.4 111.4 140.7 112.7C135.5 114.1 130.4 115.9 125.4 117.7C120.5 119.4 116.5 122.5 112.5 125.9C109.2 128.9 107.6 133 105 136.4C101.4 141 99.7 146.6 98.2 152.2C95.7 161.7 93.2 171.3 91.1 180.9C89 190.7 87.4 200.6 86.7 210.6C86.6 211.8 86.1 212.9 85.7 214.1C85.5 214.4 85 214.7 84.7 214.9C83.8 214.2 83 213.5 82.3 212.8C81.3 212 81.1 210.9 81.2 209.7C81.4 202.8 81.8 195.9 82 189C82.1 183.9 82.4 178.7 82.1 173.6C81.7 167.5 80.9 161.4 79.9 155.4C79.3 151.7 78 148 76.9 144.4C75.6 139.8 73.4 135.6 71.7 131.3C70.7 128.7 68.9 126.5 68.1 123.9C67.9 123.5 67.4 123.3 67.1 123C66.8 122.7 66.4 122.5 66.2 122.2C64.7 118.2 60.9 116.2 58.6 112.8C58.4 112.5 57.8 112.4 57.4 112.2C56.4 111.6 55.2 111.2 55.3 109.9Z"
                fill="#100F12"
              />
            </g>
            <defs>
              <clipPath id="clip0_26_34468_2">
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
