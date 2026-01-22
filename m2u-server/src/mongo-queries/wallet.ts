import { lookupDataFromCollection, unionWith } from 'mongo-aggregation-utils'
import { APPROVAL_STATUS } from '../constants'
const packages = {
  _id: 1,
  gpShare: 1,
  labShare: 1,
  spShare: 1,
  customerShare: 1,
  mobilabShare: 1,
  name: 1,
}
export const walletHistoryQuery = (filteredData: any) => [
  {
    $match: {
      ...filteredData,
      status: APPROVAL_STATUS.APPROVED,
    },
  },
  ...lookupDataFromCollection('labTests', 'orderId', 'testDetail', [
    unionWith('followupLabTests'),
    ...lookupDataFromCollection('customers', 'customer'),
    ...lookupDataFromCollection('serviceProviders', 'approvedServiceProvider'),
    ...lookupDataFromCollection('labs', 'submittedLab'),
    {
      $project: {
        packages,
        customer: '$customer.name',
        approvedServiceProvider: '$approvedServiceProvider.name',
        submittedLab: '$submittedLab.name',
      },
    },
  ]),
  ...lookupDataFromCollection('appointments', 'orderId', 'appointmentDetail', [
    unionWith('followupAppointments'),
    ...lookupDataFromCollection('customers', 'customer'),
    ...lookupDataFromCollection('gpPartners', 'approvedDoctor'),
    {
      $project: {
        packages,
        customer: '$customer.name',
        doctor: '$approvedDoctor.name',
      },
    },
  ]),
  {
    $sort: {
      createdDate: -1 as -1,
    },
  },
]
