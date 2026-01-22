import BloodSampleCollectionNew from '@/components/HomePage/BloodSampleCollectionNew'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home Blood Test & Sample Collection Service in Malaysia',
  description:
    'We get at-home blood tests in Malaysia and provide quick lab sample collection, accurate results, & secure digital reports delivered to your doorstep.',
  alternates: {
    canonical: 'https://www.mobilab2u.com/home-blood-sample-collection',
  },
  openGraph: {
    type: 'website',
    siteName: 'Mobilab2u',
    url: 'https://www.mobilab2u.com/home-blood-sample-collection',
    title: 'Home Blood Test & Sample Collection Service in Malaysia',
    description:
      'We get at-home blood tests in Malaysia and provide quick lab sample collection, accurate results, & secure digital reports delivered to your doorstep.',
    images: [
      {
        url: 'https://www.mobilab2u.com/assets/images/services/book-at-home-blood-test-collection-services.webp',
        alt: 'Collect blood samples at home with professional testing services for accurate results in Malaysia.',
      },
    ],
    locale: 'en_MY',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Mobilab2u',
    title: 'Home Blood Test & Sample Collection Service in Malaysia',
    description:
      'We get at-home blood tests in Malaysia and provide quick lab sample collection, accurate results, & secure digital reports delivered to your doorstep.',
    images: ['https://www.mobilab2u.com/assets/images/services/book-at-home-blood-test-collection-services.webp'],
    creator: '@Mobilab2u',
  },
  viewport: { width: 'device-width', initialScale: 1 },
  icons: { icon: '/assets/images/mobilab2u-favicon.png' },
}

export default function page() {
  return <BloodSampleCollectionNew />
}
