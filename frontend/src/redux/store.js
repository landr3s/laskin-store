import { configureStore } from '@reduxjs/toolkit'
import apiSlice from './api/apiSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import authReducer from './features/auth/loginSlice'
const store = configureStore({
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer
  }
})

setupListeners(store.dispatch)
export default store
