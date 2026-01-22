import { ObjectId } from "mongoose";

export interface DoctorAvailability {
    doctor: ObjectId
    date: Date
    startTime: String
    endTime: String
    _id?: ObjectId
    isBooked: Boolean
    isAppointmentAdded: Boolean
}