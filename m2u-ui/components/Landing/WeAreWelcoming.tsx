import Image from 'next/image'
import React from 'react'
import SparklesText from '../Animation/SparklesText'

const services = [
  {
    title: 'Healthcare Service Providers',
    description:
      'We partner with Malaysian medical professionals who are qualified to undertake medical and health tests at the home of individuals, by providing them with the necessary kits and tools to carry out tests and securely transport them to our labs.',
    image: '/images/servicepro.jpg',
    features: [
      'Collaboration with medical professionals',
      'Boosting supplementary income',
      'Expanding healthcare access',
      'Supporting healthcare professionals',
    ],
  },
  {
    title: 'Doctors',
    description:
      'Mobilab2u welcomes qualified doctors who will be able to carry out medical and health tests at individuals’ homes and also provide online or on-call consultation with individuals to explain test results or diagnose minor health issues.',
    image: '/images/doctors.jpg',
    features: [
      'On-demand doorstep testing services',
      'Qualified medical practitioners',
      'Comprehensive health screenings',
      'Remote consultation for minor ailments',
    ],
  },
  {
    title: 'Counselors',
    description:
      'We welcome qualified counselors from different disciplines to help us provide remote consultation services to individuals in need. This may be in the form of psychological or physiological counseling. Under this vertical, Mobilab2u.com will also organise periodic, all-access webinars on mind science to help to improve quality of life and mental wellbeing on interested individuals.',
    image: '/images/counselors.jpg',
    features: ['Seeking help becomes more accessible', 'Counseling at fingertips'],
  },
]

function WeAreWelcoming() {
  return (
    <section>
      <div className="mb-16">
        <SparklesText
          text="We are welcoming"
          className="text-4xl font-bold text-gray-900 sm:text-5xl text-center mb-4"
        />
        <div className="flex items-center justify-center mb-11 mr-1">
          <div className="border-t-2 border-brand-500 w-[15rem] mb-8"></div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className={`relative flex flex-col items-center text-center border border-gray-200 bg-white rounded-lg shadow-md sm:w-[290px] md:w-[320px] hover:bg-gradient-to-r hover:from-brand-50 hover:via-white hover:to-brand-50 transition-colors duration-300${
              index === 1 && 'md:z-10'
            }`}
          >
            <div className="relative w-full h-52 overflow-hidden rounded-t-lg ">
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                style={{ objectFit: 'cover' }}
                className="rounded-t-lg hover:opacity-90 transition-opacity duration-300"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-center text-stone-700 mb-4 transition-all duration-300">
                {service.title}
              </h2>
              <p className="text-gray-900 text-sm mb-6 text-justify mt-2">{service.description}</p>
              <ul className="text-left text-gray-600 text-sm tracking -mt-2">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-3 text-brand-500">☑</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WeAreWelcoming
