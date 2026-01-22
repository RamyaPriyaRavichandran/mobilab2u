'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { initAOS, initSmoothScroll, initSplitting, initSwiper } from '../animations'

export default function Sabah() {
  useEffect(() => {
    initAOS()
    initSmoothScroll()
    initSplitting()
    initSwiper()
  }, [])

  return (
    <main className="min-h-screen flex flex-col text-center relative overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-b from-white via-red-50 to-red-100 flex flex-col items-center justify-center px-6 relative overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute w-40 h-40 bg-red-200 rounded-full blur-3xl opacity-30 top-20 left-10 animate-pulse"></div>
        <div className="absolute w-52 h-52 bg-red-300 rounded-full blur-3xl opacity-20 bottom-10 right-10 animate-bounce-slow"></div>

        {/* Content */}
        <div data-aos="fade-up" className="z-10">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 splt-txt" data-splitting>
            We&apos;re <span className="text-red-600">Crafting</span> Something Special
          </h1>
          <p className="text-gray-700 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            The Penang experience is almost ready. Our team is weaving together pixels, passion, and precision — just
            for you.
          </p>

          <Link
            href="/"
            className="px-8 py-3 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 shadow-lg hover:shadow-red-200 transition-all duration-300 hover:scale-105"
          >
            Stay Tuned
          </Link>
        </div>

        <p className="absolute bottom-6 text-xs sm:text-sm text-gray-500 italic">
          — Coming soon to <span className="text-red-600 font-semibold">MobiLab2u Sabah</span> —
        </p>
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
              {[
                'Smart Access to Verified Care Providers',
                'Home Health Services with Hospital Standards',
                'Giving customers 24x7 access to high-quality healthcare',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                    ✓
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-[#001e2b]">{item}</span>
                </li>
              ))}
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

      {/* Access Healthcare Section */}
      <section className="bg-[#fef1e7] min-h-[380px] py-6 pb-24 md:pb-10 flex md:items-center justify-center px-2 md:px-4 relative overflow-hidden">
        {/* Left Illustration */}
        <Image
          src="/assets/images/mobilab2u/home-healthcare-application.svg"
          alt="Access Healthcare Services Anytime With Mobile App Malaysia"
          title="Access Healthcare Services Anytime With Mobile App Malaysia"
          width={392}
          height={280}
          className="absolute left-0 bottom-0 max-h-[40%] md:max-h-[45%] lg:max-h-[60%] xl:max-h-[70%] object-contain z-10"
        />

        {/* Right Illustration */}
        <Image
          src="/assets/images/mobilab2u/medicine-delivery.svg"
          alt="Fast Prescription Medicine Delivery Services In Malaysia"
          title="Fast Prescription Medicine Delivery Services In Malaysia"
          width={308}
          height={280}
          className="absolute right-0 bottom-0 max-h-[40%] md:max-h-[45%] lg:max-h-[62%] xl:max-h-[70%] object-contain z-10"
        />

        {/* Center Content */}
        <div className="text-center max-w-3xl z-20 md:mt-0">
          <h3
            className="font-secondary text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-[1.3] font-semibold text-black splt-txt"
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
      </section>
    </main>
  )
}
