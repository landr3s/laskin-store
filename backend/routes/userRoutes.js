import { Router } from 'express'
import {
  authenticate,
  authenticateAsAdmin
} from '../middlewares/authMiddleware.js'
import {
  createUser,
  deleteUserById,
  getProfile,
  getUserById,
  getUsers,
  login,
  logout,
  updateProfile,
  updateUserById
} from '../controllers/userController.js'

const router = Router()

router
  .route('/')
  .get(authenticate, authenticateAsAdmin, getUsers)
  .post(createUser)

router.route('/auth').post(login)
router.route('/logout').post(authenticate, logout)
router
  .route('/profile')
  .get(authenticate, getProfile)
  .put(authenticate, updateProfile)
router
  .route('/:id')
  .get(authenticate, authenticateAsAdmin, getUserById)

  .delete(authenticate, authenticateAsAdmin, deleteUserById)
  .put(authenticate, authenticateAsAdmin, updateUserById)

export default router
