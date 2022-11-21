import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import wordRoutes from './routes/wordRoutes.js'
import connectDB from './config/db.js'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
const app = express()

dotenv.config()

connectDB()

app.get('/', (req, res) => {
  res.send('Vocabulary Hour')
})

app.use('/api/words', wordRoutes)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`VocabularyHour app listening on port ${PORT}`.yellow.bold)
})
