import fp from 'fastify-plugin'
import sentry from '@immobiliarelabs/fastify-sentry'
import { NODE_ENV, SENTRY_DSN } from './env'

export default fp(async (fastify) => {
  await fastify.register(sentry, {
    dsn: SENTRY_DSN,
    environment: NODE_ENV,
    beforeSend: (event) => {
      if (NODE_ENV === 'local') {
        return null
      }
      return event
    },
    release: '1.0.0',
  })
})
