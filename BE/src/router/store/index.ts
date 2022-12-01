import express from 'express'

import StoreControllers from '../../controllers/store/store'
import { verifyAdmin } from '../middlewares'
const router = express.Router()
const storeControllers = new StoreControllers()

router.get('/', storeControllers.getAll)
router.post('/create', verifyAdmin, storeControllers.upload, storeControllers.create)
router.get('/:id', storeControllers.getStore)
router.put('/update/:id', verifyAdmin, storeControllers.upload, storeControllers.update)
router.delete('/delete/:id', verifyAdmin, storeControllers.delete)
export default router
