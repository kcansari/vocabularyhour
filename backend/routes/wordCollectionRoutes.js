import express from 'express'
import {
  getCollections,
  createCollection,
} from '../controllers/wordCollectionController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(protect, admin, getCollections)
router.route('/create').post(protect, createCollection)

export default router
