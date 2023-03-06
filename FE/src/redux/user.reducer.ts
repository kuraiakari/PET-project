import { createAction, createReducer } from '@reduxjs/toolkit'

const initalState = {
  idUser: ''
}
export const addIdUser = createAction<string>('user/iduser')

const userReducer = createReducer(initalState, (builder) => {
  builder.addCase(addIdUser, (initalState, action) => {
    initalState.idUser = action.payload
  })
})

export default userReducer
