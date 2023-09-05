import React from 'react'
import TrainerManagement from '../../../components/adminComponents/trainers/trainerManagement'
import { Toaster } from 'react-hot-toast'
import SideBar from '../../../components/adminComponents/sideBar'

function Trainers() {
  return (
    <div className='flex'><Toaster toastOptions={3000}/>
    <SideBar/>
    <TrainerManagement/>
    </div>
  )
}

export default Trainers