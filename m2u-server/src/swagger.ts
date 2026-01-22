import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { FastifyInstance } from 'fastify'
import type { SwaggerDefinition } from 'swagger-jsdoc'
import swaggerJsdoc from 'swagger-jsdoc'

import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { NODE_ENV, PORT } from './plugins/env'

// Swagger definition
// https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Mobilab2u API collections',
    version: '0.0.1',
    description: 'All API collections',
  },
  components: {
    securitySchemes: {
      Authorization: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: {
    Authorization: [],
  },
  host: `0.0.0.0:${PORT ?? 3000}`,
}

const apiDirectory = join(__dirname, 'routes')

const options: swaggerJsdoc.Options = {
  swaggerDefinition,
  // Path to the API docs
  apis: [`${apiDirectory}/**/*.js`, `${apiDirectory}/**/*.ts`],
}

export async function initSwagger(app: FastifyInstance) {
  const swaggerSpec = swaggerJsdoc(options)

  // Write to generated swagger file on development
  if (NODE_ENV !== 'production') {
    writeFileSync(
      join(__dirname, 'generated', 'swagger.json'),
      JSON.stringify(swaggerSpec, null, 2),
    )
  }

  await app.register(fastifySwagger, {
    mode: 'static',
    specification: {
      path: join(__dirname, 'generated', 'swagger.json'),
      postProcessor(swaggerObject) {
        return swaggerObject
      },
      baseDir: join(__dirname, 'generated'),
    },
  })

  await app.register(fastifySwaggerUi, {
    routePrefix: '/api/documentation',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
    uiHooks: {
      onRequest(request, reply, next) {
        next()
      },
      preHandler(request, reply, next) {
        next()
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
  })
}
