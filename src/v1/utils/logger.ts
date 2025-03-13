import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'HH:mm:ss DD-MM-YYYY'
  }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`
  })
)

const logger = winston.createLogger({
  level: 'debug',
  format: logFormat,
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      level: 'info',
      filename: 'src/v1/logs/info/%DATE%.log',
      datePattern: 'DD-MM-YYYY',
      maxFiles: '14d',
      zippedArchive: true
    }),
    new DailyRotateFile({
      level: 'error',
      filename: 'src/v1/logs/error/%DATE%.log',
      datePattern: 'DD-MM-YYYY',
      maxFiles: '14d',
      zippedArchive: true
    })
  ]
})

logger.on('error', (err) => {
  console.error('Lỗi ghi log:', err)
})

export default logger
