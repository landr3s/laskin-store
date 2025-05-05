import { USERS_URL } from '../constants'
import apiSlice from './apiSlice'

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST'
      })
    }),
    register: builder.mutation({
      query: data => ({
        url: `${USERS_URL}`,
        body: data,
        method: 'POST'
      })
    }),
    profile: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data
      })
    }),
    getUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}`
      }),
      providesTags: ['User'],
      keepUnusedDataFor: 5
    }),
    updateUser: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/${data.userId}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['User'],
      keepUnusedDataFor: 5
    }),
    deleteUser: builder.mutation({
      query: userId => ({
        url: `${USERS_URL}/${userId}`,
        method: 'DELETE'
      })
    }),
    getUserInfo: builder.query({
      query: id => ({
        url: `${USERS_URL}/${id}`
      })
    })
  })
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserInfoQuery
} = usersApiSlice
