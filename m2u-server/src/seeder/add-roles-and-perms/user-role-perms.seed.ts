import permissionModel from '../../models/permission.model'
import roleModel from '../../models/roles.model'
import { serviceProviderPerms } from './user-role-perms/service.provider.perms'
import { superAdminPerms } from './user-role-perms/super.admin.perms'
import { gpPartnerPerms } from './user-role-perms/g.p.partner.perms'
import { labPerms } from './user-role-perms/labs.perms'
import { roles } from './roles'
import { customerPerms } from './user-role-perms/customer.perms'

export const addRoles = () => {
  return roleModel
    .deleteMany()
    .then(() => {
      return roleModel.insertMany(roles)
    })
    .then(() => {
      console.log('===== 0001 Roles Inserted =====')
    })
}

export const addPerms = () => {
  return permissionModel
    .deleteMany()
    .then(() => {
      return permissionModel.insertMany([
        superAdminPerms,
        serviceProviderPerms,
        gpPartnerPerms,
        labPerms,
        customerPerms,
      ])
    })
    .then(() => {
      console.log('===== 0001 Permission Inserted =====')
    })
}
