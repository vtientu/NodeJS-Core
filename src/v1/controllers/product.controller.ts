import { CREATED, OK } from '@core/success.response.js'
import { CustomRequest } from '@interfaces/request.interface.js'
import ProductFactoryService from '@services/product.service.js'
import { NextFunction, Request, Response } from 'express'

class ProductController {
  public static async createProduct(req: CustomRequest, res: Response, next: NextFunction) {
    new CREATED({
      message: 'Create Product success!',
      metadata: await ProductFactoryService.createProduct(req.body.product_type, {
        ...req.body,
        product_shop: req.user._id
      })
    }).send(res)
  }

  public static async updateProduct(req: CustomRequest, res: Response, next: NextFunction) {
    new CREATED({
      message: 'Update Product success!',
      metadata: await ProductFactoryService.updateProduct({
        productId: req.params.id,
        productType: req.body.product_type,
        bodyUpdate: req.body
      })
    }).send(res)
  }

  // QUERY //
  /**
   * @description Get all Drafts for shop
   * @param { Number } limit
   * @param { Number } skip
   * @param { Number } query
   * @return { JSON }
   */
  public static async getAllPublishForShop(req: CustomRequest, res: Response, next: NextFunction) {
    new OK({
      message: 'Get list Published success!',
      metadata: await ProductFactoryService.findAllPublishForShop({
        product_shop: req.user._id
      })
    }).send(res)
  }

  /**
   * @description Get all Drafts for shop
   * @param { Number } limit
   * @param { Number } skip
   * @param { Number } query
   * @return { JSON }
   */
  public static async getAllDraftsForShop(req: CustomRequest, res: Response, next: NextFunction) {
    new OK({
      message: 'Get list Draft success!',
      metadata: await ProductFactoryService.findAllDraftsForShop({
        product_shop: req.user._id
      })
    }).send(res)
  }

  /**
   * @description Get Products List
   * @param {IProductFilter} query
   * @return { ProductList } res
   */
  public static async getAllProducts(req: CustomRequest, res: Response, next: NextFunction) {
    new OK({
      message: 'Get products list success!',
      metadata: await ProductFactoryService.findAllProducts(req.query)
    }).send(res)
  }

  /**
   * @description Get Product Detail
   * @param { String } product_id
   * @return { ProductList } res
   */
  public static async getProductDetails(req: CustomRequest, res: Response, next: NextFunction) {
    new OK({
      message: 'Get products details success!',
      metadata: await ProductFactoryService.findProduct(req.params.id)
    }).send(res)
  }

  // END QUERY //

  public static async getProductBySearchKey(req: Request, res: Response, next: NextFunction) {
    console.log(req)

    new OK({
      message: 'Get list products by search key',
      metadata: await ProductFactoryService.searchProducts({
        keySearch: req.query?.search?.toString()
      })
    }).send(res)
  }

  public static async publishProductDraft(req: CustomRequest, res: Response, next: NextFunction) {
    new OK({
      message: 'Publish product success!',
      metadata: await ProductFactoryService.publishProductByShop({
        product_shop: req.user._id,
        product_id: req.params.id
      })
    }).send(res)
  }

  public static async unPublishProductDraft(req: CustomRequest, res: Response, next: NextFunction) {
    new OK({
      message: 'UnPublish product success!',
      metadata: await ProductFactoryService.unPublishProductByShop({
        product_shop: req.user._id,
        product_id: req.params.id
      })
    }).send(res)
  }
}

export default ProductController
