import WordCollection from '../models/wordCollectionModel.js'
import Word from '../models/wordModel.js'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

// @desc Fetch all collections
// @route GET /wordcollection
// @access Private (admin)
const getCollections = asyncHandler(async (req, res) => {
  WordCollection.find({})
    .populate('userId', 'username') // a few specific fields returned for the populated documents
    .populate('words')
    .exec(function (err, wordcollection) {
      if (err) return handleError(err)
      res.json(wordcollection)
    })
})

// @desc Fetch specific user's collections
// @route GET /wordcollection/user
// @access Private
const getUserCollections = asyncHandler(async (req, res) => {
  WordCollection.find({ userId: req.user._id })
    .populate('userId', 'username') // a few specific fields returned for the populated documents
    .populate('words')
    .exec(function (err, wordcollection) {
      if (err) return handleError(err)
      res.json(wordcollection)
    })
})

// @desc Create a new word collection
// @route POST /wordcollection/create
// @access Private
const createCollection = asyncHandler(async (req, res) => {
  const { collectionName } = req.body

  const newCollection = new WordCollection({
    name: collectionName,
    userId: req.user._id,
  })
  const newCollectionSaved = await newCollection.save()
  res.json(newCollectionSaved)
})

// @desc Add a new word to an exist collection
// @route PUT /wordcollection/add/:collectionId
// @access Private
const addNewWordToCollection = asyncHandler(async (req, res) => {
  const { collectionId } = req.params
  const { wordName, meaning } = req.body
  const existWord = await Word.findOne({ name: wordName })
  const collection = await WordCollection.find({ _id: collectionId })
  const { words } = collection[0]
  let word

  if (!existWord) {
    word = new Word({
      name: wordName,
      meaning: meaning,
    })
    await word.save()
  }
  const updatedCollection = await WordCollection.findByIdAndUpdate(
    collectionId,
    { words: [...words, existWord ? existWord._id : word._id] },
    { new: true }
  )
  res.json(updatedCollection)
})

// @desc Delete a specific word collection
// @route Delete /wordcollection/delete/collection/:collectionId
// @access Private
const deleteCollection = asyncHandler(async (req, res) => {
  const { collectionId } = req.params
  let collection = await WordCollection.findByIdAndDelete(collectionId)
  res.json({ message: 'Collection was deleted', data: collection })
})

export {
  getCollections,
  createCollection,
  getUserCollections,
  addNewWordToCollection,
  deleteCollection,
}
