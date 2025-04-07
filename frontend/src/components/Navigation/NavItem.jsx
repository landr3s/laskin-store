import React from 'react'
import { Link } from 'react-router-dom'

function NavItem({ label, path, icon: Icon }) {
  return (
    <Link
      to={path}
      className='group flex items-center transition-transform transform hover:translate-x-2 ease-in'
    >
      <Icon
        size={26}
        className='mr-2'
      />
      <span className='nav-item-name'>{label}</span>
    </Link>
  )
}

export default NavItem
