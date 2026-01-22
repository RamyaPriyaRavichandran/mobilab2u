import dotenv from 'dotenv'
import {
  convertTimeStringToMalaysiaDate,
  convertTimeTODate,
  getCurrentHour,
  getCurrentTime,
  getDate,
  getMalaysiaNow,
  getMinsDiffBetweenTwoDates,
  getMinutesDiff,
  getTimeDiff,
  getTimeDiffBetweenCurrentTimeAndAppTime,
  sliceDate,
} from './functions.js'
import {
  findAppointmentsCollection,
  findCustomerTests,
} from './db.collections.js'
import Queue from 'bull'
import { EMAIL_CONTENTS, QUEUEING_OPTIONS } from './constants.js'

dotenv.config()
const {
  REDIS_DB,
  FRONTEND_URL,
  MONGO_CONNECTION_STRING,
  NODE_ENV,
  APPOINTMENT_REMAINDER_CUSTOMER,
  APPOINTMENT_REMAINDER_DOCTOR,
  HSP_REMAINDER_FOR_BLOOD_TEST,
} = process.env
const remainderQueue = new Queue('remainder-queue', REDIS_DB)

export async function testNotifications() {
  try {
    if (!MONGO_CONNECTION_STRING || !REDIS_DB || !FRONTEND_URL) {
      return 'Environment variables not found'
    }
    const customerTests = await findCustomerTests()
    if (customerTests.length > 0) {
      for (const ct of customerTests) {
        const { totalMinutes, hourDiff } = getTimeDiff(
          ct.customerAppointmentTime,
          getCurrentTime(),
        )
        const needHourDiff = hourDiff === 0 || hourDiff === -1
        if (needHourDiff && totalMinutes >= 20 && totalMinutes <= 30) {
          const date = sliceDate(ct.customerAppointmentDate)
          await Promise.allSettled([
            remainderQueue.add({
              queue: QUEUEING_OPTIONS.EMAIL,
              to: 'mobilab2u@gmail.com',
              data: {
                text: `${ct.approvedServiceProvider.name} Health service provider didn't collected sample from ${ct.customer.name} customer`,
                date: date,
                time: ct.customerAppointmentTime,
                appURL: `${FRONTEND_URL}/lab-tests/${ct._id}`,
              },
              ...EMAIL_CONTENTS.CUSTOMER_TEST_REMAINDER(),
            }),
            remainderQueue.add({
              queue: QUEUEING_OPTIONS.WHATSAPP,
              to: ct.approvedServiceProvider.phone,
              variables: JSON.stringify({
                cname: ct.customer.name,
                hspname: ct.approvedServiceProvider.name,
                timediff: `${totalMinutes}`,
                time: ct.customerAppointmentTime,
                date: date,
              }),
              template: HSP_REMAINDER_FOR_BLOOD_TEST,
            }),
          ])
        }

        if (hourDiff === 1 && totalMinutes > 40 && totalMinutes <= 60) {
          const date = sliceDate(ct.customerAppointmentDate)
          await Promise.allSettled([
            remainderQueue.add({
              queue: QUEUEING_OPTIONS.EMAIL,
              to: ct.customer?.email,
              data: {
                text: `Health service provider will collect your blood sample at ${ct.customerAppointmentTime} on ${date}`,
                date: date,
                time: ct.customerAppointmentTime,
                appURL: `${FRONTEND_URL}/lab-tests/${ct._id}`,
              },
              ...EMAIL_CONTENTS.CUSTOMER_TEST_REMAINDER(),
            }),
            remainderQueue.add({
              queue: QUEUEING_OPTIONS.EMAIL,
              to: ct.approvedServiceProvider?.email,
              data: {
                text: `Dear health service provider, Please collect blood sample from ${ct.customer.name} customer at ${ct.customerAppointmentTime} on ${date}`,
                date: date,
                time: ct.customerAppointmentTime,
                appURL: `${FRONTEND_URL}/lab-tests/${ct._id}`,
              },
              ...EMAIL_CONTENTS.CUSTOMER_TEST_REMAINDER(
                'Customer test remainder Health Service Provider - Mobilab2u',
              ),
            }),
          ])
        }
      }
    }
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return error?.message
  }
}

export async function appointmentNotifications() {
  try {
    if (!MONGO_CONNECTION_STRING || !REDIS_DB || !FRONTEND_URL) {
      return 'Environment variables not found'
    }
    const appointments = await findAppointmentsCollection()

    if (appointments.length > 0) {
      for (const app of appointments) {
        const { totalMinutes, hourDiff } = getTimeDiff(
          app.selectedTimeSlot.startTime,
          getCurrentTime(),
        )
        const needHourDiff = hourDiff === 0 || hourDiff === -1
        if (hourDiff === 1 && totalMinutes > 40 && totalMinutes <= 60) {
          await Promise.allSettled([
            remainderQueue.add({
              queue: QUEUEING_OPTIONS.EMAIL,
              to: app.customer?.email,
              data: {
                text: `Your appointment has been scheduled for ${sliceDate(
                  app.appointmentDate,
                )}`,
                date: sliceDate(app.appointmentDate),
                name: app.customer?.name,
                sTime: app.selectedTimeSlot?.startTime,
                eTime: app.selectedTimeSlot?.endTime,
                appURL: `${FRONTEND_URL}/appointments/${app._id}`,
              },
              template: 'appointment-remainder',
              subject: 'Appointment Remainder - Mobilab2u',
            }),

            remainderQueue.add({
              queue: QUEUEING_OPTIONS.EMAIL,
              to: app.approvedDoctor?.email,
              data: {
                text: `Your appointment has been scheduled for ${sliceDate(
                  app.appointmentDate,
                )}`,
                date: sliceDate(app.appointmentDate),
                name: app.approvedDoctor.name,
                sTime: app.selectedTimeSlot.startTime,
                eTime: app.selectedTimeSlot.endTime,
                appURL: `${FRONTEND_URL}/appointments/${app._id}`,
              },
              ...EMAIL_CONTENTS.APPOINTMENT_REMAINDER,
            }),
            remainderQueue.add({
              queue: QUEUEING_OPTIONS.WHATSAPP,
              to: app.customer?.phone,
              template: APPOINTMENT_REMAINDER_CUSTOMER,
              variables: JSON.stringify({
                cname: app.customer.name || 'customer name',
                doctorname: app.approvedDoctor.name || 'doctor name',
                date: sliceDate(app.appointmentDate),
                time: `${app.selectedTimeSlot?.startTime} - ${app.selectedTimeSlot?.endTime}`,
                link: `${FRONTEND_URL}/appointments/${app._id}`,
              }),
            }),
            remainderQueue.add({
              queue: QUEUEING_OPTIONS.WHATSAPP,
              to: app.approvedDoctor?.phone,
              template: APPOINTMENT_REMAINDER_DOCTOR,
              variables: JSON.stringify({
                doctorname: app.approvedDoctor?.name,
                date: sliceDate(app.appointmentDate),
                time: `${app.selectedTimeSlot?.startTime} - ${app.selectedTimeSlot?.endTime}`,
                link: `${FRONTEND_URL}/appointments/${app._id}`,
              }),
            }),
          ])
        } else if (needHourDiff && totalMinutes <= 20) {
          await Promise.allSettled([
            remainderQueue.add({
              queue: QUEUEING_OPTIONS.EMAIL,
              to: 'mobilab2u@gmail.com',
              data: {
                date: sliceDate(app.appointmentDate),
                customer: app.customer?.name,
                doctor: app.approvedDoctor.name,
                sTime: app.selectedTimeSlot?.startTime,
                eTime: app.selectedTimeSlot?.endTime,
                appURL: `${FRONTEND_URL}/appointments/${app._id}`,
              },
              ...EMAIL_CONTENTS.APPOINTMENT_REMAINDER_ADMIN,
            }),
          ])
        }
      }
      console.log('All appointment notifications processed')
    } else {
      console.log('No appointments found for tomorrow')
      return 'No appointments found'
    }
  } catch (error) {
    console.error('Error in appointmentNotifications:', error)
    throw error
  }
}
