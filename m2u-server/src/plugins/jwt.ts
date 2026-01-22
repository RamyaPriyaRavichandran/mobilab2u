import jwt from '@fastify/jwt'
import type { FastifyReply, FastifyRequest } from 'fastify'
import fp from 'fastify-plugin'
import { JWT_SECRET } from './env'
import errorMessage from '../constants/error-messages'
import { HSP_STATUS, models } from '../constants'
import { ROLES } from '../lib/permissions'

export default fp(async (fastify) => {
  await fastify.register(jwt, {
    secret: JWT_SECRET,
  })
  fastify.decorateRequest('jwt', fastify.jwt)
  fastify.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify()
        const decoded: any = await request.jwtDecode()
        const CurrentUserModel = models[decoded.userRole]
        const user = await CurrentUserModel.findOne({
          email: (decoded as any).email,
          userRole: decoded.userRole,
        })
        if (!user) {
          return reply.badRequest(errorMessage.USER_NOT_FOUND)
        }
        const activationRequiredUser =
          user.userRole === ROLES.SERVICE_PROVIDER ||
          user.userRole === ROLES.GP_PARTNER
        if (activationRequiredUser) {
          if (user.activeStatus === HSP_STATUS.DE_ACTIVE) {
            return reply.badRequest(errorMessage.HSP_DE_ACTIVE)
          }
        }
        const userAbilities = await request.getUserAbilities(user)
        request.user = {
          ...user,
          ...user._doc,
          abilities: userAbilities,
        }
      } catch (err) {
        return reply.forbidden(errorMessage.ACCESS_DENIED)
      }
    },
  )
})
