import type { FastifyPluginAsync } from 'fastify'
import { useAuth } from '../../lib/hooks'
import {
  getAllCustomers,
  getCustomerAddress,
  getCustomerById,
  getCustomerByUserId,
  getCustomerSubscribedPlans,
  userUpdateProfile,
} from '../../controllers/customer'
import UserProfileUpdateSchema from '../../schemas/customer_user_profile_update.json'
const customer: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  useAuth(fastify)

  /**
   * @swagger
   * /api/v1/customer/update-profile:
   *   put:
   *     tags: [Customer]
   *     description: User update their profile
   *     security:
   *        - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *            schema:
   *             type: object
   *             properties:
   *              name:
   *               type: string
   *              phone:
   *               type: number
   *              city:
   *               type: string
   *              state:
   *               type: string
   *              address:
   *               type: string
   *              dateOfBirth:
   *               type: string
   *              postCode:
   *               type: number
   *              nricNumber:
   *               type: number
   *              registrationNumber:
   *               type: string
   *             required:
   *              - name
   *              - phone
   *              - city
   *              - state
   *              - address
   *              - postCode
   *              - nricNumber
   *              - registrationNumber
   *              - dateOfBirth
   *     responses:
   *       200:
   *         message: Profile update success
   */

  fastify.put(
    '/update-profile',
    {
      schema: {
        body: UserProfileUpdateSchema,
      },
    },
    userUpdateProfile,
  )
  /**
   * @swagger
   * /api/v1/customer/all:
   *   get:
   *     tags: [Admin]
   *     description: All customer
   *     security:
   *       - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *     responses:
   *       200:
   *         message: All customers
   */

  fastify.get('/all', getAllCustomers)

  /**
   * @swagger
   * /api/v1/customer/user-data:
   *   get:
   *     tags: [Customer]
   *     description: All customer
   *     security:
   *       - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *     responses:
   *       200:
   *         message: All customers
   */

  fastify.get('/user-data', getCustomerByUserId)

  /**
   * @swagger
   * /api/v1/customer/customer-purchased-tests:
   *   get:
   *     tags: [Customer]
   *     description: Customer purchased lab tests
   *     security:
   *       - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *     responses:
   *       200:
   *         message: Customers purchased tests
   */

  fastify.get('/customer-purchased-tests', getCustomerSubscribedPlans)

  /**
   * @swagger
   * /api/v1/customer/customer-address:
   *   get:
   *     tags: [Customer]
   *     description: Get customer address
   *     security:
   *       - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *     responses:
   *       200:
   *         message: Get customer address
   */
  fastify.get('/customer-address', getCustomerAddress)

  /**
   * @swagger
   * /api/v1/customer/{id}:
   *   get:
   *     tags: [Customer]
   *     description: Get customer
   *     security:
   *       - Authorization: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: customer id
   *     requestBody:
   *        content:
   *           application/json:
   *     responses:
   *       200:
   *         message: Get customer
   */

  fastify.get('/:id', getCustomerById)
}

export default customer
