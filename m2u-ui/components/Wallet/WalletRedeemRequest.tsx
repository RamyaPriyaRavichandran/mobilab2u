'use client'

import { GET_ALL_WALLET_WITHDRAWALS, REVIEW_WALLET_REDEEM } from '@/lib/endpoints'
import { fetcher, mutater } from '@/lib/fetchers'
import type React from 'react'
import { useState } from 'react'
import useSWR from 'swr'
import { serviceProviderApprovalStatus, userType } from '@/utils/constents'
import { findFromOptions } from '@/utils'
import Table from '../common/Tables'
import { useAlert } from '@/lib/contexts/AlertContext'
import useSWRMutation from 'swr/mutation'
import { usePopup } from '@/lib/contexts/PopupContext'
interface WalletWithdrawalInterface {
  _id: string
  name: string
  userRole: string
  createdDate: string
  updatedAt: string
  withdrawAmount: number
  walletBalance: number
  status: 'PENDING' | 'APPROVED' | 'DECLINED'
  declineNote?: string
}
interface WalletDeclineFormProps {
  reviewWalletRedeems: (values: { walletId: string; status: string; declineNote?: string }) => void
  onClose: () => void
  walletId: string
}

function WalletDeclineForm({ reviewWalletRedeems, onClose, walletId }: WalletDeclineFormProps) {
  const [declineNote, setDeclineNote] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!declineNote.trim()) return

    setIsSubmitting(true)
    try {
      await reviewWalletRedeems({
        walletId,
        status: 'DECLINED',
        declineNote: declineNote.trim(),
      })
      onClose()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Decline Wallet Redeem Request
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label htmlFor="declineNote" className="block text-sm font-medium text-gray-700 mb-2">
              Reason for declining
            </label>
            <textarea
              id="declineNote"
              value={declineNote}
              onChange={(e) => setDeclineNote(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none transition-all"
              rows={4}
              placeholder="Please provide a reason for declining this request..."
              required
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!declineNote.trim() || isSubmitting}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Declining...
                </>
              ) : (
                'Decline Request'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function DeclineDetail({
  showDeclineDetail,
  onClose,
}: {
  showDeclineDetail: { popup: boolean; declineNotes: string }
  onClose: () => void
}) {
  if (!showDeclineDetail.popup) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              Decline Reason
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-gray-700 leading-relaxed">{showDeclineDetail.declineNotes || 'No reason provided'}</p>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'DECLINED':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const displayStatus = findFromOptions(serviceProviderApprovalStatus, status)

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles(status)}`}
    >
      {displayStatus}
    </span>
  )
}

function LoadingSpinner({ size = 'sm', color = 'blue' }: { size?: 'sm' | 'md' | 'lg'; color?: string }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }

  return (
    <div
      className={`${sizeClasses[size]} border-2 border-${color}-600 border-t-transparent rounded-full animate-spin`}
    ></div>
  )
}

export default function WalletRedeemRequest() {
  const [showDeclineDetail, setShowDeclineDetail] = useState({ popup: false, declineNotes: '' })
  const [declineDialogs, setDeclineDialogs] = useState<Record<string, boolean>>({})
  const [processingIds, setProcessingIds] = useState<Record<string, string>>({})

  const { showAlert } = useAlert()
  const { showSuccess, showError } = usePopup()

  const {
    data: walletWithdrawals = [] as WalletWithdrawalInterface[],
    isLoading: withdrawalLoading,
    mutate,
  } = useSWR(GET_ALL_WALLET_WITHDRAWALS, fetcher<WalletWithdrawalInterface[]>())

  const { trigger: reviewWalletRedeems, isMutating: redeemMutating } = useSWRMutation(
    REVIEW_WALLET_REDEEM,
    mutater<{ walletId: string; status: string; declineNote?: string }, { message: string }>('PUT'),
    {
      onSuccess(data) {
        showSuccess(data.data.message)
        mutate()
        setProcessingIds({})
      },
      onError(err) {
        showError(err.response.data.message)
        setProcessingIds({})
      },
      throwOnError: false,
    }
  )

  const formatDate = (dateString: string) => {
    if (!dateString) return '-'
    return dateString.slice(0, 10).split('-').reverse().join('-')
  }

  const handleApprove = (walletId: string) => {
    setProcessingIds((prev) => ({ ...prev, [walletId]: 'APPROVED' }))
    showAlert('Do you want to approve this wallet redeem request?', () =>
      reviewWalletRedeems({
        declineNote: '',
        walletId,
        status: 'APPROVED',
      })
    )
  }

  const openDeclineDialog = (walletId: string) => {
    setDeclineDialogs((prev) => ({ ...prev, [walletId]: true }))
  }

  const closeDeclineDialog = (walletId: string) => {
    setDeclineDialogs((prev) => ({ ...prev, [walletId]: false }))
  }

  const tableHeader = [
    {
      Header: 'S.No',
      accessor: 'index',
      Cell: ({ row: { index } }: any) => <div className="font-semibold text-gray-900">{index + 1}</div>,
    },
    {
      Header: 'Name',
      accessor: 'name',
      Cell: ({ row: { original } }: any) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <span className="font-medium text-gray-900">{original.name}</span>
        </div>
      ),
    },
    {
      Header: 'Role',
      accessor: 'userRole',
      Cell: ({ row: { original } }: any) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
          {findFromOptions(userType, original.userRole)}
        </span>
      ),
    },
    {
      Header: 'Create Date',
      accessor: 'createdDate',
      Cell: ({ row: { original } }: any) => (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {formatDate(original.createdDate)}
        </div>
      ),
    },
    {
      Header: 'Approved Date',
      accessor: 'updatedAt',
      Cell: ({ row: { original } }: any) => (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {formatDate(original.updatedAt)}
        </div>
      ),
    },
    {
      Header: 'Redeem Amount',
      accessor: 'withdrawAmount',
      Cell: ({ row: { original } }: any) => (
        <div className="flex items-center gap-2 font-semibold text-green-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
            />
          </svg>
          ₹{original.withdrawAmount}
        </div>
      ),
    },
    {
      Header: 'Current Balance',
      accessor: 'walletBalance',
      Cell: ({ row: { original } }: any) => (
        <div className="flex items-center gap-2 font-medium text-blue-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          ₹{original.walletBalance}
        </div>
      ),
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ row: { original } }: any) => <StatusBadge status={original.status} />,
    },
    {
      Header: 'Actions',
      accessor: 'option',
      Cell: ({ row: { original } }: any) => {
        const isProcessing = processingIds[original._id]

        if (original.status === 'APPROVED' || original.status === 'DECLINED') {
          return <span className="text-gray-400 text-sm italic">No actions available</span>
        }

        return (
          <div className="flex gap-2">
            <button
              onClick={() => handleApprove(original._id)}
              disabled={redeemMutating}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {redeemMutating && isProcessing === 'APPROVED' ? (
                <LoadingSpinner size="sm" color="white" />
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
              Approve
            </button>
            <button
              onClick={() => openDeclineDialog(original._id)}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Decline
            </button>
          </div>
        )
      },
    },
    {
      Header: 'Decline Reason',
      accessor: 'reason',
      Cell: ({ row: { original } }: any) => {
        return original.declineNote ? (
          <button
            onClick={() =>
              setShowDeclineDetail({
                popup: true,
                declineNotes: original.declineNote,
              })
            }
            className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
        ) : (
          <span className="text-gray-400">-</span>
        )
      },
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Wallet Redeems</h1>
                <p className="text-gray-600 mt-1">Manage wallet redeem requests from users</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Total Requests</div>
              <div className="text-2xl font-bold text-gray-900">{walletWithdrawals.length}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {withdrawalLoading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-48"></div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex space-x-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : walletWithdrawals.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <Table columns={tableHeader} data={walletWithdrawals} tableName="Wallet Redeems" />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No redeem requests</h3>
            <p className="text-gray-500">There are no wallet redeem requests at the moment.</p>
          </div>
        )}
      </div>

      {/* Decline Dialogs */}
      {Object.entries(declineDialogs).map(
        ([walletId, isOpen]) =>
          isOpen && (
            <WalletDeclineForm
              key={walletId}
              reviewWalletRedeems={reviewWalletRedeems}
              onClose={() => closeDeclineDialog(walletId)}
              walletId={walletId}
            />
          )
      )}

      {/* Decline Detail Dialog */}
      <DeclineDetail
        showDeclineDetail={showDeclineDetail}
        onClose={() => setShowDeclineDetail({ popup: false, declineNotes: '' })}
      />
    </div>
  )
}
