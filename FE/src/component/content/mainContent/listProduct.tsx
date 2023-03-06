import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

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
  if (listProduct) console.log(listProduct)
  return <>{listProduct && <h1>{`${listProduct[0].nameProduct}`}</h1>}</>
}
export default ListProduct
