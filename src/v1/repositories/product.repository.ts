import BaseRepository from '@core/BaseRepositories.js'
import { IProduct, IProductCreate } from '@interfaces/product.interfaces.js'
import ProductModel from '@models/product.model.js'

// Define base product class
class ProductRepository extends BaseRepository<IProduct> {
  constructor() {
    super(ProductModel)
  }

  createProduct(product: IProductCreate) {
    return this.create(product)
  }
}

export default new ProductRepository()
