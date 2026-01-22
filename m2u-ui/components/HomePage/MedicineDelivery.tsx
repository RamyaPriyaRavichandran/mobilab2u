'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { initAOS, initSmoothScroll, initSplitting, initSwiper } from './animations'

interface AccordionItem {
  id: number
  title: string
  content: string
  items?: string[]
}

export default function MedicineDelivery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [openDrugClass, setOpenDrugClass] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    // Initialize animations
    initAOS()
    initSmoothScroll()
    initSplitting()
    initSwiper()
  }, [])

  const toggleDrugClass = (key: string) => {
    setOpenDrugClass((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const faqItems: AccordionItem[] = [
    {
      id: 0,
      title: 'Is it legal to get prescription-only medications delivered to your home in Malaysia?',
      content:
        "Yes, it's legal if the service follows Ministry of Health regulations. Prescriptions must be filled by a registered Doctor, and no delivery of controlled substances. MobiLab2u fully complies with these rules.",
    },
    {
      id: 1,
      title: 'What kinds of medication will be eligible in this mode of delivery?',
      content:
        'MobiLab2u delivers specifically over-the-counter (OTC) medicines and prescription-only (POM) drugs. Delivery of the medicine under the Dangerous Drugs Act 1952 is not allowed.',
    },
    {
      id: 2,
      title: 'How do I submit a prescription?',
      content:
        'Share a clear electronic copy signed by a registered doctor for pharmacist verification. Hand over the original to the delivery agent at the time of delivery.',
    },
    {
      id: 3,
      title: 'What is the average delivery time?',
      content:
        'Delivery period depends on the location of the patient and the order timing. Within 24 to 48 hours after verification of the prescription, delivery can be made for city areas.',
    },
    {
      id: 4,
      title: 'How is patient information protected?',
      content:
        'Patient information at MobiLab2u is treated with utmost security via encrypted systems and procedures per the Personal Data Protection Act 2010. Information is kept confidential and only disclosed to authorized personnel.',
    },
  ]

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-[#fef1e7] pt-8 pb-16 md:pt-[3rem] md:pb-[6rem]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-[20px] md:text-3xl font-bold text-black mb-2">
            Online Prescription Medication Delivery in Malaysia
          </h1>

          <ul className="flex flex-wrap justify-center gap-0 text-sm text-black font-semibold mt-[24px]">
            <li className="flex items-center gap-1">
              <Image src="/assets/images/svg/home.svg" alt="" title="" width={16} height={16} className="w-4 h-4" />
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
            <li className="text-gray-500">Prescription Medication Delivery</li>
          </ul>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="bg-[url('/assets/images/bg/shape-06.webp')] bg-no-repeat bg-cover bg-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-8 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-left">
            <h2
              className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#1d1d1f] mb-6 splt-txt text-center lg:text-left"
              data-splitting
              data-aos="fade-in"
            >
              Quick Online <em className="text-red-600">Pharmacy & Medicine</em> Delivery in Malaysia
            </h2>
            <p className="text-[14px] sm:text-base text-gray-600 mb-[1.5rem] sm:mb-10 text-justify sm:text-left">
              MobiLab2u offers an acceptable and safe means for individuals to receive prescription medication directly
              at home. To facilitate patient convenience and compliance, our service overcomes obstacles such as
              mobility issues and time conflicts that otherwise restrict access to pharmaceutical therapy. By bridging
              patients with authorized pharmacists and reputable logistics firms, MobiLab2u provides on-time delivery of
              medicine in a safe environment with an intact chain of custody from the dispensing pharmacy through to the
              patient.
            </p>

            <p className="text-[14px] sm:text-base text-gray-600 text-justify sm:text-left">
              The procedure is sound and patient-focused{' '}
              <Link href="/services" title="Home Healthcare Services" className="text-red-600">
                {' '}
                healthcare service{' '}
              </Link>{' '}
              from a clinical point of view and adheres to all regulatory requirements. The procedure starts with the
              patient bringing a valid prescription. Proper authentication by a qualified pharmacist comes next. The
              drug is then Handled professionally after clearance, sealed in safe conditions, and transported for
              delivery. Confirmation of identification at delivery and real-time track-and-locate are standard
              protocols, which guarantee that the right drug is delivered to the right patient.
            </p>

            <p className="text-[14px] sm:text-base mt-4 mb-0">Important elements of the MobiLab2u service are</p>

            <ul className="space-y-2 mt-5">
              <li className="flex items-start gap-2">
                <span className="mt-1 min-w-4 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-[14px] sm:text-base font-semibold text-[#001e2b] leading-snug">
                  Complete conformity to all Ministry of Health (MOH) Malaysia regulations
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 min-w-4 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-[14px] sm:text-base font-semibold text-[#001e2b] leading-snug">
                  Effective delivery that is secure, traceable, and temperature-controlled
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 min-w-4 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-[14px] sm:text-base font-semibold text-[#001e2b] leading-snug">
                  Trained pharmacists prepare and dispense medicines
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 min-w-4 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-[14px] sm:text-base font-semibold text-[#001e2b] leading-snug">
                  Secure patient confidentiality and data privacy controls are implemented
                </span>
              </li>
            </ul>

            <p className="text-[14px] sm:text-base mt-5">
              MobiLab2u is an essential part of contemporary medicine, ensuring an easy and safe way of managing
              medication without compromising professional standards or safety.
            </p>
          </div>

          <div className="flex justify-center" data-aos="fade-right">
            <Image
              src="/assets/images/services/quick-online-pharmacy-medicine-delivery-malaysia.webp"
              alt="Order medicines and access quick online pharmacy delivery in Malaysia for fast, safe, and healthcare"
              title="Quick Online Pharmacy & Medicine Delivery In Malaysia"
              width={592}
              height={540}
              loading="lazy"
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Medication Types Section */}
      <section className="max-w-7xl mx-auto py-8 md:py-12 px-4 overflow-hidden">
        <h3
          className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-6 sm:mb-12 text-center splt-txt"
          data-splitting
          data-aos="fade-in"
        >
          Fast Medication Delivery for <em className="text-red-600"> Common Conditions </em> In Malaysia
        </h3>

        <p className="text-[14px] sm:text-base text-gray-600 text-center mb-5">
          We offer delivery of both prescription (Rx) and over-the-counter (OTC) medications for a variety of
          therapeutic modalities. This may include Chronic conditions or Acute conditions; be assured that your
          therapeutic needs are met and the continuity of care is achieved.
        </p>

        <div className="bg-[#fef1e7] p-6 rounded-2xl shadow">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Cardiovascular Drug Class */}
            <div>
              <button
                onClick={() => toggleDrugClass('cardio')}
                className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                    <Image
                      src="/assets/images/svg/cardio-vascular-drug.svg"
                      alt="Cardiovascular Medications Delivered Quickly In Malaysia"
                      title="Cardiovascular Medications Delivered Quickly In Malaysia"
                      width={40}
                      height={40}
                      loading="lazy"
                      className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                    />
                  </div>
                  <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                    Cardiovascular Drug Class
                  </span>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${openDrugClass['cardio'] ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openDrugClass['cardio'] && (
                <div className="bg-white p-4 mt-2 rounded-2xl shadow text-sm text-gray-700">
                  <p className="text-gray-600 mb-5">
                    Treatment of hypertension, hyperlipidemia, and cardiovascular conditions <br />
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong> Includes:</strong>
                  </p>

                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Antihypertensives (Angiotensin-converting enzyme inhibitors, beta blockers)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Lipid-lowering agents (statins)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Antiplatelet agents
                    </li>
                  </ul>

                  <div className="mt-6">
                    <button className="inline-block px-6 py-2 text-white bg-black rounded-md font-semibold hover:bg-red-600 transition">
                      Coming Soon
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Diabetes Drug Class */}
            <div>
              <button
                onClick={() => toggleDrugClass('diabetes')}
                className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                    <Image
                      src="/assets/images/svg/diabetes-drug.svg"
                      alt="Fast Diabetes Medication Delivery Services Across Malaysia"
                      title="Fast Diabetes Medication Delivery Services Across Malaysia"
                      width={40}
                      height={40}
                      loading="lazy"
                      className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                    />
                  </div>
                  <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                    Diabetes Drug Class
                  </span>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${openDrugClass['diabetes'] ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openDrugClass['diabetes'] && (
                <div className="bg-white p-4 mt-2 rounded-2xl shadow text-sm text-gray-700">
                  <p className="text-gray-600 mb-5">
                    Control blood glucose levels in patients with Diabetes Type 1 or Type 2
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong> Includes:</strong>
                  </p>

                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Oral hypoglycemic agents (Metformin)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Insulin
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Injectables
                    </li>
                  </ul>

                  <div className="mt-6">
                    <button className="inline-block px-6 py-2 text-white bg-black rounded-md font-semibold hover:bg-red-600 transition">
                      Coming Soon
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Respiratory Drug Class */}
            <div>
              <button
                onClick={() => toggleDrugClass('respiratory')}
                className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                    <Image
                      src="/assets/images/svg/respiratory-drug.svg"
                      alt="Quick Respiratory Medication Delivery Services, Malaysia"
                      title="Quick Respiratory Medication Delivery Services, Malaysia"
                      width={40}
                      height={40}
                      loading="lazy"
                      className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                    />
                  </div>
                  <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                    Respiratory Drug Class
                  </span>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${openDrugClass['respiratory'] ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openDrugClass['respiratory'] && (
                <div className="bg-white p-4 mt-2 rounded-2xl shadow text-sm text-gray-700">
                  <p className="text-gray-600 mb-5">
                    Management of asthma, COPD, and other potential respiratory conditions
                  </p>
                  <p className="text-gray-600 mb-2">
                    {' '}
                    <strong> Includes:</strong>
                  </p>

                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Inhalers
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Bronchodilators
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Corticosteroids
                    </li>
                  </ul>

                  <div className="mt-6">
                    <button className="inline-block px-6 py-2 text-white bg-black rounded-md font-semibold hover:bg-red-600 transition">
                      Coming Soon
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Antibiotics & Antivirals Drug Class */}
            <div>
              <button
                onClick={() => toggleDrugClass('antibiotics')}
                className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                    <Image
                      src="/assets/images/svg/antibiotic-drug.svg"
                      alt="Fast Antibiotics & Antivirals Medication Delivery Services Across Malaysia"
                      title="Fast Antibiotics & Antivirals Medication Delivery Services Across Malaysia"
                      width={40}
                      height={40}
                      loading="lazy"
                      className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                    />
                  </div>
                  <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                    Antibiotics & Antivirals
                  </span>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${openDrugClass['antibiotics'] ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openDrugClass['antibiotics'] && (
                <div className="bg-white p-4 mt-2 rounded-2xl shadow text-sm text-gray-700">
                  <p className="text-gray-600 mb-5">Treating bacterial and viral infections</p>
                  <p className="text-gray-600 mb-2">
                    <strong> Includes:</strong>
                  </p>

                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      All antibiotic classes
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Antivirals for an array of infectious/viral conditions
                    </li>
                  </ul>

                  <div className="mt-6">
                    <button className="inline-block px-6 py-2 text-white bg-black rounded-md font-semibold hover:bg-red-600 transition">
                      Coming Soon
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Hormonal Medications Drug Class */}
            <div>
              <button
                onClick={() => toggleDrugClass('hormonal')}
                className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                    <Image
                      src="/assets/images/svg/hormones-drug.svg"
                      alt="Fast Hormonal Medications Delivery Services Across Malaysia"
                      title="Fast Hormonal Medications Delivery Services Across Malaysia"
                      width={40}
                      height={40}
                      loading="lazy"
                      className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                    />
                  </div>
                  <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                    Hormonal Medications
                  </span>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${openDrugClass['hormonal'] ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openDrugClass['hormonal'] && (
                <div className="bg-white p-4 mt-2 rounded-2xl shadow text-sm text-gray-700">
                  <p className="text-gray-600 mb-5">
                    Used for birth control, thyroid conditions, or hormone replacement.
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong> Includes:</strong>
                  </p>

                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Oral contraceptives
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Levothyroxine
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Menopause hormone therapy
                    </li>
                  </ul>

                  <div className="mt-6">
                    <button className="inline-block px-6 py-2 text-white bg-black rounded-md font-semibold hover:bg-red-600 transition">
                      Coming Soon
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Pain & Inflammation Drug Class */}
            <div>
              <button
                onClick={() => toggleDrugClass('pain')}
                className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                    <Image
                      src="/assets/images/svg/inflammation-pain.svg"
                      alt="Fast Pain & Inflammation Medication Delivery Services Across Malaysia"
                      title="Fast Pain & Inflammation Medication Delivery Services Across Malaysia"
                      width={40}
                      height={40}
                      loading="lazy"
                      className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                    />
                  </div>
                  <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                    Pain & Inflammation
                  </span>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${openDrugClass['pain'] ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openDrugClass['pain'] && (
                <div className="bg-white p-4 mt-2 rounded-2xl shadow text-sm text-gray-700">
                  <p className="text-gray-600 mb-5">Helps relieve chronic pain, swelling, and joint issues.</p>
                  <p className="text-gray-600 mb-2">
                    <strong> Includes:</strong>
                  </p>

                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      NSAIDs like ibuprofen
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Other pain relievers
                    </li>
                  </ul>

                  <div className="mt-6">
                    <button className="inline-block px-6 py-2 text-white bg-black rounded-md font-semibold hover:bg-red-600 transition">
                      Coming Soon
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Vitamins & Supplements Drug Class */}
            <div>
              <button
                onClick={() => toggleDrugClass('vitamins')}
                className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                    <Image
                      src="/assets/images/svg/vitamin-supplement.svg"
                      alt="Fast Vitamins & Supplements Delivery Services Across Malaysia"
                      title="Fast Vitamins & Supplements Delivery Services Across Malaysia"
                      width={40}
                      height={40}
                      loading="lazy"
                      className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                    />
                  </div>
                  <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                    Vitamins & Supplements
                  </span>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${openDrugClass['vitamins'] ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openDrugClass['vitamins'] && (
                <div className="bg-white p-4 mt-2 rounded-2xl shadow text-sm text-gray-700">
                  <p className="text-gray-600 mb-5">Supports overall health and fills nutritional gaps.</p>
                  <p className="text-gray-600 mb-2">
                    <strong> Includes:</strong>
                  </p>

                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Multivitamins
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Minerals and daily supplements
                    </li>
                  </ul>

                  <div className="mt-6">
                    <button className="inline-block px-6 py-2 text-white bg-black rounded-md font-semibold hover:bg-red-600 transition">
                      Coming Soon
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Digestive Health Drug Class */}
            <div>
              <button
                onClick={() => toggleDrugClass('digestive')}
                className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                    <Image
                      src="/assets/images/svg/stomach-digestive-health.svg"
                      alt="Fast Digestive Health Medication Delivery Services Across Malaysia"
                      title="Fast Digestive Health Medication Delivery Services Across Malaysia"
                      width={40}
                      height={40}
                      loading="lazy"
                      className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                    />
                  </div>
                  <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                    Digestive Health
                  </span>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${openDrugClass['digestive'] ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openDrugClass['digestive'] && (
                <div className="bg-white p-4 mt-2 rounded-2xl shadow text-sm text-gray-700">
                  <p className="text-gray-600 mb-5">Treats heartburn, ulcers, and other stomach issues.</p>
                  <p className="text-gray-600 mb-2">
                    <strong> Includes:</strong>
                  </p>

                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Acid reducers (PPIs)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Antacids
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      H2 blockers
                    </li>
                  </ul>

                  <div className="mt-6">
                    <button className="inline-block px-6 py-2 text-white bg-black rounded-md font-semibold hover:bg-red-600 transition">
                      Coming Soon
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Skin Medications Drug Class */}
            <div>
              <button
                onClick={() => toggleDrugClass('skin')}
                className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                    <Image
                      src="/assets/images/svg/skin-medications.svg"
                      alt="Fast Skin Medications Delivery Services Across Malaysia"
                      title="Fast Skin Medications Delivery Services Across Malaysia"
                      width={40}
                      height={40}
                      loading="lazy"
                      className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                    />
                  </div>
                  <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                    Skin Medications
                  </span>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${openDrugClass['skin'] ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openDrugClass['skin'] && (
                <div className="bg-white p-4 mt-2 rounded-2xl shadow text-sm text-gray-700">
                  <p className="text-gray-600 mb-5">Manages skin conditions like acne, eczema, and psoriasis.</p>
                  <p className="text-gray-600 mb-2">
                    <strong> Includes:</strong>
                  </p>

                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Creams and ointments
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Oral treatments for severe cases
                    </li>
                  </ul>

                  <div className="mt-6">
                    <button className="inline-block px-6 py-2 text-white bg-black rounded-md font-semibold hover:bg-red-600 transition">
                      Coming Soon
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Neurological Medications Drug Class */}
            <div>
              <button
                onClick={() => toggleDrugClass('neurological')}
                className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                    <Image
                      src="/assets/images/svg/neurology-medications.svg"
                      alt="Fast Neurological Medications Delivery Services Across Malaysia"
                      title="Fast Neurological Medications Delivery Services Across Malaysia"
                      width={40}
                      height={40}
                      loading="lazy"
                      className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                    />
                  </div>
                  <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                    Neurological Medications
                  </span>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${openDrugClass['neurological'] ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openDrugClass['neurological'] && (
                <div className="bg-white p-4 mt-2 rounded-2xl shadow text-sm text-gray-700">
                  <p className="text-gray-600 mb-5">For migraines, epilepsy, and nerve pain.</p>
                  <p className="text-gray-600 mb-2">
                    <strong> Includes:</strong>
                  </p>

                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Anti-seizure drugs
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Nerve pain relief
                    </li>
                  </ul>

                  <div className="mt-6">
                    <button className="inline-block px-6 py-2 text-white bg-black rounded-md font-semibold hover:bg-red-600 transition">
                      Coming Soon
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mental Health Medications Drug Class */}
            <div>
              <button
                onClick={() => toggleDrugClass('mentalhealth')}
                className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                    <Image
                      src="/assets/images/svg/mental-medicines.svg"
                      alt="Fast Mental Health Medications Delivery Services Across Malaysia"
                      title="Fast Mental Health Medications Delivery Services Across Malaysia"
                      width={40}
                      height={40}
                      loading="lazy"
                      className="w-10 h-10 filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
                    />
                  </div>
                  <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                    Mental Health Medications
                  </span>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${openDrugClass['mentalhealth'] ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openDrugClass['mentalhealth'] && (
                <div className="bg-white p-4 mt-2 rounded-2xl shadow text-sm text-gray-700">
                  <p className="text-gray-600 mb-5">
                    <strong>Common uses:</strong> Management of anxiety and depression
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong> Includes:</strong>
                  </p>

                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Antidepressants
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Anxiolytics
                    </li>
                  </ul>

                  <div className="mt-6">
                    <button className="inline-block px-6 py-2 text-white bg-black rounded-md font-semibold hover:bg-red-600 transition">
                      Coming Soon
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="text-[14px] sm:text-base text-gray-600 text-center mb-5 mt-4">
          MobiLab2u uses a strict interpretation of the law with respect to the delivery of medications. We will not
          deliver products classified as Dangerous Drugs or psychotropic substances under the Malaysian Poisons Act
          1952.
        </p>
      </section>

      {/* Delivery Process Section */}
      <section className="relative py-8 px-4 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-5 text-center">
          How MobiLab2u <em className="text-red-600">Delivers Medications Safely </em>Across Malaysia?
        </h2>

        <div className="relative flex flex-col lg:flex-row max-w-7xl mx-auto gap-6 lg:gap-10">
          {/* Left Image Section */}
          <div className="w-full lg:w-1/2">
            <div className="lg:sticky lg:top-40 flex justify-center items-start" data-aos="fade-right">
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                <Image
                  src="/assets/images/services/mobilab2u-delivers-medications-safely-across-malaysia.svg"
                  alt="Get medications delivered safely & securely across Malaysia with fast service for all prescriptions"
                  title="Safe & Reliable Medication Delivery Services Across Malaysia"
                  width={512}
                  height={341}
                  loading="lazy"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Cards Section */}
          <div className="w-full lg:w-1/2" data-aos="fade-in">
            {/* Card 1 */}
            <div className="relative z-10 card bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-lg transition p-6 overflow-hidden mb-8">
              <div className="flex items-start gap-5 relative z-10">
                <Image
                  src="/assets/images/svg/prescription-upload.svg"
                  alt="Upload Prescriptions For Online Medicine Delivery, Malaysia"
                  title="Upload Prescriptions For Online Medicine Delivery, Malaysia"
                  width={48}
                  height={48}
                  loading="lazy"
                  className="shrink-0 w-12 sm:w-12"
                />
                <div>
                  <h3 className="text-[16px] sm:text-xl font-semibold text-gray-900">Prescription Upload</h3>
                  <p className="mt-2 text-gray-600 text-[14px] sm:text-base text-justify sm:text-left">
                    Through our safe platform, patients post an unobstructed picture of a legitimate, in-doctor-approved
                    prescription.
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
                  src="/assets/images/svg/prescription-authentication.svg"
                  alt="Authenticate Prescriptions With Pharmacists Online, Malaysia"
                  title="Authenticate Prescriptions With Pharmacists Online, Malaysia"
                  width={48}
                  height={48}
                  loading="lazy"
                  className="shrink-0 w-16 sm:w-14"
                />
                <div>
                  <h3 className="text-[16px] sm:text-xl font-semibold text-gray-900">Prescription Authentication</h3>
                  <p className="mt-2 text-gray-600 text-[14px] sm:text-base text-justify sm:text-left">
                    Along with the prescription, patient details and the credentials and prescription of the doctor are
                    verified by our licensed pharmacist in charge.
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
                  src="/assets/images/svg/needed-clarification.svg"
                  alt="Clarify Prescription Details With Pharmacists In Malaysia"
                  title="Clarify Prescription Details With Pharmacists In Malaysia"
                  width={48}
                  height={48}
                  loading="lazy"
                  className="shrink-0 w-16 sm:w-14"
                />
                <div>
                  <h3 className="text-[16px] sm:text-xl font-semibold text-gray-900">Needed Clarification?</h3>
                  <p className="mt-2 text-gray-600 text-[14px] sm:text-base text-justify sm:text-left">
                    In case of uncertainty, the pharmacist will telephone the patient to clarify or correct information.
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
                  src="/assets/images/svg/safer-dispensing.svg"
                  alt="Safe Dispensing Of Medications By Pharmacists, Malaysia"
                  title="Safe Dispensing Of Medications By Pharmacists, Malaysia"
                  width={48}
                  height={48}
                  loading="lazy"
                  className="shrink-0 w-16 sm:w-14"
                />
                <div>
                  <h3 className="text-[16px] sm:text-xl font-semibold text-gray-900">Safe Dispensing</h3>
                  <p className="mt-2 text-gray-600 text-[14px] sm:text-base text-justify sm:text-left">
                    The drugs can be prepared by the registered pharmacist in the requisite dispensing procedures.
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
                  src="/assets/images/svg/safe-bundling.svg"
                  alt="Temperature Controlled & Packaging Of Medicines, Malaysia"
                  title="Temperature Controlled & Packaging Of Medicines, Malaysia"
                  width={48}
                  height={48}
                  loading="lazy"
                  className="shrink-0 w-16 sm:w-14"
                />
                <div>
                  <h3 className="text-[16px] sm:text-xl font-semibold text-gray-900">Safe Bundling</h3>
                  <p className="mt-2 text-gray-600 text-[14px] sm:text-base text-justify sm:text-left">
                    All of the products are transported in temperature-controlled and tamper-evident containers as a
                    quality and safety guarantee.
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
                  src="/assets/images/svg/medicine-delivery-verified.svg"
                  alt="Verified Medication Delivery To Recipients In Malaysia"
                  title="Verified Medication Delivery To Recipients In Malaysia"
                  width={48}
                  height={48}
                  loading="lazy"
                  className="shrink-0 w-16 sm:w-14"
                />
                <div>
                  <h3 className="text-[16px] sm:text-xl font-semibold text-gray-900">Verified Delivery</h3>
                  <p className="mt-2 text-gray-600 text-[14px] sm:text-base text-justify sm:text-left">
                    Trained personnel deliver the medicine. The recipient&apos;s ID is verified to ensure it reaches the
                    right hands.
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

      {/* Our Commitment to Safety & Clinical Integrity Section */}
      <section className="py-4 sm:py-12 overflow-hidden">
        <h3
          className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-12 text-center splt-txt"
          data-splitting
          data-aos="fade-in"
        >
          <em className="text-red-600"> Our Commitment</em> to Safety & Clinical Integrity
        </h3>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up">
          {/* Card 1 */}
          <div className="bg-[#fef1e7] rounded-2xl p-6">
            <h4 className="text-base sm:text-xl font-semibold text-gray-800 mb-4">Regulatory & Clinical Compliance</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Follows the Malaysian Poisons Act 1952</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Excludes controlled and psychotropic drugs</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Complete audit trail from prescription to delivery</span>
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="bg-[#fef1e7] rounded-2xl p-6">
            <h4 className="text-base sm:text-xl font-semibold text-gray-800 mb-4">Secure Handling & Delivery</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Dispensed by licensed pharmacists</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Tamper-evident, cold-chain packaging</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Verified delivery with patient ID check</span>
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-[#fef1e7] rounded-2xl p-6">
            <h4 className="text-base sm:text-xl font-semibold text-gray-800 mb-4">Data Privacy & System Integrity</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Encrypted platforms for prescription uploads</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Strict confidentiality under PDPA 2010</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Regular audits to maintain data security and service standards</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Who Can Benefit Section */}
      <section className="py-8 sm:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-8 px-4">
          {/* Left Content */}
          <div className="flex-1" data-aos="fade-right">
            <h3
              className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#1d1d1f] mb-6 text-center sm:text-left splt-txt"
              data-splitting
              data-aos="fade-in"
            >
              Who Can Benefit From At-home
              <em className="text-red-600"> Medication Delivery</em> In Malaysia?
            </h3>

            {/* Feature List */}
            <div className="bg-[#fef1e7] border border-gray-200 rounded-lg p-6">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-gray-700">Busy professionals</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-gray-700">Elderly patients</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-gray-700">People with disabilities</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-gray-700">Caregivers managing medication for family members</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-gray-700">Residents in remote or rural areas with limited pharmacy access</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-gray-700">
                    Patients with chronic conditions requiring regular prescription refills
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-gray-700">Individuals recovering from surgery or confined to bed</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-gray-700">Immunocompromised patients who prefer to avoid crowded places</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-gray-700">Mental health patients who benefit from discreet and consistent care</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-gray-700">
                    Students and expats living away from their regular healthcare providers
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 w-full" data-aos="zoom-in">
            <Image
              src="/assets/images/services/benefit-from-home-medication-delivery-malaysia.webp"
              alt="Medications are delivered safely across Malaysia using verified prescriptions, and secure packaging."
              title="Safe & Secure Medication Delivery Services Across Malaysia"
              width={500}
              height={600}
              loading="lazy"
              className="max-w-full md:max-w-[500px] object-cover shadow-lg mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Why MobiLab2u Section */}
      <section className="bg-[#fef1e7] py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Title */}
          <h3
            className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 text-center splt-txt"
            data-splitting
            data-aos="fade-in"
          >
            Why MobiLab2u For <em className="text-red-600">Online Prescription Delivery</em> In Malaysia?
          </h3>

          {/* 3 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up">
            {/* Card 1 */}
            <div className="bg-white p-6 sm:p-[2.5rem] rounded-2xl shadow-sm">
              <Image
                src="/assets/images/svg/licened-medicines.svg"
                alt="Licensed Pharmacist Supervised Medication Delivery, Malaysia"
                title="Licensed Pharmacist Supervised Medication Delivery, Malaysia"
                width={48}
                height={48}
                loading="lazy"
                className="w-12 h-12 mb-[1.5rem] filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
              />
              <h4 className="text-[16px] sm:text-xl font-semibold text-black mb-2">Licensed Dispensing</h4>
              <p className="text-[14px] text-justify sm:text-base sm:text-left">
                All the medicines are delivered under the direct supervision of registered pharmacists and, therefore,
                provide safety and precision and meet pharmaceutical standards.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 sm:p-[2.5rem] rounded-2xl shadow-sm">
              <Image
                src="/assets/images/svg/secure-delivery.svg"
                alt="Secure Signed Delivery With Tamper-proof Packaging, Malaysia"
                title="Secure Signed Delivery With Tamper-proof Packaging, Malaysia"
                width={48}
                height={48}
                loading="lazy"
                className="w-12 h-12 mb-[1.5rem] filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
              />
              <h4 className="text-[16px] sm:text-xl font-semibold text-black mb-2">
                Secure Delivery Signed-Through Delivery
              </h4>
              <p className="text-[14px] text-justify sm:text-base sm:text-left">
                Medications are packaged in tamper-avoidance and temperature-controlled packaging and cannot be
                delivered until the patient&#39;s identity is checked.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 sm:p-[2.5rem] rounded-2xl shadow-sm">
              <Image
                src="/assets/images/svg/nationwide-reach.svg"
                alt="Nationwide Prescription Delivery Available Across Malaysia"
                title="Nationwide Prescription Delivery Available Across Malaysia"
                width={48}
                height={48}
                loading="lazy"
                className="w-12 h-12 mb-[1.5rem] filter [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(92%)_saturate(7452%)_hue-rotate(353deg)_brightness(98%)_contrast(112%)]"
              />
              <h4 className="text-[16px] sm:text-xl font-semibold text-black mb-2">Nationwide Reach</h4>
              <p className="text-[14px] text-justify sm:text-base sm:text-left">
                Available across major Malaysian cities, with expanding coverage throughout Peninsular Malaysia for
                reliable doorstep access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Areas We Cover Section */}
      <section className="py-8 md:py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h3 className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-6 splt-txt">
            Areas We Cover for Quality<em className="text-red-600"> Healthcare Services in Malaysia</em>
          </h3>

          <p className="text-sm md:text-lg text-gray-600 mb-10">
            The MobiLab2u service operates in key urban and suburban centers and is expanding its geographical coverage.
            Current service areas include:
          </p>

          <div className="flex flex-wrap justify-center lg:gap-4 gap-2" data-aos="fade-up">
            {[
              'Kuala Lumpur',
              'Selangor',
              'Johor Bahr',
              'Penang',
              'Pahang',
              'Perlis',
              'Melaka',
              'Kedah',
              'Kelantan',
              'Sabah',
              'Sarawak',
              'Terengganu',
              'Negeri Sembilan',
              'Perak',
            ].map((location) => (
              <div
                key={location}
                className="flex items-center gap-1 md-gap-3 md:px-6 md:py-2 py-1 px-2 border border-gray-300 rounded-full hover:shadow transition"
              >
                <Image
                  src="/assets/images/svg/location.svg"
                  alt=""
                  title=""
                  width={24}
                  height={24}
                  loading="lazy"
                  className="md:w-6 md:h-6 w-3 h-3"
                />
                <span className="md:text-sm text-[12px] font-medium text-[#0d1623]">{location}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fef1e7] py-8 md:py-16 px-6 md:px-10 rounded-2xl text-center max-w-7xl mx-auto overflow-hidden">
        <div className="max-w-5xl mx-auto" data-aos="fade-up">
          <h3
            className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-6 splt-txt"
            data-splitting
            data-aos="fade-in"
          >
            Secure Your <em className="text-red-600">Prescription Medication</em> Today with MobiLab2u
          </h3>

          <p className="text-sm md:text-lg text-gray-600 mb-10">
            Utilize our professional and secure service for seamless access to your essential medications. Initiate your
            order by uploading your prescription, and receive trusted pharmaceutical care at your convenience.
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
                  strokeWidth={2}
                  d="M14.752 11.168l-5.197-3.027A1 1 0 008 9.027v5.946a1 1 0 001.555.832l5.197-3.027a1 1 0 000-1.664z"
                />
              </svg>
              Register
            </Link>

            {/* <Link
              href="/packages"
              className="flex-1 sm:flex-none px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-black transition text-sm sm:text-base text-center"
            >
              Book now
            </Link> */}
          </div>
        </div>
      </section>

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
            FAQs About At-Home <em className="text-red-600">Medication Delivery Services</em> in Malaysia
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full" data-aos="fade-up">
          {/* FAQ Accordion */}
          <div className="col-span-12 space-y-6">
            {faqItems.map((item) => (
              <div key={item.id} className="border rounded-lg shadow-sm p-4 sm:p-6">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setOpenIndex(openIndex === item.id ? null : item.id)}
                >
                  <h4 className="text-[16px] sm:text-lg font-semibold">{item.title}</h4>
                  <span className="text-gray-500 text-xl">{openIndex === item.id ? '✖' : '＋'}</span>
                </div>
                {openIndex === item.id && (
                  <div className="mt-4 text-[14px] sm:text-[15px] text-gray-700">{item.content}</div>
                )}
              </div>
            ))}
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
          loading="lazy"
          className="absolute left-0 bottom-0 max-h-24 md:max-h-[38%] lg:max-h-[60%] xl:max-h-[70%] object-contain z-10"
        />

        {/* Right Illustration */}
        <Image
          src="/assets/images/mobilab2u/medicine-delivery.svg"
          alt="Fast Prescription Medicine Delivery Services In Malaysia"
          title="Fast Prescription Medicine Delivery Services In Malaysia"
          width={308}
          height={280}
          loading="lazy"
          className="absolute right-0 bottom-0 max-h-24 md:max-h-[45%] lg:max-h-[62%] xl:max-h-[70%] object-contain z-10"
        />

        {/* Decorative SVG Star 1 */}
        <div className="absolute left-[2%] top-[20%] md:left-[24%] lg:left-[27%] md:top-[40%] rotate-45 z-0">
          <svg width="48" height="54" viewBox="0 0 193 216" fill="none">
            <g clipPath="url(#clip0_26_34468)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M55.3 109.9C54.2 109.7 53.3 109.6 52.6 109.3C47.1 106.4 41.7 103.4 36.2 100.7C29.4667 97.4333 22.4333 95.1333 15.1 93.8C10.3 92.9 5.49999 91.9 0.899992 91C-0.200008 89.5 1.69999 88.3 0.699992 87C1.99999 86.1 3.19999 86.3 4.49999 86.5C6.69999 87 8.99999 87.5 11.2 88C15 88.8 18.8 89 22.6 88.7C28.9 88.2 35.2 87.7 41.5 86.9C46.1 86.3 50.6 85.2 54.8 83C56.8 82 58.9 81.4 60.9 80.4C62.3 79.6 63.6 78.6 65 77.8C70.6 74.7 75.8 71.1 80.4 66.5C86 61 90.3 54.4999 95 48.2999C100.3 41.1999 102.7 32.9 104.7 24.5C106.3 17.5 108.3 10.6 109 3.39995C109.1 2.49995 109.5 1.69995 109.8 0.799951C110.333 0.799951 110.867 0.766618 111.4 0.699951C111.5 0.999951 111.7 1.29995 111.7 1.49995C111.5 4.09995 111.2 6.69995 111.2 9.29995C111.2 14.9 111.3 20.5 111.3 26.1C111.3 32.5 111.4 38.9 111.4 45.4C111.3 51.5 112.4 57.3 114.8 62.9C115.3 64.1 115.7 65.4 115.9 66.7C116.5 70.5 118.3 73.7 120.9 76.5C123.1 78.8 125 81.2 127.2 83.5C129.9 86.5 133.3 88.6 136.8 90.4C139.8 91.9333 142.7 93.5666 145.5 95.3C149.3 97.6 153.5 98.9 157.8 100C161.7 100.9 165.7 101.8 169.6 102.9C173.7 104 177.8 104.3 181.9 104.7C185.2 105.1 188.5 105.5 192.3 105.9C191.7 106.5 191.4 107 191.2 107C183.4 107.2 175.5 107.3 167.8 107.7C163.5 108 159.3 108.6 155.2 109.4C150.3 110.3 145.4 111.4 140.7 112.7C135.5 114.1 130.4 115.9 125.4 117.7C120.5 119.4 116.5 122.5 112.5 125.9C109.2 128.9 107.6 133 105 136.4C101.4 141 99.7 146.6 98.2 152.2C95.7 161.7 93.2 171.3 91.1 180.9C89 190.7 87.4 200.6 86.7 210.6C86.6 211.8 86.1 212.9 85.7 214.1C85.5 214.4 85 214.7 84.7 214.9C83.8 214.2 83 213.5 82.3 212.8C81.3 212 81.1 210.9 81.2 209.7C81.4 202.8 81.8 195.9 82 189C82.1 183.9 82.4 178.7 82.1 173.6C81.7 167.5 80.9 161.4 79.9 155.4C79.3 151.7 78 148 76.9 144.4C75.6 139.8 73.4 135.6 71.7 131.3C70.7 128.7 68.9 126.5 68.1 123.9C67.9 123.5 67.4 123.3 67.1 123C66.8 122.7 66.4 122.5 66.2 122.2C64.7 118.2 60.9 116.2 58.6 112.8C58.4 112.5 57.8 112.4 57.4 112.2C56.4 111.6 55.2 111.2 55.3 109.9ZM63.9 80.5C64.8 80.8 65.6 80.9 65.8 79.3C65 79.8 64.5 80.2 63.9 80.5Z"
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
            <g clipPath="url(#clip0_26_34468)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M55.3 109.9C54.2 109.7 53.3 109.6 52.6 109.3C47.1 106.4 41.7 103.4 36.2 100.7C29.4667 97.4333 22.4333 95.1333 15.1 93.8C10.3 92.9 5.49999 91.9 0.899992 91C-0.200008 89.5 1.69999 88.3 0.699992 87C1.99999 86.1 3.19999 86.3 4.49999 86.5C6.69999 87 8.99999 87.5 11.2 88C15 88.8 18.8 89 22.6 88.7C28.9 88.2 35.2 87.7 41.5 86.9C46.1 86.3 50.6 85.2 54.8 83C56.8 82 58.9 81.4 60.9 80.4C62.3 79.6 63.6 78.6 65 77.8C70.6 74.7 75.8 71.1 80.4 66.5C86 61 90.3 54.4999 95 48.2999C100.3 41.1999 102.7 32.9 104.7 24.5C106.3 17.5 108.3 10.6 109 3.39995C109.1 2.49995 109.5 1.69995 109.8 0.799951C110.333 0.799951 110.867 0.766618 111.4 0.699951C111.5 0.999951 111.7 1.29995 111.7 1.49995C111.5 4.09995 111.2 6.69995 111.2 9.29995C111.2 14.9 111.3 20.5 111.3 26.1C111.3 32.5 111.4 38.9 111.4 45.4C111.3 51.5 112.4 57.3 114.8 62.9C115.3 64.1 115.7 65.4 115.9 66.7C116.5 70.5 118.3 73.7 120.9 76.5C123.1 78.8 125 81.2 127.2 83.5C129.9 86.5 133.3 88.6 136.8 90.4C139.8 91.9333 142.7 93.5666 145.5 95.3C149.3 97.6 153.5 98.9 157.8 100C161.7 100.9 165.7 101.8 169.6 102.9C173.7 104 177.8 104.3 181.9 104.7C185.2 105.1 188.5 105.5 192.3 105.9C191.7 106.5 191.4 107 191.2 107C183.4 107.2 175.5 107.3 167.8 107.7C163.5 108 159.3 108.6 155.2 109.4C150.3 110.3 145.4 111.4 140.7 112.7C135.5 114.1 130.4 115.9 125.4 117.7C120.5 119.4 116.5 122.5 112.5 125.9C109.2 128.9 107.6 133 105 136.4C101.4 141 99.7 146.6 98.2 152.2C95.7 161.7 93.2 171.3 91.1 180.9C89 190.7 87.4 200.6 86.7 210.6C86.6 211.8 86.1 212.9 85.7 214.1C85.5 214.4 85 214.7 84.7 214.9C83.8 214.2 83 213.5 82.3 212.8C81.3 212 81.1 210.9 81.2 209.7C81.4 202.8 81.8 195.9 82 189C82.1 183.9 82.4 178.7 82.1 173.6C81.7 167.5 80.9 161.4 79.9 155.4C79.3 151.7 78 148 76.9 144.4C75.6 139.8 73.4 135.6 71.7 131.3C70.7 128.7 68.9 126.5 68.1 123.9C67.9 123.5 67.4 123.3 67.1 123C66.8 122.7 66.4 122.5 66.2 122.2C64.7 118.2 60.9 116.2 58.6 112.8C58.4 112.5 57.8 112.4 57.4 112.2C56.4 111.6 55.2 111.2 55.3 109.9ZM63.9 80.5C64.8 80.8 65.6 80.9 65.8 79.3C65 79.8 64.5 80.2 63.9 80.5Z"
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
      </section>
    </main>
  )
}
