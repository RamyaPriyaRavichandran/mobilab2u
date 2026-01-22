import type { FastifyPluginAsync } from 'fastify'
import { useAuth } from '../../lib/hooks'
import ReviewServiceProviderSchema from '../../schemas/review_service_provider_body.json'
import UpdateGPProfileSchema from '../../schemas/admin_update_gp_profile.json'
import UpdateHSPProfileSchema from '../../schemas/admin_update_hsp_profile.json'
import UserUpdateHSPProfileSchema from '../../schemas/update_hsp_user_profile.json'
import UserUpdateGpProfileSchema from '../../schemas/update_gp_user_profile.json'
import {
  adminUpdateGPProfile,
  adminUpdateHSPProfile,
  getGPPartners,
  getHspKitFeesDetail,
  getServiceProviderById,
  getServiceProviderByUserId,
  getServiceProviders,
  preValidationUserProfileUpdate,
  reviewHSPOrGP,
  reviewServiceProvider,
  userUpdateOurHSPProfile,
  userUpdateOurGPProfile,
} from '../../controllers/service-provider'
const serviceProvider: FastifyPluginAsync = async (
  fastify,
  _opts,
): Promise<void> => {
  useAuth(fastify)

  /**
   * @swagger
   * /api/v1/service-provider/review/{id}:
   *   put:
   *     tags: [Admin]
   *     description: Review Service Provider
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
   *         description: Review success
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: service provider
   */

  fastify.put(
    '/review/:id',
    {
      schema: {
        body: ReviewServiceProviderSchema,
      },
    },
    reviewServiceProvider,
  )
  /**
   * @swagger
   * /api/v1/service-provider/review-hsp-or-gp:
   *   put:
   *     tags: [Admin]
   *     description: Review Service Provider
   *     security:
   *       - Authorization: []
   *     responses:
   *       200:
   *         description: Review success
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: service provider
   */
  fastify.put('/review-hsp-or-gp', reviewHSPOrGP)

  /**
   * @swagger
   * /api/v1/service-provider/admin-update-hsp-profile:
   *   put:
   *     tags: [Admin]
   *     description: Admin update HSP profile
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
   *              userId:
   *               type: string
   *              userRole:
   *               type: string
   *             required:
   *              - name
   *              - phone
   *              - city
   *              - state
   *              - address
   *              - userId
   *              - userRole
   *     responses:
   *       200:
   *         message: Profile update success
   */

  fastify.put(
    '/admin-update-hsp-profile',
    {
      schema: {
        body: UpdateHSPProfileSchema,
      },
    },
    adminUpdateHSPProfile,
  )
  /**
   * @swagger
   * /api/v1/service-provider/admin-update-gp-profile:
   *   put:
   *     tags: [Admin]
   *     description: Admin update GP profile
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
   *              userId:
   *               type: string
   *              userRole:
   *               type: string
   *             required:
   *              - name
   *              - phone
   *              - city
   *              - state
   *              - address
   *              - userId
   *              - userRole
   *     responses:
   *       200:
   *         message: Profile update success
   */

  fastify.put(
    '/admin-update-gp-profile',
    {
      schema: {
        body: UpdateGPProfileSchema,
      },
    },
    adminUpdateGPProfile,
  )

  /**
   * @swagger
   * /api/v1/service-provider/user-update-profile:
   *   put:
   *     tags: [Service Provider]
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
   *              userRole:
   *               type: string
   *              postCode:
   *               type: number
   *              nricNumber:
   *               type: number
   *              isESign:
   *               type: boolean
   *             required:
   *              - name
   *              - phone
   *              - city
   *              - state
   *              - address
   *              - postCode
   *              - nricNumber
   *              - userRole
   *              - isESign
   *     responses:
   *       200:
   *         message: Profile update success
   */

  fastify.put(
    '/hsp-user-update-profile',
    {
      preValidation: preValidationUserProfileUpdate,
      schema: {
        body: UserUpdateHSPProfileSchema,
      },
    },
    userUpdateOurHSPProfile,
  )

  fastify.put(
    '/gp-user-update-profile',
    {
      preValidation: preValidationUserProfileUpdate,
      schema: {
        body: UserUpdateGpProfileSchema,
      },
    },
    userUpdateOurGPProfile,
  )

  /**
   * @swagger
   * /api/v1/service-provider/kit-fees-detail:
   *   get:
   *     tags: []
   *     description: Get Service Providers kit fees detail
   *     security:
   *        - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *     responses:
   *       200:
   *         message: HSP kit fees success
   */
  fastify.get('/kit-fees-detail', getHspKitFeesDetail)
  /**
   * @swagger
   * /api/v1/service-provider/all:
   *   get:
   *     tags: [Admin]
   *     description: Get Service Providers
   *     security:
   *        - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *     responses:
   *       200:
   *         message: service success
   */
  fastify.get('/all', getServiceProviders)
  /**
   * @swagger
   * /api/v1/service-provider/all:
   *   get:
   *     tags: [Admin]
   *     description: Get Service Providers
   *     security:
   *        - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *     responses:
   *       200:
   *         message: service success
   */
  fastify.get('/all-gp-partners', getGPPartners)

  /**
   * @swagger
   * /api/v1/service-provider/user-data:
   *   get:
   *     tags: [Service Providers]
   *     description: Get User Service Provider Data
   *     security:
   *        - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *     responses:
   *       200:
   *         message: service success
   */
  fastify.get('/user-data', getServiceProviderByUserId)

  /**
   * @swagger
   * /api/v1/service-provider/{id}:
   *   get:
   *     tags: [Service Providers]
   *     description: Get Service Provider By Id
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
   *         description: Review success
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: service provider
   */

  fastify.get('/:id', getServiceProviderById)
}

export default serviceProvider
