import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

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
  <Button onClick={handleAddCart}>Buy</Button>
  </>
}

export default Cart