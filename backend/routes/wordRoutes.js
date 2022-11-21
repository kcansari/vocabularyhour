import express from 'express'
import {
  getWords,
  getWord,
  updateWord,
  createWord,
  deleteWord,
} from '../controllers/wordController.js'

const router = express.Router()

router.route('/').get(getWords).post(createWord)
router.route('/:id').get(getWord).put(updateWord).delete(deleteWord)

export default router
