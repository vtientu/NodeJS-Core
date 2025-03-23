import authRouter from '@routers/auth.router.js'
import productRouter from '@routers/product.router.js'
import uploadRouter from '@routers/upload.router.js'
import { Router } from 'express'
const router = Router()

router.use('/uploads', uploadRouter)
router.use('/auth', authRouter)
router.use('/product', productRouter)

export default router
