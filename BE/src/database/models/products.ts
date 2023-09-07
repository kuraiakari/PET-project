import mongoose from 'mongoose'

const Schema = mongoose.Schema

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
    couponProduct: [],
    promotionProduct: Number,
    lastPriceProduct: { type: Number, required: true },
    size: String,
    descriptionProduct: String,
    typeProduct: { type: String, required: true },
    categoryProduct: { type: String, required: true },
    store: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  {
    toJSON: {
      transform(doc: any, ret: any) {
        delete ret.__v
      }
    }
  }
)

export default mongoose.model('products', products)
