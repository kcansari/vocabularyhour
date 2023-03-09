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

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
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
    const url = `${process.env.BASE_URL}verify/${user.id}/${mailtoken.token}`
    let resMail = await sendEmail(user.email, 'Verify Email', url)
    if (resMail) {
      await user.remove()
      res.status(400)
      throw new Error(resMail)
    }
    res.status(201).send({
      username: username,
      message: 'An email sent to your account please verify.',
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password')

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  res.json(user)
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

// @desc Update user password
// @route PUT /api/users/reset-password/:mailtoken
// @access Private
const changeUserPassword = asyncHandler(async (req, res) => {
  const tokenModel = await MailToken.findOne({ token: req.params.mailtoken })
  const user = await User.findById(tokenModel.user)
  if (!tokenModel) {
    res.status(404)
    throw new Error('Invalid token')
  }
  if (user) {
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()
    res.json({
      email: updatedUser.email,
      password: updatedUser.password,
      message: 'Your password has been changed successfully',
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

export {
  authUser,
  getUserProfile,
  registerUser,
  getUsers,
  deleteUser,
  updateUserProfile,
  getUserById,
  updateUser,
  changeUserPassword,
}
