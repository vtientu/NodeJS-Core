import authRouter from '@routers/auth.router.js'
import uploadRouter from '@routers/upload.router.js'
import { Router } from 'express'
const router = Router()

router.use('/uploads', uploadRouter)
router.use('/auth', authRouter)

export default router
