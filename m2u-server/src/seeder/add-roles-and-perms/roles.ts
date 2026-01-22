import { ROLES } from '../../lib/permissions'

export const roles = [
  {
    roleId: ROLES.SUPER_ADMIN,
    roleName: ROLES.SUPER_ADMIN,
    roleLabel: 'Super Admin',
  },
  {
    roleId: ROLES.SERVICE_PROVIDER,
    roleName: ROLES.SERVICE_PROVIDER,
    roleLabel: 'Service Provider',
  },
  {
    roleId: ROLES.GP_PARTNER,
    roleName: ROLES.GP_PARTNER,
    roleLabel: 'G.P Partner',
  },
  {
    roleId: ROLES.LAB_USER,
    roleName: ROLES.LAB_USER,
    roleLabel: 'Lab User',
  },
]
