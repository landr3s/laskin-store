import './index.css'

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'
import { Route } from 'react-router'
import App from './App'
import { createRoot } from 'react-dom/client'
import Login from './pages/auth/Login'
import { Provider } from 'react-redux'
import { store } from './redux/store'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<App />}
    >
      <Route
        path='/login'
        element={<Login />}
      />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
