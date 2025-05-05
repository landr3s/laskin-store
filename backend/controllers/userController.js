import asyncHandler from '../middlewares/asyncHandler.js'
import User from '../models/userModel.js'
import createToken from '../utils/createToken.js'
import bcrypt from 'bcrypt'

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  if (users) {
    res.status(200).json(users)
  } else {
    res.status(400)
    throw new Error('Users not found')
  }
})
export const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    res.status(400)
    throw new Error('Fill all fields')
  }
  const existingUser = await User.findOne({ email })
  if (!existingUser) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    })
    await user.save()
    createToken(res, user._id)
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(400)
    throw new Error('User already exists')
  }
})
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error('Fill all fields')
  }
  const user = await User.findOne({ email })
  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (passwordMatch) {
      createToken(res, user._id)
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
      })
    } else {
      res.status(400)
      throw new Error('Invalid credentials')
    }
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
  return
})
export const logout = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    expires: new Date(0),
    httpOnly: true
  })
  res.status(200).json({ message: 'Logout successfully' })
})

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(400)
    throw new Error('User not found')
  }
})
export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    const { username, email, password } = req.body
    user.username = username || user.username
    user.email = email || user.email
    if (password) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = bcrypt.hash(password, salt)
      user.password = hashedPassword
    }
    await user.save()
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(400)
    throw new Error('User not found')
  }
})
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(400)
    throw new Error('User not found')
  }
})
export const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    await User.findByIdAndDelete(user._id)
    res.status(200).json({ message: 'User removed' })
  } else {
    res.status(400)
    throw new Error('User not found')
  }
})
export const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    const { username, email, password } = req.body
    user.username = username || user.username
    user.email = email || user.email
    if (password) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      user.password = hashedPassword
    }
    await user.save()
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(400)
    throw new Error('User not found')
  }
})
