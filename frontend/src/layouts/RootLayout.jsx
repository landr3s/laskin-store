import { useSelector } from 'react-redux'
import UserNav from '../components/navigation/UserNav'
import DefaultNav from '../components/navigation/DefaultNav'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
function RootLayout() {
  const { userInfo } = useSelector(state => state.auth)
  return (
    <div className='h-screen dark:bg-gray-900 flex flex-1 flex-col '>
      {userInfo ? (
        <>
          <ToastContainer />
          <UserNav />
          <main className='flex justify-center items-center h-screen '>
            <Outlet />
          </main>
        </>
      ) : (
        <>
          <ToastContainer />
          <DefaultNav />
          <main className='flex justify-center items-center h-screen'>
            <Outlet />
          </main>
        </>
      )}
    </div>
  )
}

export default RootLayout
