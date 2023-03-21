import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  getAllUsersWords,
  getWords,
  addWord,
  deleteUserWord,
  updateWord,
} from '../controllers/wordController.js'

const router = express.Router()

router
  .route('/')
  .get(protect, admin, getAllUsersWords)
  .post(protect, addWord)
  .delete(protect, deleteUserWord)
  .put(protect, updateWord)

router.route('/user').get(protect, getWords)

export default router
