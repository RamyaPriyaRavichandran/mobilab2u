import DoctorNurseHomeVisit from '@/components/HomePage/DoctorNurseHomeVisit'
import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a Doctor on Call & Home Visit Nurse in Malaysia',
  description:
    'Book doctor on call & nurse home visit services in Malaysia for professional medical support, personalized treatment & timely healthcare at your doorstep.',
  alternates: {
    canonical: 'https://www.mobilab2u.com/doctor-nurse-home-visit',
  },
  openGraph: {
    type: 'website',
    siteName: 'MobiLab2u',
    url: 'https://www.mobilab2u.com/doctor-nurse-home-visit',
    title: 'Book a Doctor on Call & Home Visit Nurse in Malaysia',
    description:
      'Book doctor on call & nurse home visit services in Malaysia for professional medical support, personalized treatment & timely healthcare at your doorstep.',
    locale: 'en_MY',
    images: [
      {
        url: 'https://www.mobilab2u.com/assets/images/services/home-visit-doctors-nurses.webp',
        alt: 'Access top doctors and nurses for professional home visits and personalized support in Malaysia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MobiLab2u',
    title: 'Book a Doctor on Call & Home Visit Nurse in Malaysia',
    description:
      'Book doctor on call & nurse home visit services in Malaysia for professional medical support, personalized treatment & timely healthcare at your doorstep.',
    images: [
      {
        url: 'https://www.mobilab2u.com/assets/images/services/home-visit-doctors-nurses.webp',
        alt: 'Access top doctors and nurses for professional home visits and personalized support in Malaysia',
      },
    ],
  },
  icons: {
    icon: '/assets/images/mobilab2u-favicon.png',
  },
}

export default function page() {
  return (
    <div>
      <DoctorNurseHomeVisit />
    </div>
  )
}
