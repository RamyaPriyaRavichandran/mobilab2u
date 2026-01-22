import ChronicWoundCare from '@/components/HomePage/ChronicWoundCare'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Chronic Wound Care Treatment at Home in Malaysia',
  description:
    'Mobilab2u offers professional chronic wound care at home in Malaysia for disease management & daily dressing for elderly, diabetic & bedridden patients.',
  alternates: {
    canonical: 'https://www.mobilab2u.com/home-chronic-wound-care',
  },
  openGraph: {
    type: 'website',
    siteName: 'Mobilab2u',
    url: 'https://www.mobilab2u.com/home-chronic-wound-care',
    title: 'Best Chronic Wound Care Treatment at Home in Malaysia',
    description:
      'Mobilab2u offers professional chronic wound care at home in Malaysia for disease management & daily dressing for elderly, diabetic & bedridden patients.',
    images: [
      {
        url: 'https://www.mobilab2u.com/assets/images/services/trusted-chronic-wound-care-treatment-home-malaysia.webp',
        alt: 'Receive trusted chronic wound care treatment at home in Malaysia with medical support and healing',
      },
    ],
    locale: 'en_MY',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Mobilab2u',
    title: 'Best Chronic Wound Care Treatment at Home in Malaysia',
    description:
      'Mobilab2u offers professional chronic wound care at home in Malaysia for disease management & daily dressing for elderly, diabetic & bedridden patients.',
    images: [
      'https://www.mobilab2u.com/assets/images/services/trusted-chronic-wound-care-treatment-home-malaysia.webp',
    ],
    creator: '@Mobilab2u',
  },
  viewport: { width: 'device-width', initialScale: 1 },
  icons: { icon: '/assets/images/mobilab2u-favicon.png' },
}

export default function page() {
  return (
    <div>
      <ChronicWoundCare />
    </div>
  )
}
