import { createTokensPair } from '@/v1/auth/authUtils.js'
import { BadRequestError } from '@core/error.response.js'
import { ILogin } from '@interfaces/access.interfaces.js'
import { IKeyToken } from '@interfaces/keytoken.interface.js'
import { IUserCreate } from '@interfaces/user.interface.js'
import keyTokenRepository from '@repositories/keyToken.repository.js'
import UserRepository from '@repositories/user.repository.js'
import KeyTokenService from '@services/keyToken.service.js'
import UserService from '@services/user.service.js'
import { pickFields } from '@utils/index.js'
import bcryptjs from 'bcryptjs'
import crypto from 'node:crypto'

class AccessService {
  /**
   * @param {email, password, refreshToken} req.body
   * @returns {Promise<void>}
   * 
   1 - check email in dbs
   2 - match password
   3 - create AT vs RT and save
   4 - generate tokens
   5 - get data return login
   */

  public static login = async ({ email, password, refreshToken }: ILogin) => {
    // 1
    const userFound = await UserService.getUserByEmail(email)
    if (!userFound) {
      throw new BadRequestError('Email not registered!')
    }

    // 2
    const math = await bcryptjs.compare(password, userFound.password)
    if (!math) {
      throw new BadRequestError('Email or password incorrect!')
    }

    // 3
    const accessTokenKey = crypto.randomBytes(64).toString('hex')
    const refreshTokenKey = crypto.randomBytes(64).toString('hex')

    // 4
    const tokens = createTokensPair({
      payload: pickFields(userFound, ['_id', 'email', 'name']),
      accessTokenKey,
      refreshTokenKey
    })

    await KeyTokenService.createKeyToken({
      user: userFound._id,
      accessTokenKey,
      refreshTokenKey,
      refreshToken: tokens.refreshToken
    })

    return {
      user: pickFields(userFound, ['_id', 'email', 'name']),
      tokens
    }
  }

  public static signUp = async ({ name, email, password }: IUserCreate) => {
    const holderUser = await UserRepository.getUserByEmail(email)

    if (holderUser) {
      throw new BadRequestError('Email already registered!')
    }

    const passwordHash = await bcryptjs.hash(password, 10)

    const newUser = await UserRepository.createUser({
      name,
      email,
      password: passwordHash
    })

    /**
    // Cách 1: Tạo cặp khóa RSA bất đối xứng
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048, // Độ dài khóa (2048-bit là tiêu chuẩn an toàn)
      publicKeyEncoding: {
        type: 'spki', // Định dạng khóa công khai
        format: 'pem' // PEM format (dễ đọc)
      },
      privateKeyEncoding: {
        type: 'pkcs8', // Định dạng khóa riêng tư
        format: 'pem'
      }
    })

     */

    // Cách 2: Tạo cặp khóa đối xứng ()
    const accessTokenKey = crypto.randomBytes(64).toString('hex')
    const refreshTokenKey = crypto.randomBytes(64).toString('hex')

    const tokens = createTokensPair({
      payload: pickFields(newUser, ['_id', 'email', 'name']),
      accessTokenKey,
      refreshTokenKey
    })

    //Dùng để verify token
    await KeyTokenService.createKeyToken({
      user: newUser._id,
      accessTokenKey,
      refreshTokenKey,
      refreshToken: tokens.refreshToken
    })

    return {
      user: pickFields(newUser, ['_id', 'email', 'name']),
      tokens
    }
  }

  public static logout = async (keyStore?: IKeyToken) => {
    if (!keyStore?._id) {
      throw new BadRequestError()
    }

    return await keyTokenRepository.deleteOne({
      _id: keyStore?._id
    })
  }
}

export default AccessService
