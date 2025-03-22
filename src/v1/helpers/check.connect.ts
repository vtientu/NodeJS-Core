import logger from '@utils/logger.js'
import mongoose from 'mongoose'
import os from 'os'
import process from 'process'
const _SECONDS = 5000

export const countConnect = () => {
  const numConnection = mongoose.connections.length
  console.log(`Number of connections:`, numConnection)

  return numConnection
}

export const checkOverload = () => {
  setInterval(() => {
    const numConnection = countConnect()
    const numCores = os.cpus().length
    const memoryUsage = process.memoryUsage().rss

    // Tùy vào cấu hình. Ví dụ mỗi cores tải max 5 connections;
    const maxConnections = numCores * 5
    if (numConnection > maxConnections) {
      logger.warn('Quá tải kết nối:', numConnection)
    }
  }, _SECONDS) // Mỗi 5 giây
}
