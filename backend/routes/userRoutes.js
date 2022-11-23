import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  authUser,
  getUserProfile,
  registerUser,
  getUsers,
  deleteUser,
} from '../controllers/userController.js'

const router = express.Router()

router.post('/login', authUser)
router.route('/').post(registerUser).get(protect, admin, getUsers)
router.route('/:id').delete(protect, admin, deleteUser)
router.route('/profile').get(protect, getUserProfile)

export default router
