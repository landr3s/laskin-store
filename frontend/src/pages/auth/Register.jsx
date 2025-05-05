import React, { useState } from 'react'
import { useRegisterMutation } from '../../redux/api/usersApiSlice'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { Button, Label, TextInput } from 'flowbite-react'
import { NavLink, useLocation } from 'react-router-dom'

function Register() {
  const [registerApiCall, { isLoading }] = useRegisterMutation()
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') ?? '/'
  const submitHandler = async e => {
    e.preventDefault()
    try {
      if (password !== confirmPassword) {
        toast.error('Password not match')
      } else {
        const res = await registerApiCall({
          username,
          email,
          password
        }).unwrap()
        console.log(res)

        dispatch(setCredentials({ ...res }))
        toast.success('User created successfully')
      }
    } catch (error) {
      toast.error(error?.data?.error)
    }
  }
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
      <Button type='submit'>Create</Button>
      <p>
        Already sign up?{' '}
        <NavLink
          to={redirect ? `/login?redirect=${redirect}` : '/login'}
          className='text-gray-400 hover:underline cursor-pointer'
        >
          Login
        </NavLink>
      </p>
    </form>
  )
}

export default Register
