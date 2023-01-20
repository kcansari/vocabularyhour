import express from 'express'
import {
  getCollections,
  createCollection,
  getUserCollections,
  addNewWordToCollection,
  deleteCollection,
} from '../controllers/wordCollectionController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(protect, admin, getCollections)
router.route('/create').post(protect, createCollection)
router.route('/user').get(protect, getUserCollections)
router.route('/add/:collectionId').put(protect, addNewWordToCollection)
router
  .route('/delete/collection/:collectionId')
  .delete(protect, deleteCollection)

export default router
