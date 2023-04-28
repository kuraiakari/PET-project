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
  isAdmin: localStorage.getItem('isAdmin') ? localStorage.getItem('isAdmin') : false,
  myShop: localStorage.getItem('myShop') ? localStorage.getItem('myShop') : '',
  listLikeProduct: []
}
export const addIdUser = createAction<initalState>('user/iduser')

const userReducer = createReducer(initalState, (builder) => {
  builder.addCase(addIdUser, (initalState, action) => {
    initalState.idUser = action.payload.idUser
    initalState.id = action.payload.id
    initalState.isAdmin = action.payload.isAdmin
    initalState.myShop = action.payload.myShop
  })
})

export default userReducer
