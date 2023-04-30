import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RatingOfProduct from '../detailProduct/ratingOfProduct'
interface idProduct {
  index: number
  idUser: string
  idProduct: string
}
interface product {
  nameProduct: string
  imageProduct: string
  ratingProduct: number
}
export default function LikeProduct({ index, idUser, idProduct }: idProduct) {
  const [dataProduct, setDataProduct] = useState<Array<product>>()
  const imgProduct = dataProduct ? dataProduct[0].imageProduct.split(',')[0] : ''
  useEffect(() => {
    fetch(`http://localhost:3000/v1/products/${idProduct}`)
      .then((response) => response.json())
      .then((data) => setDataProduct(data))
  }, [idProduct])
  return (
    <>
      {dataProduct && (
        <Link to={`/product/${idProduct}`} className='productInHistory'>
          <div className='col-xl-1 d-flex justify-content-center'>{index + 1}</div>
          <div className='col-xl-3 d-flex justify-content-center'>{dataProduct[0].nameProduct}</div>
          <div className='col-xl-4 d-flex justify-content-center'>
            <img className='imgProductInCart' src={'http://localhost:3000/' + imgProduct} alt='img product' />
          </div>
          <div className='col-xl-4 d-flex justify-content-center'>
            <RatingOfProduct
              idUser={idUser}
              idProduct={idProduct || ''}
              ratingProduct={dataProduct[0].ratingProduct}
              read={false}
            />
          </div>
        </Link>
      )}
    </>
  )
}
