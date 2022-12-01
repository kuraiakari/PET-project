import express from 'express'

import products from './products'
import store from './store'
import user from './user'

const router = express.Router()

router.use('/products', products)
router.use('/store', store)
router.use('/user', user)

export default router
