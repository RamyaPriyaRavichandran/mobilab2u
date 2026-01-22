import { FastifyReply, FastifyRequest } from 'fastify'
import mongoose, { Model, type Document } from 'mongoose'
import { Schema } from 'mongoose'
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
import * as fs from 'node:fs'
import * as path from 'node:path'
import type { Readable } from 'node:stream'
import { promisify } from 'node:util'
import otpGenerator from 'otp-generator'
import bcrypt from 'bcrypt'
import errorsMessage from '../constants/error-messages'

// Promisify fs functions
const mkdir = promisify(fs.mkdir)
const access = promisify(fs.access)

export function whenWillExpire(exp: string): number {
  return Number(exp) - Number(Date.now().toString().slice(0, 10))
}

export function addDataToModel(
  this: FastifyRequest,
  data: object,
  model: Model<Document<any>>,
) {
  return Object.entries(data).map(([key, value]) =>
    this.checkAndAssign(model, key, value),
  )
}

export function ObjectId(id: string) {
  if (!id) {
    return null
  }
  return new mongoose.mongo.ObjectId(id)
}

export function isObjectId(id: string) {
  return new Schema.Types.ObjectId(id)
}
export const checkAndAssign = <T>(
  model: T | Document,
  fieldName: string,
  fieldValue: string | number | Array<string | number>,
) => {
  if (fieldValue === '' || fieldValue) {
    setValue(model as Document, fieldName, fieldValue)
  }
}

const setValue = (
  obj: any,
  path: any,
  value: string | number | Array<string | number>,
) => {
  if (Object(obj) !== obj || !path) return

  if (!Array.isArray(path)) path = path.split('.') || []
  if (path.length === 1) return (obj[path[0]] = value)

  path
    .slice(0, -1)
    .reduce(
      (a: any, c: any, i: any) =>
        Object(a[c]) === a[c]
          ? a[c]
          : (a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] : {}),
      obj,
    )[path[path.length - 1]] = value

  return obj
}

// how to find object key alue pair in key

export const getStatusType = (statusCode: number) => {
  if (statusCode >= 200 && statusCode < 300) {
    return 'success'
  }
  if (statusCode === 400 || statusCode === 404) {
    return 'handled'
  }
  if (statusCode >= 401 && statusCode < 600) {
    return 'error'
  }
  return 'unknown'
}

/**
 * Writes a file stream to a specified folder.
 * @param {Readable} readStream - The file stream to be written.
 * @param {string} folderPath - The folder path where the file should be written.
 * @param {string} fileName - The name of the file to be written.
 * @returns {Promise<string>} - A promise that resolves to a success message.
 */
export async function writeFileStreamToFolder(
  readStream: Readable,
  folderPath: string,
  fileName: string,
): Promise<string> {
  try {
    // Ensure the folder exists
    await access(folderPath).catch(async () => {
      await mkdir(folderPath, { recursive: true })
    })

    // Define the full file path
    const filePath = path.join(folderPath, fileName)

    // Create a writable stream
    const writeStream = fs.createWriteStream(filePath)

    // Pipe the read stream into the write stream
    readStream.pipe(writeStream)

    return new Promise<string>((resolve, reject) => {
      writeStream.on('finish', () => {
        resolve(`File has been written successfully to ${filePath}`)
      })

      writeStream.on('error', (err) => {
        reject(err)
      })
    })
  } catch (err: any) {
    throw new Error(`Failed to write file: ${err.message}`)
  }
}

export function sliceDate(date?: Date | string) {
  if (!date) {
    return new Date().toISOString().slice(0, 10)
  }
  const newDate = new Date(date)
  return newDate.toISOString().slice(0, 10)
}

export function getDifferenceBetweenTwoDates(
  startDate: Date,
  type = 'PAST',
): number {
  const date1 = new Date(startDate)
  const date2 = new Date()
  let diffInMs
  if (type === 'PAST') {
    diffInMs = date2.getTime() - date1.getTime()
  } else {
    diffInMs = date1.getTime() - date2.getTime()
  }
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24)
  return diffInDays
}
export function getDaysDifferenceFromToday(
  targetDate: Date,
  env = 'local',
): number {
  const malaysiaTZ = 'Asia/Kuala_Lumpur'

  const today =
    env === 'local'
      ? new Date()
      : new Date(new Date().toLocaleString('en-US', { timeZone: malaysiaTZ }))

  const date1 = new Date(targetDate)
  const date2 = new Date(today)

  date1.setHours(0, 0, 0, 0)
  date2.setHours(0, 0, 0, 0)

  const diffInMs = date1.getTime() - date2.getTime()
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24)

  return diffInDays
}

export function dateAfter30Days(date: Date, env = 'local'): string {
  const malaysiaTZ = 'Asia/Kuala_Lumpur'

  // Base date depending on env
  const baseDate =
    env === 'local'
      ? new Date(date)
      : new Date(
          new Date(date).toLocaleString('en-US', { timeZone: malaysiaTZ }),
        )

  // Add 30 days
  baseDate.setDate(baseDate.getDate() + 30)

  // Return as YYYY-MM-DD
  return baseDate.toISOString().split('T')[0]
}
export function getMinutesDiffBetweenTwoDates(
  fromDate: Date,
  env = 'local',
): number {
  const malaysiaTZ = 'Asia/Kuala_Lumpur'

  const getDateInEnv = (date: Date): Date => {
    return env === 'local'
      ? new Date(date)
      : new Date(date.toLocaleString('en-US', { timeZone: malaysiaTZ }))
  }

  const now = getDateInEnv(new Date())
  const targetDate = getDateInEnv(new Date(fromDate))

  const diffMs = Math.abs(now.getTime() - targetDate.getTime())
  return Math.floor(diffMs / (1000 * 60))
}

export async function generateOTP() {
  const OTP = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  })
  const salt = await bcrypt.genSalt(10)
  const otpMain = await bcrypt.hash(OTP, salt)
  return { encryptedOTP: otpMain, OTP }
}

export async function compareOTP(bodyOTP: string, OTP: string) {
  const isValidOtp = await bcrypt.compare(bodyOTP, OTP)
  if (!isValidOtp) {
    throw new Error(errorsMessage.VERIFICATION_CODE_NOT_MATCH)
  }
}

export function getTimeDiffBetweenCurrentTimeAndAppTime(
  currentTime: string,
  env = 'local',
): { diffMins: number; hours: number } {
  const parseTime = () => {
    const [time, modifier] = currentTime.split(' ')
    let [hours, minutes] = time.split(':').map(Number)

    if (modifier === 'PM' && hours !== 12) hours += 12
    if (modifier === 'AM' && hours === 12) hours = 0

    return [hours, minutes]
  }
  if (env === 'local') {
    const [hours, minutes] = parseTime()
    const appointmentDate = new Date()
    appointmentDate.setHours(hours, minutes, 0, 0)
    const now = new Date()
    const diffMs = appointmentDate - now
    const diffMins = Math.round(diffMs / (1000 * 60))
    return { diffMins, hours }
  } else {
    // 1) Parse your local time today
    const nowLocal = new Date()
    const [hours, minutes] = parseTime()
    const myTimeToday = new Date(
      nowLocal.getFullYear(),
      nowLocal.getMonth(),
      nowLocal.getDate(),
      hours,
      minutes,
    )
    const malaysianNowStr = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kuala_Lumpur',
      hour12: false,
    })
    const [datePart, timePart] = malaysianNowStr.split(', ')
    const [mh, mm, ss] = timePart.split(':').map(Number)

    const malaysianNow = new Date()
    malaysianNow.setHours(mh, mm, ss, 0)

    const diffMs = myTimeToday - malaysianNow
    const diffMins = Math.floor(diffMs / (1000 * 60))

    return { diffMins, hours }
  }
}

export function getHours(env = 'local') {
  const malaysiaTZ = 'Asia/Kuala_Lumpur'
  let date
  if (env !== 'local') {
    date = new Date(
      new Date().toLocaleString('en-US', { timeZone: malaysiaTZ }),
    )
  } else {
    date = new Date()
  }
  let hours = date.getHours()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12 || 12
  return hours
}

export function combineDateAndTime(dateStr: string, timeStr: string): Date {
  // Parse date string (DD-MM-YYYY)
  const [day, month, year] = String(dateStr).split('-').map(Number)

  // Parse time string (hh:mm AM/PM)
  const [time, modifier] = timeStr.trim().split(' ')
  let [hours, minutes] = time.split(':').map(Number)

  if (modifier.toUpperCase() === 'PM' && hours !== 12) {
    hours += 12
  } else if (modifier.toUpperCase() === 'AM' && hours === 12) {
    hours = 0
  }
  minutes = minutes - 15
  if (minutes < 0) {
    hours = hours - 1
    minutes = 60 - minutes
  }

  // Construct final Date object
  return new Date(year, month - 1, day, hours, minutes, 0, 0)
}

export function getHoursDiffBetweenDates(
  apptDate: Date,
  env = 'local',
): number {
  const malaysiaTZ = 'Asia/Kuala_Lumpur'

  // Select current time depending on env
  const now =
    env === 'local'
      ? new Date()
      : new Date(new Date().toLocaleString('en-US', { timeZone: malaysiaTZ }))

  const date1 = new Date(apptDate)
  const date2 = new Date(now)

  // Absolute difference in ms
  const diffMs = Math.abs(date1.getTime() - date2.getTime())

  // Convert to hours
  const diffHours = diffMs / (1000 * 60 * 60)

  return diffHours
}

function malaysianTImeZone() {
  // Your local time string
  const myTimeStr = '7:00 AM'

  // 1) Parse your local time today
  const nowLocal = new Date()
  const [time, modifier] = myTimeStr.split(' ')
  let [hours, minutes] = time.split(':').map(Number)

  if (modifier === 'PM' && hours !== 12) hours += 12
  if (modifier === 'AM' && hours === 12) hours = 0

  const myTimeToday = new Date(
    nowLocal.getFullYear(),
    nowLocal.getMonth(),
    nowLocal.getDate(),
    hours,
    minutes,
  )

  // 2) Get current time in Malaysia
  const malaysianNowStr = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kuala_Lumpur',
    hour12: false,
  })
  const [datePart, timePart] = malaysianNowStr.split(', ')
  const [mh, mm, ss] = timePart.split(':').map(Number)

  const malaysianNow = new Date()
  malaysianNow.setHours(mh, mm, ss, 0)

  // 3) Calculate difference in minutes
  const diffMs = malaysianNow - myTimeToday
  const diffMinutes = Math.floor(diffMs / (1000 * 60))

  console.log(`Difference in minutes: ${diffMinutes}`)
  return diffMinutes
}

export const combineDateAndTimeMYT = (
  dateIso: string,
  time: string,
): string => {
  // Example inputs: dateIso = "2025-08-21T00:00:00.000Z", time = "6:00 PM"
  const dateObj = new Date(dateIso) // always UTC

  const [hours, minutesPart] = time.split(':')
  let hour = parseInt(hours, 10)
  let minute = 0
  let meridian = ''

  if (minutesPart) {
    const [m, mer] = minutesPart.trim().split(' ')
    minute = parseInt(m, 10)
    meridian = mer?.toUpperCase() || ''
  }

  // Convert to 24-hour format
  if (meridian === 'PM' && hour < 12) hour += 12
  if (meridian === 'AM' && hour === 12) hour = 0

  // Use the year, month, day from dateIso, and merge with time
  const y = dateObj.getUTCFullYear()
  const m = dateObj.getUTCMonth() // 0-based
  const d = dateObj.getUTCDate()

  // Build final date in Malaysia time (+08:00)
  const utcDate = new Date(Date.UTC(y, m, d, hour - 8, minute))

  return utcDate.toISOString().replace('Z', '+08:00')
}

export function getHourDiffFromNow(
  appointmentDate: string,
  startTime: string,
  env = 'local',
): number {
  // Choose timezone based on env
  const timeZone = env === 'local' ? 'Asia/Kolkata' : 'Asia/Kuala_Lumpur' // MYT vs IST

  // Parse base appointment date (YYYY-MM-DD only)
  const baseDate = new Date(appointmentDate)

  // Defensive split
  const timeParts = startTime.trim().split(' ')

  const [time, modifier] = timeParts
  let [hours, minutes] = time.split(':').map(Number)

  if (modifier.toUpperCase() === 'PM' && hours < 12) {
    hours += 12
  }
  if (modifier.toUpperCase() === 'AM' && hours === 12) {
    hours = 0
  }

  // Construct appointment Date with exact start time
  const appointmentDateTime = new Date(baseDate)
  appointmentDateTime.setHours(hours, minutes, 0, 0)

  // Get "now" in required timezone
  const nowStr = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date())

  // Convert formatted string → Date
  const [datePart, timePart] = nowStr.split(', ')
  const [day, month, year] = datePart.split('/').map(Number)
  const [hh, mm, ss] = timePart.split(':').map(Number)
  const now = new Date(year, month - 1, day, hh, mm, ss)

  // Diff in hours
  const diffMs = appointmentDateTime.getTime() - now.getTime()
  return diffMs / (1000 * 60 * 60)
}
//

function toMinutes(time: string) {
  const [t, modifier] = time.split(' ')
  let [hours, minutes] = t.split(':').map(Number)
  const correctHour = hours
  if (modifier === 'PM' && hours !== 12) hours += 12
  if (modifier === 'AM' && hours === 12) hours = 0
  return [hours * 60 + minutes, correctHour]
}

export function getTimeDiff(a: string, b: string) {
  const [aMinutes, aHour] = toMinutes(a)
  const [bMinutes, bHour] = toMinutes(b)

  let diff = Math.abs(aMinutes - bMinutes)

  const hours = Math.floor(diff / 60)
  const minutes = diff % 60

  return {
    hours,
    minutes,
    totalMinutes: diff,
    hourDiff: aHour - bHour,
  }
}

export function getCurrentTime(env: string = 'local') {
  const timeZone = env !== 'local' ? 'Asia/Kuala_Lumpur' : 'Asia/Kolkata'
  return new Date()
    .toLocaleTimeString('en-IN', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
    .toUpperCase()
}
