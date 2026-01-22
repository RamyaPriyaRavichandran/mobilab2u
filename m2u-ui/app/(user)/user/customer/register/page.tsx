import CRegister from '@/components/Authentication/CustomerRegister/CRegister'
import CustomerRegister from '@/components/HomePage/CustomerRegister/CustomerRegister'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MobiLab2u - Customer Register',
  description: 'MobiLab2u Services',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  icons: {
    icon: '/assets/images/mobilab2u-favicon.png',
  },
}

export default function page() {
  return <CustomerRegister />
}
