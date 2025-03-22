import mongoose from 'mongoose'
import mongoDBConfig from 'configs/mongodb.config.js'
import logger from '@utils/logger.js'

const connectionString = `mongodb://${mongoDBConfig.host}:${mongoDBConfig.port}/${mongoDBConfig.name}`

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

      await mongoose.connect(connectionString, {
        maxPoolSize: 50 // Tối 50 connections và có thể tái sử dụng connect. Default: 100
      })
      this.isConnected = true
      logger.info('Database connected successfully')
    } catch (error) {
      logger.error(error)
      process.exit(1) //Thoát ngay quá trình chạy nodejs khi kết nối thất bại
    }
  }
}

export default Database.getInstance()
