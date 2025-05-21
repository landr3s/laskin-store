import asyncHandler from '../middlewares/asyncHandler.js'
import Category from '../models/categoryModel.js'

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({})
  if (categories) {
    res.status(200).json(categories)
  } else {
    res.status(400)
    throw new Error('Categories not found')
  }
})

export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body
  if (!name) {
    res.status(400)
    throw new Error('Please fill all fields')
  }
  const existingCategory = await Category.findOne({ name })

  if (existingCategory) {
    res.status(400)
    throw new Error('This category already exist')
  }
  const newCategory = await new Category({ name }).save()

  res.status(200).json({ _id: newCategory._id, name: newCategory.name })
})

export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.categoryId)
  if (category) {
    res.status(200).json(category)
  } else {
    res.status(400)
    throw new Error('Category not found')
  }
})

export const updateCategoryById = asyncHandler(async (req, res) => {
  const { name } = req.body
  if (!name) {
    res.status(400)
    throw new Error('Fil all fields')
  }
  const category = await Category.findById(req.params.categoryId)
  category.name = name

  const updatedCategory = await category.save()

  res.status(200).json({ _id: updatedCategory._id, name: updatedCategory.name })
})

export const deleteCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.categoryId)
  if (category) {
    await Category.findByIdAndDelete(req.params.categoryId)
    res.status(200).json({
      message: 'Category deleted successfully'
    })
  } else {
    res.status(400)
    throw new Error('Category not found')
  }
})
