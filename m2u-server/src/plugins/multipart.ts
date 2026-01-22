import fp from 'fastify-plugin'

import type { FastifyMultipartOptions } from '@fastify/multipart'
import multipart from '@fastify/multipart'
import { useFormData } from '../lib/hooks'

/**
 * Multipart support for Fastify
 *
 * @link https://github.com/fastify/fastify-multipart
 */
export default fp<FastifyMultipartOptions>(async (fastify, opts, done) => {
  await fastify.register(async () => {
    multipart(
      fastify,
      {
        ...opts,
        attachFieldsToBody: true,
      },
      done,
    )
    useFormData(fastify)
  })
})
