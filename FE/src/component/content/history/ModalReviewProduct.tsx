import React, { useState, useEffect } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import Rating from '@mui/material/Rating/Rating'
import { useNavigate } from 'react-router-dom'

interface initState {
  id: string
  idUser: string
  idProduct: string
  showReviewProduct: boolean
  handleCloseModalReviewProduct: any
}

export default function ModalReviewProduct({
  id,
  idUser,
  idProduct,
  showReviewProduct,
  handleCloseModalReviewProduct
}: initState) {
  //handle show review product
  useEffect(() => {
    fetch(`http://localhost:3000/v1/products/product/${idProduct}`)
      .then((response) => response.json())
      .then((data) => {
        data[0].quantityReview.forEach((item: any) => {
          if (item.userId === id) {
            setRating(item.rating)
          }
        })
      })
  }, [idProduct, id])
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const navigate = useNavigate()
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
        console.log(data)
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
  return (
    <>
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
                precision={0.5}
                className='ratingProduct'
                onChange={(e, newValue) => {
                  if (newValue) {
                    setRating(newValue)
                  }
                }}
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
  )
}
