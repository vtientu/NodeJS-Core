import { authentication } from '@auth/authMiddleware.js'
import accessController from '@controllers/access.controller.js'
import asyncHandler from '@helpers/asyncHandler.js'
import { Router } from 'express'
const authRouter = Router()

authRouter.post('/signup', asyncHandler(accessController.signUp))
authRouter.post('/login', asyncHandler(accessController.login))

/** --------Authentication--------- */
authRouter.use(authentication)

authRouter.post('/logout', asyncHandler(accessController.logout))

export default authRouter
