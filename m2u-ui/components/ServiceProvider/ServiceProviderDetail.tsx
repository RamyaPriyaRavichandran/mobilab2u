'use client'
import { useState, useRef, Dispatch, SetStateAction } from 'react'
import { findFromOptions } from '@/utils/functions'
import { BASIC_STATUS, gender, language, qualification, STATUS } from '@/utils/constents'
import LittleLoader from '../common/LittleLoader'
import { motion } from 'framer-motion'
import { useOnClickOutside } from 'usehooks-ts'
import {
  UserGroupIcon,
  UserCircleIcon,
  PhoneIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  EnvelopeIcon,
  MapPinIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import type { HSPDetailInterface, ServiceProviderBasics, StateInterface } from './ServideProviderInterface'
import TextCointainer from '../common/TextContainer'

export default function ServiceProviderDetail({
  setForm,
  form: { data },
  reviewServiceProvider,
  isMutating,
  reviewHSP,
  hspMutating,
}: HSPDetailInterface) {
  console.log('data', data)
  const getUrl = (doc: any) => (Array.isArray(doc) ? doc[0] : doc)?.s3URL

  const supportingDocuments = [
    { documentName: 'Document 1', s3Url: getUrl(data.mQdocOne) },
    { documentName: 'Document 2', s3Url: getUrl(data.mQdocTwo) },
    { documentName: 'Document 3', s3Url: getUrl(data.mQdocThree) },
    { documentName: 'Document 4', s3Url: getUrl(data.mQdocFour) },
    { documentName: 'Passport size photo', s3Url: getUrl(data.passportSizePhoto) },
    { documentName: 'Mykad', s3Url: getUrl(data.myKad) },
    { documentName: 'E-Sign', s3Url: getUrl(data.eSign) },
  ].filter((doc) => doc.s3Url)

  const [status, setStatus] = useState<string>(data?.adminApprovalStatus || '')
  const modalRef = useRef(null)

  // New states for remark popup
  const [showRemarkPopup, setShowRemarkPopup] = useState(false)
  const [remark, setRemark] = useState('')
  const [actionType, setActionType] = useState<BASIC_STATUS.ACTIVE | BASIC_STATUS.DE_ACTIVE>(BASIC_STATUS.ACTIVE)
  const remarkModalRef = useRef(null)

  const handleClickOutside = () => {
    setForm({ popup: false, data: {}, mode: null })
  }

  useOnClickOutside(modalRef, handleClickOutside)

  // Only close remark popup when clicking outside
  useOnClickOutside(remarkModalRef, (e) => {
    if (showRemarkPopup) {
      // Prevent closing if clicking inside the modal
      if (remarkModalRef.current && !(remarkModalRef.current as Node).contains(e.target as Node)) {
        setShowRemarkPopup(false)
      }
    }
  })

  const handleReview = (newStatus: string) => {
    reviewServiceProvider({ adminApprovalStatus: newStatus })
    setStatus(newStatus)
  }

  // Open remark popup
  const openRemarkPopup = (type: BASIC_STATUS.ACTIVE | BASIC_STATUS.DE_ACTIVE) => {
    setActionType(type)
    setRemark('')
    setShowRemarkPopup(true)
  }

  // Submit remark and execute reviewHSP
  const handleSubmitRemark = () => {
    reviewHSP({
      userId: data._id,
      userRole: 'SERVICE_PROVIDER',
      status: actionType,
      note: remark.trim() || (actionType === BASIC_STATUS.DE_ACTIVE ? 'Deactivation note' : undefined),
    })
    setShowRemarkPopup(false)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-[95%] sm:max-w-[80%] md:max-w-[650px] bg-gray-50 rounded-lg shadow-lg overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <div className="px-6 py-6 sm:py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <p className="text-xl sm:text-2xl font-bold">Service Provider Detail</p>
            {data.adminApprovalStatus === BASIC_STATUS.APPROVED && (
              <div className="space-x-2 flex">
                {data.activeStatus === BASIC_STATUS.ACTIVE ? (
                  <button
                    disabled={hspMutating}
                    onClick={() => openRemarkPopup(BASIC_STATUS.DE_ACTIVE)}
                    className="px-4 py-1 rounded-md text-white bg-red-500"
                  >
                    {hspMutating ? <LittleLoader /> : 'Deactivate'}
                  </button>
                ) : (
                  <button
                    disabled={hspMutating}
                    onClick={() => openRemarkPopup(BASIC_STATUS.ACTIVE)}
                    className="px-4 py-1 rounded-md text-white bg-green-500"
                  >
                    {hspMutating ? <LittleLoader /> : 'Activate'}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 mt-6">
            <TextCointainer Icon={UserCircleIcon} label="Name" value={data?.name} />
            <TextCointainer
              Icon={CalendarDaysIcon}
              label="Created Date"
              value={data.createdAt?.slice(0, 10).split('-').reverse().join('-')}
            />
            <TextCointainer Icon={PhoneIcon} label="Phone" value={data?.phone} />
            <TextCointainer
              Icon={ClipboardDocumentListIcon}
              label={data.nricNumber ? 'NRIC Number' : 'Passport Number'}
              value={data?.nricNumber || data.passportNumber}
            />
            {data.userRole === 'G.P Partner' && (
              <TextCointainer Icon={UserGroupIcon} label="Language" value={findFromOptions(language, data.language)} />
            )}
            <TextCointainer Icon={UserGroupIcon} label="Gender" value={findFromOptions(gender, data?.gender)} />
            <TextCointainer Icon={EnvelopeIcon} label="Email" value={data?.email} />
            <TextCointainer Icon={MapPinIcon} label="Address" value={data?.address} />
            <TextCointainer Icon={MapPinIcon} label="PostCode" value={data?.postCode} />
            <TextCointainer
              Icon={ClipboardDocumentListIcon}
              label="Medical Qualification"
              value={`${findFromOptions(qualification, data.medicalQualification)} ${
                data.medicalQualification === 'OTHERS' ? `(${data.other})` : ''
              }`}
            />
            <TextCointainer Icon={MapPinIcon} label="Active Status" value={STATUS[data.activeStatus]} />
            <TextCointainer
              Icon={CalendarDaysIcon}
              label="Enrolled Date"
              value={
                data?.payment?.paymentDate ? data.payment.paymentDate.slice(0, 10).split('-').reverse().join('-') : ''
              }
            />
            <TextCointainer
              Icon={CalendarDaysIcon}
              label="Enrolled Time"
              value={
                data?.payment?.paymentDate
                  ? new Date(data.payment.paymentDate).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : ''
              }
            />
            <TextCointainer
              Icon={CalendarDaysIcon}
              label="Paid Amount"
              value={data?.payment?.amount ? `RM ${data?.payment?.amount}` : 'RM 0.00'}
            />
          </div>

          <div className="mt-3">
            <TextCointainer Icon={ClipboardDocumentListIcon} label="Remark" value={data?.deactivateNote} />
          </div>

          {/* Supporting Documents */}
          <div className="mt-6">
            <p className="text-sm font-semibold">Supporting Documents</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {supportingDocuments.map((doc, idx) => (
                <a
                  key={idx}
                  className="text-blue-500 underline text-sm truncate"
                  href={doc.s3Url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {doc.documentName}
                </a>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 justify-end mt-6">
            <button
              onClick={() => setForm({ popup: false, data: {}, mode: null })}
              type="button"
              className="w-full sm:w-auto px-4 py-2 bg-yellow-50 text-yellow-800 ring-1 ring-inset ring-yellow-600/20 rounded-lg text-xs font-medium"
            >
              Close
            </button>
            {status !== 'APPROVED' && status !== 'DECLINED' && (
              <>
                <button
                  disabled={isMutating}
                  onClick={() => handleReview('DECLINED')}
                  className="w-full sm:w-auto px-4 py-2 bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10 rounded-lg text-xs font-medium"
                >
                  {isMutating && status === 'DECLINED' ? <LittleLoader /> : 'Decline'}
                </button>
                <button
                  disabled={isMutating}
                  onClick={() => handleReview('APPROVED')}
                  className="w-full sm:w-auto px-4 py-2 bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20 rounded-lg text-xs font-medium"
                >
                  {isMutating && status === 'APPROVED' ? <LittleLoader /> : 'Approve'}
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Remark Popup */}
      {showRemarkPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={(e) => e.stopPropagation()} // Stop propagation at the outer container
        >
          <motion.div
            ref={remarkModalRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md bg-white rounded-lg shadow-lg p-6"
            onClick={(e) => e.stopPropagation()} // Ensure clicks don't propagate
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {actionType === BASIC_STATUS.ACTIVE ? 'Activate' : 'Deactivate'} Service Provider
              </h3>
              <button onClick={() => setShowRemarkPopup(false)} className="text-gray-500 hover:text-gray-700">
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-4">
              <label htmlFor="remark" className="block text-sm font-medium text-gray-700 mb-1">
                Remark {actionType === BASIC_STATUS.DE_ACTIVE && <span className="text-red-500">*</span>}
              </label>
              <textarea
                id="remark"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Enter your remark here..."
                onClick={(e) => e.stopPropagation()} // Prevent propagation on textarea click
              />
              {actionType === BASIC_STATUS.DE_ACTIVE && remark.trim() === '' && (
                <p className="text-xs text-red-500 mt-1">Remark is required for deactivation</p>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowRemarkPopup(false)
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleSubmitRemark()
                }}
                disabled={(actionType === BASIC_STATUS.DE_ACTIVE && remark.trim() === '') || hspMutating}
                className={`px-4 py-2 rounded-md text-white text-sm font-medium ${
                  actionType === BASIC_STATUS.ACTIVE ? 'bg-green-500' : 'bg-red-500'
                } ${
                  (actionType === BASIC_STATUS.DE_ACTIVE && remark.trim() === '') || hspMutating
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:opacity-90'
                }`}
              >
                {hspMutating ? <LittleLoader /> : 'Submit'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
