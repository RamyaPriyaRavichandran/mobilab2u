import TeleconsultationServices from '@/components/HomePage/TeleConsultationServices'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Online Doctor Consultation & Telemedicine Services in Malaysia',
  description:
    'Get an online doctor consultation in Malaysia via MobiLab2u, our licensed doctors provide video/phone visits, e-prescriptions & follow-up care from home.',
  metadataBase: new URL('https://www.mobilab2u.com'),
  alternates: {
    canonical: 'https://www.mobilab2u.com/telemedicine-online-doctor-consultation',
  },
  openGraph: {
    type: 'website',
    siteName: 'Mobilab2u',
    url: 'https://www.mobilab2u.com/telemedicine-online-doctor-consultation',
    title: 'Online Doctor Consultation & Telemedicine Services in Malaysia',
    description:
      'Get an online doctor consultation in Malaysia via MobiLab2u, our licensed doctors provide video/phone visits, e-prescriptions & follow-up care from home.',
    images: [
      {
        url: 'https://www.mobilab2u.com/assets/images/services/consult-doctor-online-anytime-anywhere-malaysia.webp',
        alt: 'Speak to licensed doctors online from home anytime, and anywhere in Malaysia for medical advice.',
        width: 592,
        height: 540,
      },
    ],
    locale: 'en_MY',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mobilab2u',
    title: 'Online Doctor Consultation & Telemedicine Services in Malaysia',
    description:
      'Get an online doctor consultation in Malaysia via MobiLab2u, our licensed doctors provide video/phone visits, e-prescriptions & follow-up care from home.',
    images: [
      {
        url: 'https://www.mobilab2u.com/assets/images/services/consult-doctor-online-anytime-anywhere-malaysia.webp',
        alt: 'Speak to licensed doctors online from home anytime, and anywhere in Malaysia for medical advice.',
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
  return <TeleconsultationServices />
}
