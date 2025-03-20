import { IKeyTokenCreate } from '@interfaces/KeyToken.js'
import KeyTokenRepository from '@repositories/keyToken.repository.js'

class KeyTokenService {
  public static async createKeyToken(keyToken: IKeyTokenCreate) {
    const tokens = await KeyTokenRepository.createKeyToken(keyToken)

    if (!tokens) throw new Error('Error creating key token')

    return tokens.accessTokenKey
  }
}

export default KeyTokenService
