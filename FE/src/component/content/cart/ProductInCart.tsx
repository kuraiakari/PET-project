import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { removeProduct } from '../../../redux/cart.reducer'

const ProductInCart = (props: any) => {
  const dispatch = useDispatch()
  const deleteProduct = (e: any) => {
    dispatch(removeProduct(props.index))
    e.preventDefault()
    e.stopPropagation()
  }
  console.log(props.product.idProduct)
  return (
    <>
      <Link
        to={`/product/${props.product.idProduct}`}
        className='productInCart kumbhSans'
        style={{ fontWeight: '300', fontSize: '20px', lineHeight: '25px' }}
      >
        <div className='col-xl-1 d-flex justify-content-center'>{props.index + 1}</div>
        <div className='col-xl-3 d-flex justify-content-center'>{props.product.nameProduct}</div>
        <div className='col-xl-3 d-flex justify-content-center'>
          <img
            className='imgProductInCart'
            src={'http://localhost:3000/' + props.product.imgProduct}
            alt='img product'
          />
        </div>
        <div className='col-xl-2 d-flex justify-content-center'>{props.product.amount}</div>
        <div className='col-xl-2 d-flex justify-content-center'>{props.product.price * props.product.amount} ₽</div>
        <div className='col-xl-1 d-flex justify-content-center'>
          <Button className='btnDeleteProductIncart' onClick={deleteProduct}>
            x
          </Button>
        </div>
      </Link>
    </>
  )
}
export default ProductInCart
