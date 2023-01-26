import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

// @desc Fetch all words which beleng to users
// @route GET /api/words
// @access Private (Admin)
const getAllUsersWords = asyncHandler(async (req, res) => {
  // selecting the `username` and `Words` fields
  const users = await User.find({}).select('username Words')
  res.send(users)
})

// @desc Fetch specific user's words
// @route GET /api/words/user
// @access Private
const getWords = asyncHandler(async (req, res) => {
  const { username, Words } = req.user

  res.json({ username: username, Words: Words })
})

// @desc Add a new word to an exist list
// @route POST /api/words
// @access Private
const addWord = asyncHandler(async (req, res) => {
  const { name, meaning } = req.body
  const { _id, Words } = req.user

  if (!name && !meaning) {
    res.status(404)
    throw new Error('Write a valid name')
  }

  Words.set(name, meaning)

  const updatedWordList = await User.findByIdAndUpdate(
    _id,
    { Words: Words },
    { new: true }
  )

  res.status(201).json(updatedWordList)
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

export { getAllUsersWords, getWords, updateWord, addWord, deleteWord }
