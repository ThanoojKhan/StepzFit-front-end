import React from 'react'
import { Toaster } from 'react-hot-toast'
import SideBar from '../../../components/adminComponents/sideBar'
import AddTrainer from '../../../components/adminComponents/trainers/addTrainerTab'

function AddTrainers() {
  return (
    <div className='flex'><Toaster toastOptions={3000}/>
    <SideBar/>
    <AddTrainer/>
    </div>
  )
}

export default AddTrainers