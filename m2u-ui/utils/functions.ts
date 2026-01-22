export function findFromOptions(options: Array<any>, value: string | number) {
  if (!options || !value) {
    return null
  }
  return options.find((option: { value: string }) => option.value === value)?.label
}

interface Data {
  label: string
  value: string
}

export function ObjectToArray<T>(data: Object): Array<Data> {
  const Arr: Data[] = Object.entries(data).map(([key, value]) => {
    return {
      label: key,
      value: value,
    }
  })
  return Arr
}
export function getLatestStatus(status: Array<{ status: string }>) {
  if (!status || status.length === 0) {
    return 'NO_STATUS'
  }
  return status[status.length - 1]?.status ?? 'NO_STATUS'
}

export function sliceDate(date: string | undefined) {
  if (!date) {
    return '-'
  }
  return date?.slice(0, 10).split('-').reverse().join('-')
}

export function getAge(dobDate: any) {
  const dob = new Date(dobDate)
  const age = new Date().getFullYear() - dob.getFullYear()
  return new Date().setFullYear(1970) < dob.setFullYear(1970) ? age - 1 : age
}
interface DateInfo {
  day: string
  currentDate: string
}

// export const getNextWeekDates = (): DateInfo[] => {
//   const today = new Date()
//   const nextWeekStart = new Date(today)
//   return Array.from({ length: 7 }, (_, i) => {
//     const date = new Date(nextWeekStart)

//     date.setDate(nextWeekStart.getDate() + i)

//     return {
//       day: date.toLocaleDateString('en-US', { weekday: 'short' }),
//       currentDate: date.toISOString().slice(0, 10),
//     }
//   })
// }
export function getMinutesDiffBetweenTwoDates(fromDate: string, env = 'local'): number {
  const malaysiaTZ = 'Asia/Kuala_Lumpur'
  if (!fromDate) {
    return 60
  }

  const getDateInEnv = (date: Date): Date => {
    return env === 'local' ? new Date(date) : new Date(date.toLocaleString('en-US', { timeZone: malaysiaTZ }))
  }

  const now = getDateInEnv(new Date())
  const targetDate = getDateInEnv(new Date(fromDate))

  const diffMs = Math.abs(now.getTime() - targetDate.getTime())
  return Math.floor(diffMs / (1000 * 60))
}
export function getCurrentWeekDates(currentDate = new Date()) {
  const currentWeekDates = []

  const date = new Date(currentDate)

  const day = date.getDay()
  const diff = day === 0 ? -6 : 1 - day // If today is Sunday, go back 6 days
  date.setDate(date.getDate() + diff)

  for (let i = 0; i < 7; i++) {
    currentWeekDates.push({
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      currentDate: date.toISOString().slice(0, 10),
    })
    date.setDate(date.getDate() + 1)
  }

  return currentWeekDates
}

export function getNextWeekDates(currentDate = new Date()) {
  const nextWeekDates = []

  const date = new Date(currentDate)

  const day = date.getDay()
  const diff = day === 0 ? 1 : 8 - day
  date.setDate(date.getDate() + diff)

  for (let i = 0; i < 7; i++) {
    nextWeekDates.push({
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      currentDate: date.toISOString().slice(0, 10),
    })
    date.setDate(date.getDate() + 1)
  }

  return [...getCurrentWeekDates(), ...nextWeekDates]
}

export function getTimeDiffBetweenCurrentTimeAndAppTime(
  currentTime: string,
  env = 'local'
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
    const now = new Date() as any
    const diffMs = ((appointmentDate as any) - now) as any
    const diffMins = Math.round(diffMs / (1000 * 60))
    return { diffMins, hours }
  } else {
    // 1) Parse your local time today
    const nowLocal = new Date()
    const [hours, minutes] = parseTime()
    const myTimeToday = new Date(nowLocal.getFullYear(), nowLocal.getMonth(), nowLocal.getDate(), hours, minutes)
    // 2) Get current time in Malaysia
    const malaysianNowStr = new Date().toLocaleString('en-GB', {
      timeZone: 'Asia/Kuala_Lumpur',
      hour12: false,
    })
    const [datePart, timePart] = malaysianNowStr.split(', ')
    const [mh, mm, ss] = timePart.split(':').map(Number)

    const malaysianNow = new Date() as any
    malaysianNow.setHours(mh, mm, ss, 0)

    // 3) Calculate difference in minutes
    const diffMs = ((myTimeToday as any) - malaysianNow) as any
    const diffMins = Math.floor(diffMs / (1000 * 60))

    return { diffMins, hours }
  }
}

export function getHoursDiffBetweenDates(apptDate: string, env = 'local'): number {
  const malaysiaTZ = 'Asia/Kuala_Lumpur'

  // Select current time depending on env
  const now = env === 'local' ? new Date() : new Date(new Date().toLocaleString('en-US', { timeZone: malaysiaTZ }))

  const date1 =
    env === 'local'
      ? (new Date(apptDate) as any)
      : new Date(new Date(apptDate).toLocaleString('en-US', { timeZone: malaysiaTZ }))
  const date2 = new Date(now) as any
  // Absolute difference in ms
  const diffMs = Math.abs(date1 - date2)

  // Convert to hours
  const diffHours = diffMs / (1000 * 60 * 60)

  return diffHours
}
