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
