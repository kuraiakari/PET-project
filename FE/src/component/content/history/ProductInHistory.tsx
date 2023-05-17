import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import ModalReviewProduct from './ModalReviewProduct'
const ProductInHistory = ({ product, soluong, id, idUser }: any) => {
  const imgProduct = product.productOrder.imageProduct.split(',')[0]
  const [showReviewProduct, setShowReviewProduct] = useState(false)
  const handleCloseModalReviewProduct = () => setShowReviewProduct(false)
  const handleShowModalReviewProduct = () => setShowReviewProduct(true)
  console.log(showReviewProduct)
  return (
    <>
      <Link
        to={`/products/${product.productOrder.categoryProduct}/${product.productOrder._id}`}
        className='productInHistory kumbhSans'
        style={{ fontWeight: '300', fontSize: '20px', lineHeight: '25px' }}
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
          <Button
            type='submit'
            className='kumbhSans'
            onClick={(e: any) => {
              handleShowModalReviewProduct()
              e.stopPropagation()
              e.preventDefault()
            }}
            style={{
              fontWeight: 700,
              backgroundColor: '#000',
              borderRadius: 0,
              border: 'none',
              width: '140px',
              height: '42px'
            }}
          >
            Review
          </Button>
        </div>
      </Link>
      <ModalReviewProduct
        id={id}
        idUser={idUser}
        idProduct={product.productOrder._id}
        showReviewProduct={showReviewProduct}
        handleCloseModalReviewProduct={handleCloseModalReviewProduct}
      />
    </>
  )
}

export default ProductInHistory
