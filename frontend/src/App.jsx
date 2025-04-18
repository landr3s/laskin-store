import React from 'react'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Favorites from './pages/Favorites'
import Login from './pages/auth/Login'
import Register from './pages/Register'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path='/'
        element={<RootLayout />}
      >
        <Route
          index
          element={<Home />}
        />
        <Route
          path='shop'
          element={<Shop />}
        />
        <Route
          path='cart'
          element={<Cart />}
        />
        <Route
          path='favorites'
          element={<Favorites />}
        />
        <Route
          path='login'
          element={<Login />}
        />
        <Route
          path='register'
          element={<Register />}
        />
      </Route>
    )
  )
  return (
    <RouterProvider router={router}>
      <RootLayout />
    </RouterProvider>
  )
}

export default App
