import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import './portfolio.css'
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
        <button
          onClick={() => handleSearch('price')}
          className={isActivePrice ? 'itemPortfolio itemActive' : 'itemPortfolio'}
        >
          Sort by price
        </button>
        <button
          onClick={() => handleSearch('rating')}
          className={isActiveRating ? 'itemPortfolio itemActive' : 'itemPortfolio'}
        >
          Sort by rating
        </button>
      </div>
    </>
  )
}
export default Portfolio
