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
    nameProduct: { type: String, required: true },
    amountProduct: { type: Number, required: true },
    soldProduct: Number,
    imageProduct: String,
    ratingProduct: Number,
    totalRating: Number,
    quantityReview: [],
    comments: [],
    priceProduct: { type: Number, required: true },
    promotionProduct: { type: Number, required: true },
    lastPriceProduct: { type: Number, required: true},
    size: String,
    typeProduct: { type: String, required: true },
    categoryProduct: { type: String, required: true},
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
