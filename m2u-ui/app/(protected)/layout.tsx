import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import PopupProvider from '@/lib/contexts/PopupContext'
import AuthProvider from '@/lib/contexts/AuthContext'
import AbilityProvider from '@/lib/contexts/AbilityContext'
import ProtectedLayout from '@/components/common/ProtectedLayout'
import AlertProvider from '@/lib/contexts/AlertContext'
import CanCheck from '@/components/common/CanCheck'
import { ACTIONS, SUBJECTS } from '@/utils/constents/permission'

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
    <PopupProvider>
      <AuthProvider>
        <AlertProvider>
          <AbilityProvider>
            <CanCheck I={ACTIONS.VIEW} a={SUBJECTS.User}>
              <ProtectedLayout>{children}</ProtectedLayout>
            </CanCheck>
          </AbilityProvider>
        </AlertProvider>
      </AuthProvider>
    </PopupProvider>
  )
}
