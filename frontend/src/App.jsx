import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'
import Navbar from './pages/auth/Navbar'
// import 'react-toastify/dist/ReactToastify.css'
function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <main className='py-3'>
        <Outlet />
      </main>
    </>
  )
}

export default App
