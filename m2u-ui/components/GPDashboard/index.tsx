'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { initAOS, initSmoothScroll, initSplitting, initSwiper } from '@/components/HomePage/CDashboard/animations'
import { useAuth } from '@/lib/contexts/AuthContext'

export default function GPDashboard() {
  useEffect(() => {
    initAOS()
    initSmoothScroll()
    initSplitting()
    initSwiper()
  }, [])

  const { user } = useAuth()

  const offers = [
    {
      bg: 'bg-[#fff4ec]',
      title: 'Flat 25% OFF',
      subtitle: 'Complete Health Check',
      description: '– 80+ Tests in One Go!',
      linkText: 'Book A Scan',
      linkColor: 'text-[#DC2626]',
      image: 'flat-off.png',
    },
    {
      bg: 'bg-[#E0FDFF]',
      title: 'Flat ₹1,500 OFF',
      subtitle: 'Heart Health Package',
      description: 'Stay Heart-Smart & Healthy!',
      linkText: 'Book A Appointment',
      linkColor: 'text-[#26C1DC]',
      image: 'flat-heart.png',
    },
    {
      bg: 'bg-[#FFD6DB]',
      title: 'Flat 20% OFF',
      subtitle: 'Senior Citizen Care Package',
      description: 'Regular Checks for Peace of Mind!',
      linkText: 'Explore Now',
      linkColor: 'text-[#DC2629]',
      image: 'senior-citizen.png',
    },
  ]
  return (
    <>
      {/* Hero Banner */}
      <div className="bg-[#FBE2E2] px-5 pt-5 pb-[65px] rounded-bl-[10px] md:rounded-bl-none rounded-br-[10px] md:rounded-br-[20px] border-t md:p-8 mb-10 lg:p-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-8 max-w-[1300px] mx-auto">
          <div className="md:text-left flex-1 basis-auto min-w-0 md:basis-2/3">
            <h3 className="text-sm md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl leading-[1.1] font-normal text-black mb-2 md:mb-5 break-words">
              Hello
              <br />
              {user?.name}!
            </h3>
            <p className="text-sm md:text-2xl lg:text-xl xl:text-2xl 2xl:text-2xl font-medium text-[#DC2626]">
              Glad you are here !
            </p>
            <p className="text-sm md:text-2xl lg:text-xl xl:text-2xl 2xl:text-2xl font-medium text-[#DC2626]">
              Let&apos;s achieve great things .{' '}
            </p>
          </div>
          <div className="flex-1 flex justify-end md:justify-center basis-1/3 mt-4 md:mt-0">
            {/* maintain same visual but make responsive */}
            <div className="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[300px] md:h-[300px]">
              <Image
                src="/assets/images/services/doctor-tele-consultation.svg"
                alt="Stay Healthy Illustration"
                fill
                sizes="(max-width: 640px) 220px, (max-width: 1024px) 260px, 300px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <main className="bg-white px-6 py-14 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="text-center md:text-left space-y-6">
            <div className="border-l-4 border-[#DC2626] pl-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                Welcome to
                <br />
                <span className="text-[#DC2626]">Mobilab2u.com</span>
              </h1>
            </div>

            <p className="text-base leading-7 text-gray-600 max-w-xl">
              <span className="font-semibold">Dear Doctor,</span>
              <br />
              Thank you for joining us on the new frontier of patient care. Every consultation you conduct here breaks
              down a barrier for someone in need, proving that distance is no match for true medical expertise. We are
              honored to be your partner in bringing Excellent Care, one click at a time, to the community.
            </p>

            <div className="grid grid-cols-3 gap-4 max-w-sm">
              <div className="rounded-xl p-3 bg-gray-50 text-center">
                <h4 className="font-bold text-gray-900 text-lg">10K+</h4>
                <p className="text-sm text-gray-500">Patients</p>
              </div>
              <div className="rounded-xl p-3 bg-gray-50 text-center">
                <h4 className="font-bold text-gray-900 text-lg">30+</h4>
                <p className="text-sm text-gray-500">Areas across malaysia</p>
              </div>
              <div className="rounded-xl p-3 bg-gray-50 text-center">
                <h4 className="font-bold text-gray-900 text-lg">97%</h4>
                <p className="text-sm text-gray-500">Customer Satisfaction</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div
              className="overflow-hidden shadow-xl border bg-white rounded-2xl"
              style={{
                width: '100%',
                maxWidth: '450px',
                height: '320px',
                clipPath: 'polygon(0 0, 100% 10%, 100% 90%, 0 100%)',
              }}
            >
              {/* keep same visual -- use responsive image fill */}
              <div className="relative w-full h-full">
                <Image
                  src="/assets/images/register/gp-partner.svg"
                  alt="Service Partner"
                  fill
                  sizes="(max-width: 640px) 300px, (max-width: 1024px) 450px, 700px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Do More Save More */}
      <section className="mx-3 lg:mx-auto mt-8">
        <div className="text-left md:text-center mb-4">
          <h3 className="text-lg md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-1">
            Do More. Save More. With Mobilab2u
          </h3>
          <p className="text-xs md:text-sm lg:text-base font-light">Extra packages, extra care, extra savings!</p>
        </div>

        {/* Swiper wrapper (keeps existing swiper classes you init) */}
        <div className="swiper domore-carousel">
          <div className="swiper-wrapper pt-4 pb-8">
            {offers.map((offer, index) => (
              <div key={index} className="swiper-slide px-2">
                <div
                  className={`relative overflow-hidden border ${offer.bg} rounded-[12px] lg:rounded-[30px] px-4 py-6 lg:px-8 lg:py-10 m-auto max-w-[520px]`}
                >
                  <div className="pr-4 md:pr-0">
                    <h4 className="text-sm md:text-lg lg:text-xl font-normal text-[#000]">{offer.title}</h4>
                    <h4 className="text-sm md:text-lg lg:text-xl font-normal mb-2">{offer.subtitle}</h4>
                    <p className="text-[12px] md:text-[16px] lg:text-[18px] font-medium mb-3 md:mb-6">
                      {offer.description}
                    </p>
                    <Link
                      href="/customer-package"
                      className={`${offer.linkColor} font-medium text-sm md:text-base lg:text-lg inline-flex items-center gap-2`}
                    >
                      {offer.linkText}
                      <i
                        className={`${offer.linkColor} flaticon-next font-medium text-[18px] md:text-[22px] relative`}
                        aria-hidden="true"
                      />
                    </Link>
                  </div>

                  <div className="absolute right-[-24px] bottom-[-20px] md:right-[-40px] md:bottom-[-40px]">
                    <div className="w-[110px] h-[110px] md:w-[220px] md:h-[220px] lg:w-[260px] lg:h-[260px] relative rounded-full overflow-hidden">
                      <Image
                        src={`/assets/images/customer/${offer.image}`}
                        alt={offer.subtitle}
                        fill
                        sizes="(max-width: 640px) 110px, (max-width: 1024px) 220px, 260px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="swiper-pagination mt-4"></div>
        </div>
      </section>
      {/* Trust Indicators */}
      <div className="flex flex-row md:flex-row gap-4 items-center px-5 md:gap-20 justify-evenly mt-4 mb-[60px] lg:mt-10 lg:mb-20 max-w-[1300px] mx-auto">
        <div className="text-center max-w-fit">
          <div className="relative w-[100px] h-[100px]">
            <Image
              src="/assets/images/customer/experienced-medical-professionals.svg"
              alt="Experienced Medical Professionals"
              fill
              className="object-contain"
            />
          </div>
          <p className="mt-4 font-medium text-sm md:text-base lg:text-md xl:text-lg">
            Experienced Medical <br /> Professionals
          </p>
        </div>
        <div className="text-center max-w-fit">
          <div className="relative w-[100px] h-[100px]">
            <Image
              src="/assets/images/customer/doorstep-care.svg"
              alt="Doorstep Care"
              fill
              className="object-contain"
            />
          </div>
          <p className="mt-4 font-medium text-sm md:text-base lg:text-md xl:text-lg">
            Doorstep <br /> Care
          </p>
        </div>
        <div className="text-center max-w-fit">
          <div className="relative w-[100px] h-[100px]">
            <Image src="/assets/images/customer/privacy.svg" alt="Privacy" fill className="object-contain" />
          </div>
          <p className="mt-4 font-medium text-sm md:text-base lg:text-md xl:text-lg">
            100% <br /> Privacy
          </p>
        </div>
      </div>

      {/* Healthcare at Fingertips */}
      <div className="max-w-[1300px] mx-auto px-[20px] md:pl-20 md:pr-0 mb-10 md:mb-20 m-auto rounded-lg md:rounded-none">
        <div className="relative w-full h-[200px] sm:h-[260px] md:h-[300px] lg:h-[300px]">
          <Image
            src="/assets/images/customer/healthcare-at-fingertips.svg"
            alt="Healthcare at Fingertips"
            fill
            sizes="(max-width: 640px) 320px, (max-width: 1024px) 560px, 900px"
            className="object-contain"
          />
        </div>
      </div>
    </>
  )
}
