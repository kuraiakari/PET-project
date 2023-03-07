import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import './listProduct.css'
import Product from '../product/Product'
import { product } from 'src/types/product.type'
const ListProduct = () => {
  const [searchProduct, setsearchProduct] = useSearchParams()
  const nameProduct = searchProduct.get('name') || ''
  const sortProduct = searchProduct.get('sorting') || ''
  const [listProduct, setListProduct] = useState<any[]>()
  useEffect(() => {
    console.log(1)
    fetch(`http://localhost:3000/v1/products/?name=${nameProduct}&sorting=${sortProduct}`)
      .then((response) => response.json())
      .then((data) => setListProduct(data))
  }, [nameProduct, sortProduct])
  return (
    <>
      <div className='listProduct'>
        <div className='headerAnswerSearch'>
          <h1>Ket qua tim kiem cho {nameProduct}</h1>
        </div>
        {listProduct && listProduct.map((product: product) => <Product key={product._id} product={product} />)}
        {listProduct?.length === 0 && <h1>Not found</h1>}
      </div>
    </>
  )
}
export default ListProduct
