import logger from '@/v1/utils/logger.js'
import mongoose from 'mongoose'

const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_PORT = process.env.DB_PORT || 27017
const DB_NAME = process.env.DB_NAME || ''

const connectionString = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

class Database {
  private static instance: Database
  private isConnected = false

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }

  public async connectDB() {
    if (this.isConnected) {
      return
    }

    try {
      mongoose.set('debug', true)
      mongoose.set('debug', { color: true })

      await mongoose.connect(connectionString)
      this.isConnected = true
      logger.info('Database connected successfully')
    } catch (error) {
      logger.error(error)
      process.exit(1) //Thoát ngay quá trình chạy nodejs khi kết nối thất bại
    }
  }
}

export default Database.getInstance()
