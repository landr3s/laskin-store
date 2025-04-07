import { Router } from 'express'
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  getUserProfile,
  loginUser,
  logoutUser,
  updateUserById,
  updateUserProfile
} from '../controllers/userControllers.js'
import {
  authenticate,
  authenticateAdmin
} from '../middlewares/authMiddleware.js'

const router = Router()

router
  .route('/')
  .post(createUser)
  .get(authenticate, authenticateAdmin, getAllUsers)

router.route('/auth').post(loginUser)

router.route('/logout').post(logoutUser)

router
  .route('/profile')
  .get(authenticate, getUserProfile)
  .put(authenticate, updateUserProfile)

router
  .route('/:id')
  .get(authenticate, authenticateAdmin, getUserById)
  .put(authenticate, authenticateAdmin, updateUserById)
  .delete(authenticate, authenticateAdmin, deleteUserById)

export default router
