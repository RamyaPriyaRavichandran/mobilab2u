import HomePhysiotherapist from '@/components/HomePage/HomePhysiotherapist'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home Physiotherapist & Rehabilitation Services In Malaysia',
  description:
    'We offer professional home physiotherapy & rehabilitation services in Malaysia for post-surgery recovery, elderly care, sports injuries & restricted mobility.',
  alternates: { canonical: 'https://www.mobilab2u.com/home-physiotherapist-service' },
  openGraph: {
    type: 'website',
    siteName: 'MobiLab2u',
    url: 'https://www.mobilab2u.com/home-physiotherapist-service',
    title: 'Home Physiotherapist & Rehabilitation Services In Malaysia',
    description:
      'We offer professional home physiotherapy & rehabilitation services in Malaysia for post-surgery recovery, elderly care, sports injuries & restricted mobility.',
    images: [
      {
        url: 'https://www.mobilab2u.com/assets/images/services/home-based-physiotherapy-rehab-services.webp',
        alt: 'Receive an expert physiotherapy and rehabilitation services conveniently at your home in Malaysia.',
      },
    ],
    locale: 'en_MY',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Mobilab2u',
    title: 'Home Physiotherapist & Rehabilitation Services In Malaysia',
    description:
      'We offer professional home physiotherapy & rehabilitation services in Malaysia for post-surgery recovery, elderly care, sports injuries & restricted mobility.',
    images: ['https://www.mobilab2u.com/assets/images/services/home-based-physiotherapy-rehab-services.webp'],
    creator: '@Mobilab2u',
  },
  viewport: { width: 'device-width', initialScale: 1 },
  icons: { icon: '/assets/images/mobilab2u-favicon.png' },
}

export default function page() {
  return (
    <div>
      <HomePhysiotherapist />
    </div>
  )
}
