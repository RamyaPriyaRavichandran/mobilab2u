import { lookupDataFromCollection, unionWith } from 'mongo-aggregation-utils'
import { CUSTOMER_LAB_TEST_STATUS, OTP_AUTH_OPTIONS } from '../constants'
import { isExistData, isPaid } from '.'
import { ObjectId } from '../utils'

const getCustomerTestQueries = () => [
  ...lookupDataFromCollection('documentStorage', 'reports:all'),
  ...lookupDataFromCollection('serviceProviders', 'approvedServiceProvider'),
  ...lookupDataFromCollection('labs', 'submittedLab'),
  ...lookupDataFromCollection('appointments', 'appointment'),
  ...lookupDataFromCollection(
    'followupAppointments',
    'appointment',
    'followupAppointment',
  ),
  ...lookupDataFromCollection('customers', 'customer'),
]

export const getTestByCustomerIdQuery = (customerId: string) => [
  unionWith('followupLabTests'),
  {
    $match: {
      customer: ObjectId(customerId),
      status: CUSTOMER_LAB_TEST_STATUS.TEST_COMPLETED,
    },
  },
  ...getCustomerTestQueries(),
  ...lookupDataFromCollection('payments', 'payment', '', isPaid),
  {
    $match: {
      payment: isExistData,
    },
  },
  {
    $sort: {
      createdAt: -1 as -1,
    },
  },
]

export const getAllCustomerTestRequest = (spId: string, code: number) => [
  unionWith('followupLabTests'),
  {
    $match: {
      $or: [
        {
          approvedServiceProvider: ObjectId(spId),
        },
        {
          approvedServiceProvider: null,
          'customerAddress.postCode': code,
          'statusTransaction.status': {
            $ne: CUSTOMER_LAB_TEST_STATUS.CANCELLED,
          },
        },
      ],
    },
  },
  ...getCustomerTestQueries(),
  ...lookupDataFromCollection('payments', 'payment', 'payments', isPaid),
  {
    $match: {
      payments: isExistData,
      customer: isExistData,
    },
  },
  {
    $sort: {
      createdAt: -1 as -1,
    },
  },
]

export const getServiceProviderAssignedAllCustomerTestRequest = (
  id: string,
) => [
  unionWith('followupLabTests'),
  {
    $match: {
      submittedLab: id,
    },
  },
  ...getCustomerTestQueries(),
  ...lookupDataFromCollection('payments', 'payment', '', isPaid),
  ...lookupDataFromCollection(
    'otp',
    '_id',
    'OTP',
    [
      {
        $match: {
          type: OTP_AUTH_OPTIONS.LAB_OTP_FROM_HSP,
        },
      },
    ],
    'testId',
  ),

  {
    $match: {
      payment: isExistData,
    },
  },
  {
    $sort: {
      createdAt: -1 as -1,
    },
  },
]

export const customerTestRequests = (id: string) => [
  unionWith('followupLabTests'),
  {
    $match: {
      customer: ObjectId(id),
    },
  },
  ...lookupDataFromCollection('payments', 'payment'),
  ...lookupDataFromCollection(
    'otp',
    '_id',
    'OTP',
    [
      {
        $match: {
          type: OTP_AUTH_OPTIONS.CUSTOMER_OTP_FROM_HSP,
        },
      },
    ],
    'testId',
  ),
  ...getCustomerTestQueries(),
  {
    $sort: {
      createdAt: -1 as -1,
    },
  },
]
