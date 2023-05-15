import React from 'react'
import { Link, useParams } from 'react-router-dom'

import './Breadcrumb.css'

export default function Breadcrumds({ nameProduct }: any) {
  const { category } = useParams()
  return (
    <div className='breadCrumb d-flex align-items-center px-0'>
      <Link to='/' className='linkBreadCrumds kumbhSans'>
        Home
      </Link>
      <span className='mx-1'>/</span>
      <Link to={`/products/${category}`} className='linkBreadCrumds kumbhSans'>
        {category}
      </Link>
      <span className='mx-1'>/</span>
      <div className='kumbhSans lastPointBreadCrumds'>{nameProduct}</div>
    </div>
  )
}
