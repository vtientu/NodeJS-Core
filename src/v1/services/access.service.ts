import { createTokensPair } from '@/v1/auth/authUtils.js'
import { BadRequestError } from '@core/error.response.js'
import { IUserCreate } from '@interfaces/user.interface.js'
import UserRepository from '@repositories/user.repository.js'
import KeyTokenService from '@services/keyToken.service.js'
import { pickFields } from '@utils/index.js'
import bcryptjs from 'bcryptjs'
import crypto from 'node:crypto'

class AccessService {
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

    //Dùng để verify token
    await KeyTokenService.createKeyToken({
      user: newUser._id,
      accessTokenKey,
      refreshTokenKey
    })

    const tokens = createTokensPair({
      payload: pickFields(newUser, ['_id', 'email', 'name']),
      accessTokenKey,
      refreshTokenKey
    })

    return {
      metadata: {
        user: pickFields(newUser, ['_id', 'email', 'name']),
        tokens
      }
    }
  }
}

export default AccessService
