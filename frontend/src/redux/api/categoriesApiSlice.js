import { CATEGORIES_URL } from '../constants'
import apiSlice from './apiSlice'

const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createCategory: builder.mutation({
      query: data => ({
        url: `${CATEGORIES_URL}`,
        body: data,
        method: 'POST'
      })
    }),
    updateCategory: builder.mutation({
      query: ({ categoryId, categoryName }) => ({
        url: `${CATEGORIES_URL}/${categoryId}`,
        method: 'PUT',
        body: categoryName
      })
    }),
    deleteCategory: builder.mutation({
      query: categoryId => ({
        url: `${CATEGORIES_URL}/${categoryId}`,
        method: 'DELETE'
      })
    }),
    getCategories: builder.query({
      query: () => ({
        url: `${CATEGORIES_URL}`
      })
    })
  })
})

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery
} = categoriesApiSlice
