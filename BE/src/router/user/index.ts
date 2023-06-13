import express from 'express'

import UserControllers from '../../controllers/user/user'
import { verifyUser, verifyNewToken } from '../middlewares'
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

router.get('/getNotifications', verifyUser, userControllers.getNotification)
router.put('/updateNotification', verifyUser, userControllers.updateNotification)
router.put('/updateAllNotifications', verifyUser, userControllers.updateAllNotification)

// router.get('/updateAll', userControllers.updateAll)
router.post('/autoLogin', verifyNewToken, userControllers.upload, userControllers.autologin)
export default router
