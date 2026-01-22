import { Package } from '../Customers/Orders/CustomerTestDetailsInterface'

export interface ReferralFormInterface {
  _id?: string
  complaint: string
  findings: string
  investigation: string
  management: string
  doctor?: {
    _id: string
  }
}

export type MedicineDetail = {
  _id?: string
  patientName?: string
  medicineId?: string
  deliveryCharge?: number
  email?: string
  status?: string
  phone?: string
  gender?: string
  age?: string | number
  doctorName?: string
  registrationNumber?: string
  degree?: string
  date?: string
  symptoms: string
  weight: string
  height: string
  bloodPressure: string
  temperature: string
  heartRate: string
  spO2: string
  cbg: string
  medicalHistory: string
  virtualAssessment: string
  diagnosis: string
  allergies: string
  comorbidities: string
  followupDate?: string
  advice: string

  price?: string
  payment?: {
    paymentStatus: string
  }
  medicine: Array<Medicine>
}

export interface Medicine {
  name: string
  dosage: string
  duration: string
  frequency: string
  route: string
  beforeOrAfterFood: string
  price?: string
}

export interface ReferralTestDataInterface {
  name: string
  description: string
}

export interface TimeSlot {
  startTime: string
  endTime: string
  slotId: string
}
export interface MedicalRecord {
  _id: string
  name: string
  document: {
    s3URL: string
    originalFileName: string
    [key: string]: any
  }
}

export interface DoctorAppointment {
  [x: string]: any
  doctorName: any
  _id: string
  approvedDoctor: User
  appointment: string
  appointmentDate: string
  doctorLanguage: string
  status: string
  medicalRecords?: MedicalRecord[]
  selectedTimeSlot: TimeSlot
  meeting: {
    link: string
    id: number
    uuid: string
  }

  isBooked: Boolean
  meetingLink: string
  payment: {
    paymentStatus: string
  }
  customer: User
  package: Package
}

export interface User {
  _id: string
  name: string
  dateOfBirth: string
  medicalQualification: string
  registerNumber: string
  eSign: {
    s3URL: string
  }
  gender: string
  phone: string
  email: string
  language: string
}

export interface PrescriptionInterface {
  isMutating: boolean
  onClose: () => void
  prescriptionDetails: PrescriptionDetail
  trigger: (values: MedicineDetail) => void
  appointmentDetails: DoctorAppointment
}

export interface FollowUpTestinterface {
  name: string
  description: string
  testDetail: {
    _id: string
  }
}

export interface PrescriptionDetail {
  medicine: MedicineDetail
  status: string
  referral: ReferralFormInterface
  followupTest: FollowUpTestinterface
  followUpAppointmentDate: string
  priorMedicalRecords?: Array<{
    name: string
    document: {
      s3URL: string
      originalFileName?: string
    }
  }>
}

export interface CustomerPurchasedPackagesProps {
  customerId: string
}
