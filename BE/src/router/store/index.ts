import express from 'express'

import StoreControllers from '../../controllers/store/store'

const router = express.Router()
const storeControllers = new StoreControllers()

router.get('/', storeControllers.getAll)
router.post('/create', storeControllers.upload, storeControllers.create)

export default router
