export interface WalletInterface {
  userRole: string
  userId: string
  walletBalance: number
  totalEarnings: number
  withDrawedAmount: number
}

export interface WalletWithdrawalInterface {
  userRole: string
  userId: string
  wallet: string
  withdrawAmount: number
  walletBalance: number
  status: string
  name: string
  declineNote: string
  createdDate: string
  approvedDate: string
}

export interface WalletHistory {
  userRole: string
  status: string
  type: string
  userId: string
  orderId: string
  earningAmount: number
  debitedAmount: number
  createdDate: Date
  walletBalance: number
}
export interface RedeemDecline {
  declineNote: string
  status: string
}

export interface RedeemFormField {
  withdrawAmount: number
  walletBalance: string
  otp: string
}
export interface WalletRedeemFormInterface {
  onClose: () => void
  sendOTP: () => void
  redeemWallet: Function
  redeemMutating: boolean
  isMutating: boolean
  balance: number
}
