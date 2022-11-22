import Word from '../models/wordModel.js'
import asyncHandler from 'express-async-handler'

// @desc Fetch all words
// @route GET /api/words
// @access Public
const getWords = asyncHandler(async (req, res) => {
  const words = await Word.find({})

  if (!words.length > 0) {
    res.status(404)
    throw new Error('Word not found')
  }
  res.send(words)
})

// @desc Fetch single word
// @route GET /api/words/:id
// @access Public
const getWord = asyncHandler(async (req, res) => {
  const word = await Word.findById(req.params.id)

  if (!word) {
    res.status(404)
    throw new Error('Word not found')
  }
  res.send(word)
})

// @desc Create a word
// @route POST /api/words
// @access Public
const createWord = asyncHandler(async (req, res) => {
  const { name, meaning } = req.body

  if (!name && !meaning) {
    res.status(404)
    throw new Error('Write a valid name')
  }

  const word = new Word({
    name: name,
    meaning: meaning,
  })

  const createdWord = await word.save()
  res.status(201).json(createdWord)
})

// @desc Update a word
// @route PUT /api/words/:id
// @access Public
const updateWord = asyncHandler(async (req, res) => {
  const { name, meaning } = req.body

  const word = await Word.findById(req.params.id)

  if (!word) {
    res.status(404)
    throw new Error('Word not found')
  }

  word.name = name
  word.meaning = meaning

  const updatedWord = await word.save()
  res.json(updatedWord)
})

// @desc Detele a word
// @route Delete /api/words/:id
// @access Public
const deleteWord = asyncHandler(async (req, res) => {
  const word = await Word.findById(req.params.id)

  if (!word) {
    res.status(404)
    throw new Error('Word not found')
  }

  await word.remove()
  res.json({ message: ` '${word.name}' removed ` })
})

export { getWords, getWord, updateWord, createWord, deleteWord }
