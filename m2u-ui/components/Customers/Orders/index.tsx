'use client'
import useSWR from 'swr'
import {
  GET_ALL_CUSTOMER_TESTS,
  GET_CUSTOMER_TEST,
  GET_LAB_CUSTOMER_TESTS,
  GET_SERVICE_PROVIDER,
  GET_SINGLE_CUSTOMER_TEST,
  REPAY_CUSTOMER_TEST_FEES,
  REVIEW_CUSTOMER_TEST,
  UPLOAD_REPORTS_FOR_CUSTOMER_TEST,
} from '@/lib/endpoints'
import { fetcher, mutater } from '@/lib/fetchers'
import { USER_ROLES } from '@/utils/constents'
import { useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { usePopup } from '@/lib/contexts/PopupContext'
import { useAuth } from '@/lib/contexts/AuthContext'
import ReviewPopup from './ReviewPopup'
import LittleLoader from '@/components/common/LittleLoader'
import Table from '@/components/common/Tables'
import { ctableColumns, sPAndLabtableColumns } from './tablecolumns'
import TestReviewPopup from './TestReviewPopup'
import TestDetails from './TestDetails'
import NoDataAvailable from '@/components/common/Nodate'
import { useSearchParams } from 'next/navigation'
interface State {
  popup: boolean
  data: any
}
export default function Index() {
  const [test, setTest] = useState({
    popup: false,
    test: {
      _id: '',
      statusTransaction: [
        {
          status: '',
          date: '',
        },
      ],
    },
  })
  const [form, setForm] = useState<State>({ popup: false, data: {} })

  const [testError, setTestError] = useState('')
  const searchParams = useSearchParams()
  const testId = searchParams.get('id')
  const { roles } = useAuth()
  if (!!testError) {
    setTimeout(() => {
      setTestError('')
    }, 3000)
  }
  const { showSuccess, showError } = usePopup()
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const gettTestDatas: Record<string, string> = {
    SERVICE_PROVIDER: GET_ALL_CUSTOMER_TESTS,
    GP_PARTNER: GET_ALL_CUSTOMER_TESTS,
    LAB_USER: GET_LAB_CUSTOMER_TESTS,
    CUSTOMER: GET_SINGLE_CUSTOMER_TEST,
  }

  useSWR(testId ? `${GET_CUSTOMER_TEST}/${testId}` : null, fetcher<Array<any>>(), {
    onSuccess: (data) => {
      if (data) {
        setForm({
          popup: true,
          data: data,
        })
      }
    },
  })

  const {
    data: customerTest = [],
    mutate,
    isLoading: customerLoading,
  } = useSWR(roles ? gettTestDatas[roles] : null, fetcher<Array<any>>())
  const { data: serviceProvider } = useSWR(
    roles === USER_ROLES.SERVICE_PROVIDER || roles === USER_ROLES.GP_PARTNER ? GET_SERVICE_PROVIDER : null,
    fetcher<any>()
  )

  const { trigger: reviewTest, isMutating } = useSWRMutation(
    REVIEW_CUSTOMER_TEST,
    mutater<
      { testId?: string; status: string; labId?: string; declineNote?: string; reason?: string },
      { message: string }
    >('PUT'),
    {
      onSuccess: ({ data: { message = '' } = {} }) => {
        showSuccess(message)
        setTest({
          popup: false,
          test: {
            _id: '',
            statusTransaction: [],
          },
        })
        mutate()
      },
      onError: ({ response: { data: { message = '' } = {} } }) => {
        setTestError(message)
      },
      throwOnError: false,
    }
  )
  const FILE_NAMES = [
    'reportDocOne',
    'reportDocTwo',
    'reportDocThree',
    'reportDocFour',
    'reportDocFive',
    'reportDocSix',
  ]

  const submitReports = (values: { reportDocs: File[] }) => {
    const formData = new FormData()
    values.reportDocs.map((file, idx: number) => formData.append(FILE_NAMES[idx], file))
    return post(formData)
  }

  const { trigger: post, isMutating: postMutating } = useSWRMutation(
    `${UPLOAD_REPORTS_FOR_CUSTOMER_TEST}/${test.test._id}`,
    mutater<any, { message: string }>('PUT', true),
    {
      onSuccess: ({ data: { message = '' } = {} }) => {
        showSuccess(message)
        setTest({
          popup: false,
          test: {
            _id: '',
            statusTransaction: [],
          },
        })
        mutate()
      },
      onError: ({ response: { data: { message = '' } = {} } }) => {
        showError(message)
      },
      throwOnError: false,
    }
  )

  const { trigger: payTestFees, isMutating: rePayLoading } = useSWRMutation(
    REPAY_CUSTOMER_TEST_FEES,
    mutater<{ testId: string }, { stripeURL: string }>('PUT'),
    {
      onSuccess: ({ data }) => {
        window.location.href = data.stripeURL
      },
      onError: ({ response: { data: { message = '' } = {} } }) => {
        showError(message)
      },
      throwOnError: false,
    }
  )

  const tableColumns: Record<string, any> = {
    LAB_USER: sPAndLabtableColumns(setTest, serviceProvider?._id, roles, setForm, scrollToTop),
    SERVICE_PROVIDER: sPAndLabtableColumns(setTest, serviceProvider?._id, roles, setForm, scrollToTop),
    GP_PARTNER: sPAndLabtableColumns(setTest, serviceProvider?._id, roles, setForm, scrollToTop),
    CUSTOMER: ctableColumns(setTest, payTestFees, scrollToTop, setForm, rePayLoading),
  }
  return (
    <div className="p-6">
      <div className="mb-4">
        {customerLoading ? (
          <LittleLoader />
        ) : customerTest.length > 0 ? (
          <div>
            <Table columns={tableColumns[roles] || []} data={customerTest || []} tableName="Orders" />
          </div>
        ) : (
          <div>
            <h1 className="font-semibold text-3xl ">My Orders</h1>
            <NoDataAvailable />
          </div>
        )}
      </div>
      {form.popup && (
        <div className="min-h-screen absolute bg-opacity-50 flex z-50 bg-other-lightblue0 inset-0">
          <TestDetails setForm={setForm} form={form} />
        </div>
      )}

      {test.popup && (
        <div>
          {roles === USER_ROLES.SERVICE_PROVIDER || roles === USER_ROLES.GP_PARTNER || roles === USER_ROLES.LAB_USER ? (
            <ReviewPopup
              testError={testError}
              isMutating={isMutating}
              postMutating={postMutating || isMutating}
              submitReports={submitReports}
              test={test}
              setTest={setTest}
              reviewTest={reviewTest}
            />
          ) : (
            <TestReviewPopup test={test} setTest={setTest} />
          )}
        </div>
      )}
    </div>
  )
}
