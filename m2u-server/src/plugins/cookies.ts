import type { FastifyCookieOptions } from '@fastify/cookie'
import cookie from '@fastify/cookie'
import fp from 'fastify-plugin'
import { COOKIE_SECRET } from './env'

export default fp(async (fastify) => {
  await fastify.register(cookie, {
    secret: COOKIE_SECRET, // for cookies signature
    parseOptions: {}, // options for parsing cookies
  } as FastifyCookieOptions)
})
