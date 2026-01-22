import type { Request } from 'express'
import type { ObjectId } from 'mongoose'

interface UserObject {
  roles: Array<number> | any
  abilities: {
    can: Function
  }
  _id: ObjectId

}
export interface ReqUser extends Request {
  user: UserObject // or any other type
}

export interface DocumentStorage {
  _id?: ObjectId
  name: string
  size: number
  originalFileName: string
  encoding: string
  mimeType: string
  localURL: string
  s3URL: string
  key: string
  eTag: string
  createdAt: Date
  updatedAt: Date
  createdBy: ObjectId
  updatedBy: ObjectId
}
