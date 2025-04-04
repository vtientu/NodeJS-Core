import { Document, FilterQuery, Schema } from 'mongoose'

export interface IProduct extends Document {
  _id: Schema.Types.ObjectId
  product_name: string
  product_slug: string
  product_description: string
  product_thumb: string
  product_price: number
  product_quantity: number
  product_type: string
  product_shop: Schema.Types.ObjectId
  product_attributes: Schema.Types.Mixed
  product_rattingAverage: number
  product_variations: string[]
  isDraft: boolean
  isPublished: boolean
}

export interface IProductCreate {
  _id: Schema.Types.ObjectId
  product_name: string
  product_description: string
  product_thumb: string
  product_price: number
  product_quantity: number
  product_type: string
  product_shop: Schema.Types.ObjectId
  product_rattingAverage: number
  product_variations: string[]
  product_attributes: Schema.Types.Mixed
}

export interface IClothing extends Document {
  _id: Schema.Types.ObjectId
  brand: string
  size: string
  material: string
  product_shop: Schema.Types.ObjectId
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
  product_shop: Schema.Types.ObjectId
}

export interface IElectronicCreate {
  manufacturer: string
  form: string
  color: string
}

export interface IFurniture extends Document {
  _id: Schema.Types.ObjectId
  material: string
  size: string
  product_shop: Schema.Types.ObjectId
}

export interface IFurnitureCreate {
  material: string
  size: string
}

export interface IProductFilter {
  limit: number
  page: number
  sort: string
  filter: FilterQuery<IProduct>
  select: string | string[] | Record<string, number | boolean | string | object>
}
