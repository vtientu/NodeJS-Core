import { IClothing } from '@interfaces/product.interfaces.js'
import { Schema, model } from 'mongoose'

const COLLECTIONS_NAME = 'Clothes'
const DOCUMENT_NAME = 'Clothing'

const ClothingSchema = new Schema(
  {
    brand: {
      type: String,
      required: true
    },
    size: String,
    material: String,
    product_shop: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
    collection: COLLECTIONS_NAME
  }
)

const ClothingModel = model<IClothing>(DOCUMENT_NAME, ClothingSchema)
export default ClothingModel
