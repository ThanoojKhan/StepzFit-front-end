import React from 'react'
import { Toaster } from 'react-hot-toast'
import SideBar from '../../../components/adminComponents/sideBar'
import UpdateTrainer from '../../../components/adminComponents/trainers/updateTrainerTab'
import { useParams } from 'react-router-dom'

function UpdateTrainers() {
  const { trainerId } =useParams()
  return (
    <div className='flex'><Toaster toastOptions={3000}/>
    <SideBar/>
    <UpdateTrainer trainerId={trainerId}/>
    </div>
  )
}

export default UpdateTrainers