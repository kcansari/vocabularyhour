import User from '../models/userModel.js'
import MailToken from '../models/tokenModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import sendEmail from '../utils/sendEmail.js'

// @desc Verify user
// @route GET /verify/:id/:token
// @access Private/User
const verifyUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id })

  if (!user) {
    //400 Bad Reques
    res.status(400).send({ message: 'Invalid User id' })
  }
  const token = await MailToken.findOne({
    user: user.id,
    token: req.params.token,
  })

  if (!token) {
    //400 Bad Reques
    res.status(400).send({ message: 'Invalid Token' })
  }
  await User.updateOne({ _id: user._id }, { $set: { verified: true } })
  await token.remove()

  res.status(200).send({ message: 'Email verified successfully' })
})

// @desc Get resend user verify link
// @route GET /verify/resend/:id
// @access Private
const resendVerifyLink = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id })
  const token = await MailToken.findOne({ user: req.params.id })

  // remove the previous token to send new token
  if (token) {
    await token.remove()
  }

  const mailtoken = await MailToken.create({
    user: user._id,
    token: generateToken(user._id),
  })

  if (user && mailtoken) {
    const url = `${process.env.BASE_URL}verify/${user.id}/${mailtoken.token}`
    let resMail = await sendEmail(user.email, 'Verify Email', url)
    if (resMail) {
      // this shows to us there is an error so transmit the error client side
      res.status(400)
      throw new Error(resMail)
    }
    res
      .status(201)
      .send({ message: 'An email sent to your account please verify.' })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc GET send forgot password link
// @route GET /verify/forgotpassword/:email
// @access Public
const sendForgotPasswordLink = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.params.email }).select(
    '-password -isAdmin -createdAt -updatedAt -__v'
  )

  if (!user) {
    res.status(201).send({ message: 'This email address is not found' })
  }

  const { _id, email, verified } = user

  if (!verified) {
    res.status(201).send({ message: 'Please verify your account' })
  }

  // After all controls, link will be send to user.
  // if there is a token which belongs to user, will be delete to clear db.
  const token = await MailToken.findOne({ user: _id })

  if (token) {
    await token.remove()
  }

  // create new token to send forgot password link.
  const mailtoken = await MailToken.create({
    user: user._id,
    token: generateToken(user._id),
  })

  if (user && mailtoken) {
    const url = `${process.env.BASE_URL}verify/forgotpassword/${mailtoken.token}`
    let resMail = await sendEmail(email, 'Reset your password', url)
    if (resMail) {
      // this shows to us there is an error so transmit the error client side
      res.status(400)
      throw new Error(resMail)
    }
    res.status(201).send({ message: `An email sent to reset your password ` })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

export { verifyUser, resendVerifyLink, sendForgotPasswordLink }
