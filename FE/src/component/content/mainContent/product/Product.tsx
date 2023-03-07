import React from 'react'
import { Link } from 'react-router-dom'

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
      <Link to={`/product/${product._id}`} className='product col-xl-4'>
        <img src={'http://localhost:3000/' + listImageProduct[0]} alt='product' className='imgProduct' />
        <h3>{product.nameProduct}</h3>
        <span>{product.ratingProduct}</span>
        <div>{product.priceProduct - (product.priceProduct * product.promotionProduct) / 100}</div>
        <div>{product.promotionProduct}%</div>
      </Link>
    </>
  )
}
export default Product
