import React from 'react'
import Image from 'next/image'
import SparklesText from '../Animation/SparklesText'

export default function OurPartner() {
  const companies = [
    {
      name: 'Lablink Medical Laboratory',
      imageUrl: '/images/kpjlink.jpg',
      bio: 'With over three decades of excellence, Lablink Medical Laboratory stands as Malaysia’s largest private hospital lab, managing 30 KPJ Healthcare Bhd hospitals. Its cutting-edge Lablink Central in Kuala Lumpur is BSL-3 certified, pioneering advanced infectious disease testing, including Tuberculosis (TB). Renowned for its uncompromising quality and innovation, Lablink is the trusted partner of Mobilab2U, delivering accurate, reliable, and world-class diagnostics right to your doorstep.',
      link: 'https://kpjlablink.com/',
    },
    {
      name: 'The Synapse Ideal',
      imageUrl: '/images/synapse.png',
      bio: 'Synapse Sdn Bhd, a Synagene company, is a specialised genetic testing laboratory. It also runs Nexus Medilabs Sdn Bhd, a healthcare screening and diagnostic laboratory, and MedicSkills Sdn Bhd, a skills-based training provider.',
      link: 'https://synapselaboratory.com/',
    },
    {
      name: 'Pantai Premier Pathology',
      imageUrl: '/images/pantai.png',
      bio: 'Pantai Premier Pathology Sdn Bhd has laboratories in the Pantai group of hospitals, Gleneagles hospitals, and non-hospital-based branches within Malaysia. Their reference core laboratory is located in Pantai Hospital Ampang.',
      link: 'https://www.premierintegratedlabs.com.my',
    },
  ]

  return (
    <div className="py-12 md:py-16 lg:py-2">
      <SparklesText text="Our Lab Partners" className="text-4xl sm:text-4xl font-bold text-gray-900 text-center mb-2" />

      <hr className="border-t-2 border-brand-500 mx-auto w-[12rem] mb-8" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
        <ul
          role="list"
          className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none grid gap-x-8 gap-y-20 xl:grid-cols-3 lg:gap-x-10"
        >
          {companies.map((company) => (
            <li key={company.name} className="group">
              <a href={company.link} target="_blank">
                <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-md group-hover:shadow-lg transition-shadow duration-300 ease-in-out mb-4">
                  <Image
                    alt="company images"
                    src={company.imageUrl}
                    width={400}
                    height={300}
                    className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </a>
              <a
                className="text-xl leading-8 text-gray-900 hover:text-sky-600 hover:underline"
                href={company.link}
                target="_blank"
              >
                {company.name}
              </a>
              <p className="mt-2 text-base leading-7 text-gray-600">{company.bio}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
