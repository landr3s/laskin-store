import React from 'react'
import { NavLink } from 'react-router-dom'

function NavItem({ label, to, icon: Icon }) {
  return (
    <NavLink
      to={to}
      className='flex items-center gap-2 p-4  rounded cursor-pointer '
    >
      <Icon className='h-6' /> <p className='font-bold text-[14px]'>{label}</p>
    </NavLink>
  )
}

export default NavItem
