import { FastifyPluginAsync } from 'fastify'
import { useAuth } from '../../lib/hooks'
import {
  getRedeemWalletDetail,
  getRedeemWalletDetails,
  reviewRedeemWalletRequest,
  redeemWallet,
  sendOTPToAuthenticatedUserEmail,
  userWalletDetails,
  appointmentAndTestCounts,
} from '../../controllers/wallet'

const wallet: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  useAuth(fastify)

  /**
   * @swagger
   * /api/v1/wallet/verify-user:
   *   post:
   *     tags: [Wallet]
   *     description: Verify auth user email for wallet redeem
   *     security:
   *       - Authorization: []
   *     responses:
   *       200:
   *         message: Verification code send to user login credentials
   */

  fastify.post('/verify-user', sendOTPToAuthenticatedUserEmail)

  /**
   * @swagger
   * /api/v1/wallet/redeem:
   *   post:
   *     tags: [Wallet]
   *     description: With draw wallet
   *     security:
   *       - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *            schema:
   *             type: object
   *             properties:
   *              withdrawAmount:
   *               type: number
   *              otp:
   *               type: number
   *             required:
   *              - withdrawAmount
   *              - otp
   *     responses:
   *       200:
   *         message: Withdrawal request created
   */

  fastify.post('/redeem', redeemWallet)

  /**
   * @swagger
   * /api/v1/wallet/redeem-review:
   *   put:
   *     tags: [Wallet]
   *     description: With draw wallet
   *     security:
   *       - Authorization: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: Wallet id
   *     requestBody:
   *        content:
   *           application/json:
   *            schema:
   *             type: object
   *             properties:
   *              status:
   *               type: number
   *              declineNote:
   *               type: string
   *             required:
   *              - status
   *     responses:
   *       200:
   *         message: Withdrawal request created
   */

  fastify.put('/redeem-review', reviewRedeemWalletRequest)

  /**
   * @swagger
   * /api/v1/wallet/redeem/all:
   *    get:
   *     tags: [Wallet]
   *     description: Get all wallet
   *     security:
   *        - Authorization: []
   *     responses:
   *       200:
   *         message: Get all wallet
   */
  fastify.get('/redeem/all', getRedeemWalletDetails)
  /**
   * @swagger
   * /api/v1/wallet/user-wallet-details:
   *    get:
   *     tags: [Wallet]
   *     description: Get user wallet details
   *     security:
   *        - Authorization: []
   *     responses:
   *       200:
   *         message: Get user wallet details
   */
  fastify.get('/user-wallet-details', userWalletDetails)
  fastify.get('/order-counts', appointmentAndTestCounts)

  /**
   * @swagger
   * /api/v1/wallet/redeem/{id}:
   *    get:
   *     tags: [Wallet]
   *     description: Get wallet detail
   *     security:
   *        - Authorization: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: Wallet id
   *     responses:
   *       200:
   *         message: Get aWallet
   */

  fastify.get('/redeem/:id', getRedeemWalletDetail)
}

export default wallet
