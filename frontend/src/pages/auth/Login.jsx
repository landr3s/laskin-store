import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { setCredentials } from '../../redux/features/auth/loginSlice'
import { useLoginMutation } from '../../redux/api/usersApiSlice'
import { toast } from 'react-toastify'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { userInfo } = useSelector(state => state.auth)
  const [loginApiCall, { loading }] = useLoginMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const search = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') ?? '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = async e => {
    try {
      e.preventDefault()
      const res = await loginApiCall({ email, password }).unwrap()
      console.log(res)

      dispatch(setCredentials({ ...res }))
    } catch (error) {
      toast.error(error?.data?.message) || console.error(error.message)
    }
  }

  return (
    <form
      onSubmit={submitHandler}
      className='flex flex-col gap-4 p-4 items-start text-white'
    >
      <div className='flex flex-col gap-2'>
        <label
          htmlFor='email'
          className='font-semibold'
        >
          Email Address
        </label>
        <input
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='Email Address'
          className='border-none rounded p-2 outline-none'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label
          htmlFor='email'
          className='font-semibold'
        >
          Password
        </label>
        <input
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='Password'
          className='border-none p-2 rounded outline-none'
        />
      </div>
      <button className='bg-white text-black px-4 py-1.5 rounded-full text-[15px]'>
        Submit
      </button>
    </form>
  )
}

export default Login
