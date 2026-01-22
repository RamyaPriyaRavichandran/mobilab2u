import Contact from '@/components/ContactUs'
import ContactNew from '@/components/HomePage/ContactUs'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Contact Mobilab2u For Home Healthcare Services in Malaysia',
  description:
    'Contact Mobilab2u for home healthcare & caretaker services in Malaysia with home tests, elderly care, & personalized medical services at your doorstep.',
  alternates: {
    canonical: 'https://www.mobilab2u.com/contact-home-healthcare-services',
  },
  openGraph: {
    type: 'website',
    siteName: 'MobiLab2u',
    url: 'https://www.mobilab2u.com/contact-home-healthcare-services',
    title: 'Contact Mobilab2u For Home Healthcare Services in Malaysia',
    description:
      'Contact Mobilab2u for home healthcare & caretaker services in Malaysia with home tests, elderly care, & personalized medical services at your doorstep.',
    images: [
      {
        url: 'https://www.mobilab2u.com/assets/images/services/best-digital-healthcare-platform.webp',
        alt: 'Best home healthcare platform offering lab tests, doctor consultations, & medicine delivery in Malaysia',
      },
    ],
    locale: 'en_MY',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Mobilab2u For Home Healthcare Services in Malaysia',
    description:
      'Contact Mobilab2u for home healthcare & caretaker services in Malaysia with home tests, elderly care, & personalized medical services at your doorstep.',
    images: [
      {
        url: 'https://www.mobilab2u.com/assets/images/services/best-digital-healthcare-platform.webp',
        alt: 'Best home healthcare platform offering lab tests, doctor consultations, & medicine delivery in Malaysia',
      },
    ],
    site: '@mobilab2u',
    creator: '@mobilab2u',
  },
  icons: {
    icon: '/assets/images/mobilab2u-favicon.png',
  },
}

export default function page() {
  return <ContactNew />
}
