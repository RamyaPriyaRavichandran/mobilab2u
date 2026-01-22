import JohorHealthcare from '@/components/HomePage/States/Johor'
import { Metadata } from 'next'
import React from 'react'
export const metadata: Metadata = {
  title: 'Home Sample Collection & Online Doctor Consultation In Johor',
  description:
    'MobiLab2u offers home healthcare services in Johor with home blood sample collection, online doctor consultation, & medicine delivery at your doorstep.',
  keywords:
    'home blood test Johor, online doctor consultation Johor, medicine delivery Johor, home healthcare services',
  alternates: {
    canonical: 'https://www.mobilab2u.com/johor',
  },
  openGraph: {
    siteName: 'Mobilab2u',
    url: 'https://www.mobilab2u.com/johor',
    title: 'Home Sample Collection & Online Doctor Consultation In Johor',
    description:
      'MobiLab2u offers home healthcare services in Johor with home blood sample collection, online doctor consultation, & medicine delivery at your doorstep.',
    images: [
      {
        url: 'https://www.mobilab2u.com/assets/images/location/home-blood-collection-online-doctor-consultation-in-johor.webp',
        width: 480,
        height: 320,
        alt: 'Home blood collection & online doctor consultation services provided conveniently in Johor, Malaysia',
      },
    ],
    locale: 'en_MY',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Mobilab2u',
    title: 'Home Sample Collection & Online Doctor Consultation In Johor',
    description:
      'MobiLab2u offers home healthcare services in Johor with home blood sample collection, online doctor consultation, & medicine delivery at your doorstep.',
    images: [
      'https://www.mobilab2u.com/assets/images/location/home-blood-collection-online-doctor-consultation-in-johor.webp',
    ],
  },
}

export default function page() {
  return (
    <div>
      <JohorHealthcare />
    </div>
  )
}
