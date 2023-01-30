import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  getAllUsersWords,
  getWords,
  addWord,
  deleteUserWord,
} from '../controllers/wordController.js'

const router = express.Router()

router.route('/').get(protect, admin, getAllUsersWords).post(protect, addWord)
router.route('/user').get(protect, getWords).delete(protect, deleteUserWord)

export default router
