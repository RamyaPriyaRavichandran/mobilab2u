'use client'
import { useEffect } from 'react'
import { useAuth } from '@/lib/contexts/AuthContext'

export default function Page() {
  const { logout } = useAuth()
  useEffect(() => {
    logout()
  }, [])
}
