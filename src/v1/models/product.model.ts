import { IProduct } from '@interfaces/product.interfaces.js'
import { Schema, model } from 'mongoose'
import slug from 'slug'

const COLLECTION_NAME = 'Products'
const DOCUMENT_NAME = 'Product'

const ProductSchema = new Schema(
  {
    product_name: {
      type: String,
      required: true
    },
    product_thumb: {
      type: String,
      required: true
    },
    product_slug: String,
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
    },
    product_rattingAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Ratting must be above 1.0'],
      max: [5, 'Ratting must be above 5.0'],
      set: (val: number) => Math.round(val * 10) / 10
    },
    product_variations: { type: Array, default: [] },
    isDraft: { type: Boolean, default: true, index: true, select: false },
    isPublished: { type: Boolean, default: false, index: true, select: false }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

// Create index for search
ProductSchema.index({
  product_name: 'text',
  product_description: 'text'
})

// Document middleware: runs before .save() and .create()...
ProductSchema.pre('save', function (next) {
  this.product_slug = slug(this.product_name, { lower: true })
  next()
})

const ProductModel = model<IProduct>(DOCUMENT_NAME, ProductSchema)
export default ProductModel
