import AuthProvider from '@/lib/contexts/AuthContext'
import Landing from '../components/Landing'
import AlertProvider from '@/lib/contexts/AlertContext'
import PopupProvider from '@/lib/contexts/PopupContext'
import LandingNew from '@/components/HomePage/LandingNew'
import HeaderNew from '@/components/HomePage/HeaderNew'
import FooterNew from '@/components/HomePage/FooterNew'
import MobiLab2uHomepage from '@/components/HomePage/LandingNew'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MobiLab2u - Home Nursing & Healthcare Services in Malaysia',
  description:
    'MobiLab2u offers home nursing & healthcare services in Malaysia with licensed doctors, home tests, online consultations, & personalized caregiver care.',
  alternates: { canonical: 'https://www.mobilab2u.com/' },
  openGraph: {
    type: 'website',
    siteName: 'Mobilab2u',
    url: 'https://www.mobilab2u.com',
    title: 'MobiLab2u - Home Nursing & Healthcare Services in Malaysia',
    description:
      'MobiLab2u offers home nursing & healthcare services in Malaysia with licensed doctors, home tests, online consultations, & personalized caregiver care.',
    images: [
      {
        url: 'https://www.mobilab2u.com/assets/images/services/best-digital-healthcare-platform.webp',
        alt: 'Best home healthcare platform offering lab tests, consultations, & medicine delivery in Malaysia.',
      },
    ],
    locale: 'en_MY',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Mobilab2u',
    title: 'MobiLab2u - Home Nursing & Healthcare Services in Malaysia',
    description:
      'MobiLab2u offers home nursing & healthcare services in Malaysia with licensed doctors, home tests, online consultations, & personalized caregiver care.',
    images: ['https://www.mobilab2u.com/assets/images/services/best-digital-healthcare-platform.webp'],
    creator: '@Mobilab2u',
  },
  icons: { icon: '/assets/images/mobilab2u-favicon.png' },
  viewport: { width: 'device-width', initialScale: 1 },
}

export default function LandingPage() {
  return (
    <>
      <PopupProvider>
        <AuthProvider>
          <AlertProvider>
            <HeaderNew />
            <MobiLab2uHomepage />
            <FooterNew />
          </AlertProvider>
        </AuthProvider>
      </PopupProvider>
    </>
  )
}
