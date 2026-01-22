import {
  formatDateToString,
  isFieldEquals,
  lookupDataFromCollection,
  unionWith,
} from 'mongo-aggregation-utils'
import {
  APPOINTMENT_TYPE,
  CUSTOMER_CONSULTATION_STATUS,
  HSP_STATUS,
} from '../constants'

import { ObjectId } from '../utils'
import { isExistData, isPaid } from '.'

export const getAllAppointments = (id: string) => [
  unionWith('followupAppointments'),
  {
    $match: {
      $or: [
        isFieldEquals('approvedDoctor', null),
        isFieldEquals('approvedDoctor', ObjectId(id)),
      ],
    },
  },
  ...lookupDataFromCollection('payments', 'payment', 'payments', isPaid),
  ...lookupDataFromCollection('gpPartners', 'approvedDoctor'),
  ...lookupDataFromCollection('customers', 'customer'),
]

export const getDoctorsAvailabilityTimeSlot = (
  filterableDate: string,
  language: string,
) => {
  return [
    {
      $match: {
        date: new Date(filterableDate),
        isBooked: false,
      },
    },
    ...lookupDataFromCollection('gpPartners', 'doctor', 'doctor', [
      {
        $match: {
          language: language,
          activeStatus: HSP_STATUS.ACTIVE,
        },
      },
    ]),
    {
      $lookup: {
        from: 'appointments',
        let: { startTime: '$startTime', endTime: '$endTime', date: '$date' },
        pipeline: [
          unionWith('followupAppointments'),
          {
            $match: {
              status: { $ne: CUSTOMER_CONSULTATION_STATUS.CANCELLED },
              isBooked: false,
              $expr: {
                $and: [
                  isFieldEquals('appointmentDate', '$$date'),
                  isFieldEquals('selectedTimeSlot.startTime', '$$startTime'),
                  isFieldEquals('selectedTimeSlot.endTime', '$$endTime'),
                ],
              },
            },
          },
        ],
        as: 'bookedAppointments',
      },
    },
    {
      $addFields: {
        totalBooked: {
          $sum: [{ $size: '$bookedAppointments' }],
        },
      },
    },
    {
      $group: {
        _id: { startTime: '$startTime', endTime: '$endTime', date: '$date' },
        slots: { $push: '$$ROOT' },
        totalBooked: { $first: '$totalBooked' },
      },
    },
    {
      $addFields: {
        availableSlots: {
          $slice: [
            '$slots',
            { $subtract: [{ $size: '$slots' }, '$totalBooked'] },
          ],
        },
      },
    },
    {
      $match: {
        $expr: {
          $gt: [{ $size: '$availableSlots' }, 0],
        },
      },
    },
    { $unwind: '$availableSlots' },
    { $replaceRoot: { newRoot: '$availableSlots' } },
    {
      $match: {
        doctor: isExistData,
      },
    },
    {
      $group: {
        _id: {
          date: '$date',
          startTime: '$startTime',
          endTime: '$endTime',
        },
        date: { $first: '$date' },
        startTime: { $first: '$startTime' },
        endTime: { $first: '$endTime' },
        isBooked: { $first: '$isBooked' },
        slotId: { $first: '$_id' },
      },
    },
    {
      $project: {
        startTime: 1,
        endTime: 1,
        date: 1,
        slotId: 1,
      },
    },
  ]
}

export const getDoctorsAvailabilityTimeSlotByDetail = (
  match: {
    startTime?: string
    endTime?: string
    doctorLanguage?: string
    doctor?: string
    formattedDate?: string
    _id?: any
  },
  language?: string,
) => {
  return [
    {
      $addFields: {
        formattedDate: formatDateToString('date'),
      },
    },
    {
      $match: {
        ...match,
        isBooked: false,
      },
    },

    ...lookupDataFromCollection('gpPartners', 'doctor', 'doctor', [
      {
        $match: {
          language: language,
          activeStatus: HSP_STATUS.ACTIVE,
        },
      },
    ]),
    {
      $lookup: {
        from: 'appointments',
        let: { startTime: '$startTime', endTime: '$endTime', date: '$date' },
        pipeline: [
          unionWith('followupAppointments'),
          {
            $match: {
              isBooked: false,
              $expr: {
                $and: [
                  { $eq: ['$appointmentDate', '$$date'] },
                  { $eq: ['$selectedTimeSlot.startTime', '$$startTime'] },
                  { $eq: ['$selectedTimeSlot.endTime', '$$endTime'] },
                ],
              },
            },
          },
        ],
        as: 'bookedAppointments',
      },
    },

    {
      $addFields: {
        totalBooked: {
          $sum: [{ $size: '$bookedAppointments' }],
        },
      },
    },
    {
      $group: {
        _id: { startTime: '$startTime', endTime: '$endTime', date: '$date' },
        slots: { $push: '$$ROOT' },
        totalBooked: { $first: '$totalBooked' },
      },
    },
    {
      $addFields: {
        availableSlots: {
          $slice: [
            '$slots',
            { $subtract: [{ $size: '$slots' }, '$totalBooked'] },
          ],
        },
      },
    },
    {
      $match: {
        $expr: {
          $gt: [{ $size: '$availableSlots' }, 0],
        },
      },
    },
    { $unwind: '$availableSlots' },
    { $replaceRoot: { newRoot: '$availableSlots' } },
    {
      $match: {
        doctor: isExistData,
      },
    },
    {
      $group: {
        _id: {
          date: '$date',
          startTime: '$startTime',
          endTime: '$endTime',
        },
        date: { $first: '$date' },
        startTime: { $first: '$startTime' },
        endTime: { $first: '$endTime' },
        isBooked: { $first: '$isBooked' },
        slotId: { $first: '$_id' },
        doctor: { $first: '$doctor' },
      },
    },
    {
      $project: {
        doctor: 1,
        startTime: 1,
        endTime: 1,
        date: 1,
        slotId: 1,
      },
    },
  ]
}

export const getAppointments = (id: string, language: string[]) => [
  unionWith('followupAppointments'),
  ...lookupDataFromCollection('payments', 'payment', '', isPaid),
  ...lookupDataFromCollection('documentStorage', 'medicalRecords.document'),
  {
    $match: {
      payment: isExistData,
    },
  },
  {
    $lookup: {
      from: 'doctorAvailabilities',
      let: {
        apptDate: formatDateToString('appointmentDate'),
        apptStartTime: '$selectedTimeSlot.startTime',
        apptEndTime: '$selectedTimeSlot.endTime',
      },
      pipeline: [
        {
          $addFields: {
            formattedDate: formatDateToString('date'),
          },
        },
        {
          $match: {
            doctor: ObjectId(id),
            $expr: {
              $and: [
                isFieldEquals('formattedDate', '$$apptDate'),
                isFieldEquals('startTime', '$$apptStartTime'),
                isFieldEquals('endTime', '$$apptEndTime'),
              ],
            },
          },
        },
      ],
      as: 'matchingAvailability',
    },
  },
  {
    $unwind: {
      path: '$matchingAvailability',
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $addFields: {
      doctorAssigned: {
        $cond: [{ $ifNull: ['$doctor', false] }, true, false],
      },
    },
  },
  {
    $addFields: {
      shouldInclude: {
        $or: [
          { $eq: ['$matchingAvailability.isBooked', false] },
          {
            $and: [
              isFieldEquals('matchingAvailability.isBooked', true),
              isFieldEquals('status', CUSTOMER_CONSULTATION_STATUS.PENDING),
            ],
          },
        ],
      },
    },
  },
  {
    $lookup: {
      from: 'appointments',
      let: {
        apptDate: '$appointmentDate',
        apptStartTime: '$selectedTimeSlot.startTime',
        apptEndTime: '$selectedTimeSlot.endTime',
      },
      pipeline: [
        {
          $match: {
            approvedDoctor: ObjectId(id),
            status: { $ne: CUSTOMER_CONSULTATION_STATUS.PENDING },
            $expr: {
              $and: [
                {
                  $eq: [
                    formatDateToString('appointmentDate'),
                    formatDateToString('$apptDate'),
                  ],
                },
                isFieldEquals('selectedTimeSlot.startTime', '$$apptStartTime'),
                isFieldEquals('selectedTimeSlot.endTime', '$$apptEndTime'),
              ],
            },
          },
        },
      ],
      as: 'approvedAppointments',
    },
  },
  {
    $addFields: {
      hasApprovedConflict: { $gt: [{ $size: '$approvedAppointments' }, 0] },
    },
  },
  {
    $match: {
      doctorLanguage: language,
      $or: [
        {
          status: CUSTOMER_CONSULTATION_STATUS.PENDING,
          shouldInclude: true,
          approvedDoctor: null,
          matchingAvailability: { $ne: null },
          hasApprovedConflict: false,
        },
        {
          status: CUSTOMER_CONSULTATION_STATUS.PENDING,
          approvedDoctor: ObjectId(id),
          shouldInclude: true,
          matchingAvailability: { $ne: null },
          hasApprovedConflict: false,
        },
        {
          status: { $ne: CUSTOMER_CONSULTATION_STATUS.PENDING },
          approvedDoctor: ObjectId(id),
        },
      ],
    },
  },
  ...lookupDataFromCollection('customers', 'customer'),
  ...lookupDataFromCollection('gpPartners', 'approvedDoctor'),
  {
    $sort: {
      appointmentDate: -1 as -1,
    },
  },
]

export const getCompletedAppointmentDetails = (id: string) => [
  unionWith('followupAppointments'),
  ...lookupDataFromCollection('gpPartners', 'approvedDoctor'),
  ...lookupDataFromCollection('customers', 'customer'),
  ...lookupDataFromCollection('appointments', 'appointment'),
  {
    $match: {
      _id: ObjectId(id),
      status: CUSTOMER_CONSULTATION_STATUS.COMPLETED,
    },
  },
  ...lookupDataFromCollection(
    'appointmentPrescriptions',
    '_id',
    'prescription',
    [
      {
        $match: {
          status: CUSTOMER_CONSULTATION_STATUS.ADMIN_APPROVED,
        },
      },
    ],
    'appointment',
  ),
  {
    $match: {
      prescription: isExistData,
    },
  },
]

export const getAllAppointmentDetails = [
  unionWith('followupAppointments'),
  ...lookupDataFromCollection('gpPartners', 'approvedDoctor'),
  ...lookupDataFromCollection('customers', 'customer'),
  ...lookupDataFromCollection('payments', 'payment', 'payment', isPaid),
  ...lookupDataFromCollection('appointments', 'appointment'),
  {
    $match: {
      customer: isExistData,
      payment: isExistData,
    },
  },
  {
    $sort: {
      appointmentDate: -1 as -1,
    },
  },
]

export const getPurchasedMedicinesQuery = [
  ...lookupDataFromCollection('customers', 'customer'),
  ...lookupDataFromCollection('appointments', 'appointment', 'appointment'),
  ...lookupDataFromCollection(
    'followupAppointments',
    'appointment',
    'followupAppointment',
  ),
  ...lookupDataFromCollection('payments', 'payment', 'payment', isPaid),
  {
    $match: {
      customer: isExistData,
      payment: isExistData,
    },
  },
]

export const getUserAppointmentsByUserId = (match: any) => [
  unionWith('followupAppointments'),
  ...lookupDataFromCollection('payments', 'payment', 'payment', isPaid),
  match,
  ...lookupDataFromCollection(
    'gpPartners',
    'approvedDoctor',
    'approvedDoctor',
    [
      ...lookupDataFromCollection('documentStorage', 'eSign'),
      {
        $match: {
          eSign: isExistData,
        },
      },
    ],
  ),
  ...lookupDataFromCollection('customers', 'customer'),
  ...lookupDataFromCollection('appointments', 'appointment'),
  ...lookupDataFromCollection('documentStorage', 'medicalRecords.document'),
  ...lookupDataFromCollection(
    'appointmentPrescriptions',
    '_id',
    'appointmentPrescription',
    [
      ...lookupDataFromCollection('medicines', 'medicine'),
      {
        $match: {
          status: CUSTOMER_CONSULTATION_STATUS.ADMIN_APPROVED,
        },
      },
    ],
    'appointment',
  ),
  {
    $sort: {
      appointmentDate: -1 as -1,
    },
  },
]

export const getFollowupTimeSlots = (data: any) => [
  {
    $addFields: {
      formattedDate: formatDateToString('date'),
    },
  },
  {
    $match: data,
  },
  ...lookupDataFromCollection('gpPartners', 'doctor'),
  {
    $lookup: {
      from: 'followupAppointments',
      let: { startTime: '$startTime', endTime: '$endTime', date: '$date' },
      pipeline: [
        {
          $match: {
            approvedDoctor: data.doctor,
            isBooked: data.isBooked,
            type: APPOINTMENT_TYPE.FOLLOWUP_DOCTOR_FOLLOWUP_APPOINTMENT,
            $expr: {
              $and: [
                isFieldEquals('appointmentDate', '$$date'),
                isFieldEquals('selectedTimeSlot.startTime', '$$startTime'),
                isFieldEquals('selectedTimeSlot.endTime', '$$endTime'),
              ],
            },
          },
        },
      ],
      as: 'bookedAppointments',
    },
  },
  {
    $addFields: {
      totalBooked: {
        $sum: [{ $size: '$bookedAppointments' }],
      },
    },
  },
  {
    $group: {
      _id: { startTime: '$startTime', endTime: '$endTime', date: '$date' },
      slots: { $push: '$$ROOT' },
      totalBooked: { $first: '$totalBooked' },
    },
  },
  {
    $addFields: {
      availableSlots: {
        $slice: [
          '$slots',
          { $subtract: [{ $size: '$slots' }, '$totalBooked'] },
        ],
      },
    },
  },
  {
    $match: {
      $expr: {
        $gt: [{ $size: '$availableSlots' }, 0],
      },
    },
  },
  { $unwind: '$availableSlots' },
  { $replaceRoot: { newRoot: '$availableSlots' } },
  {
    $group: {
      _id: {
        date: '$date',
        startTime: '$startTime',
        endTime: '$endTime',
      },
      date: { $first: '$date' },
      startTime: { $first: '$startTime' },
      endTime: { $first: '$endTime' },
      isBooked: { $first: '$isBooked' },
      slotId: { $first: '$_id' },
      doctor: { $first: '$doctor' },
    },
  },
  {
    $project: {
      _id: 1,
      startTime: 1,
      endTime: 1,
      date: 1,
      slotId: 1,
      doctor: 1,
    },
  },
]

export const getExistingAppointments = (
  startTime: string,
  endTime: string,
  date: Date,
  id: string,
) => [
  unionWith('followupAppointments'),
  {
    $match: {
      'selectedTimeSlot.startTime': startTime,
      'selectedTimeSlot.endTime': endTime,
      appointmentDate: date,
      customer: id,
    },
  },
]

export const getDoctorAvailabilityForQueueing = (
  match: any,
  language: string,
) => [
  ...lookupDataFromCollection('gpPartners', 'doctor', 'doctor', [
    {
      $match: {
        language: language,
      },
    },
  ]),
  {
    $addFields: {
      formattedDate: formatDateToString('date'),
    },
  },
  {
    $match: {
      ...match,
      doctor: isExistData,
    },
  },
]
