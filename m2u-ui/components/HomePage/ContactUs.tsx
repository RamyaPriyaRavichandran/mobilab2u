'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import * as Yup from 'yup'
import Link from 'next/link'
import Image from 'next/image'
import { Form, Formik } from 'formik'
import useSWRMutation from 'swr/mutation'
import { mutater } from '@/lib/fetchers'
import { usePopup } from '@/lib/contexts/PopupContext'
import { CONTACT_US_FORM } from '@/lib/endpoints'
import StyledInput from './CustomerRegister/StyleInput'
import DashLoader from '../common/DashLoader'
import { INPUT_PHONE_NUMBER, INPUT_PHONE_NUMBER_MAX, INPUT_PHONE_NUMBER_MIN } from '@/utils/constents'

// Extend the Window interface to include AOS
declare global {
  interface Window {
    AOS?: {
      init: (options?: any) => void
    }
  }
}
export interface ContactusFormInterface {
  name: string
  email: string
  location: string
  phone: string
  subject: string
  message: string
}

const contactUsSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().min(10, INPUT_PHONE_NUMBER_MIN).max(11, INPUT_PHONE_NUMBER_MAX).required(INPUT_PHONE_NUMBER),
  location: Yup.string().required('Location Required'),
  subject: Yup.string().required('Required'),
  message: Yup.string().required('required'),
})

export default function ContactNew() {
  const { showSuccess, showError } = usePopup()

  const { trigger: ContactUsForm, isMutating: formMutating } = useSWRMutation(
    CONTACT_US_FORM,
    mutater<
      { location: string; phone: string; subject: string; message: string; name: string; email: string },
      { message: string }
    >('POST'),
    {
      onSuccess: ({ data: { message = '' } = {} }) => {
        showSuccess(message)
      },
      onError: ({ response: { data: { message = '' } = {} } }) => {
        showError(message)
      },
      throwOnError: false,
    }
  )

  useEffect(() => {
    // Initialize AOS when component mounts
    if (typeof window !== 'undefined') {
      const initAOS = () => {
        if (window.AOS) {
          window.AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
          })
        }
      }
      // Try to initialize immediately if AOS is already loaded
      initAOS()

      // Also listen for the load event in case it's not loaded yet
      window.addEventListener('load', initAOS)

      return () => {
        window.removeEventListener('load', initAOS)
      }
    }
  }, [])

  return (
    <>
      {/* Load AOS CSS */}
      <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />

      {/* Load AOS JS */}
      <Script
        src="https://unpkg.com/aos@next/dist/aos.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.AOS) {
            window.AOS.init({
              duration: 1000,
              once: true,
              offset: 100,
            })
          }
        }}
      />

      <main>
        {/* Breadcrumb Section */}
        <section className="bg-[#fef1e7] breadcrumb-detail pt-8 pb-12 md:pt-16 md:pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-xl md:text-3xl font-bold text-black mb-2">
              Your One-Stop Homecare Service Provider in Malaysia
            </h1>

            <ul className="flex justify-center gap-0 text-sm text-black font-semibold mt-6">
              <li className="flex items-center gap-1">
                <Image src="/assets/images/svg/home.svg" alt="Home Icon" width={16} height={16} className="w-4 h-4" />
                <Link href="/" className="hover:underline">
                  Home
                </Link>
                <span className="ml-[5px]">›</span>
                <i className="flaticon flaticon-next inline-block relative top-[2.5px] mx-[5px]"></i>
              </li>
              <li className="text-gray-500">Contact Us</li>
            </ul>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-8 md:py-16">
          <div className="max-w-6xl mx-auto px-2 md:px-4" data-aos="fade-up">
            <div className="relative text-center mb-12 px-4">
              <Image
                src="/assets/images/svg/star-bg.svg"
                alt=""
                aria-hidden="true"
                width={24}
                height={24}
                className="hidden md:block absolute left-14 top-[85%] transform -translate-y-1/2 w-6 h-6 pointer-events-none"
              />
              <Image
                src="/assets/images/svg/star-bg.svg"
                alt=""
                aria-hidden="true"
                width={24}
                height={24}
                className="hidden md:block absolute right-14 top-[85%] transform -translate-y-1/2 w-6 h-6 pointer-events-none"
              />

              <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-[#1d1d1f] mb-6 splt-txt">
                Connect with <em className="text-red-600">MobiLab2u</em> for Trusted Home Healthcare
              </h2>

              <p className="text-gray-600 max-w-2xl mx-auto">
                Feel free to reach out to us using the options below, and our dedicated team will respond to your
                inquiries promptly.
              </p>
            </div>

            <div className="rounded-[24px] overflow-hidden shadow-md">
              <div className="grid md:grid-cols-2">
                <div className="relative w-full h-full rounded-2xl">
                  <Image
                    src="/assets/images/mobilab2u/mobilab2u-support.webp"
                    alt="Reach out to MobiLab2u for reliable home healthcare services. Our team responds quickly to your needs."
                    title="Connect with MobiLab2u for Trusted Home Healthcare in Malaysia"
                    width={560}
                    height={518}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>

                <div className="bg-[#fef1e7] p-4 md:p-8 flex flex-col justify-center">
                  <p className="text-gray-700 mb-6">
                    Have a question or feedback? Fill out the form below, and we&apos;ll get back to you as soon as
                    possible.
                  </p>

                  <Formik
                    initialValues={{ name: '', email: '', location: '', phone: '', subject: '', message: '' }}
                    validationSchema={contactUsSchema}
                    onSubmit={(values: ContactusFormInterface, { setSubmitting, resetForm }) => {
                      ContactUsForm(values)
                      setSubmitting(false)
                      resetForm()
                    }}
                  >
                    {({ values, handleChange, handleSubmit, isSubmitting }) => (
                      <Form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <StyledInput name="name" placeholder="Name" />
                          <StyledInput name="email" placeholder="Email" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <StyledInput name="location" placeholder="Location" />
                          <StyledInput name="phone" placeholder="Phone Number" />
                        </div>

                        <StyledInput name="subject" placeholder="Subject" />
                        <StyledInput name="message" placeholder="Your Message" />

                        <button
                          disabled={formMutating}
                          type="submit"
                          className="w-full bg-red-600 text-white font-semibold py-3 rounded-md hover:bg-[#000] transition"
                        >
                          {formMutating ? <DashLoader color="Red" /> : 'Send Message'}
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Ways to Reach Us Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-up">
            <h2 className="text-2xl font-bold text-center mb-10">Other ways to reach us</h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Card 1 */}
              <div className="bg-[#fef1e7] rounded-2xl flex flex-col justify-between text-center px-8 py-12 h-full transition-transform duration-300 ease-out hover:-translate-y-3">
                <div>
                  <Image
                    src="/assets/images/svg/icon-location.svg"
                    alt="Locate Us in Malaysia"
                    title="Locate Us in Malaysia"
                    width={64}
                    height={64}
                    className="mx-auto mb-6 w-16 h-16"
                  />
                  <h3 className="text-lg font-semibold mb-2">Visit us</h3>
                  <p className="text-gray-600">
                    No.4A, Jalan SS 5B/4, SS 5,
                    <br />
                    Kelana,Jaya, 47301 Petaling
                    <br />
                    Jaya, Selangor,Darul Ehsan, Malaysia.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#fef1e7] rounded-2xl flex flex-col justify-between text-center px-8 py-12 h-full transition-transform duration-300 ease-out hover:-translate-y-3">
                <div>
                  <Image
                    src="/assets/images/svg/icon-chat.svg"
                    alt="Whatsapp Us For Home Healthcare Services in Malaysia"
                    title="Whatsapp Us For Home Healthcare Services in Malaysia"
                    width={64}
                    height={64}
                    className="mx-auto mb-6 w-16 h-16"
                  />
                  <h3 className="text-lg font-semibold mb-2">Via Whatsapp</h3>
                  <p className="text-gray-600 mb-3">Get instant answers.</p>
                  <Link className="text-gray-600" href="tel:+60125412990">
                    +60-12 541 2990
                  </Link>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-[#fef1e7] rounded-2xl flex flex-col justify-between text-center px-8 py-12 h-full transition-transform duration-300 ease-out hover:-translate-y-3">
                <div>
                  <Image
                    src="/assets/images/svg/icon-internet.svg"
                    alt="Mail Us For Issues in Healthcare Services in Malaysia"
                    title="Mail Us For Issues in Healthcare Services in Malaysia"
                    width={64}
                    height={64}
                    className="mx-auto mb-6 w-16 h-16"
                  />
                  <h3 className="text-lg font-semibold mb-2">Report Issue</h3>
                  <p className="text-gray-600 mb-3">Get priority support.</p>
                  <a className="text-gray-600" href="mailto:info@mobilab2u.com">
                    mailto:info@mobilab2u.com
                  </a>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-[#fef1e7] rounded-2xl flex flex-col justify-between text-center px-8 py-12 h-full transition-transform duration-300 ease-out hover:-translate-y-3">
                <div>
                  <Image
                    src="/assets/images/svg/icon-community.svg"
                    alt="Community IconConnect With Our Community Users In Malaysia"
                    title="Community IconConnect With Our Community Users In Malaysia"
                    width={64}
                    height={64}
                    className="mx-auto mb-6 w-16 h-16"
                  />
                  <h3 className="text-lg font-semibold mb-2">Our community</h3>
                  <p className="text-gray-600">Connect with users.</p>
                </div>
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

        {/* Fixed WhatsApp and Phone Icons */}
        <div className="fixed right-1 sm:right-4 transform -translate-y-1/2 z-50 top-1/2">
          <Link href="https://wa.me/+60125412990?text=How we can help you?" target="_blank" rel="noopener noreferrer">
            <Image
              src="/assets/images/svg/whatsapp.gif"
              alt="WhatsApp"
              title="Chat with us"
              width={45}
              height={45}
              className="w-[45px] h-[45px] drop-shadow-md hover:scale-110 transition-transform duration-300"
            />
          </Link>

          <Link href="tel:+60125412990" target="_blank" rel="noopener noreferrer">
            <Image
              src="/assets/images/phone-icon.gif"
              alt="phone"
              title="Chat with us"
              width={45}
              height={45}
              className="w-[45px] h-[45px] drop-shadow-md hover:scale-110 transition-transform duration-300 lg:hidden mt-2"
            />
          </Link>
        </div>
      </main>
    </>
  )
}
