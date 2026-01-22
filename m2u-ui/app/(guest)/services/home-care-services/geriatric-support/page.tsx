import GeriatricCare from '@/components/HomePage/GeriatricCare'
import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '24/7 In-Home Geriatric & Elderly Care Support in Malaysia',
  description:
    'We provide 24/7 in-home geriatric & elderly care in Malaysia through trained caregivers for personalized support, like dementia care & routine checkups.',
  alternates: {
    canonical: 'https://www.mobilab2u.com/geriatric-elderly-home-care',
  },
  openGraph: {
    type: 'website',
    siteName: 'Mobilab2u',
    url: 'https://www.mobilab2u.com/geriatric-elderly-home-care',
    title: '24/7 In-Home Geriatric & Elderly Care Support in Malaysia',
    description:
      'We provide 24/7 in-home geriatric & elderly care in Malaysia through trained caregivers for personalized support, like dementia care & routine checkups.',
    locale: 'en_MY',
    images: [
      {
        url: 'https://www.mobilab2u.com/assets/images/services/elderly-care-home-trained-caretakers-malaysia.webp',
        alt: 'Receive personalized elderly care at home in Malaysia with trained caretakers for safety, & support',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Mobilab2u',
    title: '24/7 In-Home Geriatric & Elderly Care Support in Malaysia',
    description:
      'We provide 24/7 in-home geriatric & elderly care in Malaysia through trained caregivers for personalized support, like dementia care & routine checkups.',
    images: [
      {
        url: 'https://www.mobilab2u.com/assets/images/services/elderly-care-home-trained-caretakers-malaysia.webp',
        alt: 'Receive personalized elderly care at home in Malaysia with trained caretakers for safety, & support',
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
      <GeriatricCare />
    </div>
  )
}
