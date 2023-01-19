import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import wordCollectionRoutes from './routes/wordCollectionRoutes.js'
import wordRoutes from './routes/wordRoutes.js'
import userRoutes from './routes/userRoutes.js'
import verifyRoutes from './routes/verifyRoutes.js'
import connectDB from './config/db.js'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
const app = express()

dotenv.config()

connectDB()

// Allow us to accept JSON data in the body.
app.use(express.json())
//Enable All CORS Requests
app.use(cors())

app.get('/', (req, res) => {
  res.send('Vocabulary Hour')
})

app.use('/api/words', wordRoutes)
app.use('/api/users', userRoutes)
app.use('/verify', verifyRoutes)
app.use('/wordcollection', wordCollectionRoutes)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`VocabularyHour app listening on port ${PORT}`.yellow.bold)
})
