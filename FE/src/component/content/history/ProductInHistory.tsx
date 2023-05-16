import React from 'react'
import { Link } from 'react-router-dom'
import RatingOfProduct from '../detailProduct/ratingOfProduct'
const ProductInHistory = ({ product, soluong, idUser }: any) => {
  const imgProduct = product.productOrder.imageProduct.split(',')[0]
  return (
    <div>
      <>
        <Link
          to={`/products/${product.productOrder.categoryProduct}/${product.productOrder._id}`}
          className='productInHistory'
        >
          <div className='col-xl-1 d-flex justify-content-center'>{soluong}</div>
          <div className='col-xl-3 d-flex justify-content-start'>
            {product.productOrder.nameProduct.charAt(0).toUpperCase() + product.productOrder.nameProduct.slice(1)}
          </div>
          <div className='col-xl-3 d-flex justify-content-center'>
            <img className='imgProductInCart' src={'http://localhost:3000/' + imgProduct} alt='img product' />
          </div>
          <div className='col-xl-2 d-flex justify-content-center'>{product.productOrder.lastPriceProduct}</div>
          <div className='col-xl-3 d-flex justify-content-center'>
            <RatingOfProduct
              idUser={idUser}
              idProduct={product.productOrder.idProduct}
              ratingProduct={product.productOrder.ratingProduct}
              read={true}
            />
          </div>
        </Link>
      </>
    </div>
  )
}

export default ProductInHistory
