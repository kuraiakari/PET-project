import React, { useEffect, useState } from 'react'
import { useSearchParams, useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import './listProduct.css'
import Product from '../product/Product'
import { product } from 'src/types/product.type'

import bg1 from './imgListProduct/White Brown Furniture Collection Banner Free 1.png'
import bg2 from './imgListProduct/image 20.png'
const ListProduct = () => {
  const [searchProduct] = useSearchParams()
  const { category } = useParams()
  // console.log(category, idProduct)
  const [quantity, setQuantity] = useState(12)
  // const [loading, setLoading] = useState(false)
  const valueSearch = searchProduct.get('search') || ''
  const sortProduct = searchProduct.get('sorting') || ''
  const [listProduct, setListProduct] = useState<any[]>([])
  useEffect(() => {
    // reset quanlity moi khi search
    setQuantity(12)
    fetch(`http://localhost:3000/v1/products/${category}?search=${valueSearch}&sorting=${sortProduct}`)
      .then((response) => response.json())
      .catch(() => console.log('Not internet'))
      .then((data) => setListProduct(data))
  }, [category, valueSearch, sortProduct])
  return (
    <>
      <div className='contentListProduct'>
        {!category && !valueSearch && !sortProduct && (
          <div className='d-flex flex-column justify-content-start'>
            <div className='d-flex mb-37'>
              <img src={bg1} alt='bg1' style={{ width: '827px', height: '356px', marginRight: '17px' }} />
              <img src={bg2} alt='bg2' style={{ width: '419px', height: '354px' }} />
            </div>
            <div className='JejuMyeongjoRegular' style={{ fontSize: '40px', lineHeight: '40px', marginBottom: '41px' }}>
              Product
            </div>
          </div>
        )}
        {valueSearch && (
          <div className='headerAnswerSearch shadow-sm'>
            <h1>Search results for: {valueSearch}</h1>
          </div>
        )}
        <div className='listProduct'>
          {listProduct &&
            listProduct.length > 0 &&
            listProduct
              .slice(0)
              .reverse()
              .map((product: product, index: number) => {
                if (index < quantity) return <Product key={product._id} product={product} createProduct={false} />
              })}
        </div>
        {listProduct?.length > quantity ? (
          <Button className='buttonMoreProduct' onClick={() => setQuantity(quantity + 4)}>
            Show more
          </Button>
        ) : (
          false
        )}
        {listProduct?.length === 0 && <h1>Not found</h1>}
      </div>
    </>
  )
}
export default ListProduct
