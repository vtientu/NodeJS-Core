import { BadRequestError } from '@/v1/core/error.response.js'
import cloudinary from 'configs/cloudinary.config.js'
import { NextFunction, Request, Response } from 'express'

const uploadService = {
  uploadAvatar: async (file?: Express.Multer.File) => {
    try {
      if (file?.buffer) {
        // Phải tạo new Promise ở đây để xử lý bất động bộ vì func upload_stream của cloudinary là callback không phải promise
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream({ folder: 'avatars' }, (err, result) => {
            if (err) reject(new Error(err.message))
            else resolve(result)
          })

          stream.end(file.buffer)
        })

        return result
      } else {
        return new BadRequestError('No file uploaded!')
      }
    } catch (error: any) {
      return new Error(error?.message)
    }
  }
}

export default uploadService
