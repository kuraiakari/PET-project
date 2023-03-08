import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import ProductInCart from './ProductInCart';
import { order } from 'src/types/order.type';
import { response } from 'express';

const Cart = () => {
  const products = useSelector((state: any) => state.order.orderlist)
  const idUser = useSelector((state: any) => state.user.idUser)
  const handleAddCart = () => {
    const data ={
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
  }
  return <>
  {products.map((product: order, index: number) => <ProductInCart key={index} product={product} index={index}/>)}
  <Button onClick={handleAddCart}>Buy</Button>
  </>
}

export default Cart