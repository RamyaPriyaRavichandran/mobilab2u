import { FastifyReply, FastifyRequest } from 'fastify'
import { WithdrawWalletBody } from '../types/withdraw_wallet_body'
import { ACTIONS, ROLES, SUBJECTS } from '../lib/permissions'
import {
  APPROVAL_STATUS,
  CUSTOMER_CONSULTATION_STATUS,
  CUSTOMER_LAB_TEST_STATUS,
  models,
  OTP_AUTH_OPTIONS,
  PACKAGE_TYPE,
} from '../constants'
import bcrypt from 'bcrypt'
import walletRedeemModel from '../models/wallet.redeem.model'
import successMessage from '../constants/success-messages'
import walletModel from '../models/wallet.model'
import errorMessage from '../constants/error-messages'
import otpModel from '../models/otp.model'
import walletHistoryModel from '../models/wallet.history.model'
import { generateOTP, getMinutesDiffBetweenTwoDates } from '../utils'
import { ADMIN_INFO_EMAIL, NODE_ENV } from '../plugins/env'
import { Document } from 'mongoose'
import { walletHistoryQuery } from '../mongo-queries/wallet'
import labTestModel from '../models/lab.test.model'
import { countByDateAndMonthAndYear } from '../mongo-queries'
import appointmentModel from '../models/appointment.model'

export const redeemWallet = async (
  req: FastifyRequest<{ Body: WithdrawWalletBody }>,
  reply: FastifyReply,
) => {
  req.requireAccess(ACTIONS.WITHDRAW_AMOUNT, SUBJECTS.Wallet)
  const CurrentModel = models[req.user.userRole]
  if (!req.body.otp) {
    return reply.notFound(errorMessage.OTP_NOT_FOUND)
  }
  const user = await CurrentModel.findById({ _id: req.user._id })
  if (!user) {
    return reply.notFound(errorMessage.USER_NOT_FOUND)
  }

  const emailOtp = await otpModel.findOne({
    email: req.user.email,
    userRole: req.user.userRole,
    type: OTP_AUTH_OPTIONS.WALLET_REDEEM,
  })
  if (!req.body.otp || !emailOtp) {
    return reply.notFound(errorMessage.VERIFY_EMAIL)
  }
  if (
    getMinutesDiffBetweenTwoDates(new Date(emailOtp.currentDate), NODE_ENV) > 5
  ) {
    return reply.notFound(errorMessage.VERIFICATION_CODE_EXPIRED)
  }
  const validEmailCode = await bcrypt.compare(req.body.otp, emailOtp.otp)
  if (!validEmailCode) {
    return reply.unauthorized(errorMessage.VERIFICATION_CODE_NOT_MATCH)
  }

  const wallet = await walletModel.findOne({
    userId: req.user._id,
    userRole: req.user.userRole,
  })
  if (!wallet) {
    return reply.notExtended(errorMessage.WALLET_BALANCE_NOT_FOUND)
  }
  if (!req.body.withdrawAmount) {
    return reply.notFound(errorMessage.WITHDRAW_AMOUNT_IS_REQUIRED)
  }
  if (Number(req.body.withdrawAmount) > wallet?.walletBalance) {
    return reply.notExtended(errorMessage.WALLET_WITHDRAWAL_ERROR)
  }
  const walletBody = {
    userRole: req.user.userRole,
    name: req.user.name,
    wallet: wallet._id,
    userId: wallet.userId,
    withdrawAmount: req.body.withdrawAmount,
    walletBalance: wallet?.walletBalance - Number(req.body.withdrawAmount),
    status: APPROVAL_STATUS.PENDING,
    createdDate: new Date(),
  }
  await walletModel.findOneAndUpdate(
    {
      userId: req.user._id,
      userRole: req.user.userRole,
    },
    {
      walletBalance: wallet?.walletBalance - Number(req.body.withdrawAmount),
    },
    {
      new: true,
    },
  )
  const createdWallet = await walletRedeemModel.create(walletBody)

  const walletHistory = {
    userId: req.user._id,
    userRole: req.user.userRole,
    debitedAmount: req.body.withdrawAmount,
    createdDate: new Date(),
    type: PACKAGE_TYPE.WALLET_REDEEM_REQUEST,
    status: APPROVAL_STATUS.APPROVED,
    walletBalance: wallet?.walletBalance - Number(req.body.withdrawAmount),
  }
  await walletHistoryModel.create(walletHistory)
  await otpModel.deleteOne({
    email: req.user.email,
    userRole: req.user.userRole,
    type: OTP_AUTH_OPTIONS.WALLET_REDEEM,
  })

  const mailPayload = {
    to: req.user.email,
    data: {
      name: req.user.name,
      amount: req.body.withdrawAmount,
    },
    template: 'wallet-withdrawal-request',
    subject: 'Your Withdrawal is Pending Admin Approval - Mobilab2u',
  }
  const adminMailPayload = {
    to: ADMIN_INFO_EMAIL,
    data: {
      userName: req.user.name,
      role: req.user.userRole,
      withdrawAmount: req.body.withdrawAmount,
    },
    template: 'wallet-withdrawal-request.admin',
    subject: 'New Wallet Withdrawal Request - Mobilab2u',
  }
  await req.sendMail(mailPayload)
  await req.sendMail(adminMailPayload)
  return reply.send({
    message: successMessage.WALLET_WITHDRAWAL_REQUEST_SENT,
    createdWallet,
  })
}

export const reviewRedeemWalletRequest = async (
  req: FastifyRequest<{
    Params: { id: string }
    Body: { status: string; declineNote: string; walletId: string }
  }>,
  reply: FastifyReply,
) => {
  req.requireAccess(ACTIONS.REVIEW, SUBJECTS.Wallet)
  if (!req.body.walletId) {
    return reply.notFound(errorMessage.WALLET_ID_NOT_FOUND)
  }
  const walletWithdrawalRequest = await walletRedeemModel
    .findById({ _id: req.body.walletId })
    .populate('wallet')
  if (!walletWithdrawalRequest) {
    return reply.notFound(errorMessage.WALLET_REDEEM_REQUEST_NOT_FOUND)
  }
  if (walletWithdrawalRequest.status === APPROVAL_STATUS.APPROVED) {
    return reply.conflict(errorMessage.WALLET_REDEEM_REQUEST_ALREADY_APPROVED)
  }
  const currentUserModel = models[walletWithdrawalRequest.userRole]

  const user = await currentUserModel.findById({
    _id: walletWithdrawalRequest.userId,
  })

  let walletDetail = walletWithdrawalRequest.wallet || {}
  if (!walletWithdrawalRequest) {
    return reply.notFound(errorMessage.WALLET_WITHDRAWAL_DETAIL_NOT_FOUND)
  }

  if (req.body.status === APPROVAL_STATUS.DECLINED) {
    await walletRedeemModel.findByIdAndUpdate(
      { _id: req.body.walletId },
      { status: req.body.status, declineNote: req.body.declineNote },
    )
    walletDetail = await walletModel.findOneAndUpdate(
      { _id: walletDetail._id, userId: walletWithdrawalRequest.userId },
      {
        walletBalance:
          walletDetail?.walletBalance + walletWithdrawalRequest.withdrawAmount,
      },
      { new: true },
    )
    const walletHistory = {
      userId: walletWithdrawalRequest.userId,
      userRole: walletWithdrawalRequest.userRole,
      earningAmount: walletWithdrawalRequest.withdrawAmount,
      createdDate: new Date(),
      type: PACKAGE_TYPE.WALLET_REDEEM_REQUEST_DECLINE,
      status: APPROVAL_STATUS.APPROVED,
      walletBalance:
        walletWithdrawalRequest?.wallet?.walletBalance +
        walletWithdrawalRequest.withdrawAmount,
    }
    await walletHistoryModel.create(walletHistory)
  }
  if (req.body.status === APPROVAL_STATUS.APPROVED) {
    await walletRedeemModel.findByIdAndUpdate(
      { _id: walletWithdrawalRequest._id },
      {
        status: req.body.status,
        approvedDate: new Date(),
      },
    )
  }

  const template: Record<string, string> = {
    APPROVED: 'approve-wallet-withdrawal',
    DECLINED: 'decline-wallet-withdrawal',
  }
  const subject: Record<string, string> = {
    APPROVED: ' Money on the way! Your Withdrawal is Approved - Mobilab2u',
    DECLINED: 'A quick heads-up about your withdrawal request - Mobilab2u',
  }
  const mailPayload = {
    to: user.email,
    data: {
      name: user.name,
      withdrawalAmount: walletWithdrawalRequest.withdrawAmount,
      walletBalance: walletDetail?.walletBalance,
      declineNote: req.body.declineNote,
    },
    subject: subject[req.body.status],
    template: template[req.body.status],
  }
  await req.sendMail(mailPayload)
  return reply.send({
    message: `Wallet withdrawal request ${subject[req.body.status]}`,
  })
}

export const getRedeemWalletDetail = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) => {
  req.requireAccess(ACTIONS.VIEW, SUBJECTS.Wallet)
  if (!req.params.id) {
    return reply.notFound(errorMessage.WALLET_ID_NOT_FOUND)
  }
  const walletWithdrawalRequest = await walletRedeemModel.findById({
    _id: req.params.id,
  })
  if (!walletWithdrawalRequest) {
    return reply.notFound(errorMessage.WALLET_WITHDRAWAL_DETAIL_NOT_FOUND)
  }
  const currentUserModel = models[walletWithdrawalRequest.userRole]
  const user = await currentUserModel.findById({
    _id: walletWithdrawalRequest.userId,
  })
  return reply.send({ walletWithdrawalRequest, user })
}

export const getRedeemWalletDetails = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  req.requireAccess(ACTIONS.VIEW_ALL, SUBJECTS.Wallet)
  const walletWithdrawalRequest = await walletRedeemModel.find({})
  return reply.send(walletWithdrawalRequest)
}

interface OTPModel extends Document {
  email: string
  userRole: string
  type: string
  otpCount: number
  otp: string
  currentDate: Date
}
export const sendOTPToAuthenticatedUserEmail = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  req.requireAccess(ACTIONS.WITHDRAW_AMOUNT, SUBJECTS.Wallet)

  const CurrentUserModel = models[req.user.userRole]
  const existingUserData = await CurrentUserModel.findOne({
    email: req.user.email,
  })
  if (!existingUserData) {
    return reply.conflict(errorMessage.USER_NOT_FOUND)
  }
  const otpData = await otpModel.findOne({
    email: existingUserData.email,
    userRole: existingUserData.userRole,
    type: OTP_AUTH_OPTIONS.WALLET_REDEEM,
  })
  let otpMain = otpData || new otpModel()
  async function otpSave(model: OTPModel, count: number, otp: string) {
    model.email = req.user.email
    model.userRole = req.user.userRole
    model.type = OTP_AUTH_OPTIONS.WALLET_REDEEM
    model.otpCount = count
    model.otp = otp
    model.currentDate = new Date()
    await model.save()
  }
  const mailPayload = (OTP: string) => {
    return {
      to: req.user.email,
      data: {
        customerName: req.user.name,
        code: OTP,
      },
      subject: 'Verify Your Wallet Withdrawal with OTP - Mobilab2u',
      template: 'wallet-withdrawal-otp',
    }
  }
  if (
    (existingUserData?.emailOtpEnteredDate &&
      getMinutesDiffBetweenTwoDates(
        new Date(existingUserData.emailOtpEnteredDate),
        NODE_ENV,
      ) >= 60) ||
    !existingUserData?.emailOtpEnteredDate
  ) {
    const { encryptedOTP, OTP } = await generateOTP()

    await otpSave(otpMain, 2, encryptedOTP)
    await CurrentUserModel.findOneAndUpdate(
      {
        email: req.user.email,
        userRole: req.user.userRole,
      },
      {
        emailOtpCount: 2,
        emailOtpEnteredDate: new Date(),
      },
    )
    await req.sendMail(mailPayload(OTP))
    return reply.send({
      message: successMessage.OTP_SEND_SUCCESS,
      countLeft: 2,
    })
  }
  if (existingUserData?.emailOtpCount <= 0) {
    return reply.tooManyRequests(errorMessage.OTP_LIMIT_EXCEEDED)
  }
  const { encryptedOTP, OTP } = await generateOTP()
  await otpSave(otpMain, existingUserData?.emailOtpCount - 1, encryptedOTP)
  await CurrentUserModel.findOneAndUpdate(
    {
      email: req.user.email,
      userRole: req.user.userRole,
    },
    { emailOtpCount: existingUserData.emailOtpCount - 1 },
  )
  await req.sendMail(mailPayload(OTP))
  return reply.send({
    message: successMessage.OTP_SEND_SUCCESS,
    countLeft: existingUserData.emailOtpCount - 1,
  })
}

export const userWalletDetails = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  req.requireAccess(ACTIONS.VIEW, SUBJECTS.Wallet)

  let fiteredData: any = {
    userRole: req.user.userRole,
  }
  if (req.user.userRole !== ROLES.SUPER_ADMIN) {
    fiteredData.userId = req.user._id
  }

  const [
    { value: wallet },
    { value: walletWithdrawals },
    { value: walletHistory },
  ]: any = await Promise.allSettled([
    walletModel.findOne(fiteredData),
    walletRedeemModel.find(fiteredData).sort({ createdAt: -1 }),
    walletHistoryModel.aggregate(walletHistoryQuery(fiteredData)),
  ])

  return reply.send({
    wallet,
    walletWithdrawals,
    walletHistory,
  })
}

export const appointmentAndTestCounts = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const testCompleted = {
    $elemMatch: { status: CUSTOMER_LAB_TEST_STATUS.TEST_COMPLETED },
  }
  let testMatch: any = {
    statusTransaction: testCompleted,
  }
  if (req.user.userRole === ROLES.CUSTOMER) {
    testMatch.customer = req.user._id
  }
  if (req.user.userRole === ROLES.SERVICE_PROVIDER) {
    testMatch.approvedServiceProvider = req.user._id
  }
  if (req.user.userRole === ROLES.LAB_USER) {
    testMatch.submittedLab = req.user._id
  }
  let appointmentMatch: any = {
    status: CUSTOMER_CONSULTATION_STATUS.COMPLETED,
  }
  if (req.user.userRole === ROLES.CUSTOMER) {
    appointmentMatch.customer = req.user._id
  }
  if (req.user.userRole === ROLES.GP_PARTNER) {
    appointmentMatch.approvedDoctor = req.user._id
  }

  const [
    {
      value: [labTests],
    },
    {
      value: [appointments],
    },
  ]: any = await Promise.allSettled([
    req.user.userRole === ROLES.GP_PARTNER
      ? []
      : labTestModel.aggregate(
          countByDateAndMonthAndYear('followupLabTests', testMatch),
        ),
    req.user.userRole === ROLES.SERVICE_PROVIDER
      ? []
      : appointmentModel.aggregate(
          countByDateAndMonthAndYear('followupAppointments', {
            appointmentMatch,
          }),
        ),
  ])

  return reply.send({
    labTests,
    appointments,
  })
}
