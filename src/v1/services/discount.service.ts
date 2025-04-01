/*
  1 - Generator Discount Code [Shop | Admin]
  2 - Get discount amount [User]
  3 - Get all discount codes [User | Shop]
  4 - Verify discount code [User]
  5 - Delete discount code [Shop | Admin]
  6 - Cancel discount code [User]
*/

import { BadRequestError, NotFoundError } from '@core/error.response.js'
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

  // Apply discount code
  public static async getDiscountAmount({
    code,
    userId,
    shopId,
    products
  }: {
    code: string
    userId: string
    shopId: string
    products: IProduct[]
  }) {
    if (!isValidObjectId(shopId)) throw new BadRequestError('Shop ID is invalid!')

    const foundDiscount = await DiscountRepository.findOne({
      code: code,
      shopId: shopId
    }).lean()

    if (!foundDiscount) throw new BadRequestError('Discount code not exists!')

    if (!foundDiscount.is_active) throw new NotFoundError('Discount expired!')

    if (!foundDiscount.max_uses) throw new NotFoundError('Discount are out of stock!')

    if (foundDiscount.max_uses <= 0) throw new NotFoundError('Discount are out of stock!')

    if (new Date() > new Date(foundDiscount.end_date) || new Date() < new Date(foundDiscount.start_date))
      throw new NotFoundError('Discount expired!')

    let totalOrder = 0

    if (foundDiscount.min_order_value > 0) {
      totalOrder = products.reduce((acc: number, product: IProduct) => {
        return acc + product.product_quantity * product.product_price
      }, 0)

      if (totalOrder < foundDiscount.min_order_value)
        throw new NotFoundError(`Discount require minimum order value of ${foundDiscount.min_order_value}!`)
    }

    if (foundDiscount.max_uses_per_user > 0) {
      const userUserDiscount = foundDiscount.users_used.find((user) => user.user_id === userId)

      if (userUserDiscount) {
        if (userUserDiscount.uses_count >= foundDiscount.max_uses_per_user)
          throw new NotFoundError('Discount code has no limit!')
      }
    }

    const amount =
      foundDiscount.type === 'fixed_amount' ? foundDiscount.value : totalOrder * (foundDiscount.value / 100)

    return {
      totalOrder,
      discount: amount,
      totalPrice: totalOrder - amount
    }
  }

  public static async deleteDiscountCode({ code, shopId }: { code: string; shopId: string }) {
    if (!isValidObjectId(shopId)) throw new BadRequestError('Shop ID is invalid!')

    const deleteDiscount = await DiscountRepository.deleteOne({
      code: code,
      shopId: shopId
    })

    return deleteDiscount
  }

  public static async cancelDiscountCode({ code, shopId, userId }: { code: string; shopId: string; userId: string }) {
    if (!isValidObjectId(shopId)) throw new BadRequestError('Shop ID is invalid!')

    const foundDiscount = await DiscountRepository.findOne({
      code: code,
      shopId: shopId
    })

    if (!foundDiscount) throw new NotFoundError('Discount code not exists!')

    const cancelDiscount = await DiscountRepository.update(foundDiscount._id, {
      $pull: {
        users_used: {
          userId
        }
      },
      $inc: {
        max_uses: 1,
        uses_count: -1
      }
    })

    return cancelDiscount
  }
}

export default DiscountService
