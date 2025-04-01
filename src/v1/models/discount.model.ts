import { IDiscount } from '@interfaces/discount.interfaces.js'
import { Schema, model } from 'mongoose'

const DOCUMENT_NAME = 'Discount'
const COLLECTIONS_NAME = 'discounts'

const DiscountSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['fixed_amount', 'percentage'],
      default: 'fixed_amount'
    },
    value: {
      type: Number,
      required: true
    },
    code: {
      type: String,
      required: true
    },
    start_date: {
      type: Date,
      required: true
    },
    end_date: {
      type: Date,
      required: true
    },
    max_uses: {
      // so luong discount duoc ap dung
      type: Number,
      required: true
    },
    uses_count: {
      // so discount da su dung
      type: Number,
      required: true
    },
    users_used: {
      type: Array,
      default: []
    },
    max_uses_per_user: {
      // so luong cho phep toi da duoc su dung moi user
      type: Number,
      required: true
    },
    min_order_value: {
      type: Number,
      required: true
    },
    shopId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    is_active: {
      type: Boolean,
      default: true
    },
    applies_to: {
      type: String,
      required: true,
      enum: ['all', 'specific']
    },
    product_ids: {
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

const DiscountModel = model<IDiscount>(DOCUMENT_NAME, DiscountSchema)
export default DiscountModel
