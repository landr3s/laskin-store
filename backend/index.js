import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import usersRouter from './routes/userRoutes.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

connectDB()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/api/users', usersRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
