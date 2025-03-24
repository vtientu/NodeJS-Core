import BaseRepository from '@core/BaseRepositories.js'
import { IClothing } from '@interfaces/product.interfaces.js'
import ClothingModel from '@models/clothing.model.js'

class ClothingRepository extends BaseRepository<IClothing> {
  constructor() {
    super(ClothingModel)
  }

  createClothing(clothing: any) {
    return this.create(clothing)
  }
}

export default new ClothingRepository()
