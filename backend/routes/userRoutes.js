import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  authUser,
  getUserProfile,
  registerUser,
  getUsers,
  deleteUser,
  updateUserProfile,
  getUserById,
  updateUser,
  verifyUser,
  resendVerifyLink,
} from '../controllers/userController.js'

const router = express.Router()

router.post('/login', authUser)
router.route('/').post(registerUser).get(protect, admin, getUsers)

router.route('/resend/:id').get(protect, resendVerifyLink)

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

router.route('/:id/verify/:token').get(verifyUser)

export default router
