import uploadController from '@/v1/controllers/upload.controller.js'
import { singleUploadImage } from '@/v1/middleware/upload.js'
import { Router } from 'express'
const uploadRouter = Router()

uploadRouter.post('/avatar', singleUploadImage, uploadController.uploadAvatar)

export default uploadRouter
