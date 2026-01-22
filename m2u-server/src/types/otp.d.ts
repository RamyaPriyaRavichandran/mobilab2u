export interface Otp {
    number: string,
    userRole: string,
    email: string,
    type: string,
    otp: string,
    originalOTP: string,
    createdAt: Date,
    currentDate: Date,
    testId: ObjectId,
    otpCount: number,
    currentDate: Date
}