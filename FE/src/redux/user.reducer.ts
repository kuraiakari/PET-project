import { createAction, createReducer } from '@reduxjs/toolkit'

interface initalState {
  idUser: string
  isAdmin: boolean
  myShop: string
  listLikeProduct: Array<string>
}

const initalState = {
  idUser: '',
  isAdmin: false,
  myShop: '',
  listLikeProduct: []
}
export const addIdUser = createAction<initalState>('user/iduser')

const userReducer = createReducer(initalState, (builder) => {
  builder.addCase(addIdUser, (initalState, action) => {
    initalState.idUser = action.payload.idUser
    initalState.isAdmin = action.payload.isAdmin
    initalState.myShop = action.payload.myShop
  })
})

export default userReducer
