import type { FastifyPluginAsync } from 'fastify'
import LoginSchema from '../../schemas/login_body.json'
import OtpSchema from '../../schemas/otp_body.json'
import SPRegisterBody from '../../schemas/sp_register_body.json'
import CustomerRegister from '../../schemas/customer_register_body.json'
import ForgotPasswordSchema from '../../schemas/forgot_password_body.json'
import resetPasswordSchema from '../../schemas/reset_password_body.json'

import {
  changePassword,
  customerRegister,
  forgotPassword,
  getLoggedInUserData,
  getUserPerms,
  getUserTypes,
  login,
  logout,
  refreshToken,
  registerValidationCheck,
  resetPassword,
  sendOtpFromEmail,
  sendOtpFromPhone,
  spRegister,
} from '../../controllers/user'

const user: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  /**
   * @swagger
   * /api/v1/user/login:
   *   post:
   *     tags: [Auth]
   *     description: Login to the application
   *     requestBody:
   *        content:
   *           application/json:
   *            schema:
   *             type: object
   *             properties:
   *              email:
   *               type: string
   *               default: mobilab2u@gmail.com
   *              password:
   *               type: string
   *               default: 123456789
   *             required:
   *              - email
   *              - password
   *     responses:
   *        200:
   *          message: Login success
   */

  fastify.post(
    '/login',
    {
      schema: {
        body: LoginSchema,
      },
    },
    login,
  )

  /**
   * @swagger
   * /api/v1/user/send-otp-email:
   *   post:
   *     tags: [Auth]
   *     description: Otp for register
   *     requestBody:
   *        content:
   *           application/json:
   *            schema:
   *             type: object
   *             properties:
   *              email:
   *               type: string
   *               default: mobilab2u@gmail.com
   *             required:
   *              - email
   *     responses:
   *        200:
   *          message: OTP success
   */

  fastify.post(
    '/send-otp-email',
    {
      schema: {
        body: OtpSchema,
      },
    },
    sendOtpFromEmail,
  )

  /**
   * @swagger
   * /api/v1/user/send-otp-phone:
   *   post:
   *     tags: [Auth]
   *     description: Otp for update phone number
   *     security:
   *       - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *            schema:
   *             type: object
   *             properties:
   *              phone:
   *               type: string
   *               default: 0123456789
   *             required:
   *              - phone
   *     responses:
   *        200:
   *          message: OTP success
   */

  fastify.post(
    '/send-otp-phone',
    {
      onRequest: [fastify.authenticate],
    },
    sendOtpFromPhone,
  )

  /**
   * @swagger
   * /api/v1/user/register:
   *   post:
   *     tags: [Service Providers]
   *     description: register to the application
   *     requestBody:
   *        content:
   *           multipart/form-data:
   *            schema:
   *             type: object
   *             properties:
   *              userName:
   *               type: string
   *              password:
   *               type: string
   *              email:
   *               type: string
   *              otp:
   *               type: boolean
   *              emailCode:
   *               type: string
   *              phone:
   *               type: string
   *              city:
   *               type: string
   *              state:
   *               type: string
   *              country:
   *               type: string
   *              address2:
   *               type: string
   *              postCode:
   *               type: string
   *              address:
   *               type: string
   *              medicalQualification:
   *               type: string
   *              other:
   *               type: string
   *              mQdocOne:
   *               type: object
   *              mQdocTwo:
   *               type: object
   *              mQdocThree:
   *               type: object
   *              mQdocFour:
   *               type: object
   *              passportSizePhoto:
   *               type: object
   *              myKad:
   *               type: object
   *             required:
   *              - userName
   *              - email
   *              - password
   *              - phone
   *              - address
   *              - otp
   *              - emailCode
   *              - postCode
   *              - phone
   *              - city
   *              - state
   *              - country
   *              - address2
   *              - address
   *              - medicalQualification
   *              - other
   *              - mQdocOne
   *              - mQdocTwo
   *              - passportSizePhoto
   *              - mykad
   *     responses:
   *       200:
   *         message: Serice provider register success
   */

  fastify.post(
    '/register',
    {
      preValidation: registerValidationCheck,
      schema: {
        body: SPRegisterBody,
      },
    },
    spRegister,
  )

  /**
   * @swagger
   * /api/v1/user/customer-register:
   *   post:
   *     tags: [Customer]
   *     description: Customer register
   *     requestBody:
   *        content:
   *           application/json:
   *            schema:
   *             type: object
   *             properties:
   *              name:
   *               type: string
   *              password:
   *               type: string
   *              email:
   *               type: string
   *              otp:
   *               type: boolean
   *              emailCode:
   *               type: string
   *              nricNumber:
   *               type: string
   *              phone:
   *               type: string
   *              city:
   *               type: string
   *              dateOfBirth:
   *               type: date
   *              state:
   *               type: string
   *              lat:
   *               type: number
   *              lng:
   *               type: number
   *              postCode:
   *               type: string
   *              address:
   *               type: string
   *             required:
   *              - name
   *              - email
   *              - password
   *              - phone
   *              - address
   *              - dateOfBirth
   *              - otp
   *              - emailCode
   *              - postCode
   *              - phone
   *              - nricNumber
   *              - city
   *              - state
   *              - address
   *     responses:
   *       200:
   *         message: Customer register success
   */

  fastify.post(
    '/customer-register',
    {
      schema: {
        body: CustomerRegister,
      },
    },
    customerRegister,
  )

  /**
   * @swagger
   * /api/v1/user/forgot-password:
   *   post:
   *     tags: [Auth]
   *     description: Forgot password
   *     requestBody:
   *        content:
   *           application/json:
   *            schema:
   *             type: object
   *             properties:
   *              email:
   *               type: string
   *               default: mobilab2u@gmail.com
   *             required:
   *              - email
   *     responses:
   *        200:
   *          message: Password reset link send to your email
   */

  fastify.post(
    '/forgot-password',
    {
      schema: {
        body: ForgotPasswordSchema,
      },
    },
    forgotPassword,
  )
  /**
   * @swagger
   * /api/v1/user/change-password:
   *   post:
   *     tags: [Auth]
   *     description: Change password
   *     requestBody:
   *        content:
   *           application/json:
   *            schema:
   *             type: object
   *             properties:
   *              passwordResetToken:
   *               type: string
   *              password:
   *               type: string
   *               default: Sanjaijb93@
   *             required:
   *              - passwordResetToken
   *              - password
   *     responses:
   *        200:
   *          message: Pasword reset success.
   */

  fastify.post('/change-password', changePassword)

  /**
   * @swagger
   * /api/v1/user/reset-password:
   *   post:
   *     tags: [Auth]
   *     description: Reset your password
   *     security:
   *        - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *            schema:
   *             type: object
   *             properties:
   *              currentPassword:
   *               type: string
   *              newPassword:
   *               type: string
   *             required:
   *              - currentPassword
   *              - newPassword
   *     responses:
   *       200:
   *         message: Password reset success
   */

  fastify.post(
    '/reset-password',
    {
      onRequest: [fastify.authenticate],
      schema: {
        body: resetPasswordSchema,
      },
    },
    resetPassword,
  )

  /**
   * @swagger
   * /api/v1/user/refresh:
   *   get:
   *     tags: [Auth]
   *     description: Make user refresh token
   *     requestBody:
   *        content:
   *           application/json:
   *     responses:
   *       200:
   *         message: refresh success
   */
  fastify.get('/refresh', refreshToken)

  /**
   * @swagger
   * /api/v1/user/logout:
   *   get:
   *     tags: [Auth]
   *     description: User logout
   *     requestBody:
   *        content:
   *           application/json:
   *     responses:
   *       200:
   *         message: logout success
   */
  fastify.get('/logout', logout)

  /**
   * @swagger
   * /api/v1/user/user-types:
   *   get:
   *     tags: [Auth]
   *     description: Get User types
   *     security:
   *        - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *     responses:
   *       200:
   *         message: User types
   */
  fastify.get('/user-types', getUserTypes)

  /**
   * @swagger
   * /api/v1/user/perms:
   *   get:
   *     tags: [Auth]
   *     description: Get User perms
   *     security:
   *        - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *     responses:
   *       200:
   *         message: User perms
   */

  fastify.get(
    '/perms',
    {
      onRequest: [fastify.authenticate],
    },
    getUserPerms,
  )
  fastify.get(
    '/detail',
    {
      onRequest: [fastify.authenticate],
    },
    getLoggedInUserData,
  )
}

export default user
