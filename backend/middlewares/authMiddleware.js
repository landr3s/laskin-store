import User from '../models/userModel.js'
import asyncHandler from './asyncHandler.js'
import jwt from 'jsonwebtoken'
export const authenticate = asyncHandler(async (req, res, next) => {
  let token
  token = req.cookies.jwt
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_JWT)
      req.user = await User.findById(decoded.userId).select('-password')
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Token failed, not authorized')
    }
  } else {
    res.status(401)
    throw new Error('No token, not authorized')
  }
})

export const authenticateAsAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('User not authorized as admin')
  }
})
