import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './style.css'
import './splitting.css'
import './swiper-bundle.css'
import './aos.min.css'
import FacebookPixel from '@/components/Analytics/facebook-pixel'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mobilab2u',
  description: 'Mobilab2u platform',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <title>Mobilab2u</title>
        <link rel="icon" href="/svgs/logo-m2u.svg" className="w-12 h-12" />
      </head>

      <body className={inter.className}>
        {children}
        <FacebookPixel />
      </body>
    </html>
  )
}
