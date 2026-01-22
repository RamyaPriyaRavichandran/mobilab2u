'use client'
import { useState } from 'react'
import {
  Calendar,
  CreditCard,
  DollarSign,
  Eye,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  Clock,
  Stethoscope,
  TestTube,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  UserCircle,
  UserRoundIcon,
  User,
  Package2,
  Package,
} from 'lucide-react'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
} from 'chart.js'
import CountsByPeriod from './CountsByPeriod'
import ProfileForm from './ProfileForm'
import { ORDER_COUNTS, GET_USER_WALLET_DETAILS, VERIFY_USER_FOR_WALLET_REDEEM, REDEEM_WALLET } from '@/lib/endpoints'
import { fetcher, mutater } from '@/lib/fetchers'
import useSWR from 'swr'
import type { WalletHistory, WalletInterface, WalletWithdrawalInterface } from './wallet.interface'
import { useAuth } from '@/lib/contexts/AuthContext'
import useSWRMutation from 'swr/mutation'
import { usePopup } from '@/lib/contexts/PopupContext'
import Table from '../common/Tables'
import { findFromOptions } from '@/utils'
import { serviceType } from '@/utils/constents'
import { ROLES } from '@/utils/constents/permission'
import NoDataAvailable from '../common/Nodate'
import { Send, Shield, AlertCircle, Loader2 } from 'lucide-react'
import ColumFiltersSearch from '../common/Tables/ColumnFiltersSearch'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement)

export default function WalletEnhanced() {
  const [showDeclineDetail, setShowDeclineDetail] = useState({ popup: false, declineNotes: '' })
  const { roles } = useAuth()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'DECLINED':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const statusColors = {
      APPROVED: 'bg-green-100 text-green-800 border border-green-200',
      DECLINED: 'bg-red-100 text-red-800 border border-red-200',
      PENDING: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    }

    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusColors[status as keyof typeof statusColors] || statusColors.PENDING}`}
      >
        {getStatusIcon(status)}
        {status}
      </span>
    )
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'APPOINTMENT':
        return <Stethoscope className="h-4 w-4 text-blue-500" />
      case 'APPOINTMENT_CANCELLATION':
        return <Stethoscope className="h-4 w-4 text-blue-500" />
      case 'TEST':
        return <TestTube className="h-4 w-4 text-purple-500" />
      default:
        return <DollarSign className="h-4 w-4 text-gray-500" />
    }
  }

  const withdrawTableHeader = [
    {
      Header: () => (
        <div className="flex items-center gap-2 font-semibold text-gray-700">
          <Calendar className="h-4 w-4" />
          S.No
        </div>
      ),
      accessor: 'index',
      Cell: ({ row: { original, index } }: any) => <span className="font-medium text-gray-900">{index + 1}</span>,
    },
    {
      Header: () => (
        <div className="flex items-center gap-2 font-semibold text-gray-700">
          <Calendar className="h-4 w-4" />
          Redeem Date
        </div>
      ),
      accessor: 'createdDate',
      Cell: ({ row: { original, index } }: any) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="font-medium">{original?.createdDate?.slice(0, 10).split('-').reverse().join('-')}</span>
        </div>
      ),
    },
    {
      Header: () => (
        <div className="flex items-center gap-2 font-semibold text-gray-700">
          <TrendingDown className="h-4 w-4" />
          Redeem Amount
        </div>
      ),
      accessor: 'withdrawAmount',
      Cell: ({ row: { original, index } }: any) => (
        <div className="flex items-center gap-2 text-red-600 font-semibold">
          <TrendingDown className="h-4 w-4" />
          -RM {original.withdrawAmount}.00
        </div>
      ),
    },
    {
      Header: () => (
        <div className="flex items-center gap-2 font-semibold text-gray-700">
          <Wallet className="h-4 w-4" />
          Wallet Balance
        </div>
      ),
      accessor: 'walletBalance',
      Cell: ({ row: { original, index } }: any) => (
        <div className="flex items-center gap-2 font-medium">
          <Wallet className="h-4 w-4 text-gray-400" />
          RM {original.walletBalance}.00
        </div>
      ),
    },
    {
      Header: () => (
        <div className="flex items-center gap-2 font-semibold text-gray-700">
          <Clock className="h-4 w-4" />
          Approved Date
        </div>
      ),
      accessor: 'updatedAt',
      Cell: ({ row: { original, index } }: any) => (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <span>{original?.updatedAt?.slice(0, 10).split('-').reverse().join('-') || '-'}</span>
        </div>
      ),
    },
    {
      Header: () => (
        <div className="flex items-center gap-2 font-semibold text-gray-700">
          <CheckCircle className="h-4 w-4" />
          Status
        </div>
      ),
      accessor: 'status',
      Cell: ({ row: { original } }: any) => getStatusBadge(original.status),
    },
    {
      Header: () => (
        <div className="flex items-center gap-2 font-semibold text-gray-700">
          <Eye className="h-4 w-4" />
          Decline Reason
        </div>
      ),
      accessor: 'reason',
      Cell: ({ row: { original } }: any) => {
        return (
          <div className="flex items-center">
            {original.declineNote ? (
              <button
                onClick={() => setShowDeclineDetail({ popup: true, declineNotes: original.declineNote })}
                className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
              >
                <Eye className="h-4 w-4" />
                View Details
              </button>
            ) : (
              <span className="text-gray-400">-</span>
            )}
          </div>
        )
      },
    },
  ]

  const depositTableHeader = [
    {
      Header: () => (
        <div className="flex items-center gap-2 font-semibold text-gray-700">
          <Calendar className="h-4 w-4" />
          S.No
        </div>
      ),
      accessor: 'index',
      Cell: ({ row: { original, index } }: any) => <span className="font-medium text-gray-900">{index + 1}</span>,
    },
    {
      Header: () => (
        <div className="flex items-center gap-2 font-semibold text-gray-700">
          <Calendar className="h-4 w-4" />
          Deposit Date
        </div>
      ),
      accessor: 'createdAt',
      Cell: ({ row: { original } }: any) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="font-medium">{original.createdDate.slice(0, 10).split('-').reverse().join('-')}</span>
        </div>
      ),
    },
    {
      Header: () => (
        <div className="flex items-center gap-2 font-semibold text-gray-700">
          <TrendingUp className="h-4 w-4" />
          Deposit Amount
        </div>
      ),
      accessor: 'earningAmount',
      Filter: ColumFiltersSearch,
      Cell: ({ row: { original } }: any) => (
        <div className="flex items-center gap-2 text-green-600 font-semibold">
          <TrendingUp className="h-4 w-4" />
          {original.earningAmount ? `+RM${original.earningAmount}.00` : '-'}
        </div>
      ),
    },
    // {
    //   Header: () => (
    //     <div className="flex items-center gap-2 font-semibold text-gray-700">
    //       <TrendingUp className="h-4 w-4" />
    //       Debited Amount
    //     </div>
    //   ),
    //   accessor: 'debitedAmount',
    //   Filter: ColumFiltersSearch,
    //   Cell: ({ row: { original } }: any) => (
    //     <div className="flex items-center gap-2 text-red-600 font-semibold">
    //       <TrendingDown className="h-4 w-4" />
    //       {original.debitedAmount ? `+RM${original.debitedAmount}.00` : '-'}
    //     </div>
    //   ),
    // },
    {
      Header: () => (
        <div className="flex items-center gap-2 font-semibold text-gray-700">
          <Wallet className="h-4 w-4" />
          Wallet Amount
        </div>
      ),
      accessor: 'walletBalance',
      Cell: ({ row: { original } }: any) => (
        <div className="flex items-center gap-2 font-medium">
          <Wallet className="h-4 w-4 text-gray-400" />
          RM {original.walletBalance}.00
        </div>
      ),
    },
    {
      Header: () => (
        <div className="flex items-center gap-2 font-semibold text-gray-700">
          <UserRoundIcon className="h-4 w-4" />
          Customer Name
        </div>
      ),
      accessor: 'Customer',
      Cell: ({ row: { original } }: any) => (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-gray-400" />
          <span className="capitalize">{original.appointmentDetail?.customer || original.testDetail?.customer}</span>
        </div>
      ),
      // Filter: ColumFiltersSearch,
    },
    {
      Header: () => (
        <div className="flex items-center gap-2 font-semibold text-gray-700">
          <Package2 className="h-4 w-4" />
          Package Name
        </div>
      ),
      accessor: 'Package',
      Cell: ({ row: { original } }: any) => (
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-gray-400" />
          <span className="capitalize">
            {original.appointmentDetail?.packages?.name || original.testDetail?.packages?.name}
          </span>
        </div>
      ),
      // Filter: ColumFiltersSearch,
    },
    {
      Header: () => (
        <div className="flex items-center gap-2 font-semibold text-gray-700">
          <CreditCard className="h-4 w-4" />
          Order Type
        </div>
      ),
      Filter: ColumFiltersSearch,
      accessor: 'type',
      Cell: ({ row: { original } }: any) => (
        <div className="flex items-center gap-2">
          {getTypeIcon(original.type)}
          <span className="capitalize">{findFromOptions(serviceType, original.type)}</span>
        </div>
      ),
      // Filter: ColumFiltersSearch,
    },
  ]

  const { showSuccess, showError } = usePopup()
  const [isProfileOpen, setProfileOpen] = useState(false)
  const [isWithdrawOpen, setWithdrawOpen] = useState(false)
  const [tableClick, setTableClick] = useState(0)
  interface counts {
    dailyCount: number
    monthlyCount: number
    yearlyCount: number
    overallCount: number
  }

  const {
    data: { wallet = {} as WalletInterface, walletWithdrawals = [], walletHistory = [] } = {},
    isLoading: walletLoading,
    mutate: walletMutate,
  } = useSWR(
    GET_USER_WALLET_DETAILS,
    fetcher<{
      wallet: WalletInterface
      walletWithdrawals: WalletWithdrawalInterface[]
      walletHistory: WalletHistory[]
    }>()
  )
  const depositHistory = walletHistory.filter((ob) => ob.type !== 'WALLET_REDEEM_REQUEST')
  const {
    data: {
      labTests: {
        dailyCount: labDailyCount = 0,
        monthlyCount: labMonthlyCount = 0,
        yearlyCount: labYearlyCount = 0,
        overallCount: labTestCount = 0,
      } = {},
      appointments: { dailyCount = 0, monthlyCount = 0, yearlyCount = 0, overallCount: appointmentCount = 0 } = {},
    } = {},
    isLoading: countLoading,
  } = useSWR(ORDER_COUNTS, fetcher<{ labTests: counts; appointments: counts }>())

  const { trigger: sendOTP, isMutating } = useSWRMutation(
    VERIFY_USER_FOR_WALLET_REDEEM,
    mutater<any, { message: string }>('POST'),
    {
      onSuccess(data) {
        showSuccess(data.data.message)
      },
      onError(err) {
        showError(err.response.data.message)
      },
      throwOnError: false,
    }
  )

  const { trigger: redeemWallet, isMutating: redeemMutating } = useSWRMutation(
    REDEEM_WALLET,
    mutater<{ withdrawAmount: number; walletBalance: number; otp: string }, { message: string }>('POST'),
    {
      onSuccess(data) {
        showSuccess(data.data.message)
        setWithdrawOpen(false)
        walletMutate()
      },
      onError(err) {
        showError(err.response.data.message)
      },
      throwOnError: false,
    }
  )

  const appointmentCounts = {
    dailyCount: dailyCount,
    monthlyCount: monthlyCount,
    yearlyCount: yearlyCount,
  }

  const labtestCount = {
    labDailyCount: labDailyCount,
    labMonthlyCount: labMonthlyCount,
    labYearlyCount: labYearlyCount,
  }

  const latestRedeem = walletWithdrawals.find((wa) => wa.status === 'APPROVED')
  const tables = ['Deposit', 'Withdrawals']
  const tableArray = [
    { tableHeader: depositTableHeader, tableDate: depositHistory, tableTiltle: 'Deposit Table' },
    { tableHeader: withdrawTableHeader, tableDate: walletWithdrawals, tableTiltle: 'Withdrawals Table' },
  ]

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Enhanced Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
          Wallet Dashboard
        </h1>
        <p className="text-gray-600 text-lg">Manage your earnings, withdrawals, and transaction history</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Profile Details */}
        {isProfileOpen && <ProfileForm setProfileOpen={setProfileOpen} />}

        {/* Enhanced Wallet Balance */}
        <EnhancedWalletBalance
          wallet={wallet}
          onOpen={() => setWithdrawOpen(true)}
          latestRedeem={latestRedeem}
          isLoading={walletLoading}
        />

        {/* Enhanced Activity Overview */}
        <div className="lg:col-span-2">
          <EnhancedActivityOverview
            appointmentCount={appointmentCount}
            labTestCount={labTestCount}
            wallet={wallet}
            isLoading={countLoading || walletLoading}
          />
        </div>
      </div>

      {/* Enhanced Transaction Tables */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Transaction History</h2>
              <p className="text-gray-600 text-lg">View your deposits and withdrawal requests</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg">
                <Wallet className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          {/* Enhanced Tab Navigation */}
          <div className="flex space-x-2 bg-gray-100 p-2 rounded-xl">
            {tables.map((table, index) => {
              const isActive = index === tableClick
              return (
                <button
                  key={index}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-purple-600 shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                  onClick={() => setTableClick(index)}
                >
                  {index === 0 ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                  {table}
                </button>
              )
            })}
          </div>
        </div>

        <div className="p-8">
          {walletLoading ? (
            <div className="animate-pulse space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          ) : tableArray[tableClick].tableDate.length > 0 ? (
            <div className="overflow-hidden rounded-xl border p-1 border-gray-200 shadow-sm">
              <Table
                columns={tableArray[tableClick].tableHeader}
                data={tableArray[tableClick].tableDate}
                tableName={tableArray[tableClick].tableTiltle}
                exportExcel={true}
              />
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="flex flex-col items-center">
                <div className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full mb-6">
                  <Wallet className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{tableArray[tableClick].tableTiltle}</h3>
                <NoDataAvailable />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Modals and Forms */}
      <EnhancedDeclineDetail
        showDeclineDetail={showDeclineDetail}
        onClose={() => setShowDeclineDetail({ popup: false, declineNotes: '' })}
      />

      {isWithdrawOpen && (
        <EnhancedWithDrawForm
          balance={wallet?.walletBalance}
          isMutating={isMutating}
          redeemMutating={redeemMutating}
          redeemWallet={redeemWallet}
          sendOTP={sendOTP}
          onClose={() => setWithdrawOpen(false)}
        />
      )}

      {roles === ROLES.SUPER_ADMIN && (
        <div className="mt-8">
          <CountsByPeriod
            appointmentCounts={appointmentCounts}
            labtestsCounts={labtestCount}
            walletbalance={wallet?.walletBalance || 0}
          />
        </div>
      )}
    </div>
  )
}

interface ActivityOverviewProps {
  appointmentCount: number
  labTestCount: number
  wallet: any
  isLoading?: boolean
}

function EnhancedActivityOverview({ appointmentCount, labTestCount, wallet, isLoading }: ActivityOverviewProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 bg-gray-200 rounded w-32"></div>
          <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-gray-100 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const activities = [
    {
      title: 'Appointments',
      value: appointmentCount,
      icon: <Stethoscope className="h-6 w-6 text-white" />,
      bgGradient: 'from-blue-500 to-blue-600',
      cardBg: 'bg-blue-50',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-100',
    },
    {
      title: 'Lab Tests',
      value: labTestCount,
      icon: <TestTube className="h-6 w-6 text-white" />,
      bgGradient: 'from-purple-500 to-purple-600',
      cardBg: 'bg-purple-50',
      textColor: 'text-purple-700',
      borderColor: 'border-purple-100',
    },
    {
      title: 'Total Earnings',
      value: `RM ${wallet?.totalEarnings?.toFixed(2) || '0.00'}`,
      icon: <DollarSign className="h-6 w-6 text-white" />,
      bgGradient: 'from-green-500 to-green-600',
      cardBg: 'bg-green-50',
      textColor: 'text-green-700',
      borderColor: 'border-green-100',
    },
  ]

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Activity Overview</h3>
        <div className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl shadow-md">
          <TrendingUp className="h-6 w-6 text-white" />
        </div>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className={`${activity.cardBg} ${activity.borderColor} border rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-3 bg-gradient-to-r ${activity.bgGradient} rounded-xl shadow-lg`}>
                  {activity.icon}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-1">{activity.title}</h4>
                  <p className={`text-2xl font-bold ${activity.textColor}`}>{activity.value}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

import { X, AlertTriangle, FileText } from 'lucide-react'

interface DeclineDetailProps {
  showDeclineDetail: {
    popup: boolean
    declineNotes: string
  }
  onClose: () => void
}

function EnhancedDeclineDetail({ showDeclineDetail, onClose }: DeclineDetailProps) {
  if (!showDeclineDetail.popup) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-red-500 to-red-600 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Withdrawal Declined</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800 mb-2">Reason for Decline</h3>
                <p className="text-red-700 leading-relaxed">{showDeclineDetail.declineNotes}</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">{`What's Next?`}</h3>
                <ul className="text-blue-700 space-y-1 text-sm">
                  <li>• Review the decline reason above</li>
                  <li>• Contact support if you need clarification</li>
                  <li>• You can submit a new withdrawal request once the issue is resolved</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors"
            >
              Close
            </button>
            {/* <button
              onClick={() => {
                // Add contact support functionality here
                onClose()
              }}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Contact Support
            </button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

interface WalletBalanceProps {
  wallet: any
  onOpen: () => void
  latestRedeem: any
  isLoading?: boolean
}

function EnhancedWalletBalance({ wallet, onOpen, latestRedeem, isLoading }: WalletBalanceProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-gray-200 rounded w-32"></div>
          <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="h-12 bg-gray-200 rounded w-48 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-40 mb-6"></div>
        <div className="h-12 bg-gray-200 rounded w-full"></div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Wallet Balance</h3>
        <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-md">
          <Wallet className="h-6 w-6 text-white" />
        </div>
      </div>

      <div className="mb-6">
        <div className="text-4xl font-bold text-gray-900 mb-2">RM {wallet?.walletBalance?.toFixed(2) || '0.00'}</div>

        {latestRedeem && (
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-green-50 px-3 py-2 rounded-lg border border-green-100">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>
              Last Transaction: RM {latestRedeem.withdrawAmount}.00 on {latestRedeem.createdDate?.slice(0, 10)}
            </span>
          </div>
        )}

        {!latestRedeem && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>No recent transactions</span>
          </div>
        )}
      </div>

      <button
        onClick={onOpen}
        className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
      >
        <ArrowUpRight className="h-5 w-5" />
        Withdraw Funds
      </button>
    </div>
  )
}

interface WithDrawFormProps {
  balance: number
  isMutating: boolean
  redeemMutating: boolean
  redeemWallet: (data: any) => void
  sendOTP: () => void
  onClose: () => void
}

function EnhancedWithDrawForm({
  balance,
  isMutating,
  redeemMutating,
  redeemWallet,
  sendOTP,
  onClose,
}: WithDrawFormProps) {
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState(1) // 1: Amount, 2: OTP

  const handleSendOTP = () => {
    if (withdrawAmount && Number.parseFloat(withdrawAmount) > 0) {
      sendOTP()
      setStep(2)
    }
  }

  const handleWithdraw = () => {
    redeemWallet({
      withdrawAmount: Number.parseFloat(withdrawAmount),
      walletBalance: balance,
      otp: otp,
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-red-500 to-red-600 rounded-lg">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Withdraw Funds</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Balance Display */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 border border-blue-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Available Balance</span>
              <span className="text-2xl font-bold text-blue-600">RM {balance?.toFixed(2) || '0.00'}</span>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Withdrawal Amount</label>
                <div className="relative">
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-lg font-semibold"
                    max={balance}
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    RM
                  </span>
                </div>
                {withdrawAmount && Number.parseFloat(withdrawAmount) > balance && (
                  <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>Amount exceeds available balance</span>
                  </div>
                )}
              </div>

              <button
                onClick={handleSendOTP}
                disabled={
                  !withdrawAmount ||
                  Number.parseFloat(withdrawAmount) <= 0 ||
                  Number.parseFloat(withdrawAmount) > balance ||
                  isMutating
                }
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:transform-none disabled:shadow-none"
              >
                {isMutating ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send OTP
                  </>
                )}
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Verify Your Identity</h3>
                <p className="text-gray-600">Enter the OTP sent to your registered Email</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">OTP Code</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-center text-lg font-mono tracking-widest"
                  maxLength={6}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleWithdraw}
                  disabled={!otp || otp.length !== 6 || redeemMutating}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:transform-none disabled:shadow-none"
                >
                  {redeemMutating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Confirm Withdrawal
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
