import { IKeyToken } from '@interfaces/KeyToken.js'
import { Schema, model } from 'mongoose'

const DOCUMENT_NAME = 'KeyToken'
const COLLECTION_NAME = 'KeyTokens'

const KeyTokenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    accessTokenKey: {
      type: String,
      required: true
    },
    refreshTokenKey: {
      type: String,
      required: true
    },
    refreshToken: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

//Export the model
const KeyTokenModel = model<IKeyToken>(DOCUMENT_NAME, KeyTokenSchema)
export default KeyTokenModel
