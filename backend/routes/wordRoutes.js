import express from 'express'
import {
  getWords,
  getWordById,
  updateWord,
  createWord,
  deleteWord,
} from '../controllers/wordController.js'

const router = express.Router()

router.route('/').get(getWords).post(createWord)
router.route('/:id').get(getWordById).put(updateWord).delete(deleteWord)

export default router
