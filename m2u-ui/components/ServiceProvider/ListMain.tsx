'use client'
import React, { useState } from 'react'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import Table from '../common/Tables'
import OpenEyeSVG from '../common/SVG/OpenEyeSVG'
import EditSVG from '../common/SVG/EditSVG'
import ServiceProviderDetail from './ServiceProviderDetail'
import EditForm from './EditForm'
import PageLoaderSVG from '../common/PageLoaderSVG'
import NoDataAvailable from '../common/Nodate'
import { GET_SERVICE_PROVIDERS, REVIEW_SERVICE_PROVIDER, HSP_REVIEW_MAIN } from '@/lib/endpoints'
import { usePopup } from '@/lib/contexts/PopupContext'
import { fetcher, mutater } from '@/lib/fetchers'
import { findFromOptions } from '@/utils/functions'
import { BASIC_STATUS, serviceProviderApprovalStatus, STATUS } from '@/utils/constents'
import { ServiceProviderBasics, StateInterface, TableData } from './ServideProviderInterface'

function TableHeader(setForm: React.Dispatch<React.SetStateAction<StateInterface>>, scrollToTop: () => void) {
  const column = [
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
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Phone',
      accessor: 'phone',
    },
    {
      Header: 'Emp_ID/NRIC',
      accessor: 'nricNumber',
      Cell: ({ row: { original } }: TableData) => <div>{original.nricNumber || '-'}</div>,
    },
    {
      Header: 'Emp_ID/Passport',
      accessor: 'passportNumber',
      Cell: ({ row: { original } }: TableData) => <div>{original.passportNumber || '-'}</div>,
    },
    {
      Header: 'Post Code',
      accessor: 'postCode',
    },
    {
      Header: 'Approval',
      accessor: 'adminApprovalStatus',
      Cell: ({ row: { original } }: TableData) => (
        <div>{findFromOptions(serviceProviderApprovalStatus, original.adminApprovalStatus)}</div>
      ),
    },
    {
      Header: 'Active Status',
      accessor: 'activeStatus',
      Cell: ({ row: { original } }: TableData) => <div>{STATUS[original.activeStatus] || '-'}</div>,
    },
    {
      Header: 'View',
      accessor: 'action',
      Cell: ({ row: { original } }: TableData) => (
        <div
          onClick={() => {
            setForm({ popup: true, mode: 'view', data: original })
            scrollToTop()
          }}
        >
          <OpenEyeSVG />
        </div>
      ),
    },
    {
      Header: 'Edit',
      accessor: 'edit',
      Cell: ({ row: { original } }: TableData) => (
        <div
          onClick={() => {
            setForm({ popup: true, mode: 'edit', data: original })
            scrollToTop()
          }}
        >
          <EditSVG />
        </div>
      ),
    },
  ]
  return column
}

export default function ListMain() {
  const { showSuccess, showError } = usePopup()
  const [form, setForm] = useState<StateInterface>({ popup: false, mode: null, data: {} })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const column = TableHeader(setForm, scrollToTop)
  const { data = [], mutate, isLoading } = useSWR(GET_SERVICE_PROVIDERS, fetcher<Array<ServiceProviderBasics>>())

  const path = `${REVIEW_SERVICE_PROVIDER}/${form.data._id}`

  const { trigger: reviewServiceProvider, isMutating } = useSWRMutation(
    path,
    mutater<{ adminApprovalStatus: string }, { message: string }>('PUT'),
    {
      onSuccess: ({ data: { message = '' } = {} }) => {
        setForm({ popup: false, mode: null, data: {} })
        showSuccess(message)
        mutate()
      },
      onError: ({ response: { data: { message = '' } = {} } }) => {
        showError(message)
      },
      throwOnError: false,
    }
  )

  const { trigger: reviewHSP, isMutating: hspMutating } = useSWRMutation(
    HSP_REVIEW_MAIN,
    mutater<
      { status: BASIC_STATUS.ACTIVE | BASIC_STATUS.DE_ACTIVE; userId: string; note?: string; userRole: string },
      { message: string }
    >('PUT'),
    {
      onSuccess: ({ data: { message = '' } = {} }) => {
        setForm({ popup: false, mode: null, data: {} })
        showSuccess(message)
        mutate()
      },
      onError: ({ response: { data: { message = '' } = {} } }) => {
        showError(message)
      },
      throwOnError: false,
    }
  )

  return (
    <div className="p-5">
      {isLoading ? (
        <PageLoaderSVG />
      ) : data.length <= 0 ? (
        <div>
          <h1 className="font-semibold text-3xl">Service Providers</h1>
          <NoDataAvailable />
        </div>
      ) : (
        <Table columns={column} data={data} tableName="Service Providers" />
      )}

      {form.popup && (
        <div className="min-h-screen absolute bg-opacity-50 flex z-50 bg-other-lightblue0 inset-0">
          {form.mode === 'view' ? (
            <ServiceProviderDetail
              reviewHSP={reviewHSP}
              hspMutating={hspMutating}
              isMutating={isMutating}
              reviewServiceProvider={reviewServiceProvider}
              setForm={setForm}
              form={form}
            />
          ) : (
            <EditForm
              setShowPopup={() => setForm({ popup: false, mode: null, data: {} })}
              initialData={{
                name: form.data.name,
                phone: form.data.phone,
                address: form.data.address,
                city: form.data.city,
                state: form.data.state,
                userId: form.data._id,
                userRole: form.data.userRole,
                postCode: form.data.postCode,
              }}
              mutate={mutate}
              setForm={setForm}
            />
          )}
        </div>
      )}
    </div>
  )
}
