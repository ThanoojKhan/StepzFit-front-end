import React from 'react'
import { Toaster } from 'react-hot-toast'
import SideBar from '../../../components/trainerComponents/sideBar'
import ScheduleTask from '../../../components/trainerComponents/taskscheduler/taskScheduler'
function ScheduleTasks() {
  return (
    <div className='flex'><Toaster toastOptions={3000} />
      <SideBar />
      <ScheduleTask/>
    </div>
  )
}

export default ScheduleTasks