'use client'
import React, { useContext, createContext, useState } from 'react'
import { PopupBounce } from '@/components/Animation'
import { ErrorMessage, SuccessMessage, WarningMessage } from '@/components/common/AlertModal'

interface SetupFormProps {
  children: JSX.Element | JSX.Element[]
}

interface PopupContextType {
  showSuccess: (message?: string, time?: number) => void
  showError: (message?: string, time?: number) => void
  showWarning: (message?: string, time?: number) => void
  setUserData: React.Dispatch<React.SetStateAction<Record<string, any>>>
  userData: Record<string, any>
}

const PopupContext = createContext<PopupContextType>({} as PopupContextType)
const usePopup = () => useContext(PopupContext)

export default function PopupProvider({ children }: SetupFormProps) {
  const [successAlert, setSuccessAlert] = useState<string | null>(null)
  const [errorAlert, setErrorAlert] = useState<string | null>(null)
  const [warningAlert, setWarningAlert] = useState<string | null>(null)
  const [userData, setUserData] = useState<Record<string, any>>({})

  // Call methods
  const showSuccess = (message: string = '', time: number = 5000) => {
    setTimeout(() => {
      setSuccessAlert(null)
    }, time)
    setErrorAlert(null)
    setSuccessAlert(message)
    setWarningAlert(null)
  }

  const showError = (message: string = '', time: number = 5000) => {
    setTimeout(() => {
      setErrorAlert(null)
    }, time)
    setSuccessAlert(null)
    setErrorAlert(message)
    setWarningAlert(null)
  }

  const showWarning = (message: string = '', time: number = 5000) => {
    setTimeout(() => {
      setWarningAlert(null)
    }, time)
    setSuccessAlert(null)
    setErrorAlert(null)
    setWarningAlert(message)
  }

  return (
    <PopupContext.Provider
      value={{
        showSuccess,
        setUserData,
        userData,
        showError,
        showWarning,
      }}
    >
      {successAlert ? (
        <PopupBounce>
          <SuccessMessage successAlert={successAlert} />
        </PopupBounce>
      ) : errorAlert ? (
        <PopupBounce>
          <ErrorMessage errorAlert={errorAlert} />
        </PopupBounce>
      ) : warningAlert ? (
        <PopupBounce>
          <WarningMessage warningAlert={warningAlert} />
        </PopupBounce>
      ) : null}
      {children}
    </PopupContext.Provider>
  )
}

export { PopupContext, usePopup, PopupProvider }
