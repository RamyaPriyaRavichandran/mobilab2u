'use client'
import React, { useState } from 'react'
import { BanknotesIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline'
import StatusBadge from '@/components/common/Badges/StatusBadge'
import Lab from '../Orders/LabDetail'
import CustomerDetail from '../Orders/CustomerDetail'
import SpDetail from '../Orders/SpDetail'
import OrderDetail from '../Orders/OrderDetail'
import MemberTable from '../Orders/MembersTable'
import { getLatestStatus } from '@/utils/functions'
import TextContainer from '@/components/common/TextContainer'
import { Form, Formik } from 'formik'
import TextInput from '@/components/common/Input/TextInput'
import SelectInput from '@/components/common/Input/SelectInput'
import { INPUT_REQUIRED, labTestTimeSlots } from '@/utils/constents'
import DashLoader from '@/components/common/DashLoader'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import { useParams } from 'next/navigation'
import { GET_CUSTOMER_TEST, SAMPLE_RE_COLLECTION_APPROVAL, TEST_CANCELLATION, TEST_RESCHEDULE } from '@/lib/endpoints'
import { fetcher, mutater } from '@/lib/fetchers'
import { usePopup } from '@/lib/contexts/PopupContext'
import useSWRMutation from 'swr/mutation'
import PageLoaderSVG from '@/components/common/PageLoaderSVG'
import TextAreaInput from '@/components/common/Input/TextAreaInput'

const sampleRecollectionApprovalSchema = Yup.object().shape({
  type: Yup.string().required(INPUT_REQUIRED),
  customerAppointmentDate: Yup.string().when('type', {
    is: (val: string) => val === 'SAMPLE_RE_COLLECTION' || val === 'RESCHEDULE',
    then: (schema) => schema.required(INPUT_REQUIRED),
    otherwise: (schema) => schema.notRequired(),
  }),
  customerAppointmentTime: Yup.string().when('type', {
    is: (val: string) => val === 'SAMPLE_RE_COLLECTION' || val === 'RESCHEDULE',
    then: (schema) => schema.required(INPUT_REQUIRED),
    otherwise: (schema) => schema.notRequired(),
  }),
  cancellationReason: Yup.string().when('type', {
    is: 'CANCEL',
    then: (schema) => schema.required(INPUT_REQUIRED),
    otherwise: (schema) => schema.notRequired(),
  }),

  testId: Yup.string().required(INPUT_REQUIRED),
})

export default function CustomerPurchasedPackageDetails() {
  const { showSuccess, showError } = usePopup()
  const [showForm, setShowForm] = useState({
    popup: false,
    type: '',
  })

  const [error, setError] = useState('')

  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { data, isLoading, mutate } = useSWR(id ? `${GET_CUSTOMER_TEST}/${id}` : null, fetcher<any>())

  const { trigger: sampleRecollectionApproval, isMutating: sampleRecollectionLoading } = useSWRMutation(
    SAMPLE_RE_COLLECTION_APPROVAL,
    mutater<{ testId: string; customerAppointmentDate: string; customerAppointmentTime: string }, { message: string }>(
      'PUT'
    ),
    {
      onSuccess: ({ data }) => {
        mutate()
        setShowForm({
          popup: false,
          type: '',
        })
        showSuccess(data.message)
      },
      onError: ({ response: { data: { message = '' } = {} } }) => {
        setError(message)
      },
      throwOnError: false,
    }
  )
  const { trigger: reScheduleTest, isMutating: testRescheduleLoading } = useSWRMutation(
    TEST_RESCHEDULE,
    mutater<{ testId: string; customerAppointmentDate: string; customerAppointmentTime: string }, { message: string }>(
      'PUT'
    ),
    {
      onSuccess: ({ data }) => {
        mutate()
        setShowForm({
          popup: false,
          type: '',
        })
        showSuccess(data.message)
      },
      onError: ({ response: { data: { message = '' } = {} } }) => {
        setError(message)
      },
      throwOnError: false,
    }
  )
  const { trigger: cancelTest, isMutating: cancelTestRescheduleLoading } = useSWRMutation(
    TEST_CANCELLATION,
    mutater<{ testId: string; cancellationReason: string }, { message: string }>('PUT'),
    {
      onSuccess: ({ data }) => {
        mutate()
        setShowForm({
          popup: false,
          type: '',
        })
        showSuccess(data.message)
      },
      onError: ({ response: { data: { message = '' } = {} } }) => {
        setError(message)
      },
      throwOnError: false,
    }
  )

  if (isLoading)
    return (
      <div className="p-6">
        <PageLoaderSVG />
      </div>
    )
  if (!data) return <div className="p-6">No details found.</div>

  const approvedSPorGP = data.approvedServiceProvider?._id || data.approvedGpPartner?._id
  const reScheduleStatuses = getLatestStatus(data.statusTransaction) === 'NEED_SAMPLE_RE_COLLECTION'
  const testCancelled = data.statusTransaction.find((d: any) => d.status === 'CANCELLED')?.status
  console.log('testCancelled', testCancelled)
  const cancelTestButton = getLatestStatus(data.statusTransaction) !== 'TEST_COMPLETED' && !testCancelled
  const canRescheduleTest = data.statusTransaction.length <= 3 && !testCancelled
  const popupText: Record<string, string> = {
    CANCEL: 'Cancel Test',
    SAMPLE_RE_COLLECTION: 'Reschedule Sample Recollection',
    RESCHEDULE: 'Reschedule test',
  }
  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-800">Customer Purchased Package Details</h1>
            <div>{StatusBadge(getLatestStatus(data.statusTransaction))}</div>
          </div>

          <div className="flex space-x-3 ml-2">
            <button
              onClick={() => router.back()}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              ← Back
            </button>

            {reScheduleStatuses && (
              <button
                onClick={() =>
                  setShowForm({
                    popup: true,
                    type: 'SAMPLE_RE_COLLECTION',
                  })
                }
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Recollection Approve
              </button>
            )}
            {canRescheduleTest && (
              <button
                onClick={() => {
                  setShowForm({
                    popup: true,
                    type: 'RESCHEDULE',
                  })
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Reschedule Test
              </button>
            )}
            {cancelTestButton && (
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                onClick={() =>
                  setShowForm({
                    popup: true,
                    type: 'CANCEL',
                  })
                }
              >
                Cancel Test
              </button>
            )}
          </div>
        </div>
        {/* {data.cancellationReason && (
          <div>
            <p className='text-red-600'>
              Cancel Reason : <span className='text-black'>{data.cancellationReason}</span>
            </p>
          </div>
        )} */}
        {/* Order Info */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <OrderDetail data={data || {}} />
        </div>
        {/* Splitting Share */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="font-semibold text-lg border-b pb-2 mb-4">Splitting Share Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TextContainer Icon={BanknotesIcon} label="Package Price" value={data?.packages?.offerPrice || '-'} />
            <TextContainer Icon={BanknotesIcon} label="HSP Share" value={data?.packages?.hspShare || '-'} />
            <TextContainer Icon={BanknotesIcon} label="Lab Share" value={data?.packages?.labShare || '-'} />
            <TextContainer Icon={BanknotesIcon} label="Mobilab Share" value={data?.packages?.mobilabShare || '-'} />
            {data?.packages?.gpShare && (
              <TextContainer Icon={BanknotesIcon} label="GP Share" value={data?.packages?.gpShare || '-'} />
            )}
            <TextContainer Icon={BanknotesIcon} label="Customer Share" value={data?.packages?.customerShare || '-'} />
          </div>
        </div>

        {/* Members */}
        {data?.members?.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <MemberTable members={data.members || []} />
          </div>
        )}
        {/* Customer / SP / Lab */}
        <div className=" mb-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <CustomerDetail
              customer={{
                customerAddress: data.customerAddress,
                ...data.customer,
              }}
            />
          </div>
          {approvedSPorGP && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <SpDetail sp={data?.approvedServiceProvider || data?.approvedGpPartner || {}} />
            </div>
          )}
          {data?.submittedLab && (
            <div className="bg-white rounded-xl shadow-md p-6 md:col-span-2">
              <Lab lab={data.submittedLab || {}} />
            </div>
          )}
        </div>
        {/* Reports */}
        {data.reports?.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="font-semibold text-lg border-b pb-2 mb-4">Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {data?.reports.map((ob: { s3URL: string; originalFileName: string }, index: number) => (
                <a
                  key={index}
                  href={ob.s3URL}
                  target="_blank"
                  className="flex items-center space-x-2 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                >
                  <ClipboardDocumentListIcon className="h-5 w-5 text-brand-400" />
                  <span>{ob.originalFileName.split('.')[0]}</span>
                </a>
              ))}
            </div>
          </div>
        )}
        {/* Sample Recollection Popup */}
        {showForm.popup && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative">
              {/* Header with Back & Title */}
              <div className="flex items-center justify-between border-b pb-3 mb-4">
                <button
                  type="button"
                  onClick={() =>
                    setShowForm({
                      popup: false,
                      type: '',
                    })
                  }
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition"
                >
                  <span className="text-sm font-medium">← Back</span>
                </button>
                <h1 className="text-lg font-semibold text-gray-800"> {popupText[showForm.type]}</h1>
                {/* Empty div to balance spacing */}
                <div className="w-12" />
              </div>

              <Formik
                initialValues={{
                  type: showForm.type,
                  testId: data._id,
                  customerAppointmentDate: data.customerAppointmentDate?.slice(0, 10) || '',
                  customerAppointmentTime: data.customerAppointmentTime || '',
                  cancellationReason: '',
                }}
                enableReinitialize
                validationSchema={sampleRecollectionApprovalSchema}
                onSubmit={(values, { setSubmitting }) => {
                  console.log('values', values)
                  if (showForm.type === 'CANCEL') {
                    cancelTest(values)
                  } else if (showForm.type === 'RESCHEDULE') {
                    reScheduleTest(values)
                  } else {
                    sampleRecollectionApproval(values)
                  }
                  setSubmitting(false)
                }}
              >
                {() => {
                  const currentDate = new Date()
                  const nextDate = new Date(currentDate)
                  nextDate.setDate(currentDate.getDate() + 1)
                  const nextDateString = nextDate.toISOString().split('T')[0]

                  return (
                    <Form className="space-y-5">
                      {error && <p className="text-red-500">{error}*</p>}
                      {showForm.type === 'SAMPLE_RE_COLLECTION' && (
                        <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm">
                          <strong>Reason:</strong> {data.sampleRecollectionReason}
                        </div>
                      )}
                      {showForm.type === 'CANCEL' ? (
                        <TextAreaInput name="cancellationReason" label="Cancellation Reason" />
                      ) : (
                        <>
                          <TextInput
                            minStartDate={nextDateString}
                            type="date"
                            label="Customer Appointment Date"
                            name="customerAppointmentDate"
                          />
                          <SelectInput
                            label="Customer Appointment Time"
                            name="customerAppointmentTime"
                            options={labTestTimeSlots}
                          />
                        </>
                      )}

                      {/* Submit Button at Top */}
                      <div className="sticky bottom-0 pt-4">
                        <button
                          type="submit"
                          disabled={sampleRecollectionLoading}
                          className={`w-full py-3 rounded-xl text-white font-medium shadow transition 
                    ${sampleRecollectionLoading || testRescheduleLoading || cancelTestRescheduleLoading ? 'bg-brand-300 cursor-not-allowed' : 'bg-brand-500 hover:bg-brand-600'}
                  `}
                        >
                          {sampleRecollectionLoading || testRescheduleLoading || cancelTestRescheduleLoading ? (
                            <DashLoader color="white" />
                          ) : (
                            'Submit'
                          )}
                        </button>
                      </div>
                    </Form>
                  )
                }}
              </Formik>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
