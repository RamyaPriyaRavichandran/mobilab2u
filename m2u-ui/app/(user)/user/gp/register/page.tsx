import GPPartner from '@/components/HomePage/GPPartnarRegister/GPPartnarRegister'
import { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'MobiLab2u',
  description: 'MobiLab2u Services',
  robots: 'noindex, nofollow',
  icons: {
    icon: '/assets/images/mobilab2u-favicon.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'MobiLab2u',
    url: 'https://www.mobilab2u.com/',
    title: 'MobiLab2u',
    description: 'MobiLab2u Services',
    images: [
      {
        url: 'https://www.mobilab2u.com/assets/images/services/elderly-care-home-trained-caretakers-malaysia.webp',
        width: 592,
        height: 540,
        alt: 'Elderly Care At Home With Trained Caretakers In Malaysia',
      },
    ],
    locale: 'en_MY',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Mobilab2u',
    title: 'MobiLab2u',
    description: 'MobiLab2u Services',
    images: ['https://www.mobilab2u.com/assets/images/services/elderly-care-home-trained-caretakers-malaysia.webp'],
    creator: '@Mobilab2u',
  },
  alternates: {
    canonical: 'https://www.mobilab2u.com/',
  },
}

// ✅ Move viewport to separate export
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function Page() {
  return <GPPartner />
}
