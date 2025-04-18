import { USERS_URL } from '../constants'
import apiSlice from './apiSlice'

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: data => ({
        body: data,
        url: `${USERS_URL}/auth`,
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

export const { useLoginMutation, useLogoutMutation } = usersApiSlice
