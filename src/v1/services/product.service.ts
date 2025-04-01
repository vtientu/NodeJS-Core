import { BadRequestError } from '@core/error.response.js'
import { IProduct, IProductCreate, IProductFilter } from '@interfaces/product.interfaces.js'
import ProductRepository from '@repositories/product.repository.js'
import ClothingService from '@services/clothing.service.js'
import ElectronicService from '@services/electronic.service.js'
import { isValidObjectId } from 'mongoose'
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

  public static updateProduct({
    productType,
    productId,
    bodyUpdate
  }: {
    productType: string
    productId?: string
    bodyUpdate: Partial<IProductCreate>
  }) {
    if (!productId || !isValidObjectId(productId)) throw new BadRequestError('Invalid Product Id')
    const ProductClass = ProductFactoryService.productRegistration[productType]
    if (!ProductClass) throw new BadRequestError('Invalid Product Types ' + productType)
    return new ProductClass(bodyUpdate).updateProduct(productId)
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
    skip = 0,
    select = ['-__v', '-isDraft', '-isPublished']
  }: {
    product_shop: string
    limit?: number
    skip?: number
    select?: string[]
  }) {
    const query = { product_shop, isPublished: true }
    return await ProductRepository.queryProduct({ query, skip, limit }).select(select)
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

  public static async findAllProducts({
    limit = 50,
    sort = 'ctime',
    page = 1,
    filter = { isPublished: true }
  }: Partial<IProductFilter>) {
    const products = await ProductRepository.findAllProducts({
      limit,
      sort,
      page,
      filter,
      select: ['product_name', 'product_price', 'product_thumb']
    })

    return products
  }

  public static async findProduct(product_id?: string) {
    if (!product_id || !isValidObjectId(product_id)) throw new BadRequestError('Product ID invalid!')
    const product = await ProductRepository.findProduct({ product_id, unSelect: ['-__v'] })

    if (!product) throw new BadRequestError('Product ID not found!')

    return product
  }
}

ProductFactoryService.registerProductType('Clothing', ClothingService)
ProductFactoryService.registerProductType('Electronic', ElectronicService)

export default ProductFactoryService
