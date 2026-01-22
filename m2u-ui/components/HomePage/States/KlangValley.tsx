'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { initAOS, initSmoothScroll, initSplitting, initSwiper } from '../animations'

export default function KlangValleyHealthcare() {
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
      {/* Breadcrumb Section */}
      <section className="bg-[#fef1e7] pt-8 pb-16 md:pt-[3rem] md:pb-[6rem]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-[20px] md:text-3xl font-bold text-black mb-2">
            At-Home Sample Collection & Teleconsultation in Klang Valley
          </h1>

          <ul className="flex justify-center gap-0 text-md text-black font-semibold mt-[24px]">
            <li className="flex items-center gap-1">
              <Image
                src="/assets/images/svg/home.svg"
                alt=""
                title=""
                width={16}
                height={16}
                loading="lazy"
                className="w-4 h-4"
              />
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span className="ml-[5px]">›</span>
              <i className="flaticon flaticon-next inline-block relative top-[2.5px] mx-[5px]"></i>
            </li>
            <li className="text-gray-500">Klang Valley</li>
          </ul>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Side Content */}
            <div>
              <h2
                className="text-[18px] sm:text-2xl md:text-3xl xl:text-4xl font-bold text-[#1d1d1f] mb-6 splt-txt text-center lg:text-left"
                data-splitting
                data-aos="fade-in"
              >
                At-Home <em className="text-red-600">Lab Tests & Pharmacy</em> Services in Klang Valley
              </h2>
              <p className="text-[14px] sm:text-base text-gray-600 mb-[1.5rem] sm:mb-10 text-justify sm:text-left">
                MobiLab2u provides easy home healthcare to residents throughout Klang Valley with online consultations
                by certified doctors, secure{' '}
                <Link
                  href="/home-blood-sample-collection"
                  className="text-red-600"
                  title="Home Blood Sample Collection"
                >
                  home sample collection,
                </Link>{' '}
                and quick medicine delivery. It makes professional medical attention available, safe, and hassle-free,
                simplifying healthcare for busy families, the elderly, and bedridden patients.
              </p>
            </div>

            {/* Right Side Image */}
            <div className="rounded-2xl overflow-hidden w-full h-[12rem] md:w-[30rem] sm:h-[20rem]">
              <Image
                src="/assets/images/location/pharmacy-services-klang-valley.webp"
                className="w-full h-full object-cover block"
                alt="Home blood tests and at-home pharmacy services providing safe, and reliable care in Klang Valley"
                title="Home Blood Tests & At-home Pharmacy Services, Klang Valley"
                width={480}
                height={288}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Residents Need Home Healthcare */}
      <section className="py-6 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 items-center">
            {/* Left column: Heading */}
            <div>
              <h2
                className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl text-center md:text-left font-bold text-gray-900 sm:mb-8 mb-4 splt-txt"
                data-splitting
                data-aos="fade-in"
              >
                Why Residents <em className="text-red-600">In Klang Valley</em> Need Home Healthcare?
              </h2>
            </div>

            {/* Right column: Content */}
            <div className="flex flex-col items-start text-gray-700">
              <p className="text-[14px] sm:text-lg text-gray-600 mb-[0.8rem] sm:mb-10 text-justify sm:text-left">
                Residents in Clang Valley require home healthcare for convenience, safety and efficiency. Busy work
                programs, with heavy traffic and crowded clinics, using medical care can be stressful and time
                consuming. Home Healthcare provides professional doctors counseling, sample collection and{' '}
                <Link href="/services" title="Prescription Medication Delivery" className="text-red-600">
                  at-home medicine delivery,
                </Link>{' '}
                which makes it easier for families, elderly patients to receive timely, safe and personal care without
                leaving their homes.
              </p>
            </div>
          </div>

          {/* Overlapped 3-circle row */}
          <div className="sm:mt-12 mt-2 flex justify-center">
            <div className="relative w-full max-w-6xl h-[16rem] sm:h-[20rem] md:h-[22rem]">
              {/* Left circle */}
              <div className="absolute left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-64 sm:h-64 md:w-[20rem] md:h-[20rem] rounded-full overflow-hidden shadow-md z-10">
                <Image
                  src="/assets/images/location/home-healthcare-services.webp"
                  alt="Comprehensive home healthcare services delivered at patients' homes, offering care in Klang Valley"
                  title="Home Healthcare Services For Patients In Klang Valley"
                  width={320}
                  height={320}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Center circle */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-72 sm:h-72 md:w-[22rem] md:h-[22rem] rounded-full overflow-hidden shadow-lg z-20">
                <Image
                  src="/assets/images/location/residents-home-healthcare.webp"
                  alt="Personalized home healthcare services providing convenience, safety, & care for patients in Klang Valley"
                  title="Klang Valley Residents Access Convenient Healthcare Services"
                  width={320}
                  height={320}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right circle */}
              <div className="absolute right-1/4 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-64 sm:h-64 md:w-[20rem] md:h-[20rem] rounded-full overflow-hidden shadow-md z-10">
                <Image
                  src="/assets/images/location/benefits-home-healthcare.webp"
                  alt="Home healthcare services offer comfort, convenience & professional care for patients in Klang Valley"
                  title="Key Benefits Of Home Healthcare Services In Klang Valley"
                  width={320}
                  height={320}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-2 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3
            className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl text-center font-bold text-gray-900 mb-8 splt-txt"
            data-splitting
            data-aos="fade-in"
          >
            Reliable At-Home <em className="text-red-600">Healthcare Services</em> in Klang Valley
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-[#fef1e7] rounded-2xl shadow-sm p-[1.4rem] md:p-8 text-center transition">
              <div className="flex justify-center mb-3 sm:mb-6">
                <Image
                  src="/assets/images/location/svg/teleconsultation.svg"
                  alt="Online Doctor Teleconsultation Services At Home Klang Valley"
                  title="Online Doctor Teleconsultation Services At Home Klang Valley"
                  width={144}
                  height={144}
                  loading="lazy"
                  className="w-36 h-36"
                />
              </div>
              <h4 className="text-[16px] sm:text-xl font-semibold text-gray-900 mb-3">Teleconsultation</h4>
              <p className="text-gray-600 mb-6 text-md">
                In Klang Valley, consult with experienced doctors online and receive specialist medical opinion without
                queuing in overcrowded clinics, all from home.
              </p>

              <div className="flex justify-center gap-4">
                <Link
                  href="/services/tele-consultation"
                  className="bg-black text-white py-2 px-4 rounded-lg text-[13px] sm:text-sm font-semibold hover:bg-red-600 transition"
                >
                  Know More
                </Link>

                <Link
                  href={{
                    pathname: '/packages',
                    query: { serviceType: 'appointment' },
                  }}
                  className="bg-red-600 text-white py-2 px-4 rounded-lg text-[13px] sm:text-sm font-semibold hover:bg-black transition"
                >
                  Book Now
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#fef1e7] rounded-2xl shadow-sm p-[1.4rem] md:p-8 text-center transition">
              <div className="flex justify-center mb-3 sm:mb-6">
                <Image
                  src="/assets/images/location/svg/home-blood-sample-collection.svg"
                  alt="Home Blood Sample Collection in Klang Valley, Malaysia"
                  title="Home Blood Sample Collection in Klang Valley, Malaysia"
                  width={144}
                  height={144}
                  loading="lazy"
                  className="w-36 h-36"
                />
              </div>
              <h3 className="text-[16px] sm:text-xl font-semibold text-gray-900 mb-3">Home Sample Collection</h3>
              <p className="text-gray-600 mb-6">
                If tests are required, our experienced staff takes samples from your home in Klang Valley at safe,
                convenient, and hassle-free service.
              </p>

              <div className="flex justify-center gap-4">
                <Link
                  href="/services/home-blood-sample-collection"
                  className="bg-black text-white py-2 px-4 rounded-lg text-[13px] sm:text-sm font-semibold hover:bg-red-600 transition"
                >
                  Know More
                </Link>

                <Link
                  href={{
                    pathname: '/packages',
                    query: { serviceType: 'test' },
                  }}
                  className="bg-red-600 text-white py-2 px-4 rounded-lg text-[13px] sm:text-sm font-semibold hover:bg-black transition"
                >
                  Book Now
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative bg-[#fef1e7] rounded-2xl shadow-sm p-[1.4rem] md:p-8 text-center transition">
              <span className="absolute top-3 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                Coming Soon
              </span>{' '}
              <div className="flex justify-center mb-3 sm:mb-6">
                <Image
                  src="/assets/images/location/svg/medicine-delivery.svg"
                  alt="Fast Prescription Medicine Delivery Services In Klang Valley"
                  title="Fast Prescription Medicine Delivery Services In Klang Valley"
                  width={144}
                  height={144}
                  loading="lazy"
                  className="w-36 h-36"
                />
              </div>
              <h3 className="text-[16px] sm:text-xl font-semibold text-gray-900 mb-3">Medicine Delivery</h3>
              <p className="text-gray-600 mb-6">
                After preparing your prescription, medicines are shipped directly to your doorstep in Klang Valley,
                saving you time and avoiding visits to busy pharmacies.
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  href="/services/medicine-delivery"
                  className="bg-black text-white py-2 px-4 rounded-lg text-[13px] sm:text-sm font-semibold hover:bg-red-600 transition"
                >
                  Know More
                </Link>

                {/* <Link
                  href="/packages"
                  className="bg-red-600 text-white py-2 px-4 rounded-lg text-[13px] sm:text-sm font-semibold hover:bg-black transition"
                >
                  Book Now
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content (Text & Icons) - 7/12 columns */}
            <div className="lg:col-span-7 bg-[#fef1e7] rounded-2xl p-5 lg:p-10 h-full">
              <h3
                className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl text-center sm:text-left font-bold text-gray-900 mb-12 splt-txt"
                data-splitting
                data-aos="fade-in"
              >
                Benefits of <em className="text-red-600">Our Home Healthcare</em> Services in Klang Valley
              </h3>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Item 1 */}
                <div className="flex flex-col items-start space-y-3">
                  <Image
                    src="/assets/images/svg/easy-access-safe.svg"
                    alt="Convenient Healthcare Services For Klang Valley Residents"
                    title="Convenient Healthcare Services For Klang Valley Residents"
                    width={64}
                    height={64}
                    loading="lazy"
                    className="w-16 h-16"
                  />
                  <h4 className="text-[16px] sm:text-lg font-semibold text-gray-900">Fast & Easy Access</h4>
                  <p className="text-[14px] sm:text-md text-gray-600">Healthcare services at your fingertips.</p>
                </div>

                {/* Item 2 */}
                <div className="flex flex-col items-start space-y-3">
                  <Image
                    src="/assets/images/svg/personalized-cares.svg"
                    alt="Trusted And Safe Home Healthcare Services In Klang Valley"
                    title="Trusted And Safe Home Healthcare Services In Klang Valley"
                    width={64}
                    height={64}
                    loading="lazy"
                    className="w-16 h-16"
                  />
                  <h4 className="text-[16px] sm:text-lg font-semibold text-gray-900">Personalized Care</h4>
                  <p className="text-[14px] sm:text-md text-gray-600">Treatments designed for your unique needs.</p>
                </div>

                {/* Item 3 */}
                <div className="flex flex-col items-start space-y-3">
                  <Image
                    src="/assets/images/svg/safe-secure.svg"
                    alt="Quick Access To Doctors, Labs, & Medicines In Klang Valley"
                    title="Quick Access To Doctors, Labs, & Medicines In Klang Valley"
                    width={64}
                    height={64}
                    loading="lazy"
                    className="w-16 h-16"
                  />
                  <h4 className="text-[16px] sm:text-lg font-semibold text-gray-900">Safe & Secure</h4>
                  <p className="text-[14px] sm:text-md text-gray-600">Professional care you can trust at home.</p>
                </div>

                {/* Item 4 */}
                <div className="flex flex-col items-start space-y-3">
                  <Image
                    src="/assets/images/svg/comprehensive-support.svg"
                    alt="Comprehensive At-home Healthcare Services In Klang Valley"
                    title="Comprehensive At-home Healthcare Services In Klang Valley"
                    width={64}
                    height={64}
                    loading="lazy"
                    className="w-16 h-16"
                  />
                  <h4 className="text-[16px] sm:text-lg font-semibold text-gray-900">Comprehensive Support</h4>
                  <p className="text-[14px] sm:text-md text-gray-600">From checkups to medicines, all in one app.</p>
                </div>
              </div>
            </div>

            {/* Right Image - 5/12 columns */}
            <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/assets/images/location/healthcare-services-klang-valley.webp"
                alt="Consult with local healthcare partner at home for safe, convenient, & reliable care in Klang Valley"
                title="Consult With Your Local Healthcare Partner In Klang Valley"
                width={501}
                height={611}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose MobiLab2u */}
      <section className="bg-[#fef1e7] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h3
            className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-12 text-center splt-txt"
            data-splitting
            data-aos="fade-in"
          >
            Why Choose <em className="text-red-600">MobiLab2u for Home</em> Healthcare in Klang valley?
          </h3>

          {/* 3 Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6" data-aos="fade-up">
            {/* Card 1 */}
            <div className="bg-white p-6 sm:p-[2.5rem] rounded-2xl shadow-sm">
              <Image
                src="/assets/images/svg/mobile-apps.svg"
                alt="Complete Care In App For At-home Healthcare In Klang Valley"
                title="Complete Care In App For At-home Healthcare In Klang Valley"
                width={48}
                height={48}
                loading="lazy"
                className="w-12 h-12 mb-[1.5rem] filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
              />
              <h4 className="text-[16px] sm:text-xl font-semibold text-black mb-2">Complete Care in One App</h4>
              <p className="text-[14px] sm:text-base text-gray-600">
                Get doctor consultations, lab tests, and medicine delivery in one platform, ensuring a smooth and
                connected healthcare journey.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 sm:p-[2.5rem] rounded-2xl shadow-sm">
              <Image
                src="/assets/images/svg/home-care.svg"
                alt="Convenient At-home Healthcare Services In Klang Valley"
                title="Convenient At-home Healthcare Services In Klang Valley"
                width={48}
                height={48}
                loading="lazy"
                className="w-12 h-12 mb-[1.5rem] filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
              />
              <h4 className="text-[16px] sm:text-xl font-semibold text-black mb-2">
                Convenience for Klang valley Residents
              </h4>
              <p className="text-[14px] sm:text-base text-gray-600">
                Skip clinic queues and pharmacy trips with care delivered at home, saving time while making healthcare
                easier for families.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 sm:p-[2.5rem] rounded-2xl shadow-sm">
              <Image
                src="/assets/images/svg/healthcare-professional.svg"
                alt="Trusted Healthcare Professionals Services in Klang Valley"
                title="Trusted Healthcare Professionals Services in Klang Valley"
                width={48}
                height={48}
                loading="lazy"
                className="w-12 h-12 mb-[1.5rem] filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
              />
              <h4 className="text-[16px] sm:text-xl font-semibold text-black mb-2">Trusted Professionals</h4>
              <p className="text-[14px] sm:text-base text-gray-600">
                Our experienced doctors, trained phlebotomists, certified labs, and reliable pharmacies guarantee safe,
                accurate, and trustworthy home healthcare services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use MobiLab2u */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* LEFT: Sticky heading */}
          <div className="md:sticky md:top-[8rem] self-start">
            <h3
              className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-12 text-center splt-txt"
              data-splitting
              data-aos="fade-in"
            >
              How to Use <em className="text-red-600">MobiLab2u In-Home</em> Healthcare in Klang valley?
            </h3>
            {/* LEFT SHAPE IMAGE */}
            <div className="mt-6 flex justify-center">
              <Image
                src="/assets/images/location/svg/mobilab2u-home-healthcare.svg"
                alt=""
                title="Comprehensive At-home Healthcare Services In Klang Valley"
                width={384}
                height={384}
                loading="lazy"
                className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain mx-auto"
              />
            </div>
          </div>

          {/* RIGHT: Stacked sticky cards */}
          <div className="space-y-8 relative">
            <div className="sticky md:top-[8rem] p-4 sm:p-6 rounded-3xl shadow-md bg-[#fef1e7] flex flex-col md:flex-row items-center gap-4 sm:gap-6">
              {/* LEFT: Icon + Text */}
              <div className="flex-1 text-center md:text-left">
                {/* Icon */}
                <div className="mb-4 flex justify-center md:justify-start">
                  <div className="bg-white rounded-full p-3 inline-flex">
                    <Image
                      src="/assets/images/svg/one-process.svg"
                      alt=""
                      title=""
                      width={32}
                      height={32}
                      loading="lazy"
                      className="w-8 h-8"
                    />
                  </div>
                </div>

                <h4 className="text-lg sm:text-xl font-semibold mb-2">Download & Register</h4>
                <p className="text-gray-700 text-sm sm:text-base">Download and install the app and sign up.</p>
              </div>

              {/* RIGHT: Image */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden flex-shrink-0">
                <Image
                  src="/assets/images/location/svg/download-register.svg"
                  alt="Download & Register For At-home Healthcare App, Klang Valley"
                  title="Download & Register For At-home Healthcare App, Klang Valley"
                  width={112}
                  height={112}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="sticky md:top-[8rem] p-4 sm:p-6 rounded-3xl shadow-md bg-[#fef1e7] flex flex-col md:flex-row items-center gap-4 sm:gap-6">
              login {/* LEFT: Icon + Text */}
              <div className="flex-1 text-center md:text-left">
                {/* Icon */}
                <div className="mb-4 flex justify-center md:justify-start">
                  <div className="bg-white rounded-full p-3 inline-flex">
                    <Image
                      src="/assets/images/svg/two.svg"
                      alt=""
                      title=""
                      width={32}
                      height={32}
                      loading="lazy"
                      className="w-8 h-8"
                    />
                  </div>
                </div>

                <h4 className="text-lg sm:text-xl font-semibold mb-2">Consult a Doctor</h4>
                <p className="text-gray-700 text-sm sm:text-base">Obtain immediate online medical guidance.</p>
              </div>
              {/* RIGHT: Image */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden flex-shrink-0">
                <Image
                  src="/assets/images/location/svg/consult-doctor.svg"
                  alt="Consult A Doctor Online From Home Quickly In Klang Valley"
                  title="Consult A Doctor Online From Home Quickly In Klang Valley"
                  width={112}
                  height={112}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="sticky md:top-[8rem] p-4 sm:p-6 rounded-3xl shadow-md bg-[#fef1e7] flex flex-col md:flex-row items-center gap-4 sm:gap-6">
              {/* LEFT: Icon + Text */}
              <div className="flex-1 text-center md:text-left">
                {/* Icon */}
                <div className="mb-4 flex justify-center md:justify-start">
                  <div className="bg-white rounded-full p-3 inline-flex">
                    <Image
                      src="/assets/images/svg/three.svg"
                      alt=""
                      title=""
                      width={32}
                      height={32}
                      loading="lazy"
                      className="w-8 h-8"
                    />
                  </div>
                </div>

                <h4 className="text-lg sm:text-xl font-semibold mb-2">Book Home Test</h4>
                <p className="text-gray-700 text-sm sm:text-base">Schedule blood sample drawing if necessary.</p>
              </div>

              {/* RIGHT: Image */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden flex-shrink-0">
                <Image
                  src="/assets/images/location/svg/book-home-test.svg"
                  alt="Book Home Blood Test Through Our MobiLab2u App"
                  title="Book Home Blood Test Through Our MobiLab2u App"
                  width={112}
                  height={112}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="sticky md:top-[8rem] p-4 sm:p-6 rounded-3xl shadow-md bg-[#fef1e7] flex flex-col md:flex-row items-center gap-4 sm:gap-6">
              {/* LEFT: Icon + Text */}
              <div className="flex-1 text-center md:text-left">
                {/* Icon */}
                <div className="mb-4 flex justify-center md:justify-start">
                  <div className="bg-white rounded-full p-3 inline-flex">
                    <Image
                      src="/assets/images/svg/four.svg"
                      alt=""
                      title=""
                      width={32}
                      height={32}
                      loading="lazy"
                      className="w-8 h-8"
                    />
                  </div>
                </div>

                <h4 className="text-lg sm:text-xl font-semibold mb-2">Get Results</h4>
                <p className="text-gray-700 text-sm sm:text-base">
                  Laboratory reports are uploaded directly into the app.
                </p>
              </div>

              {/* RIGHT: Image */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden flex-shrink-0">
                <Image
                  src="/assets/images/location/svg/get-results.svg"
                  alt="Receive Lab Test Results Through Our MobiLab2u App, Klang Valley"
                  title="Receive Lab Test Results Through Our MobiLab2u App, Klang Valley"
                  width={112}
                  height={112}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="sticky md:top-[8rem] p-4 sm:p-6 rounded-3xl shadow-md bg-[#fef1e7] flex flex-col md:flex-row items-center gap-4 sm:gap-6">
              {/* LEFT: Icon + Text */}
              <div className="flex-1 text-center md:text-left">
                {/* Icon */}
                <div className="mb-4 flex justify-center md:justify-start">
                  <div className="bg-white rounded-full p-3 inline-flex">
                    <Image
                      src="/assets/images/svg/five.svg"
                      alt=""
                      title=""
                      width={32}
                      height={32}
                      loading="lazy"
                      className="w-8 h-8"
                    />
                  </div>
                </div>

                <h4 className="text-lg sm:text-xl font-semibold mb-2">Order Medicines</h4>
                <p className="text-gray-700 text-sm sm:text-base">
                  Order & Receive prescribed medicines at your doorstep.
                </p>
              </div>

              {/* RIGHT: Image */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden flex-shrink-0">
                <Image
                  src="/assets/images/location/svg/order-medicines.svg"
                  alt="Order & Receive Prescribed Medicines At Home In Klang Valley"
                  title="Order & Receive Prescribed Medicines At Home In Klang Valley"
                  width={112}
                  height={112}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#fef1e7] py-8 md:py-16 px-6 md:px-10 rounded-2xl text-center max-w-7xl mx-auto">
        <div className="max-w-5xl mx-auto" data-aos="fade-up">
          <h3
            className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-6 splt-txt"
            data-splitting
            data-aos="fade-in"
          >
            Book Your Home <em className="text-red-600">Healthcare</em> in Klang Valley Today
          </h3>
          <p className="text-sm md:text-lg text-gray-600 mb-5 sm:mb-10">
            Experience safe, reliable medical care delivered straight to your home. Our services make healthcare
            convenient for families and elderly residents across Klang Valley.
          </p>

          <div className="flex flex-row justify-center items-center gap-2 flex-wrap sm:flex-nowrap">
            <Link
              href="/user/register"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:shadow transition text-[#0d1623] font-medium bg-white text-sm sm:text-base"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
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

            <Link
              href="/packages"
              className="flex-1 sm:flex-none px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-black transition text-sm sm:text-base text-center"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 py-8 sm:py-16">
        <div className="w-full text-center">
          <span className="bg-[#dc2626] text-white text-sm font-semibold px-5 py-2 rounded-full inline-block mb-4">
            FAQ
          </span>
          <h3
            className="text-[18px] sm:text-2xl md:text-3xl xl:text-4xl font-bold text-gray-900 mb-6 splt-txt"
            data-splitting
            data-aos="fade-in"
          >
            FAQs About <em className="text-red-600">At Home Healthcare Services</em> in Klang Valley
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4" data-aos="fade-right">
          {/* FAQ Accordion */}
          <div className="col-span-12 space-y-6">
            {/* Item 1 */}
            <div className="border rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(0)}>
                <h4 className="text-[16px] sm:text-lg font-semibold">
                  What is the procedure of booking a home consultation in Klang Valley?
                </h4>
                <span className="text-gray-500 text-xl">{openFaqIndex === 0 ? '✖' : '＋'}</span>
              </div>
              {openFaqIndex === 0 && (
                <div className="mt-4 text-[14px] sm:text-[15px] text-gray-700">
                  The MobiLab2u app or site allows you to{' '}
                  <Link
                    href="/telemedicine-online-doctor-consultation"
                    title="Tele Consultation"
                    className="text-red-600"
                  >
                    book a teleconsultation
                  </Link>{' '}
                  or home sample collection at the time you want at your home.
                </div>
              )}
            </div>

            {/* Item 2 */}
            <div className="border rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(1)}>
                <h4 className="text-[16px] sm:text-lg font-semibold">
                  Do the doctors have credentials and are certified?
                </h4>
                <span className="text-gray-500 text-xl">{openFaqIndex === 1 ? '✖' : '＋'}</span>
              </div>
              {openFaqIndex === 1 && (
                <div className="mt-4 text-[14px] sm:text-[15px] text-gray-700">
                  Yes, they are all licensed practitioners, MMC-registered, and are guided by the medical advice, which
                  is based on the guidelines.
                </div>
              )}
            </div>

            {/* Item 3 */}
            <div className="border rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(2)}>
                <h4 className="text-[16px] sm:text-lg font-semibold">Can we safely collect samples in the house?</h4>
                <span className="text-gray-500 text-xl">{openFaqIndex === 2 ? '✖' : '＋'}</span>
              </div>
              {openFaqIndex === 2 && (
                <div className="mt-4 text-[14px] sm:text-[15px] text-gray-700">
                  Absolutely. Our trained staff uses strict safety and hygiene measures when picking the samples at your
                  doorstep.
                </div>
              )}
            </div>

            {/* Item 4 */}
            <div className="border rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(3)}>
                <h4 className="text-[16px] sm:text-lg font-semibold">
                  What is the duration of delivery of the medicine?
                </h4>
                <span className="text-gray-500 text-xl">{openFaqIndex === 3 ? '✖' : '＋'}</span>
              </div>
              {openFaqIndex === 3 && (
                <div className="mt-4 text-[14px] sm:text-[15px] text-gray-700">
                  Being in Klang Valley, you get the prescribed medicines in your house within an hour or a day,
                  depending on product availability.
                </div>
              )}
            </div>

            {/* Item 5 */}
            <div className="border rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(4)}>
                <h4 className="text-[16px] sm:text-lg font-semibold">Is teleconsultation safe and confidential?</h4>
                <span className="text-gray-500 text-xl">{openFaqIndex === 4 ? '✖' : '＋'}</span>
              </div>
              {openFaqIndex === 4 && (
                <div className="mt-4 text-[14px] sm:text-[15px] text-gray-700">
                  Yes, every consultation is end-to-end encrypted, time-based, and in accordance with the MOH standards
                  of telemedicine in order to safeguard your privacy.
                </div>
              )}
            </div>

            {/* Item 6 */}
            <div className="border rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(5)}>
                <h4 className="text-[16px] sm:text-lg font-semibold">
                  Is there follow-up support that is available after the consultation?
                </h4>
                <span className="text-gray-500 text-xl">{openFaqIndex === 5 ? '✖' : '＋'}</span>
              </div>
              {openFaqIndex === 5 && (
                <div className="mt-4 text-[14px] sm:text-[15px] text-gray-700">
                  Yes, MobiLab2u offers electronic prescriptions, and other follow up scheduling to sustain home-based
                  care.
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
          className="absolute left-0 bottom-0 max-h-24 max-h-[38%] md:max-h-[43%] lg:max-h-[60%] xl:max-h-[70%] object-contain z-10"
          width={392}
          height={280}
          loading="lazy"
        />

        {/* Right Illustration */}
        <Image
          src="/assets/images/mobilab2u/medicine-delivery.svg"
          alt="Fast Prescription Medicine Delivery Services In Malaysia"
          title="Fast Prescription Medicine Delivery Services In Malaysia"
          className="absolute right-0 bottom-0 max-h-24 max-h-[40%] md:max-h-[45%] lg:max-h-[62%] xl:max-h-[70%] object-contain z-10"
          width={308}
          height={280}
          loading="lazy"
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

        {/* Decorative SVG Star */}
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
    </main>
  )
}
