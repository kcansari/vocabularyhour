import express from 'express'
import Word from '../models/wordModel.js'
import asyncHandler from 'express-async-handler'

const router = express.Router()

// @desc Fetch all words
// @route GET /api/words
// @access Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const words = await Word.find({})

    if (words.length > 0) {
      res.send(words)
    } else {
      res.status(404)
      throw new Error('Word not found')
    }
  })
)

// @desc Fetch single word
// @route GET /api/words/:id
// @access Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const word = await Word.findById(req.params.id)

    if (word) {
      res.send(word)
    } else {
      res.status(404)
      throw new Error('Word not found')
    }
  })
)

export default router
