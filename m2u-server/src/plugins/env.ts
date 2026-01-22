import type { FastifyEnvOptions } from '@fastify/env'
import env from '@fastify/env'
import * as dotenv from 'dotenv'
import fp from 'fastify-plugin'
dotenv.config()
export interface ENVSchema {
  PORT: string
  REDIS_HOST: string
  REDIS_PORT: string
  SERVER_HOSTNAME: string
  MONGO_CONNECTION_STRING: string
  JWT_SECRET: string
  COOKIE_SECRET: string
  ACCESS_EXPIRE: string
  REFRESH_EXPIRE: string
  LOCAL_STORAGE_LOCATION: string
  UPLOAD_TO_S3: boolean
  AWS_ACCESS_KEY_ID: string
  AWS_SECRET_ACCESS_KEY: string
  S3_BUCKET_NAME: string
  AWS_REGION: string
  SMTP_SECRET_PASSWORD: string
  SMTP_PORT: string
  SMTP_SECRET_USER: string
  SMTP_HOST: string
  SMTP_SENDER: string
  STRIPE_PUBLISHABLE_KEY: string
  STRIPE_SECRET_KEY: string
  STRIPE_WEBHOOK_SECRET_KEY: string
  FRONTEND_URL: string
  ALLOWED_ORIGINS: string
  NODE_ENV: string
  ZOOM_ACCOUNT_ID: string
  ZOOM_CLIENT_ID: string
  ZOOM_CLIENT_SECRET: string
  ZOOM_SECRET_TOKEN: string
  ZOOM_VERIFICATION_TOKEN: string
  SENTRY_DSN: string
  REDIS_DB: string
  TWILIO_ACCOUNT_SID: string
  TWILIO_AUTH_TOKEN: string
  TWILIO_PHONE_NUMBER: string
  TWILIO_WHATSAPP_NUMBER: string
  ADMIN_INFO_EMAIL: string
  ADMIN_INFO_PHONE: string

  [k: string]: unknown
}

export const UPLOAD_TO_S3 = process.env.UPLOAD_TO_S3 === 'true'

export const {
  NODE_ENV,
  PORT,
  SERVER_HOSTNAME,
  MONGO_CONNECTION_STRING,
  JWT_SECRET,
  COOKIE_SECRET,
  ACCESS_EXPIRE,
  REFRESH_EXPIRE,
  LOCAL_STORAGE_LOCATION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  S3_BUCKET_NAME,
  AWS_REGION,
  SMTP_SECRET_PASSWORD,
  SMTP_PORT,
  SMTP_SECRET_USER,
  SMTP_SENDER,
  SMTP_HOST,
  STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET_KEY,
  FRONTEND_URL,
  ALLOWED_ORIGINS,
  SENTRY_DSN,
  ZOOM_ACCOUNT_ID,
  ZOOM_CLIENT_ID,
  ZOOM_CLIENT_SECRET,
  ZOOM_SECRET_TOKEN,
  ZOOM_VERIFICATION_TOKEN,
  REDIS_DB,
  REDIS_HOST,
  REDIS_PORT,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER,
  TWILIO_WHATSAPP_NUMBER,
  ADMIN_INFO_EMAIL,
  ADMIN_INFO_PHONE,
} = process.env as ENVSchema

const schema = {
  type: 'object',
  required: [
    'PORT',
    'SERVER_HOSTNAME',
    'MONGO_CONNECTION_STRING',
    'JWT_SECRET',
    'COOKIE_SECRET',
    'ACCESS_EXPIRE',
    'REFRESH_EXPIRE',
    'LOCAL_STORAGE_LOCATION',
    'UPLOAD_TO_S3',
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',
    'S3_BUCKET_NAME',
    'AWS_REGION',
    'SMTP_SECRET_PASSWORD',
    'SMTP_PORT',
    'SMTP_SECRET_USER',
    'SMTP_HOST',
    'SMTP_SENDER',
    'STRIPE_PUBLISHABLE_KEY',
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET_KEY',
    'FRONTEND_URL',
    'ALLOWED_ORIGINS',
    'NODE_ENV',
    'SENTRY_DSN',
    'ZOOM_ACCOUNT_ID',
    'ZOOM_CLIENT_ID',
    'ZOOM_CLIENT_SECRET',
    'ZOOM_SECRET_TOKEN',
    'ZOOM_VERIFICATION_TOKEN',
    'REDIS_DB',
    'REDIS_HOST',
    'REDIS_PORT',
    'TWILIO_ACCOUNT_SID',
    'TWILIO_AUTH_TOKEN',
    'TWILIO_PHONE_NUMBER',
    'TWILIO_WHATSAPP_NUMBER',
    'ADMIN_INFO_EMAIL',
    'ADMIN_INFO_PHONE',
  ],
  properties: {
    PORT: {
      type: 'string',
      default: 3000,
    },
    SERVER_HOSTNAME: {
      type: 'string',
    },
    ZOOM_ACCOUNT_ID: {
      type: 'string',
    },
    ZOOM_CLIENT_ID: {
      type: 'string',
    },
    ZOOM_CLIENT_SECRET: {
      type: 'string',
    },
    ZOOM_SECRET_TOKEN: {
      type: 'string',
    },
    ZOOM_VERIFICATION_TOKEN: {
      type: 'string',
    },
    MONGO_CONNECTION_STRING: {
      type: 'string',
    },
    JWT_SECRET: {
      type: 'string',
    },
    COOKIE_SECRET: {
      type: 'string',
    },
    ACCESS_EXPIRE: {
      type: 'string',
    },
    REFRESH_EXPIRE: {
      type: 'string',
    },
    LOCAL_STORAGE_LOCATION: {
      type: 'string',
    },
    UPLOAD_TO_S3: {
      type: 'string',
    },
    AWS_ACCESS_KEY_ID: {
      type: 'string',
    },
    AWS_SECRET_ACCESS_KEY: {
      type: 'string',
    },
    S3_BUCKET_NAME: {
      type: 'string',
    },
    AWS_REGION: {
      type: 'string',
    },
    SMTP_SECRET_PASSWORD: {
      type: 'string',
    },
    SMTP_PORT: {
      type: 'string',
    },
    SMTP_SECRET_USER: {
      type: 'string',
    },
    SMTP_HOST: {
      type: 'string',
    },
    SMTP_SENDER: {
      type: 'string',
    },
    STRIPE_PUBLISHABLE_KEY: {
      type: 'string',
    },
    STRIPE_SECRET_KEY: {
      type: 'string',
    },
    STRIPE_WEBHOOK_SECRET_KEY: {
      type: 'string',
    },
    FRONTEND_URL: {
      type: 'string',
    },
    ALLOWED_ORIGINS: {
      type: 'string',
    },
    NODE_ENV: {
      type: 'string',
    },
    SENTRY_DSN: {
      type: 'string',
    },
    REDIS_DB: {
      type: 'string',
    },
    REDIS_HOST: {
      type: 'string',
    },
    REDIS_PORT: {
      type: 'string',
    },
    TWILIO_ACCOUNT_SID: {
      type: 'string',
    },
    TWILIO_AUTH_TOKEN: {
      type: 'string',
    },
    TWILIO_PHONE_NUMBER: {
      type: 'string',
    },
    TWILIO_WHATSAPP_NUMBER: {
      type: 'string',
    },
    ADMIN_INFO_EMAIL: {
      type: 'string',
    },
    ADMIN_INFO_PHONE: {
      type: 'string',
    },
  },
}

const options = {
  confKey: 'config', // Optional, default: 'config'
  schema,
  dotenv: true, // Will read .env in root folder
}

/**
 * @fastify/env Fastify plugin to check environment variables.
 *
 * @see https://github.com/fastify/fastify-env
 */
export default fp<FastifyEnvOptions>(async (fastify) => {
  await fastify.register(env, options)
})
