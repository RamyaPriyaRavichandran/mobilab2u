import type { Metadata } from 'next'
import PopupProvider from '@/lib/contexts/PopupContext'
import AuthProvider from '@/lib/contexts/AuthContext'
import Footer from '@/components/common/Footer'
import PageGradiant from '@/components/common/PageGradiant'
import LandingHeader from '@/components/Landing/LandingHeader'
import AlertProvider from '@/lib/contexts/AlertContext'
import HeaderNew from '@/components/HomePage/HeaderNew'
import FooterNew from '@/components/HomePage/FooterNew'
import { Inter } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Mobilab2u',
  description: 'Mobilab2u platform',
}
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // optional: choose weights you use
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={inter.className}>
      <PopupProvider>
        <AuthProvider>
          <AlertProvider>{children}</AlertProvider>
        </AuthProvider>
      </PopupProvider>
    </div>
  )
}
