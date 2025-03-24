import { IProduct } from '@interfaces/product.interfaces.js'
import { Schema, model } from 'mongoose'

const COLLECTION_NAME = 'Products'
const DOCUMENT_NAME = 'Product'

const ProductSchema = new Schema(
  {
    product_name: {
      type: String,
      required: true,
      index: true
    },
    product_thumb: {
      type: String,
      required: true
    },
    product_description: String,
    product_price: {
      type: Number,
      required: true
    },
    product_quantity: {
      type: Number,
      required: true
    },
    product_type: {
      type: String,
      required: true,
      enum: ['Electronic', 'Clothing', 'Furniture']
    },
    product_shop: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    product_attributes: {
      type: Schema.Types.Mixed,
      required: true
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

const ProductModel = model<IProduct>(DOCUMENT_NAME, ProductSchema)
export default ProductModel
