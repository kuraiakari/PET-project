import { createAction, createReducer } from '@reduxjs/toolkit'

interface initalState {
  idUser: string
  id: string
  isAdmin: boolean
  myShop: string
  listLikeProduct: Array<string>
}

const initalState = {
  idUser: localStorage.getItem('token') ? localStorage.getItem('token') : '',
  id: localStorage.getItem('id') ? localStorage.getItem('id') : '',
  isAdmin: localStorage.getItem('isAdmin') ? (localStorage.getItem('isAdmin') === 'true' ? true : false) : false,
  myShop: localStorage.getItem('myShop') ? localStorage.getItem('myShop') : '',
  listLikeProduct: localStorage.getItem('listLikeProduct')
    ? localStorage.getItem('listLikeProduct')?.split(',')
    : new Array<string>()
}
export const addIdUser = createAction<initalState>('user/iduser')
export const addProductToListLikeProduct = createAction<string>('user/addListLikeProduct')
export const removeProductToListLikeProduct = createAction<string>('user/removeListLikeProduct')
const userReducer = createReducer(initalState, (builder) => {
  builder.addCase(addIdUser, (initalState, action) => {
    initalState.idUser = action.payload.idUser
    initalState.id = action.payload.id
    initalState.isAdmin = action.payload.isAdmin
    initalState.myShop = action.payload.myShop
    initalState.listLikeProduct = action.payload.listLikeProduct
  })
  builder.addCase(addProductToListLikeProduct, (initalState, action) => {
    initalState.listLikeProduct?.push(action.payload)
    const data = initalState.listLikeProduct?.toString()
    if (data) localStorage.setItem('listLikeProduct', data)
  })
  builder.addCase(removeProductToListLikeProduct, (initalState, action) => {
    const index = initalState.listLikeProduct?.indexOf(action.payload)
    if (typeof index === 'number' && index > -1) {
      initalState.listLikeProduct?.splice(index, 1)
      const data = initalState.listLikeProduct?.toString()
      if (data) localStorage.setItem('listLikeProduct', data)
    }
  })
})

export default userReducer
