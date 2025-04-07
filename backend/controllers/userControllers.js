import asyncHandler from '../middlewares/asyncHandler.js'
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import createToken from '../utils/createToken.js'
export const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    res.status(400)
    throw new Error('Please fill in all fields')
  }
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const user = await User.create({
    username,
    email,
    password: hashedPassword
  })
  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  if (users) {
    res.status(200).json(users)
  } else {
    res.status(404)
    throw new Error('No users found')
  }
})
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error('Please fill in all fields')
  }
  const userExists = await User.findOne({ email })
  if (userExists) {
    const isMatch = await bcrypt.compare(password, userExists.password)
    if (isMatch) {
      createToken(res, userExists._id)
      res.status(200).json({
        _id: userExists._id,
        username: userExists.username,
        email: userExists.email,
        isAdmin: userExists.isAdmin
      })
    }
  } else {
    res.status(400)
    throw new Error('Invalid email or password')
  }
})
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  })
  res.status(200).json({ message: 'Logged out successfully' })
})
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.user._id })
  if (user) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.user._id })
  const { username, email, password } = req.body
  if (user) {
    user.username = username || user.username
    user.email = email || user.email
    if (password) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      user.password = hashedPassword
    }
    const updatedUser = await user.save()
    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
  if (user) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    throw new Error('User not found')
  }
})
export const updateUserById = asyncHandler(async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
  const { username, email, password } = req.body

  if (user) {
    user.username = username || user.username
    user.email = email || user.email
    if (password) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      user.password = hashedPassword
    }
    const updatedUser = await user.save()
    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    })
  } else {
    throw new Error('User not found')
  }
})
export const deleteUserById = asyncHandler(async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
  if (user) {
    await user.remove()
    res.status(200).json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
