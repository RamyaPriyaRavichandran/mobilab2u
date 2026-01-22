import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import SparklesText from '../Animation/SparklesText'

export default function Contact() {
  return (
    <>
      {/* contact-us component */}
      <div className="flex justify-center py-8 px-4">
        <div className="flex flex-col lg:flex-row justify-center items-center max-w-6xl w-full h-auto lg:h-[400px]">
          <div className="flex flex-col justify-center h-full w-full lg:w-1/2 px-8 text-center lg:text-left mb-8 lg:mb-0">
            <SparklesText text="Contact Us" className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4" />
            <p className="text-base md:text-lg text-gray-600 mb-8">
              Welcome to Our Company! We are dedicated to providing the best service possible.
            </p>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center">
            <Image
              src="/svgs/contact.svg"
              width={400}
              height={400}
              priority
              alt="Contact us"
              className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-auto"
            />
          </div>
        </div>
      </div>

      {/* contact component */}
      <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center">
        <div className="w-full max-w-6xl p-6">
          <div className="container mx-auto my-12 p-6">
            <div className="w-full mx-auto">
              <div>
                <SparklesText text="Get in touch" className="text-3xl md:text-4xl text-gray-900 text-center mb-2" />
                <div className="flex items-center justify-center -mt-4 mr-1">
                  <div className="flex items-center justify-center mb-8 mt-4">
                    <div className="border-t-2 border-brand-500 w-[8rem]"></div>
                  </div>
                </div>
              </div>

              <div className="max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                {/* Email */}
                <div className="bg-gray-50 shadow-lg rounded-lg p-4 h-[150px] items-center">
                  <div className="flex items-center">
                    <EnvelopeIcon className="h-6 w-6 text-brand-400 mr-2" />
                    <h3 className="text-lg font-bold">Email</h3>
                  </div>
                  <p className="text-gray-600">
                    <a href="mailto: info@mobilab2u.com" className="text-blue-600 underline items-center">
                      info@mobilab2u.com
                    </a>
                  </p>
                </div>

                {/* Phone */}
                <div className="bg-gray-50 shadow-lg rounded-lg p-4">
                  <div className="flex items-center">
                    <PhoneIcon className="h-6 w-6 text-brand-400 mr-2" />
                    <h3 className="text-lg font-bold">Phone</h3>
                  </div>
                  <p className="text-gray-600 items-center">+60-12 541 2990</p>
                </div>

                {/* Address */}
                <div className="bg-gray-50 shadow-lg rounded-lg p-4">
                  <div className="flex items-center">
                    <MapPinIcon className="h-6 w-6 text-brand-400 mr-2" />
                    <h3 className="text-lg font-bold">Address</h3>
                  </div>
                  <p className="text-gray-600">
                    No.4A, Jalan SS 5B/4, SS 5, Kelana Jaya, 47301 Petaling Jaya, Selangor Darul Ehsan, Malaysia.{' '}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* map component */}
          <div className="w-full p-4 flex justify-center items-center mt-12 lg:mt-16">
            <div className="w-full h-64 sm:h-80 lg:h-full">
              <SparklesText text="Location" className="text-3xl md:text-4xl text-gray-900 text-center mb-2" />
              <div className="flex items-center justify-center mb-8 ">
                <div className="border-t-2 border-brand-500 w-[6rem]"></div>
              </div>
              <div className="mapouter">
                <div className="gmap_canvas shadow-lg">
                  <iframe
                    width="100%"
                    height="100%"
                    id="gmap_canvas"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3180.255948217297!2d101.60525261607454!3d3.100869073734735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4c0e4a63a8c1%3A0x3b07567654cb0ae3!2sKlinik%20Amardev%20Dan%20Surgeri!5e0!3m2!1sen!2smy!4v1691983230944!5m2!1sen!2smy"
                    frameBorder="0"
                    scrolling="no"
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
