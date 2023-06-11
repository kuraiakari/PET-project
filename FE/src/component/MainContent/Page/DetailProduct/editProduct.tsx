import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

interface editProduct {
  idProduct: string
  priceProduct: number
  promotionProduct: number
  amountProduct: number
  store: string
  handleCloseModalEditProduct: any
}

export default function EditProduct(props: editProduct) {
  const idUser = useSelector((state: any) => state.user.idUser)
  const navigate = useNavigate()
  const [priceProduct, setPriceProduct] = useState<number>(props.priceProduct)
  const [amountProduct, setAmountProduct] = useState<number>(props.amountProduct)
  const [promotionProduct, setPromotionProduct] = useState<number>(props.promotionProduct)
  const handleSubmit = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    const dataNew = {
      store: props.store,
      priceProduct,
      amountProduct,
      promotionProduct
    }
    fetch(`http://localhost:3000/v1/products/update/${props.idProduct}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idUser}`
      },
      body: JSON.stringify(dataNew)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data === 'Update successfully') {
          props.handleCloseModalEditProduct()
          navigate(0)
        }
      })
  }
  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label>Price product</Form.Label>
        <Form.Control
          type='number'
          defaultValue={priceProduct}
          min={0}
          onChange={(e: any) => {
            if (e.target.value >= 0) setPriceProduct(e.target.value)
          }}
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Promotion product</Form.Label>
        <Form.Control
          type='number'
          defaultValue={promotionProduct}
          min={0}
          onChange={(e: any) => {
            if (e.target.value >= 0) setPromotionProduct(e.target.value)
          }}
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Amount product</Form.Label>
        <Form.Control
          type='number'
          defaultValue={amountProduct}
          min={0}
          onChange={(e: any) => {
            if (e.target.value >= 0) setAmountProduct(e.target.value)
          }}
        />
      </Form.Group>
      <Button
        type='submit'
        disabled={
          !(
            props.priceProduct !== priceProduct ||
            props.amountProduct !== amountProduct ||
            props.promotionProduct !== promotionProduct
          )
        }
      >
        Submit form
      </Button>
    </Form>
  )
}
