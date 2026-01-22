import KualaLumpurHealthcare from '@/components/HomePage/States/KualaLumpur'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Blood Tests & Medicine Home Delivery in Kuala Lumpur',
  description:
    'MobiLab2u provides home healthcare in Kuala Lumpur, offering doctors on call, home blood tests, online consultations, and medicine delivery at doorstep.',
  metadataBase: new URL('https://www.mobilab2u.com'),
  alternates: {
    canonical: 'https://www.mobilab2u.com/kuala-lumpur',
  },
  openGraph: {
    type: 'website',
    siteName: 'Mobilab2u',
    url: 'https://www.mobilab2u.com/kuala-lumpur.php',
    title: 'Blood Tests & Medicine Home Delivery in Kuala Lumpur',
    description:
      'MobiLab2u provides home healthcare in Kuala Lumpur, offering doctors on call, home blood tests, online consultations, and medicine delivery at doorstep.',
    images: [
      {
        url: 'https://www.mobilab2u.com/assets/images/location/home-blood-tests-home-pharmacy-kuala-lumpur.webp',
        alt: 'Home blood tests and at-home pharmacy services providing safe, and reliable care in Kuala Lumpur',
        width: 480,
        height: 288,
      },
    ],
    locale: 'en_MY',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mobilab2u',
    title: 'Blood Tests & Medicine Home Delivery in Kuala Lumpur',
    description:
      'MobiLab2u provides home healthcare in Kuala Lumpur, offering doctors on call, home blood tests, online consultations, and medicine delivery at doorstep.',
    images: [
      {
        url: 'https://www.mobilab2u.com/assets/images/location/home-blood-tests-home-pharmacy-kuala-lumpur.webp',
        alt: 'Home blood tests and at-home pharmacy services providing safe, and reliable care in Kuala Lumpur',
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
      <KualaLumpurHealthcare />
    </div>
  )
}
