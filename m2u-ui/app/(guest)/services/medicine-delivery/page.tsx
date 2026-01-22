import MedicineDelivery from '@/components/HomePage/MedicineDelivery'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prescription Medicine Home Delivery in Malaysia',
  description:
    'Get quick and safe prescription home delivery in Malaysia through Mobilab2U from licensed pharmacists with secure handling & real-time order tracking.',
  metadataBase: new URL('https://www.mobilab2u.com'),
  alternates: {
    canonical: 'https://www.mobilab2u.com/prescription-medicine-home-delivery',
  },
  openGraph: {
    type: 'website',
    siteName: 'Mobilab2u',
    url: 'https://www.mobilab2u.com/prescription-medicine-home-delivery',
    title: 'Prescription Medicine Home Delivery in Malaysia',
    description:
      'Get quick and safe prescription home delivery in Malaysia through Mobilab2U from licensed pharmacists with secure handling & real-time order tracking.',
    images: [
      {
        url: 'https://www.mobilab2u.com/assets/images/services/quick-online-pharmacy-medicine-delivery-malaysia.webp',
        alt: 'Order medicines and access quick online pharmacy delivery in Malaysia for fast, safe, and healthcare',
        width: 592,
        height: 540,
      },
    ],
    locale: 'en_MY',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mobilab2u',
    title: 'Prescription Medicine Home Delivery in Malaysia',
    description:
      'Get quick and safe prescription home delivery in Malaysia through Mobilab2U from licensed pharmacists with secure handling & real-time order tracking.',
    images: [
      {
        url: 'https://www.mobilab2u.com/assets/images/services/quick-online-pharmacy-medicine-delivery-malaysia.webp',
        alt: 'Order medicines and access quick online pharmacy delivery in Malaysia for fast, safe, and healthcare',
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
      <MedicineDelivery />
    </div>
  )
}
