export interface Payment {
  sessionId: string;
  planId: Types.ObjectId;
  userId: Types.ObjectId;
  paymentStatus: string;
  paymentDate: Date;
  userRole: string;
  amount: number
  paymentType: string
}

export interface LabTestPayment {
  packageId: string;
  appointmentId: string;
  customerAppointmentDate: Date;
  customerAppointmentTime: string;
  customerAddress: {
    city: string,
    state: string,
    address: string,
    postCode: string
  },
  referredDoctor: string;
  members: Array<{
    name: String;
    age: Number;
    gender: String;
  }>;
}
