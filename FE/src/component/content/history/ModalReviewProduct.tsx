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
      <Modal show={showReviewProduct} onHide={handleCloseModalReviewProduct} className='resetModal'>
        <Modal.Header style={{ padding: 0, borderBottom: 0 }}>
          <Modal.Title
            className='d-flex JejuMyeongjoRegular justify-content-center w-100'
            style={{ fontSize: '40px', lineHeight: '40px', padding: '52px 72px 20px 72px' }}
          >
            Review product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className='d-flex align-items-center'>
            <Form.Label>
              <div className='kumbhSans'>Product quality</div>
            </Form.Label>
            <div className='ms-3'>
              <Rating
                size='small'
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
          <Form.Group className='mt-2 d-flex flex-column align-items-end'>
            <Form.Control
              className='kumbhSans'
              style={{ fontWeight: '300', fontSize: '15px', lineHeight: '19px', borderRadius: 0 }}
              as='textarea'
              rows={14}
              onChange={(e) => setComment(e.target.value)}
              placeholder='Leave a review'
            />
            <div className='kumbhSans mt-2' style={{ fontWeight: '300', fontSize: '15px', lineHeight: '19px' }}>
              Up to 150 characters
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer
          style={{ borderTop: 0, padding: '20px 72px 52px 72px' }}
          className='d-flex justify-content-center'
        >
          <Button
            className='kumbhSans'
            style={{
              fontWeight: 700,
              backgroundColor: '#000',
              borderRadius: 0,
              border: 'none',
              width: '140px',
              height: '42px'
            }}
            onClick={handleSendReview}
          >
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
