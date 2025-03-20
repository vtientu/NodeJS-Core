import { Document, Types } from 'mongoose'

export interface IKeyToken extends Document {
  _id: Types.ObjectId
  userId: Types.ObjectId
  accessTokenKey: string
  refreshTokenKey: string
  refreshToken: string[]
}

export interface IKeyTokenCreate {
  user: Types.ObjectId
  accessTokenKey: string
  refreshTokenKey: string
  refreshToken?: string[]
}
