import { Document, Schema } from 'mongoose'

export interface IProduct extends Document {
  _id: Schema.Types.ObjectId
  product_name: string
  product_description: string
  product_thumb: string
  product_price: number
  product_quantity: number
  product_type: string
  product_shop: Schema.Types.ObjectId
  product_attributes: Schema.Types.Mixed
}

export interface IProductCreate {
  product_name: string
  product_description: string
  product_thumb: string
  product_price: number
  product_quantity: number
  product_type: string
  product_shop: Schema.Types.ObjectId
  product_attributes: Schema.Types.Mixed
}

export interface IClothing extends Document {
  _id: Schema.Types.ObjectId
  brand: string
  size: string
  material: string
}

export interface IClothingCreate {
  brand: string
  size: string
  material: string
}

export interface IElectronic extends Document {
  _id: Schema.Types.ObjectId
  manufacturer: string
  form: string
  color: string
}

export interface IElectronicCreate {
  manufacturer: string
  form: string
  color: string
}
