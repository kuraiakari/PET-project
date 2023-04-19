import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import * as Icon from 'react-bootstrap-icons'

import { addProduct } from '../../../redux/cart.reducer'
import { order } from 'src/types/order.type'
import './detailProduct.css'

const DetailProduct = () => {
  const { idProduct } = useParams()
  const [indexImg, setIndexImg] = useState(0)
  const [productDetail, setProductDetail] = useState<any[]>()
  const [quantity, setQuantity] = useState(1)
  const idUser = useSelector((state: any) => state.user.idUser)
  useEffect(() => {
    fetch(`http://localhost:3000/v1/products/${idProduct}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.messageError) setProductDetail(undefined)
        else setProductDetail(data)
      })
  }, [idProduct])
  let listImageProduct = ''
  if (productDetail) listImageProduct = productDetail[0].imageProduct.split(',')
  const decrease = () => {
    setQuantity(quantity - 1)
  }
  const ascending = () => {
    setQuantity(quantity + 1)
  }
  const dispatch = useDispatch()
  // if (productDetail) console.log(productDetail[0])
  const handleAddCart = () => {
    if (idUser) {
      const data: order = {
        idProduct: productDetail ? productDetail[0]._id : '',
        nameProduct: productDetail ? productDetail[0].nameProduct : '',
        imgProduct: listImageProduct[0],
        amount: quantity,
        price: productDetail
          ? productDetail[0].priceProduct -
            Math.round((productDetail[0].priceProduct * productDetail[0].promotionProduct) / 100)
          : 0
      }
      dispatch(addProduct(data))
    }
  }

  return (
    <>
      {productDetail === undefined && <div>Not found product</div>}
      {productDetail && (
        <div className='detailProduct'>
          <div className='wrapImgDetailProduct col-xl-5'>
            {indexImg > 0 && (
              <Button
                className='buttonChangeImgDetailProduct buttonChangeImgDetailProduct__left'
                onClick={() => setIndexImg(indexImg - 1)}
              >
                <Icon.ChevronLeft size={16} />
              </Button>
            )}
            {indexImg < 2 && (
              <Button
                className='buttonChangeImgDetailProduct buttonChangeImgDetailProduct__right'
                onClick={() => setIndexImg(indexImg + 1)}
              >
                <Icon.ChevronRight size={16} />
              </Button>
            )}
            <img
              src={'http://localhost:3000/' + listImageProduct[indexImg]}
              alt='product'
              className='imgProductDetail'
            />
          </div>
          <div className='infoDetailProduct col-xl-7'>
            <h6 className='nameStoreDetailProduct'>Store: {productDetail[0].store}</h6>
            <h1 className='nameDetailProduct'>
              {productDetail[0].nameProduct.charAt(0).toUpperCase() + productDetail[0].nameProduct.slice(1)}
            </h1>
            <div className='priceDetailProduct'>
              <div
                className={
                  productDetail[0].promotionProduct
                    ? 'lastPriceDetailProduct lastPriceDetailProduct--hasSale'
                    : 'lastPriceDetailProduct'
                }
              >
                {productDetail[0].priceProduct -
                  Math.round((productDetail[0].priceProduct * productDetail[0].promotionProduct) / 100)}{' '}
                ₽
              </div>
              {productDetail[0].promotionProduct && (
                <>
                  <div className='priceDetailProductNotSale'>{productDetail[0].priceProduct} ₽</div>
                  <div className='saleDetailProduct'>-{productDetail[0].promotionProduct}%</div>
                </>
              )}
            </div>
            <div className='quantityDetailProduct'>
              <div>Quantity</div>
              <div className='getQuantity'>
                <Button
                  className='btnQuanlityDetailProduct'
                  onClick={decrease}
                  disabled={quantity === 1 ? true : false}
                >
                  -
                </Button>
                <input
                  className='inputQuanlityDetailProduct'
                  type='text'
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(Number(e.target.value))
                  }}
                ></input>
                <Button className='btnQuanlityDetailProduct' onClick={ascending}>
                  {' '}
                  +{' '}
                </Button>
              </div>
            </div>
            <Button onClick={handleAddCart} disabled={idUser ? false : true}>
              {' '}
              Add to cart{' '}
            </Button>
            {!idUser && <div style={{ color: 'rgb(255, 66, 78)' }}> Please login before adding products to cart</div>}
          </div>
        </div>
      )}
    </>
  )
}

export default DetailProduct
