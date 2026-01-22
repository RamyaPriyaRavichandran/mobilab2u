'use client'
import { createContext, type ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'
import { usePopup } from './PopupContext'
import BrowserDatabase from '@/utils/BrowserDatabase/BrowserDatabase'
import axiosII from '../axios-instance'
import { HEALTH_CHECK, LOGIN, LOGOUT } from '../endpoints'
import { LOGIN_ROUTES, PURCHASEABLE_PACKAGES, SP_LOGIN } from '@/utils/constents/routes'
import tokenStorage from '../token-storage'
import PageLoaderSVG from '@/components/common/PageLoaderSVG'
import axios from 'axios'

interface AuthContextProps {
  children: ReactNode
}
export interface UserValuesInterface {
  _id: string
  userName: string
  email: string
  userRole: string
  iat: number
  exp: number
  image: string
}

const AuthContext = createContext<any>({})

export const useAuth = () => useContext(AuthContext)

function AuthProvider({ children }: AuthContextProps) {
  const Router = useRouter()
  const [accessToken, setAccessToken] = useState<string | null>(tokenStorage.getToken())
  const [initialLoading, setInitialLoading] = useState(false)
  const [user, setUser] = useState<UserValuesInterface | null>(null)
  const [justLoggedIn, setJustLoggedIn] = useState(false)
  const { showSuccess, showError } = usePopup()
  // Use ref to prevent multiple simultaneous logout calls
  const isLoggingOut = useRef(false)
  const isInitializing = useRef(false)

  const login = async (loginDetails: { loginRedirect: boolean }) => {
    try {
      const response = await axiosII.post(LOGIN, loginDetails)
      const accessTokenR = response.data.accessToken
      const userDetails: UserValuesInterface = jwtDecode(accessTokenR)
      showSuccess(response?.data?.message)
      setUser(userDetails)
      tokenStorage.setToken(accessTokenR)
      BrowserDatabase.setItem(true, 'logged-in')
      setAccessToken(accessTokenR)
      setJustLoggedIn(true)
      console.log('response.data', response.data)
      if (loginDetails.loginRedirect) {
        return Router.push(PURCHASEABLE_PACKAGES)
      } else if (response.data.spRegistrationFee === 'PAID') {
        return Router.push('/dashboard/spdashboard')
      } else return Router.push(LOGIN_ROUTES[userDetails.userRole])
    } catch (error: any) {
      showError(error?.response?.data?.message)
    }
  }

  const logout = async () => {
    // Prevent multiple simultaneous logout calls
    if (isLoggingOut.current) {
      return
    }
    isLoggingOut.current = true
    try {
      // Clear local state immediately
      BrowserDatabase.setItem(false, 'logged-in')
      tokenStorage.clearToken()
      setAccessToken(null)
      setUser(null)
      const response = await axios.get(LOGOUT)
      showSuccess(response.data.message)
      Router.push(SP_LOGIN)
    } catch (error: any) {
      showError(error.message)
    } finally {
      isLoggingOut.current = false
    }
  }

  const setInitialState = async () => {
    // Prevent multiple simultaneous initialization
    if (isInitializing.current) {
      return
    }

    isInitializing.current = true
    setInitialLoading(true)

    try {
      // Check if user is logged in first
      const loggedIn = BrowserDatabase.getItem('logged-in')
      if (!loggedIn) {
        setInitialLoading(false)
        isInitializing.current = false
        return
      }

      // This will refresh the access token on load
      await axiosII.get(HEALTH_CHECK)
      const accessTokenB = tokenStorage.getToken()

      if (accessTokenB) {
        try {
          setUser(jwtDecode(accessTokenB))
          setAccessToken(accessTokenB)
        } catch (decodeError) {
          // If token is invalid, clear everything
          tokenStorage.clearToken()
          BrowserDatabase.setItem(false, 'logged-in')
          setAccessToken(null)
          setUser(null)
        }
      } else {
        setAccessToken(null)
        setUser(null)
      }
    } catch (error) {
      // If health check fails, clear everything
      tokenStorage.clearToken()
      BrowserDatabase.setItem(false, 'logged-in')
      setAccessToken(null)
      setUser(null)
    } finally {
      setInitialLoading(false)
      isInitializing.current = false
    }
  }

  useEffect(() => {
    setInitialState()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        justLoggedIn,
        setJustLoggedIn,
        initialLoading,
        user,
        setUser,
        accessToken,
        setAccessToken,
        login,
        logout,
        roles: user ? user?.userRole : '',
        loggedIn: !!accessToken,
      }}
    >
      {initialLoading ? <PageLoaderSVG /> : children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
