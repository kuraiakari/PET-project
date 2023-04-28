import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import * as Icon from 'react-bootstrap-icons'
import { Rating } from '@mui/material'
import { addProduct } from '../../../redux/cart.reducer'
import { order } from 'src/types/order.type'
import './detailProduct.css'
import { Form, Modal } from 'react-bootstrap'
import EditProduct from './editProduct'
import ReviewCustomer from './ReviewCustomer'

const DetailProduct = () => {
  const { idProduct } = useParams()
  const [indexImg, setIndexImg] = useState(0)
  const [wasBuy, setWasBuy] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [productDetail, setProductDetail] = useState<any[]>()
  const [checkNameStore, setCheckNameStore] = useState('')
  const [quantity, setQuantity] = useState(1)
  const idUser = useSelector((state: any) => state.user.idUser)
  const id = useSelector((state: any) => state.user.id)
  const myShop = useSelector((state: any) => state.user.myShop)
  const navigate = useNavigate()
  useEffect(() => {
    fetch(`http://localhost:3000/v1/products/${idProduct}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.messageError) setProductDetail(undefined)
        else {
          data[0].quantityReview.forEach((item: any) => {
            if (item.userId === id) {
              setRating(item.rating)
            }
          })
          setProductDetail(data)
        }
      })
    fetch(`http://localhost:3000/v1/store/${myShop}`)
      .then((response) => response.json())
      .then((data) => {
        setCheckNameStore(data.nameStore)
      })
    fetch('http://localhost:3000/v1/user/checkwasbuy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idUser}`
      },
      body: JSON.stringify({
        idProduct
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === 'Was buy product') setWasBuy(true)
      })
  }, [idProduct, myShop, idUser, id])
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
  //handle edit product
  const [showEditProduct, setShowEditProduct] = useState(false)
  const handleCloseModalEditProduct = () => setShowEditProduct(false)
  const handleShowModalEditProduct = () => setShowEditProduct(true)
  //handle show review product
  const [showReviewProduct, setShowReviewProduct] = useState(false)
  const handleCloseModalReviewProduct = () => setShowReviewProduct(false)
  const handleShowModalReviewProduct = () => setShowReviewProduct(true)
  const handleSendReview = () => {
    const data = {
      idProduct,
      rating,
      comment
    }
    fetch('http://localhost:3000/v1/products/review', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${idUser}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === 'Update successfully') {
          handleCloseModalReviewProduct()
          handleShowModalThankReviewProduct()
        }
      })
  }
  //handleShowThankYou
  const [showThankReview, setShowThankReview] = useState(false)
  const handleCloseModalThankReviewProduct = () => {
    navigate(0)
    setShowThankReview(false)
  }
  const handleShowModalThankReviewProduct = () => setShowThankReview(true)
  //handle delete product
  const handleDeleteProduct = () => {
    fetch(`http://localhost:3000/v1/products/delete/${idProduct}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idUser}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === 'Delete successfully') {
          navigate('/myshop')
        }
      })
  }
  return (
    <>
      {productDetail === undefined && <div>Not found product</div>}
      {productDetail && (
        <>
          <div className='detailProduct ps-0'>
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
              <div className='d-flex align-items-center justify-content-between border-top border-bottom mt-3 mb-3'>
                <h1 className='nameDetailProduct'>
                  {productDetail[0].nameProduct.charAt(0).toUpperCase() + productDetail[0].nameProduct.slice(1)}
                </h1>
                {wasBuy && (
                  <>
                    <Rating
                      name='half-rating'
                      value={rating}
                      precision={0.5}
                      className='ratingProduct'
                      onChange={(e, newValue) => {
                        if (newValue) {
                          setRating(newValue)
                          handleShowModalReviewProduct()
                        }
                      }}
                    />
                    <Modal show={showReviewProduct} onHide={handleCloseModalReviewProduct}>
                      <Modal.Header closeButton>
                        <Modal.Title>Review product</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form.Group className='mb-3'>
                          <Form.Label>
                            <h4>Rating</h4>
                          </Form.Label>
                          <div>
                            <Rating
                              name='half-rating'
                              value={rating}
                              className='ratingProduct'
                              precision={0.5}
                              size='large'
                              readOnly
                            />
                          </div>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                          <Form.Label>
                            <h4>Comment</h4>
                          </Form.Label>
                          <Form.Control as='textarea' rows={7} onChange={(e) => setComment(e.target.value)} />
                        </Form.Group>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant='primary' onClick={handleSendReview}>
                          Sent
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    <Modal show={showThankReview} onHide={handleCloseModalThankReviewProduct}>
                      <Modal.Body>Thank you for your feedback</Modal.Body>
                    </Modal>
                  </>
                )}
              </div>
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
                <Button
                  onClick={handleAddCart}
                  disabled={idUser && productDetail[0].amountProduct !== 0 ? false : true}
                >
                  Add to cart
                </Button>
              ) : (
                <>
                  <Button onClick={handleShowModalEditProduct}>Edit</Button>
                  <Button onClick={handleDeleteProduct} className='ms-3'>
                    DeleteProduct
                  </Button>
                  <Modal show={showEditProduct} onHide={handleCloseModalEditProduct}>
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
          <ReviewCustomer data={productDetail} />
        </>
      )}
    </>
  )
}

export default DetailProduct
