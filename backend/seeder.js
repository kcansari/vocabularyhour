import colors from 'colors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import words from './data/words.js'
import users from './data/users.js'
import User from './models/userModel.js'
import MailToken from './models/tokenModel.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()
// basicSchemaModel Branch
const importData = async () => {
  try {
    await User.deleteMany()
    await MailToken.deleteMany()

    await User.insertMany(users)

    const sampleUser = new User({
      username: 'kcansari',
      email: 'sample@example.com',
      password: '123456',
      isAdmin: 'false',
      verified: 'true',
      Words: {
        water: 'su',
        car: 'araba',
        buy: 'satın almak',
        pencil: 'kalem',
      },
    })

    await sampleUser.save()

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
    // await Word.deleteMany()
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
