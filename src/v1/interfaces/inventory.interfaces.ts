import { Document, Schema } from 'mongoose'

export interface IInventory extends Document {
  _id: Schema.Types.ObjectId
  productId: Schema.Types.ObjectId
  shopId: Schema.Types.ObjectId
  location: string
  stock: number
  reservations: any[]
}

export interface IInventoryPayload {
  productId?: Schema.Types.ObjectId
  shopId?: Schema.Types.ObjectId
  location?: string
  stock?: number
}
