import pkg from 'twilio'
import dotenv from 'dotenv'

const { Twilio } = pkg
dotenv.config()
const {
  NODE_ENV,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_WHATSAPP_NUMBER,
} = process.env

export const sendWhatsappMessage = async (data) => {
  try {
    if (!data.to.toString()) {
      return 'Recipient phone number not found'
    }
    const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

    const formattedNumber = formatPhoneNumber(Math.floor(data.to).toString())
    if (!formattedNumber) {
      return 'Invalid phone number format'
    }
    const message = await client.messages.create({
      from: `whatsapp:${TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${formattedNumber}`,
      contentSid: data.template,
      contentVariables: data.variables,
    })
    console.log('message', message)
    return message
  } catch (error) {
    return error.message
  }
}

const formatPhoneNumber = (phoneNumber) => {
  const cleaned = phoneNumber.replace(/\D/g, '')

  const phoneNumberOptions = {
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
