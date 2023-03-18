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

  if (!name || !meaning) {
    res.status(404)
    throw new Error('Write a valid name')
  }

  if (Words.has(name)) {
    res.status(404)
    throw new Error('You cannot add the same word multiple times')
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
// @route PUT /api/words
// @access Private
const updateWord = asyncHandler(async (req, res) => {
  const { name, meaning, currentName } = req.body
  const { _id, Words } = req.user

  if (!name || !meaning) {
    res.status(404)
    throw new Error('Fill all parameters')
  }
  if (currentName !== name) {
    Words.delete(currentName)
  }
  Words.set(name, meaning)

  const updatedWordList = await User.findByIdAndUpdate(
    _id,
    { Words: Words },
    { new: true }
  )

  res.json({ message: 'success', data: updatedWordList })
})

// @desc Detele a word
// @route Delete /api/words
// @access Private
const deleteUserWord = asyncHandler(async (req, res) => {
  const { word } = req.body
  let { Words } = req.user

  if (!word) {
    res.status(404)
    throw new Error('Word not found')
  }

  // delete the word which has been typed as a parameter.
  Words.delete(word)

  if (Words.has(`${word}`) !== false) {
    res.status(404)
    throw new Error('Word could not delete')
  }
  await req.user.save()
  res.status(200).json({ message: 'Word was deleted', data: Words })
})

export { getAllUsersWords, getWords, updateWord, addWord, deleteUserWord }
