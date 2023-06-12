import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as Icon from 'react-bootstrap-icons'
import Rating from '@mui/material/Rating/Rating'
import { Modal, Button } from 'react-bootstrap'

import { addProduct } from '../../../../redux/cart.reducer'
import { addProductToListLikeProduct, removeProductToListLikeProduct } from '../../../../redux/user.reducer'
import { order } from 'src/types/order.type'
import './detailProduct.css'
import Breadcrumds from '../Breadcrumb/Breadcrumb'
import EditProduct from './editProduct'
import ReviewCustomer from './ReviewCustomer'

const DetailProduct = () => {
  const { category, idProduct } = useParams()
  const [indexImg, setIndexImg] = useState(0)
  const [ratingProduct, setRatingProduct] = useState(0)
  const [productDetail, setProductDetail] = useState<any[]>()
  const [checkNameStore, setCheckNameStore] = useState('')
  const [quantity, setQuantity] = useState(1)
  //token
  const accessToken = useSelector((state: any) => state.user.accessToken)
  //id
  const id = useSelector((state: any) => state.user.id)
  const myShop = useSelector((state: any) => state.user.myShop)
  const listLikeProduct = useSelector((state: any) => state.user.listLikeProduct)
  // console.log(listLikeProduct)
  const [like, setLike] = useState(listLikeProduct.includes(idProduct))
  const navigate = useNavigate()
  // console.log(productDetail)
  //scrollToReview
  const review = useRef<HTMLInputElement>(null)
  const moveToReview = () => {
    review.current?.scrollIntoView()
  }
  useEffect(() => {
    fetch(`http://localhost:3000/v1/products/${category}/${idProduct}`)
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          if (data.messageError) setProductDetail([])
          else {
            setRatingProduct(data[0].ratingProduct)
            setProductDetail(data)
          }
        }, 1000)
      })
    fetch(`http://localhost:3000/v1/store/${myShop}`)
      .then((response) => response.json())
      .then((data) => {
        setCheckNameStore(data.nameStore)
      })
  }, [idProduct, myShop, accessToken, id, category])
  let listImageProduct = ''
  // console.log(productDetail)
  if (productDetail && productDetail.length > 0) listImageProduct = productDetail[0].imageProduct.split(',')
  const decrease = () => {
    setQuantity(quantity - 1)
  }
  const ascending = () => {
    setQuantity(quantity + 1)
  }
  const dispatch = useDispatch()
  // if (productDetail) console.log(productDetail[0])
  const handleAddCart = () => {
    if (accessToken) {
      const data: order = {
        idProduct: productDetail ? productDetail[0]._id : '',
        categoryProduct: productDetail ? productDetail[0].categoryProduct : '',
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
  //handle like product
  const data = {
    id_product: idProduct
  }
  const handleCovertMoney = (money: number) => {
    let ans = ''
    while (Math.floor(money / 1000) > 0) {
      const du = money % 1000 === 0 ? '000' : money % 1000
      ans = ' ' + du + ans
      money = Math.floor(money / 1000)
    }
    return (money % 1000) + ans
  }
  const handleLikeProduct = () => {
    fetch('http://localhost:3000/v1/user/likeproduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data === 'Create like successfully') {
          setLike(true)
          dispatch(addProductToListLikeProduct(idProduct as string))
        }
        if (data === 'Delete like successfully') {
          setLike(false)
          dispatch(removeProductToListLikeProduct(idProduct as string))
        }
      })
  }
  //handle edit product
  const [showEditProduct, setShowEditProduct] = useState(false)
  const handleCloseModalEditProduct = () => setShowEditProduct(false)
  const handleShowModalEditProduct = () => setShowEditProduct(true)
  //handle delete product
  const handleDeleteProduct = () => {
    fetch(`http://localhost:3000/v1/products/delete/${idProduct}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
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
      {!productDetail && (
        <div className='loader-wrapper pt-5'>
          <div className='loader'></div>
        </div>
      )}
      {productDetail?.length === 0 && <div>Not found product</div>}
      {productDetail && productDetail?.length > 0 && (
        <>
          <Breadcrumds
            nameProduct={productDetail[0].nameProduct.charAt(0).toUpperCase() + productDetail[0].nameProduct.slice(1)}
          />
          <div className='detailProduct ps-0'>
            <div>
              <img
                src={'http://localhost:3000/' + listImageProduct[indexImg]}
                alt='product'
                className='imgProductDetail'
              />
              <div style={{ marginTop: '18px' }}>
                {productDetail[0].imageProduct.split(',').map((img: any, index: number) => {
                  if (index < productDetail[0].imageProduct.split(',').length - 1)
                    return (
                      <img
                        key={index}
                        src={'http://localhost:3000/' + img}
                        alt='product'
                        onClick={() => setIndexImg(index)}
                        aria-hidden='true'
                        style={{ cursor: 'pointer' }}
                        className={`miniImgProductDetail ${
                          index < productDetail[0].imageProduct.split(',').length - 2 ? 'me-2' : ''
                        }`}
                      />
                    )
                })}
              </div>
            </div>
            <div className='infoDetailProduct ms-128'>
              <div className='d-flex justify-content-between align-items-center'>
                {/* <h6 className='nameStoreDetailProduct'>Store: {productDetail[0].store}</h6> */}
                <div
                  className='nameDetailProduct KumbhSans'
                  style={{ fontWeight: '700', fontSize: '35px', lineHeight: '50px' }}
                >
                  {productDetail[0].nameProduct.charAt(0).toUpperCase() + productDetail[0].nameProduct.slice(1)}
                </div>
                {accessToken && productDetail[0].store !== checkNameStore && (
                  <button style={{ border: 'none', backgroundColor: '#fff' }} onClick={handleLikeProduct}>
                    {like ? <Icon.HeartFill size={48} fill='#000' /> : <Icon.Heart size={48} color='#000' />}
                  </button>
                )}
              </div>
              <div className='d-flex flex-column mt-17'>
                <div className='priceDetailProduct kumbhSans mb-26'>
                  <div
                    className={
                      productDetail[0].promotionProduct
                        ? 'lastPriceDetailProduct lastPriceDetailProduct--hasSale'
                        : 'lastPriceDetailProduct'
                    }
                  >
                    {handleCovertMoney(productDetail[0].lastPriceProduct)}₽
                  </div>
                  {productDetail[0].promotionProduct > 0 && (
                    <>
                      <div className='priceDetailProductNotSale'>
                        {handleCovertMoney(productDetail[0].priceProduct)} ₽
                      </div>
                    </>
                  )}
                </div>
                <div className='d-flex align-items-center mb-30' style={{ color: 'rgb(120, 120, 120)' }}>
                  <Rating defaultValue={ratingProduct} readOnly precision={0.5} />
                  <button
                    className='ms-2 KumbhSans p-0'
                    style={{
                      fontWeight: '300',
                      fontSize: '20px',
                      lineHeight: '25px',
                      border: 'none',
                      backgroundColor: '#fff'
                    }}
                    onClick={moveToReview}
                  >
                    {`(See ${productDetail[0].quantityReview.length} reviews)`}
                  </button>
                  <div className='ms-2' style={{ lineHeight: '25px' }}>
                    /
                  </div>
                  <div className='ms-2 KumbhSans' style={{ fontWeight: '300', fontSize: '20px', lineHeight: '25px' }}>
                    Sold {productDetail[0].soldProduct}
                  </div>
                </div>
                <div
                  className='kumbhSans pb-18'
                  style={{
                    borderBottom: '1px solid #000',
                    minHeight: '140px',
                    fontWeight: '300',
                    fontSize: '20px',
                    lineHeight: '25px'
                  }}
                >
                  {productDetail[0].descriptionProduct}
                </div>
              </div>
              {productDetail[0].store !== checkNameStore ? (
                <div className='quantityDetailProduct'>
                  <div
                    className='KumbhSans'
                    style={{ fontWeight: '400', fontSize: '20px', lineHeight: '28px', marginBottom: '8px' }}
                  >
                    Quantity
                  </div>
                  <div className='getQuantity' style={{ paddingBottom: '8px' }}>
                    <Button
                      className='btnQuanlityDetailProduct'
                      onClick={decrease}
                      disabled={quantity === 1 ? true : false}
                      style={{ borderRight: 'none' }}
                    >
                      -
                    </Button>
                    <input
                      className='inputQuanlityDetailProduct kumbhSans'
                      type='text'
                      value={quantity}
                      onChange={(e) => {
                        setQuantity(Number(e.target.value))
                      }}
                    ></input>
                    <Button
                      style={{ borderLeft: 'none' }}
                      className='btnQuanlityDetailProduct'
                      onClick={ascending}
                      disabled={quantity <= productDetail[0].amountProduct ? false : true}
                    >
                      +
                    </Button>
                    <div
                      className='leftProduct ms-20 kumbhSans'
                      style={{
                        fontWeight: '300',
                        fontSize: '20px',
                        lineHeight: '25px',
                        color: `${productDetail[0].amountProduct > 0 ? '#000' : 'rgb(255, 66, 78)'}`
                      }}
                    >
                      {productDetail[0].amountProduct > 0
                        ? `${productDetail[0].amountProduct} products available`
                        : 'Product is out of stock'}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className='leftProduct kumbhSans'
                  style={{
                    margin: '47px 0',
                    fontWeight: '300',
                    fontSize: '20px',
                    lineHeight: '25px',
                    color: `${productDetail[0].amountProduct > 0 ? '#000' : 'rgb(255, 66, 78)'}`
                  }}
                >
                  Number of products left: {productDetail[0].amountProduct}
                </div>
              )}
              {productDetail[0].store !== checkNameStore ? (
                <Button
                  className='kumbhSans'
                  style={{
                    fontWeight: 700,
                    backgroundColor: '#000',
                    borderRadius: 0,
                    border: 'none',
                    width: '100%'
                  }}
                  onClick={handleAddCart}
                  disabled={accessToken && productDetail[0].amountProduct !== 0 ? false : true}
                >
                  Add to cart
                </Button>
              ) : (
                <>
                  <Button
                    className='kumbhSans'
                    style={{
                      fontWeight: 700,
                      backgroundColor: '#000',
                      borderRadius: 0,
                      border: 'none',
                      width: '100%',
                      marginBottom: '15px'
                    }}
                    onClick={handleShowModalEditProduct}
                  >
                    Edit
                  </Button>
                  <Button
                    className='kumbhSans'
                    style={{
                      fontWeight: 700,
                      backgroundColor: '#fff',
                      borderRadius: 0,
                      color: '#000',
                      border: '2px solid #000000',
                      width: '100%'
                    }}
                    onClick={handleDeleteProduct}
                  >
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
              {!accessToken && (
                <div
                  className='kumbhSans'
                  style={{
                    paddingTop: '12px',
                    color: ' #D26B18',
                    fontWeight: '300',
                    fontSize: '20px',
                    lineHeight: '25px'
                  }}
                >
                  Please login before adding products to cart
                </div>
              )}
            </div>
          </div>
          <ReviewCustomer ref={review} data={productDetail} />
        </>
      )}
    </>
  )
}

export default DetailProduct
