import uploadRouter from '@/v1/routers/upload.router.js'
import { Router } from 'express'
const router = Router()

router.use('/uploads', uploadRouter)

export default router
