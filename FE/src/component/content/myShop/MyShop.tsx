import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Col } from 'react-bootstrap'
import imgStoreError from './avatar.webp'
import './myShop.css'
import './loader.css'
import Product from '../mainContent/product/Product'
import { product } from 'src/types/product.type'
interface inforShop {
  nameStore: string
  imgStore: string
  addressStore: string
  telStore: string
  description: string
  listProducts: []
}
const MyShop = () => {
  const [inforShop, setInforShop] = useState<inforShop>()
  const myshop = useSelector((state: any) => state.user.myShop)
  console.log(inforShop)
  useEffect(() => {
    fetch(`http://localhost:3000/v1/store/${myshop}`)
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          data.imgStore = data.imgStore.replace(',', '')
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
          {!inforShop && (
            <div className='loader-wrapper pt-5'>
              <div className='loader'></div>
            </div>
          )}
          {inforShop && (
            <>
              <div className='d-flex backgroundInforShop'>
                <Col className='col-xl-3'>
                  <div className='d-flex justify-content-center align-items-center h-100'>
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
                  <h4 className='mb-0'>{inforShop?.nameStore}</h4>
                  <div className='mt-4 mb-4'>
                    {inforShop?.description && (
                      <div>
                        <div style={{ fontWeight: 500 }}>ABOUT US</div>
                        <div style={{ minHeight: '36px' }}>{inforShop?.description}</div>
                      </div>
                    )}
                  </div>
                  <div className='d-flex flex-wrap'>
                    <span className='d-flex me-2'>
                      <span className='inforShopLabel'>Products</span>:
                    </span>
                    {inforShop?.listProducts?.length}
                  </div>
                  {inforShop?.addressStore && (
                    <div className='d-flex flex-wrap'>
                      <span className='d-flex me-2'>
                        <span className='inforShopLabel'>Address store</span>:
                      </span>
                      {inforShop?.addressStore}
                    </div>
                  )}
                  {inforShop?.telStore && (
                    <div className='d-flex flex-wrap'>
                      <span className='d-flex me-2'>
                        <span className='inforShopLabel'>Phone store</span>:
                      </span>
                      {inforShop?.telStore}
                    </div>
                  )}
                </Col>
              </div>
              <h2 className='pt-4 ps-4'>List product:</h2>
              <div className='listProduct'>
                {inforShop?.listProducts?.map((product: product) => {
                  return <Product key={product._id} product={product} createProduct={false} />
                })}
                <Product product={{ store: inforShop?.nameStore } as product} createProduct={true} />
              </div>
            </>
          )}
        </>
      )}
    </>
  )
}
// inforShop?.listProducts?.length.map((product: product, index: number) => {
//   <Product key={product._id} product={product} />
// })
export default MyShop
