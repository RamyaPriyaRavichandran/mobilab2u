import { close } from '../../database'
import createFakeUser from './data'

async function fake(): Promise<void> {
  try {
    // To seed add methods here
    await createFakeUser()
  } catch (error) {
    console.error('Error during fake data seeding:', error)
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

fake()
