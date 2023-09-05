import React from 'react'
import { Toaster } from 'react-hot-toast'
import SideBar from '../../../components/trainerComponents/sideBar'
import MyProfileTab from '../../../components/trainerComponents/myProfile/myProfileTab'
function MyProfile() {
  return (
    <div className='flex'><Toaster toastOptions={3000} />
      <SideBar />
      <MyProfileTab/>
    </div>
  )
}

export default MyProfile