export const getQueryFromData = (
  collection,
  lField,
  eField,
  pipeline,
  fField,
) => {
  return {
    $lookup: {
      from: collection,
      localField: lField,
      foreignField: fField || '_id',
      as: eField || lField,
      pipeline: pipeline || [],
    },
  }
}

export function formatDateQuery(dateField) {
  return {
    $dateToString: {
      format: '%Y-%m-%d',
      date: `$${dateField}`,
    },
  }
}

export function getMalaysiaNow() {
  //
  return new Date(
    new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kuala_Lumpur',
    }),
  )
}

export function convertTimeStringToMalaysiaDate(timeStr) {
  //
  const malaysiaNow = getMalaysiaNow()

  const [time, modifier] = timeStr.trim().split(' ')
  let [hours, minutes] = time.split(':').map(Number)

  if (modifier === 'PM' && hours !== 12) hours += 12
  if (modifier === 'AM' && hours === 12) hours = 0

  const date = malaysiaNow
  date.setHours(hours, minutes, 0, 0)

  return date
}
export function getMinutesDiff(futureDate, nowDate) {
  //
  return Math.round((futureDate - nowDate) / 60000)
}
export function getDate() {
  return new Date(
    new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kuala_Lumpur',
    }),
  )
    .toISOString()
    .slice(0, 10)
}

export function getCurrentHour(env = 'local') {
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
export function getMinsDiffBetweenTwoDates(startDate, endDate) {
  const diffMs = startDate - endDate
  const diffMins = Math.round(diffMs / 60000)
  return diffMins
}

export function convertTimeTODate(data, env = 'local') {
  const malaysiaTZ = 'Asia/Kuala_Lumpur'

  // Get current date based on env
  const baseDate =
    env === 'local'
      ? new Date()
      : new Date(new Date().toLocaleString('en-US', { timeZone: malaysiaTZ }))

  const [timeStr, modifier] = data.split(' ')
  let [hours, minutes] = timeStr.split(':').map(Number)

  if (modifier === 'PM' && hours !== 12) hours += 12
  if (modifier === 'AM' && hours === 12) hours = 0

  const date = new Date(baseDate)
  date.setHours(hours, minutes, 0, 0)

  return date
}

export function getTimeDiffBetweenCurrentTimeAndAppTime(
  currentTime,
  env = 'local',
) {
  const parseTime = () => {
    const [time, modifier] = currentTime.split(' ')
    let [hours, minutes] = time.split(':').map(Number)
    const timeHour = hours
    if (modifier === 'PM' && hours !== 12) hours += 12
    if (modifier === 'AM' && hours === 12) hours = 0

    return [hours, minutes, timeHour]
  }
  if (env === 'local') {
    const [hours, minutes, timeHour] = parseTime()
    const appointmentDate = new Date()
    appointmentDate.setHours(hours, minutes, 0, 0)
    const now = new Date()

    const diffMs = appointmentDate - now
    const diffMins = Math.round(diffMs / (1000 * 60))
    return { diffMins, hours, timeHour }
  } else {
    // 1) Parse your local time today
    const nowLocal = new Date()
    const [hours, minutes, timeHour] = parseTime()

    const myTimeToday = new Date(
      nowLocal.getFullYear(),
      nowLocal.getMonth(),
      nowLocal.getDate(),
      hours,
      minutes,
    )

    // 2) Get current time in Malaysia
    const malaysianNowStr = new Date().toLocaleString('en-GB', {
      timeZone: 'Asia/Kuala_Lumpur',
      hour12: false,
    })
    const [datePart, timePart] = malaysianNowStr.split(', ')
    const [mh, mm, ss] = timePart.split(':').map(Number)

    const malaysianNow = new Date()
    malaysianNow.setHours(mh, mm, ss, 0)

    // 3) Calculate difference in minutes
    const diffMs = myTimeToday - malaysianNow
    const diffMinutes = Math.floor(diffMs / (1000 * 60))

    return { diffMinutes, hours, timeHour }
  }
}

export function sliceDate(date) {
  return new Date(date).toISOString().slice(0, 10)
}

//

export function toMinutes(time) {
  const [t, modifier] = time.split(' ')
  let [hours, minutes] = t.split(':').map(Number)
  const correctHour = hours
  if (modifier === 'PM' && hours !== 12) hours += 12
  if (modifier === 'AM' && hours === 12) hours = 0
  return [hours * 60 + minutes, correctHour]
}

export function getTimeDiff(a, b) {
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

export function getCurrentTime(timeZone = 'Asia/Kuala_Lumpur') {
  return new Date()
    .toLocaleTimeString('en-IN', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
    .toUpperCase()
}
