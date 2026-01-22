import fp from 'fastify-plugin'

export default fp(async (fastify) => {
  await fastify.register(import('fastify-raw-body'), {
    field: 'rawBody',
    global: false,
    runFirst: true,
    routes: ['/api/v1/payment/webhook'],
  })
})
