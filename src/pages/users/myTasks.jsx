import React from 'react'
import MyTasksTab from '../../components/traineeComponents/myTasks/myTasksTab'
import SideBar from '../../components/traineeComponents/sideBar'
import { Toaster } from 'react-hot-toast'

function MyTasks() {

  return (
    <div className='flex'><Toaster toastOptions={3000} />
        <SideBar/>
        <MyTasksTab/>
    </div>
  )
}

export default MyTasks