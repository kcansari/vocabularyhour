import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    verified: { type: Boolean, default: false },
    Words: {
      type: Map, // `socialHandles` is a key/value store for string keys
      of: { type: String, lowercase: true }, // Values must be strings
    },
  },
  {
    // If you set timestamps: true, Mongoose will add two properties of type Date to your schema:
    // createdAt: a date representing when this document was created
    // updatedAt: a date representing when this document was last updated
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
