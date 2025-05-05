import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function UserRoute() {
  const { userInfo } = useSelector(state => state.auth)
  return userInfo ? (
    <Outlet />
  ) : (
    <Navigate
      replace
      to={'/login'}
    />
  )
}

export default UserRoute
