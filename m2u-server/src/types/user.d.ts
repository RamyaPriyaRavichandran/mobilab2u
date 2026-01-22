import type { ObjectId } from "mongoose";

export interface PermissionObject {
  roleId: number;
  perms: Permission[];
}

export interface Permission {
  subject: string;
  actions: Array<Action | string>;
}

export interface Action {
  type: string;
  conditions: Conditions;
}

export interface Conditions {
  [key: string]: boolean;
}

export interface RoleObject {
  roleId: number;
  roleName: string;
}

export interface User {
  _doc?: object;
  _id?: ObjectId;
  userName: string;
  userRole: string;
  gender: string;
  city: string;
  state: string;
  country: string;
  address2: string;
  gender: string;
  postCode: number;
  phone: number;
  nricNumber: number;
  roles: [string];
  userType?: string;
  email: string;
  address: string;
  password: string;
  refreshTokens?: [...string[]];
  lastLogin: Date;
  createdBy: ObjectId;
  updatedBy: ObjectId;
  deleted: boolean;
  isActive: boolean;
}
