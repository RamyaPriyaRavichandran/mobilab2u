import Register from '@/components/Authentication/Register/RegisterMain'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MobiLab2u - Registration',
  description: 'MobiLab2u Services',
  robots: 'noindex,nofollow',
  metadataBase: new URL('https://www.mobilab2u.com'),
  icons: {
    icon: '/assets/images/mobilab2u-favicon.png',
  },
  other: {
    googlebot: 'noindex,nofollow',
    msnbot: 'noindex,nofollow',
    YahooSeeker: 'noindex,nofollow',
    'allow-search': 'no',
  },
}

export default function page() {
  return <Register />
}
