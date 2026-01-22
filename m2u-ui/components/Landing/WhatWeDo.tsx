'use client'

import React from 'react'
import Image from 'next/image'
import { SparklesText } from '../Animation/SparklesText'
import arrow from '@/public/images/right-arrow.png'
import { motion } from 'framer-motion'

function WhatWeDoSection() {
  const ourJob = [
    { name: 'On demand health services', imageUrl: '/images/insurance.jpg' },
    { name: 'Healthcare Personals', imageUrl: '/images/fouryoung.jpg' },
    { name: 'Collecting samples', imageUrl: '/images/nursedraws.jpg' },
    { name: 'Results Delivered Directly', imageUrl: '/images/maledoctors.jpg' },
    { name: 'Online Doctor Consultation', imageUrl: '/images/doctortrain.jpg' },
    { name: 'Happy customers', imageUrl: '/images/senior.jpg' },
  ]
  const arrowVariants = {
    hidden: { x: 0 },
    visible: {
      x: [-6, 10],
      transition: {
        duration: 2,
        repeat: Infinity,
      },
    },
  }
  return (
    <div className="py-2 sm:py-8 lg:max-h-[900px]  sm:max-h-[20px] mt-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <SparklesText text="What we do" className="text-4xl font-bold text-gray-900 sm:text-5xl text-center mb-3" />
          <div className="flex items-center justify-center mb-8">
            <div className="border-t-2 border-brand-500 w-[10rem]"></div>
          </div>
          <p className="mt-8 text-md leading-6 max-w-2xl mx-auto text-gray-600">
            Mobilab2u.com is a new on-demand service that matches our registered healthcare partners with customers and
            patients who are looking to take time-sensitive medical tests, get medical advice, and counseling support
            without having to travel to hospitals, labs, and clinics.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-32 mt-12 lg:hidden">
          {ourJob.map((job, index) => (
            <div key={index} className="flex flex-col items-center transition-transform hover:scale-105">
              <div className="relative h-[120px] w-[160px] rounded-2xl overflow-hidden">
                <Image
                  src={job.imageUrl}
                  alt={job.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              </div>
              <h3 className="mt-2 mb-4 text-md font-semibold leading-6 tracking-tighter text-gray-900 text-center">
                {job.name}
              </h3>
            </div>
          ))}
        </div>

        <div className="hidden lg:flex flex-wrap justify-center items-center mt-12 gap-y-10 ">
          {ourJob.map((job, index) => (
            <React.Fragment key={index}>
              <div className="w-[300px] h-[250px] flex flex-col items-center transition-transform hover:scale-105">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src={job.imageUrl}
                    alt={job.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-2xl"
                    sizes="(max-width: 768px) 100vw, 320px"
                  />{' '}
                </div>
                <h3 className="mt-4 text-lg font-semibold leading-8 tracking-tight text-gray-900 text-center">
                  {job.name}
                </h3>
              </div>
              {index < ourJob.length - 1 && (index + 1) % 3 !== 0 && (
                <motion.div
                  className="flex items-center mx-4 overflow-hidden"
                  variants={arrowVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="relative w-12 h-12">
                    <Image src={arrow} alt="Arrow" layout="fill" objectFit="contain" />
                  </div>
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WhatWeDoSection
