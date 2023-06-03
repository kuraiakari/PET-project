import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useWebSocket from 'react-use-websocket'

import ProductInCart from './ProductInCart'
import { order } from 'src/types/order.type'

import { removeAllProduct } from '../../../redux/cart.reducer'
import './cart.css'

interface dataReturn {
  messageSuccess: string
  arrayIdOwnerShop: []
}
const Cart = () => {
  const products = useSelector((state: any) => state.order.orderlist)
  const idUser = useSelector((state: any) => state.user.idUser)
  const [fullName, setFullName] = useState('User')
  useEffect(() => {
    fetch('http://localhost:3000/v1/user/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${idUser}`,
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setFullName(data.firstName + data.lastName)
      })
  }, [idUser])
  const WS_URL = 'ws://localhost:8002'
  const { sendJsonMessage } = useWebSocket(WS_URL)
  const dispatch = useDispatch()
  const [successBuy, setSuccessBuy] = useState<dataReturn>()
  const navigate = useNavigate()
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
        // console.log(data)
        if (data.messageSuccess === 'Create new order successfully') {
          for (const mess of data.arrayOwnerShop) {
            sendJsonMessage({
              type: 'buyProduct',
              content: {
                idUser: 'admin',
                to: mess.idOwner,
                message: `${fullName} was buy ${mess.amount} ${mess.nameProduct}`
              }
            })
          }
          setSuccessBuy(data)
        } else {
          setSuccessBuy(data)
        }
      })
  }
  const handleClose = () => {
    if (successBuy && successBuy.messageSuccess === 'Create new order successfully') {
      dispatch(removeAllProduct())
      navigate('/')
    }
    setSuccessBuy({
      messageSuccess: '',
      arrayIdOwnerShop: []
    })
  }
  return (
    <>
      <div className='headerCart'>
        <div className='col-xl-1 d-flex justify-content-center kumbhSans'></div>
        <div className='col-xl-3 d-flex justify-content-center kumbhSans'>{'Name product'.toUpperCase()}</div>
        <div className='col-xl-3 d-flex justify-content-center kumbhSans'>{'Image product'.toUpperCase()}</div>
        <div className='col-xl-2 d-flex justify-content-center kumbhSans'>{'Quantity'.toUpperCase()}</div>
        <div className='col-xl-2 d-flex justify-content-center kumbhSans'>{'Price'.toUpperCase()}</div>
        <div className='col-xl-1 d-flex justify-content-center kumbhSans'></div>
      </div>
      {products.map((product: order, index: number) => {
        sumPrice += product.price * product.amount
        return <ProductInCart key={index} product={product} index={index} />
      })}
      {sumPrice > 0 && (
        <>
          <div className='sumPrice d-flex justify-content-end kumbhSans mx-49'>SUM PRICE : {sumPrice} ₽</div>
          <div className='d-flex justify-content-center'>
            <Button
              className='kumbhSans'
              style={{
                fontWeight: 700,
                backgroundColor: '#000',
                borderRadius: 0,
                border: 'none',
                width: '140px',
                height: '42px'
              }}
              onClick={handleAddCart}
            >
              Buy now
            </Button>
          </div>
        </>
      )}
      {successBuy && (
        <Modal show={!!successBuy}>
          <Modal.Body>{successBuy.messageSuccess}</Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  )
}

export default Cart
