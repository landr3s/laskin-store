import mongoose, { Schema } from 'mongoose'
const { ObjectId } = Schema

const reviewSchema = new Schema(
  {
    name: { type: String, required: true },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
      set: val => Math.round(val * 10) / 10
    },
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
  },
  { timestamps: true }
)

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: false },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    countInStock: { type: Number, required: false, default: 0 },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    category: { type: ObjectId, ref: 'Category', required: true },
    reviews: [reviewSchema]
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)

export default Product
