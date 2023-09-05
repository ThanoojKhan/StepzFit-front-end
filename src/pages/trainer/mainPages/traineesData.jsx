import React from 'react'
import { Toaster } from 'react-hot-toast'
import SideBar from '../../../components/trainerComponents/sideBar'
import TraineesDataTab from '../../../components/trainerComponents/traineesData/traineesDataTab'
function TraineesData() {
  return (
    <div className='flex'><Toaster toastOptions={3000} />
      <SideBar />
      <TraineesDataTab/>
    </div>
  )
}

export default TraineesData