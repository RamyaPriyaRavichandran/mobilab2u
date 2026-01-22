'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { initAOS, initSmoothScroll, initSplitting, initSwiper } from './animations'

export default function HomeHealthcareServices() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0)

  useEffect(() => {
    // Initialize all animations
    initAOS()
    initSplitting()
    initSwiper()
    initSmoothScroll()

    // Header scroll animation
    const handleScroll = () => {
      const header = document.getElementById('main-header')
      const logo = document.getElementById('header-logo')
      const triggerHeight = window.innerHeight / 2

      if (window.scrollY > triggerHeight) {
        header?.classList.add('fixed', 'top-0', 'left-0', 'z-50', 'shadow-md', 'header-anim')
        logo?.classList.remove('w-[160px]', 'h-[80px]')
        logo?.classList.add('w-[100px]', 'h-[60px]')
      } else {
        header?.classList.remove('fixed', 'top-0', 'left-0', 'z-50', 'shadow-md', 'header-anim')
        logo?.classList.remove('w-[100px]', 'h-[60px]')
        logo?.classList.add('w-[160px]', 'h-[80px]')
      }
    }

    // Floating image parallax
    const handleFloatingImage = () => {
      const floatingImage = document.getElementById('floatingImage')
      const section = document.querySelector('.intro-bg')
      if (!floatingImage || !section) return

      const sectionTop = section.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (sectionTop < windowHeight && sectionTop > -section.clientHeight) {
        const scrollProgress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / windowHeight))
        const movement = scrollProgress * 50
        floatingImage.style.transform = `translateY(${movement}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('scroll', handleFloatingImage)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', handleFloatingImage)
    }
  }, [])

  const faqData = [
    {
      question: 'What are the kinds of home healthcare services you have?',
      answer: (
        <>
          We have various services such as{' '}
          <Link
            href={{
              pathname: '/packages',
              query: { serviceType: 'appointment' },
            }}
            className="text-red-600 hover:underline"
            title="Tele Consultation"
          >
            tele consultation
          </Link>
          , home lab tests, delivery of prescription medicines,{' '}
          <Link
            href="/services/home-care-services/geriatric-support"
            className="text-red-600 hover:underline"
            title="Geriatric & Elderly Care Support"
          >
            geriatric care
          </Link>
          , management of chronic wounds, doctor & nurse home visits, physiotherapy, and post-surgery care.
        </>
      ),
    },
    {
      question: 'How do I schedule a lab test at home?',
      answer: (
        <>
          Just download our{' '}
          <Link href="/app" className="text-red-600 hover:underline" title="MobiLab2u App">
            MobiLab2u app
          </Link>
          , select Home Lab Test, pick a suitable date and time, and our trained professionals will come to your home to
          take samples.
        </>
      ),
    },
    {
      question: 'Is it possible to have an online doctor consultation on any health related problem?',
      answer:
        'Yes, our licensed doctors provide instant online consultation on general health, chronic ailments, follow-up and post-surgery services.',
    },
    {
      question: 'How is prescription medicine delivered?',
      answer:
        'After your consultation, you can receive any prescription, and the medications will be delivered safely to your doorstep through the app.',
    },
    {
      question: 'What type of support do you have for older patients?',
      answer: (
        <>
          We have{' '}
          <Link
            href="/services/home-care-services/geriatric-support"
            className="text-red-600 hover:underline"
            title="Geriatric & Elderly Care Support"
          >
            geriatric support
          </Link>{' '}
          in the home with regular visits, medication management, mobilization, and individualized care for the elderly.
        </>
      ),
    },
    {
      question: 'Do you offer physiotherapy or rehabilitation in the home?',
      answer: (
        <>
          Yes, our{' '}
          <Link
            href="/services/home-care-services/homephysiotherapist"
            className="text-red-600 hover:underline"
            title="Home Physiotherapist"
          >
            certified physiotherapists
          </Link>{' '}
          come to your home to deliver rehabilitation, mobility assistance, and recovery plans that suit you.
        </>
      ),
    },
    {
      question: "May I arrange follow-up treatment following a doctor's visit or laboratory examination?",
      answer:
        'Yes. You may arrange for follow-up consultations, re-testings, or home care packages to maintain ongoing monitoring and recuperation.',
    },
    {
      question: 'Are the services of your company offered nationwide in Malaysia?',
      answer:
        'Yes, MobiLab2u offers home healthcare services across the country, reaching major cities and towns in Malaysia.',
    },
  ]

  return (
    <main>
      {/* Breadcrumb Section */}
      <section className="bg-[#fef1e7] pt-8 pb-16 md:pt-[3rem] md:pb-[6rem]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-[20px] md:text-3xl font-bold text-black mb-2">
            Trusted Home Healthcare Services Across Malaysia
          </h1>
          <ul className="flex justify-center gap-0 text-sm text-black font-semibold mt-[24px]">
            <li className="flex items-center gap-1">
              <Image src="/assets/images/svg/home.svg" alt="" width={16} height={16} className="w-4 h-4" />
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span className="mx-[5px]">›</span>
            </li>
            <li className="text-gray-500">Services</li>
          </ul>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 pt-8 pb-12 sm:py-16">
        <div className="mb-6 md:mb-12">
          <h2
            className="text-[18px] lg:text-4xl md:text-2xl font-bold text-gray-900 mb-3 text-center splt-txt"
            data-splitting
            data-aos="fade-in"
          >
            On Demand <em className="text-red-600">Home Healthcare</em> Services in Malaysia
          </h2>
          <p className="text-[14px] sm:text-base text-gray-800 text-center mb-4">
            Convenient medical support delivered right to your doorstep.
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {/* Service Card 1 */}
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
              alt="At-home Blood Sample Collection"
              width={225}
              height={150}
              className="block xl:hidden w-full mt-5"
            />
          </div>

          {/* Service Card 2 */}
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
              alt="Tele Consultation"
              width={225}
              height={150}
              className="block xl:hidden w-full mt-5"
            />
          </div>

          {/* Service Card 3 - Coming Soon */}
          <div
            className="relative bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition transform duration-300 hover:-translate-y-2 p-6 md:pb-6 xl:flex items-center justify-between xl:bg-[url('/assets/images/services/prescription-medition-delivery.svg')] xl:bg-cover xl:bg-center"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              Coming Soon
            </span>
            <div className="w-full xl:w-[68%] z-10 relative">
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-left mt-5 sm:mt-0">
                Prescription Medication Delivery
              </h3>
              <p className="text-[#000] text-[14px] sm:text-base leading-relaxed text-left">
                Get your prescribed medicines delivered safely and quickly to your doorstep.
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
                  href="/user/login"
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
              alt="Prescription Medication Delivery"
              width={225}
              height={150}
              className="block xl:hidden w-full mt-5"
            />
          </div>

          {/* Service Card 4 - Coming Soon */}
          <div
            className="relative bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition transform duration-300 hover:-translate-y-2 p-6 md:pb-6 xl:flex items-center justify-between xl:bg-[url('/assets/images/services/home-care-services.svg')] xl:bg-cover xl:bg-center"
            data-aos="fade-up"
            data-aos-delay="900"
          >
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              Coming Soon
            </span>
            <div className="w-full xl:w-[68%] z-10 relative">
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-left">Home Care Services</h3>
              <p className="text-[#000] text-[14px] sm:text-base leading-relaxed text-left">
                Receive professional medical care at home with personalized support.
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
                  href="/user/login"
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
              alt="Home Care Services"
              width={225}
              height={150}
              className="block xl:hidden w-full mt-5"
            />
          </div>
        </div>
      </section>

      {/* Why MobiLab2u Section */}
      <section className="py-8 sm:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-[7rem] px-4">
          <div className="flex-1" data-aos="fade-right">
            <h2
              className="text-[18px] lg:text-4xl md:text-2xl font-bold text-gray-900 mb-3 text-center splt-txt lg:text-left"
              data-splitting
              data-aos="fade-in"
            >
              Why Is <em className="text-red-600">MobiLab2u</em> Your Go-To Home Healthcare Partner?
            </h2>
            <p className="text-[14px] sm:text-base text-justify sm:text-left mb-6 max-w-full">
              MobiLab2u brings healthcare directly to your home. Our platform connects you with licensed doctors,
              trained nurses, and certified healthcare professionals to ensure fast, reliable, and comfortable care
            </p>
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
                  <p className="text-[14px] sm:text-base text-gray-700">Care from the comfort of your home</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  </div>
                  <p className="text-[14px] sm:text-base text-gray-700">Professional medical staff</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  </div>
                  <p className="text-[14px] sm:text-base text-gray-700">Quick lab results and medicine delivery</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  </div>
                  <p className="text-[14px] sm:text-base text-gray-700">Personalized care for every patient</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex-1 w-full" data-aos="fade-left">
            <Image
              src="/assets/images/mobilab2u/home-healthcare-partner.webp"
              alt="Licensed doctors, trained nurses, & healthcare professionals providing reliable home care in Malaysia"
              width={568}
              height={480}
              className="h-[400px] sm:h-[600px] md:h-[480px] w-full sm:w-[550px] md:w-[650px] lg:w-[700px] rounded-2xl object-cover shadow-lg mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Process Flow Section */}
      <section className="py-12 md:py-20 bg-[#fef1e7]">
        <div className="max-w-6xl mx-auto px-4" data-aos="fade-up">
          <h3
            className="text-[18px] lg:text-4xl md:text-2xl font-bold text-[#1d1d1f] mb-6 splt-txt text-center"
            data-splitting
            data-aos="fade-in"
          >
            From <em className="text-red-600">Symptoms to Recovery</em> Home Healthcare Made Easy
          </h3>
          <p className="text-[14px] sm:text-base text-gray-600 text-center mb-5">
            We make healthcare simple, personal, and accessible. Here&apos;s how your care flows with MobiLab2u:
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-6">
            {[
              { icon: '/assets/images/svg/symptom.svg', label: 'Symptom' },
              { icon: '/assets/images/svg/online-consult.svg', label: 'Online Consult' },
              { icon: '/assets/images/svg/lab-testing-service.svg', label: 'Lab Test' },
              { icon: '/assets/images/svg/blood-test-report.svg', label: 'Results' },
              { icon: '/assets/images/svg/medicine.svg', label: 'Medicine' },
              { icon: '/assets/images/svg/follow-up-care.svg', label: 'Follow-Up Care' },
            ].map((step, index) => (
              <li key={index} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-md mb-2">
                    <Image
                      src={step.icon || '/placeholder.svg'}
                      alt={step.label}
                      width={48}
                      height={48}
                      className="w-12 h-12"
                    />
                  </div>
                  <span className="text-sm sm:text-base font-semibold text-gray-800">{step.label}</span>
                </div>
                {index < 5 && <span className="mx-4 text-gray-400 text-2xl hidden sm:inline">→</span>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h3
            className="text-[18px] lg:text-4xl md:text-2xl font-bold text-[#1d1d1f] mb-6 text-center splt-txt"
            data-splitting
            data-aos="fade-in"
          >
            Quality <em className="text-red-600">Home Healthcare</em> for Everyone
          </h3>
          <p className="text-[14px] sm:text-base text-center text-gray-600 mb-5">
            At MobiLab2u, we provide home healthcare services tailored to meet the needs of different groups:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-aos="fade-up">
            {[
              {
                icon: '/assets/images/svg/families.svg',
                title: 'Families',
                desc: 'Convenient medical care without the hassle of hospital visits.',
              },
              {
                icon: '/assets/images/svg/elder-patient.svg',
                title: 'Elderly Patients',
                desc: 'Specialized geriatric support delivered at home.',
              },
              {
                icon: '/assets/images/svg/working.svg',
                title: 'Working Professionals',
                desc: 'Quick and easy online consultations at your convenience',
              },
              {
                icon: '/assets/images/svg/injured-patients.svg',
                title: 'Post-Surgical Patients',
                desc: 'Professional recovery support and follow-up care at home.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-[#fef1e7] rounded-xl shadow-xs p-6 pb-0 flex flex-col items-start hover:shadow-md transition border border-gray-200"
              >
                <Image
                  src={item.icon || '/placeholder.svg'}
                  alt={item.title}
                  width={48}
                  height={48}
                  className="w-12 h-12 mb-10"
                />
                <h4 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-[14px] text-gray-600 mb-5">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-[14px] sm:text-base text-center text-gray-600 mt-10">
            Our services are designed to ensure comfort, convenience, and quality care for every patient.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 py-8 sm:py-16 overflow-hidden">
        <div className="w-full text-center">
          <span className="bg-[#dc2626] text-white text-sm font-semibold px-5 py-2 rounded-full inline-block mb-4">
            FAQ
          </span>
          <h3
            className="text-[18px] lg:text-4xl md:text-2xl font-bold text-gray-900 mb-6 splt-txt"
            data-splitting
            data-aos="fade-in"
          >
            Everything You Need to Know <em className="text-red-600">About Home Care</em> Services
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full" data-aos="fade-right">
          <div className="col-span-12 space-y-6">
            {faqData.map((faq, index) => (
              <div key={index} className="border rounded-lg shadow-sm p-4 sm:p-6">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? -1 : index)}
                >
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

      {/* CTA Section */}
      <section className="bg-[#fef1e7] h-[370px] min-h-[300px] sm:min-h-[380px] md:min-h-[400px] lg:min-h-[370px] xl:min-h-[400px] py-6 pb-24 md:pb-10 flex md:items-center justify-center px-2 md:px-4 relative overflow-hidden">
        <Image
          src="/assets/images/mobilab2u/home-healthcare-application.svg"
          alt="Access Healthcare Services Anytime With Mobile App Malaysia"
          width={392}
          height={280}
          className="absolute left-0 bottom-0 max-h-24 max-h-[38%] md:max-h-[43%] lg:max-h-[60%] xl:max-h-[70%] object-contain z-10"
        />
        <Image
          src="/assets/images/mobilab2u/medicine-delivery.svg"
          alt="Fast Prescription Medicine Delivery Services In Malaysia"
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
            </Link>
            <Link
              href="tel:+60125412990"
              className="border border-gray-300 hover:border-black text-black px-4 py-2 md:px-6 md:py-3 rounded-md font-semibold bg-white shadow text-sm md:text-base"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>

        {/* Decorative SVG Stars */}
        <div className="absolute left-[2%] top-[20%] md:left-[24%] lg:left-[27%] md:top-[40%] rotate-45 z-0">
          <svg width="48" height="54" viewBox="0 0 193 216" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M55.3 109.9C54.2 109.7 53.3 109.6 52.6 109.3C47.1 106.4 41.7 103.4 36.2 100.7C29.4667 97.4333 22.4333 95.1333 15.1 93.8C10.3 92.9 5.49999 91.9 0.899992 91C-0.200008 89.5 1.69999 88.3 0.699992 87C1.99999 86.1 3.19999 86.3 4.49999 86.5C6.69999 87 8.99999 87.5 11.2 88C15 88.8 18.8 89 22.6 88.7C28.9 88.2 35.2 87.7 41.5 86.9C46.1 86.3 50.6 85.2 54.8 83C56.8 82 58.9 81.4 60.9 80.4C62.3 79.6 63.6 78.6 65 77.8C70.6 74.7 75.8 71.1 80.4 66.5C86 61 90.3 54.4999 95 48.2999C100.3 41.1999 102.7 32.9 104.7 24.5C106.3 17.5 108.3 10.6 109 3.39995C109.1 2.49995 109.5 1.69995 109.8 0.799951C110.333 0.799951 110.867 0.766618 111.4 0.699951C111.5 0.999951 111.7 1.29995 111.7 1.49995C111.5 4.09995 111.2 6.69995 111.2 9.29995C111.2 14.9 111.3 20.5 111.3 26.1C111.3 32.5 111.4 38.9 111.4 45.4C111.3 51.5 112.4 57.3 114.8 62.9C115.3 64.1 115.7 65.4 115.9 66.7C116.5 70.5 118.3 73.7 120.9 76.5C123.1 78.8 125 81.2 127.2 83.5C129.9 86.5 133.3 88.6 136.8 90.4C139.8 91.9333 142.7 93.5666 145.5 95.3C149.3 97.6 153.5 98.9 157.8 100C161.7 100.9 165.7 101.8 169.6 102.9C173.7 104 177.8 104.3 181.9 104.7C185.2 105.1 188.5 105.5 192.3 105.9C191.7 106.5 191.4 107 191.2 107C183.4 107.2 175.5 107.3 167.8 107.7C163.5 108 159.3 108.6 155.2 109.4C150.3 110.3 145.4 111.4 140.7 112.7C135.5 114.1 130.4 115.9 125.4 117.7C120.5 119.4 116.5 122.5 112.5 125.9C109.2 128.9 107.6 133 105 136.4C101.4 141 99.7 146.6 98.2 152.2C95.7 161.7 93.2 171.3 91.1 180.9C89 190.7 87.4 200.6 86.7 210.6C86.6 211.8 86.1 212.9 85.7 214.1C85.5 214.4 85 214.7 84.7 214.9C83.8 214.2 83 213.5 82.3 212.8C81.3 212 81.1 210.9 81.2 209.7C81.4 202.8 81.8 195.9 82 189C82.1 183.9 82.4 178.7 82.1 173.6C81.7 167.5 80.9 161.4 79.9 155.4C79.3 151.7 78 148 76.9 144.4C75.6 139.8 73.4 135.6 71.7 131.3C70.7 128.7 68.9 126.5 68.1 123.9C67.9 123.5 67.4 123.3 67.1 123C66.8 122.7 66.4 122.5 66.2 122.2C64.7 118.2 60.9 116.2 58.6 112.8C58.4 112.5 57.8 112.4 57.4 112.2C56.4 111.6 55.2 111.2 55.3 109.9Z"
              fill="#100F12"
            />
          </svg>
        </div>
        <div className="absolute right-4 top-[7rem] sm:right-[25%] md:right-[20%] lg:right-[26%] sm:top-[13rem] rotate-45 scale-100 opacity-100 z-0 w-10 h-10 sm:w-auto sm:h-auto">
          <svg width="42" height="42" viewBox="0 0 193 216" fill="none" className="w-full h-full">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M55.3 109.9C54.2 109.7 53.3 109.6 52.6 109.3C47.1 106.4 41.7 103.4 36.2 100.7C29.4667 97.4333 22.4333 95.1333 15.1 93.8C10.3 92.9 5.49999 91.9 0.899992 91C-0.200008 89.5 1.69999 88.3 0.699992 87C1.99999 86.1 3.19999 86.3 4.49999 86.5C6.69999 87 8.99999 87.5 11.2 88C15 88.8 18.8 89 22.6 88.7C28.9 88.2 35.2 87.7 41.5 86.9C46.1 86.3 50.6 85.2 54.8 83C56.8 82 58.9 81.4 60.9 80.4C62.3 79.6 63.6 78.6 65 77.8C70.6 74.7 75.8 71.1 80.4 66.5C86 61 90.3 54.4999 95 48.2999C100.3 41.1999 102.7 32.9 104.7 24.5C106.3 17.5 108.3 10.6 109 3.39995C109.1 2.49995 109.5 1.69995 109.8 0.799951C110.333 0.799951 110.867 0.766618 111.4 0.699951C111.5 0.999951 111.7 1.29995 111.7 1.49995C111.5 4.09995 111.2 6.69995 111.2 9.29995C111.2 14.9 111.3 20.5 111.3 26.1C111.3 32.5 111.4 38.9 111.4 45.4C111.3 51.5 112.4 57.3 114.8 62.9C115.3 64.1 115.7 65.4 115.9 66.7C116.5 70.5 118.3 73.7 120.9 76.5C123.1 78.8 125 81.2 127.2 83.5C129.9 86.5 133.3 88.6 136.8 90.4C139.8 91.9333 142.7 93.5666 145.5 95.3C149.3 97.6 153.5 98.9 157.8 100C161.7 100.9 165.7 101.8 169.6 102.9C173.7 104 177.8 104.3 181.9 104.7C185.2 105.1 188.5 105.5 192.3 105.9C191.7 106.5 191.4 107 191.2 107C183.4 107.2 175.5 107.3 167.8 107.7C163.5 108 159.3 108.6 155.2 109.4C150.3 110.3 145.4 111.4 140.7 112.7C135.5 114.1 130.4 115.9 125.4 117.7C120.5 119.4 116.5 122.5 112.5 125.9C109.2 128.9 107.6 133 105 136.4C101.4 141 99.7 146.6 98.2 152.2C95.7 161.7 93.2 171.3 91.1 180.9C89 190.7 87.4 200.6 86.7 210.6C86.6 211.8 86.1 212.9 85.7 214.1C85.5 214.4 85 214.7 84.7 214.9C83.8 214.2 83 213.5 82.3 212.8C81.3 212 81.1 210.9 81.2 209.7C81.4 202.8 81.8 195.9 82 189C82.1 183.9 82.4 178.7 82.1 173.6C81.7 167.5 80.9 161.4 79.9 155.4C79.3 151.7 78 148 76.9 144.4C75.6 139.8 73.4 135.6 71.7 131.3C70.7 128.7 68.9 126.5 68.1 123.9C67.9 123.5 67.4 123.3 67.1 123C66.8 122.7 66.4 122.5 66.2 122.2C64.7 118.2 60.9 116.2 58.6 112.8C58.4 112.5 57.8 112.4 57.4 112.2C56.4 111.6 55.2 111.2 55.3 109.9Z"
              fill="#100F12"
            />
          </svg>
        </div>
      </section>

      {/* WhatsApp & Phone Floating Buttons */}
      <div className="fixed right-1 sm:right-4 top-1/2 transform -translate-y-1/2 z-50">
        <Link href="https://wa.me/+60125412990?text=How we can help you?" target="_blank" rel="noopener noreferrer">
          <Image
            src="/assets/images/svg/whatsapp.gif"
            alt="WhatsApp"
            width={45}
            height={45}
            className="w-[45px] h-[45px] drop-shadow-md hover:scale-110 transition-transform duration-300"
          />
        </Link>
        <Link href="tel:+60125412990" target="_blank" rel="noopener noreferrer">
          <Image
            src="/assets/images/phone-icon.gif"
            alt="phone"
            width={45}
            height={45}
            className="w-[45px] h-[45px] drop-shadow-md hover:scale-110 transition-transform duration-300 lg:hidden mt-2"
          />
        </Link>
      </div>
    </main>
  )
}
