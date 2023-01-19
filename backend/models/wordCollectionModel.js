import mongoose from 'mongoose'
const { Schema } = mongoose

const wordCollectionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    words: [{ type: Schema.Types.ObjectId, ref: 'Word' }],
  },
  {
    // If you set timestamps: true, Mongoose will add two properties of type Date to your schema:
    // createdAt: a date representing when this document was created
    // updatedAt: a date representing when this document was last updated
    timestamps: true,
  }
)

const WordCollection = mongoose.model('WordCollection', wordCollectionSchema)

export default WordCollection
