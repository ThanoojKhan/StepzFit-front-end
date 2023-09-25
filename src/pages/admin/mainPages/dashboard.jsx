import React from 'react'
import Dashboard from '../../../components/adminComponents/dashboard/dashboard'
import SideBar from '../../../components/adminComponents/sideBar'


function AdminDashboard() {
  return (
    <div className='flex'>
      <SideBar />
      <Dashboard />
    </div>
  )
}

export default AdminDashboard