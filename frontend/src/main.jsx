import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider
} from 'react-router-dom'
import store from './redux/store.js'
import RootLayout from './layouts/RootLayout.jsx'
import { Provider } from 'react-redux'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import UserRoute from './pages/user/UserRoute.jsx'
import Profile from './pages/user/Profile.jsx'
import UserList from './pages/admin/UserList.jsx'
import AdminRoute from './pages/admin/AdminRoute.jsx'
const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route
      path='/'
      element={<RootLayout />}
    >
      {/* Auth Routes */}
      <Route
        index
        element={<App />}
      />
      <Route
        path='login'
        element={<Login />}
      />
      <Route
        path='register'
        element={<Register />}
      />
      {/* User Private Routes */}
      <Route
        path=''
        element={<UserRoute />}
      >
        <Route
          path='/profile'
          element={<Profile />}
        />
      </Route>
      {/* Admin Private Routes */}
      <Route
        path='/'
        element={<AdminRoute />}
      >
        <Route
          path='/admin/userlist'
          element={<UserList />}
        />
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
