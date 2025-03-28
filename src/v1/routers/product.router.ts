import ProductController from '@controllers/product.controller.js'
import asyncHandler from '@helpers/asyncHandler.js'
import { Router } from 'express'

const productRouter = Router()

productRouter.post('/create', asyncHandler(ProductController.createProduct))
productRouter.patch('/:id', asyncHandler(ProductController.updateProduct))
productRouter.put('/publish/:id', asyncHandler(ProductController.publishProductDraft))
productRouter.put('/unpublish/:id', asyncHandler(ProductController.unPublishProductDraft))

// QUERY //
productRouter.get('/drafts/all', asyncHandler(ProductController.getAllDraftsForShop))
productRouter.get('/published/all', asyncHandler(ProductController.getAllPublishForShop))
productRouter.get('/all', asyncHandler(ProductController.getAllProducts))
productRouter.get('/:id', asyncHandler(ProductController.getProductDetails))

export default productRouter
