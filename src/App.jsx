import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div className='flex w-full'>
      <div className='h-screen flex flex-col justify-center w-1/5 border-r-2 bg-white'>
        <Link to='/' className='hover:bg-blue-600 hover:text-white rounded-2xl px-2 py-3 text-lg font-semibold'>Dashboard</Link>
        <Link to='/schools' className='hover:bg-blue-600 hover:text-white rounded-2xl px-2 py-3 text-lg font-semibold'>Schools</Link>
      </div>
      <Outlet />
    </div>
  )
}

export default App;
