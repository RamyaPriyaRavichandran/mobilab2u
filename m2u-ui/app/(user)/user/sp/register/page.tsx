import HSPPartner from '@/components/HomePage/HSPRegister/HSPPartnarRegister'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MobiLab2u',
  description: 'MobiLab2u Services',
  robots: 'noindex,nofollow',
  metadataBase: new URL('https://www.mobilab2u.com'),
  icons: {
    icon: '/assets/images/mobilab2u-favicon.png',
  },
  other: {
    YahooSeeker: 'noindex,nofollow',
    msnbot: 'noindex,nofollow',
    googlebot: 'noindex,nofollow',
    'allow-search': 'no',
  },
}

export default function page() {
  return <HSPPartner />
}
