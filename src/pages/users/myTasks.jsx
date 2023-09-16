import React from 'react'
import MyTasksTab from '../../components/traineeComponents/myTasks/myTasksTab'
import SideBar from '../../components/traineeComponents/sideBar'
import { Toaster } from 'react-hot-toast'
import NavBar from '../../components/traineeComponents/NavBar'

function MyTasks() {

  return (
    <div className='flex'>
      <NavBar />
      <SideBar />
      <MyTasksTab />
    </div>
  )
}

export default MyTasks