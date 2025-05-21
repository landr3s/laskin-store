import React, { useEffect, useState } from 'react'
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation
} from '../../redux/api/categoriesApiSlice'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Modal from '../../components/Modal'
import { Button, Label, TextInput } from 'flowbite-react'
import CategoryForm from './CategoryForm'
import { toast } from 'react-toastify'

function CategoryList() {
  const [createCategoryApiCall] = useCreateCategoryMutation()
  const [updateCategoryApiCall] = useUpdateCategoryMutation()
  const [deleteCategoryApiCall] = useDeleteCategoryMutation()

  const [modalVisible, setModalVisible] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const [updatingCategoryName, setUpdatingCategoryName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState()

  const {
    data: categories,
    refetch,
    isLoading,
    error
  } = useGetCategoriesQuery()

  useEffect(() => {
    refetch()
  }, [refetch])

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      console.log(categoryName)

      const result = await createCategoryApiCall({
        name: categoryName
      }).unwrap()

      console.log(result)

      refetch()
      if (result.error) {
        toast.error(error?.data?.error)
      } else {
        toast.success(`${result.name} category created`)
        setCategoryName('')
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  const handleChange = e => {
    setCategoryName(e.target.value)
  }

  const handleDelete = async categoryId => {
    try {
      await deleteCategoryApiCall(categoryId).unwrap()
      setModalVisible(false)
      toast.success('Category deleted correctly')
      refetch()
    } catch (error) {
      toast.error(error?.data?.error)
    }
  }
  const handleUpdate = async () => {
    try {
      const result = await updateCategoryApiCall({
        categoryId: selectedCategory._id,
        categoryName: { name: updatingCategoryName }
      }).unwrap()
      refetch()
      if (result.error) {
        toast.error(error?.data?.error)
      } else {
        setModalVisible(false)
        toast.success('Category edited correctly')
      }
    } catch (error) {
      toast.error(error?.data?.error)
    }
  }

  const handleShowDetailsCategory = category => {
    setModalVisible(true)
    setSelectedCategory(category)
    setUpdatingCategoryName(category.name)
  }

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='error' />
  ) : (
    <section>
      <CategoryForm
        value={categoryName}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <div className='flex gap-2 p-4'>
        {categories.map(category => (
          <button
            onClick={() => handleShowDetailsCategory(category)}
            className='px-4 py-2 border-gray-500 rounded-lg text-base font-medium border-2 hover:bg-blue-500 transition duration-300 text-gray-400 hover:text-white'
          >
            {category.name}
          </button>
        ))}
      </div>
      <Modal
        handleClose={() => setModalVisible(false)}
        isOpen={modalVisible}
      >
        <div className='flex-col gap-2 flex'>
          <Label>Category Name</Label>
          <TextInput
            type='text'
            value={updatingCategoryName}
            onChange={e => setUpdatingCategoryName(e.target.value)}
          />

          <div className='flex gap-2'>
            <Button onClick={() => handleDelete(selectedCategory._id)}>
              Delete
            </Button>
            <Button onClick={handleUpdate}>Update</Button>
          </div>
        </div>
      </Modal>
    </section>
  )
}

export default CategoryList
