import express, { Request, Response } from 'express'

import ProductsControllers from '../../controllers/products/products'
import { verifyAdmin, verifyUser } from '../middlewares'

const router = express.Router()
const productsControllers = new ProductsControllers()

// router.post('/updateField', productsControllers.addNewField)

router.get('/', productsControllers.getProducts)
router.get('/:category', productsControllers.getProducts)
router.get('/product/:idproduct', productsControllers.getProducts)
router.get('/:category/:idproduct', productsControllers.getProducts)
router.post('/create', verifyAdmin, productsControllers.upload, productsControllers.create)
router.post('/review', verifyUser, productsControllers.upload, productsControllers.review)
router.put('/update/:id', verifyAdmin, productsControllers.upload, productsControllers.updateInforProduct)
router.delete('/delete/:id', verifyAdmin, productsControllers.delete)
router.put('/updateCoupon/:id', verifyAdmin, productsControllers.uploadFile, productsControllers.UpdateCouponProduct)
export default router
