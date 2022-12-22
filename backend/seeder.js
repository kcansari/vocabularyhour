import colors from 'colors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import words from './data/words.js'
import users from './data/users.js'
import Word from './models/wordModel.js'
import User from './models/userModel.js'
import MailToken from './models/tokenModel.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

const importData = async () => {
  try {
    await Word.deleteMany()
    await User.deleteMany()
    await MailToken.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    const sampleWords = words.map((word) => {
      return { ...word, user: adminUser }
    })

    await Word.insertMany(sampleWords)
    MailToken.insertMany()

    console.log('Data Imported'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`Error: ${error.message}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Word.deleteMany()
    await User.deleteMany()
    await MailToken.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`Error: ${error.message}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
