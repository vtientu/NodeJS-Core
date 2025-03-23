import { Document, Schema } from 'mongoose'

export interface IKeyToken extends Document {
  _id: Schema.Types.ObjectId
  userId: Schema.Types.ObjectId
  accessTokenKey: string
  refreshTokenKey: string
  refreshToken: string
  refreshTokensUsed: string[]
}

export interface IKeyTokenCreate {
  user: Schema.Types.ObjectId
  accessTokenKey: string
  refreshTokenKey: string
  refreshToken: string
  refreshTokensUsed?: string[]
}
