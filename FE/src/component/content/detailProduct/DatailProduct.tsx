import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'

import { addProduct } from '../../../redux/cart.reducer'
import { order } from 'src/types/order.type'

const DetailProduct = () => {
  const { idProduct } = useParams()
  const [productDetail, setProductDetail] = useState<any[]>()
  const [quality, setQuality] = useState(1)
  useEffect(() => {
    fetch(`http://localhost:3000/v1/products/${idProduct}`)
      .then((response) => response.json())
      .then((data) => setProductDetail(data))
  }, [idProduct])
  let listImageProduct = ''
  if (productDetail) listImageProduct = productDetail[0].imageProduct.split(',')
  const decrease = () => {
    setQuality(quality - 1)
  }
  const ascending = () => {
    setQuality(quality + 1)
  }
  const dispatch = useDispatch()
  const idUser = useSelector((state: any) => state.user.idUser)

  const handleAddCart = () => {
    const data: order = {
      idProduct: productDetail ? productDetail[0]._id : '',
      nameProduct: productDetail ? productDetail[0].nameProduct : '',
      imgProduct: listImageProduct[0],
      amount: quality
    }
    dispatch(addProduct(data))
    //test
    // const dataPost = {
    //   products: [data]
    // }
    // console.log(dataPost)
    // fetch('http://localhost:3000/v1/user/createorder', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //     Authorization: 'Bearer ' + idUser
    //   },
    //   body: JSON.stringify(dataPost)
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
  }

  //test

  return (
    <>
      {productDetail && (
        <div>
          <h1>{productDetail[0].nameProduct}</h1>
          <h2>{productDetail[0].priceProduct}</h2>
          <img src={'http://localhost:3000/' + listImageProduct[0]} alt='product' className='imgProduct' />
          <img src={'http://localhost:3000/' + listImageProduct[1]} alt='product' className='imgProduct' />
          <img src={'http://localhost:3000/' + listImageProduct[2]} alt='product' className='imgProduct' />
          <div>
            <Button onClick={decrease} disabled={quality === 1 ? true : false}>
              -
            </Button>
            <input type='text' value={quality} />
            <Button onClick={ascending}> + </Button>
          </div>
          <Button onClick={handleAddCart}> Add to cart </Button>
        </div>
      )}
    </>
  )
}

export default DetailProduct
