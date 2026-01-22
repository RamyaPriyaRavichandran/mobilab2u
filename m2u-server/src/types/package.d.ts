export interface Package {
  name: string;
  description: string;
  duration: string;
  fastingHour: string;
  type: string;
  members: number;
  serviceType: string;
  price: number;
  image: ObjectId;
  appointment: ObjectId;
  offerPrice: number;
  testCount: number;
  document: ObjectId;
  _id?: ObjectId;
  labShare: number;
  gpShare?: number;
  hspShare: number;
  customerShare: number;
  mobilabShare: number;
}
