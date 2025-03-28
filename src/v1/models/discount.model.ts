import { IClothing } from '@interfaces/product.interfaces.js'
import { Schema, model } from 'mongoose'

const DOCUMENT_NAME = 'Discount'
const COLLECTIONS_NAME = 'discounts'

const ClothingSchema = new Schema(
  {
    discount_name: {
      type: String,
      required: true
    },
    discount_description: {
      type: String,
      required: true
    },
    discount_type: {
      type: String,
      enum: ['fixed_amount', 'percentage'],
      default: 'fixed_amount'
    },
    discount_value: {
      type: Number,
      required: true
    },
    discount_code: {
      type: String,
      required: true
    },
    discount_start_date: {
      type: Date,
      required: true
    },
    discount_end_date: {
      type: Date,
      required: true
    },
    discount_max_uses: {
      // so luong discount duoc ap dung
      type: Number,
      required: true
    },
    discount_uses_count: {
      // so discount da su dung
      type: Number,
      required: true
    },
    discount_users_used: {
      type: Array,
      default: []
    },
    discount_max_uses_per_user: {
      // so luong cho phep toi da duoc su dung moi user
      type: Number,
      required: true
    },
    discount_min_order_value: {
      type: Number,
      required: true
    },
    discount_shopId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    discount_is_active: {
      type: Boolean,
      default: true
    },
    discount_applies_to: {
      type: String,
      required: true,
      enum: ['all', 'specific']
    },
    discount_product_ids: {
      //So san pham duoc ap dung
      type: Array,
      default: []
    }
  },
  {
    timestamps: true,
    collection: COLLECTIONS_NAME
  }
)

const ClothingModel = model<IClothing>(DOCUMENT_NAME, ClothingSchema)
export default ClothingModel
