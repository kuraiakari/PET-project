import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import './history.css'
import ProductInHistory from './ProductInHistory'
const History = () => {
  const [listOrder, setListOrder] = useState([])
  let soluong = 0
  const accessToken = useSelector((state: any) => state.user.accessToken)
  const id = useSelector((state: any) => state.user.id)
  useEffect(() => {
    fetch('http://localhost:3000/v1/user/profile', {
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + accessToken
      }
    })
      .then((response) => response.json())
      .then((data) => setListOrder(data.listOrder))
  }, [accessToken])
  return (
    <>
      <div className='headerHistory'>
        <div className='col-xl-1 d-flex justify-content-center kumbhSans'></div>
        <div className='col-xl-3 d-flex justify-content-center kumbhSans'>{'Name product'.toUpperCase()}</div>
        <div className='col-xl-2 d-flex justify-content-center kumbhSans'>{'Image product'.toUpperCase()}</div>
        <div className='col-xl-2 d-flex justify-content-center kumbhSans'>{'Quantity'.toUpperCase()}</div>
        <div className='col-xl-2 d-flex justify-content-center kumbhSans'>{'Sum price'.toUpperCase()}</div>
        <div className='col-xl-2 d-flex justify-content-center kumbhSans'>REVIEW</div>
      </div>
      {listOrder &&
        listOrder
          .slice(0)
          .reverse()
          .map((order: any) => {
            return order.listProducts.map((product: any, index: number) => {
              soluong++
              return (
                <ProductInHistory product={product} key={index} soluong={soluong} id={id} accessToken={accessToken} />
              )
            })
          })}
    </>
  )
}
export default History
