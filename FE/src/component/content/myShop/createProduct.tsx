import React, { useState, useRef } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
interface nameStore {
  nameStore: string
  handleCloseModalCreateProduct: any
}
export default function CreateProduct({ nameStore, handleCloseModalCreateProduct }: nameStore) {
  const idUser = useSelector((state: any) => state.user.idUser)
  const navigate = useNavigate()
  const [validated, setValidated] = useState(false)
  const imageProduct = useRef<HTMLInputElement>(null)
  const [nameProduct, setNameProduct] = useState('')
  const [priceProduct, setPriceProduct] = useState(0)
  const [amountProduct, setAmountProduct] = useState(0)
  const [promotionProduct, setPromotionProduct] = useState(0)
  const [typeProduct, setTypeProduct] = useState('')
  const handleSubmit = (e: any) => {
    const form = e.currentTarget
    e.preventDefault()
    e.stopPropagation()
    if (form.checkValidity() === false) {
      setValidated(true)
    } else {
      const formData = new FormData()
      // console.log(imageProduct.current?.files, nameProduct, nameStore, typeof priceProduct, amountProduct, promotionProduct, typeProduct)
      if (imageProduct.current?.files) formData.append('imageProduct', imageProduct.current.files[0])
      if (imageProduct.current?.files) formData.append('imageProduct', imageProduct.current.files[1])
      if (imageProduct.current?.files) formData.append('imageProduct', imageProduct.current.files[2])
      formData.append('store', nameStore)
      //post multiple file to API
      formData.append('nameProduct', nameProduct)
      formData.append('priceProduct', priceProduct.toString())
      formData.append('amountProduct', amountProduct.toString())
      formData.append('promotionProduct', promotionProduct.toString())
      formData.append('typeProduct', typeProduct)
      fetch('http://localhost:3000/v1/products/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idUser}`
        },
        body: formData
      })
        .then((response) => response.json())
        .then((data) => {
          if (data === 'Create successfully') {
            handleCloseModalCreateProduct()
            navigate(0)
          }
        })
    }
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label>Image product</Form.Label>
        <Form.Control required type='file' id='avatar' name='avatar' ref={imageProduct} multiple></Form.Control>
        <Form.Control.Feedback type='invalid'>Please choose image</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Name product</Form.Label>
        <Form.Control required type='text' onChange={(e: any) => setNameProduct(e.target.value)} />
        <Form.Control.Feedback type='invalid'>Please input value</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Price product</Form.Label>
        <Form.Control
          required
          type='number'
          min={0}
          onChange={(e: any) => {
            if (e.target.value >= 0) setPriceProduct(e.target.value)
          }}
        />
        <Form.Control.Feedback type='invalid'>Please input value</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Amount product</Form.Label>
        <Form.Control
          required
          type='number'
          min={0}
          onChange={(e: any) => {
            if (e.target.value >= 0) setAmountProduct(e.target.value)
          }}
        />
        <Form.Control.Feedback type='invalid'>Please input value</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Promotion product</Form.Label>
        <Form.Control
          type='number'
          defaultValue={0}
          min={0}
          onChange={(e: any) => {
            if (e.target.value >= 0) setPromotionProduct(e.target.value)
          }}
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Type product</Form.Label>
        <Form.Control required type='text' onChange={(e: any) => setTypeProduct(e.target.value)} />
        <Form.Control.Feedback type='invalid'>Please input value</Form.Control.Feedback>
      </Form.Group>
      <Button type='submit'>Submit form</Button>
    </Form>
  )
}
