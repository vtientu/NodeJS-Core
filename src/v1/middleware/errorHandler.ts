import logger from '@/v1/utils/logger.js'
import { Request, Response, NextFunction } from 'express'
import multer from 'multer'

export const handleUploadError = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(400).json({ message: 'File quá lớn, tối đa 5MB!' })
    }
    logger.error('Lỗi upload file: ' + err.message)
    res.status(400).json({ message: 'Lỗi upload file: ' + err.message })
  } else if (err) {
    logger.error(err.message)
    res.status(400).json({ message: err.message })
  }
  next()
}
