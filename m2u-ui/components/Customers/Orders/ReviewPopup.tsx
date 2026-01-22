import { Form, Formik } from 'formik'
import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import {
  CUSTOMER_LAB_TEST_STATUS,
  INPUT_MAXIMUM_SIX,
  INPUT_MINIMUM_SIX,
  INPUT_REQUIRED,
  USER_ROLES,
} from '@/utils/constents'
import { LOCAL_LABS } from '@/lib/endpoints'
import { useAuth } from '@/lib/contexts/AuthContext'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetchers'
import RadioInput from '@/components/common/Input/RadioInput'
import SelectInput from '@/components/common/Input/SelectInput'
import MultiFileUpload from '@/components/common/Input/MultiFileUpload'
import {
  LabReviewInterface,
  ReviewPopupInterface,
  SpReviewInterface,
  SPReviewValues,
  LabReviewValues,
} from '../CustomerInterface'
import { useOnClickOutside } from 'usehooks-ts'
import DashLoader from '@/components/common/DashLoader'
import TextInput from '@/components/common/Input/TextInput'
import TextAreaInput from '@/components/common/Input/TextAreaInput'
import * as Yup from 'yup'
import { getLatestStatus } from '@/utils/functions'

export default function ReviewPopup({
  test,
  setTest,
  submitReports,
  postMutating,
  testError,
  isMutating,
  reviewTest,
}: ReviewPopupInterface) {
  const { roles } = useAuth()

  function onClose() {
    setTest({
      popup: false,
      test: { _id: '', statusTransaction: [] },
    })
  }

  const modelRef = useRef(null)
  useOnClickOutside(modelRef, onClose)

  const isSPorGP = roles === USER_ROLES.SERVICE_PROVIDER || roles === USER_ROLES.GP_PARTNER

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 backdrop-blur-sm">
      <motion.div
        ref={modelRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white bg-opacity-90 p-6 m-2 rounded-2xl shadow-xl backdrop-filter backdrop-blur-lg max-w-lg w-full"
      >
        <h2 className="text-2xl font-medium text-gray-800">Test Details</h2>

        <div className="grid grid-cols-2 gap-2 text-sm mb-6">
          {test.test?.reports?.map((report: string, index: number) => (
            <p key={index} className="bg-gray-100 rounded-lg p-2">
              {report}
            </p>
          ))}
        </div>

        {isSPorGP && (
          <SPReview
            testError={testError}
            isMutating={isMutating ?? false}
            reviewTest={reviewTest}
            roles={roles}
            setTest={setTest}
            test={test}
          />
        )}
        {roles === USER_ROLES.LAB_USER && (
          <LabReview
            testError={testError}
            postMutating={postMutating ?? false}
            reviewTest={reviewTest}
            submitReports={submitReports}
            roles={roles}
            setTest={setTest}
            test={test}
          />
        )}
      </motion.div>
    </div>
  )
}

function SPReview({ setTest, roles, test, reviewTest, isMutating, testError }: SpReviewInterface) {
  const currentStatus = getLatestStatus(test.test.statusTransaction)

  const popupStatus: Record<string, CUSTOMER_LAB_TEST_STATUS | ''> = {
    PROCESSING: CUSTOMER_LAB_TEST_STATUS.SERVICE_PROVIDER_APPROVED,
    SERVICE_PROVIDER_APPROVED: CUSTOMER_LAB_TEST_STATUS.LAB_ASSIGNED,
    LAB_ASSIGNED: CUSTOMER_LAB_TEST_STATUS.SAMPLE_COLLECTED,
    SAMPLE_COLLECTED: CUSTOMER_LAB_TEST_STATUS.SAMPLE_SUBMITTED_TO_LAB,
    SAMPLE_RE_COLLECTION_APPROVED: CUSTOMER_LAB_TEST_STATUS.SAMPLE_RE_COLLECTED,
    SAMPLE_RE_COLLECTED: CUSTOMER_LAB_TEST_STATUS.RE_COLLECTED_SAMPLE_SUBMITTED_TO_LAB,
    undefined: '',
  }

  const OTP_REQUIRED_STATUSES: CUSTOMER_LAB_TEST_STATUS[] = [
    CUSTOMER_LAB_TEST_STATUS.SAMPLE_RE_COLLECTED,
    CUSTOMER_LAB_TEST_STATUS.SAMPLE_COLLECTED,
    CUSTOMER_LAB_TEST_STATUS.SAMPLE_SUBMITTED_TO_LAB,
    CUSTOMER_LAB_TEST_STATUS.RE_COLLECTED_SAMPLE_SUBMITTED_TO_LAB,
  ]
  const spReviewSchema = Yup.object().shape({
    status: Yup.string().required(INPUT_REQUIRED),
    testId: Yup.string().required(INPUT_REQUIRED),
    declineNote: Yup.string().when('status', {
      is: CUSTOMER_LAB_TEST_STATUS.DECLINED,
      then: () => Yup.string().required(INPUT_REQUIRED),
    }),
    labId: Yup.string().when('status', {
      is: CUSTOMER_LAB_TEST_STATUS.LAB_ASSIGNED,
      then: () => Yup.string().required(INPUT_REQUIRED),
    }),
    otp: Yup.string().when('status', {
      is: (value: string) => OTP_REQUIRED_STATUSES.includes(value as CUSTOMER_LAB_TEST_STATUS),
      then: () => Yup.string().required(INPUT_REQUIRED).min(6, INPUT_MINIMUM_SIX).max(6, INPUT_MAXIMUM_SIX),
    }),
  })

  const { data: labs } = useSWR(
    roles === USER_ROLES.SERVICE_PROVIDER ? LOCAL_LABS : null,
    fetcher<Array<{ label: string; value: string }>>()
  )

  const data: any = {
    SERVICE_PROVIDER_APPROVED: {
      label: 'Do you want to Approve the Test?',
      InputField: RadioInput,
      option: [{ label: 'Approve', value: CUSTOMER_LAB_TEST_STATUS.SERVICE_PROVIDER_APPROVED }],
      ipName: 'status',
    },
    LAB_ASSIGNED: {
      label: 'Assign Lab',
      InputField: SelectInput,
      ipName: 'labId',
      option: labs,
    },
    SAMPLE_COLLECTED: 'Please enter the OTP from customer and submit to mark the sample as collected',
    SAMPLE_SUBMITTED_TO_LAB: 'Please enter the OTP from lab and submit to mark the sample as submited to lab',
    SAMPLE_RE_COLLECTED: 'Please enter the OTP from customer and submit to mark the sample as re-collected',
    RE_COLLECTED_SAMPLE_SUBMITTED_TO_LAB:
      'Please enter the OTP from lab and submit to mark the re-collected sample as submited to lab',
  }

  return (
    <div>
      <Formik<SPReviewValues>
        initialValues={{
          declineNote: '',
          status: (popupStatus[currentStatus] as CUSTOMER_LAB_TEST_STATUS) || '',
          testId: test.test._id || '',
          labId: '',
          otp: '',
        }}
        validationSchema={spReviewSchema}
        enableReinitialize
        onSubmit={(values) => {
          reviewTest(values)
        }}
      >
        {({ values }) => {
          const descriptionDisplayStatus = Object.keys(data)
          const dataMain = data[values.status]
          return (
            <Form>
              {descriptionDisplayStatus.includes(values.status) && (
                <div className="mb-4">
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    {dataMain.label ? dataMain.label : dataMain}
                  </label>
                  {dataMain.ipName && <dataMain.InputField name={dataMain.ipName} options={dataMain.option} />}
                </div>
              )}
              {OTP_REQUIRED_STATUSES.includes(popupStatus[currentStatus] as CUSTOMER_LAB_TEST_STATUS) && (
                <div className="mt-4">
                  <label className="block text-sm font-normal text-gray-900 mb-1">OTP</label>
                  <TextInput type="text" name="otp" placeholder="Enter OTP" />
                </div>
              )}

              {testError && <p className="text-red-600">{testError}</p>}

              <div className="mt-8 flex space-x-4">
                <button
                  type="button"
                  onClick={() =>
                    setTest({
                      popup: false,
                      test: { _id: '', statusTransaction: [] },
                    })
                  }
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  disabled={isMutating}
                  type="submit"
                  className="flex-1 bg-brand-400 text-white py-2 px-4 rounded-lg hover:bg-brand-600 transition-all"
                >
                  {isMutating ? <DashLoader color="white" /> : 'Submit'}
                </button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

function LabReview({ setTest, testError, reviewTest, submitReports, test, postMutating }: LabReviewInterface) {
  const labReviewSchema = Yup.object().shape({
    status: Yup.string().required(INPUT_REQUIRED),
    reason: Yup.string().when('status', {
      is: CUSTOMER_LAB_TEST_STATUS.NEED_SAMPLE_RE_COLLECTION,
      then: () => Yup.string().required(INPUT_REQUIRED),
    }),
    reportDocs: Yup.array().when('status', {
      is: 'UPLOAD_REPORT',
      then: () => Yup.array().required(INPUT_REQUIRED).min(1, 'Mininum 1 doc is required'),
    }),
  })

  return (
    <div>
      <Formik<LabReviewValues>
        initialValues={{
          status: '',
          reason: '',
          testId: '',
          reportDocs: [],
        }}
        enableReinitialize
        validationSchema={labReviewSchema}
        onSubmit={(values) => {
          if (values.status === CUSTOMER_LAB_TEST_STATUS.NEED_SAMPLE_RE_COLLECTION) {
            values.testId = test.test._id
            reviewTest(values)
          } else {
            submitReports(values)
          }
        }}
      >
        {({ values }) => (
          <Form>
            <label className="block text-lg font-medium text-gray-700 mb-2">Select an action</label>
            <RadioInput
              name="status"
              options={[
                {
                  label: 'Need Sample Recollection',
                  value: CUSTOMER_LAB_TEST_STATUS.NEED_SAMPLE_RE_COLLECTION,
                },
                {
                  label: 'Upload Report',
                  value: 'UPLOAD_REPORT',
                },
              ]}
            />

            {values.status === CUSTOMER_LAB_TEST_STATUS.NEED_SAMPLE_RE_COLLECTION && (
              <div className="mt-4">
                <TextAreaInput
                  name="reason"
                  placeholder="Enter reason for sample recollection"
                  label="Reason for Recollection"
                />
              </div>
            )}

            {values.status === 'UPLOAD_REPORT' && (
              <div className="mt-4">
                <MultiFileUpload
                  label="Upload Report Docs"
                  name="reportDocs"
                  fileSize={2}
                  fileLimit={test.test?.members?.length || 1}
                />
              </div>
            )}

            {testError && <p className="text-red-600 mt-2">{testError}*</p>}

            <div className="mt-6 flex space-x-2">
              <button
                type="button"
                onClick={() =>
                  setTest({
                    popup: false,
                    test: { _id: '', statusTransaction: [] },
                  })
                }
                className="flex-1 bg-gray-500 text-white py-2 px-2 rounded-lg hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={postMutating}
                className={`flex-1 px-5 py-2 text-sm font-semibold rounded-lg text-white transition-all ${
                  postMutating ? 'bg-brand-300 cursor-not-allowed' : 'bg-brand-500 hover:bg-brand-600 '
                }`}
              >
                {postMutating ? <DashLoader color="white" /> : 'Submit'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
