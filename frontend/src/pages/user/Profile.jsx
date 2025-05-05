import { Button, Label, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  useProfileMutation,
  useUpdateUserMutation
} from '../../redux/api/usersApiSlice'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'

function Profile() {
  const { userInfo } = useSelector(state => state.auth)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [updateUserApiCall] = useProfileMutation()
  const dispatch = useDispatch()
  const submitHandler = async e => {
    e.preventDefault()
    try {
      if (password !== confirmPassword) {
        toast.error('Password not match')
      } else {
        const res = await updateUserApiCall({
          username,
          email,
          password
        }).unwrap()
        dispatch(setCredentials({ ...res }))
        toast.success('User updated successfully')
      }
    } catch (error) {
      toast.error(error?.data?.error)
    }
  }

  useEffect(() => {
    setUsername(userInfo.username)
    setEmail(userInfo.email)
  }, [userInfo.username, userInfo.email])
  return (
    <form
      onSubmit={submitHandler}
      className='flex items-center flex-col'
    >
      <div>
        <div className='mb-2'>
          <Label
            htmlFor='username'
            className='mb-2'
          >
            Username
          </Label>
          <TextInput
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder='Username'
            type='text'
          />
        </div>
      </div>
      <div>
        <div className='mb-2'>
          <Label
            htmlFor='email'
            className='mb-2'
          >
            Email
          </Label>
          <TextInput
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='Email'
            type='email'
          />
        </div>
      </div>
      <div>
        <div className='mb-2'>
          <Label
            htmlFor='password'
            className='mb-2'
          >
            Password
          </Label>
          <TextInput
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder='Password'
            type='password'
          />
        </div>
      </div>
      <div>
        <div className='mb-2'>
          <Label
            htmlFor='confirmPassword'
            className='mb-2'
          >
            Confirm Password
          </Label>
          <TextInput
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder='Confirm Password'
            type='password'
          />
        </div>
      </div>
      <Button type='submit'>Update</Button>
    </form>
  )
}

export default Profile
