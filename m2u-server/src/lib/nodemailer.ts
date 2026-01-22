import nodeMailer from 'nodemailer'
import fs from 'fs'
import handlebars from 'handlebars'
import path from 'path'
import {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECRET_PASSWORD,
  SMTP_SECRET_USER,
  SMTP_SENDER,
} from '../plugins/env'

const smtpTransport = nodeMailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  auth: {
    user: SMTP_SECRET_USER,
    pass: SMTP_SECRET_PASSWORD,
  },
} as object)

const compileTemplate = (templateName: string, data: any) => {
  const templatesDir = path.resolve(__dirname, '../templates')
  const filePath = path.join(templatesDir, `${templateName}.hbs`)
  const source = fs.readFileSync(filePath, 'utf8')

  const compileOptions = {
    allowedProtoMethods: {
      trim: true,
    },
  } as any
  const template = handlebars.compile(source, compileOptions)
  return template(data)
}

export interface MailPayload {
  data: object
  to: string
  subject: string
  template: string
  attachments?: any
}

class ForbiddenError extends Error {
  status: number
  constructor(message: string) {
    super(message)
    this.name = 'ForbiddenError'
    this.status = 403
  }
}
async function sendMail(mailPayload: MailPayload) {
  const { data, to, subject, template, attachments } = mailPayload
  const html = compileTemplate(template, data)
  const mailOptions = {
    from: `Mobilab2u <${SMTP_SENDER}>`,
    to,
    subject,
    html,
    attachments,
  }
  try {
    const mail: any = await smtpTransport.sendMail(mailOptions)
    console.log('mail', mail)
  } catch (error: any) {
    throw new ForbiddenError(error)
  }
}
export { sendMail }
