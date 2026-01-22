export interface WalletHistory {
    userRole: string,
    status: string,
    type: string,
    userId: ObjectId,
    orderId: ObjectId,
    earningAmount: number,
    debitedAmount: number,
    createdDate: Date,
    walletBalance: number
}