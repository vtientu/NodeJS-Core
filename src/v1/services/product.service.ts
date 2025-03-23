// Define Factory class to create product

import { BadRequestError } from '@core/error.response.js'
import { IProduct } from '@interfaces/product.interfaces.js'
import { clothingRepository, electronicRepository, productRepository } from '@repositories/product.repository.js'

class ProductFactoryService {
  public static createProduct(type: String, payload: any) {
    switch (type) {
      case 'Electronic':
        return new Electronic(payload).createProduct()

      case 'Clothing':
        return new Clothing(payload).createProduct()

      default:
        throw new BadRequestError('Invalid Product Types ' + type)
    }
  }
}

class Product {
  constructor(public product: IProduct) {
    this.product = product
  }

  public async createProduct() {
    return await productRepository.createProduct(this.product)
  }
}

class Clothing extends Product {
  public async createProduct() {
    const newClothing = await clothingRepository.createClothing(this.product.product_attributes)

    if (!newClothing) throw new BadRequestError('Create new clothing error!')

    const newProduct = await super.createProduct()

    if (!newProduct) throw new BadRequestError('Create new Product error!')

    return newProduct
  }
}

class Electronic extends Product {
  public async createProduct() {
    const newElectronic = await electronicRepository.createElectronic(this.product.product_attributes)

    if (!newElectronic) throw new BadRequestError('Create new Electronic error!')

    const newProduct = await super.createProduct()

    if (!newProduct) throw new BadRequestError('Create new Product error!')

    return newProduct
  }
}

export default ProductFactoryService
