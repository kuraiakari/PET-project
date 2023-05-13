import React, { useState } from 'react'
import { useSearchParams, NavLink } from 'react-router-dom'

import './portfolio.css'
import goodPrice from './iconSubNav/goodPrice.svg'
import quality from './iconSubNav/quality.svg'
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
    <div className='subNav'>
      <div className='filter'>
        <div className='kumbhSans headerFilter'>Filter</div>
        <button
          onClick={() => handleSearch('price')}
          className={isActivePrice ? 'itemFilter itemActive' : 'itemFilter'}
        >
          <img src={goodPrice} alt='goodPrice' className='iconMenu me-2' />
          <div className='kumbhSans' style={{ lineHeight: '25px' }}>
            Good price
          </div>
        </button>
        <button
          onClick={() => handleSearch('rating')}
          className={isActiveRating ? 'itemFilter itemActive' : 'itemFilter'}
        >
          <img src={quality} alt='quality' className='iconMenu me-2' />
          <div className='kumbhSans' style={{ lineHeight: '25px' }}>
            Rating
          </div>
        </button>
      </div>
      <div className='category'>
        <div className='kumbhSans headerCategory'>Category</div>
        <NavLink
          end
          to={'/products/PhonesTablets'}
          className={isActivePrice ? 'itemCategory itemActive' : 'itemCategory'}
        >
          <img src={goodPrice} alt='goodPrice' className='iconMenu me-2' />
          <div className='kumbhSans' style={{ lineHeight: '25px' }}>
            Phones - Tablets
          </div>
        </NavLink>
        <NavLink end to={'/products/MenFashion'} className={isActivePrice ? 'itemCategory itemActive' : 'itemCategory'}>
          <img src={goodPrice} alt='goodPrice' className='iconMenu me-2' />
          <div className='kumbhSans' style={{ lineHeight: '25px' }}>
            Men&apos;s Fashion
          </div>
        </NavLink>
        <NavLink
          end
          to={'/products/WomenFashion'}
          className={isActivePrice ? 'itemCategory itemActive' : 'itemCategory'}
        >
          <img src={goodPrice} alt='goodPrice' className='iconMenu me-2' />
          <div className='kumbhSans' style={{ lineHeight: '25px' }}>
            Women&apos;s Fashion
          </div>
        </NavLink>
        <NavLink
          to={'/products/FashionAccessories'}
          className={isActivePrice ? 'itemCategory itemActive' : 'itemCategory'}
        >
          <img src={goodPrice} alt='goodPrice' className='iconMenu me-2' />
          <div className='kumbhSans' style={{ lineHeight: '25px' }}>
            Fashion accessories
          </div>
        </NavLink>
      </div>
    </div>
  )
}
export default Portfolio
