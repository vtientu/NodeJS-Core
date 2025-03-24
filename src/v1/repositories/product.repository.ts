import BaseRepository from '@core/BaseRepositories.js'
import { IProduct, IProductCreate } from '@interfaces/product.interfaces.js'
import ProductModel from '@models/product.model.js'
import { Schema, Types } from 'mongoose'

// Define base product class
class ProductRepository extends BaseRepository<IProduct> {
  constructor() {
    super(ProductModel)
  }

  createProduct(product: IProductCreate) {
    return this.create(product)
  }

  queryProduct({ query, limit, skip }: { query: Object; limit: number; skip: number }) {
    return this.find(query).populate('product_shop', 'name email').sort({ updateAt: -1 }).limit(limit).skip(skip).lean()
  }

  findProductByShop({ product_shop, product_id }: { product_shop: Types.ObjectId; product_id: Types.ObjectId }) {
    return this.findOne({
      product_shop,
      _id: product_id
    })
  }
}

export default new ProductRepository()
