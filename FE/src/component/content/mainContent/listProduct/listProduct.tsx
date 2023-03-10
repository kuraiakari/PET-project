import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import './listProduct.css'
import Product from '../product/Product'
import { product } from 'src/types/product.type'
const ListProduct = () => {
  const [searchProduct, setsearchProduct] = useSearchParams()
  const [quanlity, setQuanlity] = useState(4)
  const [loading, setLoading] = useState(false)
  const nameProduct = searchProduct.get('name') || ''
  const sortProduct = searchProduct.get('sorting') || ''
  const [listProduct, setListProduct] = useState<any[]>([])
  useEffect(() => {
    fetch(`http://localhost:3000/v1/products/?name=${nameProduct}&sorting=${sortProduct}`)
      .then((response) => response.json())
      .catch(() => console.log('Not internet'))
      .then((data) => setListProduct(data))
  }, [nameProduct, sortProduct])
  return (
    <>
      <div className='contentListProduct'>
        {nameProduct && (
          <div className='headerAnswerSearch'>
            <h1>Search results for {nameProduct}</h1>
          </div>
        )}
        <div className='listProduct'>
          {listProduct &&
            listProduct.map((product: product, index: number) => {
              if (index < quanlity) return <Product key={product._id} product={product} />
            })}
        </div>
        {listProduct?.length > quanlity ? (
          <Button className='buttonMoreProduct' onClick={() => setQuanlity(quanlity + 4)}>
            Xem them
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
