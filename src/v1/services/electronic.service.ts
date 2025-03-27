import { BadRequestError } from '@core/error.response.js'
import ElectronicRepository from '@repositories/electronic.repository.js'
import BaseProductService from '@services/baseproduct.service.js'
import { convertToUpdateNested } from '@utils/index.js'

class ElectronicService extends BaseProductService {
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

  public async updateProduct(productId: string) {
    if (this.product.product_attributes) {
      await ElectronicRepository.update(productId, convertToUpdateNested(this.product.product_attributes))
    }
    return await super.updateProduct(productId, convertToUpdateNested(this.product))
  }
}

export default ElectronicService
