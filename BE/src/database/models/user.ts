import mongoose from 'mongoose'

const Schema = mongoose.Schema

interface users {
  email: string
  password: string
  avatar: string
  firstName: string
  lastName: string
  phoneUser: string
  gender: string
}

const users = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: String,
    firstName: String,
    lastName: String,
    phoneUser: String,
    gender: String,
    salt: String,
    isAdmin: {
      type: Boolean,
      default: false
    },
    myShop: [],
    listOrder: [],
    listLikeProduct: [],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v
        delete ret.password
        delete ret.salt
      }
    }
  }
)

export default mongoose.model('user', users)
