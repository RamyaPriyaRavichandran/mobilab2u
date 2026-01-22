import Image from 'next/image'
import SparklesText from '../Animation/SparklesText'
import Link from 'next/link'
import { SP_REGISTER } from '@/utils/constents/routes'
import WhatIsMobilab from './WhatIsMobilab'
import AboutMobilab from './AboutMobilab'
import WhatIsHC from './WhatIsHC'

export default function About() {
  return (
    <>
      <div className="flex justify-center py-10 px-4 lg:px-6">
        <div className="flex flex-col lg:flex-row justify-center items-center max-w-6xl w-full h-auto lg:h-[400px] space-x-0 lg:space-x-8">
          <div className="flex flex-col justify-center h-full w-full lg:w-1/2 px-4 lg:px-8 text-center lg:text-left mb-8 lg:-mb-4">
            <SparklesText
              text="About Mobilab2u"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
            />
            <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
              Mobilab2u was founded as Mobile Healthcare Enterprise in 2021 by a group of doctors, insurance industry
              leaders, and lawyers, all bound by the common desire to plug a gap in healthcare services that was exposed
              by the Covid-19 pandemic.
            </p>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col lg:justify-center">
            <Image
              src="/images/clientimg.jpg"
              width={400}
              height={400}
              priority
              alt="About us"
              className="w-full sm:w-2/3 md:w-1/2 lg:w-full rounded-lg lg:h-[400px]"
            />
            <p className="text-sm mt-2 text-right"> Dr Ganeshan Palanisamy, Co-Founder and Managing Director</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center py-12 px-4 lg:px-8 mt-6 w-full">
        <div className="max-w-6xl w-full text-center">
          <h1 className="text-xl text-gray-700 font-semibold mb-4">Dear Healthcare Professionals,</h1>
          <SparklesText
            text="A Message from our Managing Director,"
            className="text-2xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-8"
          />
          <p className="text-lg text-gray-700 mb-8 mx-auto lg:w-[900px] leading-relaxed text-center">
            The Malaysian healthcare system is burdened by congestion and a lack of required manpower to deal with
            surging health demands. We strongly believe that digital solutions are the way forward to help alleviate
            this burden while meeting the growing needs of an aging population while also helping elevate quality of
            life for many healthcare professionals who has found their workload increasing post-pandemic. We hope you
            will see Mobilab2u as an able partner to help you supplement your income while bringing more direct help to
            the individuals in need.
          </p>

          <Link
            className="bg-brand-500 text-white py-3 px-6 rounded-full hover:bg-brand-600 transition duration-300"
            href={SP_REGISTER}
          >
            Register
          </Link>
        </div>
      </div>

      <WhatIsMobilab />

      <AboutMobilab />

      <WhatIsHC />
    </>
  )
}
