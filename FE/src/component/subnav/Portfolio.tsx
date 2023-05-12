import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import './portfolio.css'
import quality from './img/quality.png'
import voucher from './img/voucher.png'
function Portfolio() {
  const [isActivePrice, setIsActivePrice] = useState(false)
  const [isActiveRating, setIsActiveRating] = useState(false)
  const [searchProduct, setsearchProduct] = useSearchParams()
  const sortProduct = searchProduct.get('sorting') || ''
  const handleSearch = (payload: any) => {
    if (sortProduct === null || sortProduct !== payload) {
      searchProduct.set('sorting', payload)
      setsearchProduct(searchProduct)
    } else {
      // toggle click
      searchProduct.delete('sorting')
      setsearchProduct(searchProduct)
    }
    if (payload === 'price') {
      setIsActivePrice(!isActivePrice)
      setIsActiveRating(false)
    }
    if (payload === 'rating') {
      setIsActiveRating(!isActiveRating)
      setIsActivePrice(false)
    }
  }
  return (
    <>
      <div className='portfolio'>
        <div className='headerPortfolio'>Outstanding</div>
        <button
          onClick={() => handleSearch('price')}
          className={isActivePrice ? 'itemPortfolio itemActive' : 'itemPortfolio'}
        >
          <img src={voucher} alt='voucher' className='iconMenu me-2' />
          Good price
        </button>
        <button
          onClick={() => handleSearch('rating')}
          className={isActiveRating ? 'itemPortfolio itemActive' : 'itemPortfolio'}
        >
          <img src={quality} alt='quality' className='iconMenu me-2' />
          Quality
        </button>
      </div>
    </>
  )
}
export default Portfolio
