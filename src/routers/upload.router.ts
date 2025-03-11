import uploadController from '@/controllers/upload.controller.js'
import { Router } from 'express'
const uploadRouter = Router()

uploadRouter.get('/avatar', uploadController.uploadAvatar)
