import BaseRepository from '@core/BaseRepositories.js'
import { IInventory, IInventoryPayload } from '@interfaces/inventory.interfaces.js'
import InventoryModel from '@models/inventory.model.js'

class InventoryRepository extends BaseRepository<IInventory> {
  constructor() {
    super(InventoryModel)
  }

  insertInventory(inventoryPayload: IInventoryPayload) {
    this.create(inventoryPayload)
  }
}

export default new InventoryRepository()
