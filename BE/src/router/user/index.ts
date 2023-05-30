import express from 'express'

import UserControllers from '../../controllers/user/user'
import { verifyUser } from '../middlewares'
const router = express.Router()
const userControllers = new UserControllers()

router.post('/auth/register', userControllers.upload, userControllers.create)
router.post('/auth/login', userControllers.upload, userControllers.login)
router.get('/profile', verifyUser, userControllers.getProfile)
router.post('/checkwasbuy', verifyUser, userControllers.upload, userControllers.checkWasBuy)
router.put('/update', verifyUser, userControllers.upload, userControllers.updateProfile)
router.delete('/delete', verifyUser, userControllers.upload, userControllers.deleteProfile)
router.post('/likeproduct', verifyUser, userControllers.upload, userControllers.createLikeProduct)
// router.delete('/likeproduct/:id', verifyUser, userControllers.upload, userControllers.deleteLikeProduct)
router.post('/createorder', verifyUser, userControllers.upload, userControllers.createOrder)
export default router
