'use client'
import { useState } from 'react'
import PackageForm from './PackageForm'
import useSWR from 'swr'
import { DELETE_PLANS, GET_PLANS } from '@/lib/endpoints'
import { fetcher, mutater } from '@/lib/fetchers'
import Table from '../common/Tables'
import EditSVG from '../common/SVG/EditSVG'
import useSWRMutation from 'swr/mutation'
import { usePopup } from '@/lib/contexts/PopupContext'
import DeleteSVG from '../common/SVG/DeleteSVG'
import LittleLoader from '../common/LittleLoader'
import { findFromOptions } from '@/utils/functions'
import { PACKAGE_REMOVE_MESSAGE, serviceType, type } from '@/utils/constents'
import { TableData } from './PlansInterface'
import { constructTableColumns, TableColumnCustom } from '@/utils'
import NoDataAvailable from '../common/Nodate'
import OpenEyeSVG from '../common/SVG/OpenEyeSVG'
import PackageDetailPopup from './PackageDetailPopup'
import { useAlert } from '@/lib/contexts/AlertContext'

export default function Packages() {
  const { showAlert } = useAlert()
  const [showPackageDetail, setShowPackageDetail] = useState({ popup: false, detail: {} })
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
      Header: 'Type',
      accessor: 'type',
      Cell: ({ row: { original } }: TableData) => {
        return <div>{findFromOptions(type, original.type) || 'Individual'}</div>
      },
    },
    {
      Header: 'Service Type',
      accessor: 'serviceType',
      Cell: ({ row: { original } }: TableData) => {
        return <div>{findFromOptions(serviceType, original.serviceType)}</div>
      },
    },
    {
      Header: 'Members',
      accessor: 'members',
      Cell: ({ row: { original } }: TableData) => {
        return <div>{original?.members ? original?.members : '-'}</div>
      },
    },
    {
      Header: 'Price',
      accessor: 'price',
    },
    {
      Header: 'Offer Price',
      accessor: 'offerPrice',
    },
    {
      Header: 'Document',
      accessor: 'documents',
      Cell: ({ row: { original } }: TableData) => {
        return (
          <a href={original.document?.s3URL} target="_blank">
            View
          </a>
        )
      },
    },
    {
      Header: 'View',
      accessor: 'view',
      Cell: ({ row: { original } }: TableData) => {
        return (
          <>
            <button onClick={() => setShowPackageDetail({ popup: true, detail: original })}>
              <OpenEyeSVG />
            </button>
          </>
        )
      },
    },

    {
      Header: 'Edit',
      accessor: 'edit',
    },
    {
      Header: 'Action',
      accessor: 'action',
    },
  ]

  const [showPlanForm, setShowPlanForm] = useState({ popup: false, planData: {} })
  const { showSuccess, showError } = usePopup()
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  const { data = [], mutate, isLoading } = useSWR(GET_PLANS, fetcher<Array<any>>())
  const { trigger: removePlanData } = useSWRMutation(DELETE_PLANS, mutater<string, { message: string }>('DELETE'), {
    onSuccess: ({ data: { message = '' } = {} }) => {
      showSuccess(message)
      mutate()
    },
    onError: ({ response: { data: { message = '' } = {} } }) => {
      showError(message)
    },
    throwOnError: false,
  })

  const customCells = {
    action: ({ row: { original } }: TableData) => {
      return (
        <div
          onClick={() => {
            if (original.serviceType !== 'SERVICE_PROVIDER_KIT_FEES') {
              showAlert(PACKAGE_REMOVE_MESSAGE, () => removePlanData(original._id))
            }
          }}
        >
          {original.serviceType === 'SERVICE_PROVIDER_KIT_FEES' ? '-' : <DeleteSVG />}
        </div>
      )
    },
    edit: ({ row: { original } }: TableData) => (
      <div>
        <div
          onClick={() => {
            setShowPlanForm({ popup: true, planData: original })
            scrollToTop()
          }}
        >
          <EditSVG />
        </div>
      </div>
    ),
  }

  const column = constructTableColumns(tableColumns, customCells)
  return (
    <div className="p-6">
      <div className=" mb-4">
        <button
          className="bg-brand-400 text-white px-4 py-2 rounded-xl hover:bg-brand-500 transition duration-200 ease-in-out"
          onClick={() => setShowPlanForm({ popup: true, planData: {} })}
        >
          Create Package
        </button>
        {isLoading ? (
          <LittleLoader />
        ) : data.length > 0 ? (
          <div>
            <Table columns={column} data={data} tableName="Packages" />
          </div>
        ) : (
          <div>
            <NoDataAvailable />
          </div>
        )}
      </div>
      {showPackageDetail.popup && (
        <PackageDetailPopup
          showPackageDetail={showPackageDetail}
          onClose={() => setShowPackageDetail({ popup: false, detail: {} })}
        />
      )}
      {showPlanForm.popup && (
        <div className="min-h-screen absolute bg-opacity-50 flex z-50 bg-other-lightblue0 inset-0">
          <PackageForm showPlanForm={showPlanForm} mutate={mutate} setShowPlanForm={setShowPlanForm} />
        </div>
      )}
    </div>
  )
}
