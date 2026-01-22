import KlangValleyHealthcare from '@/components/HomePage/States/KlangValley'
import { Metadata } from 'next'
import React from 'react'
export const metadata: Metadata = {
  title: 'Home Blood Test & Online Doctor Consultation in Klang Valley',
  description:
    'Mobilab2u provides 24/7 healthcare services in Klang Valley, offering online doctor consultations, home blood sample collection, and medicine delivery.',
  alternates: {
    canonical: 'https://www.mobilab2u.com/klang-valley',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.mobilab2u.com/klang-valley',
    title: 'Home Blood Test & Online Doctor Consultation in Klang Valley',
    description:
      'Mobilab2u provides 24/7 healthcare services in Klang Valley, offering online doctor consultations, home blood sample collection, and medicine delivery.',
    siteName: 'Mobilab2u',
    locale: 'en_MY',
    images: [
      {
        url: 'https://www.mobilab2u.com/assets/images/location/pharmacy-services-klang-valley.webp',
        width: 480,
        height: 320,
        alt: 'Home blood tests and at-home pharmacy services providing safe, and reliable care in Klang Valley',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Blood Test & Online Doctor Consultation in Klang Valley',
    description:
      'Mobilab2u provides 24/7 healthcare services in Klang Valley, offering online doctor consultations, home blood sample collection, and medicine delivery.',
    images: ['https://www.mobilab2u.com/assets/images/location/pharmacy-services-klang-valley.webp'],
    site: '@mobilab2u',
  },
  icons: {
    icon: '/assets/images/mobilab2u-favicon.png',
  },
}
export default function page() {
  return (
    <div>
      <KlangValleyHealthcare />
    </div>
  )
}
