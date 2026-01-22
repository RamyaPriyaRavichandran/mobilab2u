'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import React from 'react'

export default function RegisterPage() {
  const cards = [
    {
      image: '/assets/images/register/customer.svg',
      title: 'Customer',
      description: 'Book medical tests and health services at your doorstep.',
      href: '/user/customer/register',
      button: 'Continue as Customer',
      color: 'blue',
    },
    {
      image: '/assets/images/register/service-provider.svg',
      title: 'Service Provider',
      description: 'Join as a doctor, nurse, or paramedic and provide healthcare services.',
      href: '/user/sp/register',
      button: 'Register as Service Provider',
      color: 'green',
    },
    {
      image: '/assets/images/register/gp-partner.svg',
      title: 'GP Partner',
      description: 'Collaborate with us to expand healthcare access and build partnerships.',
      href: '/user/gp/register',
      button: 'Become a GP Partner',
      color: 'purple',
    },
  ]

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[url('/assets/images/bg/shape01.png')] bg-[#fef1e7] bg-center bg-cover py-10 px-6">
      {/* Header */}
      <header className="w-full flex justify-between items-center max-w-7xl mx-auto mb-10">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src="/assets/images/svg/mobilab2u-icon.svg"
              alt="MobiLab2u"
              width={180}
              height={90}
              className="object-contain"
            />
          </Link>
        </div>

        <Link href="/" className="text-base font-medium text-red-600 hover:underline flex items-center gap-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
      </header>

      {/* Title Section */}
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-[2rem] md:text-[3rem] font-bold leading-tight mb-3 text-red-600">
          Choose How You Want to Register
        </h1>
        <p className="text-gray-800 text-lg">Pick an option to get started quickly</p>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-7xl">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white rounded-3xl shadow-md p-10 text-center hover:shadow-2xl transition-transform hover:-translate-y-3 duration-300"
          >
            <div className="flex justify-center mb-6">
              <Image src={card.image} alt={card.title} width={220} height={420} className="object-contain" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">{card.title}</h2>
            <p className="text-base text-gray-600 mb-6">{card.description}</p>
            <Link
              href={card.href}
              className={`inline-block bg-${card.color}-600 text-white px-6 py-3 rounded-xl hover:bg-${card.color}-700 transition text-base font-medium`}
            >
              {card.button}
            </Link>
          </motion.div>
        ))}
      </div>

      <footer className="text-center mt-12 px-4">
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          We respect your privacy. Your data will be used responsibly and only to provide the best service.
        </p>
      </footer>
    </main>
  )
}
