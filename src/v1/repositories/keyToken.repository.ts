import BaseRepository from '@core/BaseRepositories.js'
import { IKeyToken, IKeyTokenCreate } from '@interfaces/KeyToken.js'
import KeyTokenModel from '@models/keytoken.models.js'

class KeyTokenRepository extends BaseRepository<IKeyToken> {
  constructor() {
    super(KeyTokenModel)
  }

  createKeyToken = (keyToken: IKeyTokenCreate) => {
    return this.create(keyToken)
  }
}

export default new KeyTokenRepository()
