import cloudinary from 'configs/cloudinary.config.js'
import { NextFunction, Request, Response } from 'express'

const uploadService = {
  uploadAvatar: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.file?.buffer) {
        cloudinary.uploader
          .upload_stream(
            {
              folder: 'avatar'
            },
            (err, result) => {
              if (err) {
                return next(err)
              }
              res.status(200).json(result)
            }
          )
          .end(req.file.buffer)
      }
    } catch (error) {
      next(error)
    }
  }
}

export default uploadService
