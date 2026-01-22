'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { initAOS, initSmoothScroll, initSplitting, initSwiper } from './animations'
import { useAuth } from '@/lib/contexts/AuthContext'
import useSWR from 'swr'
import { GET_CUSTOMER_PLANS } from '@/lib/endpoints'
import { fetcher } from '@/lib/fetchers'

export default function CustomerDashboard() {
  useEffect(() => {
    initAOS()
    initSmoothScroll()
    initSplitting()
    initSwiper()
  }, [])

  const quickActions = [
    { icon: 'wallet.svg', label: 'Wallet', link: '/wallet' },
    { icon: 'purchased-test.svg', label: 'Blood Test', link: '/packages?serviceType=test' },
    { icon: 'my-report.svg', label: 'Blood Test History', link: '/customer-tests' },
    { icon: 'appointments.svg', label: 'Tele Consultation', link: '/packages?serviceType=appointment' },
    { icon: 'appointments-history.svg', label: 'Appointments History', link: '/appointments' },

    { icon: 'purchased-medicine.svg', label: 'Purchased Medicine', link: '/appointments' },
  ]

  const { data: packages = [], isLoading } = useSWR<Array<any>>(GET_CUSTOMER_PLANS, fetcher())

  const labPackages = packages.map((p: any) => ({
    image: p.image?.s3URL || '/images/default-package.jpeg',
    title: p.name,
    tests: p.testCount || 0,
    price: p.offerPrice ? `RM ${p.offerPrice}` : null,
    reportTime: p.reportTime || p.duration || '—',
  }))

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
  const { user } = useAuth()

  return (
    <section className="ml-0 ">
      {/* Hero Banner */}
      <div className="bg-[#FBE2E2] px-5 pt-5 pb-[65px] rounded-bl-[10px] md:rounded-bl-none rounded-br-[10px] md:rounded-br-[20px] border-t md:p-8 mb-10 lg:p-12">
        <div className="flex md:flex-row md:items-center justify-between gap-3 md:gap-8 max-w-[1300px] mx-auto">
          <div className="md:text-left flex-1 basis-2/3">
            <h3 className="text-sm md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl leading-[1.1] font-normal text-black mb-2 md:mb-5">
              Hello
              <br />
              {user?.name}!
            </h3>
            <p className="text-sm md:text-2xl lg:text-xl xl:text-2xl 2xl:text-2xl font-medium text-[#DC2626]">
              Stay Home. Stay Healthy.
            </p>
            <p className="text-sm md:text-2xl lg:text-xl xl:text-2xl 2xl:text-2xl font-medium text-[#DC2626]">
              Get Care at Your Doorstep.
            </p>
          </div>
          <div className="flex-1 flex justify-end md:justify-center basis-1/3">
            <Image
              src="/assets/images/customer/stay-healthy.svg"
              alt="Stay Healthy Illustration"
              width={300}
              height={300}
            />
          </div>
        </div>
      </div>

      {/* Quick Actions - Mobile Only */}
      <div className="block md:hidden mx-3 -mt-[100px] p-4 mb-5 bg-white border-[0.4px] border-[#E4E4E4] rounded-3xl shadow-[2px_2px_4px_0px_#0000001C]">
        <h4 className="font-medium mb-2 text-[12px]">Quick Actions</h4>
        <ul className="grid grid-cols-3 gap-y-7 gap-x-2.5 relative">
          {quickActions.map((action, index) => (
            <li key={index}>
              <p className="absolute text-[10px] text-white px-2 bg-red-500 rounded-full">
                {action.icon === 'purchased-medicine.svg' && 'Coming Soon'}
              </p>
              <Link
                href={action.link}
                className="flex flex-col items-center justify-center p-4 bg-[#F6F6F6] rounded-xl shadow-sm hover:shadow-md transition h-full"
              >
                <Image
                  src={`/assets/images/customer/${action.icon}`}
                  alt={action.label}
                  width={40}
                  height={40}
                  className="w-10 h-10 mb-2"
                />
                <p className="text-[#000] font-medium text-[12px] text-center">{action.label}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Home Lab Tests Packages */}
      <div className="md:text-center m-auto mx-3 md:pr-10">
        <div className="flex md:block gap-2">
          <Image
            src="/assets/images/customer/home-lab-sys.png"
            alt="Home Lab"
            width={50}
            height={50}
            className="block md:hidden w-[50px] h-[50px]"
          />
          <div>
            <h3 className="text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-3xl font-semibold text-gray-800 lg:mb-4">
              Home Lab Tests Packages
            </h3>
            <p className="text-gray-600 text-[9px] md:text-base xl:text-[20px]">
              Book health checkups at home, get samples collected safely, <br className="md:block hidden" /> and receive
              doctor-reviewed reports.
            </p>
          </div>
        </div>
        <div className="text-end lg:-mt-5">
          <Link href="/customer-package" className="text-[#1F80D2] text-[10px] lg:text-[16px]">
            View All
          </Link>
        </div>
      </div>

      {/* Lab Packages Carousel */}
      <div className="lg:pl-8 mx-3">
        <div className="swiper home-lab-carouselsec w-full">
          <div className="swiper-wrapper mb-6 mt-2 md:mb-6 md:mt-4">
            {isLoading ? (
              <p className="text-center">Loading...</p>
            ) : (
              labPackages.map((pkg: any, index: number) => (
                <div key={index} className="swiper-slide">
                  <div className="bg-white rounded-2xl lg:rounded-3xl shadow-md overflow-hidden border shadow-[3.26px_3.26px_8.16px_-4.9px_#00000047] transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="p-2 lg:p-5">
                      <div className="lg:mb-5 mb-2 relative w-full aspect-[16/9] overflow-hidden rounded-xl">
                        <Image
                          src={pkg.image || '/placeholder.svg'}
                          alt={pkg.title}
                          fill
                          sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 30vw"
                          className="object-contain"
                        />
                      </div>

                      <h4 className="text-[11px] md:text-[17px] lg:text-[16px] font-semibold text-[#000] mb-2">
                        {pkg.title}
                      </h4>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center mb-1">
                          <Image
                            src="/assets/images/customer/tester.svg"
                            alt="Tests"
                            width={30}
                            height={30}
                            className="mr-2 h-[20px] w-[20px] md:h-[30px] md:w-[30px]"
                          />
                          <span className="text-[#000] text-[8px] md:text-[14px] lg:text-[14px]">
                            <span className="text-red-600">{pkg.tests} Tests</span> Included
                          </span>
                        </div>
                        {pkg.price && (
                          <span className="text-[10px] md:text-[16px] lg:text-[16px] font-normal">{pkg.price}</span>
                        )}
                      </div>

                      <div className="flex items-center lg:mb-4 md:mb-4 mb-2">
                        <Image
                          src="/assets/images/customer/report-time.svg"
                          alt="Report Time"
                          width={30}
                          height={30}
                          className="mr-2 h-[15px] w-[15px] md:h-[30px] md:w-[30px]"
                        />
                        <span className="text-[#000] text-[8px] md:text-[14px] lg:text-[14px]">
                          Reports within: <span className="text-[#DC2626]">{pkg.reportTime}</span>
                        </span>
                      </div>

                      <div className="lg:mb-4 md:mb-4 mb-2">
                        <div className="flex space-x-3">
                          <Link
                            href="/customer-package"
                            className="h-fit md:h-auto flex-1 text-center border text-[#DC2626] border-[rgba(127,127,127,1)] text-[10px] md:text-[16px] lg:py-2 py-1 px-1 rounded font-medium hover:text-white hover:bg-[rgba(0,0,0,1)] transition-colors"
                          >
                            View Details
                          </Link>
                          <Link
                            href="/customer-package"
                            className="h-fit md:h-auto flex-1 text-center text-white lg:py-2 py-1 px-1 bg-[rgba(0,0,0,1)] text-[10px] md:text-[16px] rounded font-medium hover:bg-red-700 transition-colors"
                          >
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>

      {/* No Upcoming Visits */}
      <div className="max-w-[1300px] mx-auto border mb-5 mt-5 md:mb-[60px] md:mt-[60px] border-b-[10px] border-b-[#DC262680] border-[rgba(236,236,236,1)] lg:rounded-[20px] rounded-[10px] p-5 lg:p-10 lg:px-[50px] xl:px-[70px] 2xl:px-[100px] px-[10px] items-center m-auto w-[95%] relative flex justify-between bg-[url('/assets/images/customer/no-upcoming-bg.svg')] bg-cover bg-center bg-no-repeat">
        <div className="relative">
          <h4 className="text-base md:text-xl lg:text-xl xl:text-2xl 2xl:text-2xl font-semibold text-gray-800 md:mb-4 mb-2">
            No upcoming visits
          </h4>
          <p className="lg:mb-10 md:mb-3 mb-4 text-sm md:text-md lg:text-lg xl:text-xl font-light">
            Book doctors, lab tests, or home care <br className="md:block hidden" /> services anytime, anywhere.
          </p>
          <Link
            href="/customer-package"
            className="inline-block text-white lg:py-3 py-2 lg:px-7 px-5 text-[11px] md:text-base xl:text-[20px] rounded bg-[rgba(0,0,0,1)] font-normal hover:bg-red-700 transition-colors"
          >
            Book Now
          </Link>
        </div>
        <div>
          <Image
            src="/assets/images/customer/no-upcoming-visit.svg"
            alt="No Upcoming Visit"
            width={200}
            height={200}
            className="relative"
          />
        </div>
        <Image
          src="/assets/images/customer/border-up-coming.svg"
          alt="Border"
          width={500}
          height={20}
          className="absolute w-[95%] left-1/2 transform -translate-x-1/2 m-auto h-[20px] lg:h-auto -bottom-[20px]"
        />
      </div>

      {/* Medicine Delivery */}
      <div className="max-w-[1300px] mx-auto overflow-hidden shadow-[0_2.58px_5.15px_2.58px_rgba(0,0,0,0.14)] mb-[40px] mt-[10px] lg:mb-[80px] lg:mt-[10px] lg:rounded-[20px] rounded-[10px] px-[10px] lg:px-[40px] xl:px-[60px] 2xl:px-[80px] items-center m-auto w-[95%] relative flex justify-between bg-white">
        <div className="py-[10px] lg:py-[20px] flex flex-col justify-center">
          <h4 className="text-base md:text-xl lg:text-2xl xl:text-3xl font-semibold text-gray-800 mb-6">
            Medicine at Your Door in 60 mins!
          </h4>
          <p className="mb-3 text-sm md:text-md lg:text-lg xl:text-xl font-light">
            Skip the pharmacy queue — order, relax & receive at home.
          </p>
          <Link href="/customer-package" className="text-[#DC2626] font-medium text-[12px] md:text-base xl:text-[20px]">
            Order Now{' '}
            <i className="text-[#DC2626] text-[15px] md:text-[25px] font-medium flaticon-next top-[6px] relative"></i>
          </Link>
        </div>

        <div className="relative flex-shrink-0">
          <Image
            src="/assets/images/customer/medicine.png"
            alt="Medicine"
            width={280}
            height={280}
            className="relative object-contain"
          />
        </div>
      </div>

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
      <div className="flex gap-4 items-center px-5 md:gap-20 justify-evenly mt-4 mb-[60px] lg:mt-10 lg:mb-20 max-w-[1300px] mx-auto">
        <div className="text-center max-w-fit">
          <Image
            src="/assets/images/customer/experienced-medical-professionals.svg"
            alt="Experienced Medical Professionals"
            width={100}
            height={100}
          />
          <p className="mt-4 font-medium text-sm md:text-base lg:text-md xl:text-lg">
            Experienced Medical <br /> Professionals
          </p>
        </div>
        <div className="text-center max-w-fit">
          <Image src="/assets/images/customer/doorstep-care.svg" alt="Doorstep Care" width={100} height={100} />
          <p className="mt-4 font-medium text-sm md:text-base lg:text-md xl:text-lg">
            Doorstep <br /> Care
          </p>
        </div>
        <div className="text-center max-w-fit">
          <Image src="/assets/images/customer/privacy.svg" alt="Privacy" width={100} height={100} />
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
    </section>
  )
}
