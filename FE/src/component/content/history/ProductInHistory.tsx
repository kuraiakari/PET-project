import React from 'react'
import { Link } from 'react-router-dom'
const ProductInHistory = ({ product, soluong }: any) => {
  const imgProduct = product.productOrder.imageProduct.split(',')[0]
  return (
    <div>
      <>
        <Link to={`/product/${product.productOrder._id}`} className='productInHistory'>
          <div className='col-xl-1 d-flex justify-content-center'>{soluong}</div>
          <div className='col-xl-3 d-flex justify-content-center'>{product.productOrder.nameProduct}</div>
          <div className='col-xl-3 d-flex justify-content-center'>
            <img className='imgProductInCart' src={'http://localhost:3000/' + imgProduct} alt='img product' />
          </div>
          <div className='col-xl-2 d-flex justify-content-center'>{product.productOrder.lastPriceProduct}</div>
          <div className='col-xl-3 d-flex justify-content-center'></div>
        </Link>
      </>
    </div>
  )
}

export default ProductInHistory
