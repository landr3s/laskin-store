import {
  Dropdown,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  DropdownHeader,
  Avatar
} from 'flowbite-react'
import React from 'react'
import { adminLinks, authLinks, navLinks, userLinks } from './navLinks'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
function DefaultNav() {
  const { userInfo } = useSelector(state => state.auth)
  const dropdownLinks = [...userLinks, ...(userInfo?.isAdmin ? adminLinks : [])]
  return (
    <Navbar
      rounded
      fluid
    >
      <NavbarBrand
        className='cursor-pointer '
        href='/'
      >
        <img
          src='https://www.svgrepo.com/show/530662/ribosome.svg'
          alt='Logo'
          className='h-8 mr-3'
        />
        <span className='text-xl dark:text-white font-semibold'>
          laskin's Store
        </span>
      </NavbarBrand>

      <NavbarToggle />
      <NavbarCollapse>
        {authLinks.map(({ label, to }) => (
          <Link
            to={to}
            key={to}
          >
            {label}
          </Link>
        ))}
      </NavbarCollapse>
    </Navbar>
  )
}

export default DefaultNav
