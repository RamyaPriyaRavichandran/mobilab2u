import fp from 'fastify-plugin'
import type { FastifyCorsOptions } from '@fastify/cors'
import cors from '@fastify/cors'
import { ALLOWED_ORIGINS, NODE_ENV } from './env'
import errorMessage from '../constants/error-messages'
import { API_METHODS } from '../constants'

/**
 * @fastify/cors enables the use of CORS in a Fastify application.
 *
 * @see https://github.com/fastify/fastify-cors
 */
export default fp<FastifyCorsOptions>(async (fastify, opts) => {
  const corsAllowedOrigins = ALLOWED_ORIGINS.split(',')
  await fastify.register(cors, {
    origin: (origin, callback) => {
      if (
        NODE_ENV !== 'production' ||
        corsAllowedOrigins.indexOf(origin as string) !== -1 ||
        !origin
      ) {
        callback(null, true)
      } else {
        callback(new Error(errorMessage.CORS_ERROR), false)
      }
    },
    credentials: true,
    methods: API_METHODS,
  })
})
