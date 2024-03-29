import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Rating } from '@mui/material'
interface idProduct {
  index: number
  idProduct: string
}
interface product {
  nameProduct: string
  imageProduct: string
  ratingProduct: number
  categoryProduct: string
}
export default function LikeProduct({ index, idProduct }: idProduct) {
  const [dataProduct, setDataProduct] = useState<Array<product>>()
  // console.log(idProduct)
  const imgProduct = dataProduct ? dataProduct[0].imageProduct.split(',')[0] : ''
  // console.log(dataProduct)
  useEffect(() => {
    fetch(`http://localhost:3000/v1/products/product/${idProduct}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.messageError === 'Not Found') setDataProduct(undefined)
        else setDataProduct(data)
      })
  }, [idProduct])
  return (
    <>
      {!dataProduct && <></>}
      {dataProduct && (
        <Link
          to={`/products/${dataProduct[0].categoryProduct}/${idProduct}`}
          className='productInHistory kumbhSans'
          style={{ fontWeight: '300', fontSize: '20px', lineHeight: '25px' }}
        >
          <div className='col-xl-1 d-flex justify-content-center'>{index + 1}</div>
          <div className='col-xl-3 d-flex justify-content-start'>
            {dataProduct[0].nameProduct.charAt(0).toUpperCase() + dataProduct[0].nameProduct.slice(1)}
          </div>
          <div className='col-xl-4 d-flex justify-content-center'>
            <img
              className='imgProductInCart'
              src={imgProduct.indexOf('tiki') === -1 ? 'http://localhost:3000/' + imgProduct : imgProduct}
              alt='img product'
            />
          </div>
          <div className='col-xl-4 d-flex justify-content-center'>
            <Rating defaultValue={dataProduct[0].ratingProduct} readOnly precision={0.5} />
          </div>
        </Link>
      )}
    </>
  )
}
