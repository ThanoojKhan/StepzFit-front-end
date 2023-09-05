import React from 'react'
import FoodTrackerTab from '../../components/traineeComponents/foodTracker/foodTrackerTab'
import SideBar from '../../components/traineeComponents/sideBar'
import { Toaster } from 'react-hot-toast'

function FoodTracker() {

  return (
    <div className='flex'><Toaster toastOptions={3000} />
        <SideBar/>
        <FoodTrackerTab/>
    </div>
  )
}

export default FoodTracker