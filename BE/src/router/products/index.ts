import express from 'express'

import ProductsControllers from '../../controllers/products/products'

const router = express.Router()
const productsControllers = new ProductsControllers()

router.get('/', productsControllers.getAllProducts)
router.get('/:nameProduct', productsControllers.getProduct)

export default router
