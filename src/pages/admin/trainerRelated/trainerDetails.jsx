import React from 'react'
import { Toaster } from 'react-hot-toast'
import SideBar from '../../../components/adminComponents/sideBar'
import TrainerDetailTab from '../../../components/adminComponents/trainers/trainerDetailTab'
import { useParams } from 'react-router-dom'

function TrainerDetails() {
  const { trainerId } =useParams()
  return (
    <div className='flex'><Toaster toastOptions={3000}/>
    <SideBar/>
    <TrainerDetailTab trainerId={trainerId}/>
    </div>
  )
}

export default TrainerDetails