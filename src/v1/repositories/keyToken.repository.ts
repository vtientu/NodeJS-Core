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
    return this.model.findOneAndUpdate(filter, data, options).lean()
  }

  removeKeyById(id: Types.ObjectId) {
    return this.deleteOne({
      _id: id
    })
  }

  findByRefreshToken(refreshToken: string) {
    return this.findOne({
      refreshToken
    }).lean()
  }

  findByRefreshTokenUsed(refreshToken: string) {
    return this.findOne({
      refreshTokensUsed: refreshToken
    }).lean()
  }

  deleteKeyByUID(userId: Types.ObjectId) {
    return this.deleteOne({
      userId
    })
  }
}

export default new KeyTokenRepository()
