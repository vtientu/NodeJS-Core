import uploadService from '@/v1/services/upload.service.js'
import { NextFunction, Request, Response } from 'express'

class UploadController {
  uploadAvatar = async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file
    const response = await uploadService.uploadAvatar(file)
    res.status(200).json(response)
  }
}

export default new UploadController()
