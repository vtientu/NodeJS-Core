import mongoose from 'mongoose'

const DOCUMENT_NAME = 'file'
const COLLECTIONS_NAME = 'files'

const fileSchema = new mongoose.Schema(
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
    collection: COLLECTIONS_NAME,
    _id: true
  }
)

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, fileSchema)
