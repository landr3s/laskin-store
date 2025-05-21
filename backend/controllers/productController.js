import asyncHandler from '../middlewares/asyncHandler.js'
import Product from '../models/productModel.js'

export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, quantity, brand } = req.fields
  switch (true) {
    case !name:
      res.status(400)
      throw new Error('Name is required')
    case !description:
      res.status(400)
      throw new Error('Description is required')
    case !price:
      res.status(400)
      throw new Error('Price is required')
    case !quantity:
      res.status(400)
      throw new Error('Quantity is required')
    case !brand:
      res.status(400)
      throw new Error('Brand is required')
    case !category:
      res.status(400)
      throw new Error('Category is required')
  }
  console.log(req.fields)

  const product = await new Product({ ...req.fields }).save()
  if (product) {
    console.log(product)

    res.status(201).json({ product })
  } else {
    res.status(400)
    throw new Error('Error creating product')
  }
})

export const updateProduct = asyncHandler(async (req, res) => {
  const { name, quantity, brand, price, description, category } = req.fields
  switch (true) {
    case !name:
      res.status(400)
      throw new Error('Name is required')
    case !description:
      res.status(400)
      throw new Error('Description is required')
    case !price:
      res.status(400)
      throw new Error('Price is required')
    case !quantity:
      res.status(400)
      throw new Error('Quantity is required')
    case !brand:
      res.status(400)
      throw new Error('Brand is required')
    case !category:
      res.status(400)
      throw new Error('Category is required')
  }
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { ...req.fields },
    { new: true }
  )
  await product.save()
  if (product) {
    res.status(200).json(product)
  } else {
    res.status(400)
    throw new Error('Error updating product')
  }
})

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id)
  if (product) {
    res.status(200).json({ message: 'Product removed correctly' })
  } else {
    res.status(400)
    throw new Error('Error deleting product')
  }
})

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.status(200).json(product)
  } else {
    res.status(400)
    throw new Error('Error fetching product')
  }
})

export const fetchingProducts = asyncHandler(async (req, res) => {
  const pageSize = 6
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {}
  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword }).limit(pageSize)
  if (products) {
    res.status(200).json({
      products,
      page: 1,
      hasMore: false,
      pages: Math.ceil(count / pageSize)
    })
  } else {
    res.status(400)
    throw new Error('Not products found')
  }
})

export const fetchAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
    .limit(12)
    .populate('categoru')
    .sort({ createdAt: -1 })
  if (products) {
    res.status(200).json(products)
  } else {
    res.status(400)
    throw new Error('Not products found')
  }
})

export const createProductReview = asyncHandler(async (req, res) => {
  const { comment, rating } = req.body
  if (!comment || !rating) {
    throw new Error('Fill all fields')
  }
  const product = await Product.findById(req.params.id)
  if (product) {
    const existingRewiew = product.reviews.find(
      r => r.user.toString() === req.user._id.toString()
    )
    if (existingRewiew) {
      res.status(400)
      throw new Error('Review already exists')
    } else {
      const review = {
        rating: rating,
        comment: comment,
        name: req.user.username,
        user: req.user._id
      }
      product.reviews.push(review)
      product.numReviews = product.reviews.length
      if (product.reviews.length === 0) {
        product.rating = 0
      } else {
        const total = product.reviews.reduce(
          (acc, item) => acc + item.rating,
          0
        )
        product.rating = ((total / product.reviews.length) * 10) / 10
      }
      await product.save()
      res.status(200).json({ message: 'Product review added correctly' })
    }
  } else {
    res.status(400)
    throw new Error('Not product found')
  }
})

export const fetchTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(4)
  if (products) {
    res.status(200).json(products)
  } else {
    res.status(400)
    throw new Error('Products not found')
  }
})

export const fetchNewProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ _id: -1 }).limit(5)
  if (products) {
    res.status(200).json(products)
  } else {
    res.status(400)
    throw new Error('Products not found')
  }
})
