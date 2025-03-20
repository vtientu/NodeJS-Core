import { Schema, model } from 'mongoose'

const COLLECTIONS_NAME = 'Category'
const DOCUMENT_NAME = 'CategoryModel'

const CategorySchema = new Schema(
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
    collection: COLLECTIONS_NAME
  }
)

const CategoryModel = model(DOCUMENT_NAME, CategorySchema)
export default CategoryModel
