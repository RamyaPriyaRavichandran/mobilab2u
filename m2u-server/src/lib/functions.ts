import { ObjectId } from 'mongoose'
import { Wallet } from '../types/wallet'
import { ROLES } from './permissions'
import { APPROVAL_STATUS, PACKAGE_TYPE } from '../constants'

function addMinutes(time: string, minutesToAdd: number) {
  const [hours, minutes] = time.split(':').map(Number)
  const date = new Date()
  date.setHours(hours, minutes)
  date.setMinutes(date.getMinutes() + minutesToAdd)
  return date.toTimeString().slice(0, 5)
}

interface TimeSlots {
  date: string
  startTime: string
  endTime: string
  doctor: string
}

export function splitTimeTo20Mins(
  timeSlots: Array<TimeSlots>,
  id: string,
): Array<TimeSlots | null> {
  const intervals: Array<TimeSlots> = []

  timeSlots.forEach((slot) => {
    let start = timeStringToDate(slot.startTime)
    const end = timeStringToDate(slot.endTime)
    while (start < end) {
      const nextTime = new Date(start.getTime() + 20 * 60 * 1000) // Add 15 minutes
      if (nextTime <= end) {
        intervals.push({
          doctor: id,
          date: slot.date,
          startTime: dateToTimeString(start),
          endTime: dateToTimeString(nextTime),
        })
      }
      start = nextTime
    }
  })

  return intervals
}

function timeStringToDate(timeStr: string): Date {
  const [time, period] = timeStr.split(' ')
  let [hours, minutes] = time.split(':').map(Number)

  if (period === 'PM' && hours !== 12) hours += 12
  if (period === 'AM' && hours === 12) hours = 0

  const date = new Date()
  date.setHours(hours, minutes, 0, 0)

  return date
}

// Helper function to convert Date object to time string (HH:MM AM/PM format)
function dateToTimeString(date: Date): string {
  let hours = date.getHours()
  const minutes = date.getMinutes()
  const period = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12 || 12
  return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`
}

export function generateSecureRandomString() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const randomValues = new Uint8Array(10)
  crypto.getRandomValues(randomValues)
  return Array.from(randomValues, (v) => chars[v % chars.length]).join('')
}

export function getUserWalletDetail(
  userId: string | ObjectId,
  userWallet: Wallet,
  share: number,
  roles: string,
) {
  return {
    $set: {
      userId: userId,
      userRole: roles,
      walletBalance: Number(userWallet?.walletBalance || 0) + share,
      totalEarnings: Number(userWallet?.totalEarnings || 0) + share,
      withDrawedAmount: Number(userWallet?.withDrawedAmount || 0),
    },
  }
}

export function getAdminWalletDetail(
  adminWallet: Wallet,
  mobilabShare: number,
) {
  return {
    $set: {
      userRole: ROLES.SUPER_ADMIN,
      walletBalance: Number(adminWallet?.walletBalance || 0) + mobilabShare,
      totalEarnings: Number(adminWallet?.totalEarnings || 0) + mobilabShare,
    },
  }
}

export function getWalletHistoryData(
  userId: string | null | ObjectId,
  userRole: string,
  shareAmount: number,
  walletBalance: number,
  type = PACKAGE_TYPE.TEST,
  orderId?: ObjectId,
) {
  return {
    userId,
    userRole,
    earningAmount: shareAmount,
    createdDate: new Date(),
    type,
    status: APPROVAL_STATUS.APPROVED,
    walletBalance: Number(walletBalance || 0) + shareAmount,
    orderId,
  }
}
