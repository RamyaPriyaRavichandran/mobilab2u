import bcrypt from 'bcrypt'
import type { FastifyReply, FastifyRequest } from 'fastify'
import permissionModel from '../models/permission.model'
import rolesModel from '../models/roles.model'
import { FRONTEND_URL, NODE_ENV, type ENVSchema } from '../plugins/env'
import type { LoginBodySchema } from '../types/login_body'
import type { SPRegisterSchema } from '../types/sp_register_body'
import otpModel from '../models/otp.model'
import otpGenerator from 'otp-generator'
import forgotPasswordModel from '../models/forgot.password.model'
import errorMessage from '../constants/error-messages'
import { ROLES } from '../lib/permissions'
import {
  APPROVAL_STATUS,
  COUNTER_TYPE,
  COUNTRY,
  HSP_STATUS,
  models,
  OTP_AUTH_OPTIONS,
  PAYMENT_STATUS,
  REFRESH_TOKEN,
} from '../constants'
import { CustomerRegisterSchema } from '../types/customer_register_body'
import customerModel from '../models/customer.model'
import refreshtokenModel from '../models/refreshtoken.model'
import counterModel from '../models/counter.model'
import successMessage from '../constants/success-messages'
import { generateOTP, getMinutesDiffBetweenTwoDates } from '../utils'
import { Document } from 'mongoose'
import { EMAIL_CONTENTS } from '../constants/email-contents'
import { Docs } from '../types/register_body'
import { Otp } from '../types/otp'
interface registerValidationCheck {
  emailCode: string
  email: string
  otp: boolean
  userRole: string
  roles: string
}
interface OTPModel extends Document {
  email: string
  userRole: string
  type: string
  number: string
  otpCount: number
  otp: string
  currentDate: Date
}

export const registerValidationCheck = async (
  req: FastifyRequest<{
    Body: SPRegisterSchema & registerValidationCheck & Docs
  }>,
  reply: FastifyReply,
) => {
  if (!req.body.emailCode) {
    return reply.notFound(errorMessage.EMAIL_CODE_NOT_FOUND)
  }
  const CurrentUserModel = models[req.body.roles]
  const existingUserData = await CurrentUserModel.findOne({
    email: req.body.email,
  })
  if (existingUserData) {
    return reply.conflict(errorMessage.EMAIL_ALREADY_EXISTING_USER)
  }

  const emailOtp = (await otpModel.findOne({
    email: req.body.email,
    userRole: req.body.roles,
    type: OTP_AUTH_OPTIONS.REGISTER,
  })) as Otp | null

  if (!req.body.otp || !emailOtp) {
    return reply.notFound(errorMessage.VERIFY_EMAIL)
  }
  if (
    getMinutesDiffBetweenTwoDates(new Date(emailOtp.currentDate), NODE_ENV) >= 5
  ) {
    return reply.notFound(errorMessage.VERIFICATION_CODE_EXPIRED)
  }
  const validEmailCode = bcrypt.compareSync(req.body.emailCode, emailOtp.otp)
  if (!validEmailCode) {
    return reply.unauthorized(errorMessage.VERIFICATION_CODE_NOT_MATCH)
  }
}

export const sendOtpFromEmail = async (
  req: FastifyRequest<{ Body: { email: string; userRole: string } }>,
  reply: FastifyReply,
) => {
  const CurrentUserModel = models[req.body.userRole]
  const existingUserData = await CurrentUserModel.findOne({
    email: req.body.email,
  })
  if (existingUserData) {
    return reply.conflict(errorMessage.EMAIL_ALREADY_EXISTING_USER)
  }
  const otpData = await otpModel.findOne({
    email: req.body.email,
    userRole: req.body.userRole,
    type: OTP_AUTH_OPTIONS.REGISTER,
  })
  let otpMain = otpData || new otpModel()

  async function otpSave(model: OTPModel, count: number, otp: string) {
    model.email = req.body.email
    model.userRole = req.body.userRole
    model.type = OTP_AUTH_OPTIONS.REGISTER
    model.otpCount = count
    model.otp = otp
    model.currentDate = new Date()
    await model.save()
  }
  const mailPayload = (OTP: string) => {
    return {
      to: req.body.email,
      data: {
        email: req.body.email,
        code: OTP,
        text: "Once you've successfully verified your email address, you'll be able to complete the registration and continue with your application process.",
      },
      ...EMAIL_CONTENTS.VERIFY_EMAIL,
    }
  }
  if (
    (existingUserData?.emailOtpEnteredDate &&
      getMinutesDiffBetweenTwoDates(
        new Date(otpData.emailOtpEnteredDate),
        NODE_ENV,
      ) >= 60) ||
    !existingUserData?.emailOtpEnteredDate ||
    !otpMain.otpCount
  ) {
    const { encryptedOTP, OTP } = await generateOTP()
    console.log('OTP', OTP)
    otpMain = await otpSave(otpMain, 2, encryptedOTP)
    await CurrentUserModel.findOneAndUpdate(
      {
        email: req.body.email,
        userRole: req.body.userRole,
      },
      {
        emailOtpCount: 2,
        emailOtpEnteredDate: new Date(),
      },
      { new: true },
    )
    await req.sendMail(mailPayload(OTP))
    return reply.send({
      message: successMessage.OTP_SEND_SUCCESS,
      countLeft: 2,
    })
  }

  const { encryptedOTP, OTP } = await generateOTP()
  console.log('OTP', OTP)
  otpMain = await otpSave(otpMain, otpMain.otpCount - 1, encryptedOTP)
  await CurrentUserModel.findOneAndUpdate(
    {
      email: req.body.email,
      userRole: req.body.userRole,
    },
    { emailOtpCount: existingUserData.emailOtpCount - 1 },
  )
  await req.sendMail(mailPayload(OTP))
  return reply.send({
    message: successMessage.OTP_SEND_SUCCESS,
    countLeft: otpMain.otpCount - 1,
  })
}

export const sendOtpFromPhone = async (
  req: FastifyRequest<{ Body: { phone: number } }>,
  reply: FastifyReply,
) => {
  const CurrentUserModel = models[req.user.userRole]
  if (!req.body.phone) {
    return reply.badRequest(errorMessage.PHONE_NUMBER_IS_REQUIRED)
  }
  let UserData = await CurrentUserModel.findOne({
    email: req.user.email,
    userRole: req.user.userRole,
  })
  async function otpSave(model: OTPModel, count: number, otp: string) {
    model.number = `${req.body.phone}`
    model.userRole = req.user.userRole
    model.type = OTP_AUTH_OPTIONS.UPDATE
    model.otpCount = count
    model.otp = otp
    model.currentDate = new Date()
    await model.save()
  }
  if (!UserData) {
    return reply.notFound(errorMessage.USER_NOT_FOUND)
  }
  const otpData = await otpModel.findOne({
    number: UserData.phone,
    userRole: UserData.userRole,
    type: OTP_AUTH_OPTIONS.UPDATE,
  })
  let otpMain = otpData || new otpModel()
  if (
    (UserData?.phoneOtpEnteredDate &&
      getMinutesDiffBetweenTwoDates(
        new Date(UserData.phoneOtpEnteredDate),
        NODE_ENV,
      ) >= 60) ||
    !UserData?.phoneOtpEnteredDate ||
    otpMain.otpCount === undefined ||
    otpMain.otpCount === null
  ) {
    const { encryptedOTP, OTP } = await generateOTP()
    await otpSave(otpMain, 2, encryptedOTP)
    UserData = await CurrentUserModel.findOneAndUpdate(
      {
        email: req.user.email,
        userRole: req.user.userRole,
      },
      {
        phoneOtpCount: 2,
        phoneOtpEnteredDate: new Date(),
      },
    )
    await req.sendTextMessage(
      req.body.phone,
      `Your OTP is ${OTP}. Please use this code to verify your phone number.`,
    )
    return reply.send({
      message: successMessage.OTP_SEND_SUCCESS_TO_PHONE,
      countLeft: 2,
    })
  }

  if (UserData?.phoneOtpCount <= 0) {
    return reply.tooManyRequests(errorMessage.OTP_LIMIT_EXCEEDED)
  }
  const { encryptedOTP, OTP } = await generateOTP()
  await otpSave(otpMain, UserData.phoneOtpCount - 1, encryptedOTP)
  await req.sendTextMessage(
    req.body.phone,
    `Your OTP is ${OTP}. Please use this code to verify your phone number.`,
  )
  await CurrentUserModel.findOneAndUpdate(
    {
      email: req.user.email,
      userRole: req.user.userRole,
    },
    {
      phoneOtpCount: Number(UserData.phoneOtpCount || 0) - 1,
    },
  )
  return reply.send({
    message: successMessage.OTP_SEND_SUCCESS_TO_PHONE,
    countLeft: (UserData.phoneOtpCount || 0) - 1,
  })
}

export const spRegister = async (
  req: FastifyRequest<{
    Body: SPRegisterSchema & Docs
  }>,
  reply: FastifyReply,
) => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(req.body.password, salt)
  const serviceProviderPayload = {
    nricNumber: req.body.nricNumber,
    passportNumber: req.body.passportNumber,
    idProof: req.body.idProof,
    password: hash,
    userRole: req.body.roles,
    name: req.body.userName,
    gender: req.body.gender,
    other: req.body.other,
    email: req.body.email,
    city: req.body.city,
    country: COUNTRY.MALAYSIA,
    lat: req.body.lat,
    lng: req.body.lng,
    language: req.body.language,
    state: req.body.state,
    address2: req.body.address2,
    address: req.body.address,
    registerNumber: req.body.registerNumber,
    postCode: req.body.postCode,
    phone: Number(req.body.phone),
    medicalQualification: req.body.medicalQualification,
    adminApprovalStatus: APPROVAL_STATUS.PENDING,
    paymentStatus: PAYMENT_STATUS.PENDING,
    mQdocOne: req.body.mQdocOne._id,
    mQdocTwo: req.body.mQdocTwo._id,
    mQdocThree: req.body.mQdocThree?._id,
    eSign: req.body.eSign?._id,
    mQdocFour: req.body.mQdocFour?._id,
    passportSizePhoto: req.body.passportSizePhoto?._id,
    myKad: req.body.myKad?._id,
  }
  const currentModel = models[req.body.roles]
  const user = await currentModel.create(serviceProviderPayload)

  const mailPayload = {
    to: user.email,
    data: {
      name: user.name,
    },
    ...EMAIL_CONTENTS.SP_REGISTER_SUCCESS,
  }

  const category = {
    SERVICE_PROVIDER: 'Service Provider',
    GP_PARTNER: 'GP Partner',
  }

  const recruitmentEmail: Record<string, string> = {
    production: 'mobilab2u@gmail.com',
    development: 'recruitment.mobilab2u@gmail.com',
    local: 'developer.sanjaikumar@gmail.com',
  }
  const adminPayload = {
    to: recruitmentEmail[NODE_ENV],
    data: {
      category: category[req.body.roles],
    },
    ...EMAIL_CONTENTS.REGISTER_NOTIFICATION_ADMIN,
  }
  await Promise.allSettled([
    otpModel.deleteOne({
      email: req.body.email,
      userRole: req.body.roles,
      type: OTP_AUTH_OPTIONS.REGISTER,
    }),
    req.sendMail(mailPayload),
    req.sendMail(adminPayload),
  ])

  return reply.send({
    message: successMessage.USER_CREATE_SUCCESS,
    user,
  })
}

export const getLoggedInUserData = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const CurrentUserModel = models[req.user.userRole]
  const users = await CurrentUserModel.findById({ _id: req.user._id }).populate(
    'passportSizePhoto',
  )
  reply.send(users)
}

export const customerRegister = async (
  req: FastifyRequest<{
    Body: CustomerRegisterSchema
  }>,
  reply: FastifyReply,
) => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(req.body.password, salt)
  const existingCustomer = await customerModel.findOne({
    email: req.body.email,
  })
  if (existingCustomer) {
    return reply.conflict(errorMessage.EMAIL_ALREADY_EXISTING_USER)
  }
  const existingCounter = await counterModel.findOne({
    counterType: COUNTER_TYPE.CUSTOMER_REGISTRATION_NUMBER,
  })

  const counter = existingCounter || new counterModel()
  const customerPayload = {
    name: req.body.name,
    password: hash,
    email: req.body.email,
    phone: Number(req.body.phone),
    primaryAddress: {
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      postCode: req.body.postCode,
      lat: req.body.lat,
      lng: req.body.lng,
      location: [req.body.lng, req.body.lat],
    },
    country: COUNTRY.MALAYSIA,
    gender: req.body.gender,
    dateOfBirth: req.body.dateOfBirth,
    registrationNumber: counter.incrementNumber,
    lat: Number(req.body.lat),
    lng: Number(req.body.lng),
    nricNumber: req.body.nricNumber,
    passportNumber: req.body.passportNumber,
    idProof: req.body.idProof,
    userRole: ROLES.CUSTOMER,
  }
  const createdCustomer = await customerModel.create(customerPayload)
  counter.incrementNumber = counter.incrementNumber + 1
  counter.counterType = COUNTER_TYPE.CUSTOMER_REGISTRATION_NUMBER
  await counter.save()
  await otpModel.deleteOne({
    email: req.body.email,
    userRole: req.body.roles,
    type: OTP_AUTH_OPTIONS.REGISTER,
  })
  const mailPayload = {
    to: createdCustomer.email,
    data: {
      name: createdCustomer.name,
      regCode: createdCustomer.registrationNumber,
    },
    ...EMAIL_CONTENTS.CUSTOMER_REGISTER_SUCCESS,
  }
  await req.sendMail(mailPayload)
  return reply.send({
    message: successMessage.CUSTOMER_REGISTER_SUCCESS,
    createdCustomer,
  })
}

export const login = async (
  req: FastifyRequest<{
    Body: LoginBodySchema
  }>,
  reply: FastifyReply,
) => {
  const { email, password, userRole } = req.body
  const { ACCESS_EXPIRE, REFRESH_EXPIRE } = req.getEnvs<ENVSchema>()

  const CurrentUserModel = models[userRole]
  const user = await CurrentUserModel.findOne({
    email: email,
    userRole: userRole,
  })
  if (!user) {
    return reply.notFound(errorMessage.USER_NOT_FOUND)
  }
  const existingUserAuthData = await refreshtokenModel.findOne({
    userId: user._id,
  })
  const userAuthData = existingUserAuthData || new refreshtokenModel()

  if (
    user.userRole === ROLES.SERVICE_PROVIDER ||
    user.userRole === ROLES.GP_PARTNER
  ) {
    if (user.adminApprovalStatus === APPROVAL_STATUS.PENDING) {
      return reply.badRequest(errorMessage.ADMIN_APPROVAL_NOT_COMPLETED)
    } else if (user.adminApprovalStatus === APPROVAL_STATUS.DECLINED) {
      return reply.badRequest(errorMessage.ADMIN_APPROVAL_DECLINED)
    }
  }
  const deActiveUser =
    user.userRole === ROLES.SERVICE_PROVIDER ||
    user.userRole === ROLES.GP_PARTNER
  if (deActiveUser && user?.activeStatus === HSP_STATUS.DE_ACTIVE) {
    return reply.badRequest(errorMessage.HSP_DE_ACTIVE)
  }
  const passCompare = bcrypt.compareSync(password, user.password)
  if (!passCompare) {
    return reply.unauthorized(errorMessage.INVALID_PASSWORD)
  }

  const tokenData = {
    _id: user._id,
    name: user.name,
    email: user.email,
    userRole: user.userRole,
  }

  const accessToken = await reply.jwtSign(tokenData, {
    expiresIn: ACCESS_EXPIRE,
  })

  const newRefreshToken = await reply.jwtSign(tokenData, {
    expiresIn: REFRESH_EXPIRE,
  })

  const cookieRefreshToken = req.cookies?.refreshToken
  // if refreshToken already there in cookies
  const filteredRefreshTokens = !cookieRefreshToken
    ? userAuthData.refreshTokens
    : userAuthData?.refreshTokens?.filter(
        (rt: string) => rt !== cookieRefreshToken,
      )

  userAuthData.refreshTokens = [
    ...(filteredRefreshTokens as string[]),
    newRefreshToken,
  ]
  // clearing old token
  if (cookieRefreshToken) {
    reply.clearCookie(REFRESH_TOKEN, {
      httpOnly: true,
      sameSite: false,
      secure: true,
    })
  }
  userAuthData.userId = user._id
  userAuthData.userRole = userRole
  await userAuthData.save()

  reply.setCookie(REFRESH_TOKEN, newRefreshToken, {
    maxAge: 10 * 24 * 60 * 60 * 1000, // 2 Day
    httpOnly: true,
    sameSite: false,
  })

  return reply.send({
    message: successMessage.LOGIN_SUCCESS,
    accessToken,
    spRegistrationFee: user.paymentStatus,
  })
}

export const refreshToken = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const { ACCESS_EXPIRE, REFRESH_EXPIRE } = req.getEnvs<ENVSchema>()

  if (!req.cookies?.refreshToken)
    return reply.unauthorized(errorMessage.UN_AUTHORIZED)
  const refreshToken = req.cookies.refreshToken
  const userAuthData = await refreshtokenModel.findOne({
    refreshTokens: {
      $in: [refreshToken],
    },
  })
  if (!userAuthData) {
    return reply.notFound(errorMessage.LOGIN_USER_DATA_NOT_FOUND)
  }

  let refreshTokens
  const CurrentUserModel = models[userAuthData.userRole]
  const user = await CurrentUserModel.findOne({ _id: userAuthData.userId })
  if (!user) {
    return reply.notFound(errorMessage.USER_NOT_FOUND)
  }
  const activationRequiredUser =
    user.userRole === ROLES.SERVICE_PROVIDER ||
    user.userRole === ROLES.GP_PARTNER
  if (activationRequiredUser && user.activeStatus === HSP_STATUS.DE_ACTIVE) {
    return reply.badRequest(errorMessage.HSP_DE_ACTIVE)
  }
  let data
  try {
    data = await req.jwt.verify(refreshToken)
  } catch (error) {
    return reply.unauthorized(errorMessage.REFRESH_TOKEN_EXPIRED)
  }
  if (user.email !== data.email) {
    return reply.unauthorized(errorMessage.FORBIDDEN)
  }
  refreshTokens = userAuthData.refreshTokens.filter(
    (rt: string) => rt !== refreshToken,
  )
  const tokenData = {
    _id: user._id,
    name: user.name,
    email: user.email,
    userRole: user.userRole,
  }

  const accessToken = await reply.jwtSign(tokenData, {
    expiresIn: ACCESS_EXPIRE,
  })

  const newRefreshToken = await reply.jwtSign(tokenData, {
    expiresIn: REFRESH_EXPIRE,
  })
  userAuthData.refreshTokens = [...refreshTokens, newRefreshToken]

  await userAuthData.save()

  reply.setCookie(REFRESH_TOKEN, newRefreshToken, {
    maxAge: 10 * 24 * 60 * 60 * 1000, // 1 Day
    httpOnly: true,
    sameSite: false,
  })
  return reply.send({ accessToken: accessToken })
}

export const getUserTypes = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const roles = await rolesModel.find()
  const userTypes = roles.map((r) => ({
    label: r.roleLabel,
    value: r.roleId,
  }))
  reply.send(userTypes)
}

export const getUserPerms = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const perms = await permissionModel.find({
    roleId: {
      $in: req.user.userRole,
    },
  })

  return reply.send(perms)
}

export const logout = async (req: FastifyRequest, reply: FastifyReply) => {
  const cookies = req.cookies
  if (!cookies?.refreshToken) {
    reply.clearCookie(REFRESH_TOKEN, {
      httpOnly: true,
      sameSite: false,
      secure: true,
    })
    void reply.send({ message: errorMessage.USER_LOGGED_OUT })
  }
  const refreshToken = cookies.refreshToken
  const userAuthData = await refreshtokenModel.findOne({
    refreshTokens: refreshToken,
  })
  if (!userAuthData) {
    reply.clearCookie(REFRESH_TOKEN, {
      httpOnly: true,
      sameSite: false,
      secure: true,
    })
    return reply.send({ message: errorMessage.USER_LOGGED_OUT })
  } else {
    userAuthData.refreshTokens = userAuthData.refreshTokens.filter(
      (rt: string) => rt !== refreshToken,
    )

    await userAuthData.save()

    reply.clearCookie(REFRESH_TOKEN, {
      httpOnly: true,
      sameSite: false,
      secure: true,
    })

    return reply.send({
      message: errorMessage.USER_LOGGED_OUT,
    })
  }
}

export const forgotPassword = async (
  req: FastifyRequest<{
    Body: { email: string; userRole: string }
  }>,
  reply: FastifyReply,
) => {
  const CurrentUserModel = models[req.body.userRole]
  const user = await CurrentUserModel.findOne({ email: req.body.email })
  if (!user) {
    return reply.notFound(errorMessage.USER_NOT_FOUND)
  }
  const existingForgotPasswordData = await forgotPasswordModel.findOne({
    email: user.email,
  })
  const token = otpGenerator.generate(25, {
    digits: true,
    lowerCaseAlphabets: true,
    upperCaseAlphabets: true,
    specialChars: false,
  })

  const payload = {
    email: req.body.email,
    userId: user._id,
    passwordResetToken: token,
    userRole: req.body.userRole,
  }

  if (!existingForgotPasswordData) {
    const passwordData = new forgotPasswordModel()
    req.addDataToModel(payload, passwordData)
    await passwordData.save()
  } else {
    req.addDataToModel(payload, existingForgotPasswordData)
    await existingForgotPasswordData.save()
  }
  const mailPayload = {
    to: user.email,
    data: {
      name: user.name,
      frontEndUrl: `${FRONTEND_URL}/user/forgot-password?token=${token}`,
    },
    ...EMAIL_CONTENTS.FORGOT_PASSWORD,
  }

  await req.sendMail(mailPayload)

  void reply.send({
    message: successMessage.FORGOT_PASSWORD_SUCCESS,
    token,
  })
}

export const changePassword = async (
  req: FastifyRequest<{
    Body: { passwordResetToken: string; password: string }
  }>,
  reply: FastifyReply,
) => {
  const tokenData = await forgotPasswordModel.findOne({
    passwordResetToken: req.body.passwordResetToken,
  })
  if (!tokenData) {
    return reply.notFound(errorMessage.CHANGE_PASSWORD_ERROR)
  }

  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(req.body.password, salt)
  const UserModel = models[tokenData.userRole]
  await UserModel.findOneAndUpdate(
    { _id: tokenData.userId },
    { password: hash },
  )

  return reply.send({
    message: successMessage.CHANGE_PASSWORD_SUCCESS,
  })
}

export const resetPassword = async (
  req: FastifyRequest<{
    Body: { password: string; currentPassword: string }
  }>,
  reply: FastifyReply,
) => {
  const CurrentUserModel = models[req.user.userRole]
  const user = await CurrentUserModel.findOne({ _id: req.user._id })
  if (!user) {
    return reply.notFound(errorMessage.USER_NOT_FOUND)
  }
  const passCompare = bcrypt.compareSync(
    req.body.currentPassword,
    user.password,
  )
  if (!passCompare) {
    return reply.unauthorized(errorMessage.INVALID_CURRENT_PASSWORD)
  }

  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(req.body.password, salt)
  await CurrentUserModel.findOneAndUpdate(
    { _id: req.user._id },
    { password: hash },
  )
  void reply.send({
    message: successMessage.PASSWORD_RESET_SUCCESS,
  })
}
