import React, { useCallback, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

import ProductInCart from './ProductInCart'
import { order } from 'src/types/order.type'

import { removeAllProduct } from '../../../redux/cart.reducer'
import './cart.css'
const Cart = () => {
  const products = useSelector((state: any) => state.order.orderlist)
  const idUser = useSelector((state: any) => state.user.idUser)
  const dispatch = useDispatch()
  let sumPrice = 0
  const handleAddCart = () => {
    const data = {
      products
    }
    fetch('http://localhost:3000/v1/user/createorder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + idUser
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === 'Create new order successfully') {
          alert('Success buy products')
          dispatch(removeAllProduct())
        }
      })
  }
  return (
    <>
      <div className='headerCart'>
        <div className='col-xl-1 d-flex justify-content-center'></div>
        <div className='col-xl-3 d-flex justify-content-center'>Name product</div>
        <div className='col-xl-3 d-flex justify-content-center'>Image product</div>
        <div className='col-xl-2 d-flex justify-content-center'>Quantity</div>
        <div className='col-xl-2 d-flex justify-content-center'>Price</div>
        <div className='col-xl-1 d-flex justify-content-center'></div>
      </div>
      {products.map((product: order, index: number) => {
        sumPrice += product.price * product.amount
        return <ProductInCart key={index} product={product} index={index} />
      })}
      {sumPrice > 0 && <div className='sumPrice d-flex justify-content-end'>Sum price : {sumPrice} ₽</div>}
      <Button className='sumPrice' onClick={handleAddCart} disabled={products.length > 0 ? false : true}>
        Buy
      </Button>
    </>
  )
}

export default Cart
