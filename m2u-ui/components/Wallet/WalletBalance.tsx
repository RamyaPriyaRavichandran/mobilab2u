import React from 'react'
import { WalletInterface } from './wallet.interface'
import { ROLES } from '@/utils/constents/permission'
import { useAuth } from '@/lib/contexts/AuthContext'

export default function WalletBalance({
  wallet,
  latestRedeem,
  onOpen,
}: {
  wallet: WalletInterface
  latestRedeem: any
  onOpen: () => void
}) {
  const { roles } = useAuth()
  return (
    <div>
      <div className="bg-white p-4 rounded-xl h-full shadow-lg flex flex-col items-start space-y-6 ">
        {/* Header */}
        <h3 className="text-xl font-bold text-gray-800">Wallet Balance</h3>

        {/* Balance Section */}
        <div className="flex items-center space-x-6 w-full mt-10">
          {/* Icon */}
          <div className="p-4 bg-blue-50 rounded-full flex items-center justify-center">
            <span className="text-3xl">💳</span>
          </div>

          {/* Balance Details */}
          <div className="flex-1">
            <h4 className="text-3xl font-bold text-gray-900">RM {wallet?.walletBalance || 0}.00</h4>
            {roles !== ROLES.SUPER_ADMIN && (
              <>
                {latestRedeem ? (
                  <p className="text-gray-500 text-sm mt-1">
                    Last Transaction: <span className="font-medium">RM {latestRedeem?.withdrawAmount}.00</span> on{' '}
                    {latestRedeem?.createdDate.slice(0, 10)}
                  </p>
                ) : (
                  <p className="text-gray-500 text-sm mt-1">No withdrawals</p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Withdraw Button */}

        <button
          onClick={onOpen}
          disabled={wallet?.walletBalance < 1}
          className={`w-full ${wallet?.walletBalance < 1 ? 'bg-red-200' : 'bg-red-500 hover:bg-red-600'}  text-white font-semibold py-3 rounded-lg`}
        >
          Withdraw Funds
        </button>

        {/* Additional Info */}
        {/* <div className="w-full text-center text-gray-500 text-sm">
                <p>
                  Available for withdrawal: <span className="font-medium">RM {wallet.totalEarnings}.00</span>
                </p>
              </div> */}
      </div>
    </div>
  )
}
