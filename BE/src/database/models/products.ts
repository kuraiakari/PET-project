import mongoose from 'mongoose'

const Schema = mongoose.Schema

const products = new Schema({
  nameProduct: String,
  amountProduct: Number,
  imageProduct: String,
  ratingProduct: Number,
  priceProduct: Number,
  promotionProduct: Number,
  size: String,
  type: String,
  producer: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export default mongoose.model('products', products)
