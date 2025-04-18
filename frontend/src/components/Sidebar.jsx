import React from 'react'
import { authLinks, mainLinks } from './navigation/navigation'
import NavItem from './NavItem'
import { useSelector } from 'react-redux'

function Sidebar() {
  const { userInfo } = useSelector(state => state.auth)
  return (
    <aside className='w-[25%] flex gap-2 p-2 h-full text-white flex-col'>
      <section className='rounded bg-[#121212] flex gap-2 p-2 flex-col h-[85%]'>
        {mainLinks.map(({ label, to, icon: Icon }) => (
          <NavItem
            label={label}
            to={to}
            icon={Icon}
            key={label}
          />
        ))}
      </section>

      {!userInfo && (
        <section className='rounded bg-[#121212] gap-2 flex flex-col h-[15%]'>
          {authLinks.map(({ label, to, icon: Icon }) => (
            <NavItem
              to={to}
              label={label}
              icon={Icon}
              key={label}
            />
          ))}
        </section>
      )}
      {userInfo && (
        <section className='bg-[#121212] rounded h-[15%] flex items-center gap-4 p-4'>
          {userInfo.username}
        </section>
      )}
    </aside>
  )
}

export default Sidebar
