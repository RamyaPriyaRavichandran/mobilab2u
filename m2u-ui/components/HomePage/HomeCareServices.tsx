'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { initAOS, initSmoothScroll, initSplitting, initSwiper } from './animations'
import Link from 'next/link'

export default function HomeCareServices() {
  useEffect(() => {
    initAOS()
    initSmoothScroll()
    initSplitting()
    initSwiper()
  }, [])

  return (
    <main>
      {/* Breadcrumb Section */}
      <section className="bg-[#fef1e7] pt-8 pb-16 md:pt-[3rem] md:pb-[6rem]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-[20px] md:text-3xl font-bold text-black mb-2">
            Book Home Nursing Care Services in Malaysia Available 24/7
          </h1>

          <ul className="flex justify-center gap-0 text-sm text-black font-semibold mt-[24px]">
            <li className="flex items-center gap-1">
              <Image src="/assets/images/svg/home.svg" alt="Home Icon" width={16} height={16} />
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
            </li>
          </ul>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-8 md:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center">
            <div data-aos="fade-right">
              <h2
                className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#1d1d1f] mb-6 splt-txt text-center xl:text-left"
                data-splitting
                data-aos="fade-in"
              >
                Best Home <em className="text-red-600"> Healthcare Services</em> at Your Doorstep in Malaysia
              </h2>
              <p className="text-[14px] sm:text-base text-gray-600 mb-[1.5rem] sm:mb-10 text-justify sm:text-left">
                Our home healthcare services are aimed at delivering professional medical and supportive care directly
                to your doorstep. From{' '}
                <Link
                  href="geriatric-elderly-home-care"
                  className="text-red-600"
                  title="Geriatric & Elderly Care Support"
                >
                  geriatric care
                </Link>{' '}
                that provides dignity and comfort for the elderly, to chronic wound healing with expert care for quick
                healing, we offer empathetic services to meet every requirement. Our{' '}
                <Link href="doctor-nurse-home-visit.html" className="text-red-600" title="Doctor & Nurse Home Visit">
                  doctor and nurse home visits
                </Link>{' '}
                allow patients to enjoy trusted medical care without the anxiety of hospital travel. Our rehabilitation
                and{' '}
                <Link href="home-physiotherapist-service.html" className="text-red-600" title="Home Physiotherapist">
                  physiotherapy programs
                </Link>{' '}
                also encourage recovery, mobility, and long-term health in the comfort of home.
              </p>
            </div>

            <div className="flex justify-center items-center py-8" data-aos="fade-left">
              <div className="rounded-2xl overflow-hidden w-full h-[12rem] sm:h-[20rem] md:w-[30rem] relative">
                <Image
                  src="/assets/images/mobilab2u/home-healthcare-ervices-doorstep-malaysia.webp"
                  width={500}
                  height={300}
                  alt="Home Healthcare"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-2 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-up">
          <h2
            className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-8 text-center splt-txt"
            data-splitting
            data-aos="fade-in"
          >
            Trusted <em className="text-red-600"> Professional</em> Home Healthcare Services in Malaysia
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
            {[
              {
                src: '/assets/images/mobilab2u/geriatric-support-services.svg',
                alt: 'Professional Geriatric Support Services At Home Malaysia',
                title: 'Professional Geriatric Support Services At Home Malaysia',
                heading: 'Geriatric Support',
                desc: 'We deliver customized care to promote the health, well-being, and independence of older patients in the comfort of their homes.',
                knowMore: '/services/home-care-services/geriatric-support',
                bookNow: '/',
              },
              {
                src: '/assets/images/mobilab2u/chronic-wound-care.svg',
                alt: 'Chronic Wound Care & Healing Assistance At Home, Malaysia',
                title: 'Chronic Wound Care & Healing Assistance At Home, Malaysia',
                heading: 'Chronic Wound Care',
                desc: 'We deliver professional, specialized wound care and healing assistance for long-standing and stubborn wounds',
                knowMore: '/services/home-care-services/chronic-wound-care',
                bookNow: '/',
              },
              {
                src: '/assets/images/mobilab2u/doctor-nurse-home-visits-services.svg',
                alt: 'Doctor And Nurse Home Visit Services Across Malaysia',
                title: 'Doctor And Nurse Home Visit Services Across Malaysia',
                heading: 'Doctor & Nurse Home Visits',
                desc: 'Our experienced medical practitioners bring timely consultations and interventions to your home.',
                knowMore: '/services/home-care-services/home-doctor-nurse-service',
                bookNow: '/',
              },
              {
                src: '/assets/images/mobilab2u/physiotherapy-rehabilitation-services.svg',
                alt: 'Physiotherapy & Rehabilitation Services At Home, Malaysia',
                title: 'Physiotherapy & Rehabilitation Services At Home, Malaysia',
                heading: 'Physiotherapy & Rehabilitation',
                desc: 'We deliver customized physical therapy and rehabilitation sessions to regain mobility and improve quality of life.',
                knowMore: '/services/home-care-services/homephysiotherapist',
                bookNow: '/',
              },
            ].map((service, i) => (
              <div
                key={i}
                className="relative bg-[#fef1e7] rounded-2xl shadow-sm p-6 text-center transition flex flex-col justify-between h-full"
              >
                {/* Coming Soon Badge */}
                <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] px-2 py-1 rounded-md font-semibold shadow-md">
                  Coming Soon
                </span>

                <div className="flex justify-center items-center mb-4 sm:mb-6 mt-2 min-h-[9rem]">
                  <Image
                    src={service.src}
                    alt={service.alt}
                    title={service.title}
                    width={144}
                    height={144}
                    loading="lazy"
                    className="object-contain"
                  />
                </div>

                <h4 className="text-[16px] text-base font-semibold text-gray-900 mb-3">{service.heading}</h4>
                <p className="text-[14px] sm:text-md text-gray-600 mb-6">{service.desc}</p>

                <div className="flex justify-center gap-4 mt-auto">
                  <Link
                    href={service.knowMore}
                    className="bg-black text-white py-2 px-4 rounded-lg text-[13px] sm:text-sm font-semibold hover:bg-red-600 transition"
                  >
                    Know More
                  </Link>
                  {/* <Link
                    href={service.bookNow}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg text-[13px] sm:text-sm font-semibold hover:bg-black transition"
                  >
                    Book Now
                  </Link> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <h3
          className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 text-center splt-txt mb-10"
          data-splitting
          data-aos="fade-in"
        >
          How <em className="text-red-600">MobiLab2u Works</em> — Easy Home Healthcare at Your Doorstep
        </h3>

        <div className="max-w-7xl mx-auto p-8" data-aos="fade-up">
          <ul className="flex flex-wrap lg:flex-nowrap justify-center xl:gap-12 gap-8 text-center">
            {[
              {
                src: '/assets/images/mobilab2u/book-your-service.svg',
                title: 'Book Home Healthcare Services Easily Across Malaysia',
                heading: 'Book Your Service',
                desc: 'Schedule a lab test, doctor visit, or nursing care directly through the app.',
              },
              {
                src: '/assets/images/mobilab2u/connected-licensed-doctors.svg',
                title: 'Get Connected With Certified Doctors And Nurses, Malaysia',
                heading: 'Get Connected with Licensed Doctors',
                desc: 'We connect you with certified doctors, nurses, or lab technicians based on your needs.',
              },
              {
                src: '/assets/images/mobilab2u/healthcare-doorstep.svg',
                title: 'Receive Safe & Reliable Healthcare At Your Home, Malaysia',
                heading: 'Healthcare at Your Doorstep',
                desc: 'Our team arrives fully equipped to deliver safe, reliable care in the comfort of your home.',
              },
              {
                src: '/assets/images/mobilab2u/access-reports-manage-care.svg',
                title: 'Access Reports & Manage Home Healthcare Services, Malaysia',
                heading: 'Access Reports & Manage Care',
                desc: 'View results digitally, book follow-ups, and make secure payments all in one place.',
              },
            ].map((item, i) => (
              <li key={i} className="flex flex-col items-center max-w-[245px] mb-8 lg:mb-0">
                <Image
                  src={item.src}
                  alt={item.title}
                  title={item.title}
                  width={144}
                  height={144}
                  loading="lazy"
                  className="w-[9rem] h-[9rem] mb-4"
                />
                <h4 className="font-semibold xl:text-base mb-2">{item.heading}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

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
      {/* <div className="fixed right-1 sm:right-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center gap-2">
        <Link href="https://wa.me/+60125412990?text=How we can help you?" target="_blank" rel="noopener noreferrer">
          <Image
            src="/assets/images/svg/whatsapp.gif"
            alt="WhatsApp"
            title="Chat with us"
            width={45}
            height={45}
            className="drop-shadow-md hover:scale-110 transition-transform duration-300 cursor-pointer"
            loading="lazy"
          />
        </Link>

        <Link href="tel:+60125412990" target="_blank" rel="noopener noreferrer">
          <Image
            src="/assets/images/phone-icon.gif"
            alt="Phone"
            title="Chat with us"
            width={45}
            height={45}
            className="drop-shadow-md hover:scale-110 transition-transform duration-300 cursor-pointer"
            loading="lazy"
          />
        </Link>
      </div> */}
    </main>
  )
}
