import React from 'react'
import { useSelector } from 'react-redux'
import LikeProduct from './likeProduct'

export default function LikeProducts() {
  const idUser = useSelector((state: any) => state.user.idUser)
  const listLikeProduct = useSelector((state: any) => {
    if (typeof state.user.listLikeProduct === 'string') return state.user.listLikeProduct.split(',')
    else return state.user.listLikeProduct
  })
  return (
    <>
      <div className='headerHistory'>
        <div className='col-xl-1 d-flex justify-content-center'></div>
        <div className='col-xl-3 d-flex justify-content-center'>Name product</div>
        <div className='col-xl-4 d-flex justify-content-center'>Image product</div>
        <div className='col-xl-4 d-flex justify-content-center'>Review</div>
      </div>
      {listLikeProduct.map((idProduct: string, index: number) => {
        return <LikeProduct key={index} idProduct={idProduct} idUser={idUser} index={index} />
      })}
    </>
  )
}
