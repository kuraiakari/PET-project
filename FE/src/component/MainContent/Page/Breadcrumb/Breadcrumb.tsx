import React, { memo } from 'react'
import { Link, useParams } from 'react-router-dom'

import './Breadcrumb.css'

interface data {
  nameProduct: string
}

const Breadcrumds = ({ nameProduct }: data) => {
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
export default memo(Breadcrumds)
