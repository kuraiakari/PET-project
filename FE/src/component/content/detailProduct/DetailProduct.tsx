import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import * as Icon from 'react-bootstrap-icons'

import { addProduct } from '../../../redux/cart.reducer'
import { order } from 'src/types/order.type'
import './detailProduct.css'
import { Modal } from 'react-bootstrap'
import EditProduct from './editProduct'

const DetailProduct = () => {
  const { idProduct } = useParams()
  const [indexImg, setIndexImg] = useState(0)
  const [productDetail, setProductDetail] = useState<any[]>()
  const [checkNameStore, setCheckNameStore] = useState('')
  const [quantity, setQuantity] = useState(1)
  const idUser = useSelector((state: any) => state.user.idUser)
  const myShop = useSelector((state: any) => state.user.myShop)

  //modal edit product
  const [show, setShow] = useState(false)
  const handleCloseModalEditProduct = () => setShow(false)
  const handleShowModalEditProduct = () => setShow(true)

  useEffect(() => {
    fetch(`http://localhost:3000/v1/products/${idProduct}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.messageError) setProductDetail(undefined)
        else setProductDetail(data)
      })
    fetch(`http://localhost:3000/v1/store/${myShop}`)
      .then((response) => response.json())
      .then((data) => {
        setCheckNameStore(data.nameStore)
      })
  }, [idProduct, myShop])
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
                <Button
                  className='btnQuanlityDetailProduct'
                  onClick={ascending}
                  disabled={quantity <= productDetail[0].amountProduct ? false : true}
                >
                  {' '}
                  +{' '}
                </Button>
                <div
                  className='leftProduct ms-3'
                  style={{ color: `${productDetail[0].amountProduct > 0 ? '#757575' : 'rgb(255, 66, 78)'}` }}
                >
                  {productDetail[0].amountProduct > 0
                    ? `${productDetail[0].amountProduct} products available`
                    : 'Product is out of stock'}
                </div>
              </div>
            </div>
            {productDetail[0].store !== checkNameStore ? (
              <Button onClick={handleAddCart} disabled={idUser && productDetail[0].amountProduct !== 0 ? false : true}>
                Add to cart
              </Button>
            ) : (
              <>
                <Button onClick={handleShowModalEditProduct}>Edit</Button>
                <Modal show={show} onHide={handleCloseModalEditProduct}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Information Product</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <EditProduct
                      idProduct={productDetail[0]._id}
                      priceProduct={productDetail[0].priceProduct}
                      promotionProduct={productDetail[0].promotionProduct}
                      amountProduct={productDetail[0].amountProduct}
                      store={productDetail[0].store}
                      handleCloseModalEditProduct={handleCloseModalEditProduct}
                    />
                  </Modal.Body>
                </Modal>
              </>
            )}
            {!idUser && <div style={{ color: 'rgb(255, 66, 78)' }}> Please login before adding products to cart</div>}
          </div>
        </div>
      )}
    </>
  )
}

export default DetailProduct
