'use server'

import axiosII from '@/lib/axios-instance'
import { TEST_ENDPOINT } from '@/lib/endpoints'

export async function getUsers() {
  try {
    const res = await axiosII.get(TEST_ENDPOINT)
    return {
      data: res.data,
    }
  } catch (error: any) {
    return {
      error: error.message,
    }
  }
}
