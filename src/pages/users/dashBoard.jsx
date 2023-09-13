import React from 'react'
import Dashboard from '../../components/traineeComponents/dashBoard/dashboard'
import SideBar from '../../components/traineeComponents/sideBar'
import { Toaster } from 'react-hot-toast'

function DashBoard() {

  return (
    <div className='flex'>
      <Toaster toastOptions={3000} />
        <SideBar/>
        <Dashboard/>
    </div>
  )
}

export default DashBoard