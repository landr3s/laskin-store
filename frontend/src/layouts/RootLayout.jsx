import { useSelector } from 'react-redux'
import UserNav from '../components/navigation/UserNav'
import DefaultNav from '../components/navigation/DefaultNav'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
function RootLayout() {
  const { userInfo } = useSelector(state => state.auth)
  return (
    <div className='min-h-screen dark:bg-gray-900 flex flex-col'>
      {userInfo ? (
        <>
          <ToastContainer />
          <UserNav />
          <main className='flex items-center justify-center px-4 flex-1'>
            <div className='max-w-7xl w-full'>
              <Outlet />
            </div>
          </main>
        </>
      ) : (
        <>
          <ToastContainer />
          <DefaultNav />
          <main className='flex flex-1 items-center justify-center px-4'>
            <div className='max-w-7xl w-full'>
              <Outlet />
            </div>
          </main>
        </>
      )}
    </div>
  )
}

export default RootLayout
