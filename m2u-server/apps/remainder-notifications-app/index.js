import { ensureConnection } from './database.js'
import cron from 'node-cron'
import {
  appointmentNotifications,
  testNotifications,
} from './notification.functions.js'
import { getTimeDiffBetweenCurrentTimeAndAppTime } from './functions.js'

await ensureConnection()

cron.schedule(
  '*/20 6-22 * * *',
  async () => {
    console.log('Running appointment notifications cron job...')
    await appointmentNotifications()
    await testNotifications()
  },
  {
    timezone: 'Asia/Kuala_Lumpur',
  },
)
