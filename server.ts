import logger from '@/v1/utils/logger.js'
import database from '@/v1/database/database.js'
import app from '@/app.js'
import 'dotenv/config'

const PORT = process.env.PORT_SERVER || 3000

database.connectDB()

const server = app.listen(PORT, () => {
  logger.info(`🚀 Server đang chạy tại http://localhost:${PORT}`)
})

server.on('error', (err: any) => {
  if (err.code === 'EADDRINUSE') {
    logger.error(`Cổng ${PORT} đã bị chiếm!`)
  } else {
    logger.error(`🔥 Lỗi server: ${JSON.stringify(err, null, 2)}`)
  }

  process.on('beforeExit', () => {
    process.exit(1)
  })
})
