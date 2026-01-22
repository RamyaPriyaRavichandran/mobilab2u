import About from '@/components/AboutUs'
import AboutNew from '@/components/HomePage/AboutNew'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Trusted Home Healthcare & Counseling Services in Malaysia',
  description:
    'MobiLab2u provides trusted home healthcare & counseling in Malaysia to deliver clinical precision & medical support from nurses to tests at your doorstep.',
  alternates: {
    canonical: 'https://www.mobilab2u.com/healthcare-counseling-services',
  },
  openGraph: {
    type: 'website',
    siteName: 'Mobilab2u',
    url: 'https://www.mobilab2u.com/healthcare-counseling-services',
    title: 'Trusted Home Healthcare & Counseling Services in Malaysia',
    description:
      'MobiLab2u provides trusted home healthcare & counseling in Malaysia to deliver clinical precision & medical support from nurses to tests at your doorstep.',
    images: [
      {
        url: 'https://www.mobilab2u.com/assets/images/about/home-medical-services-mobilab2u.webp',
        width: 461,
        height: 362,
        alt: 'Licensed healthcare professional providing at-home medical service in Malaysia through MobiLab2u app.',
      },
    ],
    locale: 'en_MY',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Mobilab2u',
    title: 'Trusted Home Healthcare & Counseling Services in Malaysia',
    description:
      'MobiLab2u provides trusted home healthcare & counseling in Malaysia to deliver clinical precision & medical support from nurses to tests at your doorstep.',
    images: ['https://www.mobilab2u.com/assets/images/about/home-medical-services-mobilab2u.webp'],
    creator: '@Mobilab2u',
  },
  viewport: { width: 'device-width', initialScale: 1 },
  icons: { icon: '/assets/images/mobilab2u-favicon.png' },
}

export default function page() {
  return (
    <div>
      <AboutNew />
    </div>
  )
}
