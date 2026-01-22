'use client'

import type React from 'react'
import useSWR from 'swr'
import {
  GET_CUSTOMER_APPOINTMENT,
  GET_CUSTOMER_PURCHASED_APPOINTMENTS,
  GET_CUSTOMER_PURCHASED_PACKAGES,
} from '@/lib/endpoints'
import { fetcher } from '@/lib/fetchers'
import type { AppointmentTableData, TableData } from '@/utils'
import { useState } from 'react'
import PageLoaderSVG from '@/components/common/PageLoaderSVG'
import Table from '@/components/common/Tables'
import NoDataAvailable from '@/components/common/Nodate'
import Detail from '@/components/Customers/PurchasedPackages/Detail'
import { sliceDate } from '@/utils/functions'
import TestReviewPopup from '../Customers/Orders/TestReviewPopup'
import { useAuth } from '@/lib/contexts/AuthContext'
import MedicineDetail from './Medicine/Detail'
import ReferralLetter from './Referral/ReferralLetter'
import TestFormModal from './Consultation/TestFormModel'
import OpenEyeSVG from '@/components/common/SVG/OpenEyeSVG'
import type { CustomerPurchasedPackagesProps, DoctorAppointment } from './types'
import { useParams } from 'next/navigation'
import CustomerTestDetails from './CustomerTestDetails'

interface State {
  popup: boolean
  test: any
}

interface FormState {
  popup: boolean
  data: any
}

function TestTableHeader(
  setTest: React.Dispatch<React.SetStateAction<State>>,
  scrollToTop: () => void,
  setForm: React.Dispatch<React.SetStateAction<FormState>>,
  roles: any
) {
  const testColumn = [
    {
      Header: 'No',
      accessor: 'No',
      Cell: ({ row: { index } }: TableData) => <div>{index + 1}</div>,
    },
    {
      Header: 'Package Name',
      accessor: 'pacagename',
      Cell: ({ row: { original } }: any) => <div>{original?.packages?.name}</div>,
    },
    {
      Header: 'Date',
      accessor: 'date',
      Cell: ({ row: { original } }: TableData) => <div>{sliceDate(original.customerAppointmentDate)}</div>,
    },
    roles?.includes('SUPER_ADMIN')
      ? {
          Header: 'Test Details',
          accessor: 'detail',
          Cell: ({ row: { original } }: TableData) => {
            return (
              <div
                className="cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => {
                  setForm({ popup: true, data: original })
                  scrollToTop()
                }}
              >
                <OpenEyeSVG />
              </div>
            )
          },
        }
      : {
          Header: 'View',
          accessor: 'view',
          Cell: ({ row: { original } }: TableData) => {
            return (
              <div
                className="cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => {
                  setTest({ popup: true, test: original })
                }}
              >
                <OpenEyeSVG />
              </div>
            )
          },
        },
  ]
  return testColumn
}

function AppointmentTableHeader(
  setAppointmentDetail: React.Dispatch<React.SetStateAction<any>>,
  setShowPrescription: React.Dispatch<React.SetStateAction<boolean>>,
  roles: any,
  setShowReferralForm: React.Dispatch<React.SetStateAction<boolean>>,
  setShowTestForm: React.Dispatch<React.SetStateAction<boolean>>
) {
  const column = [
    {
      Header: 'No',
      accessor: 'No',
      Cell: ({ row: { index } }: AppointmentTableData) => <div>{index + 1}</div>,
    },
    {
      Header: 'Appointment Type',
      accessor: 'type',
      Cell: ({ row: { original } }: AppointmentTableData) => (
        <div>{original.type === 'NORMAL_APPOINTEMNT' ? 'Normal Appointment' : 'Followup Appointment'}</div>
      ),
    },

    {
      Header: 'Date',
      accessor: 'date',
      Cell: ({ row: { original } }: AppointmentTableData) => <div>{sliceDate(original.appointmentDate)}</div>,
    },
    {
      Header: 'Time',
      accessor: 'time',
      Cell: ({ row: { original } }: AppointmentTableData) => (
        <div>
          {original.selectedTimeSlot?.startTime} - {original.selectedTimeSlot?.endTime}
        </div>
      ),
    },
    {
      Header: 'Prescription',
      accessor: 'prescription',
      Cell: ({ row: { original } }: AppointmentTableData) => {
        return original.appointmentPrescription ? (
          <div
            className="cursor-pointer hover:opacity-70 transition-opacity"
            onClick={() => {
              setAppointmentDetail(original)
              setShowPrescription(true)
            }}
          >
            <OpenEyeSVG />
          </div>
        ) : (
          <div className="text-gray-500 text-sm">No Prescription</div>
        )
      },
    },
    {
      Header: 'Referral',
      accessor: 'Referral',
      Cell: ({ row: { original } }: AppointmentTableData) => {
        return original.appointmentPrescription?.referral ? (
          <div
            className="cursor-pointer hover:opacity-70 transition-opacity"
            onClick={() => {
              setShowReferralForm(true)
              setAppointmentDetail(original)
            }}
          >
            <OpenEyeSVG />
          </div>
        ) : (
          <div className="text-gray-500 text-sm">No Referral</div>
        )
      },
    },
    {
      Header: 'Tests',
      accessor: 'Tests',
      Cell: ({ row: { original } }: AppointmentTableData) => {
        return original.appointmentPrescription?.followupTest ? (
          <div
            className="cursor-pointer hover:opacity-70 transition-opacity"
            onClick={() => {
              setShowTestForm(true)
              setAppointmentDetail(original)
            }}
          >
            <OpenEyeSVG />
          </div>
        ) : (
          <div className="text-gray-500 text-sm">No Tests</div>
        )
      },
    },
  ]
  return column
}

function PriorMedicalRecordTable() {
  return [
    {
      Header: 'No',
      accessor: 'No',
      Cell: ({ row: { index } }: any) => <div>{index + 1}</div>,
    },
    {
      Header: 'Name',
      accessor: 'name',
      Cell: ({ row: { original } }: any) => <div>{original.name}</div>,
    },
    {
      Header: 'File',
      accessor: 'document',
      Cell: ({ row: { original } }: any) => (
        <a
          href={original.document?.s3URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline cursor-pointer"
        >
          {original.document?.originalFileName || 'View File'}
        </a>
      ),
    },
  ]
}

export default function CustomerPurchasedPackages({ customerId }: CustomerPurchasedPackagesProps) {
  const [test, setTest] = useState<State>({ popup: false, test: {} })
  const [form, setForm] = useState<FormState>({ popup: false, data: {} })
  const [showPrescription, setShowPrescription] = useState(false)
  const [showReferralForm, setShowReferralForm] = useState(false)
  const [showTestForm, setShowTestForm] = useState(false)
  const { id } = useParams()
  const [appointmentDetail, setAppointmentDetail] = useState<any>({})
  const [activeTab, setActiveTab] = useState('packages')
  const { roles } = useAuth()

  const { data: testData = [], isLoading } = useSWR(
    customerId ? `${GET_CUSTOMER_PURCHASED_PACKAGES}/${customerId}` : null,
    fetcher<Array<any>>()
  )

  const { data: appointmentData = [], isLoading: appointmentLoading } = useSWR(
    customerId ? `${GET_CUSTOMER_PURCHASED_APPOINTMENTS}/${customerId}` : null,
    fetcher<Array<any>>()
  )

  const {
    data: appointmentDetails = {} as DoctorAppointment,
    mutate: appointmentMutate,
    isLoading: appointmentLoadingDetails,
  } = useSWR(`${GET_CUSTOMER_APPOINTMENT}/${id}`, fetcher<DoctorAppointment>())
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  function mutate() {
    import('swr').then(({ mutate }) => {
      if (customerId) {
        mutate(`${GET_CUSTOMER_PURCHASED_PACKAGES}/${customerId}`)
        mutate(`${GET_CUSTOMER_PURCHASED_APPOINTMENTS}/${customerId}`)
      }
    })
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <div className="mb-6">
          <div className="flex border-b">
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'packages'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('packages')}
            >
              Tests
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'appointments'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('appointments')}
            >
              Appointments
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'records'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('records')}
            >
              Prior Medical Records
            </button>
          </div>
        </div>

        {activeTab === 'packages' && (
          <div>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <PageLoaderSVG />
              </div>
            ) : testData.length > 0 ? (
              <Table
                columns={TestTableHeader(setTest, scrollToTop, setForm, roles)}
                data={testData}
                tableName="Customers Purchased Packages"
              />
            ) : (
              <NoDataAvailable />
            )}
          </div>
        )}

        {activeTab === 'appointments' && (
          <div>
            {appointmentLoading ? (
              <div className="flex justify-center py-8">
                <PageLoaderSVG />
              </div>
            ) : appointmentData.length > 0 ? (
              <Table
                columns={AppointmentTableHeader(
                  setAppointmentDetail,
                  setShowPrescription,
                  roles,
                  setShowReferralForm,
                  setShowTestForm
                )}
                data={appointmentData}
                tableName="Customers Purchased Appointments"
              />
            ) : (
              <NoDataAvailable />
            )}
          </div>
        )}

        {activeTab === 'records' && (
          <div>
            {appointmentDetails?.medicalRecords && appointmentDetails.medicalRecords.length > 0 ? (
              <Table
                columns={PriorMedicalRecordTable()}
                data={appointmentDetails.medicalRecords ?? []}
                tableName="Prior Medical Records"
              />
            ) : (
              <NoDataAvailable />
            )}
          </div>
        )}
      </div>

      {form.popup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <CustomerTestDetails
              setForm={setForm}
              form={{ data: form.data }}
              setView={() => {}}
              view=""
              sampleRecollectionApproval={() => {}}
              sampleRecollectionLoading={false}
            />
          </div>
        </div>
      )}

      {showPrescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <MedicineDetail
              isEdit={false}
              appointmentDetails={appointmentDetail}
              medicine={appointmentDetail?.appointmentPrescription?.medicine || {}}
              onClose={() => setShowPrescription(false)}
              followupDate={appointmentDetail?.appointmentPrescription?.followUpAppointmentDate}
            />
          </div>
        </div>
      )}

      {showReferralForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <ReferralLetter
              doctorSign={appointmentDetail.approvedDoctor?.eSign?.s3URL}
              isEdit={false}
              doctorName={appointmentDetail.approvedDoctor?.name || ''}
              onClose={() => setShowReferralForm(false)}
              referralData={appointmentDetail?.appointmentPrescription?.referral || {}}
              appointmentDate={appointmentDetail?.appointmentDate}
            />
          </div>
        </div>
      )}

      {showTestForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <TestFormModal
              mutate={mutate}
              followUpTest={appointmentDetail?.appointmentPrescription?.followupTest || {}}
              onClose={() => setShowTestForm(false)}
            />
          </div>
        </div>
      )}

      {test.popup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <TestReviewPopup setTest={setTest} test={test} />
          </div>
        </div>
      )}
    </div>
  )
}
