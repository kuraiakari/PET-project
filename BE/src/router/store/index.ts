import express from 'express'

import StoreControllers from '../../controllers/store/store'

const router = express.Router()
const storeControllers = new StoreControllers()

router.get('/', storeControllers.getAll)
router.post('/create', storeControllers.upload, storeControllers.create)
router.get('/:id', storeControllers.getStore)
router.put('/update/:id', storeControllers.upload, storeControllers.update)
router.delete('/delete/:id', storeControllers.delete)
export default router
