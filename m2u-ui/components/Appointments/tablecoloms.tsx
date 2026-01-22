import { APPOINTMENT_APPROVE_MESSAGE, APPOINTMENT_STATUS, language, STATUS } from '@/utils/constents'
import LittleLoader from '../common/LittleLoader'
import { sliceDate } from '@/utils/functions'
import DashLoader from '../common/DashLoader'
import StatusBadge from '../common/Badges/StatusBadge'
import { Dispatch, SetStateAction } from 'react'
import OpenEyeSVG from '../common/SVG/OpenEyeSVG'
import { findFromOptions } from '@/utils'

const commonHeader = [
  {
    Header: 'No',
    accessor: 'No',
    Cell: ({ row: { index } }: any) => <div>{index + 1}</div>,
  },
  {
    Header: 'Customer Name',
    accessor: 'customer.name',
  },
  {
    Header: 'NRIC Number',
    accessor: 'customer.nricNumber',
    Cell: ({ row: { original } }: any) => <>{original?.customer?.nricNumber ? original?.customer?.nricNumber : '-'}</>,
  },
  {
    Header: 'Passport Number',
    accessor: 'customer.passportNumber',
    Cell: ({ row: { original } }: any) => (
      <>{original?.customer?.passportNumber ? original?.customer?.passportNumber : '-'}</>
    ),
  },
  {
    Header: 'Appointment Date',
    accessor: 'appointmentDate',
    Cell: ({ row: { original } }: any) => <>{sliceDate(original?.appointmentDate)}</>,
  },
  {
    Header: 'Time',
    accessor: 'time',
    Cell: ({ row: { original } }: any) => (
      <>
        {original?.selectedTimeSlot?.startTime} - {original?.selectedTimeSlot?.endTime}
      </>
    ),
  },
  {
    Header: 'Payment Status',
    accessor: 'payment.paymentStatus ',
    Cell: ({ row: { original } }: any) => <>{STATUS[original?.payment?.paymentStatus] || 'Pending'}</>,
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ row: { original } }: any) => <>{StatusBadge(original?.status)}</>,
  },
]

export const doctorTableHeader = (
  isMutating: boolean,
  approveAppointment: ({ appointmentId }: { appointmentId: string }) => void,
  router: any,
  userId: string,
  showAlert: any,
  setAppointmentId: Dispatch<SetStateAction<string>>,
  appointmentId: string
) => {
  return [
    ...commonHeader,
    {
      Header: 'Type',
      accessor: 'type',
      Cell: ({ row: { original } }: any) => (
        <>{original?.type === 'NORMAL_APPOINTMENT' ? 'Normal Appointment' : 'Followup Appointment'}</>
      ),
    },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: ({ row: { original } }: any) => (
        <div>
          {original.status === undefined || original.status === APPOINTMENT_STATUS.PENDING ? (
            <button
              className="focus:outline-none text-white bg-red-500 hover:bg-red-600  font-medium rounded-lg text-sm px-2 w-20 h-7"
              onClick={() => {
                setAppointmentId(original._id)
                showAlert(APPOINTMENT_APPROVE_MESSAGE, () => approveAppointment({ appointmentId: original._id }))
              }}
            >
              {isMutating && appointmentId === original._id ? <DashLoader color="white" /> : 'Approve'}
            </button>
          ) : (
            original.status !== APPOINTMENT_STATUS.PENDING &&
            `${original?.approvedDoctor?._id}` === `${userId}` && (
              <button
                type="button"
                onClick={() =>
                  router.push(`/appointments/consultation/${original._id}?customer=${original?.customer?._id}`)
                }
                className="text-white bg-red-500 hover:bg-red-600  font-medium rounded-lg text-sm px-1 w-20 h-7"
              >
                View
              </button>
            )
          )}
        </div>
      ),
    },
  ]
}

export const customertableHeader = (router: any) => {
  return [
    ...commonHeader,
    {
      Header: 'Language',
      accessor: 'doctorLanguage',
      Cell: ({ row: { original } }: any) => <>{findFromOptions(language, original.doctorLanguage)}</>,
    },
    {
      Header: 'Type',
      accessor: 'type',
      Cell: ({ row: { original } }: any) => (
        <>{original?.type === 'NORMAL_APPOINTMENT' ? 'Normal Appointment' : 'Followup Appointment'}</>
      ),
    },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: ({ row: { original } }: any) => (
        <button
          className="text-white bg-red-500 hover:bg-red-600  font-medium rounded-lg text-sm px-1 w-20 h-7"
          onClick={() => router.push(`/appointments/${original._id}`)}
        >
          View
        </button>
      ),
    },
  ]
}

export const adminTableHeader = (router: any) => [
  ...commonHeader,
  {
    Header: 'Type',
    accessor: 'type',
    Cell: ({ row: { original } }: any) => (
      <>{original?.type === 'NORMAL_APPOINTMENT' ? 'Normal Appointment' : 'Followup Appointment'}</>
    ),
  },
  {
    Header: 'Doctor Name',
    accessor: 'approvedDoctor.name',
    Cell: ({ row: { original } }: any) => <>{original.approvedDoctor?.name || '-'}</>,
  },
  {
    Header: 'Language',
    accessor: 'doctorLanguage',
    Cell: ({ row: { original } }: any) => <>{findFromOptions(language, original.doctorLanguage)}</>,
  },
  {
    Header: 'View',
    accessor: 'action',
    Cell: ({ row: { original } }: any) => (
      <button
        onClick={() => router.push(`/appointments/review/${original?._id}?customer=${original?.customer?._id}`)}
        className=" px-1 w-20 h-7"
      >
        <OpenEyeSVG />
      </button>
    ),
  },
]
