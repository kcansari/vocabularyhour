import mongoose from 'mongoose'

const wordSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    meaning: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    // If you set timestamps: true, Mongoose will add two properties of type Date to your schema:
    // createdAt: a date representing when this document was created
    // updatedAt: a date representing when this document was last updated
    timestamps: true,
  }
)

const Word = mongoose.model('Word', wordSchema)

export default Word
