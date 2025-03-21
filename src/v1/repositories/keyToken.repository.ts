import BaseRepository from '@core/BaseRepositories.js'
import { IKeyToken, IKeyTokenCreate } from '@interfaces/keytoken.interface.js'
import KeyTokenModel from '@models/keytoken.model.js'
import { FilterQuery, QueryOptions, Types } from 'mongoose'

class KeyTokenRepository extends BaseRepository<IKeyToken> {
  constructor() {
    super(KeyTokenModel)
  }

  createKeyToken = (keyToken: IKeyTokenCreate) => {
    return this.create(keyToken)
  }

  findKeyTokenAndUpdate(filter: FilterQuery<IKeyToken>, data: Partial<IKeyToken>, options: QueryOptions<IKeyToken>) {
    return this.model.findOneAndUpdate(filter, data, options)
  }

  removeKeyById(id: Types.ObjectId) {
    return this.deleteOne({
      _id: id
    })
  }
}

export default new KeyTokenRepository()
