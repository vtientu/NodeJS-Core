import { Document, Schema } from 'mongoose'

export interface IApiKey extends Document {
  _id: Schema.Types.ObjectId
  key: string
  status: boolean
  permissions: string[]
}
