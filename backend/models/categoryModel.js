import mongoose from 'mongoose'

const categorySchema = mongoose.Schema(
  {
    name: {
      unique: true,
      trim: true,
      maxLength: 32,
      required: true,
      type: String
    }
  },
  { timestamps: true }
)

const Category = mongoose.model('Category', categorySchema)

export default Category
