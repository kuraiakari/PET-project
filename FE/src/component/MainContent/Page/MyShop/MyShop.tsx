import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import imgStoreError from './avatar.webp'
import './myShop.css'
import './loader.css'
import Product from '../Home/Product/Product'
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
  // console.log(inforShop)
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
                <div className='d-flex flex-column kumbhSans'>
                  <div className='mb-0' style={{ fontWeight: '600', fontSize: '30px', lineHeight: '37px' }}>
                    {inforShop?.nameStore}
                  </div>
                  <div className='mt-19 mb-22'>
                    {inforShop?.description && (
                      <div>
                        <div className='mb-1' style={{ fontWeight: '600', fontSize: '20px', lineHeight: '25px' }}>
                          About us:
                        </div>
                        <div style={{ fontWeight: '300', fontSize: '20px', lineHeight: '25px' }}>
                          {inforShop?.description}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='d-flex flex-wrap' style={{ fontWeight: '300', fontSize: '20px', lineHeight: '25px' }}>
                    <span className='d-flex me-2'>
                      <span
                        className='inforShopLabel'
                        style={{ fontWeight: '600', fontSize: '20px', lineHeight: '25px' }}
                      >
                        Products
                      </span>
                      :
                    </span>
                    {inforShop?.listProducts?.length}
                  </div>
                  {inforShop?.addressStore && (
                    <div
                      className='d-flex flex-wrap'
                      style={{ fontWeight: '300', fontSize: '20px', lineHeight: '25px' }}
                    >
                      <span className='d-flex me-2'>
                        <span
                          className='inforShopLabel'
                          style={{ fontWeight: '600', fontSize: '20px', lineHeight: '25px' }}
                        >
                          Address store
                        </span>
                        :
                      </span>
                      {inforShop?.addressStore}
                    </div>
                  )}
                  {inforShop?.telStore && (
                    <div
                      className='d-flex flex-wrap'
                      style={{ fontWeight: '300', fontSize: '20px', lineHeight: '25px' }}
                    >
                      <span className='d-flex me-2'>
                        <span
                          className='inforShopLabel'
                          style={{ fontWeight: '600', fontSize: '20px', lineHeight: '25px' }}
                        >
                          Phone store
                        </span>
                        :
                      </span>
                      {inforShop?.telStore}
                    </div>
                  )}
                </div>
              </div>
              <div className='px-38 JejuMyeongjoRegular' style={{ fontSize: '40px', lineHeight: '40px' }}>
                List product:
              </div>
              <div className='listProduct' style={{ padding: 0 }}>
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
