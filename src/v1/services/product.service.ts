import { BadRequestError } from '@core/error.response.js'
import { IProduct } from '@interfaces/product.interfaces.js'
import ClothingRepository from '@repositories/clothing.repository.js'
import ElectronicRepository from '@repositories/electronic.repository.js'
import ProductRepository from '@repositories/product.repository.js'
import { Schema, Types } from 'mongoose'

class ProductFactoryService {
  static productRegistration: { [key: string]: any } = {}

  public static registerProductType(productType: string, productClass: any) {
    this.productRegistration[productType] = productClass
  }

  public static createProduct(type: string, payload: IProduct) {
    const productClass = ProductFactoryService.productRegistration[type]
    if (!productClass) throw new BadRequestError('Invalid Product Types ' + type)
    return new productClass(payload).createProduct()
  }

  public static async findAllDraftsForShop({
    product_shop,
    limit = 50,
    skip = 0
  }: {
    product_shop: string
    limit?: number
    skip?: number
  }) {
    const query = { product_shop, isDraft: true }
    return await ProductRepository.queryProduct({ query, skip, limit })
  }

  public static async findAllPublishForShop({
    product_shop,
    limit = 50,
    skip = 0
  }: {
    product_shop: string
    limit?: number
    skip?: number
  }) {
    const query = { product_shop, isPublished: true }
    return await ProductRepository.queryProduct({ query, skip, limit })
  }

  public static async searchProducts({ keySearch }: { keySearch?: string }) {
    const results = await ProductRepository.find({
      isPublished: true,
      $text: {
        $search: keySearch || ''
      }
    })
      .select({ score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } })

    return results
  }

  public static async publishProductByShop({ product_shop, product_id }: { product_shop: string; product_id: string }) {
    const productFound = await ProductRepository.findProductByShop({
      product_shop: new Types.ObjectId(product_shop),
      product_id: new Types.ObjectId(product_id)
    })

    if (!productFound) throw new BadRequestError('Product not found!')

    productFound.isDraft = false
    productFound.isPublished = true

    const { modifiedCount } = await productFound.updateOne(productFound)

    return modifiedCount
  }

  public static async unPublishProductByShop({
    product_shop,
    product_id
  }: {
    product_shop: string
    product_id: string
  }) {
    const productFound = await ProductRepository.findProductByShop({
      product_shop: new Types.ObjectId(product_shop),
      product_id: new Types.ObjectId(product_id)
    })

    if (!productFound) throw new BadRequestError('Product not found!')

    productFound.isDraft = true
    productFound.isPublished = false

    const { modifiedCount } = await productFound.updateOne(productFound)

    return modifiedCount
  }

  // public static createProduct(payload: IProduct) {
  //   switch (payload.product_type) {
  //     case 'Electronic':
  //       return new Electronic(payload).createProduct()

  //     case 'Clothing':
  //       return new Clothing(payload).createProduct()

  //     default:
  //       throw new BadRequestError('Invalid Product Types ' + payload.product_type)
  //   }
  // }
}

class Product {
  constructor(public product: IProduct) {
    this.product = product
  }

  public async createProduct(product_id: Schema.Types.ObjectId) {
    return await ProductRepository.createProduct({ ...this.product, _id: product_id })
  }
}

class Clothing extends Product {
  public async createProduct() {
    const newClothing = await ClothingRepository.createClothing({
      ...this.product.product_attributes,
      product_shop: this.product.product_shop
    })

    if (!newClothing) throw new BadRequestError('Create new clothing error!')

    const newProduct = await super.createProduct(newClothing._id)

    if (!newProduct) throw new BadRequestError('Create new Product error!')

    return newProduct
  }
}

class Electronic extends Product {
  public async createProduct() {
    const newElectronic = await ElectronicRepository.createElectronic({
      ...this.product.product_attributes,
      product_shop: this.product.product_shop
    })

    if (!newElectronic) throw new BadRequestError('Create new Electronic error!')

    const newProduct = await super.createProduct(newElectronic._id)

    if (!newProduct) throw new BadRequestError('Create new Product error!')

    return newProduct
  }
}

ProductFactoryService.registerProductType('Clothing', Clothing)
ProductFactoryService.registerProductType('Electronic', Electronic)

export default ProductFactoryService
