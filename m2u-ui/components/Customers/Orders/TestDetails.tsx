'use client'
import { type Dispatch, type SetStateAction, useRef } from 'react'
import { CUSTOMER_TEST_STATUS, USER_ROLES } from '@/utils/constents'
import { useOnClickOutside } from 'usehooks-ts'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline'
import type { CustomerTestDetailsInterface } from './CustomerTestDetailsInterface'
import { useAuth } from '@/lib/contexts/AuthContext'
import SpDetail from './SpDetail'
import OrderDetail from './OrderDetail'
import { motion } from 'framer-motion'
import CustomerDetail from './CustomerDetail'
import Lab from './LabDetail'
import StatusBadge from '@/components/common/Badges/StatusBadge'
import MemberTable from './MembersTable'
import CloseButton from '@/components/common/Buttons/CloseButton'

export default function TestDetails({
  setForm,
  form: { data },
}: {
  setForm: Dispatch<SetStateAction<{ data: object; popup: boolean }>>
  form: { data: CustomerTestDetailsInterface }
}) {
  const { roles } = useAuth()
  const modalRef = useRef(null)
  const handleClickOutside = () => {
    setForm({
      popup: false,
      data: {},
    })
  }
  useOnClickOutside(modalRef, handleClickOutside)
  const customerOTPVisibleStatus = [
    CUSTOMER_TEST_STATUS.SAMPLE_RE_COLLECTION_APPROVED,
    CUSTOMER_TEST_STATUS.SERVICE_PROVIDER_APPROVED,
    CUSTOMER_TEST_STATUS.LAB_ASSIGNED,
  ]

  const labOTPVisibleStatus = [
    CUSTOMER_TEST_STATUS.LAB_ASSIGNED,
    CUSTOMER_TEST_STATUS.SAMPLE_COLLECTED,
    CUSTOMER_TEST_STATUS.SAMPLE_RE_COLLECTION_APPROVED,
    CUSTOMER_TEST_STATUS.SAMPLE_RE_COLLECTED,
  ]
  const currentStatus = data.statusTransaction[data.statusTransaction.length - 1].status
  const isLABorSPview = roles === USER_ROLES.LAB_USER || roles === USER_ROLES.SERVICE_PROVIDER
  const isCUSTOMERorLABview = roles === USER_ROLES.CUSTOMER || roles === USER_ROLES.LAB_USER
  const approvedSPorGP = data.approvedServiceProvider?._id || data.approvedGpPartner?._id
  const isSPview = roles === USER_ROLES.SERVICE_PROVIDER || roles === USER_ROLES.GP_PARTNER
  const OTPVisibleUser =
    roles === USER_ROLES.CUSTOMER
      ? customerOTPVisibleStatus.includes(currentStatus as CUSTOMER_TEST_STATUS)
      : roles === USER_ROLES.LAB_USER && labOTPVisibleStatus.includes(currentStatus as CUSTOMER_TEST_STATUS)
  const otpContent =
    roles === USER_ROLES.CUSTOMER
      ? 'Share this OTP with the HSP only during sample collection.'
      : 'Use this OTP to verify the sample before accepting it'
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-[90%] md:max-w-[950px] mx-auto bg-gray-50 rounded-lg shadow-lg overflow-hidden max-h-[95vh] overflow-y-auto"
      >
        <div className="px-6 py-8">
          <div className="md:flex space-x-2 ">
            <p className="text-2xl font-bold text-left mb-4">Customer Order Details - </p>
            <div className="mt-1">{StatusBadge(currentStatus)}</div>
          </div>

          <OrderDetail data={data || {}} />

          {data?.members?.length > 0 && <MemberTable members={data?.members || []} />}
          {isLABorSPview && <CustomerDetail customer={data.customer || {}} />}

          {data.submittedLab?.name && isSPview && <Lab lab={data.submittedLab || {}} />}

          {isCUSTOMERorLABview && approvedSPorGP && (
            <SpDetail sp={data.approvedServiceProvider || data.approvedGpPartner || {}} />
          )}
          {OTPVisibleUser && (
            <div className="mt-6 flex flex-col items-center text-center">
              <h3 className="text-md font-semibold mb-1 text-gray-800">{otpContent}</h3>
              <div className="bg-white border border-dashed border-brand-500 rounded-lg px-4 py-3 text-lg font-mono text-brand-600 shadow-sm w-fit mt-4">
                OTP: {data?.OTP?.originalOTP}
              </div>
            </div>
          )}

          {data?.reports?.length > 0 && <Reports reports={data.reports || []} />}
          <div className="flex gap-2 justify-end mt-6 mr-8">
            <CloseButton onClose={() => setForm({ popup: false, data: {} })} />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function Reports({ reports }: { reports: Array<any> }) {
  return (
    <section className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <ClipboardDocumentListIcon className="h-6 w-6 text-red-600" />
        <h2 className="text-xl font-semibold text-foreground">Reports</h2>
        <span className="ml-2 px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 text-sm font-medium">
          {reports.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((ob: any, index: number) => (
          <a
            href={ob.s3URL}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            className="group relative bg-card border border-border rounded-lg p-4 hover:shadow-lg hover:border-red-500/50 transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                <ClipboardDocumentListIcon className="h-5 w-5 text-red-600" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-card-foreground group-hover:text-red-600 transition-colors truncate">
                  {ob.originalFileName.replace(/\.[^.]+$/, '')}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {ob.originalFileName.split('.').pop()?.toUpperCase()} Document
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center text-xs text-muted-foreground">
              <svg
                className="w-4 h-4 mr-1.5 group-hover:text-red-600 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              <span className="group-hover:text-red-600 transition-colors">Open report</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
