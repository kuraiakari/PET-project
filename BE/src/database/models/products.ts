import mongoose from 'mongoose'

const Schema = mongoose.Schema

// interface products {
//   nameProduct: string
//   amountProduct: string
//   imageProduct: string
//   ratingProduct: string
//   priceProduct: string
//   promotionProduct: string
//   size: string
//   type: string
//   store: string
// }

const products = new Schema(
  {
    nameProduct: String,
    amountProduct: Number,
    imageProduct: String,
    ratingProduct: Number,
    priceProduct: Number,
    promotionProduct: Number,
    size: String,
    type: String,
    store: { type: String, required: true },
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

export default mongoose.model('products', products)
