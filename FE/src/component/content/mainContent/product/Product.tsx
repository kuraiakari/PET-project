import React from 'react'
import { product } from 'src/types/product.type'
import './product.css'

interface ProductItem {
  product: product
}
const Product = (props: ProductItem) => {
  const { product } = props
  const listImageProduct = product.imageProduct.split(',')
  return (
    <>
      <div className='product col-xl-4'>
        <img src={'http://localhost:3000/' + listImageProduct[0]} alt='product' className='imgProduct' />
        <h3>{product.nameProduct}</h3>
        <span>{product.ratingProduct}</span>
        <div>{product.priceProduct - (product.priceProduct * product.promotionProduct) / 100}</div>
        <div>{product.promotionProduct}%</div>
      </div>
    </>
  )
}
export default Product
