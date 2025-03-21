import { IKeyTokenCreate } from '@interfaces/keytoken.interface.js'
import KeyTokenRepository from '@repositories/keyToken.repository.js'
import { Types } from 'mongoose'

class KeyTokenService {
  public static async createKeyToken(keyToken: IKeyTokenCreate) {
    // const tokens = await KeyTokenRepository.createKeyToken(keyToken)

    const filter = { user: keyToken.user }
    const data = keyToken
    const options = { upsert: true, new: true }

    const tokens = await KeyTokenRepository.findKeyTokenAndUpdate(filter, data, options)

    if (!tokens) throw new Error('Error creating key token')

    return tokens
  }

  public static async findByUserId(userId: string) {
    return await KeyTokenRepository.findOne({
      user: new Types.ObjectId(userId)
    }).lean()
  }
}

export default KeyTokenService
