import { lookupDataFromCollection, unionWith } from 'mongo-aggregation-utils'
import { day, month, PAYMENT_STATUS, year } from '../constants'
import { ObjectId } from '../utils'

export const isPaid = [
  {
    $match: {
      paymentStatus: PAYMENT_STATUS.PAID,
    },
  },
]

export const isExistData = {
  $exists: true,
  $ne: null,
}

export const dbOptions = {
  new: true,
  upsert: true,
}
export const getDbUpdateObject = (filter: object, updateData: object) => ({
  updateOne: {
    filter: filter,
    update: updateData,
    ...dbOptions,
  },
})

export const countByDateAndMonthAndYear = (
  unionCollection: string,
  match?: any,
) => [
  unionWith(unionCollection),
  {
    $match: match,
  },
  {
    $group: {
      _id: null,
      dailyCount: {
        $sum: {
          $cond: [
            {
              $and: [
                { $gte: ['$createdAt', new Date(year, month - 1, day)] },
                { $lt: ['$createdAt', new Date(year, month - 1, day + 1)] },
              ],
            },
            1,
            0,
          ],
        },
      },
      monthlyCount: {
        $sum: {
          $cond: [
            {
              $and: [
                { $gte: ['$createdAt', new Date(year, month - 1, 1)] },
                { $lt: ['$createdAt', new Date(year, month, 1)] },
              ],
            },
            1,
            0,
          ],
        },
      },
      yearlyCount: {
        $sum: {
          $cond: [
            {
              $and: [
                { $gte: ['$createdAt', new Date(year, 0, 1)] },
                { $lt: ['$createdAt', new Date(year + 1, 0, 1)] },
              ],
            },
            1,
            0,
          ],
        },
      },
      overallCount: { $sum: 1 }, // ✅ total count after $match
    },
  },
]

export const getPackageDetail = (id: string) => [
  unionWith('customPackages'),
  {
    $match: {
      _id: ObjectId(id),
    },
  },
  ...lookupDataFromCollection('documentStorage', 'document'),
  ...lookupDataFromCollection('documentStorage', 'image'),
]
