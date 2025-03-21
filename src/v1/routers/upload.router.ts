import uploadController from '@controllers/upload.controller.js'
import asyncHandler from '@helpers/asyncHandler.js'
import { singleUploadImage } from '@middleware/upload.js'
import { Router } from 'express'

const uploadRouter = Router()

uploadRouter.post('/avatar', singleUploadImage, asyncHandler(uploadController.uploadAvatar))

export default uploadRouter
