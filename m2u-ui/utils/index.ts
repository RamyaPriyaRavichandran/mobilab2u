import { jwtDecode } from 'jwt-decode'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ReactNode } from 'react'
export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function isTokenExpired(token: string): boolean {
  const accessTokenDecoded: { exp: number } = jwtDecode(token)
  const expirationTime = accessTokenDecoded.exp
  const currentTime = Math.floor(Date.now() / 1000)
  return currentTime >= expirationTime
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export interface TableData {
  row: {
    index: number
    original: {
      _id: string
      customer: {
        name: string
        phone: string
        postCode: string
      }
      package: {
        name: string
        offerPrice: string
        type: string
      }
      approvedServiceProvider: {
        name: string
      }
      submittedLab: {
        name: string
      }
      payment: {
        paymentStatus?: string
      }
      spApprovedDate: string
      sampleCollectedDate: string
      sampleSubmittedDate: string
      reportSubmittedDate: string
      statusTransaction: []
      createdAt: string
      gender: string
      userRole: number
      passportNumber: string
      serviceType: string
      type: string
      primaryAddress: {
        city: string
        state: string
        postCode?: string
      }
      email: string
      phone: string
      nricNumber?: string
      dateOfBirth: string
      customerAppointmentDate: string
      document: {
        s3URL: string
      }
    }
  }
}
export interface AppointmentTableData {
  row: {
    index: number
    original: {
      _id: string
      appointmentType: string
      appointmentDate: string
      selectedTimeSlot: {
        startTime: string
        endTime: string
      }
      appointmentPrescription: {
        referral: {
          complaint: string
          findings: string
        }
        followupTest: {
          name: string
          description: string
        }
      }
      customer: {
        name: string
        phone: string
        postCode: string
      }
      package: {
        name: string
        offerPrice: string
        type: string
      }
      approvedServiceProvider: {
        name: string
      }
      submittedLab: {
        name: string
      }
      payment: {
        paymentStatus?: string
      }
      spApprovedDate: string
      sampleCollectedDate: string
      sampleSubmittedDate: string
      reportSubmittedDate: string
      status: string
      createdAt: string
      gender: string
      userRole: number
      serviceType: string
      type: string
      city: string
      state: string
      email: string
      phone: string
      nricNumber?: string
      dateOfBirth: string
      postCode?: string
      document: {
        s3URL: string
      }
    }
  }
}

type CellType = (props: TableData) => ReactNode

export interface TableColumnCustom {
  accessor: string
  Cell?: CellType
  Header: string
}
export const constructTableColumns = (columns: any, customCells: any) => {
  if (!customCells) return columns
  return columns.map((column: TableColumnCustom) => {
    const customCell = customCells[column.accessor]
    if (!!customCell) {
      column.Cell = customCell
      return column
    }
    return column
  })
}

export const constructCustomerColumns = (columns: TableColumnCustom[]) => {
  return columns.map((column: TableColumnCustom) => {
    return column
  })
}

export function findFromOptions(options: Array<any>, value: string) {
  if (!options || !value) {
    return null
  }
  return options.find((option: { value: string }) => option.value === value)?.label
}
