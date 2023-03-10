import React from 'react'
import { Link } from 'react-router-dom'
import * as Icon from 'react-bootstrap-icons'

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
      <div className='col-xl-3 ps-2 pe-2'>
        <Link to={`/product/${product._id}`} className='product shadow-sm'>
          <img src={'http://localhost:3000/' + listImageProduct[0]} alt='product' className='imgProduct' />
          <div className='titleProduct'>
            <h3 className='nameProduct'>
              {product.nameProduct.charAt(0).toUpperCase() + product.nameProduct.slice(1)}
            </h3>
            <div className='ratingFull'>
              <span>{product.ratingProduct}</span>
              <Icon.StarFill size={12} className='ms-1' />
            </div>
            <div className={`priceProduct ${product.promotionProduct ? 'haspromotion' : ''}`}>
              <div className='priceProductCost'>
                {product.priceProduct - Math.round((product.priceProduct * product.promotionProduct) / 100)}₽
              </div>
              {product.promotionProduct && <div className='promotionProduct ms-2'>-{product.promotionProduct}%</div>}
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}
export default Product
