import { close } from '../database'
import addRolesAndPerms from './add-roles-and-perms'
import addAdmin from './add-admin'
import { createPackage } from './add-package'
async function main(): Promise<void> {
  try {
    // To seed add methods here
    await addRolesAndPerms()
    await createPackage()
    await addAdmin()
  } catch (error) {
    console.error('Error during seeding:', error)
  } finally {
    console.log('Closing database connection...')
    try {
      await close()
      console.log('Database connection closed.')
    } catch (closeError) {
      console.error('Error closing the database connection:', closeError)
    }
    console.log('Exiting process...')
    process.exit()
  }
}

main()
