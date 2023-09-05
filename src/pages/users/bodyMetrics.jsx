import React from 'react'
import SideBar from '../../components/traineeComponents/sideBar'
import { Toaster } from 'react-hot-toast'
import ShowBodyMetricsTab from '../../components/traineeComponents/bodyMetrics/showBodyMetricsTab'

function BodyMetrics() {

  return (
    <div className='flex'><Toaster toastOptions={3000} />
        <SideBar/>
        <ShowBodyMetricsTab/>
    </div>
  )
}

export default BodyMetrics