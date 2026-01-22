import { FastifyReply, FastifyRequest } from 'fastify'
import contactAndSupportModel from '../models/contact.and.support.model'
import { ContactAndSupport } from '../types/contact_and_support'
import successMessage from '../constants/success-messages'

export const createContactAndSupportHandler = async (
  request: FastifyRequest<{ Body: ContactAndSupport }>,
  reply: FastifyReply,
) => {
  const body = {
    name: request.body.name,
    email: request.body.email,
    location: request.body.location,
    phone: request.body.phone,
    subject: request.body.subject,
    message: request.body.message,
  }
  await contactAndSupportModel.create(body)
  return reply.send({
    message: successMessage.CONTACT_AND_SUPPORT_SUCCESS,
  })
}

export const getAllContactAndSupport = async (
  _request: FastifyRequest,
  reply: FastifyReply,
) => {
  const contactsAndSupports = await contactAndSupportModel
    .find()
    .sort({ createdAt: -1 })
  return reply.send(contactsAndSupports)
}
