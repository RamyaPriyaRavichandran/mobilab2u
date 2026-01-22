import type { FastifyInstance } from 'fastify'

// Adds form data values to body
export const useFormData = (fastify: FastifyInstance) => {
  fastify.addHook('preValidation', (req, reply, done) => {
    if (!req.isMultipart()) return done()
    const { data, ...rest } = req.body as Record<string, any>
    req.body = {
      ...JSON.parse(data?.value || '{}'),
      ...rest,
    }
    done()
  })
}

export const useAuth = (fastify: FastifyInstance) => {
  fastify.addHook('onRequest', fastify.authenticate)
}
