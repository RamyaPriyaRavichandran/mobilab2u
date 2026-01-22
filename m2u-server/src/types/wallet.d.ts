export interface Wallet {
    userRole: string,
    userId: Types.ObjectId,
    walletBalance: Number,
    totalEarnings: Number,
    withDrawedAmount: Number,
}