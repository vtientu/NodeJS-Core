import BaseRepository from '@core/BaseRepositories.js'
import { IDiscount, IDiscountPayload } from '@interfaces/discount.interfaces.js'
import DiscountModel from '@models/discount.model.js'
import { SortOrder } from 'mongoose'

class DiscountRepository extends BaseRepository<IDiscount> {
  constructor() {
    super(DiscountModel)
  }

  createDiscountCode(payload: IDiscountPayload) {
    return this.model.create(payload)
  }

  findAllDiscountCodeUnSelect({
    limit = 50,
    page = 1,
    sort = 'ctime',
    filter,
    select = ['-__v', '-isActive', '-shopId']
  }: {
    limit?: number
    page?: number
    sort?: string
    filter?: any
    select?: string[]
  }) {
    const skip = (page - 1) * limit
    const sortBy: { [key: string]: SortOrder } = sort === 'ctime' ? { updateAt: -1 } : { updateAt: 1 }

    return this.model.find(filter).sort(sortBy).skip(skip).limit(limit).select(select).lean()
  }
}

export default new DiscountRepository()
