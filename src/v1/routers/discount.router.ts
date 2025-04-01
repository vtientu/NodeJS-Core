import { authentication } from '@auth/authMiddleware.js'
import DiscountController from '@controllers/discount.controller.js'
import { Router } from 'express'
const discountRouter = Router()

discountRouter.post('/amount', DiscountController.getDiscountAmount)
discountRouter.get('/list_products_code', DiscountController.getAllDiscountCodesByShop)

discountRouter.use(authentication)

discountRouter.post('/create', DiscountController.createDiscountCode)
discountRouter.delete('/cancel', DiscountController.cancelDiscountCode)

export default discountRouter
