import React from 'react'
import { Toaster } from 'react-hot-toast'
import SideBar from '../../../components/adminComponents/sideBar'
import AddPlanTab from '../../../components/adminComponents/plans/addPlanTab'

function AddPlan() {
  return (
    <div className='flex'><Toaster toastOptions={3000}/>
    <SideBar/>
    <AddPlanTab/>
    </div>
  )
}

export default AddPlan