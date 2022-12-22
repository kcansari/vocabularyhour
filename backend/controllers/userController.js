import User from '../models/userModel.js'
import MailToken from '../models/tokenModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import sendEmail from '../utils/sendEmail.js'

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user.verified) {
    let token = await MailToken.findOne({ user: user._id })
    if (!token) {
      await MailToken.create({
        user: user._id,
        token: generateToken(user._id),
      }).save()

      const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`
      await sendEmail(user.email, 'Verify Email', url)
    }
    return res
      .status(400)
      .send({ message: 'An email sent to your account please verify.' })
  }

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      verified: user.verified,
      token: generateToken(user._id),
    })
  } else if (user && !(await user.matchPassword(password))) {
    res.status(401)
    throw new Error('Invalid password')
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
  //   res.send({ email, password })
})

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists, please change your email address')
  }

  const user = await User.create({
    username,
    email,
    password,
    verified: false,
  })

  const mailtoken = await MailToken.create({
    user: user._id,
    token: generateToken(user._id),
  })

  if (user && mailtoken) {
    const url = `${process.env.BASE_URL}api/users/${user.id}/verify/${mailtoken.token}`
    let resMail = await sendEmail(user.email, 'Verify Email', url)
    if (resMail) {
      await user.remove()
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

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  })
})

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password')
  res.json(users)
})

// @desc Delete user
// @route Delete /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    await user.remove()
    res.json({ message: `${user.username} removed` })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  res.json(user)
})

// @desc Update user
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = Boolean(req.body.isAdmin)

    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc Verify user
// @route GET /api/users/:id/verify/:token
// @access Private/User
const verifyUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id })

  if (!user) {
    //400 Bad Reques
    res.status(400).send({ message: 'Invalid link' })
  }
  const token = await MailToken.findOne({
    user: user.id,
    token: req.params.token,
  })

  if (!token) {
    //400 Bad Reques
    res.status(400).send({ message: 'Invalid link' })
  }
  await User.updateOne({ _id: user._id }, { $set: { verified: true } })
  await token.remove()

  res.status(200).send({ message: 'Email verified successfully' })
})

export {
  authUser,
  getUserProfile,
  registerUser,
  getUsers,
  deleteUser,
  updateUserProfile,
  getUserById,
  updateUser,
  verifyUser,
}
