import mongoose from 'mongoose'

const Schema = mongoose.Schema

interface stores {
  imgStore: string
  nameStore: string
  addressStore: string
  telStore: string
}

const stores = new Schema(
  {
    imgStore: String,
    nameStore: { type: String, unique: true },
    addressStore: String,
    telStore: String,
    listProducts: [],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v
      }
    }
  }
)

export default mongoose.model('stores', stores)
