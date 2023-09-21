import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as Icon from 'react-bootstrap-icons'
import { Modal } from 'react-bootstrap'

import { product } from 'src/types/product.type'
import CreateProduct from '../../MyShop/CreateProduct'
import './product.css'
import { Rating } from '@mui/material'
interface ProductItem {
  product: product
  createProduct: boolean
}
const Product = (props: ProductItem) => {
  const [show, setShow] = useState(false)
  const handleCloseModalCreateProduct = () => setShow(false)
  const handleShowModalCreateProduct = () => setShow(true)
  if (!props.createProduct) {
    const { product } = props
    const handleCovertMoney = (money: number) => {
      let ans = ''
      while (Math.floor(money / 1000) > 0) {
        const du = money % 1000 === 0 ? '000' : money % 1000
        ans = ' ' + du + ans
        money = Math.floor(money / 1000)
      }
      return (money % 1000) + ans
    }
    const category = product.categoryProduct
    // console.log(product.store)
    const listImageProduct = product.imageProduct.split(',')
    const linkUrl =
      listImageProduct[0].indexOf('tiki') === -1 ? 'http://localhost:3000/' + listImageProduct[0] : listImageProduct[0]
    return (
      <>
        <div className='col-xl-3 ps-2 pe-2'>
          <Link to={`/products/${category}/${product._id}`} className='product'>
            {product.promotionProduct > 0 && (
              <div
                className='promotionProduct kumbhSans'
                style={{
                  fontWeight: 700,
                  fontSize: '12px'
                }}
              >
                SALE {product.promotionProduct}%
              </div>
            )}
            <img src={linkUrl} alt='product' className='imgProduct' />
            <div className='titleProduct kumbhSans'>
              <div className='nameProduct' style={{ fontWeight: 700, fontSize: '15px' }}>
                {product.nameProduct.charAt(0).toUpperCase() + product.nameProduct.slice(1)}
              </div>
              <div className='priceProduct' style={{ fontWeight: '300', fontSize: '15px', lineHeight: '19px' }}>
                <div style={{ color: '#D26B18' }}>{handleCovertMoney(product.lastPriceProduct)}₽</div>
                {product.promotionProduct > 0 && (
                  <div style={{ textDecoration: 'line-through', color: '#1F1F1F', marginLeft: '3px' }}>
                    {handleCovertMoney(product.priceProduct)}₽
                  </div>
                )}
              </div>
              <div
                className='ratingFull'
                style={{ fontWeight: '300', fontSize: '13px', lineHeight: '16px', marginBottom: '6px' }}
              >
                <Rating
                  readOnly
                  precision={0.5}
                  size='small'
                  value={product.ratingProduct || 0}
                  style={{ fontSize: '13px' }}
                />
                <div className='ms-8'>{`${product.quantityReview.length} reviews`}</div>
              </div>
              <div style={{ fontWeight: '300', fontSize: '13px', lineHeight: '16px', color: '#000' }}>
                {product.amountProduct} products available
              </div>
            </div>
          </Link>
        </div>
      </>
    )
  } else {
    // console.log(props.product)
    return (
      <>
        <div className='col-xl-3 ps-2 pe-2'>
          <button className='createproduct' onClick={handleShowModalCreateProduct}>
            <div className='headerCreateProduct'>
              <div className='iconCreate'>
                <Icon.Plus size={45} />
              </div>
            </div>
            <div
              className='titleProduct d-flex align-items-center justify-content-center kumbhSans'
              style={{ height: '123px', fontWeight: 700, fontSize: '15px' }}
            >
              Create New Product
            </div>
          </button>
        </div>
        <Modal show={show} onHide={handleCloseModalCreateProduct} className='resetModal'>
          <Modal.Header style={{ padding: 0, borderBottom: 0 }}>
            <Modal.Title
              className='d-flex JejuMyeongjoRegular justify-content-center w-100'
              style={{ fontSize: '40px', lineHeight: '40px', padding: '52px 72px 20px 72px' }}
            >
              Create New Product
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateProduct
              nameStore={props.product.store}
              handleCloseModalCreateProduct={handleCloseModalCreateProduct}
            />
          </Modal.Body>
        </Modal>
      </>
    )
  }
}
export default Product
