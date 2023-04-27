import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import imgStoreError from './avatar.webp'
import './myShop.css'
import './loader.css'
import Product from '../mainContent/product/Product'
import { product } from 'src/types/product.type'
interface inforShop {
  nameStore: string
  imgStore: string
  listProducts: []
}
const MyShop = () => {
  const [inforShop, setInforShop] = useState<inforShop>()
  const myshop = useSelector((state: any) => state.user.myShop)
  // console.log(inforShop)
  useEffect(() => {
    fetch(`http://localhost:3000/v1/store/${myshop}`)
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setInforShop(data)
        }, 1000)
      })
  }, [myshop])
  // if (inforShop) console.log(inforShop)
  return (
    <>
      {!myshop && <div>Currently , you do not have your store ^^</div>}
      {myshop && (
        <>
          <Row>
            <Col className='col-xl-3 justify-content-center'>
              <div className='d-flex justify-content-center'>
                <img
                  src={'http://localhost:3000/' + inforShop?.imgStore}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null // prevents looping
                    currentTarget.src = imgStoreError
                  }}
                  alt='imgStore'
                  className='imgStore'
                />
              </div>
            </Col>
            <Col className='col-xl-9'>
              <div>Name store: {inforShop?.nameStore}</div>
              <div>The number of products in the store: {inforShop?.listProducts?.length}</div>
            </Col>
          </Row>
          <h2 className='pt-4 ps-4'>List product:</h2>
          <div className='listProduct'>
            {!inforShop && (
              <div className='loader-wrapper pt-5'>
                <div className='loader'></div>
              </div>
            )}
            {inforShop?.listProducts?.map((product: product) => {
              return <Product key={product._id} product={product} createProduct={false} />
            })}
            {inforShop && <Product product={{ store: inforShop?.nameStore } as product} createProduct={true} />}
          </div>
        </>
      )}
    </>
  )
}
// inforShop?.listProducts?.length.map((product: product, index: number) => {
//   <Product key={product._id} product={product} />
// })
export default MyShop
