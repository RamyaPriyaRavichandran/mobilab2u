'use client'

import { SetStateAction, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { DevicePhoneMobileIcon, UserGroupIcon, RocketLaunchIcon } from '@heroicons/react/24/solid'
import SparklesText from '../Animation/SparklesText'

const content = [
  {
    title: 'Medical and Health Tests',
    description: `We provide on-demand and scheduled medical and health tests and screenings. Qualified professionals will head to individuals’ homes to collect test samples and send them to our lab partners for further processing. Results are delivered digitally and directly to the individuals.`,
    images: ['/images/doctors.jpg'],
    icon: DevicePhoneMobileIcon,
  },
  {
    title: 'Consultation',
    description: `We provide medical consultation pursuant to medical and health test results to individuals. We also provide remote medical consultation for minor ailments and for individuals who need certain prescriptions.`,
    images: ['/images/servicepro.jpg'],
    icon: UserGroupIcon,
  },
  {
    title: 'Counseling',
    description: `We provide both psychological and physiological-based remote counseling to individuals in need, making counseling more accessible to individuals who need help, and also for those who might hesitate to seek help publicly, or are uncomfortable in spaces outside their homes.`,
    images: ['/images/counselors.jpg'],
    icon: RocketLaunchIcon,
  },
]

function Services() {
  const [activeIndex, setActiveIndex] = useState(0)

  const toggleCard = (index: SetStateAction<number>) => {
    setActiveIndex(index)
  }

  const currentItem = content[activeIndex]

  return (
    <section className="py-8 md:py-16">
      <div className="flex flex-col lg:flex-row justify-center items-center max-w-6xl mx-auto px-4 lg:px-4 py-4">
        <div className="flex flex-col justify-center w-full lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
          <SparklesText text="Services" className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4" />
          <p className="text-sm md:text-lg text-gray-600 mb-8">
            We offer a range of services to bring healthcare and counseling to your doorstep, making it accessible and
            convenient.
          </p>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            src="/svgs/services.svg"
            width={400}
            height={400}
            priority
            alt="About us"
            className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-auto lg:ml-24"
          />
        </div>
      </div>
      <div className="container mx-auto px-4 mt-16 md:mt-24">
        <div className="text-center mb-12 md:mb-16">
          <SparklesText text="Our Services" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" />
          <div className="flex items-center justify-center mt-4">
            <div className="border-t-4 border-brand-500 w-24 md:w-32"></div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center gap-6 md:gap-8">
          {content.map((item, index) => (
            <div
              key={index}
              className={`relative rounded-full shadow-lg overflow-hidden w-full sm:w-[250px] md:w-[300px] h-[100px] cursor-pointer transition-transform transform duration-300 hover:scale-105 p-4 md:p-6 flex items-center text-center gap-2 md:gap-4 ${activeIndex === index ? 'bg-brand-50' : 'bg-gray-50'}`}
              onClick={() => toggleCard(index)}
            >
              <item.icon className="h-6 md:h-8 w-6 md:w-8 text-brand-400" />
              <div>
                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-1 text-left">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="mt-12 bg-gray-50 border-2 border-gray-50 rounded-lg shadow-md p-6 md:p-8 w-full max-w-[1000px] h-auto md:h-[250px]"
          >
            <div className="flex flex-row items-start gap-4 mb-6">
              <currentItem.icon className="h-6 md:h-8 w-6 md:w-8 text-brand-400 mt-0.5" />
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-800">{currentItem.title}</h3>
            </div>
            <p className="text-gray-600 text-sm md:text-base ml-6 tracking-wide text-justify">
              {currentItem.description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Services
