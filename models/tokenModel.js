import mongoose from 'mongoose'

const mailTokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    unique: true,
  },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now(), expires: 3600 }, // 1 hour
})

const MailToken = mongoose.model('mailToken', mailTokenSchema)

export default MailToken
