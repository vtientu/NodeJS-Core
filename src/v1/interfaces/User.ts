import { Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  status: number
  verify: boolean
  roles: string[]
}
