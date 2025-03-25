import { BadRequestError } from '@core/error.response.js'
import { IProduct } from '@interfaces/product.interfaces.js'
import ProductRepository from '@repositories/product.repository.js'
import ClothingService from '@services/Clothing.service.js'
import ElectronicService from '@services/electronic.service.js'
import { Types } from 'mongoose'

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

ProductFactoryService.registerProductType('Clothing', ClothingService)
ProductFactoryService.registerProductType('Electronic', ElectronicService)

export default ProductFactoryService
