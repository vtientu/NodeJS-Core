import BaseRepository from '@core/BaseRepositories.js'
import { IApiKey } from '@interfaces/apikey.interface.js'
import ApiKeyModel from '@models/apikey.model.js'

class ApiKeyRepository extends BaseRepository<IApiKey> {
  constructor() {
    super(ApiKeyModel)
  }

  public async findKeyActiveByKey(key: string) {
    return this.model.findOne({ key, status: true }).lean()
  }
}

export default new ApiKeyRepository()
