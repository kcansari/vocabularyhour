import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  verifyUser,
  resendVerifyLink,
  sendForgotPasswordLink,
} from '../controllers/verifyController.js'

const router = express.Router()
router.route('/forgotpassword/:email').get(sendForgotPasswordLink)
router.route('/resend/:id').get(protect, resendVerifyLink)
router.route('/:id/:token').get(verifyUser)

export default router
