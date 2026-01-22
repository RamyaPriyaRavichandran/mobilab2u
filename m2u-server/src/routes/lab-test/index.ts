import type { FastifyPluginAsync } from 'fastify'
import { useAuth } from '../../lib/hooks'
import ReviewCustomerTestBodySchema from '../../schemas/review_customer_test_body.json'
import {
  getSpCustomerTestRequests,
  getLabTestCounts,
  reviewCustomerTest,
  getLabCustomerTestRequests,
  uploadReportsValidationCheck,
  uploadReportForTest,
  getLabTestData,
  getCustomerLabTestDetails,
  getTestByCustomerId,
  getFinishedLabTest,
  testCancellationByAdmin,
  sampleRecollectionApproval,
  orderDateAndTimeRescheduleByAdmin,
} from '../../controllers/lab-test'
import LabTestReportBodySchema from '../../schemas/lab_test_reports_body.json'

const labTest: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  useAuth(fastify)

  /**
   * @swagger
   * /api/v1/lab-test/review:
   *   put:
   *     tags: [Lab Test]
   *     description: HSP Review labtest
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
   *              status:
   *               type: string
   *              declineNote:
   *               type: string
   *             required:
   *              - status
   *              - testId
   *     responses:
   *       200:
   *         message: Review added
   */

  fastify.put(
    '/review',
    {
      schema: {
        body: ReviewCustomerTestBodySchema,
      },
    },
    reviewCustomerTest,
  )

  /**
   * @swagger
   * /api/v1/lab-test/cancellation/{testId}:
   *   put:
   *     tags: [Lab Test]
   *     description: Admin cancel lab test
   *     security:
   *       - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *            schema:
   *             type: object
   *             properties:
   *              testId:
   *               type: object
   *              cancellationReason:
   *               type: string
   *             required:
   *              - testId
   *              - cancellationReason
   *     responses:
   *       200:
   *         message: Review added
   */

  fastify.put('/cancellation', testCancellationByAdmin)

  /**
   * @swagger
   * /api/v1/lab-test/sp-customer-tests:
   *   get:
   *     tags: [Lab Test]
   *     description: HSP get all labTest requests
   *     security:
   *        - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *     responses:
   *       200:
   *         message: service success
   */

  fastify.get('/sp-customer-tests', getSpCustomerTestRequests)

  /**
   * @swagger
   * /api/v1/lab-test/lab-test-counts:
   *   get:
   *     tags: [Lab Test]
   *     description: Get all labTest counts
   *     security:
   *        - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *     responses:
   *       200:
   *         message: service success
   */

  fastify.get('/lab-test-counts', getLabTestCounts)
  fastify.get('/finished-counts', getFinishedLabTest)

  /**
   * @swagger
   * /api/v1/lab-test/lab-customer-tests:
   *    get:
   *     tags: [Lab Test]
   *     description: Lab Get all lab test requests
   *     security:
   *        - Authorization: []
   *     responses:
   *       200:
   *         message: Get all labs
   */

  fastify.get('/lab-customer-tests', getLabCustomerTestRequests)

  /**
   * @swagger
   * /api/v1/lab-test/sample-recollection-approval:
   *   put:
   *     tags: [Lab Test]
   *     description: Sample recollection approval admin
   *     security:
   *       - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *            schema:
   *             type: object
   *             properties:
   *              testId:
   *               type: object
   *              customerAppointmentDate:
   *               type: string
   *              customerAppointmentTime:
   *               type: string
   *              status:
   *               type: string
   *             required:
   *              - testId
   *              - customerAppointmentDate
   *              - customerAppointmentTime
   *              - status
   *     responses:
   *       200:
   *         message: Sample recollection approved
   */

  fastify.put('/sample-recollection-approval', sampleRecollectionApproval)

  /**
   * @swagger
   * /api/v1/lab-test/reschedule:
   *   put:
   *     tags: [Lab Test]
   *     description: Test date and time reschedule by admin
   *     security:
   *       - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *            schema:
   *             type: object
   *             properties:
   *              testId:
   *               type: object
   *              customerAppointmentDate:
   *               type: string
   *              customerAppointmentTime:
   *               type: string
   *             required:
   *              - testId
   *              - customerAppointmentDate
   *              - customerAppointmentTime
   *     responses:
   *       200:
   *         message: Sample recollection approved
   */

  fastify.put('/reschedule', orderDateAndTimeRescheduleByAdmin)
  /**
   * @swagger
   * /api/v1/lab-test/upload-test-reports/{testId}:
   *   put:
   *     tags: [Lab Test]
   *     description: Lab upload lab test report
   *     security:
   *       - Authorization: []
   *     parameters:
   *       - in: path
   *         name: testId
   *         schema:
   *           type: string
   *         required: true
   *         description: The ID of the Lab test
   *     requestBody:
   *        content:
   *           application/json:
   *            schema:
   *             type: object
   *             properties:
   *              reportDocOne:
   *               type: object
   *              reportDocTwo:
   *               type: object
   *              reportDocThree:
   *               type: number
   *              reportDocFour:
   *               type: object
   *              reportDocFive:
   *               type: object
   *              reportDocSix:
   *               type: object
   *             required:
   *              - reportDocOne
   *     responses:
   *       200:
   *         message: Report added
   */

  fastify.put(
    '/upload-test-reports/:testId',
    {
      preValidation: uploadReportsValidationCheck,
      schema: {
        body: LabTestReportBodySchema,
      },
    },
    uploadReportForTest,
  )

  /**
   * @swagger
   * /api/v1/lab-test/customer-test/{testId}:
   *    get:
   *     tags: [Lab Test]
   *     description: Get customer test requests by lab test id
   *     security:
   *        - Authorization: []
   *     parameters:
   *       - in: path
   *         name: testId
   *         schema:
   *           type: string
   *         required: true
   *         description: The ID of the test
   *     responses:
   *       200:
   *         message: Get Lab test
   */

  fastify.get('/customer-test/:testId', getLabTestData)

  /**
   * @swagger
   * /api/v1/lab-test/user-tests:
   *   get:
   *     tags: [Lab Test]
   *     description: Get customer lab tests
   *     security:
   *       - Authorization: []
   *     requestBody:
   *        content:
   *           application/json:
   *     responses:
   *       200:
   *         message: All customers
   */
  fastify.get('/user-tests', getCustomerLabTestDetails)

  /**
   * @swagger
   * /api/v1/lab-test/test-by-customer-id/{customerId}:
   *   get:
   *     tags: [Lab Test]
   *     description: Get customer lab test by customer id
   *     security:
   *       - Authorization: []
   *     parameters:
   *       - in: path
   *         name: customerId
   *         schema:
   *           type: string
   *         required: true
   *         description: customer test
   *     requestBody:
   *        content:
   *           application/json:
   *     responses:
   *       200:
   *         message: Get customer test
   */

  fastify.get('/test-by-customer-id/:customerId', getTestByCustomerId)
}

export default labTest
