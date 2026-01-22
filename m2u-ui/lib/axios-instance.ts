import axios from 'axios'
import { isTokenExpired } from '@/utils'
import tokenStorage, { makeSessionRefresh } from './token-storage'
import BrowserDatabase from '@/utils/BrowserDatabase/BrowserDatabase'

//  axiosII = Axios Interceptor Instance
const axiosII = axios.create({
  baseURL: '',
})

// Request interceptor
axiosII.interceptors.request.use(
  async (req) => {
    let accessToken = tokenStorage.getToken()
    // Modify the request config here (add headers, authentication tokens)
    // If token is present, add it to request's Authorization Header

    const loggedIn = BrowserDatabase.getItem('logged-in')
    if (!loggedIn) {
      return req
    }

    if (!accessToken || isTokenExpired(accessToken)) {
      accessToken = await makeSessionRefresh(accessToken)
    }
    req.headers.Authorization = `Bearer ${accessToken}`
    return req
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error)
  }
)

// Response interceptor
axiosII.interceptors.response.use(
  (response) => {
    // Modify the response data here
    return response
  },
  (error) => {
    // Handle response errors here
    return Promise.reject(error)
  }
)

export default axiosII
