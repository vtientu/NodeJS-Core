import { ErrorResponse, NotFoundError } from '@core/error.response.js'
import logger from '@utils/logger.js'
import { Request, Response, NextFunction } from 'express'

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError())
}

export const globalErrorHandler = (err: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
  logger.error(err?.message)
  res.status(err?.status || 500).json({
    message: err?.message || 'Internal Server Error'
  })
}
