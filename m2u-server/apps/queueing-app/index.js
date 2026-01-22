import dotenv from 'dotenv'
import Queue from 'bull'
import { sendMail } from './sendEmail.js'
import { sendWhatsappMessage } from './sendWhatsappMessage.js'

dotenv.config()

const { REDIS_DB } = process.env

const remainderQueue = new Queue('remainder-queue', REDIS_DB)

remainderQueue.on('ready', () => {
  console.log('✅ Redis is connected and ready')
})

remainderQueue.on('error', (err) => {
  console.error('❌ Redis connection error:', err)
})

remainderQueue.on('stalled', (job) => {
  console.warn('⚠️ Job stalled:', job.id)
})

console.log('Redis is listening for new jobs')

remainderQueue.process(async (job, done) => {
  console.log('Processing job:', job.data)

  try {
    switch (job.data.queue) {
      case 'EMAIL':
        await sendMail(job.data)
        console.log('Email sent for job:', job.id)
        break
      case 'WHATSAPP':
        await sendWhatsappMessage(job.data)
        console.log('WhatsApp message sent for job:', job.id)
        break
      default:
        console.log('Unknown queue type:', job.data.queue)
        break
    }
    done()
  } catch (error) {
    console.error('Error processing job:', job.id, error)
    done(error)
  }
})
