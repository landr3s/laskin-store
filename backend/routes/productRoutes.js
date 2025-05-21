import formidable from 'express-formidable'
import { Router } from 'express'
import {
  authenticate,
  authenticateAsAdmin
} from '../middlewares/authMiddleware.js'
import {
  createProduct,
  createProductReview,
  deleteProduct,
  fetchAllProducts,
  fetchingProducts,
  fetchNewProducts,
  fetchTopProducts,
  getProductById,
  updateProduct
} from '../controllers/productController.js'

const router = Router()

router
  .route('/')
  .post(authenticate, authenticateAsAdmin, formidable(), createProduct)
  .get(authenticate, fetchingProducts)

router
  .route('/allProducts')
  .get(authenticate, authenticateAsAdmin, fetchAllProducts)

router.route('/:id/reviews').post(authenticate, createProductReview)

router.route('/new').get(authenticate, fetchNewProducts)
router.route('/top').get(authenticate, fetchTopProducts)

router
  .route('/:id')
  .put(authenticate, authenticateAsAdmin, formidable(), updateProduct)
  .delete(authenticate, authenticateAsAdmin, formidable(), deleteProduct)
  .get(authenticate, getProductById)
export default router
