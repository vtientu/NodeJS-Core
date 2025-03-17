import { Router } from 'express'
import { singleUploadImage } from '@/v1/middleware/upload.js'
import uploadController from '@/v1/controllers/upload.controller.js'
import { asyncHandler } from '@/v1/middleware/errorHandler.js'

const uploadRouter = Router()

uploadRouter.post('/avatar', singleUploadImage, asyncHandler(uploadController.uploadAvatar))

export default uploadRouter
