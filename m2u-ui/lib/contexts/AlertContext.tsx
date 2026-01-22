'use client'
import AlertModal from '@/components/common/AlertModal/AlertModal'
import React, { createContext, useState, useContext, ReactNode } from 'react'

interface AlertContextType {
  showAlert: (message: string, onConfirm?: (() => void) | null, redirect?: string) => void
}

const AlertContext = createContext<AlertContextType>({ showAlert: () => null })

export const useAlert = () => useContext(AlertContext)

interface Alert {
  popup: boolean
  redirect?: string
  message: string
  onConfirm?: (() => void) | null
}
export default function AlertProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<Alert>({
    popup: false,
    message: '',
    onConfirm: null,
  })
  const [redirect, setRedirect] = useState('')
  const showAlert = (message: string, onConfirm?: (() => void) | null, redirect = '') => {
    setAlert({ popup: true, message: message, onConfirm: onConfirm || null })
    setRedirect(redirect)
  }
  return (
    <AlertContext.Provider value={{ showAlert }}>
      <div className="min-h-screen absolute bg-opacity-50 z-50">
        {alert.popup && (
          <AlertModal
            redirect={redirect}
            open={alert.popup}
            onClose={() => {
              setAlert({ popup: false, message: '', onConfirm: null })
              setRedirect('')
            }}
            message={alert.message}
            onConfirm={alert.onConfirm}
          />
        )}
      </div>

      {children}
    </AlertContext.Provider>
  )
}
