import nodeMailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import { create } from 'express-handlebars'
import path from 'path'
import dotenv from 'dotenv'
import Queue from 'bull'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECRET_USER,
  SMTP_SECRET_PASSWORD,
  SMTP_SENDER,
  REDIS_DB,
} = process.env

const smtpTransport = nodeMailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  auth: {
    user: SMTP_SECRET_USER,
    pass: SMTP_SECRET_PASSWORD,
  },
})

// ✅ Use `create` for the view engine
const viewEngine = create({
  extname: '.hbs',
  defaultLayout: false,
  partialsDir: path.join(__dirname, 'templates'),
  layoutsDir: path.join(__dirname, 'templates'),
})

// ✅ Attach Handlebars to Nodemailer
smtpTransport.use(
  'compile',
  hbs({
    viewEngine,
    viewPath: path.join(__dirname, 'templates'),
    extName: '.hbs',
  }),
)

// ✅ Send Mail Function with Template
export async function sendMail(mailPayload) {
  const { to, subject, template, data } = mailPayload

  const mailOptions = {
    from: `Mobilab2u <${SMTP_SENDER}>`,
    to,
    subject,
    template,
    context: data, // ✅ Make sure 'data' is passed correctly
  }
  try {
    console.log('Sending email with template:', template)
    console.log('Data:', data)

    const sentMail = await smtpTransport.sendMail(mailOptions)
    console.log('Email sent successfully:', sentMail.response)
  } catch (error) {
    console.error('Send mail error:', error)
  }
}
