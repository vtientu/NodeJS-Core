import { Schema, model } from 'mongoose'
const COLLECTIONS_NAME = 'category'
const DOCUMENT_NAME = 'categoryModel'

const categorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    description: {
      type: String
    }
  },
  {
    timestamps: true,
    collection: COLLECTIONS_NAME,
    _id: true
  }
)

export const categoryModel = model(DOCUMENT_NAME, categorySchema)
