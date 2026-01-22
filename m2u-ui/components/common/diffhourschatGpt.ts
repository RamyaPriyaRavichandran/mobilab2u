export function getHourDiffFromNow(
  appointmentDate: string,
  selectedTimeSlot?: { startTime?: string; endTime?: string },
  env = 'local'
): number | null {
  if (!appointmentDate || !selectedTimeSlot?.startTime) {
    console.warn('Missing appointmentDate or startTime')
    return null
  }

  // Choose timezone based on env
  const timeZone = env === 'local' ? 'Asia/Kolkata' : 'Asia/Kuala_Lumpur' // MYT vs IST

  // Parse base appointment date (YYYY-MM-DD only)
  const baseDate = new Date(appointmentDate)

  // Defensive split
  const timeParts = selectedTimeSlot.startTime.trim().split(' ')
  if (timeParts.length < 2) {
    console.warn('Invalid startTime format:', selectedTimeSlot.startTime)
    return null
  }

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
  const nowStr = new Intl.DateTimeFormat('en-GB', {
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
