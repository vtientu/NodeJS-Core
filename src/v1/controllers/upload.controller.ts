import uploadService from '@/v1/services/upload.service.js'
import { NextFunction, Request, Response } from 'express'

const uploadController = {
  uploadAvatar: async (req: Request, res: Response, next: NextFunction) => {
    await uploadService.uploadAvatar(req, res, next)
  }
}

export default uploadController
