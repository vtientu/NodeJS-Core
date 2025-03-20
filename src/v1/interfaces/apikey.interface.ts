import { Document } from 'mongoose'
import { Types } from 'mongoose'

export interface IApiKey extends Document {
  _id: Types.ObjectId
  key: string
  status: boolean
  permissions: string[]
}
