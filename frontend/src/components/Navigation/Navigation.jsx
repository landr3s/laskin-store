// src/components/Navigation/Navigation.jsx
import { useState } from 'react'
import { useSelector } from 'react-redux'
import NavItem from './NavItem'
import { navLinks, authLinks } from './navItems'
import AuthDropdown from './AuthDropdown'
import './Navigation.css'

const Navigation = () => {
  const { userInfo } = useSelector(state => state.auth)
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <div
      style={{ zIndex: 9999 }}
      className={`${
        showSidebar ? 'hidden' : 'flex'
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100vh] fixed`}
      id='navigation-container'
    >
      <div className='flex flex-col justify-center space-y-4'>
        {navLinks.map(item => (
          <NavItem
            key={item.to}
            to={item.to}
            label={item.label}
            Icon={item.icon}
            hasFavorites={item.hasFavorites}
          />
        ))}

        {!userInfo &&
          authLinks.map(item => (
            <NavItem
              key={item.to}
              to={item.to}
              label={item.label}
              Icon={item.icon}
            />
          ))}
      </div>

      <AuthDropdown userInfo={userInfo} />
    </div>
  )
}

export default Navigation
