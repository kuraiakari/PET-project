import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'

import cart from '../../iconNavbar/cart.svg'

const Cart = ({ navigate }: any) => {
  const products = useSelector((state: any) => state.order.orderlist)
  const moveCart = useCallback(
    (e: any) => {
      e.preventDefault()
      e.stopPropagation()
      navigate('/cart')
    },
    [navigate]
  )
  return (
    <button className='itemNavIsPerson kumbhSans ms-2' onClick={moveCart}>
      <div className='px-2' style={{ color: '#000' }}>
        {products.length}
      </div>
      <img src={cart} alt='cart' />
    </button>
  )
}
export default memo(Cart)
