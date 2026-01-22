import { AxiosResponse } from 'axios'
import axiosII from './axios-instance'

export const mutater = <P, R>(
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  formData = false
): ((url: string, { arg }: { arg: P }) => Promise<AxiosResponse<R>>) => {
  switch (method) {
    case 'POST':
      return (url, { arg: values }) =>
        axiosII.post(url, values, {
          headers: {
            'Content-Type': formData ? 'multipart/form-data' : 'application/json',
          },
        })
    case 'PUT':
      return (url, { arg: values }) =>
        axiosII.put(url, values, {
          headers: {
            'Content-Type': formData ? 'multipart/form-data' : 'application/json',
          },
        })
    case 'PATCH':
      return (url, { arg: values }) =>
        axiosII.put(url, values, {
          headers: {
            'Content-Type': formData ? 'multipart/form-data' : 'application/json',
          },
        })
    case 'DELETE':
      return (url, { arg: values }) => {
        const deleteUrl = values ? `${url}/${values}` : url
        return axiosII.delete(deleteUrl)
      }

    default:
      throw new Error('Invalid method')
  }
}

export const fetcher =
  <R>(): ((url: string) => Promise<R>) =>
  (url) =>
    axiosII.get(url).then((res) => res.data)
