import express, { Request, Response } from 'express'

import ProductsControllers from '../../controllers/products/products'

const router = express.Router()
const productsControllers = new ProductsControllers()

router.get('/', productsControllers.getProducts)
router.post('/create', productsControllers.upload, productsControllers.create)
router.put('/update/:id', productsControllers.upload, productsControllers.update)
router.delete('/delete/:id', productsControllers.delete)
export default router
