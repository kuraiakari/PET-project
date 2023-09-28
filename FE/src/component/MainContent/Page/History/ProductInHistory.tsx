import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import ModalReviewProduct from './ModalReviewProduct'
const ProductInHistory = ({ product, soluong, id, accessToken }: any) => {
  const imgProduct = product.productOrder.imageProduct.split(',')[0]
  const [showReviewProduct, setShowReviewProduct] = useState(false)
  const handleCloseModalReviewProduct = () => setShowReviewProduct(false)
  const handleShowModalReviewProduct = () => setShowReviewProduct(true)
  const handleCovertMoney = (money: number) => {
    let ans = ''
    while (Math.floor(money / 1000) > 0) {
      const du = money % 1000 === 0 ? '000' : money % 1000
      ans = ' ' + du + ans
      money = Math.floor(money / 1000)
    }
    return (money % 1000) + ans
  }
  // console.log(product)
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
        <div className='col-xl-2 d-flex justify-content-center'>
          <img
            className='imgProductInCart'
            src={imgProduct.indexOf('tiki') === -1 ? 'http://localhost:3000/' + imgProduct : imgProduct}
            alt='img product'
          />
        </div>
        <div className='col-xl-2 d-flex justify-content-center'>{product.amountOrder}</div>
        <div className='col-xl-2 d-flex justify-content-center'>
          {handleCovertMoney(product.productOrder.lastPriceProduct * product.amountOrder)}
        </div>
        <div className='col-xl-2 d-flex justify-content-center'>
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
        accessToken={accessToken}
        idProduct={product.productOrder._id}
        showReviewProduct={showReviewProduct}
        handleCloseModalReviewProduct={handleCloseModalReviewProduct}
      />
    </>
  )
}

export default ProductInHistory
