import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { product } from 'src/types/product.type'
const DetailProduct = () => {
  const { idProduct } = useParams()
  const [productDetail, setProductDetail] = useState<any[]>()
  useEffect(() => {
    fetch(`http://localhost:3000/v1/products/${idProduct}`)
      .then((response) => response.json())
      .then((data) => setProductDetail(data))
  }, [idProduct])
  let listImageProduct = ''
  if (productDetail) listImageProduct = productDetail[0].imageProduct.split(',')
  return (
    <>
      {productDetail && (
        <div>
          <h1>{productDetail[0].nameProduct}</h1>
          <h2>{productDetail[0].priceProduct}</h2>
          <img src={'http://localhost:3000/' + listImageProduct[0]} alt='product' className='imgProduct' />
          <img src={'http://localhost:3000/' + listImageProduct[1]} alt='product' className='imgProduct' />
          <img src={'http://localhost:3000/' + listImageProduct[2]} alt='product' className='imgProduct' />
        </div>
      )}
    </>
  )
}

export default DetailProduct
