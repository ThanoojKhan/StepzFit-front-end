import React from 'react'
import UserManagement from '../../../components/adminComponents/trainees/traineeManagement'
import { Toaster } from 'react-hot-toast'
import SideBar from '../../../components/adminComponents/sideBar'

function Users() {
  return (
    <div className='flex'><Toaster toastOptions={3000} />
      <SideBar />
      <UserManagement />
    </div>
  )
}

export default Users