import bcryptjs from 'bcryptjs'
import crypto from 'node:crypto'

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      const passwordHash = bcryptjs.hash(password, 10)

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
    } catch (error) {}
  }
}
