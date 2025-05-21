import React, { useEffect, useState } from 'react'
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation
} from '../../redux/api/usersApiSlice'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import {
  PencilSquareIcon,
  CheckCircleIcon,
  XMarkIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import { Button } from 'flowbite-react'
import { toast } from 'react-toastify'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { useDispatch } from 'react-redux'
function UserList() {
  const { data: users, refetch, error, isLoading } = useGetUsersQuery()
  const [deleteApiCall] = useDeleteUserMutation()
  const [updateApiCall] = useUpdateUserMutation()
  const [editableUserId, setEditableUserId] = useState(null)
  const [editableUsername, setEditableUsername] = useState('')
  const [editableEmail, setEditableEmail] = useState('')

  const dispatch = useDispatch()

  const toggleUpdate = (id, username, email) => {
    setEditableUserId(id)
    setEditableEmail(email)
    setEditableUsername(username)
  }

  const handleDelete = async id => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteApiCall(id).unwrap()
        refetch()
      } catch (error) {
        toast.error(error?.data?.error)
      }
    }
  }

  const handleUpdate = async id => {
    try {
      const res = await updateApiCall({
        userId: id,
        username: editableUsername,
        email: editableEmail
      }).unwrap()
      dispatch(setCredentials({ ...res }))
      setEditableUserId(null)
      refetch()
    } catch (error) {
      toast.error(error?.data?.error)
    }
  }

  useEffect(() => {
    refetch()
  }, [refetch])
  return (
    <div className='flex justify-center flex-col gap-4'>
      <h1 className='text-3xl text-center font-bold'>Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='error' />
      ) : (
        <table>
          <thead>
            <th className='px-4 text-left'>Id</th>
            <th className='px-4 text-left'>Username</th>
            <th className='px-4 text-left'>Email</th>
            <th className='px-4 text-left'>Admin</th>
            <th className='px-4 text-left'>Actions</th>
          </thead>
          <tbody>
            {users.map(({ username, email, _id, isAdmin }) => (
              <tr>
                <td className='px-4 py-2'>{_id}</td>
                <td className='px-4 py-2'>
                  {editableUserId === _id ? (
                    <div className='flex items-center'>
                      <input
                        type='text'
                        value={editableUsername}
                        onChange={e => setEditableUsername(e.target.value)}
                      />
                      <Button onClick={() => handleUpdate(_id)}>Update</Button>
                    </div>
                  ) : (
                    <div className='flex items-center gap-2'>
                      <span>{username}</span>

                      <PencilSquareIcon
                        className='text-gray-400 size-6 cursor-pointer'
                        onClick={() => toggleUpdate(_id, username, email)}
                      />
                    </div>
                  )}
                </td>
                <td className='px-4 py-2'>
                  {editableUserId === _id ? (
                    <div className='flex items-center gap-2'>
                      <input
                        type='text'
                        value={editableEmail}
                        onChange={e => setEditableEmail(e.target.value)}
                      />
                      <Button onClick={() => handleUpdate(_id)}>Update</Button>
                    </div>
                  ) : (
                    <div className='flex items-center gap-2'>
                      <span>{email}</span>
                      <PencilSquareIcon
                        className='size-6 text-gray-400 cursor-pointer'
                        onClick={() => toggleUpdate(_id, username, email)}
                      />
                    </div>
                  )}
                </td>
                <td>
                  {isAdmin ? (
                    <CheckCircleIcon className='text-green-500 size-6' />
                  ) : (
                    <XMarkIcon className='size-6 text-red-500' />
                  )}
                </td>
                <td>
                  {!isAdmin && (
                    <TrashIcon
                      className='p-2 rounded-md bg-red-500 text-white size-8 shrink-0 cursor-pointer'
                      onClick={() => handleDelete(_id)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default UserList
