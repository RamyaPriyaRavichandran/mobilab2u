import type { FastifyPluginAsync } from 'fastify'
import { createServiceProviderPayment } from '../../controllers/service-provider'

import followupAppointmentSchema from '../../schemas/book_followup_appointment_body.json'
import AppointmentSchema from '../../schemas/book_appointment_body.json'
import {
  createCustomerFollowupTestPayment,
  createCustomerTestPayment,
  reGenerateTestPayment,
} from '../../controllers/lab-test'
import {
  bookAppointment,
  bookAppointmentValidationCheck,
  bookFollowupDoctorFollowupAppointment,
  bookFollowupDoctorFollowupAppointmentValidationCheck,
  bookRandomDoctorFollowupAppointment,
  bookRandomDoctorFollowupAppointmentValidationCheck,
  buyMedicine,
} from '../../controllers/appointment'
import { webhook } from '../../controllers/payment'
const payment: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  /**
   * @swagger
   * /api/v1/payment/service-provider-fees:
   *  get:
   *     tags: [Service Providers]
   *     description: Pay service provider initial fees
   *     security:
   *        - Authorization: []
   *     responses:
   *       200:
   *         description: Payment url created
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Payment url created
   */

  fastify.get(
    '/service-provider-fees',
    {
      onRequest: [fastify.authenticate],
    },
    createServiceProviderPayment,
  )

  /**
   * @swagger
   * /api/v1/payment/customer-followup-test-fees:
   *   post:
   *     tags: [Customer]
   *     description: customer follow up test
   *     security:
   *       - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *            schema:
   *             type: object
   *             properties:
   *              packageId:
   *               type: string
   *              appointmentId:
   *               type: string
   *              members:
   *               type: array
   *              customerAppointmentDate:
   *               type: string
   *              customerAppointmentTime:
   *               type: string
   *              customerAddress:
   *               type: string
   *             required:
   *              - appointmentId
   *              - packageId
   *              - customerAppointmentDate
   *              - customerAppointmentTime
   *              - customerAddress
   *     responses:
   *       200:
   *         message: Payment link created
   */

  fastify.post(
    '/customer-followup-test-fees',
    {
      onRequest: [fastify.authenticate],
    },
    createCustomerFollowupTestPayment,
  )

  /**
   * @swagger
   * /api/v1/payment/customer-test-fees:
   *   post:
   *     tags: [Customer]
   *     description: Create lab report
   *     security:
   *       - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *            schema:
   *             type: object
   *             properties:
   *              packageId:
   *               type: string
   *              members:
   *               type: array
   *              customerAppointmentDate:
   *               type: string
   *              customerAppointmentTime:
   *               type: string
   *              customerAddress:
   *               type: string
   *             required:
   *              - packageId
   *              - customerAppointmentDate
   *              - customerAppointmentTime
   *              - customerAddress
   *     responses:
   *       200:
   *         message: Payment link created
   */

  fastify.post(
    '/customer-test-fees',
    {
      onRequest: [fastify.authenticate],
    },
    createCustomerTestPayment,
  )

  /**
   * @swagger
   * /api/v1/payment/book-doctor-appointment:
   *   post:
   *     tags: [Customer]
   *     description: Create doctor appointment
   *     security:
   *       - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *            schema:
   *             type: object
   *             properties:
   *              appointmentDate:
   *               type: string
   *              startTime:
   *               type: string
   *              endTime:
   *               type: string
   *              slotId:
   *               type: string
   *              packageId:
   *               type: string
   *              doctorLanguage:
   *               type: string
   *             required:
   *              - appointmentDate
   *              - startTime
   *              - endTime
   *              - slotId
   *              - packageId
   *              - doctorLanguage
   *     responses:
   *       200:
   *         message: Payment link created
   */

  fastify.post(
    '/book-doctor-appointment',
    {
      preValidation: bookAppointmentValidationCheck,
      onRequest: [fastify.authenticate],
      schema: {
        body: AppointmentSchema,
      },
    },
    bookAppointment,
  )

  /**
   * @swagger
   * /api/v1/payment/book-followup-doctor-followup-appointment:
   *   post:
   *     tags: [Customer]
   *     description: Create doctor appointment
   *     security:
   *       - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *            schema:
   *             type: object
   *             properties:
   *              appointmentId:
   *               type: string
   *              startTime:
   *               type: string
   *              endTime:
   *               type: string
   *              slotId:
   *               type: string
   *             required:
   *              - appointmentId
   *              - startTime
   *              - endTime
   *              - slotId
   *              - packageId
   *              - doctorLanguage
   *     responses:
   *       200:
   *         message: Payment link created
   */

  fastify.post(
    '/book-followup-doctor-followup-appointment',
    {
      onRequest: [fastify.authenticate],
      preValidation: bookFollowupDoctorFollowupAppointmentValidationCheck,
      schema: {
        body: followupAppointmentSchema,
      },
    },
    bookFollowupDoctorFollowupAppointment,
  )

  /**
   * @swagger
   * /api/v1/payment/book-random-doctor-followup-appointment:
   *   post:
   *     tags: [Customer]
   *     description: Create doctor appointment
   *     security:
   *       - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *            schema:
   *             type: object
   *             properties:
   *              appointmentId:
   *               type: string
   *              startTime:
   *               type: string
   *              endTime:
   *               type: string
   *              slotId:
   *               type: string
   *             required:
   *              - appointmentId
   *              - startTime
   *              - endTime
   *              - slotId
   *              - packageId
   *              - doctorLanguage
   *     responses:
   *       200:
   *         message: Payment link created
   */

  fastify.post(
    '/book-random-doctor-followup-appointment',
    {
      onRequest: [fastify.authenticate],
      preValidation: bookRandomDoctorFollowupAppointmentValidationCheck,
      schema: {
        body: followupAppointmentSchema,
      },
    },
    bookRandomDoctorFollowupAppointment,
  )

  /**
   * @swagger
   * /api/v1/payment/repay-customer-test-fees:
   *   post:
   *     tags: [Customer]
   *     description: Pay lab test
   *     security:
   *       - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *            schema:
   *             type: object
   *             properties:
   *              testId:
   *               type: string
   *              members:
   *               type: array
   *             required:
   *              - testId
   *     responses:
   *       200:
   *         message: Payment link created
   */

  fastify.put(
    '/repay-customer-test-fees',
    {
      onRequest: [fastify.authenticate],
    },
    reGenerateTestPayment,
  )

  /**
   * @swagger
   * /api/v1/payment/book-doctor-appointment:
   *   post:
   *     tags: [Customer]
   *     description: Pay appointment fees
   *     security:
   *       - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *            schema:
   *             type: object
   *             properties:
   *              appointmentDate:
   *               type: string
   *              doctorLanguage:
   *               type: string
   *              slotId:
   *               type: string
   *              startTime:
   *               type: string
   *              endTime:
   *               type: string
   *             required:
   *              - appointmentDate
   *              - doctorLanguage
   *              - slotId
   *              - startTime
   *              - endTime
   *     responses:
   *       200:
   *         message: Payment link created
   */

  fastify.post(
    '/buy-medicine/:appId',
    {
      onRequest: [fastify.authenticate],
    },
    buyMedicine,
  )

  fastify.post(
    '/webhook',
    {
      config: {
        rawBody: true,
      },
    },
    webhook,
  )
}

export default payment
