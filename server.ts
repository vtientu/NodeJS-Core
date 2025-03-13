import logger from '@/v1/utils/logger.js'
import 'dotenv/config'
import database from '@/v1/database/database.js'
import app from '@/app.js'

const PORT = process.env.PORT_SERVER || 3000

logger.error(`🔥 Lỗi server: `)
logger.info(`🔥 Logger server: `)
//Connect DB
database.connectDB()

const server = app.listen(PORT, () => {
  logger.info(`🚀 Server đang chạy tại http://localhost:${PORT}`)
})

server.on('error', (err: any) => {
  if ((err as any).code === 'EADDRINUSE') {
    logger.error(`Cổng ${PORT} đã bị chiếm!`)
  } else {
    logger.error(`🔥 Lỗi server: ${JSON.stringify(err, null, 2)}`)
  }

  process.on('beforeExit', () => {
    process.exit(1)
  })
})
