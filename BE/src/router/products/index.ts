import express, { Request, Response } from 'express'

import ProductsControllers from '../../controllers/products/products'
import { verifyAdmin } from '../middlewares'

const router = express.Router()
const productsControllers = new ProductsControllers()

router.get('/', productsControllers.getProducts)
router.post('/create', verifyAdmin, productsControllers.upload, productsControllers.create)
router.put('/update/:id', verifyAdmin, productsControllers.upload, productsControllers.update)
router.delete('/delete/:id', verifyAdmin, productsControllers.delete)
export default router
