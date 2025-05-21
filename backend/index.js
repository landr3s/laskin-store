import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import userRouter from './routes/userRoutes.js'
import categoryRouter from './routes/categoryRoutes.js'
import productRouter from './routes/productRoutes.js'
import uploadRouter from './routes/uploadRoutes.js'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import path from 'path'
import { dir } from 'console'
dotenv.config()

const app = express()
const PORT = process.env.PORT ?? 5000

connectDB()

app.use(cookieParser())
app.use(express.json())
app.use(cors())

app.use('/api/users', userRouter)
app.use('/api/category', categoryRouter)
app.use('/api/products', productRouter)
app.use('/api/upload', uploadRouter)

const __dirname = path.resolve()

app.use('/uploads', express.static(path.join(__dirname + '/uploads')))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
