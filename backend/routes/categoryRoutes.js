import { Router } from 'express'
import {
  authenticate,
  authenticateAsAdmin
} from '../middlewares/authMiddleware.js'
import {
  createCategory,
  deleteCategoryById,
  getCategories,
  getCategoryById,
  updateCategoryById
} from '../controllers/categoryController.js'

const router = Router()

router
  .route('/')
  .post(authenticate, authenticateAsAdmin, createCategory)
  .get(getCategories)

router
  .route('/:categoryId')
  .get(authenticate, authenticateAsAdmin, getCategoryById)
  .put(authenticate, authenticateAsAdmin, updateCategoryById)
  .delete(authenticate, authenticateAsAdmin, deleteCategoryById)

export default router
