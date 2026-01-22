import fp from 'fastify-plugin'
import { createPDF } from '../lib/createPdf'
import { checkAccess, getUserAbilities, requireAccess } from '../lib/perm'
import { ObjectId, addDataToModel, checkAndAssign } from '../utils'
import { sendMail } from '../lib/nodemailer'
import { sendWhatsappMessage } from '../lib/sendWhatsappMessage'
import { sendTextMessage } from '../lib/sendTextMessage'
import { deleteFileFromS3Bucket } from '../lib/deleteFileFromS3Bucket'

export default fp((fastify, opts, done) => {
  fastify.decorate('getUserAbilities', getUserAbilities)
  fastify.decorateRequest('getUserAbilities', getUserAbilities)
  fastify.decorateRequest('checkAccess', checkAccess)
  fastify.decorateRequest('requireAccess', requireAccess)
  fastify.decorateRequest('checkAndAssign', checkAndAssign)
  fastify.decorateRequest('ObjectId', ObjectId)
  fastify.decorateRequest('createPDF', createPDF)
  fastify.decorateRequest('sendMail', sendMail)
  fastify.decorateRequest('addDataToModel', addDataToModel)
  fastify.decorateRequest('sendWhatsappMessage', sendWhatsappMessage)
  fastify.decorateRequest('deleteFileFromS3Bucket', deleteFileFromS3Bucket)
  fastify.decorateRequest('sendTextMessage', sendTextMessage)
  done()
})
