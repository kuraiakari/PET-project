import React from 'react'
import avatarError from './avatar.webp'
const Item = ({ comment }: any) => {
  console.log(comment)
  const date = new Date(comment.date)
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  return (
    <div className='border mt-2 mb-2 p-4 w-100 d-flex'>
      <img
        src={'http://localhost:3000/' + comment.user}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null // prevents looping
          currentTarget.src = avatarError
        }}
        alt='avatarUser'
        className='avatarUserComment'
      />
      <div className='ms-5'>
        <div className='mb-3' style={{ minHeight: '24px' }}>
          {comment.date ? `${date.getDay()}, ${monthNames[date.getMonth()]} ${date.getFullYear()}` : ''}
        </div>
        <div>{comment.comment}</div>
      </div>
    </div>
  )
}
export default function ReviewCustomer(props: any) {
  // console.log(props.data[0].comments)
  return (
    <div className='d-flex align-items-center flex-column pt-4 mt-4 mb-5 reviewcustomer'>
      <h1 className='mt-3 mb-3'>Review customer</h1>
      {props.data[0].comments.map((comment: any, index: number) => {
        return <Item key={index} comment={comment} />
      })}
    </div>
  )
}
