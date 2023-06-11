import { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { itemCategory } from '../../typeData/itemCategory.type'

interface data {
  itemsCategory: Array<itemCategory>
}
const Category = ({ itemsCategory }: data) => {
  return (
    <>
      {itemsCategory.map((item: itemCategory, index: number) => {
        return (
          <NavLink key={index} end to={`/products/${item.content}`} className='itemCategory'>
            <img src={item.icon} alt={item.description} className='iconMenu me-2' />
            <div className='kumbhSans' style={{ lineHeight: '25px' }}>
              {item.description}
            </div>
          </NavLink>
        )
      })}
    </>
  )
}
export default memo(Category)
