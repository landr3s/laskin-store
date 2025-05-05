import {
  Dropdown,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  DropdownHeader,
  Avatar,
  DropdownDivider,
  Label
} from 'flowbite-react'
import React from 'react'
import { adminLinks, authLinks, navLinks, userLinks } from './navLinks'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/features/auth/authSlice'
import { useLogoutMutation } from '../../redux/api/usersApiSlice'
import { useNavigate } from 'react-router-dom'
function UserNav() {
  const { userInfo } = useSelector(state => state.auth)
  const [logoutApiCall] = useLogoutMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const dropdownLinks = [...userLinks, ...(userInfo?.isAdmin ? adminLinks : [])]

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/login')
    } catch (error) {
      console.error(error.message)
    }
  }
  return (
    <Navbar
      rounded
      fluid
    >
      <NavbarBrand>
        <img
          src='https://www.svgrepo.com/show/530662/ribosome.svg'
          alt='Logo'
          className='h-8 mr-3'
        />
        <span className='text-xl dark:text-white font-semibold'>
          laskin's Store
        </span>
      </NavbarBrand>
      <div className='md:order-2'>
        <Dropdown
          inline
          label={<Avatar rounded />}
          arrowIcon={false}
        >
          <DropdownHeader>
            <Label>{userInfo.username}</Label>
          </DropdownHeader>
          {dropdownLinks.map(({ label, to }) => (
            <DropdownItem
              href={to}
              key={to}
            >
              {label}
            </DropdownItem>
          ))}
          <DropdownDivider />
          <DropdownItem onClick={logoutHandler}>Logout</DropdownItem>
        </Dropdown>
      </div>
      <NavbarToggle />
      <NavbarCollapse>
        {navLinks.map(({ label, to }) => (
          <NavbarLink
            key={to}
            href={to}
          >
            {label}
          </NavbarLink>
        ))}
      </NavbarCollapse>
    </Navbar>
  )
}

export default UserNav
