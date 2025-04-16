import { USERS_URL } from '../constants'
import { apiSlice } from './apiSlice'

const userSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/auth`,
        body: data,
        method: 'POST'
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST'
      })
    })
  })
})

export const { useLoginMutation, useLogoutMutation } = userSlice
