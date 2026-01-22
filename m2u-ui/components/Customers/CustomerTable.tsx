'use client'

import useSWR from 'swr'
import { GET_CUSTOMER } from '@/lib/endpoints'
import { fetcher } from '@/lib/fetchers'
import Table from '../common/Tables'
import PageLoaderSVG from '../common/PageLoaderSVG'
import { constructCustomerColumns, TableColumnCustom, findFromOptions, TableData } from '@/utils'
import { gender } from '@/utils/constents'
import NoDataAvailable from '../common/Nodate'

const tableColumns: TableColumnCustom[] = [
  {
    Header: 'No',
    accessor: 'No',
    Cell: ({ row: { index } }: TableData) => <div>{index + 1}</div>,
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'DOB',
    accessor: 'dateOfBirth',
    Cell: ({ row: { original } }: TableData) => (
      <div>{original.dateOfBirth ? original.dateOfBirth?.slice(0, 10) : '-'}</div>
    ),
  },
  {
    Header: 'Gender',
    accessor: 'gender',
    Cell: ({ row: { original } }: TableData) => <div>{findFromOptions(gender, original.gender)}</div>,
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Phone',
    accessor: 'phone',
  },
  {
    Header: 'NRIC Number',
    accessor: 'nricNumber',
    Cell: ({ row: { original } }: TableData) => <div>{original?.nricNumber ? original?.nricNumber : '-'}</div>,
  },
  {
    Header: 'Passport Number',
    accessor: 'passportNumber',
    Cell: ({ row: { original } }: TableData) => <div>{original?.passportNumber ? original?.passportNumber : '-'}</div>,
  },
  {
    Header: 'Registration Number',
    accessor: 'registrationNumber',
  },
  {
    Header: 'State',
    accessor: 'state',
    Cell: ({ row: { original } }: TableData) => <div>{original?.primaryAddress?.state}</div>,
  },
  {
    Header: 'City',
    accessor: 'city',
    Cell: ({ row: { original } }: TableData) => <div>{original?.primaryAddress?.city}</div>,
  },

  {
    Header: 'Postcode',
    accessor: 'postCode',
    Cell: ({ row: { original } }: TableData) => <div>{original?.primaryAddress?.postCode}</div>,
  },
]

export default function CustomerTable() {
  const { data = [], isLoading } = useSWR(GET_CUSTOMER, fetcher<Array<any>>())
  const column = constructCustomerColumns(tableColumns)

  return (
    <div className="p-6">
      <div className="mb-4">
        {isLoading ? (
          <PageLoaderSVG />
        ) : data.length > 0 ? (
          <div>
            <Table columns={column} data={data} tableName="Customers" />
          </div>
        ) : (
          <div>
            <h1 className="font-semibold text-3xl ">Customers</h1>
            <NoDataAvailable />
          </div>
        )}
      </div>
    </div>
  )
}
