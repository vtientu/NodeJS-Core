import ProductController from '@controllers/product.controller.js'
import asyncHandler from '@helpers/asyncHandler.js'
import { Router } from 'express'

const productRouter = Router()

productRouter.post('/create', asyncHandler(ProductController.createProduct))

export default productRouter
