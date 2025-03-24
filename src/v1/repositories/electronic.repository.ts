import BaseRepository from '@core/BaseRepositories.js'
import { IElectronic } from '@interfaces/product.interfaces.js'
import ElectronicModel from '@models/electronic.model.js'

class ElectronicRepository extends BaseRepository<IElectronic> {
  constructor() {
    super(ElectronicModel)
  }

  createElectronic(electronic: any) {
    return this.create(electronic)
  }
}

export default new ElectronicRepository()
