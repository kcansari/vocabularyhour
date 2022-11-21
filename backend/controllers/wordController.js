import Word from '../models/wordModel.js'
import asyncHandler from 'express-async-handler'

// @desc Fetch all words
// @route GET /api/words
// @access Public
const getWords = asyncHandler(async (req, res) => {
  const words = await Word.find({})

  if (words.length > 0) {
    res.send(words)
  } else {
    res.status(404)
    throw new Error('Word not found')
  }
})

// @desc Fetch single word
// @route GET /api/words/:id
// @access Public
const getWord = asyncHandler(async (req, res) => {
  const word = await Word.findById(req.params.id)

  if (word) {
    res.send(word)
  } else {
    res.status(404)
    throw new Error('Word not found')
  }
})

// @desc Create a word
// @route POST /api/words
// @access Public
const createWord = asyncHandler(async (req, res) => {
  const { name } = req.body

  if (name) {
    const word = new Word({
      name: name,
    })

    const createdWord = await word.save()
    res.status(201).json(createdWord)
  } else {
    res.status(404)
    throw new Error('Write a valid name')
  }
})

// @desc Update a word
// @route PUT /api/words/:id
// @access Public
const updateWord = asyncHandler(async (req, res) => {
  const { name } = req.body

  const word = await Word.findById(req.params.id)

  if (word) {
    word.name = name

    const updatedWord = await word.save()
    res.json(updatedWord)
  } else {
    res.status(404)
    throw new Error('Word not found')
  }
})

// @desc Detele a word
// @route Delete /api/words/:id
// @access Public
const deleteWord = asyncHandler(async (req, res) => {
  const word = await Word.findById(req.params.id)

  if (word) {
    await word.remove()
    res.json({ message: ` '${word.name}' removed ` })
  } else {
    res.status(404)
    throw new Error('Word not found')
  }
})

export { getWords, getWord, updateWord, createWord, deleteWord }
