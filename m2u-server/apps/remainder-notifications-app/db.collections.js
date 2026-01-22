import { mongoose } from './database.js'
import { formatDateQuery, getQueryFromData, getDate } from './functions.js'

export async function findAppointmentsCollection() {
  try {
    const db = mongoose.connection.db
    const results = await db
      .collection('appointments')
      .aggregate([
        {
          $unionWith: {
            coll: 'followupAppointments',
          },
        },
        {
          $addFields: {
            formattedDate: formatDateQuery('appointmentDate'),
          },
        },

        getQueryFromData('gpPartners', 'approvedDoctor'),
        getQueryFromData('customers', 'customer'),
        {
          $match: {
            formattedDate: getDate(),
            status: 'APPROVED',
            approvedDoctor: { $ne: null },
            customer: { $ne: null },
          },
        },
        {
          $set: {
            customer: { $arrayElemAt: ['$customer', 0] },
            approvedDoctor: { $arrayElemAt: ['$approvedDoctor', 0] },
          },
        },
      ])
      .toArray()

    return results
  } catch (error) {
    console.error('Error fetching appointments:', error)
    throw error
  }
}

export async function findCustomerTests() {
  try {
    const db = mongoose.connection.db
    const results = await db
      .collection('labTests')
      .aggregate([
        {
          $unionWith: {
            coll: 'followupLabTests',
          },
        },
        {
          $addFields: {
            formattedDate: formatDateQuery('customerAppointmentDate'),
          },
        },

        getQueryFromData('serviceProviders', 'approvedServiceProvider'),
        getQueryFromData('customers', 'customer'),
        {
          $match: {
            formattedDate: getDate(),
            $expr: { $eq: [{ $size: '$statusTransaction' }, 2] },
            approvedServiceProvider: { $ne: null },
            customer: { $ne: null },
          },
        },
        {
          $set: {
            customer: { $arrayElemAt: ['$customer', 0] },
            approvedServiceProvider: {
              $arrayElemAt: ['$approvedServiceProvider', 0],
            },
          },
        },
      ])
      .toArray()

    return results
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return error?.message
  }
}
