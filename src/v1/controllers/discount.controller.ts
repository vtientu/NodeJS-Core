import { CREATED, OK } from '@core/success.response.js'
import { CustomRequest } from '@interfaces/request.interface.js'
import DiscountService from '@services/discount.service.js'
import { Request, Response, NextFunction } from 'express'

class DiscountController {
  public static async createDiscountCode(req: CustomRequest, res: Response, next: NextFunction) {
    new CREATED({
      message: 'Create discount code successfully!',
      metadata: await DiscountService.createDiscountCode({ ...req.body, shopId: req.user.userId })
    }).send(res)
  }

  public static async getAllDiscountCodesByShop(req: CustomRequest, res: Response, next: NextFunction) {
    new OK({
      message: 'Get all discount codes successfully!',
      metadata: await DiscountService.getAllDiscountCodesByShop({ ...req.body, shopId: req.user.userId })
    }).send(res)
  }

  public static async getDiscountAmount(req: CustomRequest, res: Response, next: NextFunction) {
    new OK({
      message: 'Get discount amount successfully!',
      metadata: await DiscountService.getDiscountAmount({ ...req.body, shopId: req.user.userId })
    }).send(res)
  }

  public static async cancelDiscountCode(req: CustomRequest, res: Response, next: NextFunction) {
    new OK({
      message: 'Cancel discount code successfully!',
      metadata: await DiscountService.cancelDiscountCode({ ...req.body, shopId: req.user.userId })
    }).send(res)
  }
}

export default DiscountController
