import React from 'react'
import SideBar from '../../components/traineeComponents/sideBar'
import { Toaster } from 'react-hot-toast'
import ShowBodyMetricsTab from '../../components/traineeComponents/bodyMetrics/showBodyMetricsTab'
import NavBar from '../../components/traineeComponents/NavBar'

function BodyMetrics() {

  return (
    <div className='flex'>
      <NavBar />
      <SideBar />
      <ShowBodyMetricsTab />
    </div>
  )
}

export default BodyMetrics