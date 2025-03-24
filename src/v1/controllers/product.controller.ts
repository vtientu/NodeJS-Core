import { OK } from '@core/success.response.js'
import { CustomRequest } from '@interfaces/request.interface.js'
import ProductFactoryService from '@services/product.service.js'
import { NextFunction, Request, Response } from 'express'

class ProductController {
  public static async createProduct(req: CustomRequest, res: Response, next: NextFunction) {
    new OK({
      message: 'Create Product success!',
      metadata: await ProductFactoryService.createProduct(req.body.product_type, {
        ...req.body,
        product_shop: req.user._id
      })
    }).send(res)
  }
}

export default ProductController
