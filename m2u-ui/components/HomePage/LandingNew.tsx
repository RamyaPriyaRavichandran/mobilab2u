'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { initAOS, initSmoothScroll, initSplitting, initSwiper } from './animations'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetchers'
import { GET_CUSTOMER_PLANS } from '@/lib/endpoints'
import { useRouter } from 'next/navigation'
import { Package } from '../Customers/CustomerPackages/interface'
import LaningPackageSwiper from './LaningPackageSwiper'

export default function MobiLab2uHomepage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  useEffect(() => {
    initAOS()
    initSmoothScroll()
    initSplitting()
    initSwiper()
  }, [])

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  return (
    <main>
      {/* Banner Section */}
      <section className="relative pt-6 pb-8 px-4 text-center bg-[#fef1e7]">
        <div className="max-w-7xl mx-auto relative">
          <h3
            className="text-[1.8rem] sm:text-[2.4rem] md:text-[3rem] font-bold leading-tight splt-txt"
            data-splitting
            data-aos="fade-in"
          >
            <em className="text-red-600">Stay Home</em>
            <br />
            <em className="text-black">We&apos;ll Come To You</em>
          </h3>

          <p
            className="mt-3 sm:mt-4 text-gray-700 text-[14px] sm:text-base max-w-xl sm:max-w-3xl mx-auto wow fadeIn"
            data-wow-delay="0.3s"
          >
            Bringing Blood test, Doctor teleconsultation, Home care, Medicines and more to your home or office.
          </p>

          {/* Swiper container */}
          <LaningPackageSwiper />

          {/* Buttons */}
          <div
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center items-center gap-3 wow fadeIn"
            data-wow-delay="0.5s"
          >
            <Link
              href={{
                pathname: '/packages',
                query: { serviceType: 'test' },
              }}
              className="px-4 py-2 sm:px-6 sm:py-2 border-[1.5px] border-[#dc2626] text-white font-medium text-sm sm:text-base rounded-lg bg-[#dc2626] hover:bg-black transition"
            >
              <span className="inline-flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 10l4.553-2.276A2 2 0 0122 9.618v4.764a2 2 0 01-2.447 1.894L15 14M4 6v12m0 0a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2z"
                  />
                </svg>
                Book a Home Visit
              </span>
            </Link>

            <Link href="/packages" className="text-red-600 font-semibold hover:underline text-sm sm:text-base">
              Explore Packages
            </Link>
          </div>

          {/* Ratings */}
          <div
            className="mt-4 sm:mt-6 text-[12px] sm:text-sm text-gray-800 flex justify-center items-center gap-1 sm:gap-2 wow fadeIn"
            data-wow-delay="0.5s"
          >
            <span>Excellent</span>
            <span className="text-yellow-500 text-sm sm:text-base">★★★★★</span>
            <span>Based on 10,250+ reviews.</span>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <div className="bg-gradient-to-b from-[#fef1e7] to-white pt-[5px] px-4 pb-4 sm:px-6 lg:px-8 sm:pb-0 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative px-4 sm:px-6 lg:px-8 pt-[5px] pb-4 sm:py-8 bg-gradient-to-b from-[#fef1e7] to-white z-0">
            <div className="max-w-7xl mx-auto relative">
              <div className="bg-back absolute -bottom-10 -left-10 w-[450px] h-[450px] z-0"></div>
              <div className="relative rounded-[2rem] mx-auto max-w-[54rem] h-[24rem] md:h-[36rem] z-10">
                <video autoPlay muted loop playsInline className="w-full h-[87%] object-cover rounded-[2rem] mt-5">
                  <source src="/assets/images/mobilab2u-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <div className="absolute top-[-1.5rem] left-[-1.5rem]  md:top-[-2.5rem] md:left-[-3rem] xl:left-[-8.5rem] rounded-xl overflow-hidden w-[10rem] sm:w-[12rem] md:w-72">
                  <Link
                    href={{
                      pathname: '/packages',
                      query: { serviceType: 'test' },
                    }}
                  >
                    <Image
                      src="/assets/images/mobilab2u/doorstep.webp"
                      alt="Doorstep Blood Sample Collection Services in Malaysia"
                      className="w-full h-auto cursor-pointer hover:opacity-90 transition"
                      title="Book the doorstep sample collection service that actively delivers lab tests within 2 hours Malaysia"
                      width={288}
                      height={184}
                      loading="lazy"
                    />
                  </Link>
                </div>

                <div className="absolute bottom-6 right-[-1.5rem] xl:right-[-6.5rem] bg-white rounded-xl shadow-md overflow-hidden w-[10rem] sm:w-[12rem] md:w-72">
                  <Image
                    src="/assets/images/mobilab2u/medicine-doorstep.webp"
                    title="Prescription Medicine Doorstep Delivery In Malaysia"
                    className="w-full h-auto"
                    alt="Get your prescribed medicines to be delivered safely to your doorstep within 60 minutes in Malaysia."
                    width={288}
                    height={170}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-4 pt-4 pb-12 sm:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 md:mb-12">
          <div>
            <h1
              className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-3 text-center sm:text-left splt-txt"
              data-splitting
              data-aos="fade-in"
            >
              On Demand <em className="text-red-600">Home Healthcare</em> Services in Malaysia
            </h1>
            <p className="text-[14px] sm:text-base text-gray-800 text-center sm:text-left mb-4">
              Convenient medical support delivered right to your doorstep.
            </p>
          </div>
          <Link
            href="/services"
            className="p-3 relative w-[62px] h-[32px] md:w-[82px] md:h-[42px] block bg-red-600 rounded-full flex items-center justify-center"
          >
            <svg
              className="w-full h-full duration-500"
              viewBox="0 0 82 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="hover:fill-white"
                d="M78.0488 20.5122L78.0488 22.4634L0 22.4634L0 20.5122L78.0488 20.5122Z"
                fill="white"
              />
              <path
                className="hover:stroke-white"
                d="M59.5122 1C63.8949 12.122 68.2603 16.872 79.0244 21.4598C67.888 25.6573 63.5473 29.5287 59.5122 41"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </Link>
        </div>

        {/* Service Cards Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {/* Card 1: Blood Sample Collection */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition transform duration-300 hover:-translate-y-2 p-6 md:pb-6 xl:flex items-center justify-between xl:bg-[url('/assets/images/services/at-home-blood-sample-collection.svg')] xl:bg-cover xl:bg-center">
            <div className="w-full xl:w-[68%] z-10 relative">
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-left">At-Home Blood Sample Collection</h3>
              <p className="text-[#000] text-[14px] sm:text-base leading-relaxed text-left">
                Convenient sample collection from your doorstep with fast, accurate lab reports.
              </p>
              <ul className="grid grid-cols-2 gap-2 text-xs mt-6 md:flex md:flex-wrap hidden xl:flex">
                <li>
                  <Link
                    href="/services/home-blood-sample-collection"
                    className="block text-center px-3 py-1 text-[11px] md:px-4 md:py-1.5 md:text-xs bg-[#f5f5f5] hover:bg-red-600 text-black hover:text-white rounded-md font-medium"
                  >
                    General Health & Preventive Screening
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/home-blood-sample-collection"
                    className="block text-center px-3 py-1 text-[11px] md:px-4 md:py-1.5 md:text-xs bg-[#f5f5f5] hover:bg-red-600 text-black hover:text-white rounded-md font-medium"
                  >
                    Specialized Screening
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/home-blood-sample-collection"
                    className="block text-center px-3 py-1 text-[11px] md:px-4 md:py-1.5 md:text-xs bg-[#f5f5f5] hover:bg-red-600 text-black hover:text-white rounded-md font-medium"
                  >
                    Gender Specific
                  </Link>
                </li>
              </ul>

              <div className="hidden md:block border-t border-gray-200 my-6 md:w-[90%]"></div>
              <div className="mt-4 md:mt-0 flex gap-2">
                <Link
                  href="/services/home-blood-sample-collection"
                  className="inline-flex text-xs items-center gap-2 border border-gray-300 px-4 py-2 text-black font-semibold hover:border-black transition"
                >
                  Read More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 7l-10 10m0 0h10m-10 0V7"
                    ></path>
                  </svg>
                </Link>
                <Link
                  href={{
                    pathname: '/packages',
                    query: { serviceType: 'test' },
                  }}
                  className="inline-flex text-xs items-center gap-2 px-4 py-2 bg-black text-white font-semibold hover:bg-red-600 transition"
                >
                  Book Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 7l-10 10m0 0h10m-10 0V7"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
            <Image
              src="/assets/images/services/at-home-blood-sample-collection-service.svg"
              className="block xl:hidden w-full mt-5"
              width={225}
              height={150}
              alt="At-home Blood Sample Collection Services in Malaysia"
              title="At-home Blood Sample Collection Services in Malaysia"
              loading="lazy"
            />
          </div>

          {/* Card 2: Tele Consultation */}
          <div
            className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition transform duration-300 hover:-translate-y-2 p-6 md:pb-6 xl:flex items-center justify-between xl:bg-[url('/assets/images/services/tele-consultation.svg')] xl:bg-cover xl:bg-center"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="w-full xl:w-[68%] z-10 relative">
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-left">Tele Consultation</h3>
              <p className="text-[#000] text-[14px] sm:text-base leading-relaxed text-left">
                Connect instantly with licensed doctors for consultations from home.
              </p>
              <ul className="grid grid-cols-2 gap-2 text-xs mt-6 md:flex md:flex-wrap hidden xl:flex">
                <li>
                  <Link
                    href="/services/tele-consultation"
                    className="block text-center px-3 py-1 text-[11px] md:px-4 md:py-1.5 md:text-xs bg-[#f5f5f5] hover:bg-red-600 text-black hover:text-white rounded-md font-medium"
                  >
                    General Medical Concerns
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/tele-consultation"
                    className="block text-center px-3 py-1 text-[11px] md:px-4 md:py-1.5 md:text-xs bg-[#f5f5f5] hover:bg-red-600 text-black hover:text-white rounded-md font-medium"
                  >
                    Mental Health
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/tele-consultation"
                    className="block text-center px-3 py-1 text-[11px] md:px-4 md:py-1.5 md:text-xs bg-[#f5f5f5] hover:bg-red-600 text-black hover:text-white rounded-md font-medium"
                  >
                    Chronic Disease Management
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/tele-consultation"
                    className="block text-center px-3 py-1 text-[11px] md:px-4 md:py-1.5 md:text-xs bg-[#f5f5f5] hover:bg-red-600 text-black hover:text-white rounded-md font-medium"
                  >
                    Emotional Wellness
                  </Link>
                </li>
              </ul>
              <div className="hidden md:block border-t border-gray-200 my-6 md:w-[90%]"></div>
              <div className="mt-4 md:mt-0 flex gap-2">
                <Link
                  href="/services/tele-consultation"
                  className="inline-flex text-xs items-center gap-2 border border-gray-300 px-4 py-2 text-black font-semibold hover:border-black transition"
                >
                  Read More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 7l-10 10m0 0h10m-10 0V7"
                    />
                  </svg>
                </Link>
                <Link
                  href={{
                    pathname: '/packages',
                    query: { serviceType: 'appointment' },
                  }}
                  className="inline-flex text-xs items-center gap-2 px-4 py-2 bg-black text-white font-semibold hover:bg-red-600 transition"
                >
                  Book Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 7l-10 10m0 0h10m-10 0V7"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
            <Image
              src="/assets/images/services/doctor-tele-consultation.svg"
              className="block xl:hidden w-full mt-5"
              width={225}
              height={150}
              alt="Tele Consultation With Licensed Doctors in Malaysia"
              title="Tele Consultation With Licensed Doctors in Malaysia"
              loading="lazy"
            />
          </div>

          {/* Card 3: Prescription Medication Delivery */}
          <div
            className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition transform duration-300 hover:-translate-y-2 p-6 md:pb-6 xl:flex items-center justify-between xl:bg-[url('/assets/images/services/prescription-medition-delivery.svg')] xl:bg-cover xl:bg-center"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              Coming Soon
            </span>
            <div className="w-full xl:w-[68%] z-10 relative">
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-left">Prescription Medication Delivery</h3>
              <p className="text-[#000] text-[14px] sm:text-base leading-relaxed text-left">
                Get your{' '}
                <Link
                  href="/services/medicine-delivery"
                  title="Prescription Medication Delivery"
                  className="text-red-600"
                >
                  prescribed medicines delivered
                </Link>{' '}
                safely and quickly to your doorstep.
              </p>
              <ul className="grid grid-cols-2 gap-2 text-xs mt-6 md:flex md:flex-wrap hidden xl:flex">
                <li>
                  <Link
                    href="/services/medicine-delivery"
                    className="block text-center px-3 py-1 text-[11px] md:px-4 md:py-1.5 md:text-xs bg-[#f5f5f5] hover:bg-red-600 text-black hover:text-white rounded-md font-medium"
                  >
                    Antibiotics & Antivirals
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/medicine-delivery"
                    className="block text-center px-3 py-1 text-[11px] md:px-4 md:py-1.5 md:text-xs bg-[#f5f5f5] hover:bg-red-600 text-black hover:text-white rounded-md font-medium"
                  >
                    Diabetes Drug Class
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/medicine-delivery"
                    className="block text-center px-3 py-1 text-[11px] md:px-4 md:py-1.5 md:text-xs bg-[#f5f5f5] hover:bg-red-600 text-black hover:text-white rounded-md font-medium"
                  >
                    Cardiovascular Drug Class
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/medicine-delivery"
                    className="block text-center px-3 py-1 text-[11px] md:px-4 md:py-1.5 md:text-xs bg-[#f5f5f5] hover:bg-red-600 text-black hover:text-white rounded-md font-medium"
                  >
                    Pain & Inflammation
                  </Link>
                </li>
              </ul>
              <div className="hidden md:block border-t border-gray-200 my-6 md:w-[90%]"></div>
              <div className="mt-4 md:mt-0 flex gap-2">
                <Link
                  href="/services/medicine-delivery"
                  className="inline-flex text-xs items-center gap-2 border border-gray-300 px-4 py-2 text-black font-semibold hover:border-black transition"
                >
                  Read More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 7l-10 10m0 0h10m-10 0V7"
                    />
                  </svg>
                </Link>
                {/* <Link
                  href="/packages"
                  className="inline-flex text-xs items-center gap-2 px-4 py-2 bg-black text-white font-semibold hover:bg-red-600 transition"
                >
                  Book Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 7l-10 10m0 0h10m-10 0V7"
                    ></path>
                  </svg>
                </Link> */}
              </div>
            </div>
            <Image
              src="/assets/images/services/fast-prescription-medication-delivery.svg"
              className="block xl:hidden w-full mt-5"
              width={225}
              height={150}
              alt="Fast Prescription Medication Home Delivery in Malaysia"
              title="Fast Prescription Medication Home Delivery in Malaysia"
              loading="lazy"
            />
          </div>

          {/* Card 4: Home Care Services */}
          <div
            className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition transform duration-300 hover:-translate-y-2 p-6 md:pb-6 xl:flex items-center justify-between xl:bg-[url('/assets/images/services/home-care-services.svg')] xl:bg-cover xl:bg-center"
            data-aos="fade-up"
            data-aos-delay="900"
          >
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              Coming Soon
            </span>
            <div className="w-full xl:w-[68%] z-10 relative">
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-left">Home Care Services</h3>
              <p className="text-[#000] text-[14px] sm:text-base leading-relaxed text-left">
                Receive professional{' '}
                <Link href="/services/home-care-services" title="Home Care Services" className="text-red-600">
                  medical care at home
                </Link>{' '}
                with personalized support.
              </p>
              <ul className="grid grid-cols-2 gap-2 text-xs mt-6 md:flex md:flex-wrap hidden xl:flex">
                <li>
                  <Link
                    href="/services/home-care-services/geriatric-support"
                    className="block text-center px-3 py-1 text-[11px] md:px-4 md:py-1.5 md:text-xs bg-[#f5f5f5] hover:bg-red-600 text-black hover:text-white rounded-md font-medium"
                  >
                    Geriatric Support
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/home-care-services/chronic-wound-care"
                    className="block text-center px-3 py-1 text-[11px] md:px-4 md:py-1.5 md:text-xs bg-[#f5f5f5] hover:bg-red-600 text-black hover:text-white rounded-md font-medium"
                  >
                    Chronic Wound Care
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/home-care-services/home-doctor-nurse-service"
                    className="block text-center px-3 py-1 text-[11px] md:px-4 md:py-1.5 md:text-xs bg-[#f5f5f5] hover:bg-red-600 text-black hover:text-white rounded-md font-medium"
                  >
                    Doctor & Nurse Visits
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/home-care-services/homephysiotherapist"
                    className="block text-center px-3 py-1 text-[11px] md:px-4 md:py-1.5 md:text-xs bg-[#f5f5f5] hover:bg-red-600 text-black hover:text-white rounded-md font-medium"
                  >
                    Physiotherapy & Rehabilitation
                  </Link>
                </li>
              </ul>
              <div className="hidden md:block border-t border-gray-200 my-6 md:w-[90%]"></div>
              <div className="mt-4 md:mt-0 flex gap-2">
                <Link
                  href="/services/home-care-services"
                  className="inline-flex text-xs items-center gap-2 border border-gray-300 px-4 py-2 text-black font-semibold hover:border-black transition"
                >
                  Read More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 7l-10 10m0 0h10m-10 0V7"
                    />
                  </svg>
                </Link>
                {/* <Link
                  href="/packages"
                  className="inline-flex text-xs items-center gap-2 px-4 py-2 bg-black text-white font-semibold hover:bg-red-600 transition"
                >
                  Book Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 7l-10 10m0 0h10m-10 0V7"
                    ></path>
                  </svg>
                </Link> */}
              </div>
            </div>
            <Image
              src="/assets/images/services/home-healthcare-services.svg"
              className="block xl:hidden w-full mt-5"
              width={225}
              height={150}
              alt="Professional Home Healthcare Services in Malaysia"
              title="Professional Home Healthcare Services in Malaysia"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-[#fef1e7] py-10 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4 sm:mb-12 text-center splt-txt"
            data-splitting
            data-aos="fade-in"
          >
            Choose <em className="text-red-600">MobiLab2u</em> for Reliable Home Medical Care
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              className="group flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-[#dc2626] transition-all duration-300 text-left"
              data-aos="zoom-in"
            >
              <div className="min-w-[64px] min-h-[64px] flex items-center justify-center bg-[rgb(220_38_38_/_8%)] rounded-xl">
                <Image
                  src="/assets/images/svg/complete-healthcare.svg"
                  alt="Complete Healthcare Services Provider Across Malaysia"
                  className="w-12 h-12 transition-transform duration-300 group-hover:scale-x-[-1]"
                  title="Complete Healthcare Services Provider Across Malaysia"
                  width={48}
                  height={48}
                  loading="lazy"
                />
              </div>
              <div>
                <h4 className="text-sm lg:text-base xl:text-lg font-semibold mb-2 text-gray-900">
                  Complete Healthcare at Your Doorstep
                </h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  We bring lab tests, doctor visits, and physio care to your home.
                </p>
              </div>
            </div>

            <div
              className="group flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-[#dc2626] transition-all duration-300 text-left"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div className="min-w-[64px] min-h-[64px] flex items-center justify-center bg-[rgb(220_38_38_/_8%)] rounded-xl">
                <Image
                  src="/assets/images/svg/doctor.svg"
                  alt="Experienced Medical Professionals For Home Care in Malaysia"
                  className="w-12 h-12 transition-transform duration-300 group-hover:scale-x-[-1]"
                  title="Experienced Medical Professionals For Home Care in Malaysia"
                  width={48}
                  height={48}
                  loading="lazy"
                />
              </div>
              <div>
                <h4 className="text-sm lg:text-base xl:text-lg font-semibold mb-2 text-gray-900">
                  Experienced Medical Professionals
                </h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  Our doctors, nurses, and physios provide expert care with compassion.
                </p>
              </div>
            </div>

            <div
              className="group flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-[#dc2626] transition-all duration-300 text-left"
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              <div className="min-w-[64px] min-h-[64px] flex items-center justify-center bg-[rgb(220_38_38_/_8%)] rounded-xl">
                <Image
                  src="/assets/images/svg/appointment-booking.svg"
                  alt="Book Lab Tests & Doctor Home Visits Online in Malaysia"
                  className="w-12 h-12 transition-transform duration-300 group-hover:scale-x-[-1]"
                  title="Book Lab Tests & Doctor Home Visits Online in Malaysia"
                  width={48}
                  height={48}
                  loading="lazy"
                />
              </div>
              <div>
                <h4 className="text-sm lg:text-base xl:text-lg font-semibold mb-2 text-gray-900">
                  Easy Online Booking
                </h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  Book lab tests or doctor visits easily via our website or mobile app.
                </p>
              </div>
            </div>

            <div
              className="group flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-[#dc2626] transition-all duration-300 text-left"
              data-aos="zoom-in"
              data-aos-delay="600"
            >
              <div className="min-w-[64px] min-h-[64px] flex items-center justify-center bg-[rgb(220_38_38_/_8%)] rounded-xl">
                <Image
                  src="/assets/images/svg/blood-test.svg"
                  alt="Fast And Safe Blood Sample Collection At Home, Malaysia"
                  className="w-11 h-11 transition-transform duration-300 group-hover:scale-x-[-1]"
                  title="Fast And Safe Blood Sample Collection At Home, Malaysia"
                  width={48}
                  height={48}
                  loading="lazy"
                />
              </div>
              <div>
                <h4 className="text-sm lg:text-base xl:text-lg font-semibold mb-2 text-gray-900">
                  Fast & Safe Blood Sample Collection
                </h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  We ensure clean, smooth, and secure home sample collection every time.
                </p>
              </div>
            </div>

            <div
              className="group flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-[#dc2626] transition-all duration-300 text-left"
              data-aos="zoom-in"
              data-aos-delay="800"
            >
              <div className="min-w-[64px] min-h-[64px] flex items-center justify-center bg-[rgb(220_38_38_/_8%)] rounded-xl">
                <Image
                  src="/assets/images/svg/delivery.svg"
                  alt="Reliable Prescription Medication Delivery Services, Malaysia"
                  className="w-10 h-10 transition-transform duration-300 group-hover:scale-x-[-1]"
                  title="Reliable Prescription Medication Delivery Services, Malaysia"
                  width={48}
                  height={48}
                  loading="lazy"
                />
              </div>
              <div>
                <h4 className="text-sm lg:text-base xl:text-lg font-semibold mb-2 text-gray-900">
                  Medication Delivery to Your Home
                </h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  Get your{' '}
                  <Link
                    href="/services/medicine-delivery"
                    title="Prescription Medication Delivery"
                    className="text-red-600"
                  >
                    prescribed medicines delivered
                  </Link>{' '}
                  quickly and reliably to you.
                </p>
              </div>
            </div>

            <div
              className="group flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-[#dc2626] transition-all duration-300 text-left"
              data-aos="zoom-in"
              data-aos-delay="1000"
            >
              <div className="min-w-[64px] min-h-[64px] flex items-center justify-center bg-[rgb(220_38_38_/_8%)] rounded-xl">
                <Image
                  src="/assets/images/svg/nursing-home.svg"
                  alt="Personalized Home Care For Seniors & Patients In Malaysia"
                  className="w-10 h-10 transition-transform duration-300 group-hover:scale-x-[-1]"
                  title="Personalized Home Care For Seniors & Patients In Malaysia"
                  width={48}
                  height={48}
                  loading="lazy"
                />
              </div>
              <div>
                <h4 className="text-sm lg:text-base xl:text-lg font-semibold mb-2 text-gray-900">
                  Personalized Support for Elderly & Chronic Patients
                </h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  Lab Tests, Doctor Visits, Physiotherapy & Rehab, Wound Care, and Home Care Support for Seniors &
                  Patients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-[url('/assets/images/bg/shape-06.webp')] bg-no-repeat bg-cover bg-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:gap-6 items-center">
          <div data-aos="fade-left">
            <div className="w-full text-center sm:text-left">
              <span className="bg-[#dc2626] text-white text-xs sm:text-sm font-semibold px-3 py-1 sm:px-5 sm:py-2 rounded-full inline-block mb-4">
                About MobiLab2u
              </span>
            </div>
            <h2
              className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#1d1d1f] mb-6 text-center sm:text-left splt-txt"
              data-splitting
              data-aos="fade-in"
            >
              Malaysia&apos;s Largest Digital <em className="text-red-600">Healthcare Platform</em>
            </h2>
            <p className="text-[#555] text-sm sm:text-base mb-5 sm:mb-10 text-justify sm:text-left">
              MobiLab2u is a connected healthcare platform that simplifies how patients access medical services from
              home. We collaborate with licensed doctors, diagnostic labs,{' '}
              <Link href="/services/medicine-delivery" className="link">
                pharmacists
              </Link>
              , and home care providers to deliver trusted care on demand. Backed by secure digital systems and
              real-time coordination, our goal is to make quality healthcare more accessible, timely, and safe for
              everyone. From lab tests to recovery support, we ensure every step is handled with clinical precision and
              patient confidence.
            </p>
            <ul className="space-y-2 sm:mb-0 mb-4">
              <li className="flex items-start gap-2">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-sm sm:text-base font-semibold text-[#001e2b]">
                  Smart Access to Verified Care Providers
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-sm sm:text-base font-semibold text-[#001e2b]">
                  Home Health Services with Hospital Standards
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-sm sm:text-base font-semibold text-[#001e2b]">
                  Giving customers 24x7 access to high-quality healthcare
                </span>
              </li>
            </ul>
          </div>
          <div className="flex justify-center md:justify-end">
            <Image
              src="/assets/images/mobilab2u/malaysias-largest-digital-healthcare.webp"
              title="Malaysia's Largest Healthcare Platform With 24x7 Services"
              alt="Digital healthcare platform offering verified doctors, lab tests, and home medical services Malaysia"
              className="rounded-2xl w-full max-w-md md:max-w-full object-cover"
              width={604}
              height={529}
            />
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-10 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#fef1e7]">
        <div className="max-w-7xl mx-auto">
          <h3
            className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4 text-center splt-txt"
            data-splitting
            data-aos="fade-in"
          >
            Safety-First Approach for All <em className="text-red-600">In-Home Visits</em>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-24 gap-6 sm:mt-10">
            <div
              className="bg-[#fff] rounded-xl p-4 text-center shadow-sm border border-[#3333331f] mt-14 md:mt-20 sm:mt-0"
              data-aos="fade-down"
            >
              <div className="flex justify-center items-center gap-4 -mt-16 md:-mt-20 mb-3">
                <Image
                  src="/assets/images/home-services/doctor-wearing-ppe-kit.svg"
                  alt="Medical-Grade PPE for All Home Healthcare Visits"
                  className="w-24 h-24 -mt-6 md:w-28 md:h-28"
                  title="Medical-Grade PPE for All Home Healthcare Visits"
                  width={112}
                  height={112}
                  loading="lazy"
                />
              </div>
              <div>
                <h4 className="font-semibold text-black mb-2 text-sm md:text-base xl:text-lg">Medical-grade PPE Kit</h4>
                <p className="text-sm text-gray-800 md:text-sm xl:text-base">
                  Every professional arrives fully equipped with certified protective gear.
                </p>
              </div>
            </div>

            <div
              className="bg-[#fff] rounded-xl p-4 text-center shadow-sm border border-[#3333331f] mt-14 md:mt-20 sm:mt-0"
              data-aos="fade-down"
            >
              <div className="flex justify-center items-center gap-4 -mt-16 md:-mt-20 mb-3">
                <Image
                  src="/assets/images/home-services/sterilized-equipment.svg"
                  alt="Sterilized Medical Equipment For Home Visits In Malaysia"
                  className="w-24 h-24 md:w-28 md:h-28 -mt-6"
                  title="Sterilized Medical Equipment For Home Visits In Malaysia"
                  width={112}
                  height={112}
                  loading="lazy"
                />
              </div>
              <div>
                <h4 className="font-semibold text-black mb-2 text-sm md:text-base xl:text-lg">Sterilized Equipment</h4>
                <p className="text-sm text-gray-800 md:text-sm xl:text-base">
                  All tools are sanitized thoroughly before each home visit.
                </p>
              </div>
            </div>

            <div
              className="bg-[#fff] rounded-xl p-4 text-center shadow-sm border border-[#3333331f] mt-14 md:mt-20 sm:mt-0"
              data-aos="fade-down"
            >
              <div className="flex justify-center items-center gap-4 -mt-16 md:-mt-20 mb-3">
                <Image
                  src="/assets/images/home-services/encrpted-patient-data.svg"
                  alt="Secure Encrypted Patient Data Storage For Home Care Malaysia"
                  className="w-24 h-24 md:w-28 md:h-28 -mt-4 md:-mt-6"
                  title="Secure Encrypted Patient Data Storage For Home Care Malaysia"
                  width={112}
                  height={112}
                  loading="lazy"
                />
              </div>
              <div>
                <h4 className="font-semibold text-black mb-2 text-sm md:text-base xl:text-lg">
                  Encrypted Patient Data
                </h4>
                <p className="text-sm text-gray-800 md:text-sm xl:text-base">
                  Your health data is securely stored with advanced encryption.
                </p>
              </div>
            </div>

            <div
              className="bg-[#fff] rounded-xl p-4 text-center shadow-sm border border-[#3333331f] mt-14 md:mt-20 sm:mt-0"
              data-aos="fade-down"
            >
              <div className="flex justify-center items-center gap-4 -mt-16 md:-mt-20 mb-3">
                <Image
                  src="/assets/images/home-services/licensed-professionals-services.svg"
                  alt="Licensed Professionals Providing Home Care In Malaysia"
                  className="w-24 h-24 md:w-28 md:h-28 -mt-4 md:-mt-6"
                  title="Licensed Professionals Providing Home Care In Malaysia"
                  width={112}
                  height={112}
                  loading="lazy"
                />
              </div>
              <div>
                <h4 className="font-semibold text-black mb-2 text-sm md:text-base xl:text-lg">
                  Licensed Professionals Only
                </h4>
                <p className="text-sm text-gray-800 md:text-sm xl:text-base">
                  We work exclusively with verified and certified healthcare providers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white pt-8 pb-8 md:pt-20 md:pb-0 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8 mb-5 xl:mb-0">
          <div className="overflow-hidden flex items-start max-xl:w-[85%] mx-auto" data-aos="fade-up">
            <Image
              src="/assets/images/services/best-digital-healthcare-platform.webp"
              title="MobiLab2U - Best Digital Healthcare Platform in Malaysia"
              alt="Best home healthcare platform offering lab tests, consultations, & medicine delivery in Malaysia"
              className="w-[520px] object-top object-cover max-lg:w-full"
              width={520}
              height={408}
              loading="lazy"
            />
          </div>

          <div className="w-full lg lg:w-[60%] xl:w-[30%] flex flex-col justify-center text-center lg:text-left">
            <h3
              className="font-bold text-black leading-tight tracking-tight text-[20px] sm:text-xl lg:text-2xl xl:text-3xl splt-txt"
              data-splitting
              data-aos="fade-in"
            >
              From Sample Collection <br />
              to Medicine Delivery
              <br />
              <em className="text-red-600">All in One Place</em>
            </h3>
            <p className="mt-6 text-black leading-relaxed text-[14px] md:text-base xl:text-lg" data-aos="fade-in">
              MobiLab2u makes healthcare simple. Whether you need a blood test, a doctor consultation, medication, or
              home nursing support – it&apos;s all available through a single platform.
            </p>
          </div>

          <div className="w-full lg:w-[40%] xl:w-[20%] lg:border-l border-gray-300 md:pl-8 grid grid-cols-3 lg:grid-cols-1 text-center lg:text-right justify-center">
            <div className="lg:mt-8 aos-init aos-animate" data-aos="fade-left" data-aos-delay="100">
              <h4 className="font-bold text-black text-base md:text:3xl lg:text-4xl xl:text-5xl leading-none">
                10,000+
              </h4>
              <p className="text-gray-500 text-[0.8rem] sm:text-sm mt-1">patients served at home</p>
            </div>

            <div className="lg:mt-8 aos-init aos-animate" data-aos="fade-left" data-aos-delay="300">
              <h4 className="font-bold text-black text-base md:text:3xl lg:text-4xl xl:text-5xl leading-none">97%</h4>
              <p className="text-gray-500 text-[0.8rem] sm:text-sm mt-1">customer satisfaction rate</p>
            </div>

            <div className="lg:mt-8 aos-init aos-animate" data-aos="fade-left" data-aos-delay="500">
              <h4 className="font-bold text-black text-base md:text:3xl lg:text-4xl xl:text-5xl leading-none">30+</h4>
              <p className="text-gray-500 text-[0.8rem] sm:text-sm mt-1">areas across Malaysia</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-[#fef1e7] pt-8 lg:pt-12 pb-8 lg:pb-20 px-6 rounded-2xl max-w-7xl mx-auto">
        <div className="relative grid md:grid-cols-3 gap-10 text-center mb-6 sm:mb-16 border-b border-gray-300">
          <div
            className="relative flex flex-col items-center min-h-full px-4 pb-4 lg:pb-12"
            data-aos="fade-in"
            data-aos-delay="200"
          >
            <div className="hidden md:block absolute top-0 right-0 h-full border-r border-gray-300"></div>
            <div className="w-12 h-12 bg-red-600 text-yellow-100 rounded-full flex items-center justify-center text-lg font-medium">
              1
            </div>
            <Image
              src="/assets/images/services/get-started-with-mobilab2u.svg"
              alt="Get Started With Digital Healthcare Platform In Malaysia"
              className="my-4 w-[13rem] h-[11rem] object-contain md:w-72 lg:h-[13rem]"
              title="Get Started With Digital Healthcare Platform In Malaysia"
              width={288}
              height={208}
              loading="lazy"
            />
            <h3 className="text-base font-semibold mb-2">Get Started with MobiLab2u</h3>
            <p className="text-gray-600 text-sm max-w-xs">
              Get the MobiLab2u app or visit our website. Create your account in just a few easy steps.
            </p>
          </div>

          <div
            className="relative flex flex-col items-center min-h-full px-4 pb-4 md:pb-12"
            data-aos="fade-in"
            data-aos-delay="500"
          >
            <div className="hidden md:block absolute top-0 right-0 h-full border-r border-gray-300"></div>
            <div className="w-12 h-12 bg-red-600 text-yellow-100 rounded-full flex items-center justify-center text-lg font-medium">
              2
            </div>
            <Image
              src="/assets/images/services/book-service.svg"
              alt="Book Home Healthcare Services Online In Malaysia"
              className="my-4 w-[13rem] h-[11rem] object-contain md:w-72 lg:h-[13rem]"
              title="Book Home Healthcare Services Online In Malaysia"
              width={288}
              height={208}
              loading="lazy"
            />
            <h3 className="text-base md:text-lg font-semibold mb-2">Book a Service</h3>
            <p className="text-gray-600 text-sm max-w-xs">
              Choose lab tests, doctor visits, or other services. Schedule a home visit at your preferred time.
            </p>
          </div>

          <div
            className="relative flex flex-col items-center min-h-full px-4 pb-4 md:pb-12"
            data-aos="fade-in"
            data-aos-delay="800"
          >
            <div className="w-12 h-12 bg-red-600 text-yellow-100 rounded-full flex items-center justify-center text-lg font-medium">
              3
            </div>
            <Image
              src="/assets/images/services/get-care-stay-connected.svg"
              alt="Receive Care & Stay Connected With Experts In Malaysia"
              className="my-4 w-[13rem] h-[11rem] object-contain md:w-72 lg:h-[13rem]"
              title="Receive Care & Stay Connected With Experts In Malaysia"
              width={288}
              height={208}
              loading="lazy"
            />
            <h3 className="text-base md:text-lg font-semibold mb-2">Get Care & Stay Connected</h3>
            <p className="text-gray-600 text-sm max-w-xs">
              Our experts visit your home, and reports are sent digitally. Follow up, chat with doctors, or order
              medicines anytime.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center text-center gap-4 pt-0 pb-0">
          <div className="flex items-center gap-4">
            <a
              href="https://www.youtube.com/@mobilab2u"
              target="_blank"
              className="bg-red-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-black transition"
              rel="noreferrer"
            >
              Free Watch Demo
            </a>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-sm text-gray-700 mt-4 pt-1 text-center sm:flex-row sm:items-center sm:justify-start sm:mt-0 sm:text-left">
            <span>Excellent</span>
            <div className="flex text-yellow-500 gap-0.5">
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
            </div>
            <span>Based on 10,250+ reviews.</span>
          </div>
        </div>
      </section>

      <section className="bg-white testimonials-sec pt-8 lg:pt-12">
        <h3
          className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-center splt-txt max-w-[96%] sm:max-w-full mx-auto mb-12"
          data-splitting
          data-aos="fade-in"
        >
          Hear From Those Who <em className="text-red-600">Choose MobiLab2u</em>
        </h3>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 relative">
          <div className="swiper mySwiper py-4 md:py-10">
            <div className="swiper-wrapper">
              {/* Testimonial Cards */}
              {[
                {
                  name: 'Aisyah Rahman',
                  location: 'Kuala Lumpur',
                  img: '/assets/images/mobilab2u/aisyah-rahman.webp',
                  date: '20 Oct 2024',
                  rating: '5',
                  review:
                    'I booked a blood test through MobiLab2u and the technician came right to my home, fully equipped and professional. I got my reports online the same day—fast, easy, and very reassuring. Highly recommend it!',
                },
                {
                  name: 'Darren Lim',
                  location: 'Johor',
                  img: '/assets/images/mobilab2u/darren-lim.webp',
                  date: '3 Feb 2025',
                  rating: '4.0',
                  review:
                    'I scheduled an online doctor consultation with MobiLab2u and was amazed by how seamless it was. The doctor was attentive, and I received my e-prescription instantly. Convenient, quick, and trustworthy. Highly recommend it!',
                },
                {
                  name: 'Nurul Aina',
                  location: 'Kedah',
                  img: '/assets/images/mobilab2u/nurul-aina.webp',
                  date: '5 April 2025',
                  rating: '4.5',
                  review:
                    'After booking a home blood test on MobiLab2u, I was pleasantly surprised by how fast and efficient the service was. The technician arrived right on time with full PPE and proper hygiene. Reports were delivered online the same day.',
                },
                {
                  name: 'Hafiz Abdullah',
                  location: 'Melaka',
                  img: '/assets/images/mobilab2u/hafiz-abdullah.webp',
                  date: '22 Jan 2025',
                  rating: '5',
                  review:
                    'I used MobiLab2u to get my routine checkup done without leaving my home. From booking to report delivery, everything was smooth. The staff was courteous and the digital platform was easy to use.',
                },
                {
                  name: 'Kalthom',
                  location: 'Sabah',
                  img: '/assets/images/mobilab2u/kalthom.webp',
                  date: '10 May 2023',
                  rating: '4.8',
                  review:
                    'Wasn’t sure what to expect from an online diagnostic service, but MobiLab2u truly impressed me. Real-time updates, certified lab results, and a clean interface made everything feel reliable and safe. It saved me time and gave me peace of mind.',
                },
                {
                  name: 'Haji Omar',
                  location: 'Kajang',
                  img: '/assets/images/mobilab2u/haji-omar.webp',
                  date: '15 Dec 2024',
                  rating: '4.2',
                  review:
                    'Booking a lab test through MobiLab2u was incredibly easy. The technician arrived right on time, and the entire sample collection was hygienic and professional. I received my report digitally within hours. Super efficient and hassle-free!',
                },
              ].map((person, index) => (
                <div key={index} className="swiper-slide flex h-full px-2 sm:px-0 pb-5 sm:pb-0">
                  <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col w-full h-full min-h-[300px]">
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src={person.img}
                        className="w-12 h-12 rounded-full object-cover"
                        alt={person.name}
                        title={person.name}
                        width={48}
                        height={48}
                        loading="lazy"
                      />
                      <div>
                        <h4 className="font-semibold text-[16px] md:text-lg">{person.name}</h4>
                        <p className="text-gray-500 text-sm">{person.location}</p>
                      </div>
                    </div>
                    <p className="text-[14px] md:text-[15px] text-gray-600 mb-4 flex-grow text-justify md:text-left">
                      &quot;{person.review}&quot;
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                      <span>{person.date}</span>
                      <span className="flex items-center text-black font-semibold">
                        <span className="text-red-500 mr-1">★</span> {person.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-10">
              <div className="swiper-pagination gap-2"></div>
            </div>
          </div>

          {/* Right fade (visible only on large screens) */}
          <div
            className="hidden sm:block absolute top-0 right-0 w-[60px] h-full z-10"
            style={{ background: 'linear-gradient(to right, rgba(255,255,255,0), white)' }}
          ></div>
        </div>
      </section>

      {/* Partner Section */}
      <section className="pt-8 md:py-20 bg-white">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto px-4">
          <span className="bg-[#dc2626] text-white text-[14px] sm:text-sm font-semibold px-3 sm:px-5 py-1.5 sm:py-2 rounded-full inline-block mb-3 sm:mb-4">
            Partner with Us
          </span>
          <h3
            className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-black mb-2 splt-txt"
            data-splitting
            data-aos="fade-in"
          >
            Become a Trusted <em className="text-red-600">MobiLab2u Partner</em>
          </h3>
          <p className="text-gray-700 mb-5">Join our growing network of certified professionals today.</p>
        </div>
        <div className="max-w-[72rem] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
            {/* Partner Cards */}
            <div
              className="bg-[#fef1e7] rounded-xl p-6 flex flex-col justify-between hover:shadow-xl transition w-full h-full items-center text-center sm:items-start sm:text-left gap-2"
              data-aos="zoom-in"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-600 mb-2">
                <Image
                  src="/assets/images/svg/diagnostic.svg"
                  alt="Partner with us For Home Sample Collection in Malaysia"
                  className="w-8 h-8 filter invert brightness-0 saturate-0"
                  title="Partner with us For Home Sample Collection in Malaysia"
                  width={32}
                  height={32}
                  loading="lazy"
                />
              </div>
              <div>
                <h4 className="font-semibold text-base xl:text-md text-black leading-tight mt-2">Diagnostic Labs</h4>
                <p className="text-gray-600 text-sm mt-2 sm:mt-0">
                  Partner with us to offer fast, reliable lab testing with doorstep sample collection.
                </p>
              </div>
            </div>

            <div
              className="bg-[#fef1e7] rounded-xl p-6 flex flex-col justify-between hover:shadow-xl transition w-full h-full items-center text-center sm:items-start sm:text-left gap-2"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-600 mb-2">
                <Image
                  src="/assets/images/svg/drugstore.svg"
                  alt="Partner With Us for Medicine Home Delivery In Malaysia"
                  className="w-8 h-8 filter invert brightness-0 saturate-0"
                  title="Partner With Us for Medicine Home Delivery In Malaysia"
                  width={32}
                  height={32}
                  loading="lazy"
                />
              </div>
              <div>
                <h4 className="font-semibold text-base xl:text-md text-black leading-tight my-2">Pharmacies</h4>
                <p className="text-gray-600 text-sm mt-2 sm:mt-0">
                  Deliver essential medications directly to patients through our growing platform.
                </p>
              </div>
            </div>

            <div
              className="bg-[#fef1e7] rounded-xl p-6 flex flex-col justify-between hover:shadow-xl transition w-full h-full items-center text-center sm:items-start sm:text-left gap-2"
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-600 mb-2">
                <Image
                  src="/assets/images/svg/doctors.svg"
                  alt="Partner for Home Visits & Teleconsultations In Malaysia"
                  className="w-8 h-8 filter invert brightness-0 saturate-0"
                  title="Partner for Home Visits & Teleconsultations In Malaysia"
                  width={32}
                  height={32}
                  loading="lazy"
                />
              </div>
              <div>
                <h4 className="font-semibold text-base xl:text-md text-black leading-tight my-2">
                  Doctors & Specialists
                </h4>
                <p className="text-gray-600 text-sm mt-2 sm:mt-0">
                  Reach more patients with flexible home visits or secure online consultations.
                </p>
              </div>
            </div>

            <div
              className="bg-[#fef1e7] rounded-xl p-6 flex flex-col justify-between hover:shadow-xl transition w-full h-full items-center text-center sm:items-start sm:text-left gap-2"
              data-aos="zoom-in"
              data-aos-delay="600"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-600 mb-2">
                <Image
                  src="/assets/images/svg/nurse.svg"
                  alt="Partner as a Home Nurse or Caregiver In Malaysia"
                  className="w-8 h-8 filter invert brightness-0 saturate-0"
                  title="Partner as a Home Nurse or Caregiver In Malaysia"
                  width={32}
                  height={32}
                  loading="lazy"
                />
              </div>
              <div>
                <h4 className="font-semibold text-base xl:text-md text-black leading-tight my-2">
                  Nurses & Caregivers
                </h4>
                <p className="text-gray-600 text-sm mt-2 sm:mt-0">
                  Provide in-home medical care, post-surgery support, and daily health monitoring.
                </p>
              </div>
            </div>

            <div
              className="bg-[#fef1e7] rounded-xl p-6 flex flex-col justify-between hover:shadow-xl transition w-full h-full items-center text-center sm:items-start sm:text-left gap-2"
              data-aos="zoom-in"
              data-aos-delay="800"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-600 mb-2">
                <Image
                  src="/assets/images/svg/physiotherapy.svg"
                  alt="Partner for In-Home Physiotherapy Sessions In Malaysia"
                  title="Partner for In-Home Physiotherapy Sessions In Malaysia"
                  width={32}
                  height={32}
                  loading="lazy"
                  className="w-8 h-8 filter invert brightness-0 saturate-0"
                />
              </div>
              <div>
                <h4 className="font-semibold text-base xl:text-md text-black leading-tight my-2">Physiotherapists</h4>
                <p className="text-gray-600 text-sm mt-2 sm:mt-0">
                  Offer personalized therapy sessions in the comfort of patients&apos; homes.
                </p>
              </div>
            </div>

            <div
              className="bg-[#fef1e7] rounded-xl p-6 flex flex-col justify-between hover:shadow-xl transition w-full h-full items-center text-center sm:items-start sm:text-left gap-2"
              data-aos="zoom-in"
              data-aos-delay="1000"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-600 mb-2">
                <Image
                  src="/assets/images/svg/mental-health.svg"
                  alt="Partner for Virtual & In-Person Counseling in Malaysia"
                  className="w-8 h-8 filter invert brightness-0 saturate-0"
                  title="Partner for Virtual & In-Person Counseling in Malaysia"
                  width={32}
                  height={32}
                  loading="lazy"
                />
              </div>
              <div>
                <h4 className="font-semibold text-base xl:text-md text-black leading-tight my-2">
                  Mental Health Therapists
                </h4>
                <p className="text-gray-600 text-sm mt-2 sm:mt-0">
                  Connect with clients for virtual or in-home counseling and emotional support.
                </p>
              </div>
            </div>

            <div
              className="bg-[#fef1e7] rounded-xl p-6 flex flex-col justify-between hover:shadow-xl transition w-full h-full items-center text-center sm:items-start sm:text-left gap-2"
              data-aos="zoom-in"
              data-aos-delay="1200"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-600 mb-2">
                <Image
                  src="/assets/images/svg/dietitian.svg"
                  alt="Partner for Personalized Nutrition Plans in Malaysia"
                  className="w-8 h-8 filter invert brightness-0 saturate-0"
                  title="Partner for Personalized Nutrition Plans in Malaysia"
                  width={32}
                  height={32}
                  loading="lazy"
                />
              </div>
              <div>
                <h4 className="font-semibold text-base xl:text-md text-black leading-tight my-2">
                  Dietitians & Nutritionists
                </h4>
                <p className="text-gray-600 text-sm mt-2 sm:mt-0">
                  Help individuals manage health through personalized diet and nutrition plans.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center w-full">
              <Link
                href="/user/register"
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#f3e4e0] flex items-center justify-center transition mb-2"
              >
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                </svg>
              </Link>
              <p className="text-black font-medium text-center text-sm sm:text-base">Register Now</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lab Partners Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 pb-1 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h3
            className="text-2xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight splt-txt"
            data-splitting
            data-aos="fade-in"
          >
            Our Lab Partners
          </h3>
          <p className="text-gray-600 mb-8" data-aos="fade-in" data-aos-duration="400">
            We partner with top labs like Nexus Medilabs, The Synapse Ideal, and Pantai Premier Pathology to ensure
            fast, accurate, and safe diagnostics. These trusted names bring scalable, genetic, and hospital-based lab
            services to homes across Malaysia.
          </p>
          <div className="flex items-center gap-6" data-aos="fade-in" data-aos-duration="400">
            <Link
              href="/user/register"
              className="bg-black text-white font-medium px-5 py-2.5 rounded-md hover:bg-red-600 transition"
            >
              Create account
            </Link>
            <Link href="/contact-us" className="text-gray-800 font-medium hover:underline flex items-center gap-1">
              Contact us →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-8 place-items-center">
          <div className="block" data-aos="fade-in" data-aos-duration="100">
            <Image
              src="/assets/images/services/nexus-logo.svg"
              alt="Logo Of Nexus Lab"
              className="w-[9rem] h-20"
              title="Logo Of Nexus Lab"
              width={144}
              height={80}
              loading="lazy"
            />
          </div>
          <div className="block" data-aos="fade-in" data-aos-duration="200">
            <Image
              src="/assets/images/services/synapse.svg"
              alt="Logo Of Synapse Laboratory"
              className="w-[9rem] h-20"
              title="Logo Of Synapse Laboratory"
              width={144}
              height={80}
              loading="lazy"
            />
          </div>
          <div className="block col-span-2 sm:col-span-1" data-aos="fade-in" data-aos-duration="300">
            <Image
              src="/assets/images/services/premier-labs.svg"
              alt="Logo Of Premier labs"
              className="w-[9rem] h-20 mx-auto"
              title="Logo Of Premier labs"
              width={144}
              height={80}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="w-full text-center">
          <span className="bg-[#dc2626] text-white text-xs sm:text-sm font-semibold px-3 sm:px-5 py-1 sm:py-2 rounded-full inline-block mb-4">
            FAQ
          </span>
          <h3
            className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-6 splt-txt"
            data-splitting
            data-aos="fade-in"
          >
            Know More About <em className="text-red-600">Home Blood Tests </em> In Malaysia
          </h3>
          <p className="mb-8">Everything you need to know about MobiLab2u.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="lg:col-span-7 space-y-6 col-span-12">
            {/* FAQ Items */}
            {[
              {
                question: 'Is MobiLab2u a licensed healthcare provider?',
                answer:
                  "MobiLab2u is a digital platform that connects patients to certified and vetted healthcare providers. All partners are licensed and meet Malaysia's clinical standards.",
              },
              {
                question: 'How do I book an appointment?',
                answer:
                  'You can schedule any service via our app or website by selecting a date, time, and the service you need.',
              },
              {
                question: 'Are my health records safe?',
                answer:
                  'Yes. Your data is protected with bank-grade encryption and follows strict PDPA guidelines for privacy.',
              },
              {
                question: 'Are follow-up cares included in teleconsults?',
                answer:
                  'They do. If, after your initial consultation, you have further questions or ongoing care that needs to be done, you can go back to see the same doctor. We like continuity and ease.',
              },
              {
                question: 'Do I need a prescription to order lab tests or medication?',
                answer:
                  "Not quite. Most of our lab testing isn't prescription-driven; you can choose and select from a selection of test panels yourself. With medication, however, there does have to be a genuine doctor's prescription, which you can obtain via our teleconsultation facility, too, if necessary.",
              },
              {
                question: 'When do I receive my test results?',
                answer:
                  'The majority of the results are available in 24 to 48 hours, varying with the test. We will directly send them to your MobiLab2u account upon completion. You can even schedule a consultation to discuss the results with a doctor.',
              },
            ].map((faq, index) => (
              <div key={index} className="border rounded-lg p-4 sm:p-4 shadow-sm">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(index)}>
                  <h4 className="text-[16px] sm:text-lg font-semibold">{faq.question}</h4>
                  <span className="text-gray-500 text-xl">{openFaqIndex === index ? '✖' : '＋'}</span>
                </div>
                {openFaqIndex === index && (
                  <div className="mt-4 text-[14px] sm:text-[15px] text-gray-700 leading-relaxed">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>

          <div className="lg:col-span-5 col-span-12 text-center">
            <Image
              src="/assets/images/svg/faq.svg"
              width={500}
              height={500}
              className="inline-block"
              title=""
              alt=""
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-[#fef1e7] h-[370px] min-h-[300px] sm:min-h-[380px] md:min-h-[400px] lg:min-h-[370px] xl:min-h-[400px] py-6 pb-24 md:pb-10 flex md:items-center justify-center px-2 md:px-4 relative overflow-hidden">
        <Image
          src="/assets/images/mobilab2u/home-healthcare-application.svg"
          alt="Access Healthcare Services Anytime With Mobile App Malaysia"
          title="Access Healthcare Services Anytime With Mobile App Malaysia"
          className="absolute left-0 bottom-0 max-h-24 max-h-[38%] md:max-h-[43%] lg:max-h-[60%] xl:max-h-[70%] object-contain z-10"
          width={392}
          height={280}
          loading="lazy"
        />

        <Image
          src="/assets/images/mobilab2u/medicine-delivery.svg"
          alt="Fast Prescription Medicine Delivery Services In Malaysia"
          title="Fast Prescription Medicine Delivery Services In Malaysia"
          className="absolute right-0 bottom-0 max-h-24 max-h-[40%] md:max-h-[45%] lg:max-h-[62%] xl:max-h-[70%] object-contain z-10"
          width={308}
          height={280}
          loading="lazy"
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

        {/* Decorative SVG Stars */}
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
            className="w-[45px] h-[45px] drop-shadow-md hover:scale-110 transition-transform duration-300"
            loading="lazy"
            width={45}
            height={45}
          />
        </a>

        <a href="tel:+60125412990" target="_blank" rel="noopener noreferrer">
          <Image
            src="/assets/images/phone-icon.gif"
            alt="phone"
            title="Chat with us"
            className="w-[45px] h-[45px] drop-shadow-md hover:scale-110 transition-transform duration-300 lg:hidden mt-2"
            loading="lazy"
            width={45}
            height={45}
          />
        </a>
      </div>
    </main>
  )
}
