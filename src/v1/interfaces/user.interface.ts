import { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  _id: Schema.Types.ObjectId
  name: string
  email: string
  password: string
  status: number
  verify: boolean
  roles: string[]
}

export interface IUserCreate {
  name: string
  email: string
  password: string
}
