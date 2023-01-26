import colors from 'colors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import words from './data/words.js'
import users from './data/users.js'
import Word from './models/wordModel.js'
import User from './models/userModel.js'
import MailToken from './models/tokenModel.js'
import WordCollection from './models/wordCollectionModel.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()
// basicSchemaModel Branch
const importData = async () => {
  try {
    await Word.deleteMany()
    await User.deleteMany()
    await MailToken.deleteMany()
    await WordCollection.deleteMany()

    const createdUsers = await User.insertMany(users)
    const createdWords = await Word.insertMany(words)

    const adminUser = createdUsers[0]._id
    const allWordId = createdWords.map((createdWord) => createdWord._id)

    const sampleCollection = [
      {
        name: 'Admin Collection',
        userId: adminUser,
        words: allWordId,
      },
    ]

    await WordCollection.insertMany(sampleCollection).catch(function (error) {
      console.log(error)
    })

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
