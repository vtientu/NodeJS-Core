import BaseRepository from '@core/BaseRepositories.js'
import { IProduct, IProductCreate, IProductFilter } from '@interfaces/product.interfaces.js'
import ProductModel from '@models/product.model.js'
import { SortOrder, Types } from 'mongoose'

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

  findAllProducts({ limit, sort, page, filter, select }: IProductFilter) {
    const skip = (page - 1) * limit
    const sortBy: { [key: string]: SortOrder } = sort === 'ctime' ? { updateAt: -1 } : { updateAt: 1 }

    return this.find(filter).sort(sortBy).skip(skip).limit(limit).select(select).lean()
  }

  findProduct({ product_id, unSelect }: { product_id: any; unSelect: string[] }) {
    return this.findById(product_id).select(unSelect).lean()
  }
}

export default new ProductRepository()
