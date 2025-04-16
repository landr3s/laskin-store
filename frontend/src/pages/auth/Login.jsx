import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { useLoginMutation } from '../../redux/api/usersSlice'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { userInfo } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()
  const search = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') ?? '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, redirect, navigate])

  const submitHandler = async e => {
    e.preventDefault()
    try {
      const res = await login({ email, password }).unwrap()
      console.log(res)
      dispatch(setCredentials({ ...res }))
    } catch (error) {
      toast.error(error?.data?.message || error?.message)
    }
  }
  return (
    <div className=' pl-[10rem] flex flex-wrap'>
      <div className='mr-[4rem] mt-[5rem]'>
        <form
          onSubmit={submitHandler}
          className='container w-[40rem]'
        >
          <div className='p-4 flex gap-4'>
            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='Email Address'
            />
          </div>
          <div className='p-4 flex gap-4'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='Password'
            />
          </div>
          <button>Submit</button>
          <div>
            <p>
              New Customer?{' '}
              <Link to={redirect ? `redirect?${redirect}` : 'redirect'}>
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
