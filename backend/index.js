import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import userRouter from './routes/userRoutes.js'
import connectDB from './config/db.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT ?? 5000

connectDB()

app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use('/api/users', userRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
