'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { initAOS, initSplitting } from './animations'

export default function TeleconsultationServices() {
  const [openServiceIndex, setOpenServiceIndex] = useState<number | null>(null)
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0)

  useEffect(() => {
    // Initialize animations
    initAOS()
    initSplitting()
  }, [])

  const services = [
    {
      title: 'General Medical Concerns',
      icon: '/assets/images/svg/medical-cross.svg',
      alt: 'General Medicine Telemedicine Consultation In Malaysia',
      items: [
        'Cold, cough, flu',
        'Fever and chills',
        'Sinus infections',
        'Sore throat',
        'Headaches and migraines',
        'Seasonal allergies',
        'Stomach pain, indigestion, gas',
        'Nausea, vomiting, diarrhea',
        'Minor skin rashes and infections',
        'Minor burns, cuts, insect bites',
        'Acid reflux or heartburn',
        'Motion sickness prevention',
      ],
    },
    {
      title: 'Chronic Disease Management',
      icon: '/assets/images/svg/chronic.svg',
      alt: 'Chronic Disease Management For Patients In Malaysia',
      items: [
        'Type 1 and Type 2 Diabetes',
        'High cholesterol',
        'Thyroid disorders (Hyperthyroidism/Hypothyroidism)',
        'Arthritis and joint pain',
        'GERD (Gastroesophageal reflux disease)',
      ],
    },
    {
      title: "Women's Health",
      icon: '/assets/images/svg/womans-health.svg',
      alt: 'Womens Health Care Telemedicine Services In Malaysia',
      items: [
        'Irregular periods',
        'PCOS/PCOD advice',
        'Birth control prescriptions and advice',
        'Urinary tract infections (UTIs)',
        'Menopause support',
      ],
    },
    {
      title: "Men's Health",
      icon: '/assets/images/svg/mens-health.svg',
      alt: 'Online Medical Consultations For Mens Health Care, Malaysia',
      items: [
        'Hair loss and thinning',
        'Erectile dysfunction (ED)',
        'Low testosterone',
        'Prostate health concerns',
        'Performance anxiety',
      ],
    },
    {
      title: 'Sexual & Reproductive Health',
      icon: '/assets/images/svg/reproductive-health.svg',
      alt: 'Sexual & Reproductive Health Teleconsultation in Malaysia',
      items: [
        'Contraceptive counseling',
        'STI/STD guidance (non-emergency)',
        'Fertility advice and early-stage support',
      ],
    },
    {
      title: 'Mental Health & Emotional Wellness',
      icon: '/assets/images/svg/mental-health.svg',
      alt: 'Mental Health & Emotional Wellness Teleconsultation, Malaysia',
      items: [
        'Mild anxiety and depression',
        'Stress and burnout',
        'Panic attacks (non-severe)',
        'Insomnia and sleep issues',
        'ADHD follow-up care',
        'Counseling support',
      ],
    },
    {
      title: 'Pediatrics (Non-Emergency)',
      icon: '/assets/images/svg/pediatrics.svg',
      alt: 'Non Emergency Pediatrics Child Care Online Malaysia',
      items: [
        'Common colds and flu',
        'Rashes and skin allergies',
        'Fever and cough',
        'Constipation or diarrhea',
        'Behavioral concerns',
      ],
    },
    {
      title: 'Elderly & Geriatric Care',
      icon: '/assets/images/svg/old-people.svg',
      alt: 'Elderly Care Thorugh Geriatric Telemedicine Services In Malaysia',
      items: [
        'Chronic medication management',
        'Sleep problems',
        'Memory loss (early-stage dementia help)',
        'Nutrition and movement advice',
        'Regular reviews',
      ],
    },
    {
      title: 'Skin & Hair Problems',
      icon: '/assets/images/svg/skin-hair-proplams.svg',
      alt: 'Skin & Hair Problems in Online Dermatology Care, Malaysia',
      items: [
        'Acne and spots',
        'Eczema, psoriasis',
        'Dandruff and scalp issues',
        'Fungal infections',
        'Vitiligo and pigmentation',
        'Hair fall and alopecia',
      ],
    },
    {
      title: 'Gastrointestinal Issues',
      icon: '/assets/images/svg/gastrointestinal.svg',
      alt: 'Gastrointestinal & Digestive Issues Online Consultation In Malaysia',
      items: ['Constipation and bloating', 'IBS (Irritable Bowel Syndrome)', 'Acid reflux'],
    },
    {
      title: 'ENT Issues',
      icon: '/assets/images/svg/ent-specialist.svg',
      alt: 'ENT Specialist for Ear Nose & Throat Telemedicine in Malaysia',
      items: ['Nasal congestion or allergies', 'Tinnitus or hearing concerns', 'Mild sore throat and voice changes'],
    },
    {
      title: 'Eye Concerns (Non-Emergency)',
      icon: '/assets/images/svg/closed-eye.svg',
      alt: 'Online Non Emergency Eye Consultations in Malaysia',
      items: ['Red or itchy eyes', 'Dry eyes', 'Conjunctivitis (Pink eye)', 'Eye fatigue from screen time'],
    },
    {
      title: 'Other Services',
      icon: '/assets/images/svg/services.svg',
      alt: 'All Medical Services For Telemedicine Solutions, Malaysia',
      items: [
        'Lab test referrals',
        'Prescription refills',
        'Second opinions',
        'Medical certificate requests',
        'Post-surgical follow-ups',
        'Travel health advice',
        'Diet and nutrition counseling',
        'Smoking cessation programs',
      ],
    },
  ]

  const faqs = [
    {
      question: 'How do I book a teleconsultation with MobiLab2u?',
      answer: 'You can book easily through our website or mobile app by selecting your preferred time and doctor.',
    },
    {
      question: 'Do I need to download any app to join the consultation?',
      answer: 'No. We send you a secure video call link. Just click to join with no app download required.',
    },
    {
      question: 'Is the online medical consultation private and secure?',
      answer: 'Yes. All consultations are encrypted and confidential. Your data and privacy are fully protected.',
    },
    {
      question: 'Will I get any prescriptions or referrals during an online consultation?',
      answer:
        'Yes. Our doctors may issue e-prescriptions or refer you for lab tests or specialist services if required.',
    },
    {
      question: 'How can I get a blood test after my teleconsultation?',
      answer:
        'Your doctor will be able to organize at-home blood sampling with our in-house team for your convenience.',
    },
    {
      question: 'Is your doctor registered in Malaysia?',
      answer:
        'Yes. Our doctors are all licensed by the Malaysian Medical Council (MMC) and are qualified and experienced individuals.',
    },
    {
      question: 'How long is a teleconsultation typically?',
      answer: 'Most consultations are 15 - 30 minutes, depending on your concerns/questions.',
    },
    {
      question: 'What can I consult online?',
      answer: (
        <>
          You can consult for a variety of general health issues,{' '}
          <Link href="/services/tele-consultation" className="text-red-600 hover:underline" title="Tele Consultation">
            management of chronic wounds
          </Link>
          , doctor & nurse home visits, physiotherapy, and post-surgery care.
        </>
      ),
    },
    {
      question: 'Can I consult on behalf of a family member?',
      answer: 'Yes. You may book a consultation for a family member, including children or the elderly.',
    },
    {
      question: 'How much is an online doctor consultation?',
      answer:
        'We are upfront with costs, and our pricing is affordable. You will see the pricing before you book with no hidden costs.',
    },
  ]

  return (
    <main>
      {/* Breadcrumb Section */}
      <section className="bg-[#fef1e7] pt-8 pb-16 md:pt-[3rem] md:pb-[6rem] overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-[20px] md:text-3xl font-bold text-black mb-2">
            Book Online Tele & Video Doctor Consultation in Malaysia
          </h1>

          <ul className="flex justify-center gap-0 text-sm text-black font-semibold mt-[24px]">
            <li className="flex items-center gap-1">
              <Image
                src="/assets/images/svg/home.svg"
                alt="home"
                title="home"
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
            <li>
              <Link href="/services" className="hover:underline">
                Services
              </Link>
              <span className="ml-[10px]">›</span>
              <i className="flaticon flaticon-next inline-block relative top-[2.5px] mx-[5px]"></i>
            </li>
            <li className="text-gray-500">Tele Consultation</li>
          </ul>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-[url('/assets/images/bg/shape-06.webp')] bg-no-repeat bg-cover bg-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-8 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div data-aos="fade-left">
            <h2
              className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#1d1d1f] mb-6 splt-txt text-center lg:text-left"
              data-splitting
              data-aos="fade-in"
            >
              Consult a Doctor
              <em className="text-red-600"> Online – Anytime, Anywhere </em> in Malaysia
            </h2>
            <p className="text-[14px] sm:text-base text-gray-600 mb-[1.5rem] sm:mb-10 text-justify sm:text-left">
              MobiLab2u provides convenient healthcare access any time of day and any day of the week throughout
              Malaysia with our convenient teleconsultation service for follow-up care from an expert, dentistry, or to
              get advice. Our virtual healthcare platform allows you access to licensed doctors from your mobile device
              or computer without having to step out of your home. You don&apos;t have to put off getting care because
              of waiting at the clinic or taking time off work. Our teleconsult service promises you fast, secure care,
              considerate of your needs, from general health issues and{' '}
              <Link href="/home-chronic-wound-care" className="text-red-600" title="Chronic Wound Care Treatment">
                chronic disease management.
              </Link>
            </p>

            <p className="text-[14px] sm:text-base text-gray-600 text-justify sm:text-left">
              You will receive a reminder 10 minutes before your appointment start time. After selecting a time slot
              from the appointment in the app or site, you will be able to connect with your certified doctor by either
              video or phone. Prescriptions, lab orders will be provided electronically. It&apos;s modern medical care
              meant for your busy life.
            </p>

            <p className="text-[14px] sm:text-base mt-4 mb-0">Experience thoughtful, patient-first care through:</p>

            <ul className="space-y-2 mt-5">
              <li className="flex items-start gap-2">
                <span className="mt-1 min-w-4 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-[14px] sm:text-base font-semibold text-[#001e2b]">
                  Private video consultations with ease
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 min-w-4 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-[14px] sm:text-base font-semibold text-[#001e2b]">
                  Licensed, experienced medical professionals you can trust
                </span>
              </li>

              <li className="flex items-start gap-2">
                <span className="mt-1 min-w-4 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-[14px] sm:text-base font-semibold text-[#001e2b]">
                  Digital prescriptions, lab orders, and result explanations
                </span>
              </li>

              <li className="flex items-start gap-2">
                <span className="mt-1 min-w-4 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-[14px] sm:text-base font-semibold text-[#001e2b]">
                  Support for everyday concerns and long-term conditions
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 min-w-4 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-[14px] sm:text-base font-semibold text-[#001e2b]">
                  Clear, actionable medical guidance you can rely on
                </span>
              </li>
            </ul>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <Image
              src="/assets/images/services/consult-doctor-online-anytime-anywhere-malaysia.webp"
              alt="Speak to licensed doctors online from home anytime, and anywhere in Malaysia for medical advice."
              title="Consult A Doctor Online Anytime And Anywhere In Malaysia"
              width={592}
              height={540}
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto py-12 px-4 overflow-hidden">
        <h3
          className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-12 text-center splt-txt"
          data-splitting
          data-aos="fade-in"
        >
          Best Telemedicine <em className="text-red-600">Solutions For Busy Professionals </em> In Malaysia
        </h3>

        {/* Service Accordion */}
        <div className="bg-[#fef1e7] p-6 rounded-2xl shadow">
          <div className="grid gap-3 md:grid-cols-2 md:gap-6">
            {services.map((service, index) => (
              <div key={index}>
                <button
                  onClick={() => setOpenServiceIndex(openServiceIndex === index ? null : index)}
                  className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                      <Image
                        src={service.icon || '/placeholder.svg'}
                        alt={service.alt}
                        title={service.alt}
                        width={40}
                        height={40}
                        className="w-10 h-10 filter brightness-0 saturate-100 invert-[18%] sepia-[92%] saturate-[7452%] hue-rotate-[353deg] brightness-[98%] contrast-[112%]"
                      />
                    </div>
                    <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                      {service.title}
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                      openServiceIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>

                {openServiceIndex === index && (
                  <div className="bg-white p-4 mt-2 rounded-2xl shadow text-sm text-gray-700">
                    <div>
                      <ul className="space-y-3">
                        {service.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center gap-2">
                            <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                              </svg>
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6">
                      <Link
                        href={{
                          pathname: '/packages',
                          query: { serviceType: 'appointment' },
                        }}
                        className="inline-block px-6 py-2 text-white bg-black rounded-md font-semibold hover:bg-red-600 transition"
                      >
                        Book now
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Book Section */}
      <section className="relative py-8 px-4 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-5 text-center">
          How to <em className="text-red-600"> Book Online Medical </em> Consultations in Malaysia?
        </h2>

        <div className="relative flex flex-col lg:flex-row max-w-7xl mx-auto gap-6 lg:gap-10">
          {/* Left Image Section */}
          <div className="w-full lg:w-1/2">
            <div className="lg:sticky lg:top-40 flex justify-center items-start">
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                <Image
                  src="/assets/images/services/online-medical-consultations-malaysia.svg"
                  alt="Step by step guide to book online medical consultations quickly and safely with doctors in Malaysia"
                  title="Book Online Medical Consultations Easily In Malaysia"
                  width={512}
                  height={341}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Cards Section */}
          <div className="w-full lg:w-1/2">
            {[
              {
                step: '01',
                icon: '/assets/images/svg/book-your-slot.svg',
                title: 'Book Your Slot',
                description: 'Choose your preferred time and doctor via our website or app.',
                alt: 'Book Your Slot For Online Medical Consultation In Malaysia',
              },
              {
                step: '02',
                icon: '/assets/images/svg/phone-calls.svg',
                title: 'Join the Call',
                description: "We'll send you a secure link. No app downloads, no hassle.",
                alt: 'Join A Secure Online Medical Call Instantly In Malaysia',
              },
              {
                step: '03',
                icon: '/assets/images/svg/talk-the-doctor.svg',
                title: 'Talk to the Doctor',
                description: 'Ask your questions, gather answers, and be provided with prescriptions or referrals.',
                alt: 'Talk To Doctor Online For Advice & Prescriptions, Malaysia',
              },
              {
                step: '04',
                icon: '/assets/images/svg/blood-test-collection.svg',
                title: 'Take the Test or Next Steps',
                description:
                  'If necessary, your doctor will arrange a home blood test, follow-up, or connect you with a specialist.',
                alt: 'Take Tests Or Arrange Next Steps With Doctor Online Malaysia',
              },
              {
                step: '05',
                icon: '/assets/images/svg/prescriptions.svg',
                title: 'Get Your Prescription',
                description: 'Get e-prescriptions immediately via email, usable at pharmacies locally in Malaysia.',
                alt: 'Book Follow Up Appointments With Doctor Online, Malaysia',
              },
              {
                step: '06',
                icon: '/assets/images/svg/appointments.svg',
                title: 'Follow-up Appointment',
                description: 'Easy to book a follow-up with the same doctor to review results or check progress.',
                alt: 'Book Follow Up Appointments With Doctor Online, Malaysia',
              },
              {
                step: '07',
                icon: '/assets/images/svg/digital-health-result.svg',
                title: 'Access Reports & History',
                description:
                  'Your health records, test results, and past consultations stay securely stored and accessible anytime in your MobiLab2u account.',
                alt: 'Access Health Reports & Consultation History Online Malaysia',
              },
            ].map((card, index) => (
              <div
                key={index}
                className="relative z-10 card bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-lg transition p-4 sm:p-6 mb-6"
              >
                <div className="flex items-start gap-4 relative z-10">
                  <Image
                    src={card.icon || '/placeholder.svg'}
                    width={51}
                    height={51}
                    alt={card.alt}
                    title={card.alt}
                    className="shrink-0 w-10 sm:w-12"
                  />
                  <div>
                    <h4 className="text-[16px] sm:text-xl font-semibold text-gray-900">{card.title}</h4>
                    <p className="mt-2 text-gray-600 text-[14px] sm:text-base text-justify sm:text-left">
                      {card.description}
                    </p>
                  </div>
                </div>
                <span className="absolute bottom-4 right-4 text-[5rem] font-bold text-gray-100 opacity-70 pointer-events-none leading-none z-0">
                  {card.step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Protocols Section */}
      <section className="py-4 sm:py-12 overflow-hidden">
        <h3
          className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-12 text-center splt-txt"
          data-splitting
          data-aos="fade-in"
        >
          <em className="text-red-600">Safety Protocols</em> for Teleconsultation & Digital Health Delivery
        </h3>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-[#fef1e7] rounded-2xl p-4 sm:p-6">
            <h4 className="text-base sm:text-xl font-semibold text-gray-800 mb-4">
              Doctor Credentials & Clinical Integrity
            </h4>
            <ul className="space-y-4 text-sm sm:text-base">
              {[
                'Licensed Malaysian Doctors',
                'MMC-Registered & Verified Clinicians',
                'Guideline-Based Medical Advice',
                'Ongoing Professional Oversight',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2 */}
          <div className="bg-[#fef1e7] rounded-2xl p-4 sm:p-6">
            <h4 className="text-base sm:text-xl font-semibold text-gray-800 mb-4">
              Platform Security & Consultation Safety
            </h4>
            <ul className="space-y-4 text-sm sm:text-base">
              {[
                'End-to-End Encrypted Consultations',
                'Secure, Time-Limited Session Links',
                'MOH-Compliant Telemedicine Practices',
                'No Data Stored Without Consent',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-[#fef1e7] rounded-2xl p-4 sm:p-6">
            <h4 className="text-base sm:text-xl font-semibold text-gray-800 mb-4">Confidentiality & Patient Rights</h4>
            <ul className="space-y-4 text-sm sm:text-base">
              {[
                'Private One-on-One Sessions',
                'Digital Consent Before Every Call',
                'Controlled Access to Medical Records',
                'Strict Adherence to Patient Privacy',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Who Can Use Section */}
      <section className="py-8 sm:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-[2rem] px-4">
          {/* Left Content */}
          <div className="flex-1" data-aos="fade-right">
            <h3
              className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#1d1d1f] mb-6 text-center sm:text-left splt-txt"
              data-splitting
              data-aos="fade-in"
            >
              Who Can Use <em className="text-red-600"> MobiLab2u </em> Teleconsultation in Malaysia?
            </h3>

            <p className="text-[14px] sm:text-base text-justify mb-6 max-w-md">
              Our teleconsultation platform is ideal for:
            </p>

            {/* Feature List */}
            <div className="bg-[#fef1e7] border border-gray-200 rounded-lg p-4 sm:p-6">
              <ul className="space-y-4 text-sm sm:text-base">
                {[
                  'Busy professionals seeking medical advice without travel',
                  'Seniors or homebound patients requiring follow-ups',
                  "Parents managing their child's healthcare needs",
                  'Chronic disease patients requiring regular monitoring',
                  'Anyone seeking confidential and accessible care',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    </div>
                    <p className="text-gray-700">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 w-full" data-aos="zoom-in">
            <Image
              src="/assets/images/services/teleconsultation-malaysia.webp"
              alt="Access convenient online teleconsultation services Malaysia for medical advice, checks, & counseling"
              title="Teleconsultation Services Available For All In Malaysia"
              width={500}
              height={600}
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
            Why <em className="text-red-600">MobiLab2u</em> For Online Doctor Appointments In Malaysia?
          </h3>

          {/* 3 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-[2.5rem] rounded-2xl shadow-sm">
              <Image
                src="/assets/images/svg/trusted.svg"
                alt="Connect With Certified Doctors For Trusted Care, Malaysia"
                title="Connect With Certified Doctors For Trusted Care, Malaysia"
                width={48}
                height={48}
                className="w-12 h-12 mb-[1.5rem] filter brightness-0 saturate-100 invert-[18%] sepia-[92%] saturate-[7452%] hue-rotate-[353deg] brightness-[98%] contrast-[112%]"
              />
              <h3 className="text-[16px] sm:text-xl font-semibold text-black mb-2">Certified Doctors, Trusted Care</h3>
              <p className="text-[14px] text-justify sm:text-base sm:text-left">
                MobiLab2u connects you with licensed doctors registered with Malaysia&apos;s Ministry of Health. You get
                expert medical advice without stepping into a clinic.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-[2.5rem] rounded-2xl shadow-sm">
              <Image
                src="/assets/images/svg/booking.svg"
                alt="Easy Booking & Scheduling For Online Doctors In Malaysia"
                title="Easy Booking & Scheduling For Online Doctors In Malaysia"
                width={48}
                height={48}
                className="w-12 h-12 mb-[1.5rem] filter brightness-0 saturate-100 invert-[18%] sepia-[92%] saturate-[7452%] hue-rotate-[353deg] brightness-[98%] contrast-[112%]"
              />
              <h3 className="text-[16px] sm:text-xl font-semibold text-black mb-2">
                Easy Booking, Flexible Scheduling
              </h3>
              <p className="text-[14px] text-justify sm:text-base sm:text-left">
                Our platform lets you schedule consultations at your convenience. No long waits, no travel, just simple,
                timely access to quality care.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-[2.5rem] rounded-2xl shadow-sm">
              <Image
                src="/assets/images/svg/personal-health-data.svg"
                alt="Private Secure Management Of Personal Health Data, Malaysia"
                title="Private Secure Management Of Personal Health Data, Malaysia"
                width={48}
                height={48}
                className="w-12 h-12 mb-[1.5rem] filter brightness-0 saturate-100 invert-[18%] sepia-[92%] saturate-[7452%] hue-rotate-[353deg] brightness-[98%] contrast-[112%]"
              />
              <h3 className="text-[16px] sm:text-xl font-semibold text-black mb-2">Private, Secure, Confidential</h3>
              <p className="text-[14px] text-justify sm:text-base sm:text-left">
                We protect your personal health data with strict privacy measures. Every online session is encrypted,
                ensuring your consultations stay fully confidential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Covered Section */}
      <section className="py-8 md:py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h3 className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#0d1623] mb-8 sm:mb-12">
            Areas We Cover for <em className="text-red-600"> Quality Healthcare Services</em> in Malaysia
          </h3>

          <div className="flex flex-wrap justify-center lg:gap-4 gap-2">
            {[
              'Johor Bahru',
              'Kuala Lumpur',
              'Selangor',
              'Malacca',
              'Penang (island and mainland)',
              'Perlis',
              'Negeri Sembilan',
              'Perak',
              'Pahang',
              'Kedah',
              'Kelantan',
              'Terengganu',
              'Sabah',
              'Sarawak',
            ].map((location, index) => (
              <div
                key={index}
                className="flex items-center gap-1 md-gap-3 md:px-6 md:py-2 py-1 px-2 border border-gray-300 rounded-full hover:shadow transition"
              >
                <Image
                  src="/assets/images/svg/location.svg"
                  alt="location"
                  title="location"
                  width={24}
                  height={24}
                  className="md:w-6 md:h-6 w-3 h-3"
                />
                <span className="md:text-sm text-[12px] font-medium text-[#0d1623]">{location}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#fef1e7] py-8 md:py-16 px-6 md:px-10 rounded-2xl text-center max-w-7xl mx-auto overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <h3
            className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-6 splt-txt"
            data-splitting
            data-aos="fade-in"
          >
            Book Online
            <em className="text-red-600"> Doctor Appointment </em> in Malaysia With MobiLab2u
          </h3>
          <p className="text-sm md:text-lg text-gray-600 mb-10">
            Skip the long waits and clinic queues. Get expert medical advice from licensed doctors in Malaysia right
            from your home. Your health deserves care that&apos;s fast, simple, and completely stress-free.
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
              href={{
                pathname: '/packages',
                query: { serviceType: 'appointment' },
              }}
              className="flex-1 sm:flex-none px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-black transition text-sm sm:text-base text-center"
            >
              Book Now
            </Link>
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
            All You Need to <em className="text-red-600">Know About Online</em> Medical Consultations
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full" data-aos="fade-up">
          {/* FAQ Accordion */}
          <div className="col-span-12 space-y-6">
            {faqs.map((faq, index) => (
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

      {/* Bottom CTA Section */}
      <section className="bg-[#fef1e7] h-[370px] min-h-[300px] sm:min-h-[380px] md:min-h-[400px] lg:min-h-[370px] xl:min-h-[400px] py-6 pb-24 md:pb-10 flex md:items-center justify-center px-2 md:px-4 relative overflow-hidden">
        {/* Left Illustration */}
        <Image
          src="/assets/images/mobilab2u/home-healthcare-application.svg"
          alt="Access Healthcare Services Anytime With Mobile App Malaysia"
          title="Access Healthcare Services Anytime With Mobile App Malaysia"
          className="absolute left-0 bottom-0 max-h-24 max-h-[38%] md:max-h-[43%] lg:max-h-[60%] xl:max-h-[70%] object-contain z-10"
          width={392}
          height={280}
        />

        {/* Right Illustration */}
        <Image
          src="/assets/images/mobilab2u/medicine-delivery.svg"
          alt="Fast Prescription Medicine Delivery Services In Malaysia"
          title="Fast Prescription Medicine Delivery Services In Malaysia"
          className="absolute right-0 bottom-0 max-h-24 max-h-[40%] md:max-h-[45%] lg:max-h-[62%] xl:max-h-[70%] object-contain z-10"
          width={308}
          height={280}
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
