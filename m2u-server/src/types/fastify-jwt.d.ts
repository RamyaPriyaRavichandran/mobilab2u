// fastify-jwt.d.ts
import "@fastify/jwt"
import type { User } from './user'
import { Appointment } from "./appointment"

declare module "@fastify/jwt" {
    interface FastifyJWT {
        // payload: { id: number } // payload type is used for signing and verifying
        user: {
            _id: Types.ObjectId,
            userRole: string
            name: string
            email: string
        }
        appointment: Appointment
        isFollowupAppointment: boolean
    }
}