import express from 'express'

import products from './products'
import store from './store'

const router = express.Router()

router.use('/products', products)
router.use('/store', store)

export default router
