export interface WalletWithdrawal {
    userRole: string,
    userId: ObjectId,
    wallet: ObjectId,
    withdrawAmount: Number,
    walletBalance: Number,
    status: string,
    name: string,
    declineNote: string,
    createdDate: Date
    approvedDate: Date
}