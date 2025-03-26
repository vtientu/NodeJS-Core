import { BadRequestError } from '@core/error.response.js'
import clothingRepository from '@repositories/clothing.repository.js'
import BaseProductService from '@services/baseproduct.service.js'

class ClothingService extends BaseProductService {
  public async createProduct() {
    const newClothing = await clothingRepository.createClothing({
      ...this.product.product_attributes,
      product_shop: this.product.product_shop
    })

    if (!newClothing) throw new BadRequestError('Create new clothing error!')

    const newProduct = await super.createProduct(newClothing._id)

    if (!newProduct) throw new BadRequestError('Create new Product error!')

    return newProduct
  }
}

export default ClothingService
