import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { navLinks, authLinks } from './navLinks'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import './Navigation.css'

function Navigation() {
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <>
      {/* Overlay */}
      {showSidebar && (
        <div
          className='overlay fixed inset-0 bg-black bg-opacity-50 z-40'
          onClick={() => setShowSidebar(false)}
        ></div>
      )}

      {/* Botón hamburguesa solo en mobile */}
      {!showSidebar && (
        <div className='md:hidden p-4 fixed top-0 left-0 z-50'>
          <HiMenuAlt3
            size={28}
            className='cursor-pointer'
            onClick={() => setShowSidebar(true)}
          />
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`sidebar ${
          showSidebar ? 'open' : ''
        } flex flex-col justify-between h-full overflow-y-auto`}
        id='navigation-container'
      >
        {/* Botón cerrar solo en móvil */}
        <div className='flex justify-end md:hidden mb-4'>
          <HiX
            size={26}
            className='cursor-pointer'
            onClick={() => setShowSidebar(false)}
          />
        </div>

        {/* Contenedor con justify-between */}
        <div className='flex flex-col justify-between h-full'>
          <div className='space-y-4'>
            {navLinks.map(({ label, path, icon: Icon }) => (
              <Link
                key={label}
                to={path}
                className='group flex items-center transition-transform transform hover:translate-x-2 ease-in'
                onClick={() => setShowSidebar(false)}
              >
                <Icon
                  size={22}
                  className='mr-2'
                />
                <span className='nav-item-name'>{label}</span>
              </Link>
            ))}
          </div>

          <ul className='space-y-3'>
            {authLinks.map(({ label, path, icon: Icon }) => (
              <li key={label}>
                <Link
                  to={path}
                  className='group flex items-center transition-transform transform hover:translate-x-2 ease-in'
                  onClick={() => setShowSidebar(false)}
                >
                  <Icon
                    size={22}
                    className='mr-2'
                  />
                  <span className='nav-item-name'>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Navigation
