import { createAction, createReducer } from '@reduxjs/toolkit'

interface initalState {
  idUser: string
  isAdmin: boolean
}

const initalState = {
  idUser: '',
  isAdmin: false
}
export const addIdUser = createAction<initalState>('user/iduser')

const userReducer = createReducer(initalState, (builder) => {
  builder.addCase(addIdUser, (initalState, action) => {
    initalState.idUser = action.payload.idUser
    initalState.isAdmin = action.payload.isAdmin
  })
})

export default userReducer
