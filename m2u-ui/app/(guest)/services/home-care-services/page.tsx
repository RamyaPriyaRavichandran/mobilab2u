import GeriatricCare from '@/components/HomePage/GeriatricCare'
import HomeCareServivces from '@/components/HomePage/HomeCareServices'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Professional Home Nursing Care Services In Malaysia',
  description:
    'Book 24/7 professional home nursing care in Malaysia for personalized post-surgical recovery, senior care, and short- or long-term medical support.',
  alternates: { canonical: 'https://www.mobilab2u.com/home-nursing-care-services' },
  openGraph: {
    type: 'website',
    siteName: 'MobiLab2u',
    url: 'https://www.mobilab2u.com/home-nursing-care-services',
    title: 'Professional Home Nursing Care Services In Malaysia',
    description:
      'Book 24/7 professional home nursing care in Malaysia for personalized post-surgical recovery, senior care, and short- or long-term medical support.',
    images: [
      {
        url: 'https://www.mobilab2u.com/assets/images/mobilab2u/home-healthcare-ervices-doorstep-malaysia.webp',
        alt: 'Access top home healthcare services at doorstep in Malaysia for convenient, safe, & reliable care',
      },
    ],
    locale: 'en_MY',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Mobilab2u',
    title: 'Professional Home Nursing Care Services In Malaysia',
    description:
      'Book 24/7 professional home nursing care in Malaysia for personalized post-surgical recovery, senior care, and short- or long-term medical support.',
    images: ['https://www.mobilab2u.com/assets/images/mobilab2u/home-healthcare-ervices-doorstep-malaysia.webp'],
    creator: '@Mobilab2u',
  },
  viewport: { width: 'device-width', initialScale: 1 },
  icons: { icon: '/assets/images/mobilab2u-favicon.png' },
}

export default function page() {
  return (
    <div>
      <HomeCareServivces />
    </div>
  )
}
