import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../../redux/api/usersApiSlice'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button, Label, TextInput } from 'flowbite-react'
import { toast } from 'react-toastify'

function Login() {
  const [loginApiCall, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.auth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') ?? '/'
  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

  const submitHandler = async e => {
    e.preventDefault()
    try {
      const res = await loginApiCall({ email, password }).unwrap()
      dispatch(setCredentials({ ...res }))
    } catch (error) {
      toast.error(error?.data?.error)
    }
  }
  return (
    <form
      onSubmit={submitHandler}
      className='flex items-center flex-col justify-center gap-2'
    >
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
      <Button type='submit'>Submit</Button>
      <p>
        New here?{' '}
        <NavLink
          to={redirect ? `/register?redirect=${redirect}` : '/register'}
          className='text-gray-400 hover:underline cursor-pointer'
        >
          Register
        </NavLink>
      </p>
    </form>
  )
}

export default Login
