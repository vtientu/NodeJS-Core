import { IProduct } from '@interfaces/product.interfaces.js'
import ProductRepository from '@repositories/product.repository.js'
import { Schema } from 'mongoose'

class BaseProductService {
  constructor(public product: IProduct) {
    this.product = product
  }

  public async createProduct(product_id: Schema.Types.ObjectId) {
    return await ProductRepository.createProduct({ ...this.product, _id: product_id })
  }
}

export default BaseProductService
