import { IProduct, IProductCreate } from '@interfaces/product.interfaces.js'
import InventoryRepository from '@repositories/inventory.repository.js'
import ProductRepository from '@repositories/product.repository.js'
import { Schema } from 'mongoose'

class BaseProductService {
  constructor(public product: IProduct) {
    this.product = product
  }

  public async createProduct(productId: Schema.Types.ObjectId) {
    const newProduct = await ProductRepository.createProduct({ ...this.product, _id: productId })

    if (newProduct) {
      await InventoryRepository.insertInventory({
        productId: newProduct._id,
        shopId: newProduct.product_shop,
        stock: newProduct.product_quantity
      })
    }

    return newProduct
  }

  public async updateProduct(productId: string, bodyUpdate: Partial<IProductCreate>) {
    return await ProductRepository.update(productId, bodyUpdate)
  }
}

export default BaseProductService
