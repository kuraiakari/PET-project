import mongoose from 'mongoose'

const Schema = mongoose.Schema

interface products {
  nameProduct: string,
  amountProduct: number,
  imageProduct: string,
  ratingProduct: number,
  priceProduct: number,
  promotionProduct: number,
  size: string,
  type: string,
}

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
}, {
  toJSON: {
    transform(doc, ret){
      delete ret.__v
    }
  }
})

export default mongoose.model('products', products)
