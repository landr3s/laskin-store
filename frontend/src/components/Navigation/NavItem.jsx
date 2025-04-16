// src/components/Navigation/NavItem.jsx
import { Link } from 'react-router-dom'

const NavItem = ({ to, label, Icon, hasFavorites }) => {
  return (
    <Link
      to={to}
      className='flex relative'
    >
      <div className='flex items-center transition-transform transform hover:translate-x-2'>
        <Icon
          size={26}
          className='mr-2 mt-[3rem]'
        />
        <span className='hidden nav-item-name mt-[3rem]'>{label}</span>
      </div>
      {hasFavorites && <></>}
    </Link>
  )
}

export default NavItem
