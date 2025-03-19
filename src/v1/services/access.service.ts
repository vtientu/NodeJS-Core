import { IUserCreate } from '@interfaces/User.js'
import UserRepository from '@repositories/user.repository.js'
import bcryptjs from 'bcryptjs'
import crypto from 'node:crypto'

class AccessService {
  signUp = async ({ name, email, password }: IUserCreate) => {
    const holderUser = await UserRepository.getUserByEmail(email)

    if (holderUser) {
      return {
        code: 'xxxx',
        message: 'Email already registered!'
      }
    }

    const passwordHash = bcryptjs.hash(password, 10)

    const newUser = UserRepository.createUser({
      name,
      email,
      password
    })

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
  }
}

export default new AccessService()
