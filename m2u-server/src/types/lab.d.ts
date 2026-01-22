export interface Lab {
    userId: Types.ObjectId
    name: string,
    email: string,
    organization: string,
    userRole: string,
    address: string,
    city: string,
    password: string,
    state: string,
    phone: number,
    postCode: string,
}
