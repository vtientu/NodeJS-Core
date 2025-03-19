import accessRouter from '@routers/access/index.js'
import uploadRouter from '@routers/upload.router.js'
import { Router } from 'express'
const router = Router()

router.use('/uploads', uploadRouter)
router.use('/access', accessRouter)

export default router
