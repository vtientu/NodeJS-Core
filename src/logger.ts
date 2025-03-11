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
  level: 'info',
  format: logFormat,
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: './log/app-%DATE%.log',
      datePattern: 'DD-MM-YYYY',
      maxFiles: '14d',
      zippedArchive: true
    })
  ]
})

logger.add(
  new winston.transports.Console({
    format: winston.format.simple()
  })
)

export default logger
