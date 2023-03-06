import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './listProduct.css'
import Product from '../product/Product'
import { product } from 'src/types/product.type'
const ListProduct = () => {
  const [listProduct, setListProduct] = useState<any[]>()
  const dataProduct = useSelector((state: any) => state)
  const sortData = ''
  useEffect(() => {
    console.log(1)
    fetch(`http://localhost:3000/v1/products/?name=${dataProduct.product.nameProduct}&sorting=${sortData}`)
      .then((response) => response.json())
      .then((data) => setListProduct(data))
  }, [dataProduct.product.nameProduct])
  return (
    <>
      <div className='listProduct'>
        {listProduct && listProduct.map((product: product) => <Product key={product._id} product={product} />)}
      </div>
    </>
  )
}
export default ListProduct
