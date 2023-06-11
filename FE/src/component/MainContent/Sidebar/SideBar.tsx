// trick : check location để active element
// valueSearchProduct sẽ lấy url trong lần render hiện tại để set hoặc get giá trị của chúng. Cẩn thận với setTimeout hoặc các Closures
import React, { useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

import './Sidebar.css'
import goodPrice from './iconSidebar/goodPrice.svg'
import quality from './iconSidebar/quality.svg'
import phone from './iconSidebar/phone.png'
import shirt from './iconSidebar/shirt.png'
import dress from './iconSidebar/dress.png'
import accessories from './iconSidebar/accessories.png'

import { itemCategory } from './typeData/itemCategory.type'
import { itemFilter } from './typeData/itemFilter.type'

import Filter from './itemsSidebar/Filter/Filter'
import Category from './itemsSidebar/Category/Category'

function Sidebar() {
  //get query search parameters value
  const [valueSearchProduct, setvalueSearchProduct] = useSearchParams()
  const valueSortProduct = valueSearchProduct.get('sorting')
  const handleFilter = useCallback(
    (payload: string) => {
      //new value query search
      if (valueSortProduct === null || valueSortProduct !== payload) {
        valueSearchProduct.set('sorting', payload)
        setvalueSearchProduct(valueSearchProduct)
      }
      // toggle click
      else {
        valueSearchProduct.delete('sorting')
        setvalueSearchProduct(valueSearchProduct)
      }
    },
    [valueSearchProduct, valueSortProduct, setvalueSearchProduct]
  )
  //data Filter
  const itemsFilter: Array<itemFilter> = useMemo(
    () => [
      {
        content: 'price',
        icon: goodPrice,
        description: 'Good Price'
      },
      {
        content: 'rating',
        icon: quality,
        description: 'Rating'
      }
    ],
    []
  )
  //data Category
  const itemsCategory: Array<itemCategory> = useMemo(
    () => [
      {
        content: 'PhonesTablets',
        icon: phone,
        description: 'Phones - Tablets'
      },
      {
        content: 'MenFashion',
        icon: shirt,
        description: "Men's Fashion"
      },
      {
        content: 'WomenFashion',
        icon: dress,
        description: "Women's Fashion"
      },
      {
        content: 'FashionAccessories',
        icon: accessories,
        description: 'Fashion Accessories'
      }
    ],
    []
  )
  return (
    <div className='sidebar'>
      <div className='filter'>
        <div className='kumbhSans headerFilter'>Filter</div>
        <Filter itemsFilter={itemsFilter} handleFilter={handleFilter} valueSortProduct={valueSortProduct} />
      </div>
      <div className='category'>
        <div className='kumbhSans headerCategory'>Category</div>
        <Category itemsCategory={itemsCategory} />
      </div>
    </div>
  )
}
export default Sidebar
