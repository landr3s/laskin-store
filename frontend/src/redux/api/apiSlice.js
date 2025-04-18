import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants'

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL })

const apiSlice = createApi({
  endpoints: () => ({}),
  baseQuery,
  tagTypes: ['Products', 'Cart', 'User']
})

export default apiSlice
