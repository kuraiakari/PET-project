import { createAction, createReducer } from '@reduxjs/toolkit'
import { order } from 'src/types/order.type'
const initalOrder: order[] = []
const initalState = {
  orderlist: initalOrder
}
export const addProduct = createAction<order>('order/addproduct')
export const removeProduct = createAction<number>('order/removeproduct')
export const removeAllProduct = createAction('order/removeallproduct')
const orderReducer = createReducer(initalState, (builder) => {
  builder
    .addCase(addProduct, (initalState, action) => {
      initalState.orderlist.push(action.payload)
    })
    .addCase(removeProduct, (initalState, action) => {
      initalState.orderlist.splice(action.payload, 1)
    })
    .addCase(removeAllProduct, (initalState) => {
      initalState.orderlist.splice(0)
    })
})

export default orderReducer
