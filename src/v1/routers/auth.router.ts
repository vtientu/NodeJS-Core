import { authentication } from '@auth/authMiddleware.js'
import AccessController from '@controllers/access.controller.js'
import asyncHandler from '@helpers/asyncHandler.js'
import { Router } from 'express'
const authRouter = Router()

authRouter.post('/signup', asyncHandler(AccessController.signUp))
authRouter.post('/login', asyncHandler(AccessController.login))

/** --------Authentication--------- */
authRouter.use(authentication)

authRouter.post('/logout', asyncHandler(AccessController.logout))
authRouter.post('/refresh', asyncHandler(AccessController.refreshToken))

export default authRouter
