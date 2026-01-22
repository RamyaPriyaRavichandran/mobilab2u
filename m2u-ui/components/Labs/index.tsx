'use client'
import { ReactNode, useState } from 'react'
import LabForm from './LabForm'
import useSWR from 'swr'
import { DELETE_LAB, GET_LABS } from '@/lib/endpoints'
import { fetcher, mutater } from '@/lib/fetchers'
import Table from '../common/Tables'
import EditSVG from '../common/SVG/EditSVG'
import useSWRMutation from 'swr/mutation'
import { usePopup } from '@/lib/contexts/PopupContext'
import DeleteSVG from '../common/SVG/DeleteSVG'
import PageLoaderSVG from '../common/PageLoaderSVG'
import { constructTableColumns, TableColumnCustom } from '@/utils'
import { findFromOptions } from '@/utils/functions'
import { city } from '@/utils/constents/constantsCity'
import { state } from '@/utils/constents'
import NoDataAvailable from '../common/Nodate'

export interface LabStateInterface {
  popup: boolean
  labData: any
}
export interface TableData {
  row: {
    index: number
    original: {
      _id: string
      createdAt: string
      userRole: number
      city: string
      state: string
    }
  }
}

type CellType = (props: TableData) => ReactNode
const tableColumns = [
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
    Header: 'Create Date',
    accessor: 'createdAt',
    Cell: ({ row: { original } }: TableData) => (
      <div>{original?.createdAt?.slice(0, 10).split('-').reverse().join('-')}</div>
    ),
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
    Header: 'Organization',
    accessor: 'organization',
  },
  {
    Header: 'State',
    accessor: 'state',
    Cell: ({ row: { original } }: TableData) => <div>{original.state}</div>,
  },
  {
    Header: 'City',
    accessor: 'city',
    Cell: ({ row: { original } }: TableData) => <div>{original.city}</div>,
  },
  {
    Header: 'Post Code',
    accessor: 'postCode',
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

export default function LabsPage() {
  const [showLabForm, setShowLabForm] = useState({ popup: false, labData: {} })
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [labToDelete, setLabToDelete] = useState<string | null>(null)
  const { showSuccess, showError } = usePopup()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const { data = [], mutate, isLoading } = useSWR(GET_LABS, fetcher<Array<any>>())
  const { trigger: removeLabData } = useSWRMutation(DELETE_LAB, mutater<string, { message: string }>('DELETE'), {
    onSuccess: ({ data: { message = '' } = {} }) => {
      showSuccess(message)
      mutate()
      setShowDeleteConfirmation(false)
    },
    onError: ({ response: { data: { message = '' } = {} } }) => {
      showError(message)
      setShowDeleteConfirmation(false)
    },
    throwOnError: false,
  })

  const handleDeleteClick = (labId: string) => {
    setLabToDelete(labId)
    setShowDeleteConfirmation(true)
  }

  const handleConfirmDelete = () => {
    if (labToDelete) {
      removeLabData(labToDelete)
    }
  }

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false)
    setLabToDelete(null)
  }

  const customCells = {
    action: ({ row: { original } }: TableData) => {
      return (
        <div
          onClick={() => {
            handleDeleteClick(original._id)
          }}
        >
          <DeleteSVG />
        </div>
      )
    },
    edit: ({ row: { original } }: TableData) => (
      <div>
        <div
          onClick={() => {
            setShowLabForm({ popup: true, labData: original })
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
          onClick={() => setShowLabForm({ popup: true, labData: {} })}
        >
          Create Lab
        </button>
        {isLoading ? (
          <PageLoaderSVG />
        ) : data.length > 0 ? (
          <div>
            <Table columns={column} data={data} tableName="Labs" />
          </div>
        ) : (
          <div>
            <NoDataAvailable />
          </div>
        )}
      </div>

      {showLabForm.popup && (
        <div className="min-h-screen absolute bg-opacity-50 flex z-50 bg-other-lightblue0 inset-0">
          <LabForm showLabForm={showLabForm} setShowLabForm={setShowLabForm} mutate={mutate} />
        </div>
      )}

      {showDeleteConfirmation && (
        <div className="min-h-screen absolute bg-opacity-50 flex z-50 bg-black inset-0 justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <p className="text-lg font-semibold mb-4">Are you sure you want to delete this lab?</p>
            <div>
              <button
                className="bg-red-400 text-white px-4 py-1 rounded-md hover:bg-red-600 mr-4"
                onClick={handleConfirmDelete}
              >
                Confirm
              </button>
              <button
                className="bg-gray-100 text-black px-4 py-1 border border-gray-300 rounded-md hover:bg-gray-200"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
