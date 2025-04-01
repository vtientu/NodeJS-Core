/*
  1 - Generator Discount Code [Shop | Admin]
  2 - Get discount amount [User]
  3 - Get all discount codes [User | Shop]
  4 - Verify discount code [User]
  5 - Delete discount code [Shop | Admin]
  6 - Cancel discount code [User]
*/

import { BadRequestError } from '@core/error.response.js'
import { DiscountWithProductFilter, IDiscountPayload } from '@interfaces/discount.interfaces.js'
import { IProduct } from '@interfaces/product.interfaces.js'
import DiscountRepository from '@repositories/discount.repository.js'
import ProductFactoryService from '@services/product.service.js'
import { isValidObjectId } from 'mongoose'

class DiscountService {
  public static async createDiscountCode(payload: IDiscountPayload) {
    const { code, start_date, end_date, shopId, min_order_value, product_ids, applies_to } = payload

    if (new Date() < new Date(start_date) || new Date() > new Date(end_date)) {
      throw new BadRequestError('Discount code has expired!')
    }

    if (!isValidObjectId(shopId)) throw new BadRequestError('Shop ID is invalid!')

    //create index for discount code

    const foundDiscount = await DiscountRepository.findOne({
      discount_code: code,
      discount_shopId: shopId
    }).lean()

    if (foundDiscount) throw new BadRequestError('Discount code already exists!')

    const discount = await DiscountRepository.createDiscountCode({
      ...payload,
      min_order_value: min_order_value || 0,
      start_date: new Date(start_date),
      end_date: new Date(end_date),
      product_ids: applies_to === 'all' ? [] : product_ids
    })

    return discount
  }

  public static async getALlDiscountCodeWithProduct({ code, shopId, userId, limit, page }: DiscountWithProductFilter) {
    // create index for discount code

    if (!code || !shopId || !isValidObjectId(shopId)) throw new BadRequestError('Bad request!')

    const foundDiscount = await DiscountRepository.findOne({
      code: code,
      shopId: shopId,
      is_active: true
    }).lean()

    if (!foundDiscount) throw new BadRequestError('Discount code not exists!')

    const { applies_to, product_ids } = foundDiscount

    let products: IProduct[] = []

    if (applies_to === 'all') {
      products = await ProductFactoryService.findAllPublishForShop({
        product_shop: shopId
      })
    }

    if (applies_to === 'specific') {
      products = await ProductFactoryService.findAllProducts({
        filter: {
          _id: { $in: product_ids },
          isPublished: true
        },
        select: ['product_name']
      })
    }

    return products
  }

  // Get all discount code of shop
  public static async getAllDiscountCodesByShop({
    limit,
    page,
    shopId
  }: {
    limit: number
    page: number
    shopId: string
  }) {
    const discountCodes = await DiscountRepository.findAllDiscountCodeUnSelect({
      limit,
      page,
      filter: {
        shopId: shopId,
        is_active: true
      },
      select: ['-__v', '-shopId']
    })

    return discountCodes
  }
}

export default DiscountService
