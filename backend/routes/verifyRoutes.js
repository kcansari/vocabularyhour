import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  verifyUser,
  resendVerifyLink,
} from '../controllers/verifyController.js'

const router = express.Router()

router.route('/resend/:id').get(protect, resendVerifyLink)
router.route('/:id/:token').get(verifyUser)

export default router
