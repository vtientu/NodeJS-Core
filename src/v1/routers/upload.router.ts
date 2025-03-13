import uploadController from '@/v1/controllers/upload.controller.js'
import { Router } from 'express'
const uploadRouter = Router()

uploadRouter.get('/avatar', uploadController.uploadAvatar)
