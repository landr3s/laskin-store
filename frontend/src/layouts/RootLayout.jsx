import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../components/Sidebar'
import { ToastContainer } from 'react-toastify'

function RootLayout() {
  return (
    <div className='h-screen flex bg-black'>
      <ToastContainer />
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout
