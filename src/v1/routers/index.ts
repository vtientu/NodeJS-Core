import { authentication } from '@auth/authMiddleware.js'
import ProductController from '@controllers/product.controller.js'
import asyncHandler from '@helpers/asyncHandler.js'
import authRouter from '@routers/auth.router.js'
import discountRouter from '@routers/discount.router.js'
import productRouter from '@routers/product.router.js'
import uploadRouter from '@routers/upload.router.js'
import { Router } from 'express'
const router = Router()

router.use('/auth', authRouter)
router.use('/product/list', asyncHandler(ProductController.getProductBySearchKey))
router.use('/discount', discountRouter)
router.use(authentication)
router.use('/uploads', uploadRouter)
router.use('/product', productRouter)

export default router
