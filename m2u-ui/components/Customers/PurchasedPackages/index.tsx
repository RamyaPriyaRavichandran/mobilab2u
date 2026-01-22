'use client'
import useSWR from 'swr'
import { GET_CUSTOMER_PURCHASED_TESTS } from '@/lib/endpoints'
import { fetcher } from '@/lib/fetchers'
import { findFromOptions, TableData } from '@/utils'
import { useRouter } from 'next/navigation'
import OpenEyeSVG from '@/components/common/SVG/OpenEyeSVG'
import PageLoaderSVG from '@/components/common/PageLoaderSVG'
import Table from '@/components/common/Tables'
import StatusBadge from '@/components/common/Badges/StatusBadge'
import NoDataAvailable from '@/components/common/Nodate'
import { type } from '@/utils/constents'
import { getLatestStatus } from '@/utils/functions'

function TableHeader(onView: (id: string) => void) {
  const column = [
    {
      Header: 'No',
      accessor: 'No',
      Cell: ({ row: { index } }: TableData) => <div>{index + 1}</div>,
    },
    { Header: 'Customer Name', accessor: 'customer.name' },
    { Header: 'Phone Number', accessor: 'customer.phone' },
    { Header: 'Postcode', accessor: 'customerAddress.postCode' },
    {
      Header: 'Package Name',
      accessor: 'packageName',
      Cell: ({ row: { original } }: any) => <div>{original?.packages?.name}</div>,
    },
    {
      Header: 'Package Type',
      accessor: 'packageType',
      Cell: ({ row: { original } }: any) => <div>{findFromOptions(type, original?.packages?.type)}</div>,
    },
    {
      Header: 'Service Type',
      accessor: 'serviceType',
      Cell: ({ row: { original } }: any) => <div>{original?.packages?.serviceType && 'Test'}</div>,
    },
    {
      Header: 'Price',
      accessor: 'package.offerPrice',
      Cell: ({ row: { original } }: any) => <div>RM.{original.packages?.offerPrice || 0}.00</div>,
    },
    {
      Header: 'Status',
      accessor: 'currentStatus',
      Cell: ({ row: { original } }: TableData) => {
        const badgestatus = original.payment ? getLatestStatus(original.statusTransaction) : 'PAYMENT_PENDING'
        return <div>{StatusBadge(badgestatus)}</div>
      },
    },
    {
      Header: 'SP Name',
      accessor: 'spName',
      Cell: ({ row: { original } }: TableData) => <div>{original.approvedServiceProvider?.name || '-'}</div>,
    },
    {
      Header: 'LAB Name',
      accessor: 'labName',
      Cell: ({ row: { original } }: TableData) => <div>{original.submittedLab?.name || '-'}</div>,
    },
    {
      Header: 'View',
      accessor: 'action',
      Cell: ({ row: { original } }: TableData) => (
        <div onClick={() => onView(original._id)} className="cursor-pointer">
          <OpenEyeSVG />
        </div>
      ),
    },
  ]
  return column
}

export default function CustomerPurchasedTests() {
  const { data = [], isLoading } = useSWR(GET_CUSTOMER_PURCHASED_TESTS, fetcher<Array<any>>())
  const router = useRouter()

  const column = TableHeader((id: string) => {
    router.push(`/purchased-packages/${id}`)
  })

  return (
    <div className="p-6">
      <div className="mb-4">
        {isLoading ? (
          <PageLoaderSVG />
        ) : data.length > 0 ? (
          <Table columns={column} data={data} tableName="Customers Purchased Packages" />
        ) : (
          <div>
            <h1 className="font-semibold text-3xl">Customers Purchased Packages</h1>
            <NoDataAvailable />
          </div>
        )}
      </div>
    </div>
  )
}
