import axios from 'axios'
import { useAuth } from './contexts/AuthContext'
import { isTokenExpired } from '@/utils'
import { jwtDecode } from 'jwt-decode'
import BrowserDatabase from '@/utils/BrowserDatabase/BrowserDatabase'
import { REFRESH } from './endpoints'

const useHttpClient = () => {
  const { accessToken, logout, setAccessToken, setUser } = useAuth()

  const axiosInstance = axios.create({
    baseURL: '/',
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  const makeSessionRefresh = async () => {
    try {
      const response = await axios.get(REFRESH)
      const newAccessToken = response.data.accessToken
      if (!newAccessToken) {
        logout()
      }
      BrowserDatabase.setItem(newAccessToken, 'accessToken')
      setAccessToken(newAccessToken)
      setUser(jwtDecode(newAccessToken))
      return newAccessToken
    } catch (error) {
      logout()
    }
  }
  axiosInstance.interceptors.request.use(async (req: any) => {
    if (!accessToken) {
      return req
    }
    let token = accessToken
    if (isTokenExpired(accessToken)) {
      const newAccessToken = await makeSessionRefresh()
      token = newAccessToken
    }
    req.headers.Authorization = `Bearer ${token}`
    return req
  })

  axiosInstance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  return axiosInstance
}

export default useHttpClient
