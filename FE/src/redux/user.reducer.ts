import { createAction, createReducer } from '@reduxjs/toolkit'

interface initalStateUser {
  accessToken: string
  refreshToken: string
  id: string
  isAdmin: boolean
  myShop: string
  listLikeProduct: Array<string>
}

const initalState = {
  accessToken: localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : '',
  refreshToken: localStorage.getItem('refreshToken') ? localStorage.getItem('refreshToken') : '',
  id: '',
  isAdmin: false,
  myShop: '',
  listLikeProduct: new Array<string>()
}
export const addIdUser = createAction<initalStateUser>('user/iduser')
export const addProductToListLikeProduct = createAction<string>('user/addListLikeProduct')
export const removeProductToListLikeProduct = createAction<string>('user/removeListLikeProduct')
const userReducer = createReducer(initalState, (builder) => {
  builder.addCase(addIdUser, (initalState, action) => {
    initalState.accessToken = action.payload.accessToken
    initalState.refreshToken = action.payload.refreshToken
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
