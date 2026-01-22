'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { initAOS, initSmoothScroll, initSplitting, initSwiper } from './animations'
import Link from 'next/link'
import Script from 'next/script'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

export default function HealthcareServicesPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [aosLoaded, setAosLoaded] = useState(false)
  const Router = useRouter()
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  useEffect(() => {
    // Initialize animations
    initAOS()
    initSmoothScroll()
    initSplitting()
    initSwiper()
  }, [])
  useEffect(() => {
    if (aosLoaded && typeof window !== 'undefined' && (window as any).AOS) {
      ;(window as any).AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
      })
    }
  }, [aosLoaded])

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css" />
      <Script
        src="https://unpkg.com/aos@2.3.1/dist/aos.js"
        strategy="afterInteractive"
        onLoad={() => setAosLoaded(true)}
      />

      <main className="font-sans">
        {/* Hero Section */}
        <section className="bg-[#fef1e7] pt-8 pb-16 md:pt-[3rem] md:pb-[6rem]">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-[20px] md:text-3xl font-extrabold text-black mb-2">
              Your Partner for On-Demand{' '}
              <Link href="/home-nursing-care-services" className="text-red-600" title="Home Care Services">
                Healthcare Services
              </Link>{' '}
              in Malaysia
            </h1>

            <ul className="flex justify-center gap-0 text-sm text-black font-semibold mt-[24px]">
              <li className="flex items-center gap-1">
                <Image
                  src="/assets/images/svg/home.svg"
                  alt="Doctor Consultation & Home Medical Services In Malaysia"
                  title="Healthcare professional visiting a patient at home for consultation & medical services in Malaysia."
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                <Link href="/" className="hover:underline">
                  Home
                </Link>
                <span className="ml-[5px]">›</span>
                <i className="flaticon flaticon-next inline-block relative top-[2.5px] mx-[5px]"></i>
              </li>
              <li className="text-gray-500">About Us</li>
            </ul>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-12 lg:pt-14 pb-0 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
              {/* Left side - Images */}
              <div className="w-full lg:w-1/2 relative md:my-10 my-0" data-aos="fade-right">
                <div className="relative h-[15rem] md:h-[352px] lg:h-[420px] w-full rounded-xl bg-[url('/assets/images/about/intro-bg.webp')] bg-cover bg-center md:object-contain">
                  {/* Main shape */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <Image
                      src="/assets/images/about/home-medical-services-mobilab2u.webp"
                      alt="Licensed healthcare professional providing at-home medical service in Malaysia through MobiLab2u app"
                      title="At-Home Medical Services with Doctor Consultation in Malaysia"
                      width={461}
                      height={362}
                      className="w-[80%] sm:w-[70%] md:w-[85%] lg:w-[80%] h-auto rounded-2xl shadow-lg mx-auto"
                      loading="lazy"
                    />
                  </div>

                  {/* Floating image */}
                  <div
                    id="floatingImage"
                    className="absolute top-2 left-2 sm:top-4 sm:left-4 md:top-6 md:left-3 w-[35%] sm:w-[28%] md:w-[25%] lg:w-[30%] z-20 transition-transform duration-300 ease-out"
                  >
                    <Image
                      src="/assets/images/about/home-medical-service-mobilab.webp"
                      title="Book Reliable Home Healthcare Services via Mobile App"
                      alt="Use mobile app to book home healthcare consultations, tests, & treatments with experts in Malaysia."
                      width={173}
                      height={246}
                      className="rounded-xl"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Right side - Content */}
              <div className="w-full lg:w-1/2" data-aos="fade-left">
                <h2 className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#1d1d1f] mb-6 text-center lg:text-left">
                  At-Home <em className="text-red-600">Medical Services </em> at Your Fingertips in Malaysia
                </h2>

                <p className="text-[14px] lg:text-lg text-gray-600 leading-relaxed text-justify lg:text-left">
                  MobiLab2u was founded in 2021 by a diverse group of doctors, insurance industry leaders, and lawyers.
                  Our founders were united by a common desire to address significant gaps in{' '}
                  <Link href="/home-nursing-care-services" className="text-red-600" title="Home Care Services">
                    healthcare services
                  </Link>{' '}
                  that became evident during the Covid-19 pandemic. The pandemic highlighted the urgent need for
                  services that could connect healthcare professionals directly with patients for home-based tests,
                  consultations, and simple treatments. We recognize that the Malaysian healthcare system is burdened by
                  congestion and a lack of required manpower, compounded by the growing needs of an aging population.
                  MobiLab2u offers a digital solution to alleviate this burden.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What is MobiLab2u Section */}
        <section className="py-12 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center lg:items-center gap-8">
            {/* Left Column */}
            <div className="w-full lg:w-1/2" data-aos="fade-right">
              <h2 className="text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#1d1d1f] mb-4 sm:mb-6 text-center lg:text-left">
                What is <em className="text-red-600">MobiLab2u?</em>
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed text-justify lg:text-left">
                MobiLab2u.com is an on-demand SaaS platform that efficiently matches registered healthcare partners with
                patients who require time-sensitive medical tests, advice, counselling, and support—all without the need
                to travel. Our service ensures medical convenience is delivered directly to the individual&apos;s
                doorstep. MobiLab2u aims to be Malaysia&apos;s top on-demand mobile app for medical services, bridging
                the gap between Malaysia&apos;s medical resources and consumers.
              </p>
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end" data-aos="fade-left">
              <Image
                src="/assets/images/svg/what-is-mobilab2u.svg"
                alt="Easy booking with 24/7 support, convenient care, and online doctor consultation services in Malaysia"
                title="Easy Booking & Online Doctor Consultation Services in Malaysia"
                width={513}
                height={515}
                className="max-w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="relative py-8 md:py-20 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card 1 - Vision */}
              <div
                className="bg-white rounded-2xl border border-[#ebedef] p-[10px] md:p-8 text-center transition duration-300 hover:border-red-500"
                data-aos="fade-up"
              >
                <Image
                  src="/assets/images/about/various.webp"
                  alt="Empowering individuals and healthcare professionals with accessible on-demand healthcare in Malaysia"
                  title="Vision To Lead On-demand Home Healthcare Platform, Malaysia"
                  width={64}
                  height={64}
                  className="mx-auto mb-6 h-16 w-16"
                  loading="lazy"
                />
                <h4 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h4>
                <p className="text-[14px] lg:text-base text-gray-600 mb-6 max-w-[94%] mx-auto text-justify lg:text-left">
                  To be the leading on-demand home healthcare platform in Malaysia, transforming healthcare delivery by
                  making &quot;healthcare at fingertips&quot; a reality for every individual, and empowering healthcare
                  professionals across the nation
                </p>
              </div>

              {/* Card 2 - Mission */}
              <div
                className="bg-white rounded-2xl border border-[#ebedef] p-[10px] md:p-8 text-center transition duration-300 hover:border-red-500"
                data-aos="fade-up"
              >
                <Image
                  src="/assets/images/about/premium.webp"
                  alt="Providing home tests, teleconsultations, medicine delivery, counselling services at home in Malaysia."
                  title="Mission To Provide Home Healthcare Services In Malaysia"
                  width={64}
                  height={64}
                  className="mx-auto mb-6 h-16 w-16"
                  loading="lazy"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
                <p className="text-[14px] lg:text-base text-gray-600 mb-6 max-w-[94%] mx-auto text-justify lg:text-left leading-relaxed">
                  To bridge critical gaps in the healthcare system by providing convenient, accessible, and affordable
                  home-based medical tests, teleconsultations, Medication delivery, Home care, and counselling. We
                  achieve this by connecting qualified healthcare professionals with individuals in need and empowering
                  our partners with opportunities to supplement their income and elevate their quality of life.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Managing Director Message Section */}
        <section className="py-12 overflow-hidden">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Left content */}
              <div
                className="bg-[#fef1e7] rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col justify-center h-full"
                data-aos="fade-right"
              >
                <div className="mx-auto lg:mx-0">
                  <span className="block mb-2 text-gray-700 text-[15px] text-center sm:text-left">
                    Dear Healthcare Professionals,
                  </span>

                  <h3 className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#1d1d1f] mb-6 text-center sm:text-left">
                    A Message from our <em className="text-red-600">Managing </em>Director,
                  </h3>

                  <p className="text-[14px] sm:text-[15px] lg:text-base text-gray-700 leading-relaxed text-justify sm:text-left">
                    The Malaysian healthcare system is burdened by congestion and a lack of required manpower to deal
                    with surging health demands. We strongly believe that digital solutions are the way forward to help
                    alleviate this burden while meeting the growing needs of an aging population while also helping
                    elevate quality of life for many healthcare professionals who have found their workload increasing
                    post-pandemic. We hope you will see MobiLab2u as an able partner to help you supplement your income
                    while bringing more direct help to the individuals in need.
                  </p>
                </div>
              </div>

              {/* Right image */}
              <div className="rounded-2xl overflow-hidden flex h-full" data-aos="fade-left">
                <Image
                  src="/assets/images/about/client-post.webp"
                  alt="Managing Director addressing healthcare professionals for digital healthcare solutions in Malaysia"
                  title="Managing Director of MobiLab2U Healthcare Platform, Malaysia"
                  width={513}
                  height={515}
                  className="w-full h-full xl:object-cover md:object-contain object-center"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="max-w-7xl mx-auto px-4 py-8 md:py-16 overflow-hidden">
          <div className="text-center mb-3">
            <h3 className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#1d1d1f] mb-6 text-center">
              End-to-End Health Services Delivered to Your Door in <em className="text-red-600"> Malaysia </em>
            </h3>

            <p className="text-[14px] lg:text-base text-gray-600 mb-10">
              We offer a wide range of scheduled and on-demand services that place patient convenience at the centre:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" data-aos="fade-up">
            {/* Left col-8 */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition border border-gray-200">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Image
                    src="/assets/images/svg/medical-report.svg"
                    alt="At-home Medical & Health Test Sample Collection In Malaysia"
                    title="At-home Medical & Health Test Sample Collection In Malaysia"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                    style={{
                      filter: 'invert(66%) sepia(22%) saturate(788%) hue-rotate(103deg) brightness(99%) contrast(93%)',
                    }}
                    loading="lazy"
                  />
                </div>
                <h4 className="text-[16px] lg:text-lg font-semibold mb-2">Medical & Health Tests</h4>

                <p className="text-[14px] lg:text-base text-gray-600 text-justify lg:text-left">
                  From basic blood panels to advanced screenings, our professionals collect samples at your home and
                  send them to trusted labs.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition border border-gray-200">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Image
                    src="/assets/images/svg/doctor-consult.svg"
                    alt="Online Doctor Consultations & Health Advice In Malaysia"
                    title="Online Doctor Consultations Right From Home In Malaysia"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                    style={{
                      filter: 'invert(53%) sepia(65%) saturate(867%) hue-rotate(209deg) brightness(91%) contrast(87%)',
                    }}
                    loading="lazy"
                  />
                </div>
                <h4 className="text-[16px] lg:text-lg font-semibold mb-2">Consultations</h4>
                <p className="text-[14px] lg:text-base text-gray-600 text-justify lg:text-left">
                  Speak to licensed doctors online, get your test results explained, or receive treatment advice without
                  stepping outside.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition border border-gray-200">
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <Image
                    src="/assets/images/svg/counselling.svg"
                    alt="Mental Health Counselling & Well-being Webinars In Malaysia"
                    title="Mental Health Counselling & Well-being Webinars In Malaysia"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                    style={{
                      filter: 'invert(62%) sepia(12%) saturate(1912%) hue-rotate(345deg) brightness(93%) contrast(95%)',
                    }}
                    loading="lazy"
                  />
                </div>
                <h4 className="text-[16px] lg:text-lg font-semibold mb-2">Counselling</h4>
                <p className="text-[14px] lg:text-base text-gray-600 text-justify lg:text-left">
                  Access qualified mental health professionals through the platform. We also host periodic webinars on
                  mind science & well-being.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition border border-gray-200">
                <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                  <Image
                    src="/assets/images/svg/online-pharmacy.svg"
                    alt="Secure Prescription Delivery & E-pharmacy Services, Malaysia"
                    title="Secure Prescription Delivery & E-pharmacy Services, Malaysia"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                    style={{
                      filter: 'invert(63%) sepia(36%) saturate(977%) hue-rotate(285deg) brightness(89%) contrast(83%)',
                    }}
                    loading="lazy"
                  />
                </div>
                <h4 className="text-[16px] lg:text-lg font-semibold mb-2">Prescription & E-Pharmacy</h4>
                <p className="text-[14px] lg:text-base text-gray-600 text-justify lg:text-left">
                  Receive prescribed medication through our secure, convenient delivery system.
                </p>
              </div>
            </div>

            {/* Right col-4 */}
            <div className="lg:col-span-4 flex flex-col bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition overflow-hidden">
              {/* Image top */}
              <div className="w-full">
                <Image
                  src="/assets/images/about/home-health-care-services.svg"
                  alt="Comprehensive Home Health Care Services In Malaysia"
                  title="Comprehensive Home Health Care Services In Malaysia"
                  width={345}
                  height={224}
                  className="w-full h-full pb-0 object-contain p-6"
                  loading="lazy"
                />
              </div>
              {/* Content */}
              <div className="p-6 flex flex-col justify-between">
                <h4 className="text-[16px] lg:text-lg font-semibold mb-2">Home Health Care Services</h4>
                <p className="text-[14px] lg:text-base text-gray-600 text-justify lg:text-left mb-3">
                  We bring comprehensive medical support directly to your home, ensuring personalized attention and
                  professional care for every patient.
                </p>
                <ul className="space-y-3 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-red-600 mt-1" />{' '}
                    <span className="text-gray-600">Geriatric Care</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-red-600 mt-1" />{' '}
                    <span className="text-gray-600">Chronic Wound Care</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-red-600 mt-1" />{' '}
                    <span className="text-gray-600">Physiotherapy & Rehabilitation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Partnering Section */}
        <section className="py-8 lg:py-16 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            {/* Left Content */}
            <div data-aos="fade-right">
              <h3 className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#1d1d1f] mb-6 text-center sm:text-left">
                Partnering with <em className="text-red-600">Healthcare </em> Professionals
              </h3>

              <p className="text-[14px] sm:text-base text-gray-600 mb-5 text-justify sm:text-left">
                MobiLab2u works exclusively with accredited doctors, nurses, lab technicians, paramedics, and
                counselors. Our platform provides these professionals with a flexible, reliable way to serve the
                community while earning supplementary income and building lasting patient relationships.
              </p>

              <p className="text-[14px] sm:text-base text-gray-600 mb-5 text-justify sm:text-left">
                Upon joining, every professional goes through a verification process. Once approved, they receive a
                medical starter kit (free for select early applicants) and can begin accepting service requests based on
                their skills and location.
              </p>

              <p className="text-[14px] sm:text-base text-gray-600 mb-5 text-justify sm:text-left leading-relaxed">
                All samples are transported securely to partner labs or collection centers. We do not charge patients
                any delivery fees for{' '}
                <Link href="/doctor-nurse-home-visit" className="text-red-600">
                  home visits by medical professionals
                </Link>
                .
              </p>

              <p className="text-[14px] sm:text-base text-gray-600 text-justify sm:text-left leading-relaxed">
                As part of our early growth model, the first 1,000 service providers will become shareholders upon IPO,
                with 10% of the company&apos;s shares distributed equally among them.
              </p>
            </div>

            {/* Right Content */}
            <div className="grid grid-cols-2 gap-6 relative" data-aos="fade-left">
              {/* Top Image */}
              <div className="col-span-2 overflow-hidden rounded-lg shadow">
                <Image
                  src="/assets/images/services/partnering-healthcare.webp"
                  title="Partnering With Accredited Healthcare Professionals Malaysia"
                  alt="Partnering with accredited healthcare professionals in Malaysia for trusted medical services"
                  width={600}
                  height={300}
                  className="w-full h-auto"
                />
              </div>

              {/* Middle Box */}
              <div className="h-[200px] flex flex-col justify-center rounded-xl bg-[#fef1e7] p-6 shadow-md text-center">
                <p className="text-[14px] sm:text-base text-gray-800 font-medium">
                  MobiLab2u is trusted by accredited doctors, nurses, and patients
                </p>

                <p className="text-3xl font-bold mt-3">100%</p>
                <p className="text-sm text-gray-600">satisfaction rate</p>
              </div>

              {/* Bottom Image */}
              <div className="relative h-[200px] rounded-xl overflow-hidden shadow-md">
                <Image
                  src="/assets/images/services/partnering-healthcare-mobilab2u.webp"
                  alt="Connect with trusted healthcare professionals in Malaysia for quality medical services"
                  title="Trusted Platform For Healthcare Professionals In Malaysia"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Lab Partners Section */}
        <section className="py-8 md:py-16 px-6 lg:px-12 overflow-hidden">
          <div className="max-w-screen-xl mx-auto text-center">
            <h3 className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#1d1d1f] mb-4 text-center">
              Top Diagnostic Lab Partners Across <em className="text-red-600 not-italic">Malaysia</em>
            </h3>

            <p className="text-gray-600 max-w-2xl mx-auto mb-12">
              We collaborate with a trusted network of diagnostics labs to ensure every test is processed with precision
              and care.
            </p>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-stretch"
              data-aos="fade-up"
            >
              {/* Partner 1 */}
              <div className="bg-white rounded-xl p-8 flex flex-col justify-center items-center text-center border border-[#ebedef] h-full">
                <div className="w-20 h-20 mb-4">
                  <a href="https://www.facebook.com/share/1AmdxhXQwR/?mibextid=wwXIfr">
                    <Image
                      src="/images/nexus.webp"
                      alt="Nexus Medilabs"
                      title="Nexus Medilabs"
                      width={80}
                      height={80}
                      className="w-full h-full object-contain filter"
                    />
                  </a>
                </div>
                <h4 className="text-[16px] sm:text-md lg:text-lg font-semibold text-[#1d1d1f] mb-2">Nexus Medilabs</h4>
                <p className="text-[14px] sm:text-base text-gray-600">
                  ESTABLISHED IN 2016 , Nexus Medilabs is a leading provider of scalable diagnostic solutions, dedicated
                  to empowering healthcare brands with high-quality, accurate, and affordable testing. We specialize in
                  comprehensive diagnostic services .
                </p>
              </div>

              {/* Partner 2 */}
              <div className="bg-white rounded-xl p-8 flex flex-col justify-center items-center text-center border border-[#ebedef] h-full">
                <div className="w-[7rem] h-20 mb-4">
                  <a href="https://synapselaboratory.com/">
                    <Image
                      src="/images/synapse.png"
                      alt="The Synapse Ideal"
                      title="The Synapse Ideal"
                      width={112}
                      height={80}
                      className="w-full h-full object-contain"
                    />
                  </a>
                </div>
                <h4 className="text-[16px] sm:text-md lg:text-lg font-semibold text-[#1d1d1f] mb-2">
                  The Synapse Ideal (part of Synagene Group)
                </h4>
                <p className="text-[14px] sm:text-base text-gray-600">
                  Synapse Sdn Bhd, a Synagene company, is a specialised genetic testing laboratory. It also runs Nexus
                  Medilabs Sdn Bhd, a healthcare screening and diagnostic laboratory, and MedicSkills Sdn Bhd, a
                  skills-based training provider.{' '}
                </p>
              </div>

              {/* Partner 3 */}
              <div className="bg-white rounded-xl p-8 flex flex-col justify-center items-center text-center border border-[#ebedef] h-full">
                <div className="w-20 h-20 mb-4">
                  <a href="https://www.premierintegratedlabs.com.my/">
                    <Image
                      src="/images/pantai.png"
                      alt="Pantai Premier Pathology"
                      title="Pantai Premier Pathology"
                      width={80}
                      height={80}
                      className="w-full h-full object-contain"
                    />
                  </a>
                </div>
                <h4 className="text-[16px] sm:text-md lg:text-lg font-semibold text-[#1d1d1f] mb-2">
                  Pantai Premier Pathology
                </h4>
                <p className="text-[14px] sm:text-base text-gray-600">
                  Pantai Premier Pathology Sdn Bhd has laboratories in the Pantai group of hospitals, Gleneagles
                  hospitals, and non-hospital-based branches within Malaysia. Their reference core laboratory is located
                  in Pantai Hospital Ampang.{' '}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#fef1e7] h-[370px] min-h-[300px] sm:min-h-[380px] md:min-h-[400px] lg:min-h-[370px] xl:min-h-[400px] py-6 pb-24 md:pb-10 flex md:items-center justify-center px-2 md:px-4 relative overflow-hidden">
          {/* Left Illustration */}
          <Image
            src="/assets/images/mobilab2u/home-healthcare-application.svg"
            alt="Access Healthcare Services Anytime With Mobile App Malaysia"
            title="Access Healthcare Services Anytime With Mobile App Malaysia"
            width={392}
            height={280}
            className="absolute left-0 bottom-0 max-h-[38%] md:max-h-[43%] lg:max-h-[60%] xl:max-h-[70%] object-contain z-10"
            loading="lazy"
          />

          {/* Right Illustration */}
          <Image
            src="/assets/images/mobilab2u/medicine-delivery.svg"
            alt="Fast Prescription Medicine Delivery Services In Malaysia"
            title="Fast Prescription Medicine Delivery Services In Malaysia"
            width={308}
            height={280}
            className="absolute right-0 bottom-0 max-h-[40%] md:max-h-[45%] lg:max-h-[62%] xl:max-h-[70%] object-contain z-10"
            loading="lazy"
          />

          {/* Center Content */}
          <div className="text-center max-w-3xl z-20 md:mt-0">
            <h3 className="font-secondary text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-[1.3] md:leading-[1.3] lg:leading-[1.3] xl:leading-[1.3] font-semibold text-black">
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

        {/* Fixed WhatsApp & Phone Buttons */}
        <div className="fixed right-1 sm:right-4 top-1/2 transform -translate-y-1/2 z-50">
          <Link href="https://wa.me/+60125412990?text=How we can help you?" target="_blank" rel="noopener noreferrer">
            <Image
              src="/assets/images/svg/whatsapp.gif"
              alt="WhatsApp"
              title="Chat with us"
              width={45}
              height={45}
              className="w-[45px] h-[45px] drop-shadow-md hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
          </Link>

          <Link href="tel:+60125412990" target="_blank" rel="noopener noreferrer">
            <Image
              src="/assets/images/phone-icon.gif"
              alt="phone"
              title="Call us"
              width={45}
              height={45}
              className="w-[45px] h-[45px] drop-shadow-md hover:scale-110 transition-transform duration-300 lg:hidden mt-2"
              loading="lazy"
            />
          </Link>
        </div>
      </main>
    </>
  )
}
