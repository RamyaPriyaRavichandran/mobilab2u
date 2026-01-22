import { addPerms, addRoles } from './user-role-perms.seed'

export default async function main001(): Promise<void> {
  console.log('----- Running main0001 -----')
  await addPerms()
  await addRoles()
}
