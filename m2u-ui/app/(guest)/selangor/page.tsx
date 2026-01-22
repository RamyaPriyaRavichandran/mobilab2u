import SelangorHealthcare from '@/components/HomePage/States/Selangor'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Doctor on Call & Medicines Home Delivery in Selangor',
  description:
    'MobiLab2u offers home care services in Selangor with doctors on call, home sample collection, online consultations, & medicine delivery to your doorstep.',
  metadataBase: new URL('https://www.mobilab2u.com'),
  alternates: {
    canonical: 'https://www.mobilab2u.com/selangor',
  },
  openGraph: {
    type: 'website',
    siteName: 'Mobilab2u',
    url: 'https://www.mobilab2u.com/selangor',
    title: 'Doctor on Call & Medicines Home Delivery in Selangor',
    description:
      'MobiLab2u offers home care services in Selangor with doctors on call, home sample collection, online consultations, & medicine delivery to your doorstep.',
    images: [
      {
        url: 'https://www.mobilab2u.com/assets/images/location/home-blood-tests-selangor.webp',
        alt: 'Home blood tests and online doctor consultations providing convenient, safe, and reliable in Selangor',
        width: 480,
        height: 288,
      },
    ],
    locale: 'en_MY',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mobilab2u',
    title: 'Doctor on Call & Medicines Home Delivery in Selangor',
    description:
      'MobiLab2u offers home care services in Selangor with doctors on call, home sample collection, online consultations, & medicine delivery to your doorstep.',
    images: [
      {
        url: 'https://www.mobilab2u.com/assets/images/location/home-blood-tests-selangor.webp',
        alt: 'Home blood tests and online doctor consultations providing convenient, safe, and reliable in Selangor',
      },
    ],
  },
  icons: {
    icon: '/assets/images/mobilab2u-favicon.png',
  },
  other: {
    'twitter:domain': 'mobilab2u.com',
    'twitter:locale': 'en_MY',
  },
}

export default function page() {
  return (
    <div>
      <SelangorHealthcare />
    </div>
  )
}
