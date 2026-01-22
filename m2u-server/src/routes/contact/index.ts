import { FastifyPluginAsync } from 'fastify'
import {
  createContactAndSupportHandler,
  getAllContactAndSupport,
} from '../../controllers/contact'
import createContactUsSchema from '../../schemas/create_contact_us.json'
const contact: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.get('/', getAllContactAndSupport)
  fastify.post(
    '/',
    {
      schema: {
        body: createContactUsSchema,
      },
    },
    createContactAndSupportHandler,
  )
}
export default contact
