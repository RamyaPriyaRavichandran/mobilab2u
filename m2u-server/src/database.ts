import * as dotenv from 'dotenv'
import mongoose from 'mongoose' // options can be passed, e.g. {allErrors: true}
import { MONGO_CONNECTION_STRING } from './plugins/env'
import successMessage from './constants/success-messages'
import errorMessage from './constants/error-messages'
dotenv.config()

mongoose.connect(MONGO_CONNECTION_STRING as string)
mongoose.set('debug', false)

mongoose.connection.on('connected', () => {
  console.info(successMessage.MONGO_CONNECTION_SUCCESS)
})
mongoose.connection.on('error', () => {
  throw new Error(errorMessage.MONGO_CONNECTION_ERROR)
})

function close() {
  mongoose.disconnect()
}

export { close, mongoose }

export default mongoose
