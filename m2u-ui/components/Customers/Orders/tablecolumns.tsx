import { CUSTOMER_TEST_STATUS, type, USER_ROLES } from '@/utils/constents'
import { Dispatch, SetStateAction } from 'react'
import { TableInterface } from '../CustomerInterface'
import OpenEyeSVG from '@/components/common/SVG/OpenEyeSVG'
import StatusBadge from '@/components/common/Badges/StatusBadge'
import { getLatestStatus, sliceDate } from '@/utils/functions'
import { findFromOptions } from '@/utils'
import LittleLoader from '@/components/common/LittleLoader'
interface FormState {
  popup: boolean
  data: any
}

export const sPAndLabtableColumns = (
  setTest: Dispatch<
    SetStateAction<{
      popup: boolean
      test: {
        _id: string
        statusTransaction: Array<{
          status: string
          date: string
        }>
      }
    }>
  >,
  serviceProviderId: string,
  roles: string,
  setForm: Dispatch<SetStateAction<FormState>>,
  scrollToTop: () => void
) => {
  return [
    {
      Header: 'SNo',
      accessor: 'No',
      Cell: ({ row: { index } }: TableInterface) => <div>{index + 1}</div>,
    },
    {
      Header: 'Customer Name',
      accessor: 'customer.name',
    },
    {
      Header: 'Package Name',
      accessor: 'name',
      Cell: ({ row: { original } }: any) => <div>{original?.customPackage?.name || original?.packages?.name}</div>,
    },
    {
      Header: 'Appointment Date',
      accessor: 'customerAppointmentDate',
      Cell: ({ row: { original } }: any) => <div>{sliceDate(original?.customerAppointmentDate)}</div>,
    },
    {
      Header: 'Package Type',
      accessor: 'packageType',
      Cell: ({ row: { original } }: any) => (
        <div>{findFromOptions(type, original?.customPackage?.type || original?.packages?.type)}</div>
      ),
    },
    {
      Header: 'Service Type',
      accessor: 'serviceType',
      Cell: ({ row: { original } }: any) => (
        <div>{(original?.customPackage?.serviceType && 'Test') || (original?.packages?.serviceType && 'Test')}</div>
      ),
    },
    {
      Header: 'Payment',
      Cell: () => {
        return <div>Paid</div>
      },
    },

    {
      Header: 'Status',
      accessor: 'currentStatus',
      Cell: ({ row: { original } }: TableInterface) => {
        const declinedServiceProvider = original.declinedServiceProviders.includes(serviceProviderId)
        return (
          <div>
            {USER_ROLES.SERVICE_PROVIDER === roles && declinedServiceProvider
              ? StatusBadge('DECLINED')
              : StatusBadge(getLatestStatus(original.statusTransaction))}
          </div>
        )
      },
    },
    {
      Header: 'Submitted Lab Name',
      accessor: 'submittedLab.name',
      Cell: ({ row: { original } }: TableInterface) => (
        <div>
          <p>{original.submittedLab?.name || '-'}</p>
        </div>
      ),
    },
    {
      Header: 'Details',
      accessor: 'action',
      Cell: ({ row: { original } }: TableInterface) => (
        <div
          onClick={() => {
            setForm({ popup: true, data: original })
            scrollToTop()
          }}
        >
          <OpenEyeSVG />
        </div>
      ),
    },
    {
      Header: 'Actions',
      Cell: ({ row: { original } }: TableInterface) => {
        const currentStatus = getLatestStatus(original.statusTransaction)
        const declinedServiceProvider = original.declinedServiceProviders.includes(serviceProviderId)
        const hspOption = [
          CUSTOMER_TEST_STATUS.SAMPLE_SUBMITTED_TO_LAB,
          CUSTOMER_TEST_STATUS.RE_COLLECTED_SAMPLE_SUBMITTED_TO_LAB,
          CUSTOMER_TEST_STATUS.TEST_COMPLETED,
          CUSTOMER_TEST_STATUS.NEED_SAMPLE_RE_COLLECTION,
          CUSTOMER_TEST_STATUS.CANCELLED,
        ]
        const lapOption = [
          CUSTOMER_TEST_STATUS.SAMPLE_SUBMITTED_TO_LAB,
          CUSTOMER_TEST_STATUS.RE_COLLECTED_SAMPLE_SUBMITTED_TO_LAB,
        ]

        const serviceProviderValidationCheck =
          roles === USER_ROLES.SERVICE_PROVIDER && hspOption.includes(currentStatus as CUSTOMER_TEST_STATUS)
        const labValidationCheck =
          roles === USER_ROLES.LAB_USER && !lapOption.includes(currentStatus as CUSTOMER_TEST_STATUS)

        const customerValidationCheck =
          roles === USER_ROLES.CUSTOMER && currentStatus !== CUSTOMER_TEST_STATUS.TEST_COMPLETED
        return (
          <div>
            {serviceProviderValidationCheck ||
            labValidationCheck ||
            declinedServiceProvider ||
            customerValidationCheck ? (
              '-'
            ) : (
              <button
                className="bg-brand-400 text-white px-2 py-1 rounded"
                onClick={() => setTest({ popup: true, test: original })}
              >
                View
              </button>
            )}
          </div>
        )
      },
    },
  ]
}

export const ctableColumns = (
  setTest: any,
  payTestFees: any,
  scrollToTop: () => void,
  setForm: Dispatch<SetStateAction<FormState>>,
  rePayLoading: boolean
) => [
  {
    Header: 'SNo',
    accessor: 'No',
    Cell: ({ row: { index } }: TableInterface) => <div>{index + 1}</div>,
  },
  {
    Header: 'Package Name',
    accessor: 'name',
    Cell: ({ row: { original } }: any) => <div>{original?.customPackage?.name || original?.packages?.name}</div>,
  },
  {
    Header: 'Appointment Date',
    accessor: 'customerAppointmentDate',
    Cell: ({ row: { original } }: any) => <div>{sliceDate(original?.customerAppointmentDate)}</div>,
  },
  {
    Header: 'Pin Code',
    accessor: 'pinCode',
    Cell: ({ row: { original } }: any) => <div>{original?.customerAddress?.postCode}</div>,
  },
  {
    Header: 'Package Type',
    accessor: 'packageType',
    Cell: ({ row: { original } }: any) => (
      <div>{findFromOptions(type, original?.customPackage?.type || original?.packages?.type)}</div>
    ),
  },
  {
    Header: 'Service Type',
    accessor: 'serviceType',
    Cell: ({ row: { original } }: any) => (
      <div>{(original?.customPackage?.serviceType && 'Test') || (original?.packages?.serviceType && 'Test')}</div>
    ),
  },
  {
    Header: 'Payment Status',
    accessor: 'paymentStatus ',
    Cell: ({ row: { original } }: TableInterface) => {
      return <div>{original.payment?.paymentStatus ? original.payment?.paymentStatus && 'Paid' : '-'}</div>
    },
  },
  {
    Header: 'Status',
    accessor: 'currentStatus',
    Cell: ({ row: { original } }: TableInterface) => {
      const cnrrentStatus = getLatestStatus(original.statusTransaction)
      const badgestatus = original.payment ? cnrrentStatus : 'PAYMENT_PENDING'
      return <div>{StatusBadge(badgestatus)}</div>
    },
  },
  {
    Header: 'Members',
    accessor: 'package.members',
    Cell: ({ row: { original } }: TableInterface) => (
      <div>{original?.packages?.members ? original?.packages?.members : '-'}</div>
    ),
  },
  {
    Header: 'Payment',
    accessor: 'payment.amount',
    Cell: ({ row: { original } }: any) => {
      const packages = original?.payment?.amount || original.package
      return <div>RM{packages || 0}.00</div>
    },
  },
  {
    Header: 'Details',
    accessor: 'action',
    Cell: ({ row: { original } }: TableInterface) => (
      <div
        onClick={() => {
          setForm({ popup: true, data: original })
          scrollToTop()
        }}
      >
        <OpenEyeSVG />
      </div>
    ),
  },
  {
    Header: 'Actions',
    Cell: ({ row: { original } }: TableInterface) => (
      <div>
        {original.payment?.paymentStatus === 'PAID' ? (
          getLatestStatus(original.statusTransaction) === CUSTOMER_TEST_STATUS.TEST_COMPLETED ? (
            <button
              className="bg-brand-400 text-white  px-2 py-1 rounded"
              onClick={() => {
                setTest({
                  popup: true,
                  test: original,
                })
                scrollToTop()
              }}
            >
              View
            </button>
          ) : (
            '-'
          )
        ) : (
          <button
            onClick={() => payTestFees({ testId: original._id })}
            className="text-white bg-red-500 px-4 py-1 rounded-md"
          >
            {rePayLoading ? <LittleLoader /> : 'Paynow'}
          </button>
        )}
      </div>
    ),
  },
]
