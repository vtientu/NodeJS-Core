import { Document, Schema } from 'mongoose'

export interface IDiscount extends Document {
  _id: Schema.Types.ObjectId
  name: string
  description: string
  type: string
  value: number
  code: string
  start_date: Date
  end_date: Date
  max_uses: number
  uses_count: number
  users_used: any[]
  max_uses_per_user: number
  min_order_value: number
  shopId: Schema.Types.ObjectId
  is_active: boolean
  applies_to: string
  product_ids: any[]
}

export interface IDiscountPayload {
  code: string
  start_date: string | Date
  end_date: string | Date
  is_active: boolean
  shopId: string
  min_order_value: number
  product_ids: string[]
  applies_to: string
  name: string
  description: string
  type: string
  max_value: number
  max_uses: number
}

export type DiscountWithProductFilter = {
  code?: string
  shopId?: string
  userId?: string
  limit?: number
  page?: number
}
