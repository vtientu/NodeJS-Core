import { IClothing, IElectronic, IProduct } from '@interfaces/product.interfaces.js'
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
    collection: 'Clothes'
  }
)

const ElectronicSchema = new Schema(
  {
    manufacturer: {
      type: String,
      required: true
    },
    form: String,
    color: String,
    product_shop: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
    collection: 'Electronics'
  }
)

const ProductModel = model<IProduct>(DOCUMENT_NAME, ProductSchema)
export const ClothingModel = model<IClothing>('Clothing', ClothingSchema)
export const ElectronicModel = model<IElectronic>('Electronic', ElectronicSchema)
export default ProductModel
