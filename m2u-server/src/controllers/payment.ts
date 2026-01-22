import { FastifyReply, FastifyRequest } from 'fastify'
import Stripe from 'stripe'
import serviceProviderModel from '../models/service.provider.model'
import {
  FRONTEND_URL,
  NODE_ENV,
  STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET_KEY,
} from '../plugins/env'
import paymentModel from '../models/payment.model'
import { ROLES } from '../lib/permissions'
import AppointmentModel from '../models/appointment.model'
import {
  HOST,
  PAYMENT_STATUS,
  PAYMENT_TYPE,
  PURCHASED_MEDICINE_STATUS,
  ROUTES,
  SERVER,
} from '../constants'
import medicineModel from '../models/medicine.model'
import {
  customerAppointmentFeesSuccess,
  customerFollowupDoctorAppointmentSuccess,
  customerRandomDoctorFollowupAppointmentSuccess,
} from '../controllers/appointment'
import {
  customerFollowupTestFeesSuccess,
  customerTestFeesSuccess,
} from '../controllers/lab-test'
import medicineOrderModel from '../models/medicine.order.model'
import { EMAIL_CONTENTS } from '../constants/email-contents'
const stripe = new Stripe(STRIPE_SECRET_KEY)

export const webhook = async (req: FastifyRequest, reply: FastifyReply) => {
  const sig = req.headers['stripe-signature'] as string

  const isLocalServer = NODE_ENV === SERVER.LOCAL && req.hostname === HOST.LOCAL
  const isDevServer = NODE_ENV === SERVER.DEV && req.hostname === HOST.DEV
  const isProdServer = NODE_ENV === SERVER.PROD && req.hostname === HOST.PROD
  const isStageServer =
    NODE_ENV === SERVER.STAGING && req.hostname === HOST.STAGING

  if (isLocalServer || isDevServer || isProdServer || isStageServer) {
    const event = stripe.webhooks.constructEvent(
      req.rawBody as string,
      sig,
      STRIPE_WEBHOOK_SECRET_KEY,
    )
    const {
      data: { object },
      type,
    }: Stripe.Event = event

    // Handle the event
    const session = object as Stripe.Checkout.Session
    const metadata = session.metadata as any
    if (type === 'payment_intent.payment_failed') {
      await sessionFailure(metadata)
    }
    if (type === 'checkout.session.completed') {
      if (
        metadata.userRole === ROLES.SERVICE_PROVIDER ||
        metadata.userRole === ROLES.CUSTOMER
      ) {
        const mailPayload = await checkoutSessionSuccess(
          metadata,
          event,
          session,
        )
        await req.sendMail(mailPayload)
        return reply.status(200).send()
      }
    }
  } else {
    return reply.status(200).send()
  }
}

export const createPaymentLink = async (
  email: string,
  metadata = {},
  planDetails: {
    feesName: string
    feesDetail: string
    price: number
  },
  success?: {
    message?: string
    redirect?: string
    redirectLatest?: string
    redirectType?: string
  },
  error?: {
    message?: string
    redirect?: string
  },
) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'myr',
          product_data: {
            name: planDetails.feesName,
            description: planDetails.feesDetail,
          },
          unit_amount: Number(planDetails.price) * 100,
        },
        quantity: 1,
      },
    ],
    metadata,
    customer_email: email,
    mode: 'payment',
    success_url: `${ROUTES.PAYMENT_SUCCESS}?message=${success?.message || ''}&redirect=${success?.redirect}&redirectLatest=${success?.redirectLatest || false}&redirectType=${success?.redirectType || ''}`,
    cancel_url: `${ROUTES.PAYMENT_FAILURE}?message=${error?.message || ''}&redirect=${error?.redirect}`,
    expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
  })
  return session
}

export interface MetaData {
  userRole: string
  paymentType: string
  appointmentId: string
  planId: string
  paymentUserId: string
  doctorId: string
  testId: string
  dbData: string
  medicalRecords: []
}

async function sessionFailure(metadata: MetaData) {
  if (
    metadata.userRole === ROLES.CUSTOMER &&
    metadata.paymentType === PAYMENT_TYPE.APPOINTMENT_FEES
  ) {
    await AppointmentModel.findByIdAndDelete({
      _id: metadata.appointmentId,
    })
  }
}

async function checkoutSessionSuccess(
  metadata: any,
  event: { id: string },
  session: any,
) {
  if (metadata.userRole === ROLES.SERVICE_PROVIDER) {
    await serviceProviderModel.findOneAndUpdate(
      { _id: metadata.paymentUserId },
      {
        paymentStatus: PAYMENT_STATUS.PAID,
        paidKitfeesPrice: session.amount_total / 100,
        actualKitFeesPrice: metadata.actualKitFeesPrice,
      },
    )
  }
  const payment = await paymentModel.create({
    planId: metadata?.planId,
    userId: metadata.paymentUserId,
    sessionId: event.id,
    paymentDate: new Date(),
    amount: session.amount_total / 100,
    paymentStatus: PAYMENT_STATUS.PAID,
    userRole: metadata.userRole,
    paymentType: metadata.paymentType,
  })
  if (metadata.userRole === ROLES.CUSTOMER) {
    switch (metadata.paymentType) {
      case PAYMENT_TYPE.TEST_FEES:
        await customerTestFeesSuccess(metadata, payment)
        break

      case PAYMENT_TYPE.FOLLOWUP_TEST_FEES:
        await customerFollowupTestFeesSuccess(metadata, payment)
        break

      case PAYMENT_TYPE.APPOINTMENT_FEES:
        await customerAppointmentFeesSuccess(metadata, payment)
        break

      case PAYMENT_TYPE.FOLLOWUP_DOCTOR_FOLLOWUP_APPOINTMENT_FEES:
        await customerFollowupDoctorAppointmentSuccess(metadata, payment)
        break

      case PAYMENT_TYPE.RANDOM_DOCTOR_FOLLOWUP_APPOINTMENT_FEES:
        await customerRandomDoctorFollowupAppointmentSuccess(metadata, payment)
        break

      case PAYMENT_TYPE.MEDICINE_FEES:
        await Promise.allSettled([
          medicineOrderModel.create({
            medicine: metadata.medicineId,
            customer: metadata.paymentUserId,
            price: session.amount_total / 100,
            payment: payment._id,
          }),
          medicineModel.findByIdAndUpdate(
            { _id: metadata.medicineId },
            {
              payment: payment._id,
              status: PURCHASED_MEDICINE_STATUS.PURCHASED,
            },
          ),
        ])
        break

      default:
    }
  }

  const mailPayload = {
    to: session.customer_email,
    data: {
      name: metadata.userName,
      price: session.amount_total,
      frontEndUrl: FRONTEND_URL,
    },
    ...EMAIL_CONTENTS.PAYMENT_SUCCESS,
  }
  return mailPayload
}
