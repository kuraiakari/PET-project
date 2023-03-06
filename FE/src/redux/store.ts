import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user.reducer'
import productReducer from './product.reducer'
export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer
  }
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
