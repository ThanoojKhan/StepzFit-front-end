import React from 'react'
import { Toaster } from 'react-hot-toast'
import SideBar from '../../../components/adminComponents/sideBar'
import AssignTrainerTab from '../../../components/adminComponents/trainers/assignTrainerTab'

function AssignTrainer() {
  return (
    <div className='flex'><Toaster toastOptions={3000}/>
    <SideBar/>
    <AssignTrainerTab/>
    </div>
  )
}

export default AssignTrainer