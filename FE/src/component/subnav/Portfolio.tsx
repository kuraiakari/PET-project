import React from 'react'
import { useSearchParams, NavLink } from 'react-router-dom'

import './portfolio.css'
import goodPrice from './iconSubNav/goodPrice.svg'
import quality from './iconSubNav/quality.svg'
import phone from './iconSubNav/phone.png'
import shirt from './iconSubNav/shirt.png'
import dress from './iconSubNav/dress.png'
import accessories from './iconSubNav/accessories.png'

// trick : check location để active element
function Portfolio() {
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
  }
  return (
    <div className='subNav'>
      <div className='filter'>
        <div className='kumbhSans headerFilter'>Filter</div>
        <button
          onClick={() => handleSearch('price')}
          className={sortProduct === 'price' ? 'itemFilter itemActive' : 'itemFilter'}
        >
          <img src={goodPrice} alt='goodPrice' className='iconMenu me-2' />
          <div className='kumbhSans' style={{ lineHeight: '25px' }}>
            Good price
          </div>
        </button>
        <button
          onClick={() => handleSearch('rating')}
          className={sortProduct === 'rating' ? 'itemFilter itemActive' : 'itemFilter'}
        >
          <img src={quality} alt='quality' className='iconMenu me-2' />
          <div className='kumbhSans' style={{ lineHeight: '25px' }}>
            Rating
          </div>
        </button>
      </div>
      <div className='category'>
        <div className='kumbhSans headerCategory'>Category</div>
        <NavLink end to={'/products/PhonesTablets'} className='itemCategory'>
          <img src={phone} alt='phone' className='iconMenu me-2' />
          <div className='kumbhSans' style={{ lineHeight: '25px' }}>
            Phones - Tablets
          </div>
        </NavLink>
        <NavLink end to={'/products/MenFashion'} className='itemCategory'>
          <img src={shirt} alt='shirt' className='iconMenu me-2' />
          <div className='kumbhSans' style={{ lineHeight: '25px' }}>
            Men&apos;s Fashion
          </div>
        </NavLink>
        <NavLink end to={'/products/WomenFashion'} className='itemCategory'>
          <img src={dress} alt='dress' className='iconMenu me-2' />
          <div className='kumbhSans' style={{ lineHeight: '25px' }}>
            Women&apos;s Fashion
          </div>
        </NavLink>
        <NavLink to={'/products/FashionAccessories'} className='itemCategory'>
          <img src={accessories} alt='accessories' className='iconMenu me-2' />
          <div className='kumbhSans' style={{ lineHeight: '25px' }}>
            Fashion accessories
          </div>
        </NavLink>
      </div>
    </div>
  )
}
export default Portfolio
