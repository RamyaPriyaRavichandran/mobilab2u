
export interface MedicineOrder {
    customer: ObjectId,
    payment: ObjectId,
    medicine: ObjectId,
    price: number
    statusTransaction: {
        status: CUSTOMER_LAB_TEST_STATUS
        date: Date
    }[]
}