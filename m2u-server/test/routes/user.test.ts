import tap from 'tap'
import Fastify from 'fastify'
import sinon from 'sinon'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel'
import otpModel from '../models/otpModel'
import serviceProviderModel from '../models/serviceProviderModel'
import gpPartnerModel from '../models/gpPartnerModel'

// Assuming you have the fastify instance and route definitions in a file
const buildFastify = require('../app') // or wherever your Fastify instance is

tap.test('POST `/register` endpoint', async (t) => {
  const fastify = buildFastify()

  // Stub database calls
  const userFindOneStub = sinon.stub(userModel, 'findOne')
  const otpFindOneStub = sinon.stub(otpModel, 'findOne')
  const userCreateStub = sinon.stub(userModel, 'create')
  const serviceProviderCreateStub = sinon.stub(serviceProviderModel, 'create')
  const gpPartnerCreateStub = sinon.stub(gpPartnerModel, 'create')
  const sendMailStub = sinon.stub()

  fastify.decorateRequest('sendMail', sendMailStub)

  t.teardown(() => {
    fastify.close()
    sinon.restore()
  })

  t.test('should return 404 if emailCode is not provided', async (t) => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/register',
      payload: {
        email: 'test@example.com',
      },
    })

    t.equal(response.statusCode, 404)
    t.same(JSON.parse(response.payload), {
      message: 'Please verify your email and enter code',
    })
  })

  t.test('should return 404 if email is not found in OTP model', async (t) => {
    otpFindOneStub.resolves(null)

    const response = await fastify.inject({
      method: 'POST',
      url: '/register',
      payload: {
        email: 'test@example.com',
        emailCode: '123456',
      },
    })

    t.equal(response.statusCode, 404)
    t.same(JSON.parse(response.payload), {
      message: 'Please verify your email',
    })
  })

  t.test('should return 401 if emailCode is incorrect', async (t) => {
    otpFindOneStub.resolves({
      email: 'test@example.com',
      otp: bcrypt.hashSync('123456', 10),
    })

    const response = await fastify.inject({
      method: 'POST',
      url: '/register',
      payload: {
        email: 'test@example.com',
        emailCode: 'wrongcode',
      },
    })

    t.equal(response.statusCode, 401)
    t.same(JSON.parse(response.payload), {
      message: 'Your email verification code is wrong. Please re-enter.',
    })
  })

  t.test('should return 409 if user already exists', async (t) => {
    otpFindOneStub.resolves({
      email: 'test@example.com',
      otp: bcrypt.hashSync('123456', 10),
    })

    userFindOneStub.resolves({ email: 'test@example.com' })

    const response = await fastify.inject({
      method: 'POST',
      url: '/register',
      payload: {
        email: 'test@example.com',
        emailCode: '123456',
      },
    })

    t.equal(response.statusCode, 409)
    t.same(JSON.parse(response.payload), {
      message: 'User already exists in that email',
    })
  })

  t.test('should create a user and return success message', async (t) => {
    otpFindOneStub.resolves({
      email: 'test@example.com',
      otp: bcrypt.hashSync('123456', 10),
    })

    userFindOneStub.resolves(null)
    serviceProviderModel.findOne.resolves(null)
    userCreateStub.resolves({ _id: 'user-id', userName: 'testUser' })
    sendMailStub.resolves()

    const response = await fastify.inject({
      method: 'POST',
      url: '/register',
      payload: {
        email: 'test@example.com',
        emailCode: '123456',
        userName: 'testUser',
        password: 'password',
        phone: '1234567890',
        address: '123 Test St',
        roles: 2,
        medicalQualification: 'MBBS',
        mQdocOne: { _id: 'doc1' },
        mQdocTwo: { _id: 'doc2' },
        mQdocThree: { _id: 'doc3' },
        mQdocFour: { _id: 'doc4' },
        passportSizePhoto: { _id: 'photo1' },
        myKad: { _id: 'mykad1' },
        gender: 'M',
      },
    })

    t.equal(response.statusCode, 200)
    t.same(JSON.parse(response.payload), {
      message: 'User created successfully. Please wait for admin approval',
      user: { _id: 'user-id', userName: 'testUser' },
    })
  })

  t.end()
})
