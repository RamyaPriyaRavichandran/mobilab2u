'use client'
import { GET_PURCHASED_MEDICINES } from '@/lib/endpoints'
import { fetcher } from '@/lib/fetchers'
import React from 'react'
import useSWR from 'swr'
import { STATUS } from '@/utils/constents'
import Table from '../../common/Tables'
import NoDataAvailable from '@/components/common/Nodate'
import PageLoaderSVG from '@/components/common/PageLoaderSVG'
import OpenEyeSVG from '@/components/common/SVG/OpenEyeSVG'
import { useRouter } from 'next/navigation'

const tableHeader = [
  {
    Header: 'S.No',
    accessor: 'index',
    Cell: ({ row: { original, index } }: any) => <>{index + 1}</>,
  },
  {
    Header: 'Customer Name',
    accessor: 'customer.name',
  },
  {
    Header: 'Appointment Date',
    accessor: 'Date',
    Cell: ({ row: { original } }: any) => (
      <>
        {original.followupAppointment?.appointmentDate?.slice(0, 10) ||
          original.appointment?.appointmentDate?.slice(0, 10)}
      </>
    ),
  },
  {
    Header: 'Price',
    accessor: 'price',
    Cell: ({ row: { original } }: any) => <>RM {original.price}</>,
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ row: { original } }: any) => <>{STATUS[original.payment.paymentStatus]}</>,
  },
  {
    Header: 'Prescription',
    accessor: 'prescription',
    Cell: ({ row: { original } }: any) => {
      const Router = useRouter()
      return (
        <>
          <button
            onClick={() =>
              Router.push(
                `/appointments/review/${original?.appointment?._id || original.followupAppointment._id}?customer=${original?.customer?._id}&payment=${true}`
              )
            }
          >
            <OpenEyeSVG />
          </button>
        </>
      )
    },
  },
]
export default function PurchasedMedicines() {
  const { data: purchasedmedicines = [], isLoading: withdrawalLoading } = useSWR(
    GET_PURCHASED_MEDICINES,
    fetcher<any>()
  )
  console.log('data', purchasedmedicines)
  return (
    <div className="p-5">
      {purchasedmedicines.length === 0 && <h1 className="text-2xl font-semibold">Customer Purchased Medicines</h1>}
      {withdrawalLoading ? (
        <PageLoaderSVG />
      ) : purchasedmedicines.length > 0 ? (
        <Table columns={tableHeader} data={purchasedmedicines} tableName="Purchased Medicines" />
      ) : (
        <NoDataAvailable />
      )}
    </div>
  )
}
