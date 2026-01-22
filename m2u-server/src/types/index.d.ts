import { RouteGenericInterface } from "fastify";
import { UserObject } from "./common";
import type { User } from "./user";
import { Appointment } from "./appointment";
import { ObjectId } from "mongoose";

declare module "fastify" {
  export interface FastifyInstance {
    getUserAbilities<const E>(user: User): E;
    deleteFileFromS3Bucket<const E>(keys: Array<string>): E;
    ObjectId<const E>(id: string);
    addDataToModel<const E>(
      this: FastifyRequest,
      data: object,
      model: Model<Document<any>>
    ): E;
    sendWhatsappMessage<const E>(
      to: number,
      template: string,
      variables: string
    ): E;
    sendTextMessage<const E>(to: number, body: string): E;
    authenticate<const E>(
      request: FastifyRequest,
      reply: FastifyReply
    ): Promise<E>;
    params: { id: string };
    user: User;
    appointment: Appointment;
    isFollowupAppointment: boolean;
  }

  export interface AggregatedAppointment {
    approvedDoctor: ServiceProvider;
    assignedDoctors: [ObjectId];
    appointmentDate: string;
    package: Package;
    selectedTimeSlot: { startTime: string };
    type: string;
    timeSlot: TimeSlot;
    status: string;
    doctorLanguage: string;
    customer: Customer;
    appointment: ObjectId;
    prescription: AppointmentPrescription;
    _id: string;
  }
  export interface FastifyRequest {
    getUserAbilities<const E>(user: User): E;
    deleteFileFromS3Bucket<const E>(keys: Array<string>): E;

    checkAccess<const E>(
      this: FastifyRequest,
      action: string,
      subject: string
    ): E;
    sendTextMessage<const E>(to: number, body: string): E;
    sendMail<const E>(pauload: {
      subject: string;
      template: string;
      to: string;
      data: object;
    }): E;
    checkAndAssign<const E>(
      model: T | Document,
      fieldName: string,
      fieldValue: string | number | Array<any>
    );
    ObjectId<const E>(id: string);
    requireAccess<const E>(
      this: FastifyRequest,
      action: string,
      subject: string
    ): E;
    addDataToModel<const E>(
      this: FastifyRequest,
      data: object,
      model: Model<Document<any>>
    ): E;
    sendWhatsappMessage<const E>(
      to: number,
      template: string,
      variables: string
    ): E;
    createPDF<const E>(path: string, data: Object): E;
    Params: { id: string };
    user: User;
    appointment: Appointment;
    isFollowupAppointment: boolean;
    jwt: fastifyJwt.JWT;
  }
}

type FastifyT = FastifyPluginCallback<fastifyT.FastifyEnvOptions>;

declare namespace fastifyT {}

declare function fastifyT(
  ...params: Parameters<FastifyT>
): ReturnType<FastifyT>;
export = fastifyT;
