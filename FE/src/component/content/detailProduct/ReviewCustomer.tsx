import React, { forwardRef } from 'react'
import avatarError from './avatar.webp'
import { Rating } from '@mui/material'
const Item = ({ comment }: any) => {
  return (
    <div className='border-top mt-2 mb-2 p-4 d-flex flex-column align-items-start w-100'>
      <div className='d-flex mb-30'>
        <img
          src={'http://localhost:3000/' + comment.avatar}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null // prevents looping
            currentTarget.src = avatarError
          }}
          alt='avatarUser'
          className='avatarUserComment'
        />
        <div className='ms-11'>
          <div className='kumbhSans' style={{ fontWeight: '400', fontSize: '20px', lineHeight: '140%' }}>
            {comment.user}
          </div>
          <div>
            <Rating readOnly precision={0.5} value={comment.rating} size='small' />
          </div>
        </div>
      </div>
      <div>
        <div className='kumbhSans ms-2' style={{ fontWeight: '400', fontSize: '20px', lineHeight: '140%' }}>
          &lsquo;&lsquo;{comment.comment.charAt(0).toUpperCase() + comment.comment.slice(1)}&rsquo;&rsquo;
        </div>
      </div>
    </div>
  )
}
const ReviewCustomer = forwardRef(function ReviewCustomer(props: any, ref: any) {
  // console.log(props.ref)
  return (
    <div className='d-flex align-items-center flex-column mt-38 reviewcustomer'>
      <div
        ref={ref}
        className='JejuMyeongjoRegular'
        style={{ fontSize: '40px', lineHeight: '40px', marginBottom: '45px' }}
      >
        Review customer
      </div>
      {props.data[0].comments.map((comment: any, index: number) => {
        return <Item key={index} comment={comment} />
      })}
    </div>
  )
})
export default ReviewCustomer
