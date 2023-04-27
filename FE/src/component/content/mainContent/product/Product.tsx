import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as Icon from 'react-bootstrap-icons'
import { Button, Modal } from 'react-bootstrap'

import { product } from 'src/types/product.type'
import CreateProduct from '../../myShop/createProduct'
import './product.css'
import create from './create.png'
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
    // console.log(product.store)
    const listImageProduct = product.imageProduct.split(',')
    return (
      <>
        <div className='col-xl-3 ps-2 pe-2'>
          <Link to={`/product/${product._id}`} className='product shadow-sm'>
            <img src={'http://localhost:3000/' + listImageProduct[0]} alt='product' className='imgProduct' />
            <div className='titleProduct'>
              <h3 className='nameProduct'>
                {product.nameProduct.charAt(0).toUpperCase() + product.nameProduct.slice(1)}
              </h3>
              {product.ratingProduct && (
                <div className='ratingFull'>
                  <span>{product.ratingProduct}</span>
                  <Icon.StarFill size={12} className='ms-1' />
                </div>
              )}
              <div className={`priceProduct ${product.promotionProduct ? 'haspromotion' : ''}`}>
                <div className='priceProductCost'>
                  {product.priceProduct - Math.round((product.priceProduct * product.promotionProduct) / 100)}₽
                </div>
                {product.promotionProduct && <div className='promotionProduct ms-2'>-{product.promotionProduct}%</div>}
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
          <button className='createproduct shadow-sm border border-white' onClick={handleShowModalCreateProduct}>
            <img src={create} alt='product' className='imgProduct' />
            <div className='titleProduct d-flex align-items-center justify-content-center'>Create New Product</div>
          </button>
        </div>
        <Modal show={show} onHide={handleCloseModalCreateProduct}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateProduct nameStore={props.product.store} handleCloseModalCreateProduct={handleCloseModalCreateProduct} />
          </Modal.Body>
        </Modal>
      </>
    )
  }
}
export default Product
