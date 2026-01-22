import type { FastifyPluginAsync } from 'fastify'
import {
  createPackage,
  deletePackage,
  getTestPackages,
  getCustomerPackages,
  getPackage,
  getPackages,
  updatePackage,
} from '../../controllers/packages'
const packages: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  /**
   * @swagger
   * /api/v1/packages:
   *   post:
   *     tags: [Admin]
   *     description: Create Plan
   *     security:
   *       - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *            schema:
   *             type: object
   *             properties:
   *              name:
   *               type: string
   *              description:
   *               type: string
   *              type:
   *               type: string
   *              serviceType:
   *               type: string
   *              members:
   *               type: string
   *              price:
   *               type: number
   *              hspShare:
   *               type: number
   *              gpShare:
   *               type: number
   *              customerShare:
   *               type: number
   *              mobilabShare:
   *               type: number
   *              labShare:
   *               type: number
   *              offerPrice:
   *               type: number
   *            required:
   *              - name
   *              - description
   *              - type
   *              - serviceType
   *              - price
   *              - hspShare
   *              - gpShare
   *              - customerShare
   *              - mobilabShare
   *              - labShare
   *              - offerPrice
   *     responses:
   *       200:
   *         message: Plan created
   */

  fastify.post(
    '/',
    {
      onRequest: [fastify.authenticate],
    },
    createPackage,
  )

  /**
   * @swagger
   * /api/v1/packages/{id}:
   *   put:
   *     tags: [Admin]
   *     description: Update Plan
   *     security:
   *       - Authorization: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The ID of the service provider
   *     requestBody:
   *        content:
   *           application/json:
   *            schema:
   *             type: object
   *             properties:
   *              name:
   *               type: string
   *              description:
   *               type: string
   *              type:
   *               type: string
   *              serviceType:
   *               type: string
   *              members:
   *               type: string
   *              price:
   *               type: number
   *              offerPrice:
   *               type: number
   *              hspShare:
   *               type: number
   *              gpShare:
   *               type: number
   *              customerShare:
   *               type: number
   *              mobilabShare:
   *               type: number
   *              labShare:
   *               type: number
   *            required:
   *              - name
   *              - description
   *              - type
   *              - serviceType
   *              - price
   *              - hspShare
   *              - gpShare
   *              - customerShare
   *              - mobilabShare
   *              - labShare
   *              - offerPrice
   *     responses:
   *       200:
   *         message: Plan created
   */

  fastify.put(
    '/:id',
    {
      onRequest: [fastify.authenticate],
    },
    updatePackage,
  )

  /**
   * @swagger
   * /api/v1/packages:
   *   get:
   *     tags: [Admin]
   *     description: Get all plans
   *     security:
   *        - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *     responses:
   *       200:
   *         message: All plans
   */
  fastify.get('/', { onRequest: [fastify.authenticate] }, getPackages)

  /**
   * @swagger
   * /api/v1/packages/customer-packages:
   *   get:
   *     tags: [Customer]
   *     description: Packages
   *     requestBody:
   *        content:
   *           application/json:
   *     responses:
   *       200:
   *         message: Packages
   */

  fastify.get('/customer-packages', getCustomerPackages)

  /**
   * @swagger
   * /api/v1/packages/test-packages:
   *   get:
   *     tags: [Customer]
   *     description: Test Packages
   *     requestBody:
   *        content:
   *           application/json:
   *     responses:
   *       200:
   *         message: Packages
   */

  fastify.get(
    '/test-packages',
    { onRequest: [fastify.authenticate] },
    getTestPackages,
  )

  /**
   * @swagger
   * /api/v1/packages/{id}:
   *   get:
   *     tags: [Admin,Customer]
   *     description: Get dingle plan
   *     security:
   *       - Authorization: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The ID of the service provider
   *     responses:
   *       200:
   *         message: All plans
   */

  fastify.get('/:id', getPackage)

  /**
   * @swagger
   * /api/v1/packages/{id}:
   *    delete:
   *     tags: [Admin]
   *     description: Delete Package
   *     security:
   *        - Authorization: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The ID of the Package
   *     responses:
   *       200:
   *         message: Delete Packages
   */

  fastify.delete('/:id', { onRequest: [fastify.authenticate] }, deletePackage)
}

export default packages
