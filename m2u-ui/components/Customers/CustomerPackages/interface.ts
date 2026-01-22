export interface Package {
  name: string
  description: string
  duration: string
  fastingHour: string
  testCount: string
  type: string
  members: number
  serviceType: string
  price: number
  image: {
    s3URL: string
  }
  offerPrice: number
  document: {
    s3URL: string
  }
  _id?: string
  labShare: number
  gpShare?: number
  hspShare: number
  customerShare: number
  mobilabShare: number
}

export interface DoctorAvailability {
  slotId: string
  _id: string
  date: string
  startTime: string
  endTime: string
}

export interface CustomerAddress {
  address: string
  city: string
  state: string
  postCode: string
  type?: string
}
