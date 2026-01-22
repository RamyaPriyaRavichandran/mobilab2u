'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { initAOS, initSmoothScroll, initSplitting, initSwiper } from './animations'

export default function HomePhysiotherapist() {
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
            At-Home Physiotherapist & Rehabilitation Services In Malaysia
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
            <li className="text-gray-500">Home Physiotherapist</li>
          </ul>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-[url('/assets/images/bg/shape-06.webp')] bg-no-repeat bg-cover bg-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-8 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-left">
            <h2
              className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#1d1d1f] mb-6 splt-txt text-center sm:text-left"
              data-splitting
              data-aos="fade-in"
            >
              Home-Based <em className="text-red-600">Physiotherapy & Rehab</em> Services in Malaysia
            </h2>
            <p className="text-[14px] sm:text-base text-gray-600 mb-[1.5rem] sm:mb-10 text-justify sm:text-left">
              MobiLab2u gives you the benefit of professional physiotherapy and rehabilitation in the comfort of your
              own home. If you are recovering from surgery, suffering from{' '}
              <Link href="/home-chronic-wound-care" className="text-red-600" title="Chronic Wound Care Treatment">
                chronic pain,
              </Link>{' '}
              or assisting a loved one with mobility, you will receive individualized expert-quality care by licensed
              physiotherapists in the location and comfort of your choice.
            </p>

            <p className="text-[14px] sm:text-base text-gray-600 mb-[1.5rem] sm:mb-10 text-justify sm:text-left">
              Sessions are completely individualized to your goals, physical needs and limitations, and physical
              comfort. Each session provides one-on-one time with{' '}
              <Link href="/healthcare-counseling-services" className="text-red-600" title="">
                licensed professionals,
              </Link>{' '}
              using the same criteria you would qualify for at a hospital, only more convenient and more private,
              scheduled completely at your discretion.
            </p>

            <p className="text-[14px] sm:text-base mt-4 mb-0">Experience the difference of home-based care when:</p>

            <ul className="space-y-2 mt-5">
              <li className="flex items-start gap-2">
                <span className="mt-1 min-w-4 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-[14px] sm:text-base font-semibold text-[#001e2b]">
                  Travel is challenging due to age, injury, or medical condition
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 min-w-4 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-[14px] sm:text-base font-semibold text-[#001e2b]">
                  You&apos;re recovering from surgery or a recent hospital stay
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 min-w-4 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-[14px] sm:text-base font-semibold text-[#001e2b]">
                  Daily movement is painful, limited, or difficult to manage alone
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 min-w-4 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-[14px] sm:text-base font-semibold text-[#001e2b]">
                  A loved one needs therapy but prefers the comfort of home
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 min-w-4 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-[14px] sm:text-base font-semibold text-[#001e2b]">
                  Time, privacy, or convenience is a top priority
                </span>
              </li>
            </ul>

            <p className="text-[14px] sm:text-base mt-5">
              Your therapist meets you where you are, physically and in your healing journey. It&apos;s rehabilitation
              designed around your needs, not the clinic&apos;s calendar.
            </p>
          </div>

          <div className="flex justify-center" data-aos="fade-right">
            <Image
              src="/assets/images/services/home-based-physiotherapy-rehab-services.webp"
              alt="Receive an expert physiotherapy and rehabilitation services conveniently at your home in Malaysia."
              title="Home-based Physiotherapy & Rehab Services In Malaysia"
              width={592}
              height={540}
              className="max-w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto py-8 md:py-12 px-4 overflow-hidden">
        <h3
          className="text-[18px] sm:text-4xl font-bold text-gray-900 sm:mb-12 mb-6 text-center splt-txt"
          data-splitting
          data-aos="fade-in"
        >
          Home <em className="text-red-600"> Rehab & Physio </em> Services for Various Conditions
        </h3>

        <p className="text-center mb-5">
          MobiLab2u provides a wide variety of treatments at home in all physical rehabilitation areas:
        </p>

        <div className="bg-[#fef1e7] p-6 rounded-2xl shadow">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Service 1: Post-Surgery Rehabilitation */}
            <div>
              <div className="mt-4">
                <button
                  onClick={() => toggleService(0)}
                  className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                      <Image
                        src="/assets/images/svg/post-surgical-care.svg"
                        alt="Post-surgery Rehabilitation Services At Home, Malaysia"
                        title="Post-surgery Rehabilitation Services At Home, Malaysia"
                        width={40}
                        height={40}
                        className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                      />
                    </div>
                    <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                      Post-Surgery Rehabilitation
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
                      Focused rehabilitation to regain mobility and strength after surgery.
                    </p>
                    <p className="text-gray-600 mb-2">
                      <strong> Includes:</strong>
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
                        Hip and knee joint replacements
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
                        ACL and orthopaedic procedures
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
                        Recovery after spinal procedures
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

            {/* Service 2: Neurological Rehabilitation */}
            <div>
              <div className="mt-4">
                <button
                  onClick={() => toggleService(1)}
                  className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                      <Image
                        src="/assets/images/svg/neurology-rehab.svg"
                        alt="Neurological Rehabilitation Services At Home In Malaysia"
                        title="Neurological Rehabilitation Services At Home In Malaysia"
                        width={40}
                        height={40}
                        className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                      />
                    </div>
                    <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                      Neurological Rehabilitation
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
                      Specialized therapy to improve neurological function and daily living skills.
                    </p>
                    <p className="text-gray-600 mb-2">
                      <strong> Includes:</strong>
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
                        Stroke recovery
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
                        Parkinson&apos;s disease
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
                        Multiple sclerosis
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

            {/* Service 3: Musculoskeletal Pain & Injury */}
            <div>
              <div className="mt-4">
                <button
                  onClick={() => toggleService(2)}
                  className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                      <Image
                        src="/assets/images/svg/muscloskeletal-rehab.svg"
                        alt="Musculoskeletal Pain & Injury Rehab Physiotherapy, Malaysia"
                        title="Musculoskeletal Pain & Injury Rehab Physiotherapy, Malaysia"
                        width={40}
                        height={40}
                        className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                      />
                    </div>
                    <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                      Musculoskeletal Pain & Injury
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
                      Treatment to relieve pain, restore function, and improve posture.
                    </p>
                    <p className="text-gray-600 mb-2">
                      <strong> Includes:</strong>
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
                        Back or neck pain
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
                        Shoulder stiffness and joint strain
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
                        Postural misalignments
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

            {/* Service 4: Sports Injuries */}
            <div>
              <div className="mt-2">
                <button
                  onClick={() => toggleService(3)}
                  className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                      <Image
                        src="/assets/images/svg/sports-rehab-injury.svg"
                        alt="Sports Injury Recovery & Physiotherapy At Home, Malaysia"
                        title="Sports Injury Recovery & Physiotherapy At Home, Malaysia"
                        width={40}
                        height={40}
                        className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                      />
                    </div>
                    <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                      Sports Injuries
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
                      Targeted recovery programs for athletes and active individuals.
                    </p>
                    <p className="text-gray-600 mb-2">
                      <strong> Includes:</strong>
                    </p>

                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        Ligament and tendon injuries
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        Athletic trauma recovery
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        Performance rehabilitation
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

            {/* Service 5: Chronic Pain & Degenerative Conditions */}
            <div>
              <div className="mt-2">
                <button
                  onClick={() => toggleService(4)}
                  className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                      <Image
                        src="/assets/images/svg/chronic-pain-rehab.svg"
                        alt="Chronic Pain & Degenerative Condition Rehab In Malaysia"
                        title="Chronic Pain & Degenerative Condition Rehab In Malaysia"
                        width={40}
                        height={40}
                        className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                      />
                    </div>
                    <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                      Chronic Pain & Degenerative Conditions
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
                    <p className="text-gray-600 mb-4">Managing long-term pain and improving quality of life.</p>
                    <p className="text-gray-600 mb-2">
                      <strong> Includes:</strong>
                    </p>

                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        Osteoarthritis and rheumatoid arthritis
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        Fibromyalgia
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        Persistent fatigue or inflammation
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

            {/* Service 6: Pediatric Physiotherapy */}
            <div>
              <div className="mt-2">
                <button
                  onClick={() => toggleService(5)}
                  className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                      <Image
                        src="/assets/images/svg/pediatric-rehab.svg"
                        alt="Pediatric Physiotherapy & Rehabilitation Services, Malaysia"
                        title="Pediatric Physiotherapy & Rehabilitation Services, Malaysia"
                        width={40}
                        height={40}
                        className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                      />
                    </div>
                    <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                      Pediatric Physiotherapy
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
                      Therapy designed to improve motor development and coordination in children.
                    </p>
                    <p className="text-gray-600 mb-1">
                      <strong> Includes:</strong>
                    </p>

                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        Motor skill delays
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        Cerebral palsy
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        Posture and coordination issues
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

            {/* Service 7: Geriatric & Elderly Care */}
            <div>
              <div className="mt-2">
                <button
                  onClick={() => toggleService(6)}
                  className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                      <Image
                        src="/assets/images/svg/geriatric-rehab.svg"
                        alt="Geriatric Physiotherapy Services At Home In Malaysia"
                        title="Geriatric Physiotherapy Services At Home In Malaysia"
                        width={40}
                        height={40}
                        className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                      />
                    </div>
                    <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                      Geriatric & Elderly Care
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
                    <p className="text-gray-600 mb-4">
                      Programs to support mobility, strength, and independence in older adults.
                    </p>
                    <p className="text-gray-600 mb-4">
                      <strong> Includes:</strong>
                    </p>

                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        Fall prevention
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        Balance and strength training
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        Age-related mobility support
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

            {/* Service 8: Cardiopulmonary Rehabilitation */}
            <div>
              <div className="mt-2">
                <button
                  onClick={() => toggleService(7)}
                  className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                      <Image
                        src="/assets/images/svg/cardiopulnonary-rehab.svg"
                        alt="Cardiopulmonary Rehabilitation Services At Home Malaysia"
                        title="Cardiopulmonary Rehabilitation Services At Home Malaysia"
                        width={40}
                        height={40}
                        className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                      />
                    </div>
                    <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                      Cardiopulmonary Rehabilitation
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${openServiceIndex === 7 ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {openServiceIndex === 7 && (
                  <div className="bg-white p-4 mt-2 rounded-2xl shadow text-sm text-gray-700">
                    <p className="text-gray-600 mb-4">Improving lung and heart function for better overall health.</p>
                    <p className="text-gray-600 mb-4">
                      <strong> Includes:</strong>
                    </p>

                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        Post-COVID recovery
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        Therapy for COPD and breathing difficulties
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        Aftercare for heart conditions
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

        <p className="text-[14px] sm:text-base text-center mb-5 mt-5">
          Our physiotherapy services follow strict professional and safety guidelines. We provide evidence-based
          treatments and do not offer therapies or procedures that fall outside certified practice standards.
        </p>
      </section>

      {/* How to Book Section */}
      <section className="relative py-8 px-4 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-5 text-center">
          How to Book <em className="text-red-600">Physiotherapy at Home </em>with MobiLab2u?
        </h2>

        <div className="relative flex flex-col lg:flex-row max-w-7xl mx-auto gap-6 lg:gap-10">
          {/* Left Image Section */}
          <div className="w-full lg:w-1/2">
            <div className="lg:sticky lg:top-40 flex justify-center items-start" data-aos="fade-right">
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                <Image
                  src="/assets/images/services/book-physiotherapy-home-with-mobilab2u.svg"
                  alt="Get trusted physiotherapy at home with expert care, comfort, and recovery support in Malaysia."
                  title="Book Physiotherapy Services At Home In Malaysia"
                  width={512}
                  height={341}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Cards Section */}
          <div className="w-full lg:w-1/2" data-aos="fade-up">
            {/* Card 1 */}
            <div className="relative z-10 card bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-lg transition p-6 overflow-hidden mb-8">
              <div className="flex items-start gap-5 relative z-10">
                <Image
                  src="/assets/images/svg/select-service.svg"
                  alt="Select Physiotherapy Service For Home Visit In Malaysia"
                  title="Select Physiotherapy Service For Home Visit In Malaysia"
                  width={48}
                  height={48}
                  className="shrink-0 w-12 sm:w-12"
                />
                <div>
                  <h3 className="text-[16px] sm:text-xl font-semibold text-gray-900">
                    Select the Physiotherapy Service
                  </h3>
                  <p className="mt-2 text-gray-600 text-[14px] sm:text-base text-justify sm:text-left">
                    Click on the &quot;Physiotherapy&quot; option from the list of home visit services available on our
                    website.
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
                  src="/assets/images/svg/date-select-time.svg"
                  alt="Choose Convenient Date & Time For Physiotherapy, Malaysia"
                  title="Choose Convenient Date & Time For Physiotherapy, Malaysia"
                  width={56}
                  height={56}
                  className="shrink-0 w-16 sm:w-14"
                />
                <div>
                  <h3 className="text-[16px] sm:text-xl font-semibold text-gray-900">Choose Date & Time</h3>
                  <p className="mt-2 text-gray-600 text-[14px] sm:text-base text-justify sm:text-left">
                    Select a date and time that works best for you. We offer flexible scheduling to match your
                    availability.
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
                  src="/assets/images/svg/patient-details.svg"
                  alt="Patient Details For Home Physiotherapy Appointment Malaysia"
                  title="Patient Details For Home Physiotherapy Appointment Malaysia"
                  width={56}
                  height={56}
                  className="shrink-0 w-16 sm:w-14"
                />
                <div>
                  <h3 className="text-[16px] sm:text-xl font-semibold text-gray-900">Enter Patient Details</h3>
                  <p className="mt-2 text-gray-600 text-[14px] sm:text-base text-justify sm:text-left">
                    Provide the patient&apos;s name, address, and contact number. This helps us prepare for your home
                    visit accurately.
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
                  src="/assets/images/svg/review-condirm-booking.svg"
                  alt="Review & Confirm Physiotherapy Appointment At Home Malaysia"
                  title="Review & Confirm Physiotherapy Appointment At Home Malaysia"
                  width={56}
                  height={56}
                  className="shrink-0 w-16 sm:w-14"
                />
                <div>
                  <h3 className="text-[16px] sm:text-xl font-semibold text-gray-900">Review & Confirm Booking</h3>
                  <p className="mt-2 text-gray-600 text-[14px] sm:text-base text-justify sm:text-left">
                    Check all the entered details and confirm your appointment. You&apos;ll receive a booking
                    confirmation instantly.
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
                  src="/assets/images/svg/prepare-doctor-cisit.svg"
                  alt="Prepare Home In Advance For Physiotherapy Session, Malaysia"
                  title="Prepare Home In Advance For Physiotherapy Session, Malaysia"
                  width={56}
                  height={56}
                  className="shrink-0 w-16 sm:w-14"
                />
                <div>
                  <h3 className="text-[16px] sm:text-xl font-semibold text-gray-900">Prepare for the Visit</h3>
                  <p className="mt-2 text-gray-600 text-[14px] sm:text-base text-justify sm:text-left">
                    Make sure someone is available at home during the scheduled time to receive the physiotherapist.
                  </p>
                </div>
              </div>
              <span className="absolute bottom-4 right-6 text-[5rem] font-bold text-gray-100 opacity-70 pointer-events-none leading-none z-0">
                05
              </span>
            </div>

            {/* Card 6 */}
            <div className="relative z-10 card bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-lg transition p-6 overflow-hidden mb-8">
              <div className="flex items-start gap-5 relative z-10">
                <Image
                  src="/assets/images/svg/receive-care-home.svg"
                  alt="Receive Personalized Physiotherapy Care At Home In Malaysia"
                  title="Receive Personalized Physiotherapy Care At Home In Malaysia"
                  width={56}
                  height={56}
                  className="shrink-0 w-16 sm:w-14"
                />
                <div>
                  <h3 className="text-[16px] sm:text-xl font-semibold text-gray-900">Receive Care at Home</h3>
                  <p className="mt-2 text-gray-600 text-[14px] sm:text-base text-justify sm:text-left">
                    Our licensed physiotherapist will arrive fully equipped and provide safe, personalized treatment in
                    your home.
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

      {/* Safety Measures Section */}
      <section className="py-4 sm:py-12 overflow-hidden">
        <h3
          className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-6 sm:mb-12 text-center splt-txt"
          data-splitting
          data-aos="fade-in"
        >
          Safety Measures for Home <em className="text-red-600"> Physio & Rehab </em> Visits
        </h3>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up">
          {/* Card 1 */}
          <div className="bg-[#fef1e7] rounded-2xl p-6">
            <h4 className="text-base sm:text-xl font-semibold text-gray-800 mb-4">
              Licensed & Experienced Practitioners
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>All physiotherapists are certified in Malaysia</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Services follow MOH (Ministry of Health) guidelines</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Every case is reviewed and monitored for clinical progress</span>
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="bg-[#fef1e7] rounded-2xl p-6">
            <h4 className="text-base sm:text-xl font-semibold text-gray-800 mb-4">Hygiene & Infection Control</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Equipment is disinfected before and after use</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Therapists wear protective gear as needed</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Visits adhere to stringent cleanliness protocols</span>
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-[#fef1e7] rounded-2xl p-6">
            <h4 className="text-base sm:text-xl font-semibold text-gray-800 mb-4">Integrated, Continuous Care</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Care is customized to your unique recovery needs</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Therapy plans are updated based on your healing progress</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Follow-up sessions are easy to book and manage via MobiLab2u</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Who Can Benefit Section */}
      <section className="py-8 sm:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-[7rem] px-4">
          {/* Left Content */}
          <div className="flex-1" data-aos="fade-right">
            <h3
              className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#1d1d1f] mb-6 text-center sm:text-left splt-txt"
              data-splitting
              data-aos="fade-in"
            >
              Who Can Benefit From Our <em className="text-red-600"> Home Physiotherapy</em> Services?
            </h3>
            <p className="text-[14px] sm:text-base text-justify mb-6 max-w-md">
              MobiLab2u&apos;s at-home physiotherapy is ideal for:
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
                  <p className="text-[14px] sm:text-base text-gray-700">Post-surgery patients in recovery </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  </div>
                  <p className="text-[14px] sm:text-base text-gray-700">Seniors seeking support for daily movement </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  </div>
                  <p className="text-[14px] sm:text-base text-gray-700">Adults with pain or restricted mobility </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  </div>
                  <p className="text-[14px] sm:text-base text-gray-700">Children with physical development needs</p>
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
                    Anyone who prefers therapy in a home environment
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 w-full" data-aos="fade-left">
            <Image
              src="/assets/images/services/home-physiotherapy-services.webp"
              alt="Patients of all ages receiving home physiotherapy services tailored to recovery and mobility needs."
              title="Benefits of Choosing Home Physiotherapy Services, Malaysia"
              width={500}
              height={600}
              className="max-w-full md:max-w-[500px] object-cover shadow-lg mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Why Choose MobiLab2u Section */}
      <section className="bg-[#fef1e7] py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <h3
            className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#1d1d1f] mb-6 text-center splt-txt"
            data-splitting
            data-aos="fade-in"
          >
            Why Choose MobiLab2u For <em className="text-red-600">Home Physiotherapy </em> In Malaysia?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up">
            {/* Card 1 */}
            <div className="bg-white p-6 sm:p-[2.5rem] rounded-2xl shadow-sm">
              <Image
                src="/assets/images/svg/cares-comes-you.svg"
                alt="Home Physiotherapy Delivered To Your Doorstep In Malaysia"
                title="Home Physiotherapy Delivered To Your Doorstep In Malaysia"
                width={48}
                height={48}
                className="w-12 h-12 mb-[1.5rem] filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
              />
              <h4 className="text-[16px] sm:text-xl font-semibold text-black mb-2">Care That Comes to You</h4>
              <p className="text-[14px] text-justify sm:text-base sm:text-left">
                Skip the commute and the wait. MobiLab2u brings trusted, hospital-grade physiotherapy to your home, on
                your schedule.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 sm:p-[2.5rem] rounded-2xl shadow-sm">
              <Image
                src="/assets/images/svg/truly-personalized-treatment.svg"
                alt="Personalized Home Physiotherapy Plans For Patient Malaysia"
                title="Personalized Home Physiotherapy Plans For Patient Malaysia"
                width={48}
                height={48}
                className="w-12 h-12 mb-[1.5rem] filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
              />
              <h4 className="text-[16px] sm:text-xl font-semibold text-black mb-2">Truly Personalised Treatment</h4>
              <p className="text-[14px] text-justify sm:text-base sm:text-left">
                Every plan is customized to fit your condition, your life, and your velocity. We customize care to fit
                your needs.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 sm:p-[2.5rem] rounded-2xl shadow-sm">
              <Image
                src="/assets/images/svg/qualified-trusted-team.svg"
                alt="Certified Physiotherapists Providing Expert Care Malaysia"
                title="Certified Physiotherapists Providing Expert Care Malaysia"
                width={48}
                height={48}
                className="w-12 h-12 mb-[1.5rem] filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
              />
              <h4 className="text-[16px] sm:text-xl font-semibold text-black mb-2">
                Qualified, Trusted Professionals{' '}
              </h4>
              <p className="text-[14px] text-justify sm:text-base sm:text-left">
                All of our physiotherapists are certified and experienced in home-based rehabilitation for clients of
                all ages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Areas Section */}
      <section className="py-8 md:py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h3 className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#0d1623] mb-8 sm:mb-12">
            Areas We Cover for Quality<em className="text-red-600"> Healthcare Services in Malaysia</em>
          </h3>

          <p className="text-[14px] sm:text-base text-center mb-7">
            MobiLab2u currently offers physiotherapy home visits across:
          </p>

          <div className="flex flex-wrap justify-center gap-4" data-aos="fade-up">
            <div className="flex items-center gap-3 px-2 py-2 pl-6 pr-6 border border-gray-300 rounded-full hover:shadow transition">
              <Image src="/assets/images/svg/location.svg" alt="Location" width={24} height={24} className="w-6 h-6" />
              <span className="text-sm font-medium text-[#0d1623]">Kuala Lumpur</span>
            </div>

            <div className="flex items-center gap-3 px-2 py-2 pl-6 pr-6 border border-gray-300 rounded-full hover:shadow transition">
              <Image src="/assets/images/svg/location.svg" alt="Location" width={24} height={24} className="w-6 h-6" />
              <span className="text-sm font-medium text-[#0d1623]">Klang Valley</span>
            </div>

            <div className="flex items-center gap-3 px-2 py-2 pl-6 pr-6 border border-gray-300 rounded-full hover:shadow transition">
              <Image src="/assets/images/svg/location.svg" alt="Location" width={24} height={24} className="w-6 h-6" />
              <span className="text-sm font-medium text-[#0d1623]">Johor Bahru</span>
            </div>

            <div className="flex items-center gap-3 px-2 py-2 pl-6 pr-6 border border-gray-300 rounded-full hover:shadow transition">
              <Image src="/assets/images/svg/location.svg" alt="Location" width={24} height={24} className="w-6 h-6" />
              <span className="text-sm font-medium text-[#0d1623]">Penang</span>
            </div>

            <div className="flex items-center gap-3 px-2 py-2 pl-6 pr-6 border border-gray-300 rounded-full hover:shadow transition">
              <Image
                src="/assets/images/svg/location.svg"
                alt="Location"
                width={24}
                height={24}
                className="w-6 h-6 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
              />
              <span className="text-sm font-medium text-[#0d1623]">Melaka</span>
            </div>

            <div className="flex items-center gap-3 px-2 py-2 pl-6 pr-6 border border-gray-300 rounded-full hover:shadow transition">
              <Image
                src="/assets/images/svg/location.svg"
                alt="Location"
                width={24}
                height={24}
                className="w-6 h-6 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
              />
              <span className="text-sm font-medium text-[#0d1623]">Negeri Sembilan</span>
            </div>

            <div className="flex items-center gap-3 px-2 py-2 pl-6 pr-6 border border-gray-300 rounded-full hover:shadow transition">
              <Image
                src="/assets/images/svg/location.svg"
                alt="Location"
                width={24}
                height={24}
                className="w-6 h-6 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
              />
              <span className="text-sm font-medium text-[#0d1623]">Perak</span>
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
            Book <em className="text-red-600">Home Physiotherapy</em> in Malaysia with MobiLab2u
          </h3>

          <p className="text-sm md:text-lg text-gray-600 mb-10">
            Take the first step toward easier movement and better health, without stepping outside. MobiLab2u brings
            experienced physiotherapists to your doorstep to provide significant, measurable outcomes in the comfort of
            your own home.
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
            FAQs About Our<em className="text-red-600"> Physiotherapy & Rehabilitation </em>Services
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4" data-aos="fade-right">
          <div className="col-span-12 space-y-6">
            {/* FAQ Item 1 */}
            <div className="border rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(0)}>
                <h4 className="text-[16px] sm:text-lg font-semibold">
                  Is home physiotherapy the same as coming into the clinic?
                </h4>
                <span className="text-gray-500 text-xl">{openFaqIndex === 0 ? '✖' : '＋'}</span>
              </div>
              {openFaqIndex === 0 && (
                <div className="mt-4 text-[14px] sm:text-[15px] text-gray-700">
                  Yes. The physiotherapists at MobiLab2u provide the same quality of care, but with the added benefit of
                  being in person and solely one-on-one at your home.
                </div>
              )}
            </div>

            {/* FAQ Item 2 */}
            <div className="border rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(1)}>
                <h4 className="text-[16px] sm:text-lg font-semibold">What is able to be treated at home?</h4>
                <span className="text-gray-500 text-xl">{openFaqIndex === 1 ? '✖' : '＋'}</span>
              </div>
              {openFaqIndex === 1 && (
                <div className="mt-4 text-[14px] sm:text-[15px] text-gray-700">
                  <p>
                    Joint injuries, muscle strains, stroke rehab, chronic fatigue, postpartum recovery, arthritis, and
                    post-surgery recovery.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ Item 3 */}
            <div className="border rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(2)}>
                <h4 className="text-[16px] sm:text-lg font-semibold">What equipment does the physiotherapist bring?</h4>
                <span className="text-gray-500 text-xl">{openFaqIndex === 2 ? '✖' : '＋'}</span>
              </div>
              {openFaqIndex === 2 && (
                <div className="mt-4 text-[14px] sm:text-[15px] text-gray-700">
                  Our physiotherapists bring along stuff like resistance bands, therapy balls, portable ultrasound
                  units, and more, all depending on your customized treatment plan.
                </div>
              )}
            </div>

            {/* FAQ Item 4 */}
            <div className="border rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(3)}>
                <h4 className="text-[16px] sm:text-lg font-semibold">Are your physiotherapists licensed?</h4>
                <span className="text-gray-500 text-xl">{openFaqIndex === 3 ? '✖' : '＋'}</span>
              </div>
              {openFaqIndex === 3 && (
                <div className="mt-4 text-[14px] sm:text-[15px] text-gray-700">
                  Yes. All are registered professionals with the proper Malaysian health authorities.
                </div>
              )}
            </div>

            {/* FAQ Item 5 */}
            <div className="border rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(4)}>
                <h4 className="text-[16px] sm:text-lg font-semibold">Is it patient-friendly for older patients?</h4>
                <span className="text-gray-500 text-xl">{openFaqIndex === 4 ? '✖' : '＋'}</span>
              </div>
              {openFaqIndex === 4 && (
                <div className="mt-4 text-[14px] sm:text-[15px] text-gray-700">
                  Definitely. Home care minimizes exposure risk and eliminates travel stress for older patients.
                </div>
              )}
            </div>

            {/* FAQ Item 6 */}
            <div className="border rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(5)}>
                <h4 className="text-[16px] sm:text-lg font-semibold">How much will I pay?</h4>
                <span className="text-gray-500 text-xl">{openFaqIndex === 5 ? '✖' : '＋'}</span>
              </div>
              {openFaqIndex === 5 && (
                <div className="mt-4 text-[14px] sm:text-[15px] text-gray-700">
                  Our fee is transparent and reasonable. You will be informed of the precise fee before you book your
                  session.
                </div>
              )}
            </div>

            {/* FAQ Item 7 */}
            <div className="border rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(6)}>
                <h4 className="text-[16px] sm:text-lg font-semibold">
                  Can I ask for the same physiotherapist to follow up?
                </h4>
                <span className="text-gray-500 text-xl">{openFaqIndex === 6 ? '✖' : '＋'}</span>
              </div>
              {openFaqIndex === 6 && (
                <div className="mt-4 text-[14px] sm:text-[15px] text-gray-700">
                  Yes. We support continuity of care, and you can request the same therapist for every visit.
                </div>
              )}
            </div>

            {/* FAQ Item 8 */}
            <div className="border rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(7)}>
                <h4 className="text-[16px] sm:text-lg font-semibold">How long is the usual session?</h4>
                <span className="text-gray-500 text-xl">{openFaqIndex === 7 ? '✖' : '＋'}</span>
              </div>
              {openFaqIndex === 7 && (
                <div className="mt-4 text-[14px] sm:text-[15px] text-gray-700">
                  Usually 45 to 60 minutes, depending on your needs and progress.
                </div>
              )}
            </div>

            {/* FAQ Item 9 */}
            <div className="border rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(8)}>
                <h4 className="text-[16px] sm:text-lg font-semibold">
                  Do you have services for kids and older adults?
                </h4>
                <span className="text-gray-500 text-xl">{openFaqIndex === 8 ? '✖' : '＋'}</span>
              </div>
              {openFaqIndex === 8 && (
                <div className="mt-4 text-[14px] sm:text-[15px] text-gray-700">
                  Yes. MobiLab2u physiotherapists are trained in both pediatric and{' '}
                  <Link
                    href="/geriatric-elderly-home-care"
                    className="text-red-600"
                    title="Geriatric & Elderly Care Support"
                  >
                    geriatric rehabilitation
                  </Link>
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

        {/* Decorative SVG Star (left) */}
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

        {/* Decorative SVG Star (right) */}
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
    </main>
  )
}
