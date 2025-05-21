import { isValidObjectId } from 'mongoose'
import asyncHandler from './asyncHandler'

const checkId = asyncHandler(async (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(401)
    throw new Error(`Invalid object of ${req.params.id}`)
  } else {
    next()
  }
})

export default checkId
