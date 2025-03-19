import accessController from '@controllers/access.controller.js'
import { asyncHandler } from '@middleware/errorHandler.js'
import { Router } from 'express'
const accessRouter = Router()

accessRouter.post('/signup', asyncHandler(accessController.signUp))

export default accessRouter
