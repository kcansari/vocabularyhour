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

// @desc Create a word collection
// @route POST /wordcollection/create
// @access Private
const createCollection = asyncHandler(async (req, res) => {
  const { collectionName, wordName, meaning } = req.body
  const existWord = await Word.findOne({ name: wordName })

  if (!wordName && !meaning) {
    res.status(404)
    throw new Error('Write a valid word')
  }

  if (existWord) {
    const newCollection = new WordCollection({
      name: collectionName,
      userId: req.user._id,
      words: [existWord._id],
    })

    const newCollectionSaved = await newCollection.save()

    res.json(newCollectionSaved)
  } else {
    const word = new Word({
      name: wordName,
      meaning: meaning,
    })
    await word.save()

    const newCollection = new WordCollection({
      name: collectionName,
      userId: req.user._id,
      words: word._id,
    })

    await newCollection.save()

    res.json(newCollection)
  }
})

export { getCollections, createCollection }
