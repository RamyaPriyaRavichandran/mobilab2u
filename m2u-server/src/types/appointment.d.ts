import { Mixed, ObjectId } from "mongoose";
import { APPOINTMENT_TYPE } from "../constants";


export interface TimeSlot {
    startTime: string
    endTime: string
    slotId: ObjectId,
    date?: Date
}
export interface Appointment {
    _id?: ObjectId
    approvedDoctor: ObjectId
    assignedDoctors: [ObjectId]
    redirection?: ObjectId
    type: APPOINTMENT_TYPE.NORMAL_APPOINTEMNT | APPOINTMENT_TYPE.RANDOM_DOCTOR_FOLLOWUP_APPOINTMENT | APPOINTMENT_TYPE.FOLLOWUP_DOCTOR_FOLLOWUP_APPOINTMENT
    appointmentDate: Date
    appointment: ObjectId
    customerAppointmentTimeSlotReAllocated: boolean
    doctorLanguage: string
    status: String
    selectedTimeSlot: TimeSlot
    confirmedTimeSlot: TimeSlot
    selectedTimeSlots: TimeSlot[]
    meeting?: {
        link: string
        id: number
        uuid: string
    }
    medicalRecords: { document: IObjectId, name: string }[]
    isBooked: Boolean
    meetingLink: string
    payment: ObjectId
    customer: ObjectId
    packages: Mixed
}