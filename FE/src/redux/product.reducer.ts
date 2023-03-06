import { createAction, createReducer } from '@reduxjs/toolkit'

const initalState = {
  idProduct: '',
  nameProduct: ''
}
export const addIdProduct = createAction<string>('product/idproduct')
export const addNameProduct = createAction<string>('product/nameproduct')

const productReducer = createReducer(initalState, (builder) => {
  builder.addCase(addIdProduct, (initalState, action) => {
    initalState.idProduct = action.payload
  })
  builder.addCase(addNameProduct, (initalState, action) => {
    initalState.nameProduct = action.payload
  })
})

export default productReducer
