import React from 'react'
import FoodTrackerTab from '../../components/traineeComponents/foodTracker/foodTrackerTab'
import SideBar from '../../components/traineeComponents/sideBar'
import { Toaster } from 'react-hot-toast'
import NavBar from '../../components/traineeComponents/NavBar'

function FoodTracker() {

  return (
    <div className='flex'><Toaster toastOptions={3000} />
      <NavBar />
      <SideBar />
      <FoodTrackerTab />
    </div>
  )
}

export default FoodTracker