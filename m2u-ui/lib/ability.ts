import { createMongoAbility, AbilityBuilder } from '@casl/ability'

export default function getUserAbilities(userRolePerms: any) {
  const { can, build } = new AbilityBuilder(createMongoAbility)
  for (const userRole of userRolePerms) {
    for (const { actions, subject } of userRole.perms || []) {
      for (const action of actions) {
        if (typeof action === 'string') {
          can(action, subject)
          continue
        }
        can(action.type, subject, action?.conditions)
      }
    }
  }
  return build()
}
