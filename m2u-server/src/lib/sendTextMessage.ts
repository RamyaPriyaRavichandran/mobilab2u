import {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER,
} from '../plugins/env'
import { Twilio } from 'twilio'
export const sendTextMessage = async (to: number, body: string) => {
  try {
    if (!to) {
      return 'Recipient phone number not found'
    }
    const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
    const formattedNumber = formatPhoneNumber(Math.floor(to).toString())
    if (!formattedNumber) {
      return 'Invalid phone number format'
    }
    const message = await client.messages.create({
      from: TWILIO_PHONE_NUMBER,
      to: `${formattedNumber}`,
      body,
    })
    return message
  } catch (error: any) {
    return error.message
  }
}

const formatPhoneNumber = (phoneNumber: string): string | null => {
  const cleaned = phoneNumber.replace(/\D/g, '')

  const phoneNumberOptions: Record<number, (num: string) => string> = {
    13: (num) => (num.startsWith('91') ? `+${num}` : num),
    12: (num) => `+${num}`,
    10: (num) => `+91${num}`,
    9: (num) => `+60${num}`,
  }

  const formatter = phoneNumberOptions[cleaned.length]
  if (!formatter) {
    console.error(
      `Unsupported phone number length: ${cleaned.length} for number: ${cleaned}`,
    )
    return null
  }

  return formatter(cleaned)
}
