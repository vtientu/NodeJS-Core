import { OK } from '@core/success.response.js'
import ProductFactoryService from '@services/product.service.js'
import { NextFunction, Request, Response } from 'express'

class ProductController {
  public static async createProduct(req: Request, res: Response, next: NextFunction) {
    new OK({
      message: 'Create Product success!',
      metadata: await ProductFactoryService.createProduct(req.body?.product_type, req.body)
    }).send(res)
  }
}

export default ProductController
