// src/components/Navigation/AuthDropdown.jsx
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/features/auth/authSlice'
import { useLogoutMutation } from '../../redux/api/usersSlice'
import { useState } from 'react'
import { adminLinks, userLinks } from './dropdownLinks'

const AuthDropdown = ({ userInfo }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }

  const toggleDropdown = () => setDropdownOpen(prev => !prev)

  if (!userInfo) return null // eliminamos duplicado de login/register

  const links = [...(userInfo.isAdmin ? adminLinks : []), ...userLinks]

  return (
    <div className='relative'>
      <button
        onClick={toggleDropdown}
        className='flex items-center text-white'
      >
        <span>{userInfo.username}</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`h-4 w-4 ml-1 ${
            dropdownOpen ? 'transform rotate-180' : ''
          }`}
          fill='none'
          viewBox='0 0 24 24'
          stroke='white'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button>

      {dropdownOpen && (
        <ul
          className={`absolute right-0 mt-2 mr-14 space-y-2 bg-white text-gray-600 ${
            userInfo.isAdmin ? '-top-80' : '-top-20'
          }`}
        >
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className='block px-4 py-2 hover:bg-gray-100'
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={logoutHandler}
              className='block w-full px-4 py-2 text-left hover:bg-gray-100'
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}

export default AuthDropdown
