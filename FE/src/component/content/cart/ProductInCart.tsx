import React from 'react'
import { useDispatch } from 'react-redux'

import { removeProduct } from '../../../redux/cart.reducer'

const ProductInCart = (props: any) => {
  const dispatch = useDispatch()
  const deleteProduct = () => {
    dispatch(removeProduct(props.index))
  }
  return (
    <>
      <h1>Test</h1>
      <button onClick={deleteProduct}>x</button>
    </>
  )
}
export default ProductInCart
