import path from 'node:path'
import AltairFastify from 'altair-fastify-plugin'
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import mercurius from 'mercurius'
import mercuriusCodegen from 'mercurius-codegen'
import { makeSchema } from 'nexus'
import queries from './queries'

const buildContext = async (req: FastifyRequest, _reply: FastifyReply) => ({
  authorization: req.headers.authorization,
})

const schema = makeSchema({
  types: [queries],
  outputs: {
    schema: path.join(__dirname, '..', '/generated/schema.graphql'),
    typegen: path.join(__dirname, '..', '/generated/typings.ts'),
  },
})

export async function initGraphql(app: FastifyInstance) {
  try {
    await app.register(mercurius, {
      schema,
      graphiql: false,
      ide: false,
      path: '/graphql',
      allowBatchedQueries: true,
      context: buildContext,
    })

    await app.register(AltairFastify, {
      path: '/altair',
      baseURL: '/altair/',
      // 'endpointURL' should be the same as the mercurius 'path'
      endpointURL: '/graphql',
    })

    await mercuriusCodegen(app, {
      // Commonly relative to your root package.json
      targetPath: path.join(__dirname, '..', '/generated/graphql.ts'),
    })
  } catch (err: unknown) {
    app.log.error(err)
  }
}
