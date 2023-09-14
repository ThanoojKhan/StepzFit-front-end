import React from 'react'
import MyProfileTab from '../../components/traineeComponents/myProfile/myProfileTab'
import { Toaster } from 'react-hot-toast'
import SideBar from '../../components/traineeComponents/sideBar'
import NavBar from '../../components/traineeComponents/NavBar'


function MyProfile() {

  return (
    <div className='flex'><Toaster toastOptions={3000} />
      <NavBar />
      <SideBar />
      <MyProfileTab />
    </div>
  )
}

export default MyProfile