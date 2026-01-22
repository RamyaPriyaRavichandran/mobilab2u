import { lookupDataFromCollection, switchCase } from 'mongo-aggregation-utils'

import { ROLES } from '../lib/permissions'
import { PAYMENT_STATUS } from '../constants'

export const getAllSPAndGP = [
  ...lookupDataFromCollection('documentStorage', 'mQdocOne'),
  ...lookupDataFromCollection('documentStorage', 'mQdocTwo'),
  ...lookupDataFromCollection('documentStorage', 'mQdocThree'),
  ...lookupDataFromCollection('documentStorage', 'mQdocFour'),
  ...lookupDataFromCollection('documentStorage', 'passportSizePhoto'),
  ...lookupDataFromCollection('documentStorage', 'myKad'),
  ...lookupDataFromCollection('documentStorage', 'eSign'),
  ...lookupDataFromCollection(
    'payments',
    '_id',
    'payment',
    [
      {
        $match: {
          paymentStatus: PAYMENT_STATUS.PAID,
        },
      },
      {
        $project: {
          amount: 1,
          paymentDate: 1,
          paymentStatus: 1,
        },
      },
    ],
    'userId',
  ),
  {
    $addFields: {
      userRoles: {
        $switch: {
          branches: [
            switchCase('userRole', ROLES.SERVICE_PROVIDER, 'Service Provider'),
            switchCase('userRole', ROLES.GP_PARTNER, 'G.P Partner'),
          ],
          default: '$userRoles',
        },
      },
    },
  },
  {
    $sort: {
      createdAt: -1 as -1,
    },
  },
]
