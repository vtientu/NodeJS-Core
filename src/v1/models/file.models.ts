import { Schema, model } from 'mongoose'

const DOCUMENT_NAME = 'File'
const COLLECTIONS_NAME = 'Files'

const FileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    mobile: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    collection: COLLECTIONS_NAME
  }
)

//Export the model
export const FileModel = model(DOCUMENT_NAME, FileSchema)
