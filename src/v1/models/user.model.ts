import { Status } from '@constants/app.constants.js'
import { IUser } from '@interfaces/user.interface.js'
import { Schema, model } from 'mongoose'

const DOCUMENT_NAME = 'User'
const COLLECTION_NAME = 'Users'

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 150,
      index: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    status: {
      type: Number,
      enum: [Status.Active, Status.Inactive],
      default: Status.Inactive
    },
    verify: {
      type: Boolean,
      default: false
    },
    roles: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

const UserModel = model<IUser>(DOCUMENT_NAME, UserSchema)
export default UserModel
