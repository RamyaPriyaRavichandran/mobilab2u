import { AbilityBuilder, createMongoAbility } from '@casl/ability'
import type { FastifyRequest } from 'fastify'
import permModel from '../models/permission.model'
import type { PermissionObject, User } from '../types/user'
import { UserObject } from '../types/common'

async function getUserAbilities(user: User) {
  const { can, build } = new AbilityBuilder(createMongoAbility)
  const rolePerms: PermissionObject | null = await permModel.findOne({
    roleId: user.userRole,
  })
  if (!rolePerms) {
    return
  }
  for (const { actions, subject } of rolePerms?.perms) {
    for (const action of actions) {
      if (typeof action === 'string') {
        can(action, subject)
        continue
      }
      can(action.type, subject, action?.conditions as unknown as string[])
    }
  }

  return build()
}

// Here this is considered aa fake parameter by typescript
function checkAccess(this: FastifyRequest, action: string, subject: string) {
  return (
    this.user &&
    (this.user as unknown as UserObject).abilities.can(action, subject)
  )
}

class ForbiddenError extends Error {
  status: number
  constructor(message: string) {
    super(message)
    this.name = 'ForbiddenError'
    this.status = 403
  }
}

function requireAccess(this: FastifyRequest, action: string, subject: string) {
  const hasAccess = this.checkAccess(action, subject)
  if (!hasAccess) {
    throw new ForbiddenError('Permission denied')
  }
}

export { getUserAbilities, checkAccess, requireAccess }
