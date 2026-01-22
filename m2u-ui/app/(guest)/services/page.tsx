import ServicesNew from '@/components/HomePage/ServicesNew'
import Services from '@/components/Services'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '24/7 Home Healthcare & Caregiver Services in Malaysia',
  description:
    'MobiLab2u provides 24/7 home healthcare in Malaysia through blood tests, teleconsultations, prescription delivery, and personalized caregiver services.',
  viewport: { width: 'device-width', initialScale: 1 },
  icons: { icon: '/assets/images/mobilab2u-favicon.png' },
  alternates: { canonical: 'https://www.mobilab2u.com/home-healthcare-services' },
  openGraph: {
    type: 'website',
    url: 'https://www.mobilab2u.com/home-healthcare-services',
    title: '24/7 Home Healthcare & Caregiver Services in Malaysia',
    description:
      'MobiLab2u provides 24/7 home healthcare in Malaysia through blood tests, teleconsultations, prescription delivery, and personalized caregiver services.',
    siteName: 'Mobilab2u',
    images: [
      {
        url: 'https://www.mobilab2u.com/assets/images/mobilab2u/home-healthcare-partner.webp',
        alt: 'Licensed doctors, trained nurses, & healthcare professionals providing reliable home care in Malaysia',
      },
    ],
    locale: 'en_MY',
  },
  twitter: {
    card: 'summary_large_image',
    title: '24/7 Home Healthcare & Caregiver Services in Malaysia',
    description:
      'MobiLab2u provides 24/7 home healthcare in Malaysia through blood tests, teleconsultations, prescription delivery, and personalized caregiver services.',
    site: '@Mobilab2u',
    images: [
      {
        url: 'https://www.mobilab2u.com/assets/images/mobilab2u/home-healthcare-partner.webp',
        alt: 'Licensed doctors, trained nurses, & healthcare professionals providing reliable home care in Malaysia',
      },
    ],
  },
}

export default function page() {
  return <ServicesNew />
}
