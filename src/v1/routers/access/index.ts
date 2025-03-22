import { authentication } from '@auth/authMiddleware.js'
import accessController from '@controllers/access.controller.js'
import asyncHandler from '@helpers/asyncHandler.js'
import { Router } from 'express'
const accessRouter = Router()

accessRouter.post('/signup', asyncHandler(accessController.signUp))
accessRouter.post('/login', asyncHandler(accessController.login))

/** --------Authentication--------- */
accessRouter.use(authentication)

accessRouter.post('/logout', asyncHandler(accessController.logout))

export default accessRouter
