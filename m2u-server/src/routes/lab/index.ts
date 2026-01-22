import { FastifyPluginAsync } from 'fastify'
import {
  createLab,
  deleteLab,
  getLab,
  getLabs,
  getLocalLabs,
  getUserLab,
  updateLab,
} from '../../controllers/lab'
import { useAuth } from '../../lib/hooks'
import LabPostBodySchema from '../../schemas/lab_post_body.json'
import LabPutBodySchema from '../../schemas/lab_put_body.json'

const lab: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  useAuth(fastify)
  /**
   * @swagger
   * /api/v1/lab:
   *   post:
   *     tags: [Admin]
   *     description: Create lab
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
   *              email:
   *               type: string
   *              phone:
   *               type: number
   *              organization:
   *               type: string
   *              address:
   *               type: string
   *              postCode:
   *               type: number
   *              password:
   *               type: string
   *              city:
   *               type: string
   *              state:
   *               type: string
   *             required:
   *              - name
   *              - email
   *              - organization
   *              - city
   *              - state
   *              - phone
   *              - password
   *              - postCode
   *              - address
   *              - password
   *     responses:
   *       200:
   *         message: Plan created
   */

  fastify.post(
    '/',
    {
      schema: {
        body: LabPostBodySchema,
      },
    },
    createLab,
  )

  /**
   * @swagger
   * /api/v1/lab/{id}:
   *   put:
   *     tags: [Admin]
   *     description: Update lab
   *     security:
   *       - Authorization: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The ID of the Lab
   *     requestBody:
   *        content:
   *           application/json:
   *            schema:
   *             type: object
   *             properties:
   *              name:
   *               type: string
   *              email:
   *               type: string
   *              phone:
   *               type: number
   *              organization:
   *               type: number
   *              address:
   *               type: string
   *              postCode:
   *               type: string
   *              password:
   *               type: string
   *              city:
   *               type: string
   *              state:
   *               type: string
   *     responses:
   *       200:
   *         message: Plan created
   */

  fastify.put(
    '/:id',
    {
      schema: {
        body: LabPutBodySchema,
      },
    },
    updateLab,
  )

  /**
   * @swagger
   * /api/v1/lab/{id}:
   *    delete:
   *     tags: [Admin]
   *     description: Delete lab
   *     security:
   *        - Authorization: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The ID of the Lab
   *     responses:
   *       200:
   *         message: Delete lab
   */
  fastify.delete('/:id', deleteLab)

  /**
   * @swagger
   * /api/v1/lab:
   *    get:
   *     tags: [Admin]
   *     description: Get all labs
   *     security:
   *        - Authorization: []
   *     responses:
   *       200:
   *         message: Get all labs
   */
  fastify.get('/', getLabs)
  /**
   * @swagger
   * /api/v1/lab/local-labs:
   *    get:
   *     tags: [Service Providers]
   *     description: Get all labs
   *     security:
   *        - Authorization: []
   *     parameters:
   *        - in: query
   *          name: city
   *          schema:
   *            type: string
   *        - in: query
   *          name: state
   *          schema:
   *            type: string
   *     responses:
   *       200:
   *         message: Get all labs
   */
  fastify.get('/local-labs', getLocalLabs)

  /**
   * @swagger
   * /api/v1/lab:
   *    get:
   *     tags: [Admin]
   *     description: Get user lab
   *     security:
   *        - Authorization: []
   *     responses:
   *       200:
   *         message: Get user lab
   */

  fastify.get('/user-lab', getUserLab)

  /**
   * @swagger
   * /api/v1/lab/{id}:
   *    get:
   *     tags: [Admin]
   *     description: Get lab
   *     security:
   *        - Authorization: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The ID of the Lab
   *     responses:
   *       200:
   *         message: Get lab
   */
  fastify.get('/:id', getLab)
}

export default lab
