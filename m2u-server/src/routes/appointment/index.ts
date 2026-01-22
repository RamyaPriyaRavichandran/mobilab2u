import { FastifyPluginAsync } from 'fastify'

import { useAuth } from '../../lib/hooks'
import {
  addAvailability,
  getAvailableDoctorsTimeSlotForBooking,
  getDoctorTimeSlot,
  reviewAppointment,
  getCustomerAppointment,
  addAppointmentPrescription,
  getCustomerAppointmentsByDoctorAvailability,
  addAppointmentReferral,
  getAppointmentPrescription,
  addAppointmentTest,
  markAsConsultationCompleted,
  updateMedicinePrice,
  createCustomPackage,
  reviewAppointmentConsultation,
  appointmentValidationCheck,
  appointmentValidationCheckByAdmin,
  getAppointmentCounts,
  getAppointmentsByCustomerId,
  getAllAppointmentBookings,
  getFollowupAppointmentTimeSlotByAppointmentId,
  getPurchasedMedicines,
  getAppointmentByRedirectionId,
  getCustomerCompletedAppointments,
  appointmentCancellation,
  confirmAppointment,
  appointmentTimeSlotReAllocation,
  getAppointmentApprovedDoctorTimeSlotByAppointmentId,
  customerAppointmentTimeSlotReAllocation,
  getAvailableDoctorsBySlotData,
} from '../../controllers/appointment'
import AddReferralSchema from '../../schemas/add_referral_body.json'
import AddMedicineSchema from '../../schemas/add_medicine_body.json'
import UpdateMedicineSchema from '../../schemas/update_medicine_price_body.json'
import CreateCustomPackageSchema from '../../schemas/create_custom_package_body.json'
import customerAppointmentTimeSlotReallocationSchema from '../../schemas/customer_appointment_time-slot_re_allocation.json'
const appointment: FastifyPluginAsync = async (
  fastify,
  _opts,
): Promise<void> => {
  useAuth(fastify)

  /**
   * @swagger
   * /api/v1/appointment/add-time-slot:
   *   post:
   *     tags: [Appointment]
   *     description: Add time slot
   *     security:
   *       - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *            schema:
   *             type: object
   *             properties:
   *              date:
   *               type: string
   *              startTime:
   *               type: string
   *              endTime:
   *               type: number
   *             required:
   *              - date
   *              - startTime
   *              - endTime
   *     responses:
   *       200:
   *         message: Availability added
   */

  fastify.post('/add-time-slot', addAvailability)

  /**
   * @swagger
   * /api/v1/appointment/review-appointment:
   *   post:
   *     tags: [Appointment]
   *     description: Review appointment
   *     security:
   *       - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *            schema:
   *             type: object
   *             properties:
   *              availabilityId:
   *               type: string
   *              appointmentId:
   *               type: string
   *              date:
   *               type: string
   *              startTime:
   *               type: string
   *              endTime:
   *               type: number
   *             required:
   *              - date
   *              - availabilityId
   *              - appointmentId
   *              - startTime
   *              - endTime
   *     responses:
   *       200:
   *         message: Availability added
   */

  fastify.post('/review-appointment', reviewAppointment)

  /**
   * @swagger
   * /api/v1/appointment/add-appointment-prescription/{appointmentId}:
   *   post:
   *     tags: [Appointment]
   *     description: Review appointment
   *     security:
   *       - Authorization: []
   *     parameters:
   *       - in: path
   *         name: appointmentId
   *         schema:
   *           type: string
   *         required: true
   *         description: Appointment id
   *     requestBody:
   *        content:
   *           application/json:
   *            schema:
   *             type: object
   *             properties:
   *              symptoms:
   *               type: string
   *              prescription:
   *               type: string
   *              comorbidities:
   *               type: string
   *              diagnosis:
   *               type: string
   *              allergies:
   *               type: string
   *              advice:
   *               type: string
   *              followupDate:
   *               type: string
   *             required:
   *              - symptoms
   *              - prescription
   *              - comorbidities
   *              - diagnosis
   *              - allergies
   *              - advice
   *              - followupDate
   *     responses:
   *       200:
   *         message: Prescription added
   */

  fastify.post(
    '/add-appointment-prescription/:appointmentId',
    {
      preValidation: appointmentValidationCheck,
      schema: {
        body: AddMedicineSchema,
      },
    },
    addAppointmentPrescription,
  )

  /**
   * @swagger
   * /api/v1/appointment/add-appointment-referral/{appointmentId}:
   *   post:
   *     tags: [Appointment]
   *     description: Review appointment
   *     security:
   *       - Authorization: []
   *     parameters:
   *       - in: path
   *         name: appointmentId
   *         schema:
   *           type: string
   *         required: true
   *         description: Appointment id
   *     requestBody:
   *        content:
   *           application/json:
   *            schema:
   *             type: object
   *             properties:
   *              complaint:
   *               type: string
   *              findings:
   *               type: string
   *              investigation:
   *               type: string
   *              management:
   *               type: string
   *             required:
   *              - complaint
   *              - findings
   *              - comorbidities
   *              - investigation
   *              - management
   *     responses:
   *       200:
   *         message: Referal added
   */
  fastify.post(
    '/add-appointment-referral/:appointmentId',
    {
      preValidation: appointmentValidationCheck,
      schema: {
        body: AddReferralSchema,
      },
    },
    addAppointmentReferral,
  )

  /**
   * @swagger
   * /api/v1/appointment/add-appointment-test/{appointmentId}:
   *   post:
   *     tags: [Appointment]
   *     description: Appointment test
   *     security:
   *       - Authorization: []
   *     parameters:
   *       - in: path
   *         name: appointmentId
   *         schema:
   *           type: string
   *         required: true
   *         description: Appointment id
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
   *             required:
   *              - name
   *              - description
   *     responses:
   *       200:
   *         message: Test added
   */

  fastify.post(
    '/add-appointment-test/:appointmentId',
    {
      preValidation: appointmentValidationCheck,
    },
    addAppointmentTest,
  )

  /**
   * @swagger
   * /api/v1/appointment/mark-consultation-done/{appointmentId}:
   *   post:
   *     tags: [Appointment]
   *     description: Appointment consultation completed
   *     security:
   *       - Authorization: []
   *     parameters:
   *       - in: path
   *         name: appointmentId
   *         schema:
   *           type: string
   *         required: true
   *         description: Appointment id
   *     responses:
   *       200:
   *         message: Appointment consultation completed
   */
  fastify.post(
    '/mark-consultation-done/:appointmentId',
    {
      preValidation: appointmentValidationCheck,
    },
    markAsConsultationCompleted,
  )

  /**
   * @swagger
   * /api/v1/appointment/update-medicine-price/{appointmentId}:
   *   post:
   *     tags: [Appointment]
   *     description: Medicine price update
   *     security:
   *       - Authorization: []
   *     parameters:
   *       - in: path
   *         name: appointmentId
   *         schema:
   *           type: string
   *         required: true
   *         description: Appointment id
   *     requestBody:
   *        content:
   *           application/json:
   *            schema:
   *             type: object
   *             properties:
   *              medicine:
   *               type: array
   *              price:
   *               type: number
   *             required:
   *              - medicine
   *              - price
   *     responses:
   *       200:
   *         message: Medicine price update
   */

  fastify.post(
    '/update-medicine-price/:appointmentId',
    {
      preValidation: appointmentValidationCheckByAdmin,
      schema: {
        body: UpdateMedicineSchema,
      },
    },
    updateMedicinePrice,
  )

  /**
   * @swagger
   * /api/v1/appointment/create-custom-package/{appointmentId}:
   *   post:
   *     tags: [Appointment]
   *     description: Create custom Plan
   *     security:
   *       - Authorization: []
   *     parameters:
   *       - in: path
   *         name: appointmentId
   *         schema:
   *           type: string
   *         required: true
   *         description: Appointment ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               packageName:
   *                 type: string
   *               packageDescription:
   *                 type: string
   *               selectedPackage:
   *                 type: string
   *               name:
   *                 type: string
   *               description:
   *                 type: string
   *               type:
   *                 type: string
   *               members:
   *                 type: array
   *                 items:
   *                   type: string
   *               serviceType:
   *                 type: string
   *               price:
   *                 type: number
   *               labShare:
   *                 type: number
   *               gpShare:
   *                 type: number
   *               hspShare:
   *                 type: number
   *               duration:
   *                 type: string
   *               fastingHour:
   *                 type: string
   *               customerShare:
   *                 type: number
   *               mobilabShare:
   *                 type: number
   *               offerPrice:
   *                 type: number
   *             required:
   *               - packageName
   *               - packageDescription
   *               - selectedPackage
   *               - name
   *               - description
   *               - type
   *               - members
   *               - serviceType
   *               - price
   *               - labShare
   *               - gpShare
   *               - hspShare
   *               - duration
   *               - fastingHour
   *               - customerShare
   *               - mobilabShare
   *               - offerPrice
   *     responses:
   *       200:
   *         description: Custom Plan created
   */

  fastify.post(
    '/create-custom-package/:appointmentId',
    {
      preValidation: appointmentValidationCheckByAdmin,
      schema: {
        body: CreateCustomPackageSchema,
      },
    },
    createCustomPackage,
  )

  /**
   * @swagger
   * /api/v1/appointment/review-appointment-consultation/{appointmentId}:
   *   post:
   *     tags: [Appointment]
   *     description: Admin consultation review
   *     security:
   *       - Authorization: []
   *     parameters:
   *       - in: path
   *         name: appointmentId
   *         schema:
   *           type: string
   *         required: true
   *         description: Appointment id
   *     responses:
   *       200:
   *         message: Custom Plan created
   */

  fastify.post(
    '/review-appointment-consultation/:appointmentId',
    {
      preValidation: appointmentValidationCheckByAdmin,
    },
    reviewAppointmentConsultation,
  )

  /**
   * @swagger
   * /api/v1/appointment/appointment-cancellation/{appointmentId}:
   *   post:
   *     tags: [Appointment]
   *     description: Appointment Cancellation
   *     security:
   *       - Authorization: []
   *     parameters:
   *       - in: path
   *         name: appointmentId
   *         schema:
   *           type: string
   *         required: true
   *         description: Appointment id
   *     responses:
   *       200:
   *         message: Appointment cancelled
   */

  fastify.post(
    '/appointment-cancellation/:appointmentId',
    appointmentCancellation,
  )

  /**
   * @swagger
   * /api/v1/appointment/confirm-appointment/{appointmentId}:
   *   post:
   *     tags: [Appointment]
   *     description: Confirm Appointment
   *     security:
   *       - Authorization: []
   *     parameters:
   *       - in: path
   *         name: appointmentId
   *         schema:
   *           type: string
   *         required: true
   *         description: Appointment id
   *     responses:
   *       200:
   *         message: Appointment confirmed
   */

  fastify.post('/confirm-appointment/:appointmentId', confirmAppointment)

  /**
   * @swagger
   * /api/v1/appointment/time-slot-re-allocation-by-admin/{appointmentId}:
   *   post:
   *     tags: [Appointment]
   *     description: Confirm Appointment
   *     security:
   *       - Authorization: []
   *     parameters:
   *       - in: path
   *         name: appointmentId
   *         schema:
   *           type: string
   *         required: true
   *         description: Appointment id
   *     requestBody:
   *        content:
   *           application/json:
   *            schema:
   *             type: object
   *             properties:
   *              doctorId:
   *               type: string
   *              slotId:
   *               type: string
   *             required:
   *              - doctorId
   *              - slotId
   *     responses:
   *       200:
   *         message: Appointment time slot re-allocation success
   */

  fastify.post(
    '/time-slot-re-allocation-by-admin/:appointmentId',
    appointmentTimeSlotReAllocation,
  )
  /**
   * @swagger
   * /api/v1/appointment/time-slot-re-allocation-by-customer/{appointmentId}:
   *   post:
   *     tags: [Appointment]
   *     description: Appointment time slot re-allocation by customer
   *     security:
   *       - Authorization: []
   *     parameters:
   *       - in: path
   *         name: appointmentId
   *         schema:
   *           type: string
   *         required: true
   *         description: Appointment id
   *     requestBody:
   *        content:
   *           application/json:
   *            schema:
   *             type: object
   *             properties:
   *              doctorLanguage:
   *               type: string
   *              slotId:
   *               type: string
   *             required:
   *              - slotId
   *              - doctorLanguage
   *     responses:
   *       200:
   *         message: Appointment time slot re-allocation success
   */

  fastify.post(
    '/time-slot-re-allocation-by-customer/:appointmentId',
    {
      schema: {
        body: customerAppointmentTimeSlotReallocationSchema,
      },
    },
    customerAppointmentTimeSlotReAllocation,
  )

  /**
   * @swagger
   * /api/v1/appointment/get-available-time-slots:
   *   get:
   *     tags: [Appointment]
   *     description: Get customer appointment
   *     security:
   *       - Authorization: []
   *     parameters:
   *       - in: query
   *         name: date
   *         schema:
   *           type: string
   *         required: true
   *         description: date
   *       - in: query
   *         name: language
   *         schema:
   *           type: string
   *         required: true
   *         description: get-available-time-slots
   *     requestBody:
   *        content:
   *           application/json:
   *     responses:
   *       200:
   *         message: Get customer appointment
   */

  fastify.get(
    '/get-available-time-slots',
    getAvailableDoctorsTimeSlotForBooking,
  )

  /**
   * @swagger
   * /api/v1/appointment/get-doctor-time-slot:
   *   get:
   *     tags: [Appointment]
   *     description: Get doctor time slot
   *     security:
   *       - Authorization: []
   *     responses:
   *       200:
   *         message: Time slots
   */

  fastify.get('/get-doctor-time-slot', getDoctorTimeSlot)

  /**
   * @swagger
   * /api/v1/appointment/get-customer-appointments-by-doctor-availability:
   *   get:
   *     tags: [Appointment]
   *     description: Get customer appointment
   *     security:
   *       - Authorization: []
   *     responses:
   *       200:
   *         message: Customer appointment
   */

  fastify.get(
    '/get-customer-appointments-by-doctor-availability',
    getCustomerAppointmentsByDoctorAvailability,
  )

  /**
   * @swagger
   * /api/v1/appointment/counts:
   *   get:
   *     tags: [Appointment]
   *     description: Get appointment counts
   *     security:
   *       - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *     responses:
   *       200:
   *         message: Get appointments count
   */

  fastify.get('/counts', getAppointmentCounts)

  /**
   * @swagger
   * /api/v1/appointment/get-customer-appointment/{appointmentId}:
   *   get:
   *     tags: [Appointment]
   *     description: Get customer appointment
   *     security:
   *       - Authorization: []
   *     parameters:
   *       - in: path
   *         name: appointmentId
   *         schema:
   *           type: string
   *         required: true
   *         description: Appointment id
   *     requestBody:
   *        content:
   *           application/json:
   *     responses:
   *       200:
   *         message: Get customer appointment
   */

  fastify.get(
    '/get-customer-appointment/:appointmentId',
    getCustomerAppointment,
  )

  /**
   * @swagger
   * /api/v1/appointment/appointment-by-customer-id:
   *   get:
   *     tags: [Appointment]
   *     description: Get customer appointment
   *     security:
   *       - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *     responses:
   *       200:
   *         message: Get customer appointment
   */

  fastify.get('/appointment-by-customer-id', getAppointmentsByCustomerId)
  fastify.get(
    '/completed-appointment-by-customer-id/:id',
    getCustomerCompletedAppointments,
  )

  /**
   * @swagger
   * /api/v1/appointment/all-appointments:
   *   get:
   *     tags: [Appointment]
   *     description: Get customers appointment
   *     security:
   *       - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *     responses:
   *       200:
   *         message: Get customers appointment
   */

  fastify.get('/all-appointments', getAllAppointmentBookings)

  /**
   * @swagger
   * /api/v1/appointment/get-purchased-medicines:
   *   get:
   *     tags: [Appointment]
   *     description: Get customers appointment
   *     security:
   *       - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *     responses:
   *       200:
   *         message: Get customers appointment
   */

  fastify.get('/get-purchased-medicines', getPurchasedMedicines)

  /**
   * @swagger
   * /api/v1/appointment/get-doctors-by-availability-slot-data:
   *   get:
   *     tags: [Appointment]
   *     description: Get doctors list by availability slot data
   *     security:
   *       - Authorization: []
   *       - in: query
   *         name: date
   *         schema:
   *           type: string
   *         required: true
   *         description: Appointment date
   *       - in: query
   *         name: startTime
   *         schema:
   *           type: string
   *         required: true
   *         description: Appointment start time
   *       - in: query
   *         name: endTime
   *         schema:
   *           type: string
   *         required: true
   *         description: Appointment end time
   *     requestBody:
   *        content:
   *           application/json:
   *     responses:
   *       200:
   *         message: Get doctor availability by slot data
   */
  fastify.get(
    '/get-doctors-by-availability-slot-data',
    getAvailableDoctorsBySlotData,
  )
  /**
   * @swagger
   * /api/v1/appointment/get-appointment-medicine/{appointmentId}:
   *   get:
   *     tags: [Appointment]
   *     description: Get appointment medicine
   *     security:
   *       - Authorization: []
   *     parameters:
   *       - in: path
   *         name: appointmentId
   *         schema:
   *           type: string
   *         required: true
   *         description: Appointment id
   *     requestBody:
   *        content:
   *           application/json:
   *     responses:
   *       200:
   *         message: Get appointment medicine
   */

  fastify.get(
    '/get-appointment-prescription/:appointmentId',
    getAppointmentPrescription,
  )

  /**
   * @swagger
   * /api/v1/appointment/get-appointment-by-redirection-id/{redirectId}:
   *   get:
   *     tags: [Appointment]
   *     description: Get appointment by redirectId
   *     security:
   *       - Authorization: []
   *     parameters:
   *       - in: path
   *         name: redirectId
   *         schema:
   *           type: string
   *         required: true
   *         description: redirect id
   *     requestBody:
   *        content:
   *           application/json:
   *     responses:
   *       200:
   *         message: Get appointment
   */

  fastify.get(
    '/get-appointment-by-redirection-id/:redirectId',
    getAppointmentByRedirectionId,
  )

  /**
   * @swagger
   * /api/v1/appointment/get-followup-appointment-availability-by-appointment-id/{appointmentId}:
   *   get:
   *     tags: [Appointment]
   *     description: Get followup appointment availability
   *     security:
   *       - Authorization: []
   *     parameters:
   *       - in: path
   *         name: appointmentId
   *         schema:
   *           type: string
   *         required: true
   *         description: Appointment id
   *     requestBody:
   *        content:
   *           application/json:
   *     responses:
   *       200:
   *         message: Get appointment medicine
   */

  fastify.get(
    '/get-followup-appointment-availability-by-appointment-id/:appointmentId',
    getFollowupAppointmentTimeSlotByAppointmentId,
  ),
    /**
     * @swagger
     * /api/v1/appointment/get-appointment-approved-doctor-availability-by-appointment-id/{appointmentId}:
     *   get:
     *     tags: [Appointment]
     *     description: Get approved doctor availability for an appointment
     *     security:
     *       - Authorization: []
     *     parameters:
     *       - in: path
     *         name: appointmentId
     *         schema:
     *           type: string
     *         required: true
     *         description: Appointment id
     *       - in: query
     *         name: date
     *         schema:
     *           type: string
     *         required: true
     *         description: Appointment date
     *     requestBody:
     *        content:
     *           application/json:
     *     responses:
     *       200:
     *         message: Get appointment medicine
     */

    fastify.get(
      '/get-appointment-approved-doctor-availability-by-appointment-id/:appointmentId',
      getAppointmentApprovedDoctorTimeSlotByAppointmentId,
    )
}

export default appointment
